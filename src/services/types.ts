export interface iTokenResponse {
    type: 'tokens'
    claims: {
      sub: string
      license?: 'ok' | 'expired' | 'deactivated'
      [claimName: string]: any
    }
    accessToken: string
    accessTokenExpiration: number
    refreshToken?: string
    refreshTokenExpiration?: number | null
    userType: 'demo' | 'eval' | 'prod' | 'client'
    evalDaysLeft?: number
    userValidUntil?: number
    alerts?: {
      type: 'warning' | 'info'
      messageCode: string
      message: string
      messageParams?: { [param: string]: string }
    }[]
}