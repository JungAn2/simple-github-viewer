<template>
    <!--Wrapped around div for flex display-->
    <div class="col" id="main">
        <!--For background purpose-->
        <div class="main"></div>

        <!--Header formats-->
        <div class="header" id="header">
            <div class="row" style="justify-content:center">
                <!--Empty div for spacing evenly-->
                <div style="margin-right:auto"></div>

                <!--Center part of header-->
                <div class="col" style="align-items: center;">
                    <h3 style="padding: 10px; margin:0">Github Repo viewer</h3>
                </div>

                <!--Right hand side buttons-->
                <div class="col" style="margin-top:auto; margin-left:auto; font-size: 1.5rem">
                    <RepoChangeVue />
                    <Darkmode />
                </div>
            </div>
        </div>

        <!--Main web-->
        <div class="row" style="margin: 50px 0 0 0;">
            <!--Nav bar tree-->
            <nav>
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
    text-align: center;
    font-size: 2rem;
    align-content: center;
    height: var(--header-height);
    overflow: hidden;
}

nav {
    width: 20vw;
    height: calc(95vh - calc(2 * var(--header-height)));
}

.row {
    display: flex;
    flex-direction: row;
}

.col {
    display: flex;
    flex-direction: column;
}

.screens {
    padding: 10px;
    width: 70vw;
    height: calc(95vh - calc(2 * var(--header-height)));
}
</style>