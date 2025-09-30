import { ModelRoutes } from '@lib/routes'

export * from '../routes/ModelRoutes'

export function Router({ tag }: {tag?:string}) {
    if(!tag) return <ModelRoutes />
    //console.log('------Router tag', tag)
    return <ModelRoutes query={{where:{tags:tag}}} />
}