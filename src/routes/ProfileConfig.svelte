<script>
    import { profile } from '../store.js'
	import { onMount } from 'svelte';    
    import { navigate  } from "svelte-routing";    
    import { flip } from "svelte/animate"; 
    import { dndzone } from "svelte-dnd-action";  

    import Avatar from '../components/Avatar.svelte'
    import InputLink from '../components/InputLink.svelte'
    import Item from '../components/Item.svelte'
    import BtnSave from '../components/BtnSave.svelte'
    
    import Nav from '../components/Nav.svelte'     
 
    export let user

    onMount(async () => {

        if ( Object.keys(user).length === 0 ) {
            navigate("/", { replace: true });
        }    
        let response = await fetch(`/api/profile/?email=${user.email}`)
        if (response.ok) {
            let remoteProfile = await response.json()
            profile.set(remoteProfile)

        }
        // stored$profile.set(profileRemote)

        // if ( Object.keys(profile).length === 0 && $profile.constructor === Object ) {
        //     let localProfile = JSON.parse( localStorage.getItem('profile') || '{}' )

        //     local$profile.links = local$profile.links.map(el => { 
        //         let obj = { 
        //             id:$profile.links.length, 
        //             url: el, 
        //             type: isType(el)
        //         }
        //         return (typeof el !== 'object') ? obj : {...el, type: 'link'}
        //     })  

        //     profile = { 
        //         ...localProfile,
        //         email: user.email,
        //         name: user.userName,
        //         slug: user.login,
        //         avatar: user.avatar,
        //     }

        //     let response = await fetch('/api/save',{
        //         method: 'POST',
        //         body: JSON.stringify(profile)
        //     });            

        // }

	});    

    $: $profile.avatar = $profile.links.some(el=>el.avatar) ? $profile.links.find(el=>el.avatar).avatar || '' : ''
    
    // REMOVE ITEMS
    function remove(index) {
        $profile.links.splice(index,1)
        profile.set($profile)
    }

    // SORT
    const flipDurationMs = 300;    
    function handleSort(e) {
        profile.set({...$profile, links: e.detail.items})
    }

</script>

<svelte:head>
	<title>Tinylink</title>
</svelte:head>

{#if user }
    <!-- <Nav {user}/> -->
{/if}
<div class="w-full px-2 sm:px-0 sm:w-3/4 lg:w-2/4 xl:w-2/5 min-h-screen mx-auto">

    <main class="">
            <div class="space-y-4">
                {#if $profile.avatar}
                    <div class="text-center transition">
                        <Avatar avatar={$profile.avatar} />
                    </div>
                {/if}

                <div>
                    <label for="name">Username</label>
                    <input
                        name="name"
                        autocomplete="off"
                        placeholder="Profile Name"
                        bind:value={$profile.name}
                        class="w-full p-3 border rounded-lg font-semibold focus:ring-blue-500 focus:ring-2 outline-none border-gray-300" 
                    />    
                </div>

                <div>
                
                    <div 
                        id="links" 
                        class="space-y-2 mb-12"
                        use:dndzone="{{ items: $profile.links, flipDurationMs }}" 
                        on:finalize="{handleSort}"
                        on:consider={handleSort}    
                    >
                        {#each $profile.links as link(link.id)}
                            <div 
                                class="relative"  
                                animate:flip={{duration:flipDurationMs}}
                            >

                                <Item link={link} /> 
                                <div 
                                    class="
                                        absolute 
                                        top-0 left-0 
                                        w-full h-full 
                                        flex
                                        justify-end
                                        opacity-0 
                                        transition
                                        hover:bg-white
                                        hover:bg-opacity-25
                                        hover:opacity-100"
                                >
                                    <div class="px-4 bg-gray-100 flex items-center rounded-lg">

                                        <button 
                                            title="Delete Link"
                                            on:click={()=>remove(index)} 
                                            class="
                                                text-gray-400 
                                                hover:text-red-500 
                                                transition transform 
                                                
                                                "
                                        >
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>                                    
                                     
                                        </button>
                                    </div>
                                </div>  

                            </div>
                        {/each}
                    </div>
                
                    <div class="mt-4">
                        <InputLink bind:links={$profile.links} />
                    </div> 

                </div>

                <div class="space-y-2">
                    <!-- <BtnSave bind:profile/> -->
                </div>  
            </div>

    </main>

    <footer class="text-center mt-16 mb-8">
        <p class="text-sm text-gray-600">
            Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
        </p>
    </footer>
</div>


