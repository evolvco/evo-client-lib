export * from './meta'
export * from './auth'
export * from './ws'
export * as models from './models'
export * as utils from './utils'
export * as types from './types'
export * as ui from './ui'

//shortcuts
export {
    EvoProvider,
    NotifyProvider,
    Notify,
    useNotify,
    TriLayout,
    Loader,
    Toaster
} from './ui'
export {
    ModelFactory,
    StoreFactory,
    DexieStore,
    metaSchema,
    builder,
    find,
    findOne,
    findById,
    create,
    update,
    remove,
    removeMany,
    useModel
} from './models'
export {
    model,
    meta,
    modelMap,
    create as modelCreate,
    destroy as modelDestroy,
} from './models/ModelFactory'