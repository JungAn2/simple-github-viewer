<template>
    <button @click="getRepo(initPath, '/')">click me</button>
    <br />
    <ul style="overflow: scroll; margin: 0; padding: 0">
        <li id="root">Root</li>
        <ul id="/"></ul>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthStore } from '@/stores/Auth';
import axios from 'axios'



const useAuth = AuthStore()

const initPath = "https://api.github.com/repos/".concat(useAuth.repoOwner, "/", useAuth.repo, "/contents")

window.document.onload = ()=>{
    getRepo(initPath, '/')
}

//Fix UL and li display
const getRepo = async (path: string, id: string) => {
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
                        showElement(newID)
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
                    getRepo(newPath, newID)
                }
                else {
                    const newLi = document.createElement('li')
                    newLi.classList.add("created_li")
                    newLi.innerHTML = res.data[i].name

                    newLi.addEventListener('click', ()=>{
                        display_raw(res.data[i].download_url)
                    })

                    parent?.appendChild(newLi)
                }
            }
        })
}

const showElement = (id: string) => {
    const element = document.getElementById(id)
    if(element?.style.display === "none")
        element!.style.display = "block"
    else
        element!.style.display = "none"
}

const display_raw = (rawInfo: string)=>{
    //Get element from the screen
    const screen = document.getElementById("screen")
    axios.get(rawInfo)
    .then((res)=>{
        screen!.textContent = res.data
    })
}

//Gets the default repo from authStore
window.onload = ()=>{
    getRepo(initPath, '/')
}

</script>

<style scoped>

.created_ul_label{
    cursor:pointer;
    color: red;
}

.created_li{
    color: red;
    list-style:none;
}
</style>