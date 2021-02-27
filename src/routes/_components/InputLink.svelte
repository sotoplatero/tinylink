<script>
    import { isType } from '../_utils/types.js'   

    export let links 

    let link;
    let error;
    $: error = links.some(el=>el.url===link) ? "You already added this link" : null

    function handleEnter(e) {
        if (e.key === 'Enter' ) {
            add()
        }
        
    }
    
    async function add(e) {
        if (error) return

        let newlink = {
            id: links.length,
            url: link,
            type: isType(link),
        }

        if (newlink.type === 'link') {

            let response = await fetch( `https://api.microlink.io/?url=${link}` );
            let { data } = await response.json()
            newlink = { 
                ...newlink,
                title: data.author || data.title,
                publisher: data.publisher,
                logo: data.logo.url,
                avatar: data.image?.url,
            };

        }

        links = [ ...links, newlink ]
        
        link = '';
    }
</script>

<div >
    <label for="link">Add yours Links</label>
    <div class="relative">
        <input 
            bind:value={link}
            on:keydown="{handleEnter}"
            type="text" 
            name="link" 
            id="link" 
            autocomplete 
            placeholder="Ex. https://twitter.com/sotoplatero"
            class="{ error ? 'border-red-500' : 'border-gray-300'} focus:{ error ? 'ring-red-500' : 'ring-blue-500'}" 
        >   
            
        <div class="absolute right-0 top-0 h-full flex items-center pr-3">
            <button 
                on:click="{add}" 
                class="
                whitespace-nowrap
                py-2 px-2 
                border border-gray-300 
                shadow-sm 
                font-semibold 
                rounded-md 
                text-gray-800 
                bg-gray-200 
                hover:bg-gray-300 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-gray-500"
            >
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
    
        </div>
    
    </div>

    {#if error}
        <div class="text-red-500 font-semibold">
            {error}
        </div>
    {/if}

</div>