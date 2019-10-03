import React,{Component} from 'react';
const axios = require('axios');
import {connect} from 'react-redux';
import { set } from 'mongoose';
import {findCurrentUser} from '../../redux/actions/currentUserActions'
import Lang from "../../Traductor"


class Registro extends Component{

    constructor(props) {
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.registrarInput = this.registrarInput.bind(this);
        this.state = { email: '', password: '',checkPassowrd:'',info:'',fullName:'',birth:'' };
      }

    enviarFormulario(e){
        e.preventDefault();
        const esto = this;
        
        axios.post('/outh/register/',null, {params:{
            email: esto.state.email,
            password: esto.state.password,
            checkPassword:esto.state.checkPassowrd,
            fullName:esto.state.nombre+" "+esto.state.apellido,
            birth:esto.state.birth,
            gender:esto.state.gender

        }})
          .then(function (response) {
              if(response.data.info != undefined){
                  esto.setState({["info"]:response.data.info})
              }
              //Agrega el usuario
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
            return(<div className="container">
               <VerErrores state={this.state}></VerErrores>
            <div className="card m-xs-1 m-md-5">
                <div className="card-body">
                    <h3 className="card-title"><p className="material-icons">person</p>{Lang.USER_REGISTRATION[this.props.currentUser.lang]}</h3>
                    <div className="card-text">
                    <form onSubmit={this.enviarFormulario}>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">email</p><b> {Lang.EMAIL[this.props.currentUser.lang]}</b></label>
                            <input className="form-control" type="email" onChange={this.registrarInput} name="email" aria-describedby="emailHelp" placeholder={Lang.ENTER_AN_EMAIL[this.props.currentUser.lang]}/>
                        </div>
                            <div className="form-group">
                                <label><p className="material-icons">lock</p><b> {Lang.PASSWORD[this.props.currentUser.lang]}</b></label>
                                <div className="row pl-3">
                                <input type="password"  onChange={this.registrarInput} name="password" className="form-control col-sm-12 col-md-4 mr-md-3 mb-3" placeholder={Lang.PASSWORD[this.props.currentUser.lang]}/> 
                                <input type="password"  onChange={this.registrarInput} name="checkPassowrd" className="form-control col-sm-12 col-md-4" placeholder={Lang.REPEAT_PASSWORD[this.props.currentUser.lang]}/> 
                                </div>
                             
                            </div>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b>{Lang.FULL_NAME[this.props.currentUser.lang]}</b></label>
                            <div className="row pl-3">
                            <input className="form-control col-sm-12 col-md-4 mr-md-3 mb-3" type="text" onChange={this.registrarInput} name="nombre" aria-describedby="emailHelp" placeholder={Lang.NAMES_PLACEHOLDER[this.props.currentUser.lang]}/>
                            <input className="form-control col-sm-12 col-md-4" type="text" onChange={this.registrarInput} name="apellido" aria-describedby="emailHelp" placeholder={Lang.SURENAME[this.props.currentUser.lang]}/>
                            </div>
                           
                        </div>

                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b>{Lang.BIRTHDAY[this.props.currentUser.lang]}</b></label>
                            <div className="row pl-3">
                            <input className="form-control form-control-lg col-sm-12 col-md-4 mr-3" type="date" onChange={this.registrarInput} name="birth"/>

                            </div>
                           
                        </div>

                        
                        <div className="form-group"> 
                        <label name="username"><p className="material-icons">people</p><b> {Lang.GENDER[this.props.currentUser.lang]}</b></label>
                            <fieldset>
                           
                                <label className="radio-inline mr-4" htmlFor="genero-0">
                                <input type="radio" name="gender" onChange={this.registrarInput}  value="m"/>
                                {Lang.WOMAN_GENDER[this.props.currentUser.lang]}
                                </label> 
                                <label className="radio-inline mr-4" htmlFor="genero-1">
                                <input type="radio" name="gender" onChange={this.registrarInput}  value="w"/>
                                {Lang.MAN_GENDER[this.props.currentUser.lang]}
                                </label> 
                                <label className="radio-inline mr-4" htmlFor="genero-2">
                                <input type="radio" name="gender" onChange={this.registrarInput} value="x"/>
                                {Lang.NOT_BINARY_GENDER[this.props.currentUser.lang]}
                            </label>

                            </fieldset>
                            
                        </div>
                       
                        <div className="row col-12">
                             
                             <mark className="col-xs-12 col-md-10">
                            <div className="row">  
                                    <p className="col-sm-8 col-md-5"> {Lang.ACCEPT_TERMS_AND_CONTIDIONS[this.props.currentUser.lang]}</p>
                                    <input className="form-control col-sm-4 col-md-1 my-auto" type="checkbox" onChange={this.registrarInput} name="terminos"/>
                                </div>
                            </mark> 
                            <div className="col-xs-12  col-md-1 p-2"> 
                              <button type="submit" className="btn btn-lg btn-primary float-right">Enviar</button>
                            </div>
                          
                           
                        </div>
                        </form>
                    </div>
                    </div>
            </div>
           
        </div>)
    
    }
}

const VerErrores =({state})=>{
   console.log(state)
   if(state.info != ''){
    return <div className="alert alert-warning"><b> <i className="material-icons">info</i>Error:</b> {state.info}</div>;
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


export default connect(mapStateToProps,mapDispatchToProps)(Registro);