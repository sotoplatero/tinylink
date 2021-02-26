<script >
	import { onMount } from 'svelte';   
    import { navigate  } from "svelte-routing";
    import {auth} from './_components/AuthUser.svelte'      

    export let location;

    onMount(async()=>{
        let user = await auth()
        if (user) {
            navigate("/profile", { replace: true });
        }

    }) 
      
</script>
<<<<<<< HEAD

<svelte:head>
	<title>Tinylink</title>
</svelte:head>

<div class="w-full px-2 sm:px-0 sm:w-1/2 lg:w-1/4 min-h-screen mx-auto">

    <header class="mb-4 mt-10 text-center">
        <svg class="h-12 w-12 text-pink-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>        
        <h1 class="text-3xl font-bold">Tinylink</h1>
        <p class="text-lg ">Create your link profile</p>
    </header>

    <main class="">
        <div class="space-y-4">
            <div class="text-center">
                <Avatar avatar={profile.avatar} />
            </div>
            <div>
                <!-- <label for="`name`">Name</label> -->
                <input
                    name="name"
                    placeholder="Profile Name"
                    bind:value={profile.name}
                    class="w-full p-3 border rounded-lg focus:ring-blue-500 focus:ring-2 outline-none border-gray-300" 
                />    
            </div>

            <div>
               
                <div class="space-y-2">
                    {#each profile.links as link,index (index)}
                        <div transition:fade class="relative"  >

                            <svelte:component this={getComponent(link)} {link} /> 

                            <div class="absolute top-0 right-0 -mt-2 -mr-1">
                           
                                <button 
                                    title="Delete Link"
                                    on:click={()=>remove(index)} 
                                    class="text-gray-300 hover:text-red-500 transition transform hover:scale-150"
                                >
                                    <svg class="h-4 w-4 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                      </svg>                                    
                                </button>
                            </div>  

                        </div>
                    {/each}
                </div>
            
                <div class="mt-4">
                    <InputLink bind:links={profile.links} />
                </div> 
    
            </div>

            <div class="space-y-2">
                <BtnSave bind:profile/>
                {#if profile.slug}
                    <a  href="/{profile.slug}" 
                        target="_blank"
                        class="flex 
                            items-center 
                            justify-center 
                            block w-full 
                            text-center p-4 
                            text-blue-500 
                            font-bold 
                            hover:text-blue-600 
                            transition rounded-lg">
                        <span>Visit</span>
                        <svg class="h-4 w-4 inline ml-2 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>                    
                    </a>
                {/if}
            </div>  
        </div>
        <!-- <div class="my-10">
            <svg class="h-6 w-6 mx-auto text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>            
        </div> -->
    </main>

    <footer class="text-center my-8">
        <p class="text-sm text-gray-600">
            Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
        </p>
    </footer>
=======
<div class="h-screen flex justify-center items-center">
    <div class="w-1/2 mx-auto text-center">
        <h1 class="text-6xl leading-snug mb-8">The <span class="font-bold">easier way</span> to create your link profile</h1>
        <a href="/api/auth/github" 
            class="
                py-4 px-6 
                text-lg 
                inline-block
                font-bold bg-gray-800 text-white rounded-lg"
        >
            <svg class="w-8 h-8 inline mr-2 fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>        
            Login with Github
        </a>

    </div>
>>>>>>> 57988cd2af2800ab4a249969e229367e013706d1
</div>

