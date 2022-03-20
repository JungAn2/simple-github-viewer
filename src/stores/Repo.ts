import { defineStore } from "pinia";
import axios from 'axios'

export const repoStore = defineStore("repoStore", {
    state: () => ({

    }),
    getters: {

    },
    actions: {
        //Fix UL and li display
        async repoTree(path: string, id: string) {
            const parent = document.getElementById(id)
            //Delete all the element inside before reloading
            await axios.get(path)
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        //Add the repo to map
                        if (res.data[i].download_url == null) {

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
                                this.display_raw(res.data[i].download_url)
                            })

                            parent?.appendChild(newLi)
                        }
                    }
                })
        },

        showElement(id: string){
            const element = document.getElementById(id)
            if(element?.style.display === "none")
                element!.style.display = "block"
            else
                element!.style.display = "none"
        },
        
        display_raw(rawInfo: string){
            //Get element from the screen
            const screen = document.getElementById("screen")
            axios.get(rawInfo)
            .then((res)=>{
                screen!.textContent = res.data
            })
        },

    }
})