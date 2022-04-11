<template></template>
<script setup lang="ts">

import TopNavGlass from "./top-nav/TopNavGlass.vue";
import { computed } from "vue"
interface BannerPageLayoutProps {
    banner?: {
        image: string,
        theme: number,
    },
    navClass?: boolean
    navStyle?: boolean
}

const props = defineProps<BannerPageLayoutProps>()

const desktopNavStyle = computed(() => {
    const { banner } = props
    if (banner) {
        return { "--background": `url(${banner.image})` };
    }
    return null;
})

const desktopNavClass = computed(() => {
    const { banner } = props
    if (!banner) {
        return "default-banner";
    }
    switch (banner.theme) {
        case 1:
            return "light";
        case 2:
            return "dark";
        default:
            return null;
    }
})

</script>
<style module lang="less">
</style>