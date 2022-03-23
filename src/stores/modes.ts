import { defineStore } from "pinia";
import { AuthStore } from "./Auth";
import { repoStore } from "./Repo"

export const modeStore = defineStore("modeStore", {
    state: () => ({
        useAuth: AuthStore(),
        useRepo: repoStore(),
    }),
    getters: {

    },
    actions: {
        /**
         *  Toggle of dark mode
         */
        Initialize() {
            //Main element that wraps around the whole layout
            const doc = document.documentElement

            if(this.useAuth.getDarkmode){
                doc!.style.setProperty('--base-bg', 'var(--light-bg)')
                this.useAuth.setDarkmode(false)
            }
            else{
                doc!.style.setProperty('--base-bg', 'var(--dark-bg)')
                this.useAuth.setDarkmode(true)
            }

            this.useRepo.set_currentDir(this.useAuth.getCurrentDir)
        },
    }
})