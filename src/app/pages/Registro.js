import React,{Component} from 'react';
const axios = require('axios');
import {connect} from 'react-redux';
import { set } from 'mongoose';
import {findCurrentUser} from '../../redux/actions/currentUserActions'


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
            <div className="card m-sm-1 m-md-5">
                <div className="card-body">
                    <h3 className="card-title"><p className="material-icons">person</p>Registro de usuario</h3>
                    <div className="card-text">
                    <form onSubmit={this.enviarFormulario}>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">email</p><b> Correo electrónico</b></label>
                            <input className="form-control" type="email" onChange={this.registrarInput} name="email" aria-describedby="emailHelp" placeholder="Ingresa correo electrónico"/>
                        </div>
                            <div className="form-group">
                                <label><p className="material-icons">lock</p><b> Contraseña</b></label>
                                <div className="row pl-3">
                                <input type="password"  onChange={this.registrarInput} name="password" className="form-control col-sm-12 col-md-4 mr-md-3 mb-3" placeholder="Contraseña"/> 
                                <input type="password"  onChange={this.registrarInput} name="checkPassowrd" className="form-control col-sm-12 col-md-4" placeholder="Repite contraseña"/> 
                                </div>
                             
                            </div>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b> Nombre completo</b></label>
                            <div className="row pl-3">
                            <input className="form-control col-sm-12 col-md-4 mr-md-3 mb-3" type="text" onChange={this.registrarInput} name="nombre" aria-describedby="emailHelp" placeholder="Nombre(s)"/>
                            <input className="form-control col-sm-12 col-md-4" type="text" onChange={this.registrarInput} name="apellido" aria-describedby="emailHelp" placeholder="Apellido(s)"/>
                            </div>
                           
                        </div>

                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b> Fecha de nacimiento</b></label>
                            <div className="row pl-3">
                            <input className="form-control form-control-lg col-sm-12 col-md-4 mr-3" type="date" onChange={this.registrarInput} name="birth" aria-describedby="emailHelp" placeholder="Nombre(s)"/>

                            </div>
                           
                        </div>

                        
                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b> Genero</b></label>
                                <label className="radio-inline pr-4" htmlFor="genero-0">
                                <input type="radio" name="gender" onChange={this.registrarInput} id="genero-0" value="m" checked="checked"/>
                                Mujer
                                </label> 
                                <label className="radio-inline pr-4" htmlFor="genero-1">
                                <input type="radio" name="gender" onChange={this.registrarInput} id="genero-1" value="w"/>
                                Hombre
                                </label> 
                                <label className="radio-inline pr-4" htmlFor="genero-2">
                                <input type="radio" name="gender" onChange={this.registrarInput} id="genero-2" value="x"/>
                                No binario
                            </label>
                        </div>
                        <div className="form-group">
                            <label name="username"><p className="material-icons">people</p><b>Terminos y condiciones</b></label>
                            <div className="row pl-3">
                            <input className="form-control form-control-lg col-4 mr-3" type="checkbox" onChange={this.registrarInput} name="terminos"/>Acepto

                            </div>
                           
                        </div>
                       
                        <button type="submit" className="btn btn-lg btn-primary float-right">Enviar</button>
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