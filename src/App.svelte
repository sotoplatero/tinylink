<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-routing";
  import netlifyIdentity from 'netlify-identity-widget' 
  import Home from "./routes/Home.svelte";
  import Profile from "./routes/Profile.svelte";
  import { user, redirectURL } from './store.js'

  export let url = "";

  netlifyIdentity.init()

  $: isLoggedIn = !!$user
  $: username = $user !== null ? $user.username : ' there!'

  function handleUserAction(action) {
    if (action === 'login' || action === 'signup') {
      console.log(netlifyIdentity)
      netlifyIdentity.open(action)
      netlifyIdentity.on('login', u => {
        user.login(u)
        netlifyIdentity.close()
        if ($redirectURL !== '') {
          navigate($redirectURL)
          redirectURL.clearRedirectURL()
        }
      })
    } else if (action === 'logout') {
      navigate('/')
      user.logout()
      netlifyIdentity.logout()
    }
  }

</script>




{#if isLoggedIn}
  <div class="center">
    <p>Hello {username}</p>
    <div>
      <button on:click={() => handleUserAction('logout')}>Log Out</button>
    </div>
  </div>
{:else}
  <div class="center">
    <p>You are not logged in.</p>
    <div>
      <button on:click={() => handleUserAction('login')}>Log In</button>
      <button on:click={() => handleUserAction('signup')}>Sign Up</button>
    </div>
  </div>
{/if}
<Router url="{url}">

  <div>
    <Route path=":slug" component="{Profile}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>