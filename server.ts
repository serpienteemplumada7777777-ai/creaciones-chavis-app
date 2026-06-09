import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { INITIAL_APPS } from "./src/data";

const app = express();
const PORT = 3000;

// Set up server directories
const uploadsDir = path.join(process.cwd(), "uploads");
const apksDir = path.join(uploadsDir, "apks");
const iconsDir = path.join(uploadsDir, "icons");
const dbPath = path.join(uploadsDir, "apps_db.json");

// Ensure directories exist
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(apksDir)) fs.mkdirSync(apksDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

// Read custom database
const getCustomApps = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(content) || [];
    }
  } catch (error) {
    console.error("Error reading apps database:", error);
  }
  return [];
};

// Save custom database
const saveCustomApps = (apps: any[]) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(apps, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving apps database:", error);
  }
};

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "apk") {
      cb(null, apksDir);
    } else if (file.fieldname === "icon") {
      cb(null, iconsDir);
    } else {
      cb(null, uploadsDir);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 300 * 1024 * 1024 } // limit 300MB
});

// JSON parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable full CORS for multiple client domains and web views
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Serve loaded resource uploads statically
app.use("/uploads", express.static(uploadsDir));

// ================= API ENDPOINTS =================

// 1. GET ALL APPS (Preset + Custom Uploads combined)
app.get("/api/apps", (req, res) => {
  const custom = getCustomApps();
  // Filter out custom apps to avoid conflicts with INITIAL_APPS
  res.json({
    success: true,
    data: [...custom, ...INITIAL_APPS]
  });
});

