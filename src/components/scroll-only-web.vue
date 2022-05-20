<template>
  <slot v-if="$q.screen.lt.md" />
  <q-scroll-area
    v-else
    :thumb-style="{ ...thumbStyle, zIndex: 2000 }"
    :bar-style="{ ...barStyle, zIndex: 2000 }"
    :visible="scrollAreaVisible"
    :style="scrollStyle"
    :class="className"
  >
    <slot />
  </q-scroll-area>
</template>
<script>
export default {
  props: {
    scrollStyle: {
      type: [String, Object],
      default: "",
    },
    className: {
      type: [String, Object],
      default: "",
    },
  },
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
};
</script>
