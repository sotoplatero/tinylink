<script>
    import { fade } from 'svelte/transition';    
    import InputLink from './_components/InputLink.svelte'
    import BtnSave from './_components/BtnSave.svelte'
    
    import Avatar from './_components/Avatar.svelte'
    import Contact from './_components/Contact.svelte'
    import Link from './_components/Link.svelte'
    import Title from './_components/Title.svelte'
    import Image from './_components/Image.svelte'     
    import Nav from './_components/Nav.svelte'     
    import { isContact, isTitle, isLink } from '../utils/types.js'    

    let profileStr = JSON.stringify( {
            name: '', 
            avatar: null,
            links: []
        })

    let profile = JSON.parse( localStorage.getItem('profile') || profileStr )

    $: profile.avatar = profile.links.length ?  profile.links.find(el=>el.avatar)?.avatar : ''

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

</script>

<svelte:head>
	<title>Tinylink</title>
</svelte:head>

<!-- <Nav /> -->
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

    </main>

    <footer class="text-center my-8">
        <p class="text-sm text-gray-600">
            Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
        </p>
        <p class="text-sm text-gray-500 mt-2">This is a test</p>
    </footer>
</div>


