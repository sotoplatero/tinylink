<script>
  import { profile } from '../store.js'  
  import {clickOutside} from '../utils/clickoutside.js'; 

  export let user
  
  let showMenu = false
</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="border-b mb-8">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">

        <div class="flex-1 flex items-center justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block h-8 w-auto rounded" src="/logo.png" alt="Workflow">
            Tinylink
            <!-- <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> -->
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {#if $profile.id}
            <a  href="/{$profile.slug}" 
                target="_blank"
                class="flex 
                    items-center 
                    justify-center 
                    text-center 
                    text-blue-500 
                    font-bold 
                    hover:text-blue-600 
                    transition rounded-lg">
                <span>/{$profile.slug}</span>
                <!-- <svg class="h-4 w-4 inline ml-2 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>                     -->
            </a>
          {/if}  
                  
            <!-- <button class="
              bg-gray-800 
              p-1 
              rounded-full 
              text-gray-400 
              hover:text-white 
              focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button> -->
  
          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button 
                use:clickOutside
                on:click_outside={()=> showMenu=false}
                on:click={()=>showMenu=!showMenu} 
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full inline-block" src="{user.avatar}" alt="Logo {user.name}">
              </button>
            </div>
            <!--
              Profile dropdown panel, show/hide based on dropdown state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            {#if showMenu}
              <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a> -->
                <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a> -->
                <a 
                  href="/api/auth/logout" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                  role="menuitem"
              >
                  Sign out
              </a>
              </div>
              
            {/if}
          </div>
        </div>
      </div>
    </div>
  
  </nav>