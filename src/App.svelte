<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import netlifyIdentity from 'netlify-identity-widget' 
  import Home from "./routes/Home.svelte";

  export let url = "";

<Router url="{url}">
  <div>
    <Route path=":slug" component="{Profile}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>