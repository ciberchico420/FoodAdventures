import React,{Component} from 'react';
import {Link } from "react-router-dom";
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/currentUserActions';
const Lang = require('../../Traductor')

const jwt = require("jsonwebtoken")

class Header extends Component{

    constructor(a){
        super(a);
        this.UsuarioHandle = this.UsuarioHandle.bind(this);
    }
     UsuarioHandle(data){
        if(data.props.currentUser.logged){
            var targetOfGreeting = data.props.currentUser.user.fullName;
    
            let admin;
            if(data.props.currentUser.user.role>0){
                admin= <Link to="/control" className="dropdown-item"><b>{Lang.CONTROL_PANEL[this.props.currentUser.lang]}</b></Link>
            }
            return (<div className="navitem dropdown float-right">
                        <a href="#" className="nav-link dropdown-toggle " data-toggle="dropdown"><i className="fas fa-user-circle"></i> {targetOfGreeting}</a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link to="/profile" className="dropdown-item">{Lang.PROFILE[this.props.currentUser.lang]}</Link>
                            {admin}
                            <div className="dropdown-divider"></div>
                            
                            <Link to="/logout" className="dropdown-item">{Lang.LOG_OUT[this.props.currentUser.lang]}</Link>
                        </div>
                        
                    </div>
                );
        }else{
            return <Link className="nav-link float-right" to="/login">{Lang.LOG_IN[this.props.currentUser.lang]}</Link>;
        }
     
    }

    render(){

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{borderBottom:'1px solid #b1b1b1'}}>
            <a className="navbar-brand" href="#">FoodAdventures México</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/*Tareas basicas*/}
                <div className=" col-sm-12 col-md-12 col-lg-4">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item  active">
                        <Link className="nav-link" to="/">{Lang.HOME[this.props.currentUser.lang]}</Link>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="#">{Lang.HEADER_WHAT_IS[this.props.currentUser.lang]}</a>
                    </li>
                   
                    </ul>
                </div>
                   {/*Buscador*/}
                <div className=" col-md-12 col-lg-3">
                    <form className="form-inline my-2 my-lg-0 row">
                    <input className="form-control col-sm-12 col-md-8 col-lg-8" type="search" placeholder={Lang.SEARCH[this.props.currentUser.lang]} aria-label="Buscar"/>
                    <button className="btn btn-outline-success  col-md-4 mt-xs-2 mt-sm-0 mt-md-0 mt-lg-0" type="submit">{Lang.SEARCH[this.props.currentUser.lang]}</button>
                    </form>
                </div>

                   {/*Cuenta de usuario*/}
                <div className=" col-sm-12 col-md-12 col-lg-5">
                
                   {this.UsuarioHandle(this)}
                    
                </div>
            </div>
            </nav>
        );
    }
}


const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser
        
        
    }
}


const mapDispatchToProps ={
    findCurrentUser:userActions.findCurrentUser
}


export default connect(mapStateToProps,mapDispatchToProps)(Header);