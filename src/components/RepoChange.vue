<template>
    <button @click="ModelView">Change repo</button>
    <div id="model" class="model" style="display: none;">
        <div id="model-container" class="model-container col">
            <span class="exit" @click="ModelView">X</span>
            <span style="position:relative; left:25%; width: 50%;">Owner:</span>
            <input
                type="text"
                v-model="ownerInput"
                v-on:keyup.enter="changeRepo"
                style="width:50%; border-style: none; box-shadow: 5px 5px 5px 0; height: 30px; position: relative; left:25%"
                required
            />
            <br />
            <span style="position:relative; left:25%; width: 50%;">Repo:</span>
            <input
                type="text"
                v-model="repoInput"
                v-on:keyup.enter="changeRepo"
                style="width:50%; border-style: none; box-shadow: 5px 5px 5px 0; height: 30px; position: relative; left:25%"
                required
            />
            <br />
            <button
                @click="changeRepo"
                class="row"
                style="position: relative; left:25%; width:50%; height: 30px;"
            >Change</button>
            <span id="repoCheck" style="color:transparent"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthStore } from '@/stores/Auth';
import { repoStore } from '@/stores/Repo';
import axios from 'axios'

const useAuth = AuthStore()
const useRepo = repoStore()

//Stores the input from the form
const ownerInput = ref(useAuth.getRepoOwner)
const repoInput = ref(useAuth.getRepoName)
var timer: any = null

const getRepo = async (): Promise<any> => {
    let axiosData = null
    await axios.get("https://api.github.com/repos/" + ownerInput.value + '/' + repoInput.value)
        .then((res) => {
            axiosData = res.data
        })
    return axiosData
}

const checkRepo = async () => {
    try {
        let api = await getRepo()
        return true
    } catch (e) {
        return false
    }
}

const changeRepo = async () => {
    const repoExist: boolean = await checkRepo()

    const span = document.getElementById("repoCheck")

    if (!repoExist) {
        span!.textContent = "None existing owner or repository"
        span!.style.color = "red"

        clearTimeout(timer)
        timer = setTimeout(() => {
            span!.style.color = "transparent"
        }, 2000);
    }

    if (repoExist) {
        useAuth.setRepoInfo(ownerInput.value, repoInput.value);
        useAuth.setInitPath()
        useRepo.repoTree(useAuth.getInitPath, useAuth.getInitId)
        ModelView()
    }
}


/**
 * For showing model
 */
const ModelView = () => {
    /**
     * For Displaying model
     */
    const doc = document.getElementById("model")
    if (doc!.style.display === "none") {
        doc!.style.display = "block"

        //Prevent scolling in brute force way
        document.body.style.overflow = "hidden"
    }
    else {
        doc!.style.display = "none"
        //Allow scrolling again
        document.body.style.overflow = "auto"
    }
}

/**
 * Closing model view by clicking on model not container
 * 
 * @param event Winodws click event
 */
window.onclick = (event) => {
    const model = document.getElementById("model")
    //Targets model which is the background image
    if (event.target == model)
        model!.style.display = "none"
}
</script>

<style scoped>
.model {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 3;
    align-content: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    background-color: transparent;
}

.model-container {
    position: absolute;
    width: 25%;
    height: 30%;
    /**Manual Calc of position*/
    left: calc(100vw - 65%);
    top: calc(100vh - 65%);
    background-color: transparent;
    z-index: 5;
    box-shadow: 0 0 15px 15px;
    overflow: auto;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: transparent;
}

.col {
    display: flex;
    flex-direction: column;
    background-color: transparent;
}

.exit {
    margin-left: auto;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
    background-color: transparent;
}

.exit:hover {
    background-color: gray;
}

table tr td {
    background-color: transparent;
}
</style>