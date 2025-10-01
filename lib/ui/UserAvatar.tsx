import Avatar, { genConfig } from 'react-nice-avatar'
import { ModelRecord } from "@lib/types"
import { cn, toCamelCase } from "@lib/utils"
import { useEffect, useState } from 'react'
import { find } from '@lib/models'

export interface UserAvatarConfigProps {
    shape: 'circle' | 'rounded' | 'square'
    sex: 'man' | 'woman'
    faceColor: string
    earSize: 'small' | 'big'
    hairColor: string
    hairStyle: 'normal' | 'thick' | 'mohawk' | 'womanLong' | 'womanShort'
    hairColorRandom: boolean
    hatColor: string
    hatStyle: 'none' | 'beanie' | 'turban'
    eyeStyle: 'circle' | 'oval' | 'smile'
    glassesStyle: 'none' | 'round' | 'square'
    noseStyle: 'short' | 'long' | 'round'
    mouthStyle: 'laugh' | 'smile' | 'peace'
    shirtStyle: 'hoody' | 'short' | 'polo'
    shirtColor: string
    bgColor: string
    isGradient: boolean
}

export function UserAvatar({ user, className = 'size-8' }: { user: ModelRecord, className?: string }) {
    const [config, setConfig] = useState<ModelRecord|null>(null)
    if (!user) {
        return null
    }

    useEffect(()=>{
        find('sys_avatar',{where:{user:user.id}})
        .then((res)=>{
            if(res.records.length) {
                let rec:any = {}
                Object.keys(res.records[0]).forEach((key)=>{
                    rec[toCamelCase(key)] = res.records[0][key as keyof typeof res.records[0]]
                })
                console.log('---- rec',rec)
                setConfig(rec)
            }else{
                setConfig(genConfig(user.email as string) as any)
            }
        })
    },[user.id])

    if(!config) {
        return false
    }
    return (<Avatar {...config} className={cn( className)} />)
}