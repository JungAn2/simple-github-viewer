<template>
    <!--Wrapped around div for flex display-->
    <div class="col" id="main">
        <!--For background purpose-->
        <div class="main"></div>

        <!--Main web-->
        <div class="row">
            <!--Nav bar tree-->
            <nav class="col">
                <div class="header">
                    <h1>Github repo viewer</h1>
                    <div class="row">
                        <RepoChangeVue />
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
import RepoChangeVue from '@/components/RepoChange.vue';
import Darkmode from '@/components/Darkmode.vue';
import { AuthStore } from '@/stores/Auth';

const useAuth = AuthStore()

</script>

<style scoped>
.header {
    display: grid;
    justify-content: center;
    padding: 10px;
}

nav {
    width: calc( 20vw - 60px);
    height: calc( 100vh - 60px);
    margin: 10px;
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
    margin: 10px;
    width: calc( 80vw - 60px);
    height: calc( 100vh - 60px);
}
</style>