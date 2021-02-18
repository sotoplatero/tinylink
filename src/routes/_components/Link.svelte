<script>
    export let link
</script>

<a 
    href="{link.url}" 
    target="_blank" 
    alt="{link.title}" 
    class="
        flex 
        items-center 
        inline-block 
        px-4 py-3 
        w-full 
        border
        border-gray-100
        bg-gray-50
        hover:bg-gray-100 
        transition rounded-lg"
>
<img 
src="{link.logo}" 
    class="rounded-full h-8 w-8 inline mr-2" 
    alt="{link.title}"
/> 
<div class="mr-auto leading-5">
    <div class="font-semibold">{link.publisher}</div> 
    <div class="text-gray-500">{link.title}</div> 
</div>
<div>
    <svg class="w-6 h-6 inline text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>                
</div>
</a>