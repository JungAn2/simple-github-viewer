<template>
    <a :href="linkSrc">
        <img src="@/components/img/png/GitHub-logo.png" />
        <span class="tooltip">{{ tip }}</span>
    </a>
</template>

<script setup lang="ts">

defineProps({
    linkSrc: String,
    imgSrc: String,
    tip: String,
})

</script>

<style scoped>
a {
    border-radius: 50%;
    width: 64px;
    margin: 10px;
}

.tooltip {
    position: absolute;
    visibility: hidden;
    width: 120px;
    background-color: var(--dark-bg);
    text-align: center;
    padding: 5px;
    border-radius: 5%;
}

.tooltip .dark-mode {
    background-color: var(--light-bg);
}

a:hover .tooltip {
    visibility: visible;
}
</style>