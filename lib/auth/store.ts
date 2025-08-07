let _token: any
let _restDomain: string = ''
let _socketDomain: string = ''

export function getAccessToken() {
	return _token && _token.access_token
    }

export function setToken(token: any) {
	_token = token
	if(_restDomain){
		localStorage.setItem('refresh-token', token.refresh_token)
	}
}

export function setRestDomain(domain: string) {
	_restDomain = domain
}

export function setSocketDomain(domain: string) {
	_socketDomain = domain
}

export function getRestDomain(): string {
	return _restDomain
}

export function getSocketDomain(): string {
	return _socketDomain
}