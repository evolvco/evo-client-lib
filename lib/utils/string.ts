
export const toSlugCase = (str:string) => {
  return str.replace(/([A-Z])/g,(x)=>(` ${x}`)).trim().replace(/\s+/g,'-').toLowerCase()
}

export const toUnderscoreCase = (str:string) => {
  return str.replace(/([A-Z])/g,(x)=>(` ${x}`)).trim().replace(/\s+/g,'_').toLowerCase()
}

export const toCamelCase = (str:string) => {
  return str.replace(/-/g, ' ').split(' ').map((s,i)=>(s.charAt(0)[i===0?'toLowerCase':'toUpperCase']() + s.slice(1))).join('')
}

export const toSpaceCase = (str:string) => {
  return toSlugCase(str).split(/\-|\_/g).map((s,i)=>(s.charAt(0).toUpperCase() + s.slice(1))).join(' ')
}

export function capitalize(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const initialize = function(str:string){
  return str
  	.split(' ')
  	.map((w:string)=>{
  		return w.charAt(0)
  	})
  	.join('')
  	.replace(/[1-9]/ig, '')
  	.toUpperCase();
}