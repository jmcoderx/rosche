<template>
  <div id="app">
    <ReagentLotsTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReagentLotsTable from "./components/ReagentLotsTable.vue";

@Component({
  components: {
    ReagentLotsTable,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
}
</style>
