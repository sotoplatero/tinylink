<!-- App.svelte -->
<script >
	import { onMount } from 'svelte';     
  import { Router, Route, navigate  } from "svelte-routing";
  import ProfileConfig from "./routes/ProfileConfig.svelte";
  import ProfileShow from "./routes/ProfileShow.svelte";
  import Home from "./routes/Home.svelte";
  import { auth } from './components/AuthUser.svelte'        

  export let url = "";
  let user

  onMount(async()=>{
    user = await auth()
  }) 

</script>

<div>
  {#if user }
    <Router url="{url}">
      <Route path="/" component="{Home}" {user} />  
      <Route path="/profile" component="{ProfileConfig}" {user} />
      <Route path="/:slug" component="{ProfileShow}" />
    </Router>
  {/if}

  </div>