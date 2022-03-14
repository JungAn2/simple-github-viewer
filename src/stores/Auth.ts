import { defineStore } from "pinia";

/**
 * The Authentication store
 */
export const AuthStore = defineStore("auth", {
    state: () => ({
        repoOwner: "JungAn2",
        repo: "MarkdownNotes",
        darkmode: false,
    }),
    getters: {
        getRepoOwner(state){
            return state.repoOwner
        },
        getRepoName(state){
            return state.repo
        },
        getDarkmode(state){
            return state.darkmode;
        }
    },
    actions: {
        setRepoInfo(repoUser: string, repoName: string){
            this.repoOwner = repoUser
            this.repo = repoName
        },

        setDarkmode(bool: boolean){
            this.darkmode = bool
        }

    }
})