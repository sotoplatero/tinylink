<!-- App.svelte -->
<script >
	import { onMount } from 'svelte';     
  import { Router, Route  } from "svelte-routing";
  import ProfileConfig from "./routes/ProfileConfig.svelte";
  import ProfileShow from "./routes/ProfileShow.svelte";
  import Home from "./routes/Home.svelte";
  import { auth } from './components/AuthUser.svelte'        

  export let url = "";
  let userPromise = auth()

  onMount(async()=>{
    // user = await auth()
  }) 

</script>

<div>
  <Router url="{url}">
    {#await userPromise}
      loading
    {:then user} 
      <Route path="/" component="{Home}" {user} />  
      <Route path="/profile" component="{ProfileConfig}" {user} />
      <Route path="/:slug" component="{ProfileShow}" />
    {:catch error}
      <Route path="/" component="{Home}" />  
    {/await}
  </Router>

  </div>