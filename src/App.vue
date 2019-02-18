<template>
  <div id="app">
    <h1>{{ header }}</h1>
    <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'app',
  components: {
    Search
  },
  data: () => {
    return{
      header: "Where are you going?"
    }
  }
}
</script>

<style>
*{
  box-sizing:border-box
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#f3ce56;
  color: #444;
  padding: 0.1rem 2rem 2rem 2rem;
  display: inline-block;
}
h1 {
  color: black;
}
</style>
