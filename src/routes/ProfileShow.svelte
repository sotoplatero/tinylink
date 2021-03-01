
<script>
    import Avatar from '../components/Avatar.svelte'
    import Contact from '../components/Contact.svelte'
    import Link from '../components/Link.svelte'
    import Title from '../components/Title.svelte'
    import Image from '../components/Image.svelte'
    import { isContact, isTitle, isLink } from '../utils/types.js'

    export let slug
    export let user

    let profilePromise = getProfile();
    let error = false

    function getComponent(link) {
        if (link.type === 'form') return Contact
        if (link.type === 'text') return Title
        if (link.type === 'link') return Link
        if (link.type === 'img') return Image
    }

    async function getProfile() {

        let response = await fetch(`/api/show?slug=${slug}`)

        if (response.ok) {
            return await response.json();
        } else {
            error = true
        }
    }

</script>


<svelte:head>
{#await profilePromise }
    <title>{profile.name}</title>
    <meta property="og:image" content="https://usecard.dsoto.dev/card?url=https://tinylink.dsoto.dev/{profile.slug}&theme=box">        
    <meta property="og:logo" content="{profile.avatar}">            
{/await}
</svelte:head>

{#await profilePromise }

    <div class="h-screen flex items-center justify-center">
        <svg class="animate-bounce w-10 h-10 text-amber-900 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>              
    </div>

{:then profile}

    <div class="w-full px-2 sm:px-0 sm:w-1/5 lg:w-2/5 min-h-screen mx-auto">

        {#if !error}
            <div class="my-10 sm:my-20 ">
                <header class="text-center mb-4">
                    <Avatar avatar={profile.avatar} />
                    <h1 class="text-2xl font-semibold">
                        {profile.slug}
                    </h1>

                </header>
                <div class="space-y-2">
                    {#each profile.links as link}
                        <div class="flex items-center ">

                            <svelte:component 
                                this={getComponent(link)} 
                                {link}
                            />

                        </div>
                    {/each}
                </div>
            </div>

            <footer class="mb-10">
                <div class="flex items-center justify-center">
                    <svg class="h-6 w-6 text-pink-700 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg> 
                      <a href="/" class="text-sm text-blue-600 font-semibold"> Create my Tinylink</a>
                </div>
            </footer>            

        {:else}
        
            <div class="h-screen flex items-center justify-center">
                <svg class="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>        

        {/if}



        
    </div>
{/await}