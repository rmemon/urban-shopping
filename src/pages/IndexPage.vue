<template>
  <q-page class="q-mt-lg q-mx-sm">
    <div class="row q-col-gutter-sm" v-if="$q.screen.gt.md">
      <div class="col-12">
        <q-carousel
          :class="$q.platform.is.desktop ? 'q-ml-sm' : ''"
          arrows
          animated
          v-model="slide"
          height="550px"
        >
          <q-carousel-slide name="first" img-src="~assets/banner.jpeg" />
          <q-carousel-slide name="second" img-src="~assets/banner.jpeg" />
          <q-carousel-slide name="third" img-src="~assets/banner.jpeg" />
        </q-carousel>
      </div>
    </div>

    <div class="text-grey-9 text-weight-bold">
      <div class="row items-center q-mx-sm">
        <div class="col-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <span class="text-grey-9 text-h6 text-weight-bold">
              Latest Launches
            </span>
            <a class="text-primary q-ml-sm cursor-pointer">[see all]</a>
          </div>
          <q-carousel
            v-model="latest_slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="340px"
            class="rounded-borders"
          >
            <q-carousel-slide
              v-for="(val, idx) in [1, 2, 3]"
              :name="val"
              :key="idx"
              class="column no-wrap"
            >
              <div
                class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
              >
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
                  v-for="(product, index) in shuffle(products)"
                  :key="index"
                >
                  <q-img class="rounded-borders" :src="`${product.image}.jpeg`">
                  </q-img>
                  <div>
                    {{ product.name }}
                  </div>
                  <div class="text-caption text-weight-bold text-green">
                    Black
                  </div>
                  <div>
                    <span>${{ product.price }}</span>
                    <span
                      class="q-ml-sm text-grey-6"
                      style="text-decoration: line-through"
                    >
                      ${{ product.upPrice }}
                    </span>
                  </div>
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>

    <div class="text-grey-9 text-weight-bold" v-if="$q.screen.lt.md">
      <div class="row items-center q-mx-sm">
        <div class="col-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <span class="text-grey-9 text-h6 text-weight-bold"> Trending </span>
            <a class="text-primary q-ml-sm cursor-pointer">[see all]</a>
          </div>
          <q-carousel
            v-model="latest_slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation
            padding
            arrows
            height="340px"
            class="rounded-borders"
          >
            <q-carousel-slide
              v-for="(val, idx) in [1, 2, 3]"
              :name="val"
              :key="idx"
              class="column no-wrap"
            >
              <div
                class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
              >
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
                  v-for="(product, index) in shuffle(products)"
                  :key="index"
                >
                  <q-img class="rounded-borders" :src="`${product.image}.jpeg`">
                  </q-img>
                  <div>
                    {{ product.name }}
                  </div>
                  <div class="text-caption text-weight-bold text-green">
                    Black
                  </div>
                  <div>
                    <span>${{ product.price }}</span>
                    <span
                      class="q-ml-sm text-grey-6"
                      style="text-decoration: line-through"
                    >
                      ${{ product.upPrice }}
                    </span>
                  </div>
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndePage",
  data() {
    return {
      slide: "first",
      trending_slide: 1,
      latest_slide: 1,
      products: [
        {
          name: "Sony - WH-1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones",
          image: "p1",
          price: "399.99",
          upPrice: "450",
        },
        {
          name: "Frigidaire - 3-in-1 Portable Room Air Conditioner - White",
          image: "p2",
          price: "397.99",
          upPrice: "450",
        },
        {
          name: "Acer - Nitro 5 - 15.6 FHD Gaming Laptop – Intel Core i5 – NVIDIA",
          image: "p3",
          price: "899.99",
          upPrice: "1000",
        },
        {
          name: "Sony - WH-1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones",
          image: "p1",
          price: "399.99",
          upPrice: "450",
        },
        {
          name: "Frigidaire - 3-in-1 Portable Room Air Conditioner - White",
          image: "p2",
          price: "397.99",
          upPrice: "450",
        },
        {
          name: "Acer - Nitro 5 - 15.6 FHD Gaming Laptop – Intel Core i5 – NVIDIA",
          image: "p3",
          price: "899.99",
          upPrice: "1000",
        },
      ],
    };
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 8px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
