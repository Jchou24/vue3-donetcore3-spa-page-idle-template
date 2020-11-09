<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/testAPI">Test weather API</router-link> |
    <router-link to="/authentication">Authentication</router-link> |
    {{authenticationInfo}}
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { IsLogin, GetUserInfo } from '@/api/authentication.ts'

export default defineComponent({
  name: 'App',
  setup(){
    const store = useStore()
    const unauthInfo = "You are not log in"
    const authInfo = computed(()=>{ 
      return `Hi, ${store.state.claims.name}! You are now log in!`
    })
    
    const authenticationInfo = computed(() =>{
      return store.state.isAuthenticated ? authInfo.value : unauthInfo
    })

    IsLogin().then( response => {
      store.state.isAuthenticated = Boolean(response.data)
      if(store.state.isAuthenticated){
        GetUserInfo(store)
      }
    })

    return {
      authenticationInfo
    }
  }

});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