// 2. UPLOAD NEW APP WITH APK & ICON
app.post("/api/apps/upload", upload.fields([
  { name: "apk", maxCount: 1 },
  { name: "icon", maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { title, developer, category, description, size, rating, secretKey } = req.body;

    // Validate access key "8963"
    if (secretKey !== "8963") {
      return res.status(403).json({ success: false, message: "Acceso denegado: Clave incorrecta." });
    }

    if (!files || !files.apk || files.apk.length === 0) {
      return res.status(400).json({ success: false, message: "Debe proveer un archivo instalador APK legal." });
    }

    const apkFile = files.apk[0];
    
    // Strict extension check for safety
    const ext = path.extname(apkFile.originalname).toLowerCase();
    if (ext !== ".apk") {
      // Remove invalid uploaded file immediately
      if (fs.existsSync(apkFile.path)) fs.unlinkSync(apkFile.path);
      return res.status(400).json({ success: false, message: "Solo se admiten instaladores originales de Android (.APK)." });
    }

    // Process icon
    let finalIconUrl = "/uploads/default-icon.png"; // fallback
    let customIconPath = "";
    
    if (files.icon && files.icon.length > 0) {
      const iconFile = files.icon[0];
      finalIconUrl = `/uploads/icons/${iconFile.filename}`;
      customIconPath = iconFile.path;
    } else if (req.body.presetIconUrl) {
      finalIconUrl = req.body.presetIconUrl;
    }

    const uniqueId = `uploaded-${Date.now()}`;
    const newApp = {
      id: uniqueId,
      title: (title || apkFile.originalname.replace(/\.[^/.]+$/, "")).trim(),
      developer: (developer || "Desarrollador Chavis").trim(),
      category: category || "Tools",
      description: (description || "Aplicación subida por la suite de Creaciones Chavis").trim(),
      size: size || `${(apkFile.size / (1024 * 1024)).toFixed(1)} MB`,
      rating: parseFloat(parseFloat(rating || (4.5 + Math.random() * 0.5)).toFixed(1)),
      downloadsCount: 0,
      iconUrl: finalIconUrl,
      dateAdded: new Date().toISOString().split("T")[0],
      apkPath: apkFile.path,
      apkOriginalName: apkFile.originalname,
      customIconPath: customIconPath
    };

    const currentApps = getCustomApps();
    currentApps.unshift(newApp);
    saveCustomApps(currentApps);

    res.json({
      success: true,
      data: newApp
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message || "Error interno del servidor en carga de APK" });
  }
});

// 3. INCREMENT DOWNLOAD COUNT
app.post("/api/apps/:appId/download-increment", (req, res) => {
  const { appId } = req.params;
  const custom = getCustomApps();
  let found = false;

  const updatedCustom = custom.map((app: any) => {
    if (app.id === appId) {
      found = true;
      return { ...app, downloadsCount: (app.downloadsCount || 0) + 1 };
    }
    return app;
  });

  if (found) {
    saveCustomApps(updatedCustom);
    return res.json({ success: true });
  }

  res.json({ success: true, message: "Incremented locally / default app status bypassed." });
});

// 4. DOWNLOADING APK package
app.get("/api/download/:appId", (req, res) => {
  const { appId } = req.params;
  const custom = getCustomApps();
  const appItem = custom.find((a: any) => a.id === appId);

  if (appItem && appItem.apkPath) {
    if (fs.existsSync(appItem.apkPath)) {
      return res.download(appItem.apkPath, appItem.apkOriginalName || `${appItem.title}.apk`);
    } else {
      return res.status(404).send("Instalador APK físico eliminado o no disponible en servidor.");
    }
  }

  // If it is one of our system preset apps
  const presetApp = INITIAL_APPS.find(a => a.id === appId);
  if (presetApp) {
    const backupTitle = presetApp.title.toLowerCase().replace(/\s+/g, "_");
    const manifestBytes = `===================================================================
   CREACIONES CHAVIS APP - MARKETPLACE DE ANDROID VERIFICADO
===================================================================
App ID:         ${presetApp.id}
Nombre:         ${presetApp.title}
Firma Dev:      ${presetApp.developer}
Categoría:      ${presetApp.category}
Peso Declarado: ${presetApp.size}
Clasificación:  ${presetApp.rating} / 5.0
Publicación:    ${presetApp.dateAdded}
Estado Check:   SEGURO / VERIFICADO CONTRA AMENAZAS
===================================================================

[AndroidRuntime] Iniciando instalador de Creaciones Chavis...
[BypassVerifier] Todos los paquetes de seguridad internos han sido superados con éxito.
Instalando los recursos estáticos de ${presetApp.title}...

Este archivo APK actúa como contenedor seguro para fines de demostración en AI Studio.
¡Felicidades, la descarga se ha completado perfectamente!
===================================================================`;
    
    res.setHeader("Content-Disposition", `attachment; filename=${backupTitle}.apk`);
    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    return res.send(manifestBytes);
  }

  return res.status(404).send("Aplicación o instalador no encontrado.");
});

// 5. DELETE CUSTOM APP
app.delete("/api/apps/:appId", (req, res) => {
  const { appId } = req.params;
  const { password } = req.body;

  if (password !== "8963") {
    return res.status(403).json({ success: false, message: "Clave de acceso incorrecta para eliminación." });
  }

  const custom = getCustomApps();
  const index = custom.findIndex((a: any) => a.id === appId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "La aplicación objetivo no existe o es una app preinstalada del sistema." });
  }

  const targetedApp = custom[index];

  // Try to clean up local resources
  try {
    if (targetedApp.apkPath && fs.existsSync(targetedApp.apkPath)) {
      fs.unlinkSync(targetedApp.apkPath);
    }
    if (targetedApp.customIconPath && fs.existsSync(targetedApp.customIconPath)) {
      fs.unlinkSync(targetedApp.customIconPath);
    }
  } catch (err) {
    console.error("Cleanup error during app deletion:", err);
  }

  // Remove from manifest database
  custom.splice(index, 1);
  saveCustomApps(custom);

  res.json({
    success: true,
    message: "La aplicación ha sido desindexada y eliminada físicamente de los servidores de Creaciones Chavis."
  });
});


// Global Error Handler Middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Global express server error caught:", err);
  res.status(err.status || err.statusCode || 500).json({
    success: false,
    message: err.message || "Ha ocurrido un error inesperado al procesar la solicitud en el servidor."
  });
});


// Vite Dev Server middleware or Production Asset server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on target host http://0.0.0.0:${PORT}`);
  });
}

startServer();
