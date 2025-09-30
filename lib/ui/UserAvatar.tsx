import Avatar, { genConfig } from 'react-nice-avatar'
import { ModelRecord } from "@lib/types"
import { cn } from "@lib/utils"

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
    if (!user) {
        return null
    }

    const config = genConfig(user.email as string)

    return (<Avatar {...config} className={cn( className)} />)
}