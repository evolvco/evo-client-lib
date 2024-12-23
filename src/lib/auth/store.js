let _token

export function getAccessToken(){
	return _token && _token.access_token
}

export function setToken(token){
	_token = token
}