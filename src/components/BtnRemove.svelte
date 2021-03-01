<script>
    export let profile
    export let index

    function remove(e) {
        // profile.links.splice(index,1)
        // let response = await fetch(`/api/remove`,{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         id: profile.id,
        //         index: index
        //     })
        // })

        // profile = await response.json()

        // if (typeof window !== 'undefined') {
        //     localStorage.setItem('profile',JSON.stringify(profile))
        // }       
        console.log(index) 
    }
</script>

<button on:click={remove}>
    <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>      
</button>