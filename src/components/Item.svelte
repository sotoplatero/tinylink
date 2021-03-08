<script>
    import Contact from './Contact.svelte'
    import Link from './Link.svelte'
    import Title from './Title.svelte'
    import Image from './Image.svelte'   
    import Download from './Download.svelte'      
    import Pulse from './Pulse.svelte'      

    export let link

    let components = {
        form: Contact,
        text: Title,
        link: Link,
        img: Image,
        pdf: Download,
        new: Pulse,
    }    

    $: component = components[link.type]

</script>

<svelte:component this={component} {link} /> 