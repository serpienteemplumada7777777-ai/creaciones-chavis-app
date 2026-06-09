/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppItem {
  id: string;
  title: string;
  developer: string;
  rating: number;
  size: string;
  category: 'Tools' | 'Games' | 'Education' | 'Productivity' | 'Social' | 'Entertainment';
  iconUrl: string;
  description: string;
  downloadsCount: number;
  isFeatured?: boolean;
  isRecent?: boolean;
  dateAdded: string;
  blob?: Blob | File; // Store the original file if uploaded
  fileName?: string;
}

export type PageId = 'home' | 'catalog' | 'upload' | 'control-panel';

export const API_BASE = window.location.hostname.includes('run.app') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? ''
  : 'https://ais-pre-7xrcossuaqczgnzlmdw2bh-331117753697.us-east1.run.app';

export const getFullUrl = (url: string) => {
  if (url && url.startsWith('/')) {
    return `${API_BASE}${url}`;
  }
  return url;
};
