import App from './App.svelte';
import "../public/global.css";

const app = new App({
    target: document.body,
    hydrate: true,
    props: {
    }
});

export default app;
