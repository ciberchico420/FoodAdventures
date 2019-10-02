import Cookies from 'js-cookie';
import axios from 'axios';
const jwt = require("jsonwebtoken")
import ReduxThunk from 'redux-thunk';

//Se ingresa el nick
export const findCurrentUser = () =>{
    return dispatch =>{
        axios.get("/api/user").then(res=>{
                dispatch({type:"findCurrentUser",payload:res.data});
        })
        
    }
    
}
export const closeCurrentUser = () =>{
    return {type:"closeCurrentUser"}
    }
