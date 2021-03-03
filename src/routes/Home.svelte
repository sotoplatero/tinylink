<script >
	import { onMount } from 'svelte';   
    import { navigate  } from "svelte-routing";

    export let user = {}

    onMount( ()=>{

        if ( Object.keys(user).length !== 0 ) {
            navigate("/profile", { replace: true });
        }

    }) 
      
</script>
<div class="h-screen flex justify-center items-center">
    <div class="w-full sm:w-1/2 mx-auto text-center px-8">
        <svg class="h-10 w-10 sm:h-12 sm:w-12 text-pink-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>        
        <h1 class="text-4xl sm:text-7xl font-bold mb-6 sm:mb-12">Tinylink</h1>
        <p class="text-2xl sm:text-6xl leading-snug mb-8">All your links in one place</p>
        <a href="/api/auth/github" 
            class="
                py-4 px-6 
                text-lg 
                inline-block
                font-bold bg-gray-800 text-white rounded-lg"
        >
            <svg class="w-8 h-8 inline mr-2 fill-current" stroke="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>        
            Login with Github
        </a>

    </div>
</div>

