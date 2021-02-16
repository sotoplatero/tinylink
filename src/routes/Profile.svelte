
<script>
    import Avatar from './_components/Avatar.svelte'

    export let slug

    let profilePromise = getProfile();

    async function getProfile() {
        let response = await fetch('/api/show?slug=' + slug)
        return await response.json();
    }

</script>

    <svelte:head>
    {#await profilePromise then profile}
        <title>{profile.name}</title>
    {/await}
    </svelte:head>

<div class="w-96 mx-auto">
    {#await profilePromise }
        <div class="h-screen flex items-center justify-center">
              <svg class="animate-bounce w-6 h-6 text-amber-900 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>              
        </div>
    {:then profile}
        <div class=" my-20">
            <header class="text-center">
                <Avatar avatar={profile.avatar} />
                <h1 class="text-2xl font-semibold mb-12">
                    {profile.name}
                </h1>

            </header>
            <div class="space-y-2">
                {#each profile.links as link}
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
                                <svg class="w-6 h-6 inline text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                  </svg>                
                            </div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>

        <footer class="">
            <div class="flex items-center justify-center">
                <svg class="h-6 w-6 text-pink-700 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg> 
                  <a href="/" class="text-sm text-blue-600 font-semibold"> Create my Tinylink</a>
            </div>
        </footer>
    {/await}

</div>