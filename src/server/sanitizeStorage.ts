// import type { MinimalStopPlace } from '#/types/stopPlace';
import type { ServerStorage } from '#/Storage/index.js';

export function sanitizeStorage(_storage: ServerStorage): void {
  // sanitizeFavs(storage, 'favs');
  // sanitizeFavs(storage, 'regionalFavs');
  // sanitizeRoutingFavs(storage, 'rfavs');
}

// function sanitizeFavs(
//   storage: ServerStorage,
//   storageKey: 'favs' | 'regionalFavs',
// ) {
//   const favs = storage.get(storageKey);
//   if (!favs) {
//     return;
//   }
//   if (typeof favs !== 'object') {
//     storage.remove(storageKey);
//     return;
//   }
// }

// function sanitizeRoutingFavs(
//   storage: ServerStorage,
//   storageKey: 'rfavs',
// ): void {
//   const favs = storage.get(storageKey);
//   if (!favs) {
//     return;
//   }
//   if (typeof favs !== 'object') {
//     storage.remove(storageKey);
//     return;
//   }
// }
