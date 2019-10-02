import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Cookie from 'js-cookie';
const jwt = require("jsonwebtoken")
import {secret} from '../../passport/jwtConfig'
export const  ProtectedRoute = ({Component, ...rest})=>{
    const cook = Cookie.get("jwt");
    if(cook != null){
        try{
            if(rest.user.user.role >= rest.minRole ){
                if(jwt.verify(cook,secret) != null){
                    return (
                        <Route {... rest} render={props =>{return <Component {...props} />}}></Route>
                    )
                    }
            }
           
        }catch(err){
            console.log(err);
        }
    }
    return (<Redirect to='/'></Redirect>)

}
