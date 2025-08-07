import { MetaTable } from "./types"

export async function populate<T>(this: MetaTable<T>, data: T[], populate?: string[]) {
    console.log(6666, this.meta.references)
    return data
}
 