/* eslint-disable no-var */
import type { SetupServer } from 'msw/node';

declare global {
  declare namespace globalThis {
    declare var BASE_URL: string;

    // test only
    declare var mockServer: SetupServer;
    declare var parseJson: <T = unknown>(json: string) => T;
  }

  interface Navigator {
    standalone?: boolean;
  }
  type Falsy = false | 0 | '' | null | undefined | void;
  interface Array<T> {
    filter<S extends T>(
      predicate: BooleanConstructor,
      thisArg?: any,
    ): Exclude<S, Falsy>[];
  }
  type E<T extends const> = T[keyof T];
}
