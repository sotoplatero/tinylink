<script>
  // import { dark, theme } from "./store"; // dark mode
  import { themes, fonts } from "./store"; // dark mode
  import { toClipboard } from "copee";
  import InputText from "./components/input.svelte"; 
  import SelectOptions from "./components/select-options.svelte";
  import SelectColor from "./components/select-color.svelte";

  let url = 'https://dev.to/ranaemad/make-your-website-social-media-card-able-on-twitter-facebook-and-more-35la';
  let loading = false;
  let textSize = '';
  let bg = '';
  let color = '';
  let bgFrom = '';
  let bgTo = '';
  let colorFrom = '';
  let colorTo = '';
  let pattern = '';

  let theme = $themes[ Math.floor(Math.random() * $themes.length) ];

  let font = '';
  let src;

  $: if (bgFrom && bgTo) bg = bgFrom + '_' + bgTo;
  $: if ( colorFrom && colorTo) color = colorFrom + '_' + colorTo;

  $: {
    src = `/card?url=${url}&theme=${theme}`;
    src += bg ? `&bg=${bg}` : '';
    src += color ? `&color=${color}` : '';
    src += font ? `&font=${font}` : '';
    encodeURI(src);
  }

  $: src && (loading = true);

  function loader(img) {
    img.onload = () => (loading = false);
  }

</script>

<!-- Note: "class:dark" is equivalent (and short for) "class:dark={dark}" or "class:dark={dark === true}" -->
<header class="max-w-4xl h-screen min-h-screen mx-auto flex items-center justify-center px-4">
  <div class="text-center">
    
    <h1 class="text-4xl md:text-5xl text-dark-blue-800 font-bold" >
        <span class="text-red-600">USECARD</span><br> Auto Social Image
    </h1>
    <div class="max-w-2xl mx-auto pt-8 text-2xl text-gray-600 leading-relaxed space-y-6">
      <p >
          Generate a social image for each page of your site using the url parameters. Fast and easy !! <br>
          <span class="text-lg font-semibold text-gray-500">You no longer have to waste time creating images.</span>
      </p>
      
    </div>
    <div class="mt-10">
        <a href="#builder" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-xl">
          Build URL
        </a>
    </div>
  </div>
</header>

<div class="h-screen min-h-screen py-8 px-4">

  <main id="builder" class="max-w-4xl mx-auto space-y-6 ">

      <div class="text-center">
        <h2 class="text-2xl md:text-3xl font-bold">Customize your Image</h2>
        <p class="text-lg">Generate the URL of the custom image. You can change the colors, create gradients and select the theme of your preference.</p>
      </div>

      <div class="grid grid-cols-4 gap-2">

        <div class="col-span-4">
          <InputText bind:value={url} label="URL" />
        </div>

        <SelectOptions 
          bind:value={theme} 
          options={$themes} 
          label="Theme"
        />

        <SelectOptions 
          bind:value={font} 
          options={$fonts} 
          label="Font Family"
        />

        <div>
            <label for="bgcolor" class="block font-semibold">Backgroud color</label>        
            <div class="grid grid-cols-2 gap-1">
                <SelectColor bind:value={bgFrom} name="bgcolor"/>
                <SelectColor bind:value={bgTo} />
            </div>
        </div>

        <div>
            <label for="textcolor" class="block font-semibold">Text color</label>        
            <div class="grid grid-cols-2 gap-1">
                <SelectColor bind:value={colorFrom} name="textcolor" />
                <SelectColor bind:value={colorTo} name="textcolor"/>
            </div>
        </div>

      </div>

      <div class="border rounded-xl overflow-hidden">
        <a href="{src}" title="Social Image" target="_blank" class="relative pb-1/2 block">
          <img 
            {src}
            class="rounded-xl absolute h-full w-full object-cover" 
            alt="social card"
            use:loader
            style="{ loading ? 'filter: blur(8px);' : '' }"
          >

        </a>
      </div>

      <div class="py-3 flex items-center text-gray-500 space-x-2">
        <!-- <span>http://usecard.netlify.app{src}</span>  -->
        <button 
          on:click="{toClipboard( 'http://usecard.netlify.app' + src ) }" 
          class="
            bg-gray-100 rounded-lg
            p-2 px-4         
            hover:text-gray-800"
        >
          <svg class="h-6 w-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy URL
        </button>

<!--         <button
          class="
            bg-gray-100 rounded-lg
            p-2 px-4
          "
        >
          <svg class="h-6 w-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg> 
          Meta Tag         
        </button> -->

<!--         <a href="{src}" download="card.jpg">
          <svg class="h-6 w-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg> 
          Download      
        </a> -->
      </div>
  </main>

  <footer class="my-8 text-center">
      Made with &#9995; and &#128147; at &#127968; by <a href="https://twitter.com/sotoplatero" class="text-blue-500">@sotoplatero</a><br>
      <a href="https://unavatar.now.sh/" target="_black" rel="noreferer noopnener" class="text-sm text-gray-500">Thank to unavatar by @Kikobeats</a> 
  </footer>

</div>
