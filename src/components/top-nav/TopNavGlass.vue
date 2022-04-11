<template>
    <nav :class="$style.container">
        <!-- 为了动态接收传入的样式，不能用伪元素 -->
        <div :class="[$style.pseudo, imageStyle]" :style="imageStyle">
        </div>
        <top-nav tag="div" class="full-vertex"></top-nav>
</nav>
</template>
<script setup lang="ts">
// 直接引用组件 不需要注册
import TopNav from './TopNav.vue';
interface TopNavGlassProps {
    imageClass: string;
    imageStyle: string | object;
}
// 这种写法只在setup语法糖中被允许
defineProps<TopNavGlassProps>()


</script>
<style module lang="less">
.container {
    // composes 引入的类名将会被组合在同一个标签上
    composes: top-nav from global;
}

.pseudo {
    composes: top-nav from global;
    position: relative;
    height: var(--nav-height);
}
</style>