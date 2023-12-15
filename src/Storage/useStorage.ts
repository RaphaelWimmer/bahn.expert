import { createContext, useContext } from 'react';
import type { CommonConfig } from '#/config.js';
import type { Context } from 'react';
// import type { Favs } from '@/client/Abfahrten/provider/FavProvider';
// import type { RoutingFavs } from '@/client/Routing/provider/RoutingFavProvider';
// import type { RoutingSettings } from '@/client/Routing/provider/RoutingConfigProvider';
import type { StorageInterface } from '#/Storage/index.js';

export interface WebConfigMap extends CommonConfig /*, RoutingSettings */ {
  readonly selectedDetail: string;
  // readonly regionalFavs: Favs;
  // readonly favs: Favs;
  // readonly rfavs: RoutingFavs;
  readonly defaultFilter: string[];
}

// @ts-expect-error context without default is fine
export const StorageContext: Context<StorageInterface> = createContext();

export const useStorage = (): StorageInterface => useContext(StorageContext);
