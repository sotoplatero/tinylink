<script>
    import { profile } from '../store.js'    
    let saving = false

    $: disabled = $profile.name.trim().length===0 || $profile.links.length===0 || saving

    async function save(){
        saving = true
        let response = await fetch('/api/save',{
            method: 'POST',
            body: JSON.stringify($profile)
        });
        if (response.ok) {
            let remoteProfile = await response.json();
            profile.set(remoteProfile)
        }
        saving = false
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem('profile',JSON.stringify(profile))
        // }
    }
</script>
<button 
    on:click={save}
    {disabled}
    class="
        flex items-center justify-center
        py-3 px-6 
        bg-blue-600 
        text-white text-center text-lg 
        font-semibold
        w-full 
        rounded-lg 
        disabled:opacity-50"
    
>
  {#if saving}
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>  
  {/if}
  <span>Publish</span>
  
</button>