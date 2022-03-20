import { defineStore } from "pinia";
import axios from 'axios'
import { contentStore } from "./toHTML";

export const repoStore = defineStore("repoStore", {
    state: () => ({
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
                            newLi.innerHTML = res.data[i].name
                            newLi.classList.add("created_ul_label")

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
                            newLi.classList.add("created_li")
                            newLi.innerHTML = res.data[i].name

                            newLi.addEventListener('click', () => {
                                this.display_file(res.data[i])
                            })

                            parent?.appendChild(newLi)
                        }
                    }
                })
        },

        deleteRepo(parent:any){
            while(parent.childNodes.length >0){
                const child = parent.lastChild
                if(child?.hasChildNodes)
                    this.deleteRepo(child)
                parent.removeChild(child)
            }
        },

        /**
         * Toggle display of element
         * 
         * @param id Element ID
         */
        showElement(id: string){
            const element = document.getElementById(id)
            if(element?.style.display === "none")
                element!.style.display = "block"
            else
                element!.style.display = "none"
        },

        /**
         * Display the file in corresponing format
         * 
         * @param data response data from axios call
         */
        async display_file(data: any){
            const useHTML = contentStore()
            await axios.get(data.download_url)
            .then((res)=>{
                useHTML.setContent(res.data)
                useHTML.setDisplay(true)
            })

            if(data.download_url.includes(".md")){
                useHTML.markedToHTML()
            }
            else if(data.download_url.includes(".html")){
            }
            else if(data.download_url.includes(".png") ||
            data.download_url.includes(".jp")){
                useHTML.setDisplay(false)
                useHTML.setImg(data.download_url)
            }
            else{
                useHTML.organizeContent()
            }
        },
    }
})