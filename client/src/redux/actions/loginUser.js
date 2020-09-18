import { LOGIN_USER } from '../consts/actionTypes.js';
import axios from 'axios'
import store from '../store/index'

export function loginUser(loginData){
    // console.log("esta es la data que llega al actions", loginData)
    return function(dispatch) {
        axios({
            method: 'POST',
            url: `http://localhost:3001/auth/login`,
            data: {
                email: loginData.email,
                password: loginData.password,
            }
        })
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })
            return res;
        })
        .then(res => localStorage.setItem('token', res.data.token))
        .catch(() => alert("Los datos del Usuario no concuerdan con un usuario existente...vuelva a intentarlo"))
    }
}