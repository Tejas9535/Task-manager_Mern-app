import Cookies from "js-cookie";
import { Login_User, Logout_User, Register_user } from "../actions/type";
// import api from '../components/DataDisplay.jsx'
// import http from '../common-htttp';
// import UserServices from "../services/Login";
let data = Cookies.get("user") == undefined ? []:JSON.parse(Cookies.get("user"))


const LoginReducer = (initialState=data, action) => {
    const {type, payload} = action;
    // console.log('lr',state);
    switch(type){
        case Login_User:
            return initialState = payload
        case Register_user:
            return alert('user created in sucessfully');
        case Logout_User:
            return alert('log out sucess');
    default:
        return initialState;
    }
}
export default LoginReducer