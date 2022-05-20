import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import { Cookies } from "quasar";
import createPersistedState from "vuex-persistedstate";

import dialog from "./dialog";
import stores from "./stores";
import persistedCookie from "./persisted-cookie";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function ({ ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies,
    options = { path: "/", expires: 1 };

  const Store = createStore({
    modules: {
      dialog,
      stores,
      persistedCookie,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,

    plugins: [
      createPersistedState({
        key: "UrbanShoppingPersisted",
        paths: ["persistedCookie"],
        storage: {
          getItem: (key) => JSON.stringify(cookies.get(key)),
          setItem: (key, value) => cookies.set(key, value, options),
          removeItem: (key) => cookies.remove(key),
          // getState: (key, storage, value) => {
          //   value = storage.getItem(key)
          //   return value
          // },
          // setState: (key, state, storage) => storage.setItem(key, state),
        },
      }),
    ],
  });

  return Store;
});
