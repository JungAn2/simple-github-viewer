import { defineStore } from "pinia";
import { AuthStore } from "./Auth";

export const modeStore = defineStore("modeStore", {
    state: () => ({
        useAuth: AuthStore()
    }),
    getters: {

    },
    actions: {
        /**
         * Set class(dark-mode/dark-mode-transparent) to the body and all child of body
         * 
         * @param body Main element of DOM
         * @param bool Boolean for transparent background
         */
        recursiveSetDark(body: any) {
            body.classList.add("dark-mode")
            if (body.childElementCount > 0) {
                for (let i = 0; i < body?.childElementCount; i++) {
                    this.recursiveSetDark(body.children[i])
                }
            }
        },

        /**
         * Remove class (dark-mode/dark-mode-transparent) from the body and all child of body
         * 
         * @param body Main element of DOM
         * @param bool Boolean for transparent background
         */
        recursiveRemoveDark(body: any) {
            body.classList.remove("dark-mode")
            if (body.childElementCount > 0) {
                for (let i = 0; i < body?.childElementCount; i++) {
                    this.recursiveRemoveDark(body.children[i])
                }
            }
        },

        /**
         *  Toggle of dark mode
         */
        Initialize() {
            //Main element that wraps around the whole layout
            //document.body.classList.add("dark-mode")

            const doc = document.getElementById("homeView")

            if (this.useAuth.getDarkmode) {
                this.recursiveRemoveDark(doc)
                this.useAuth.setDarkmode(false)
            }
            else {
                this.recursiveSetDark(doc)
                this.useAuth.setDarkmode(true)
            }

        },
    }
})