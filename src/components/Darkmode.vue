<template>
    <button @click="Initialize" onload="Initialize()">Toggle</button>
</template>>

<script setup lang="ts">
import { AuthStore } from '@/stores/Auth';

const useAuth = AuthStore()

/**
 * Set class(dark-mode/dark-mode-transparent) to the body and all child of body
 * 
 * @param body Main element of DOM
 * @param bool Boolean for transparent background
 */
const recursiveSetDark = (body: any, bool:boolean) => {
    !bool? body.classList.add("dark-mode"): body.classList.add("dark-mode-transparent")
    if (body.childElementCount > 0) {
        for (let i = 0; i < body?.childElementCount; i++) {
            recursiveSetDark(body.children[i], bool)
        }
    }
}

/**
 * Remove class (dark-mode/dark-mode-transparent) from the body and all child of body
 * 
 * @param body Main element of DOM
 * @param bool Boolean for transparent background
 */
const recursiveRemoveDark = (body: any, bool: boolean) => {
    !bool? body.classList.remove("dark-mode"): body.classList.remove("dark-mode-transparent")
    if (body.childElementCount > 0) {
        for (let i = 0; i < body?.childElementCount; i++) {
            recursiveRemoveDark(body.children[i], bool)
        }
    }
}

/**
 *  Toggle of dark mode
 */
const Initialize = () => {
    //Main element that wraps around the whole layout
    const doc = document.getElementById("main")
    //Main model for changing repo
    const model = document.getElementById("model")

    if (useAuth.getDarkmode) {
        recursiveRemoveDark(doc, false)
        recursiveRemoveDark(model, true)
        useAuth.setDarkmode(false)
    }
    else {
        recursiveSetDark(doc, false)
        recursiveSetDark(model, true)
        useAuth.setDarkmode(true)
    }

}



</script>