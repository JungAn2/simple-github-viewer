<template>
    <button @click="getRepoTree" style="width: 100%;">Refresh</button>
    <ul style="overflow: scroll; margin: 0; padding: 0; height: 100%;">
        <li id="root" class="created_ul_label">/</li>
        <ul id="/"></ul>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthStore } from '@/stores/Auth';
import { repoStore } from '@/stores/Repo';
import axios from 'axios'



const useAuth = AuthStore()
const useRepo = repoStore()

const getRepoTree = ()=>{
    useAuth.setInitPath()
    useRepo.repoTree(useAuth.getInitPath, useAuth.getInitId)
}

//Gets the default repo from authStore
window.onload = ()=>{
    getRepoTree()
}

</script>

<style scoped>
</style>