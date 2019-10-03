import React,{Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'
import Index from './sub'
import AddTour from './sub/addTour'
import Tours from './sub/Tours'
import Calendar from './sub/calendar'
import {connect} from 'react-redux';
const Lang = require("../../../Traductor")

class ControlPanel extends Component{
    constructor(a){
        super(a);
        this.state = {contenidoActual:<Index></Index>,otro:"otra cosa",display:"block",iconoSide:"fas fa-arrow-left"}
        this.cambiarContenido = this.cambiarContenido.bind(this)
        this.cerrarSidenav = this.cerrarSidenav.bind(this);
       
       
    }
    componentDidMount(){
         this.cambiarContenido(this.props.match.params.sec) 
         console.log(this.props.match);
    }

    cerrarSidenav(e){ 
       
        if(this.state.display == "block"){
            console.log("close");
            this.setState({display:"none",iconoSide:"fas fa-arrow-right"})
        }else{
            this.setState({display:"block",iconoSide:"fas fa-arrow-left"})
        }
        
    }

    cambiarContenido(e){
      
        switch(e){
            case "index":{
                this.setState({contenidoActual:<Index currentUser={this.props.currentUser}></Index>});
                break;
            }
            case "tours":{
                this.setState({contenidoActual:<Tours currentUser={this.props.currentUser}></Tours>});
                break;
            }
            case "addTour":{
                this.setState({contenidoActual:<AddTour currentUser={this.props.currentUser}></AddTour>});
                break;
            }
            case "calendar":{
                this.setState({contenidoActual:<Calendar currentUser={this.props.currentUser}></Calendar>});
                break;
            }

            default:{
                this.setState({contenidoActual:<Index currentUser={this.props.currentUser}></Index>})
            }
        }
    }
    render(){
    
        return(   
           
            
            <div id="contenedorGeneral">
               
                 <Barra esto={this} currentUser={this.props.currentUser}></Barra>
                 <button className="btn btn-default" onClick={this.cerrarSidenav}><i className={this.state.iconoSide}></i></button>
                <div id="contenido" className="container">
                <br></br>
                    <div className="card">
                        {this.state.contenidoActual}
                    </div>
                    
                </div>
                    <aside class="bg-warning"></aside>
                    <main></main>
           
            </div>
        )
        
    }
}

class Barra extends Component{


    barraLateral(){
        const esto = this.props.esto; 
        const ver = "d-"+esto.state.display;
        return( 
           
        <div id="sidebar" className={ver}>
            <div className="sidebar-header"><h5>{Lang.CONTROL_PANEL[this.props.currentUser.lang]}</h5></div>
            <ul className="sidebar-body">

                <div className="sidebar-group">
                    <li><a className="btn btn-link" type="button" href="#" onClick={()=>{esto.cambiarContenido("index")}}>
                    <i className="fas fa-home fa-lg"></i> {Lang.HOME[this.props.currentUser.lang]}
                    </a></li>
                
                </div>
                <div className="sidebar-group">
                    <li><a className="btn btn-link" type="button" data-toggle="collapse" href="#toursHidden">
                    <i className="fas fa-utensils fa-lg"></i> Tours
                    </a></li>
                    <div className="collapse" id="toursHidden">
                        <li className="sidebar-item"><a href="/control/tours" onClick={()=>{esto.cambiarContenido("tour/all")}}>
                            <i className="fas fa-layer-group"></i> {Lang.SEE_ALL[this.props.currentUser.lang]}</a>
                            </li>
                        <li  className="sidebar-item"><a href="/control/addTour" onClick={()=>{esto.cambiarContenido("tour/add")}}>
                            <i className="far fa-plus-square fa-lg"></i> {Lang.ADD_TOUR[this.props.currentUser.lang]}</a>
                            </li>
                    </div>
                
                </div>
                <div className="sidebar-group">
                    <li  ><a className="btn btn-link" type="button" data-toggle="collapse" href="#usersHidden">
                    <i className="fas fa-user fa-lg"></i> {Lang.USERS[this.props.currentUser.lang]}
                    </a></li>
                    <div className="collapse" id="usersHidden">
                    
                    </div>
                
                </div>
                <div className="sidebar-group">
                    <li ><a className="btn btn-link" type="button" data-toggle="collapse" href="#calendarHidden">
                    <i className="fas fa-calendar-alt fa-lg"></i> {Lang.CALENDAR[this.props.currentUser.lang]}
                    </a></li>
                    <div className="collapse" id="calendarHidden">
                    <li className="sidebar-item"><a href="#" onClick={()=>{esto.cambiarContenido("calendar")}}><i className="fas fa-layer-group"></i> {Lang.SEE_ALL[this.props.currentUser.lang]}</a></li>
                    </div>
                
                </div>
            
                
            </ul>
         </div>
        )
        
    }

    render(){
        return this.barraLateral();
    }  
}

const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser
        
        
    }
}
export default connect(mapStateToProps)(ControlPanel);