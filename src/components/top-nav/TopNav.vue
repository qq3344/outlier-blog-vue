<template>
    <component :is="tag" :class="[$style.container, colored && $style.colored]" class="top-nav">
        <router-link to="/" title="回到首页" :class="$style.logoLink">
            <img src="@/assets/img/logo-kaciras-wide.svg" alt="logo" :class="$style.logo">
        </router-link>
        <div class="nav-right">
            <template v-if="user.id > 0">
                <router-link to="/profile">
                    <img :src="user.avatar" :alt="user.name" title="就是一个头像而已" class="small head" :class="$style.head">
                </router-link>
                <router-link v-if="user.isAdmin" to="/console" class="nav-item">
                    管理
                </router-link>
                <button class="nav-item" @click="logout">退出登录</button>
            </template>
        </div>
        </component>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUser } from '@/store'
interface TopNavBodyProps {
    tag?: string;
}
//给 props 设置默认值
withDefaults(defineProps<TopNavBodyProps>(), {
    tag: "nav",
})

const user = useCurrentUser()
const colored = ref(false)

function logout() {
    return user.logout();
}

</script>
<style module lang="less">
.container {
    display: flex;
    background-color: rgba(255, 255, 255, .5);
    transition: background-color .3s;

    @media screen and (max-width: @length-screen-mobile) {
        // nav 贴着并一直跟随 不会因为向下滑而消失 sticky必须设置四个方向其中一个的阈值
        position: sticky;
        top: 0;
    }

    @media screen and (min-width: @length-screen-pad) {
        // 5vw 等于页面宽度的 5%
        // ipad设备下容器左右两边多出 5vw空白
        padding: 0 5vw;
    }
}

.colored {
    background-color: white !important;
}

.colored :global(.nav-item) {
    color: black !important;
}
</style>