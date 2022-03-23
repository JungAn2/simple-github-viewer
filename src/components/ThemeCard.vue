<template>
    <div
        class="card"
    ></div>
</template>

<script setup lang="ts">

const props = defineProps({
    themeID: String,
})

const css = ()=>{
    return {
        '--theme-bg': "--" + props.themeID + "-bg",
        '--theme-secondary': "--" + props.themeID + "-secondary",
        '--theme-text': "--" + props.themeID + "-text",
        '--theme-border': "--" + props.themeID + "-border",
    }
}

</script>

<style scope>
.card {
    background-image: linear-gradient(to bottom, 
    var(--theme-bg) 0 25%,
    var(--theme-secondary) 25% 50%,
    var(--theme-text) 50% 75%,
    var(--theme-border) 75% 100%);
    cursor: pointer;
}
</style>