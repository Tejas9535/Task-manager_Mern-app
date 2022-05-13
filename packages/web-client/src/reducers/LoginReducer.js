/* eslint-disable camelcase */
import Cookies from 'js-cookie';
import { Login_User, Logout_User, Register_user } from '../actions/type';

const data = Cookies.get('user') === undefined ? [] : JSON.parse(Cookies.get('user'));
// eslint-disable-next-line default-param-last
const LoginReducer = (initialState = data, action) => {
    const { type, payload } = action;
    switch (type) {
        case Login_User:
            /* eslint-disable no-param-reassign */
            /* eslint-disable no-return-assign */
            return initialState = payload;
        case Register_user:
            return alert('user created in sucessfully');
        case Logout_User:
            return alert('log out sucess');
    default:
        return initialState;
    }
};
export default LoginReducer;