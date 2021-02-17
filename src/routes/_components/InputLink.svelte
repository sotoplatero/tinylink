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
<div class="flex items-center space-x-2">
    <input 
        bind:value={link}
        on:keydown="{handleEnter}"
        type="text" 
        name="link" 
        id="link" 
        autocomplete 
        placeholder="Ex. https://twitter.com/sotoplatero"
        class="
            p-3 border
            outline-none
            focus:ring-2 
            focus:ring-blue-500 
            focus:border-blue-500 
            block 
            w-full 
            border-gray-300 
            rounded-md">    
    <button 
        on:click="{add}" 
        class="
            whitespace-nowrap
            inline-flex 
            justify-center 
            py-3 px-4 
            border border-transparent 
            shadow-sm 
            font-medium 
            rounded-md 
            text-white 
            bg-gray-600 
            hover:bg-gray-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-gray-500">
        Add
    </button>

</div>