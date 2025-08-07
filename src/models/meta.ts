import { metaSchema } from "@lib/models";
import { Meta, Mixin} from "@lib/models/ModelAdaptor.types";
import { metaStore } from "./stores";

export const meta:Meta = {
    name: 'sys_meta_model',
    plural: 'sys_meta_models',
    database: metaStore.name,
    mixins: [Mixin.meta],
    schema: metaSchema
}