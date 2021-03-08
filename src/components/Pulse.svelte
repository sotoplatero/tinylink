<script>
    import { profile } from '../store.js'    
	import { fade } from 'svelte/transition';
    import { isType } from '../utils/types.js'      
	import { onMount } from 'svelte';     
      
    export let link

    onMount(async () => {
        let newlink = {
            ...link,
            type: isType(link.url),
        }

        if (newlink.type === 'link') {

            let re = /(facebook\.com)|(instagram\.com)|(linkedin\.com)/
            if (re.test(link)) {
                
                newlink = { 
                    ...newlink,
                    title: link.replace(/\/$/,'').split('/').reverse()[0],
                    publisher: link.match(re)[0].split('.')[0],
                    logo: 'https://unavatar.now.sh/' + link.match(re)[0],
                };

            } else {
                
                let response = await fetch( `/api/meta?url=${link.url}` );
                let data = await response.json()
                newlink = { ...newlink, ...data  };
            }     

        }

        let index = $profile.links.findIndex( l => l.id === newlink.id)
        $profile.links.splice(index,1,newlink)
        profile.set($profile)

    })

</script>

<div transition:fade class="border border-gray-100 bg-gray-50 rounded-lg p-4 w-full">
    <div class="flex space-x-4 animate-pulse">
      <div class="rounded-full bg-gray-400 h-8 w-8"></div>
      <div class="flex-1 space-y-3">
        <div class="h-3 bg-gray-400 rounded w-2/4"></div>
        <div class="h-3 bg-gray-400 rounded w-5/6"></div>
      </div>
    </div>
  </div>