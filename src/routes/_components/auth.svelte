<script context="module">
    export const auth = async () => {
        const res = await fetch('/api/auth/me')
        return await res.json()
    }
</script> 