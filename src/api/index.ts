import axios, { AxiosRequestConfig } from "axios";
import {RequestConfigProcessor, ServerList, ServerListFilter} from "./core";

import UserApi from "./user";

export * from "./user"

axios.defaults.withCredentials = true;

export const BASE_URL = "http://localhost:8080";

function createAxios(config?: AxiosRequestConfig) {
	const instance = axios.create(config);

	instance.interceptors.response.use(undefined, error => {
		if (error.response) {
			error.code = error.response.status;
		} else {
			error.code = -1; // 连接失败
		}
		return Promise.reject(error);
	});
	return instance;
}

const DEFAULT_SERVERS: ServerList = {
    web: createAxios(),
    content: createAxios({baseURL: BASE_URL})
}

export class Api {
	private readonly serverList: ServerList;
    constructor(serverList: ServerList) {
		this.serverList = serverList;
	}
    static register(name: string, clazz: any) {
		Object.defineProperty(Api.prototype, name, {
			get() {
				return new clazz(this.serverList);
			},
			enumerable: true,
			configurable: true,
		});
	}

    withConfig(processor: RequestConfigProcessor) {
		return new Api(new ServerListFilter(this.serverList, processor));
	}

    	/**
	 * 设置取消信号，使请求能够取消。
	 *
	 * @param signal 取消信号
	 * @return API 集
	 */
	withCancelToken(signal?: AbortSignal) {
		return this.withConfig(config => config.signal = signal);
	}
}

Api.register("user", UserApi);

// 为了让IDE能够提示
export interface Api {
    user: UserApi;
}
export default new Api(DEFAULT_SERVERS)