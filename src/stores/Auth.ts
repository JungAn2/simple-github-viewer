import { defineStore } from "pinia";

/**
 * The Authentication store
 */
export const AuthStore = defineStore("auth", {
    state: () => ({
        repoOwner: "JungAn2",
        repo: "MarkdownNotes",
        darkmode: false,
        initPath: "",
        initID: '/'
    }),
    getters: {
        getRepoOwner(state){
            return state.repoOwner
        },
        getRepoName(state){
            return state.repo
        },
        getDarkmode(state){
            return state.darkmode
        },
        getInitPath(state){
            return state.initPath
        },
        getInitId(state){
            return state.initID
        },
    },
    actions: {
        setRepoInfo(repoUser: string, repoName: string){
            this.repoOwner = repoUser
            this.repo = repoName
        },

        setDarkmode(bool: boolean){
            this.darkmode = bool
        },

        setInitPath(){
            this.initPath = "https://api.github.com/repos/".concat(this.repoOwner, "/", this.repo, "/contents")
        }

    }
})