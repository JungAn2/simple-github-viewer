import { defineStore } from "pinia";

/**
 * The Authentication store
 */
export const AuthStore = defineStore("auth", {
    state: () => ({
        repoOwner: "JungAn2",
        repo: "MarkdownNotes",
        website: "https://github.com/JungAn2/MarkdownNotes",
        darkmode: false,
        initPath: "",
        initID: '/',
        currentDir: "root",
    }),
    getters: {
        getRepoOwner(state) {
            return state.repoOwner
        },
        getRepoName(state) {
            return state.repo
        },
        getDarkmode(state) {
            return state.darkmode
        },
        getInitPath(state) {
            return state.initPath
        },
        getInitId(state) {
            return state.initID
        },
        getWebsite(state) {
            return state.website
        },
        getCurrentDir(state) {
            return state.currentDir
        }
    },
    actions: {
        setRepoInfo(repoUser: string, repoName: string) {
            this.repoOwner = repoUser
            this.repo = repoName
        },

        setDarkmode(bool: boolean) {
            this.darkmode = bool
        },

        setInitPath() {
            this.initPath = "https://api.github.com/repos/".concat(this.repoOwner, "/", this.repo, "/contents")
        },
        setWebsite() {
            this.website = "https://github.com/".concat(this.repoOwner, "/", this.repo)
        },
        setCurrentDir(dir: string) {
            this.currentDir = dir
        }
    }
})