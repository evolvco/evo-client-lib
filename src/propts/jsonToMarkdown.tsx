export function jsonToMarkdown(json: any): string {
    let md:string = ''
    function process(json: any) {
        if(Array.isArray(json)){
            json.forEach((item: any) => {
                md = md + "\n * "
                process(item)
            })
        }else if(typeof json === 'object'){
            if(json.explanation){
                md = md + `${json.explanation}\n`
            }
            if(json.output){
                md = md + `${json.output}\n`
            }
            if(!json.explanation && !json.output){
                Object.keys(json).forEach((key: any) => {
                    md = md + "### " + key + '\n'
                    process(json[key])
                })
            }
        }else{
            md += `${json}\n`
        }
    }
    process(json)
    return md
}
