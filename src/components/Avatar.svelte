<script>
    export let avatar;
</script>
<div class="h-20 w-20 rounded-full overflow-hidden mx-auto">
    {#if avatar}
        <img src="{avatar}" class="h-full w-full text-gray-300" alt="Avatar">
    {:else}      
      <svg class="h-20 w-20 text-gray-400"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>       
    {/if }
</div>