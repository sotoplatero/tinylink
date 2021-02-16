<script>
    import md5 from 'js-md5';
    export let email 
    export let avatar

    async function handleAvatar(e) {
        avatar = 'https://www.gravatar.com/avatar/' + md5(email);
    }
</script>
<div>
    <div class="mb-4">
        <img 
            src="{avatar||'https://www.gravatar.com/avatar'}" 
            alt="Avatar" 
            class="h-20 w-20 rounded-full bg-gray-100 mx-auto">
    </div>
    <label for="email">Email</label>
    <input
        name="email"
        bind:value={email}
        on:change="{handleAvatar}"
        placeholder="Email for"
        class="w-full p-3 border rounded-lg focus:border-blue-500 outline-none" 
    />
    <div class="text-sm text-gray-500">
        Email for get <a href="">Gravatar</a>   
    </div>
</div>