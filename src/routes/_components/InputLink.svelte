<script>
 
    export let links 

    let link;

    function handleEnter(e) {
        if (e.key === 'Enter' ) {
            add()
        }
        
    }
    
    async function add(e) {
        if (links.some(el=>el.url===link)) return

        if (/\.(jpg|png|gif)$/.test(link)) {

        } else if ( /^https\:\/\/formspree\.io\/f\//.test(link) ) {
            links = [...links, link]
            return
        } else if ( /^http(s)?\:\/\//.test(link) ) {
            let response = await fetch(`https://api.microlink.io/?url=${link}`);
            let {data} = await response.json()
            links = [...links, {
                url: data.url,
                title: data.author || data.title,
                publisher: data.publisher,
                logo: data.logo.url,
                avatar: data.image?.url,
            }];
        } else {
            links = [...links, link]
        }
        
        link = '';
    }
</script>

<div class="relative">
    <input 
        bind:value={link}
        on:keydown="{handleEnter}"
        type="text" 
        name="link" 
        id="link" 
        autocomplete 
        placeholder="Ex. https://twitter.com/sotoplatero"
        class="
            w-full
            p-3 border
            outline-none
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500 
            border-gray-300 
            pr-12
            rounded-lg">    
    <button 
        on:click="{add}" 
        class="
            absolute
            right-2
            top-2
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
            focus:ring-gray-500">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
    </button>

</div>