<script setup lang="ts">
import Nav from "@/layout/main.vue"
</script>

<template>
  <main>
    <Nav>
      <template #screen>
        <div class="row" id="screenMain">
          <div class="screen">
            <!--<iframe src="https://htmlpreview.github.io/?https://github.com/Kill-9host/TestLab/blob/main/COSC370/HW1.html" />-->
          </div>
          <div class="screen">
            <!--<iframe src="https://htmlpreview.github.io/?https://github.com/Kill-9host/TestLab/blob/main/COSC370/HW2.html" />-->
          </div>
        </div>
      </template>
    </Nav>
  </main>
</template>


<style scoped>
iframe {
  width: 100%;
  height: 100%;
}

.screen {
  padding: 10px;
  height: 100%;
  width: 50%;
  border-style: solid;
}
</style>