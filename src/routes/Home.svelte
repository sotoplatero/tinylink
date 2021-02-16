<script>
    import InputLink from './_components/InputLink.svelte'
    import Avatar from './_components/Avatar.svelte'
    import BtnSave from './_components/BtnSave.svelte'
    import BtnRemove from './_components/BtnRemove.svelte'
	import { onMount } from 'svelte';

    let profile = {
            name: '', 
            avatar: null,
            links: []
        }

    if (typeof window !== 'undefined') {
        profile = JSON.parse( localStorage.getItem('profile') || JSON.stringify(profile) )
    }

    $: profile.avatar = profile.links.length ?  profile.links.find(el=>el.avatar).avatar : ''
</script>

<svelte:head>
	<title>Tinilink</title>
</svelte:head>

<div class="w-96 min-h-screen mx-auto">

    <header class="mb-4 mt-10 text-center">
        <svg class="h-12 w-12 text-pink-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>        
        <h1 class="text-3xl font-bold">Tinylink</h1>
        <p class="text-lg ">Create your profile links</p>
    </header>

    <main class="">
        <div class="space-y-4">
            <div class="text-center">
                <Avatar avatar={profile.avatar} />
            </div>
            <div>
                <!-- <label for="`name`">Name</label> -->
                <input
                    name="`name`"
                    placeholder="Name"
                    bind:value={profile.name}
                    class="w-full p-3 border rounded-lg focus:ring-blue-500 focus:ring-2 outline-none" 
                />    
            </div>

            <div>
                <div class="mb-4">
                    <InputLink bind:links={profile.links} />
                </div>                
                <div class="space-y-2">
                    {#each profile.links as link,index}
                        <div class="flex items-center ">
                            <a 
                                href="{link.url}" 
                                target="_blank" 
                                alt="{link.title}" 
                                class="
                                    flex 
                                    items-center 
                                    inline-block 
                                    px-4 py-3 
                                    w-full 
                                    border
                                    border-gray-100
                                    bg-gray-50
                                    hover:bg-gray-100 
                                    transition rounded-lg"
                            >
                                <img 
                                    src="{link.logo}" 
                                    class="rounded-full h-8 w-8 inline mr-2" 
                                    alt="{link.title}"
                                /> 
                                <div class="mr-auto leading-5">
                                    <div class="font-semibold">{link.publisher}</div> 
                                    <div class="text-gray-500">{link.title}</div> 
                                </div>
                                <div>
                                    <!-- <BtnRemove bind:profile {index}/> -->
                                    <svg class="w-6 h-6 inline text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                      </svg>                                        
                                </div>
                            </a>
                        </div>
                    {/each}
                </div>
            

    
            </div>

        </div>
        <div class="mt-12 space-y-2">
            <BtnSave bind:profile/>
            {#if profile.slug}
                <a  href="/{profile.slug}" 
                    target="_blank"
                    class="flex items-center justify-center block w-full text-center p-4 text-purple-500 font-bold hover:bg-purple-50 transition rounded-lg">
                    <span>Visit</span>
                    <svg class="h-4 w-4 inline ml-2 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>                    
                </a>
            {/if}
        </div>  
    </main>

    <footer class="text-center my-8">
        <p class="text-sm text-gray-600">
            Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
        </p>
        <p class="text-sm text-gray-500 mt-2">This is a test</p>
    </footer>
</div>


