import React,{Component} from 'react';
const axios = require('axios');
import {connect} from 'react-redux';
import { set } from 'mongoose';
import {findCurrentUser} from '../../redux/actions/currentUserActions'
import {Redirect} from 'react-router-dom';
import Lang from '../../Traductor';


class LogIn extends Component{

    constructor(props) {
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.registrarInput = this.registrarInput.bind(this);
        this.state = { email: '', password: '',info:'' };
      }

    enviarFormulario(e){
        e.preventDefault();
        const esto = this;
        
        axios.post('/outh/login/',null, {params:{
            username: esto.state.email,
            password: esto.state.password
        }})
          .then(function (response) {
              if(response.data.info != undefined){
                  esto.setState({["info"]:response.data.info})
              }
              esto.props.findCurrentUser();
        
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    registrarInput({target}){
        this.setState({ [target.name]: target.value });
    }

    render(){

        if(this.props.currentUser.logged){
             return <Redirect to='/'></Redirect>
        }else{
            return(<div className="container">
               <VerErrores state={this.state}></VerErrores>
            <div className="card m-5 p-3">
                <div className="card-body">
                    <h3 className="card-title"><p className="material-icons">person</p> {Lang.LOG_IN[this.props.currentUser.lang]}</h3>
                    <div className="card-text">
                    <form onSubmit={this.enviarFormulario}>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">email</p><b> {Lang.EMAIL[this.props.currentUser.lang]}</b></label>
                            <input className="form-control"  onChange={this.registrarInput} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={Lang.ENTER_AN_EMAIL[this.props.currentUser.lang]}/>
                            <small id="emailHelp" className="form-text text-muted"> {Lang.LOGIN_WELL_NEVER_MSG[this.props.currentUser.lang]}</small>
                        </div>
                        <div className="form-group">
                            <label><p className="material-icons">lock</p><b>{Lang.PASSWORD[this.props.currentUser.lang]}</b></label>
                            <input type="password"  onChange={this.registrarInput} name="password" className="form-control" id="exampleInputPassword1" placeholder={Lang.PASSWORD[this.props.currentUser.lang]}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" name="password" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label">{Lang.REMEMBER_ME[this.props.currentUser.lang]}</label>
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary float-right">{Lang.SEND[this.props.currentUser.lang]}</button>
                        </form>
                    </div>
                    </div>
            </div>
           
        </div>)
        }
    
    }
}

const VerErrores =({state})=>{
   if(state.info != ''){
    return <div className="alert alert-warning"><b> <i class="material-icons">info</i>Error:</b> {state.info}</div>;
   }
   return <div></div>
    
}

const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser
    }
}


const mapDispatchToProps ={
    findCurrentUser
}


export default connect(mapStateToProps,mapDispatchToProps)(LogIn);