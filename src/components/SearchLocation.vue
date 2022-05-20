<template>
  <q-dialog standard v-model="dialogState" persistent @show="onShow">
    <q-card style="" class="search-location-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 q-py-sm">SELECT A STORE FOR PICKUP</div>
        <q-space />
        <q-btn
          v-if="myStore && myStore.storeId"
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-lg">
        <div class="row q-col-gutter-md">
          <!-- <div class="col-12">
          <q-input label="" />
           </div> -->

          <div class="col-12 col-md-9">
            <div class="form-field">
              <q-input
                debounce="700"
                v-model="search"
                outlined
                label="Search By Zip or City(san Jose)"
                clearable
                @update:model-value="startSearch"
              />
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="form-field">
              <q-select
                v-model="miles"
                outlined
                :options="milesOption"
                label="Miles"
                emit-value
                map-options
                @update:model-value="startSearch"
              />
            </div>
          </div>
          <div
            v-show="
              (!stores || (stores && stores.length == 0)) && !loading && !search
            "
            class="col-12 text-grey text-center q-my-auto q-mt-xxl q-pt-lg"
          >
            <p>Please Search with Zip code or city name to select location.</p>
          </div>

          <div
            v-show="
              (!stores || (stores && stores.length == 0)) && !loading && search
            "
            class="col-12 text-grey text-center q-my-auto q-mt-xxl q-pt-lg"
          >
            <p>
              No Store Found matching <b>{{ search }}.</b> <br />
              <br />
              <br />
              Valid zip code: 55423, 95128, 95028
              <br />
              Valid City Name: San Jose, Union City, mountain view
            </p>
          </div>
          <div class="col-12 q-px-md">
            <p class="text-grey" v-if="stores && stores.length">
              {{ stores.length }} Store Found
            </p>

            <q-spinner
              v-show="loading"
              class="full-width q-ma-auto q-mt-md"
              color="primary"
              size="3em"
              :thickness="3"
            />
          </div>

          <div class="col-12 col-md-5">
            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 400px"
              class="q-px-md"
            >
              <q-list v-if="stores" class="q-px-lg">
                <div
                  v-for="(store, index) in stores"
                  :key="`store-${store.storeId}-${index}`"
                >
                  <q-item
                    class="q-pa-sm cursor-pointer location-item"
                    :class="
                      activeStore && store.storeId == activeStore.storeId
                        ? `bg-grey-3`
                        : ''
                    "
                    clickable
                    @click="setActiveStore(store)"
                  >
                    <q-item-section>
                      <q-item-label> {{ store.name }} </q-item-label>
                      <q-item-label caption lines="2">
                        {{ store.address || "" }} {{ store.address2 || "" }}
                        <br />
                        {{ store.city || "" }} {{ store.region || "" }}
                        {{ store.postalCode || "" }}
                      </q-item-label>

                      <q-item-label class="q-pt-md">
                        <strong>Call Us: </strong>
                        <a :href="`tel:${store.phone}`"> {{ store.phone }}</a>
                      </q-item-label>
                      <q-item-label class="q-pt-xs">
                        <q-icon name="directions_car" style="font-size: 16px" />
                        Curbside Available
                      </q-item-label>
                      <q-item-label caption lines="2" class="q-pt-sm">
                        For pickup today, order before 6 PM
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption style="max-width: 80px">
                        {{ store.storeType }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />
                </div>
              </q-list>
            </q-scroll-area>
          </div>
          <div class="col-12 col-md-7">
            <q-card
              class="my-card shadow-0"
              bordered
              style="min-height: 400px"
              v-if="activeStore"
            >
              <q-scroll-area
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 400px"
                class="q-px-md"
              >
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                      {{ activeStore.name }}
                    </div>
                    <div class="col">
                      <!-- {{ myStore }} -->
                      <q-btn
                        v-if="myStore && myStore.storeId == activeStore.storeId"
                        class="q-mx-auto q-px-md"
                        label="My Store"
                        dense
                        rounded
                      />

                      <q-btn
                        v-else
                        color="primary"
                        class="q-mx-auto q-px-md"
                        label="Set as my store"
                        dense
                        rounded
                        @click="setAsMyStore(activeStore)"
                      />
                    </div>

                    <div
                      class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                    >
                      <q-icon name="place" />
                      {{ activeStore.storeType }}
                    </div>
                  </div>

                  <q-item-label caption lines="2">
                    {{ activeStore.address || "" }}
                    {{ activeStore.address2 || "" }}
                    <br />
                    {{ activeStore.city || "" }} {{ activeStore.region || "" }}
                    {{ activeStore.postalCode || "" }}
                  </q-item-label>

                  <q-rating v-model="stars" readonly :max="5" size="32px" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row">
                    <div class="col-12 col-md-6 text-subtitle1">
                      <strong>Call Us: </strong>
                      <a :href="`tel:${activeStore.phone}`">
                        {{ activeStore.phone }}</a
                      >
                    </div>
                    <div class="col-12 col-md-6 text-caption text-grey q-mt-sm">
                      <q-item-label caption lines="2">
                        {{ activeStore.address || "" }}
                        {{ activeStore.address2 || "" }}
                        <br />
                        {{ activeStore.city || "" }}
                        {{ activeStore.region || "" }}
                        {{ activeStore.postalCode || "" }}
                      </q-item-label>
                    </div>

                    <div class="col-12 col-md-6 q-mt-md">
                      <b>Our Services</b>
                      <div class="text-caption text-grey">
                        <div
                          v-for="(service, index) in activeStore.services"
                          :key="`service-${index}`"
                        >
                          {{ service.service }}
                        </div>
                      </div>
                    </div>

                    <div class="col-12 col-md-6 q-mt-md">
                      <b>Store Time</b>
                      <div class="text-caption text-grey">
                        <div
                          v-for="(
                            hoursAmPm, key, index
                          ) in activeStore.hoursAmPm"
                          :key="`${key}-${index}`"
                        >
                          <strong>{{ key }}: </strong>{{ hoursAmPm }}
                        </div>

                        <!-- {{ activeStore.hoursAmPm }} -->
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-scroll-area>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const milesOption = [
  {
    label: "All",
    value: null,
  },
  {
    label: "5 Miles",
    value: 5,
  },
  {
    label: "10 Miles",
    value: 10,
  },
  {
    label: "15 Miles",
    value: 15,
  },
  {
    label: "20 Miles",
    value: 20,
  },
];

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};

