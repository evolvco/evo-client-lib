import { toSlugCase, toCamelCase, toUnderscoreCase } from "./lib/utils/string"
import Frame from "./Frame"

export default function Home() {
    
    console.log('render')
    return (<Frame setInfo={setInfo}>
            
            <h2>Utils</h2>
            
            <h4>{toSlugCase('to slug case')}</h4>
            <h4>{toCamelCase('to camel case')}</h4>
            <h4>{toUnderscoreCase('to underscore case')}</h4>

        </Frame>
    )
}
