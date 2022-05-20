export const SET_STORES = (state, stores) => {
  state.stores = stores;
};
export const SET_ACTIVE_STORE = (state, store) => {
  if (store && store.hoursAmPm && store.hoursAmPm.split) {
    let hoursAmPm = store.hoursAmPm.split(";");
    let hoursAmPmObj = {};
    hoursAmPm.forEach((hour) => {
      let arrHour = hour.split(":");

      hoursAmPmObj[arrHour[0].trim()] = arrHour[1];
    });

    store.hoursAmPm = hoursAmPmObj;
  }
  state.store = store;
};

export const SET_LOADING = (state, loading) => {
  state.loading = !!loading;
};

export const SET_SEARCH = (state, search) => {
  state.search = search;
};

export const SET_HISTORY = (state, { searchType, stores }) => {
  state.searchHistory = {
    ...state.searchHistory,
    [searchType]: stores,
  };
};
