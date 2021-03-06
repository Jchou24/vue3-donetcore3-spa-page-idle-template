import { IAuthentication, IClaims } from '@/models/authentication'

function GetInitAuthentication(): IAuthentication{
    return {
        isAuthenticated: false,
        // userRoles: [],
        claims: {
            emailaddress: "",
            name: "",
            role: "",
        },
    }
}

function SetClaims( state: IAuthentication, claims: IClaims ){
    Object.keys(claims).forEach( key => Reflect.set( state.claims, key, Reflect.get(claims, key) ) )
}

export default{
    namespaced: true,
    state: GetInitAuthentication(),
    mutations: {
        Init: ( state: IAuthentication ) => {
            const initAuthentication = GetInitAuthentication()
            Object.keys(initAuthentication).forEach( key => Reflect.set( state, key, Reflect.get(initAuthentication, key) ) )
            SetClaims(state, state.claims)
        },
        SetIsAuthenticated: ( state: IAuthentication, isAuthenticated: boolean ) => state.isAuthenticated = isAuthenticated,
        SetClaims: ( state: IAuthentication, claims: IClaims ) => SetClaims(state, claims),
        SetEmail: ( state: IAuthentication, email: string ) => state.claims.emailaddress = email,
    },
    actions: {
    },
    modules: {
    }
}