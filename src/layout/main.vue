<template>
    <!--Wrapped around div for flex display-->
    <div class="col" id="main">
        <!--For background purpose-->
        <div class="main"></div>

        <!--Main web-->
        <div class="row">
            <!--Nav bar tree-->
            <nav class="col secondary">
                <div class="header">
                    <div class="row">
                    <h1>Github repo viewer</h1>
                    </div>
                    <div class="row">
                    <redirectWebVue :linkSrc="useAuth.getWebsite" imgSrc="@/components/img/png/GitHub-logo.png" :tip="useAuth.getWebsite"/>
                    </div>
                    <div class="row">
                        <ThemeSelectVue />
                        <Darkmode />
                    </div>
                </div>
                <slot name="repo"></slot>
            </nav>

            <!-- Two screen for displaying-->
            <div class="row screens">
                <!--Slot for screen 1-->
                <slot name="screen"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Darkmode from '@/components/Invertmode.vue';
import redirectWebVue from '@/components/redirectWeb.vue';
import ThemeSelectVue from '@/components/ThemeSelect.vue';
import { AuthStore } from '@/stores/Auth';

const useAuth = AuthStore()

</script>

<style scoped>

h1{
    font-size: 2rem;
    text-align: center;
}
.header {
    display: grid;
    justify-content: center;
    padding: 10px;
}

nav {
    width: 20vw;
    height:100vh;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.col {
    display: flex;
    flex-direction: column;
}

.screens {
    width: 80vw;
    height: calc(100vh - 26px);
}
</style>