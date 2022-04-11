import { defineStore } from "pinia";
import api, { AuthType, User } from "@/api";

const GUESTS: User = {
    id:0,
    auth: AuthType.None,
    name: "(游客)",

    // TODO: Pinia 设计上分两层 reactive 存储，内层由 state 选项生成但是在绑定到最终结果时
	//  用了 toRefs 导致忽略了 undefined 和不存在的属性，使得 $patch 在给这样的属性赋值时不能触发响应。
	//  https://github.com/vuejs/pinia/blob/98d09b08f3d8ca3bb193a31a788cb5ed92f22396/packages/pinia/src/store.ts#L133
	avatar: null as any,
}

/** 当前登录的用户，其值将在入口处被设置 */
export const useCurrentUser = defineStore("user", {
    state: () => GUESTS,
    getters: {
        isAdmin: state => state.id === 2,
    },
    actions: {
        // 刷新当前 stae 值
        async refresh(apiUse = api) {
            const res = await apiUse.user.getCurrent();
            if(res.status < 300) {
                this.$patch(res.data)
            }
        },
        logout() {
            // reset 恢复成初始值
            return api.user.logout().then(() => this.$reset())
        }
    }
})

/** 路由页面的预取数据 */
export const usePrefetch = defineStore("prefetch", {
    state: () => ({data: {} as any})
})