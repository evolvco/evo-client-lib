import {getAccessToken, getRestDomain} from './store'

interface Credentials {
    username: string;
    password: string;
}

export async function pulse(){
	try{
		const response = await fetch("/api/pulse", {
	  		method: "GET",
	  		headers: {
	    		'Content-Type': 'application/json'
	  		}
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error: any) {
		console.error(error.message)
		throw error
	}
}

export async function login(cred: Credentials) {
    const response = await fetch(`${getRestDomain()}/api/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cred)
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
}

export async function getUser(){
	try{
		const response = await fetch(`${getRestDomain()}/api/auth/user`, {
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
	} catch (error: any) {
		console.error(error.message)
		throw error
	}
}

export async function refresh(refresh_token: any) {
	try{
		const response = await fetch(`${getRestDomain()}/api/auth/refresh`, {
	  		method: "POST",
	  		headers: {
	    		"Content-Type": "application/json",
	  		},
			body: JSON.stringify({refresh_token})
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error: any) {
		console.error(error.message)
		throw error
	}
}

export async function release(){
	try{
		const response = await fetch(`${getRestDomain()}/api/auth/release`, {
	  		method: "POST",
	  		headers: {
	    		"Content-Type": "application/json",
	  		}
		})
		if (!response.ok) {
			const json = await response.json();
			throw new Error(json.message);
		}
		const json = await response.json();
		return json
	} catch (error: any) {
		console.error(error.message)
		throw error
	}
}