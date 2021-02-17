<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Profile from "./routes/Profile.svelte";
  
  export let url = "";

</script>

<Router url="{url}">
  <div>
    <Route path=":slug" component="{Profile}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>