import axios from 'axios'

axios.defaults.withCredentials = true

interface ILogin{
    email: string;
} 

function IsLogin(){
    return axios.get(process.env.VUE_APP_SERVER_URL + 'api/account/islogin')
}

function GetUserInfo(store: any){
    return axios.get(process.env.VUE_APP_SERVER_URL + 'api/account/getuserinfo')
        .then( response =>{
            store.state.claims = response.data.claims
            console.log(response.data)
        })
}

function Login(data: ILogin, store: any){
    return axios.post(process.env.VUE_APP_SERVER_URL + 'api/account/login', data)
        .then(()=>{
            store.state.isAuthenticated = true
            GetUserInfo(store)
        })
}

function Logout(store: any){
    return axios.post(process.env.VUE_APP_SERVER_URL + 'api/account/logout')
        .then(()=>{
            store.state.isAuthenticated = false
        })
}

export {
    ILogin,
    IsLogin,
    Login,
    Logout,
    GetUserInfo
}