<template>
  <main class="row" id="homeView">
    <Nav>
      <template #repo>
        <RepoTree />
      </template>
      <template #screen>
          <div v-if="useHTML.getDisplay == true" v-html="useHTML.getContent" class="screen" id="screen">
          </div>
          <img v-else :src="useHTML.getImg" class="screen" />
      </template>
    </Nav>
  </main>
</template>

<script setup lang="ts">
import Nav from "@/layout/main.vue"
import RepoTree from "@/components/RepoTree.vue"
import { contentStore } from "@/stores/toHTML"


const useHTML = contentStore()

</script>


<style scoped>
.screen {
  padding: 10px;
  height: auto;
  width: 100%;
  border-style: solid;
  border-color: var(--light-border);
  overflow: auto;
  max-height: 100%;
  min-height: 100%;
  object-fit: contain;
}

.row{
  justify-content: space-between;
  align-items: center;
}
</style>