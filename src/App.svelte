<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Profile from "./routes/Profile.svelte";
  import { onMount } from "svelte";
  import auth from "./authService";
  import { isAuthenticated, user } from "./store";  
  
  export let url = "";
  let auth0Client;
  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }  

</script>
{#if $isAuthenticated}
  <a class="nav-link" href="/#" on:click="{logout}">Log Out</a>
{:else}
  <a class="nav-link" href="/#" on:click="{login}">Log In</a>
{/if}
<Router url="{url}">
  <div>
    <Route path=":slug" component="{Profile}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>