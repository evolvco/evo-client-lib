import {getAccessToken, getRestDomain} from '../auth/store'

export async function findall(){
	try{
		const response = await fetch(`${getRestDomain()}/api/meta`, {
	  		method: "GET",
	  		headers: {
	    		'Content-Type': 'application/json',
	    		'Authorization': `Bearer ${getAccessToken()}`
	  		}
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json?.records
	} catch (error: any) {
		console.error(error.message)
		throw error
	}
}
