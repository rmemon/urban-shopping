export function TOGGLE_MINI_SIDEBAR(state) {
  state.leftSidebarMini = !state.leftSidebarMini;
}

export function SET_MY_STORE(state, store) {
  if (store)
    state.store = {
      storeId: store.storeId,
      name: store.name,
    };
  else state.store = null;
}
