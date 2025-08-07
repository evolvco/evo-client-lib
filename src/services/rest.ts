import { iTokenResponse } from "./types"
import { db_url, client_id, client_secret } from "@/models/db"

let token:iTokenResponse|null = null

export function getAccessToken(){
    return token?.accessToken
}

export async function login() {
    
    const dexieResponse = await fetch(`${db_url}/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            //otp: true,
            client_id: client_id,
            client_secret: client_secret,
            scopes: ['ACCESS_DB', 'MANAGE_DB', 'GLOBAL_READ', 'GLOBAL_WRITE'],
            emal_verified: true,
            claims: {
                sub: "michael@evolvco.com",
                email: "michael@evolvco.com",
                name: "michael",
            },
            data: {
                //avatar_url: user.avatar_url,
            },
        }),
    })

    if(!dexieResponse.ok){
        return
    }
    const otpData = await dexieResponse.json()
    console.log(otpData)
    token = otpData
    return otpData
}

export async function users(){
    const dexieResponse = await fetch(`${db_url}/users`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
        }
    })

    if(!dexieResponse.ok){
        return
    }
    const data = await dexieResponse.json()
    console.log('users', data)
    return data
}

export async function postUserStatus(email:string, online:boolean=false){
    const dexieResponse = await fetch(`${db_url}/users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify([{
            userId:email,
            data:{
                reported: Date.now(),
                online: online
            }
        }])
    })

    if(!dexieResponse.ok){
        return
    }
    const data = await dexieResponse.json()
    return data
}

export async function members(){
    const dexieResponse = await fetch(`${db_url}/all/members`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
        }
    })

    if(!dexieResponse.ok){
        return
    }
    const data = await dexieResponse.json()
    console.log('members', data)
    return data
}

export async function realms(){
    const dexieResponse = await fetch(`${db_url}/all/realms`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
        }
    })

    if(!dexieResponse.ok){
        return
    }
    const data = await dexieResponse.json()
    console.log('realms',data)
    return data
}

export async function getUserStatusMap() {
    let {data} = await users()
    let usersMap:any = {}
    let ts = Date.now() - 400000
    data.forEach((u:any)=>{
        let status = {...u.data}
        if(status.online && status.reported>ts){
            status.online=true
        }else{
            status.online=false
        }
        usersMap[u.userId]=status
    })
    return usersMap
}

export async function deleteAll(table:string) {
    const find = await fetch(`${db_url}/all/${table}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
        }
    })

    if(!find.ok){
        return
    }
    const recs = await find.json()

    let fns = recs.map(async (rec:any)=>{
        await fetch(`${db_url}/all/${table}/${rec.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
            }
        })
    })
    await Promise.all(fns)
}