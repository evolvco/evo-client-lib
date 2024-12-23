export const msToTimeString = (ms)=>{
	
	const h = Math.floor(ms/(1000*60*60))
	const m = Math.floor((ms-(h*1000*60*60))/(1000*60))
	const s = Math.floor((ms-(h*1000*60*60)-(m*1000*60))/1000)
	return (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s
}