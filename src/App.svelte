<!-- App.svelte -->
<script >
	import { onMount } from 'svelte';     
  import { Router, Route, navigate  } from "svelte-routing";
  import ProfileConfig from "./routes/ProfileConfig.svelte";
  import ProfileShow from "./routes/ProfileShow.svelte";
  import Home from "./routes/Home.svelte";

  export let url = "";
  let user


</script>

<div>

    <Router url="{url}">
      <Route path="/" component="{Home}"  />  
      <Route path="/profile" component="{ProfileConfig}"  />
      <Route path="/:slug" component="{ProfileShow}" />
    </Router>

  </div>