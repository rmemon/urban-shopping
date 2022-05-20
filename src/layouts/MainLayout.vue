<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-primary text-white q-py-sm" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Best <span class="text-secondary">Buy</span>
          </q-toolbar-title>
          <!-- <q-icon name="add_shopping_cart" size="28px" /> -->
        </q-btn>

        <q-space />

        <div
          class="YL__toolbar-input-container row no-wrap"
          v-if="$q.screen.gt.md"
        >
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            dense
            flat
            @click="
              $store.commit('dialog/UPDATE_DIALOG_STATE', {
                dialog: 'SearchLocation',
                val: true,
              })
            "
          >
            <q-icon
              name="pin_drop"
              class="q-mr-xs"
              style="font-size: 1.715em"
            />
            {{ myStore && myStore.name }}
          </q-btn>

          <q-btn round dense flat icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <!-- <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn> -->
          <q-btn round dense flat icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      Hello from Sidebar
      <q-list v-if="false">
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <div class="q-mt-lg">
        <div class="row q-pa-lg bg-primary q-col-gutter-md">
          <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
            <div class="text-subtitle1 text-weight-bold">About</div>
            <div class="text-caption hover_underline_white q-mt-sm">
              Contact us
            </div>
            <div class="text-caption hover_underline_white">About Us</div>
            <div class="text-caption hover_underline_white">Careers</div>
            <div class="text-caption hover_underline_white">Our Stories</div>
            <div class="text-caption hover_underline_white">Press</div>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
            <div class="text-subtitle1 text-weight-bold">Connect with Us</div>
            <div class="text-caption hover_underline_white q-mt-sm">
              Facebook
            </div>
            <div class="text-caption hover_underline_white">Instagram</div>
            <div class="text-caption hover_underline_white">Twitter</div>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
            <div class="text-subtitle1 text-weight-bold">Policy</div>
            <div class="text-caption hover_underline_white q-mt-sm">
              Return Policy
            </div>
            <div class="text-caption hover_underline_white">Terms Of Use</div>
            <div class="text-caption hover_underline_white">Security</div>
            <div class="text-caption hover_underline_white">Privacy</div>
            <div class="text-caption hover_underline_white">Sitemap</div>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-white">
            <div class="text-subtitle1 text-weight-bold">Help</div>
            <div class="text-caption hover_underline_white q-mt-sm">
              Payments
            </div>
            <div class="text-caption hover_underline_white">Shipping</div>
            <div class="text-caption hover_underline_white">
              Cancellation & Returns
            </div>
            <div class="text-caption hover_underline_white">FAQ</div>
          </div>
          <div
            class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-white"
            :class="{ 'q-mt-md q-pl-sm': $q.screen.lt.md }"
            :style="$q.screen.gt.sm ? 'border-left: 1px solid grey;' : ''"
          >
            <div class="text-subtitle1 text-weight-bold">
              Registered Office Address:
            </div>
            <div class="text-caption q-mt-sm">1234 North Park</div>
            <div class="text-caption">San Jose CA</div>
            <div class="text-caption">94111</div>
          </div>
        </div>
        <div style="background-color: #163758">
          <div class="q-mr-md text-right q-py-xs text-weight-bold text-grey-6">
            Made with
            <span style="color: #e25555; font-size: 16px">&#9829;</span> using
            <a
              target="_blank"
              class="text-blue-1 hover_underline_white"
              style="text-decoration: none"
              href="https://quasar.dev"
            >
              &nbsp;Quasar&nbsp;
            </a>
            by
            <a
              target="_blank"
              class="text-blue-1 hover_underline_white"
              style="text-decoration: none"
            >
              Chetan
            </a>
          </div>
        </div>
      </div>
    </q-page-container>
    <SearchLocation />
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import EssentialLink from "components/EssentialLink.vue";
import SearchLocation from "components/SearchLocation";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
    SearchLocation,
  },
  setup() {
    const leftDrawerOpen = ref(false),
      $store = useStore(),
      myStore = computed(() => $store.getters["persistedCookie/store"]);

    // onMounted(() => {
    //   if (!myStore.value)
    //     $store.commit("dialog/UPDATE_DIALOG_STATE", {
    //       dialog: "SearchLocation",
    //       val: true,
    //     });
    // });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      search: ref(null),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      myStore,
    };
  },
});
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
