<!-- App.svelte -->
<script>
  import { Router, Route, navigate  } from "svelte-routing";
  import { onMount  } from 'svelte'
  import ProfileConfig from "./routes/ProfileConfig.svelte";
  import ProfileShow from "./routes/ProfileShow.svelte";
  import Home from "./routes/Home.svelte";

  let user;

	onMount(async () => {
		let response = await fetch('/api/auth/me')
    user = await response.json()
    console.log(!user)
    if (!user) {
      navigate("/profile", { replace: true });
    }
	});  
  
  export let url = "";

</script>

<Router url="{url}">
  <div>
    <Route path="/"><ProfileConfig /></Route>  
    <!-- <Route path="profile" component="{ProfileConfig}"  /> -->
    <Route path=":slug" component="{ProfileShow}" />
    <!-- <Route path="/"><Home /></Route>  
    <Route path="profile" component="{ProfileConfig}"  />
    <Route path=":slug" component="{ProfileShow}" /> -->
  </div>
</Router>