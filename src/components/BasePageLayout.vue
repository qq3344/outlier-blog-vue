<template>
	<!-- 做个属性穿透这么麻烦 -->
	<slot name="nav">
		<top-nav
			:class="props.navClass"
			:style="props.navStyle"
		/>
	</slot>

	<slot></slot>

	<!-- <page-footer v-if="footer"/> -->
</template>

<script setup lang="ts">
// import PageFooter from "./PageFooter.vue";
import TopNav from "./top-nav/TopNav.vue";


interface BasePageLayoutProps {
    footer?: true;
    navClass?: true;
    navStyle?: true;
}

const props = defineProps<BasePageLayoutProps>()

</script>
