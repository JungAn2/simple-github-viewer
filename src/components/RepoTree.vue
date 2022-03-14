<template>

</template>

<script setup lang="ts">
import { AuthStore } from '@/stores/Auth';
import axios from 'axios'

const useAuth = AuthStore()

axios.get('https://api.github.com/repos/' + useAuth.getRepoOwner + '/' + useAuth.getRepoName + '/contents')


</script>