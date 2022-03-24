import { defineStore } from "pinia";
import axios from 'axios'
import { contentStore } from "./toHTML";
import { AuthStore } from "./Auth";
import { modeStore } from "./modes";

export const repoStore = defineStore("repoStore", {
    state: () => ({
        useHTML: contentStore(),
        useAuth: AuthStore(),
        useMode: modeStore(),
    }),
    getters: {

    },
    actions: {

        /**
         * Retrieves the repo tree from github
         * 
         * @param path Github API call address
         * @param id The parent element id
         */
        async repoTree(path: string, id: string) {
            this.useAuth.setWebsite()
            const parent = document.getElementById(id)
            this.deleteRepo(parent)
            //Delete all the element inside before reloading
            await axios.get(path)
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        //Add the repo to map
                        if (res.data[i].type == "dir") {

                            //Label for the list
                            const newLi = document.createElement('li')
                            const Li_ID = res.data[i].path.concat('li')
                            newLi.innerHTML = res.data[i].name
                            newLi.classList.add("created_ul_label")
                            newLi.classList.add("list_folder")

                            //Add click event to open the Ul id created
                            newLi.addEventListener('click', (event) => {
                                this.showElement(newID)
                            })

                            //Attach to the parent
                            parent?.appendChild(newLi)

                            //New path for the recursive
                            const newPath = path.concat("/", res.data[i].name)
                            const newID = res.data[i].path
                            const newUl = document.createElement('ul')
                            newUl.setAttribute('id', newID)
                            newUl.setAttribute('style', 'display:none')
                            parent?.appendChild(newUl)

                            //Attach to the parent
                            this.repoTree(newPath, newID)
                        }
                        else {
                            const newLi = document.createElement('li')
                            const newID = res.data[i].path
                            newLi.setAttribute('id', newID)
                            newLi.classList.add("created_li")
                            newLi.innerHTML = res.data[i].name

                            this.set_svg(newLi, res.data[i].download_url)

                            newLi.addEventListener('click', () => {
                                this.display_file(res.data[i])
                                this.set_currentDir(newID)
                            })

                            this.useAuth.setnewMap(newID, res.data[i].download_url)

                            parent?.appendChild(newLi)
                        }
                    }
                })
        },

        /**
         * Deletes all elements
         * 
         * @param parent element of the root
         */
        deleteRepo(parent: any) {
            while (parent.childNodes.length > 0) {
                const child = parent.lastChild
                if (child?.hasChildNodes)
                    this.deleteRepo(child)
                parent.removeChild(child)
            }
        },

        /**
         * Toggle display of element
         * 
         * @param id Element ID
         */
        showElement(id: string) {
            const element = document.getElementById(id)
            if (element?.style.display === "none")
                element!.style.display = "block"
            else
                element!.style.display = "none"
        },

        /**
         * Display the file in corresponing format
         * 
         * @param data response data from axios call
         */
        async display_file(data: any) {
            await axios.get(data.download_url)
                .then((res) => {
                    this.useHTML.setContent(res.data)
                    this.useHTML.setDisplay(true)
                })

            if (data.download_url.includes(".md")) {
                this.useHTML.markedToHTML()
            }
            else if (data.download_url.includes(".html")) {
            }
            else if (data.download_url.includes(".png") ||
                data.download_url.includes(".jp")) {
                this.useHTML.setDisplay(false)
                this.useHTML.setImg(data.download_url)
            }
            else {
                this.useHTML.organizeContent()
            }
        },

        /**
         * Sets the list style images
         * 
         * @param element HTML element to add image
         * @param data data string to check data type
         */
        set_svg(element: HTMLElement, data: any) {
            if (data.includes(".png") ||
                data.includes(".jp")) {
                element.classList.add('list_image')
            }
            else {
                element.classList.add('list_file')
            }
        },

        set_currentDir(id: string) {

            const previousDir = document.getElementById(this.useAuth.getCurrentDir)
            const currentDir = document.getElementById(id)
            previousDir!.classList.remove('invert')
            currentDir!.classList.add('invert')

            this.useAuth.setCurrentDir(id)
        }
    }
})