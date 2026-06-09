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

export const API_BASE = '';

export const getFullUrl = (url: string) => {
  if (url && url.startsWith('/')) {
    return `${API_BASE}${url}`;
  }
  return url;
};
