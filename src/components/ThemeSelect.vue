<template>
    <button class="box-shadow" @click="showModal">Theme Selector</button>
    <div class="theme-modal background hidden" id="theme-modal">
        <div class="theme-modal-container">
            <div class="row">
                <div class="card theme-base" @click="changeTheme('root')"><div class="col">
                </div></div>
                <div class="card theme-1" @click="changeTheme('Theme-1')"></div>
                <ThemeCardVue themeID="Theme-base" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ThemeCardVue from './ThemeCard.vue';

/**
 * Show theme modal
 */
const showModal = () => {
    const modal = document.getElementById("theme-modal")
    //doc[0] since there is only one element with that class name
    modal?.classList.remove('hidden')

}

window.onclick = (event) => {
    const modal = document.getElementById("theme-modal")

    //Targets model which is the background image
    if (event.target == modal)
        modal!.classList.add('hidden')
}

/**
 * Changes the theme of the website
 * 
 * @param id id for which theme is being applied
 */
const changeTheme = (id: string) => {
    const root = document.documentElement
    const modal = document.getElementById("theme-modal")

    //Base theme
    if (id === 'root') {
        root.style.setProperty('--base-bg', 'var(--theme-base-bg)')
        root.style.setProperty('--base-secondary', 'var(--theme-base-secondary)')
        root.style.setProperty('--base-text', 'var(--theme-base-text)')
        root.style.setProperty('--base-border', 'var(--theme-base-border)')
    }

    //Theme-1
    else if (id === 'Theme-1') {
        root.style.setProperty('--base-bg', 'var(--theme-1-bg)')
        root.style.setProperty('--base-secondary', 'var(--theme-1-secondary)')
        root.style.setProperty('--base-text', 'var(--theme-1-text)')
        root.style.setProperty('--base-border', 'var(--theme-1-border)')
    }

    else if(id === 'Theme-2'){
        root.style.setProperty('--base-bg', 'var(--theme-2-bg)')
        root.style.setProperty('--base-secondary', 'var(--theme-2-secondary)')
        root.style.setProperty('--base-text', 'var(--theme-2-text)')
        root.style.setProperty('--base-border', 'var(--theme-2-border)')
    }
    modal?.classList.add('hidden')
}



</script>

<style scoped>
.background {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    backdrop-filter: blur(var(--backdrop-filter));
    background-color: transparent;
    z-index: 5;
}

.hidden {
    display: none;
}

.card {
    width: 20vh;
    height: 25vh;
    border-radius: 20%;
    margin: 5vh;
}

.theme-base{
    background-image: linear-gradient(to bottom, 
    var(--theme-base-bg) 0 25%, 
    var(--theme-base-secondary) 25% 50%, 
    var(--theme-base-text) 50% 75%, 
    var(--theme-base-border)75% 100%);
    cursor: pointer;
}

.theme-1{
    background-image: linear-gradient(to bottom, 
    var(--theme-1-bg) 0 25%, 
    var(--theme-1-secondary) 25% 50%, 
    var(--theme-1-text) 50% 75%, 
    var(--theme-1-border)75% 100%);
    cursor: pointer;
}
</style>