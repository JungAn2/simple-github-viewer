<template>
  <main class="row">
    <Nav>
      <template #repo>
        <RepoTree />
      </template>
      <template #screen>
          <div class="screen" id="screen">
          </div>
      </template>
    </Nav>
  </main>
</template>

<script setup lang="ts">
import Nav from "@/layout/main.vue"
import RepoTree from "@/components/RepoTree.vue"
</script>


<style scoped>
iframe {
  width: 100%;
  height: 100%;
}

.screen {
  padding: 10px;
  height: auto;
  width: 100%;
  border-style: solid;
}

.row{
  justify-content: space-between;
  align-items: center;
}
</style>