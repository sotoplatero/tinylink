<script>
    export let link
</script>

<div class="w-full         
  px-4 py-3 
  border
  border-gray-100
  bg-gray-50
  hover:bg-gray-100 
  transition rounded-lg"
>
  <div class="font-semibold text-lg mb-4">Contact</div>
  <form
    action="{link.url}"
    method="POST"
    class="w-full space-y-2"
  >
    <label class="block">
      <!-- <div>Email:</div> -->
      <input 
        type="text" 
        name="_replyto" 
        class="w-full border-gray-300  rounded-lg" 
        placeholder="Email">
    </label>
  
    <label class="block">
      <!-- <div>Message:</div> -->
      <textarea 
        name="message" 
        class="w-full border-gray-300  rounded-lg"
        placeholder="Write me a message"></textarea>
    </label>
  
    <!-- your other form fields go here -->
    <button 
      type="button" 
      class="inline-flex 
        items-center 
        px-4 py-2 
        border 
        border-transparent 
        rounded-md shadow-sm 
        font-medium 
        text-white 
        bg-indigo-600 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="-ml-1 mr-2 h-5 w-5" x-description="Heroicon name: solid/check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      Send
    </button>
  
  </form>

</div>

