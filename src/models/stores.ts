import { DexieStore } from "@lib/models" 

export const metaStore = new DexieStore({
    name: "dexie_evo_meta",
})

export const appStore = new DexieStore({
    name: "dexie_evo_app"
})