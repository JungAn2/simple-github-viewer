<template>
    <button class="box-shadow" @click="useMode.Initialize()" onload="lightMode()">Toggle</button>
</template>>

<script setup lang="ts">
import { modeStore } from '@/stores/modes'

const useMode = modeStore()

</script>