const $store = useStore(),
  dialog = "SearchLocation",
  miles = ref(null),
  stars = ref(3);

// computed
const dialogState = computed({
    get: () => $store.state.dialog.dialog[dialog],
    set: (val) => {
      $store.commit("dialog/UPDATE_DIALOG_STATE", {
        dialog: dialog,
        val,
      });
    },
  }),
  search = computed({
    get: () => $store.state.stores.search,
    set: (val) => {
      $store.commit("stores/SET_SEARCH", val);
    },
  }),
  stores = computed(() => $store.getters["stores/stores"]),
  loading = computed(() => $store.getters["stores/loading"]),
  activeStore = computed(() => $store.getters["stores/store"]),
  myStore = computed(() => $store.getters["persistedCookie/store"]);

// Methods
const startSearch = () => {
  $store.dispatch("stores/fetchStores", {
    search: search.value,
    miles: miles.value,
  });
};

const setActiveStore = (store) => {
  $store.commit("stores/SET_ACTIVE_STORE", store);
};

const setAsMyStore = (store) => {
  $store.commit("persistedCookie/SET_MY_STORE", store);
  $store.commit("dialog/UPDATE_DIALOG_STATE", {
    dialog: "SearchLocation",
    val: false,
  });
};

const onShow = () => {
  startSearch();
};
</script>

<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: none !important;
}
.search-location-card {
  width: calc(100vw);

  @media (min-width: 1024px) {
    width: calc(70vw);
  }
}
.location-item {
}
.location-item:hover {
  background-color: $grey-3;
}
</style>
