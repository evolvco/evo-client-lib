import {getAccessToken, getRestDomain} from '../auth/store'

export async function builder({collection, id, method, path, query, body, secure}){
	try {
		let url = `${getRestDomain()}${path.replace(':collection', collection).replace(':id', id)}${query?`?${query}`:''}`
		let options = {method}
		if(secure){
			options.headers = {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getAccessToken()}`
			}
		}
		if(body){
			options.body = JSON.stringify(body)
		}
		const response = await fetch(url, options)
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function find(collection, query){
	try{
		let q = ''
		if(query){
			Object.keys(query).forEach((key,i)=>{
				q = `${i>0?'&':''}${key}=${query[key]}`
			})
		}
		const response = await fetch(`${getRestDomain()}/api/${collection}${(query &&Object.keys(query).length)?`?${q}`:''}`, {
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
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function findById(collection, id){
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
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
		return json.record
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function findOne(collection, q={}){
	const query = new URLSearchParams({...q, where:JSON.stringify(q.where)}).toString()
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}/findone?${query}`, {
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
		return json.record 
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function create(collection, atts){
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}`, {
	  		method: "POST",
	  		headers: {
	    		'Content-Type': 'application/json',
	    		'Authorization': `Bearer ${getAccessToken()}`
	  		},
	  		body: JSON.stringify(atts)
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function update(collection, id, atts){
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
	  		method: "PUT",
	  		headers: {
	    		'Content-Type': 'application/json',
	    		'Authorization': `Bearer ${getAccessToken()}`
	  		},
	  		body: JSON.stringify(atts)
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function remove(collection, id){
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
	  		method: "DELETE",
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
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}

export async function removeMany(collection, q){
	const query = new URLSearchParams({...q, where:JSON.stringify(q.where)}).toString()
	try{
		const response = await fetch(`${getRestDomain()}/api/${collection}/many?${query}`, {
	  		method: "DELETE",
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
		return json
	} catch (error) {
		console.error(error.message)
		throw error
	}
}
