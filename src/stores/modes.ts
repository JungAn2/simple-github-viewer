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

            doc.classList.toggle('invert')
            this.useAuth.darkmode ? this.useAuth.setDarkmode(false) : this.useAuth.setDarkmode(true)
        },
    }
})