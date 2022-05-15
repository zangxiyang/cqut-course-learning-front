/**
 * @作者: Seale
 * @时间: 2022/4/12
 * @版本: V1.0
 * @说明:
 */

import {UserState} from "@/store/user/types";
import {defineStore} from "pinia";

const useUserStore = defineStore('user', {
        state: (): UserState => ({
            id: undefined,
            userName: undefined,
            phone: undefined,
            roleName: undefined,
            role: '',
            sex: undefined,
            nickName: undefined,
            description: undefined,
            className: undefined,
            school: undefined,
            avatar: undefined,

        }),
        getters: {
            userInfo(state: UserState): UserState {
                return {...state}
            }
        },
        actions: {
            setInfo(userState: Partial<UserState>){
                this.$patch(userState);
            },
            resetInfo(){
                this.$reset();
            },
            setUsername(name: string){
                this.userName =name;
            }
        }
    }
)

export default useUserStore;
