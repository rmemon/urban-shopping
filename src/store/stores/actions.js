/*
export function someAction (context) {
}
*/

export async function fetchStores({ commit, state }, { search, miles }) {
  console.log(state.searchHistory);
  console.log("====");

  commit("SET_STORES", []);
  commit("SET_ACTIVE_STORE", null);

  if (!search) return;

  let query = `((city=${search}))`;

  if (/^\d+$/.test(search)) {
    if (miles) query = `((area(${search},${miles})))`;
    else query = `((postalCode=${search}))`;
  }

  let searchType = `${search}-${/^\d+$/.test(search) ? miles : ""}`;

  if (state.searchHistory[searchType]) {
    commit("SET_STORES", state.searchHistory[searchType]);
    commit("SET_ACTIVE_STORE", state.searchHistory[searchType][0]);
    return;
  }

  commit("SET_LOADING", true);

  try {
    let response = await this.api.get(
      `https://api.bestbuy.com/v1/stores${query}?apiKey=ruH0aMPutJbpCZjlAr7ebjKG&format=json&pageSize=20`
    );

    if (response.data && response.data.stores && response.data.stores.length) {
      commit("SET_STORES", response.data.stores);
      commit("SET_ACTIVE_STORE", response.data.stores[0]);

      commit("SET_HISTORY", {
        stores: response.data.stores,
        searchType,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    commit("SET_LOADING", false);
  }
}
