<template>
    <button class="box-shadow" @click="ModalView">Change repo</button>
    <div id="modal" class="modal" style="display: none;" @click.self="ModalView">
        <div id="modal-container" class="modal-container col box-shadow" >
            <span class="exit" @click="ModalView">X</span>
            <span style="position:relative; left:25%; width: 50%;">Owner:</span>
            <input
                type="text"
                class="box-shadow"
                v-model="ownerInput"
                v-on:keyup.enter="changeRepo"
                style="width:50%; height: 30px; position: relative; left:25%"
                required
            />
            <br />
            <span style="position:relative; left:25%; width: 50%;">Repo:</span>
            <input
                type="text"
                class="box-shadow"
                v-model="repoInput"
                v-on:keyup.enter="changeRepo"
                style="width:50%; height: 30px; position: relative; left:25%"
                required
            />
            <br />
            <button
                @click="changeRepo"
                class="row box-shadow"
                style="position: relative; left:25%; width:50%; height: 30px; text-align: center;;"
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
        ModalView()
    }
}


/**
 * For showing modal
 */
const ModalView = () => {
    /**
     * For Displaying modal
     */
    const doc = document.getElementById("modal")
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
</script>

<style scoped>
.modal {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 3;
    align-content: center;
    justify-content: center;
    backdrop-filter: blur(var(--backdrop-filter));
    background-color: transparent;
}

.modal-container {
    position: absolute;
    width: 25%;
    height: 30%;
    /**Manual Calc of position*/
    left: calc(100vw - 65%);
    top: calc(100vh - 65%);
    z-index: 10;
    overflow: auto;
    border-style: solid;
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

input,
span {
    background-color: transparent;
}
</style>