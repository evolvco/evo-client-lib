let _token
let _restDomain=''
let _socketDomain=''

export function getAccessToken(){
	return _token && _token.access_token
}

export function setToken(token){
	_token = token
	if(_restDomain){
		console.log(333, token)
		localStorage.setItem('refresh-token', token.refresh_token)
	}
}

export function setRestDomain(domain){
	_restDomain = domain
}

export function setSocketDomain(domain){
	_socketDomain = domain
}

export function getRestDomain(){
	return _restDomain
}

export function getSocketDomain(){
	return _socketDomain
}