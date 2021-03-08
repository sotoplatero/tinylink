
// src/store.js

import { writable, derived  } from "svelte/store";

export const profile = writable({ name:'', links:[] } );
export const links= writable([]);