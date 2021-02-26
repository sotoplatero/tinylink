<script>
	import { onMount } from 'svelte';    
    import {fade} from 'svelte/transition';   
    import {flip} from "svelte/animate"; 
    import {dndzone} from "svelte-dnd-action";    

    import InputLink from './_components/InputLink.svelte'
    import BtnSave from './_components/BtnSave.svelte'
    
    import Avatar from './_components/Avatar.svelte'
    import Contact from './_components/Contact.svelte'
    import Link from './_components/Link.svelte'
    import Title from './_components/Title.svelte'
    import Image from './_components/Image.svelte'     
    import Nav from './_components/Nav.svelte'     
    import {auth} from './_components/AuthUser.svelte'  
 
    import { isContact, isTitle, isLink } from '../utils/types.js'   

    let profile = { name:'', links:[]} 
    let user 

    onMount(async () => {
        user = await auth()

        if (!user) {
            navigate("/", { replace: true });
        }    

        let responseProfile = await fetch(`/api/profile/?email=${user.email}`)
        profile = await responseProfile.json()

        if ( Object.keys(profile).length === 0 && profile.constructor === Object ) {
            let localProfile = JSON.parse( localStorage.getItem('profile') || '{}' )
            localProfile.links = localProfile.links.map((el,idx)=> ({ ...el, id: idx }))

            profile = { 
                email: user.email,
                name: user.nameName,
                slug: user.login,
                avatar: user.avatar,
                ...localProfile,
            }

            let response = await fetch('/api/save',{
                method: 'POST',
                body: JSON.stringify(profile)
            });            

        }
	});    

    $: profile.avatar = profile.links ? profile.links.find(el=>el.avatar)?.avatar : ''
        
    function remove(index) {
        profile.links.splice(index,1)
        profile=profile
    }

    function getComponent(link) {
        if (isContact(link)) return Contact
        if (isTitle(link)) return Title
        if (isLink(link)) return Link
        if (isImage(link)) return Image
    }

    const flipDurationMs = 300;    
    function handleSort(e) {
        profile.links = e.detail.items;
    }

</script>

<svelte:head>
	<title>Tinylink</title>
</svelte:head>
{#if user}
    <Nav {user}/>
{/if}
<div class="w-full px-2 sm:px-0 sm:w-2/5 min-h-screen mx-auto">

    <!-- <header class="mb-4 mt-10 text-center">
        <svg class="h-12 w-12 text-pink-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>        
        <h1 class="text-3xl font-bold">Tinylink</h1>
        <p class="text-lg ">Create your link profile</p>
    </header> -->

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
                        class="w-full p-3 border rounded-lg font-semibold focus:ring-blue-500 focus:ring-2 outline-none border-gray-300" 
                    />    
                </div>

                <div>
                
                    <div 
                        id="links" 
                        class="space-y-2"
                        use:dndzone="{{ items: profile.links, flipDurationMs }}" 
                        on:finalize="{handleSort}"
                        on:consider={handleSort}    
                    >
                        {#each profile.links as link, index (link.id)}
                            <div 
                                class="relative"  
                                animate:flip={{duration:flipDurationMs}}
                            >

                                <svelte:component this={getComponent(link)} {link} /> 

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
                                    <div class="px-4 bg-gray-100 flex items-center">

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

    </main>

    <footer class="text-center my-8">
        <p class="text-sm text-gray-600">
            Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
        </p>
        <p class="text-sm text-gray-500 mt-2">This is a test</p>
    </footer>
</div>


