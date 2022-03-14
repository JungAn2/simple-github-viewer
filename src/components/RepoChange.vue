<template>
    <button @click="ModelView">Change repo</button>
    <div id="model" class="model" style="display: none;">
        <div id="model-container" class="model-container col">
                <table style="background-color: transparent">
                    <tr>
                        <td></td>
                        <td style="text-align:right">
                            <span class="exit" @click="ModelView">X</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;">Owner:</td>
                        <td style="text-align: left;">
                            <input type="text" v-model="ownerInput" required />
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right">Repo:</td>
                        <td style="text-align: left">
                            <input type="text" v-model="repoInput" required />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: left">
                            <button @click="changeRepo">Change</button>
                        </td>
                    </tr>
                </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthStore } from '@/stores/Auth';
import axios from 'axios'

const useAuth = AuthStore()

//Stores the input from the form
const ownerInput = ref("")
const repoInput = ref("")

const checkRepo = async() => {
    const api = ref(null)
    axios.get("https://api.github.com/repos/" + ownerInput.value + '/' + repoInput.value)
}

const changeRepo = () => {
    checkRepo()
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
    height: 25%;
    /**Manual Calc of position*/
    left: calc(100vw - 65%);
    top: calc(100vh - 65%);
    background-color: transparent;
    z-index: 5;
}

.row {
    display: flex;
    flex-direction: row;
}

.col {
    display: flex;
    flex-direction: column;
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
    transition-duration: 0.5s;
    background-color: gray;
}

table tr td {
    background-color: transparent;
}
</style>