<!-- App.svelte -->
<script >
	import { onMount } from 'svelte';     
  import { Router, Route  } from "svelte-routing";
  import ProfileConfig from "./routes/ProfileConfig.svelte";
  import ProfileShow from "./routes/ProfileShow.svelte";
  import Home from "./routes/Home.svelte";
  import {auth} from "./components/AuthUser.svelte"

  export let url = "";
  let userPromise = auth()

</script>

<div>
  <Router url="{url}">
    {#await userPromise}
      <div class="h-screen flex items-center justify-center">
        <svg class="animate-bounce w-10 h-10 text-amber-900 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>              
      </div>
    {:then user} 
      <Route path="/" component="{Home}" {user} />  
      <Route path="/profile" component="{ProfileConfig}" {user} />
      <Route path="/:slug" component="{ProfileShow}" />
    {:catch error}
      <Route path="/" component="{Home}" />  
    {/await}
  </Router>

  </div>