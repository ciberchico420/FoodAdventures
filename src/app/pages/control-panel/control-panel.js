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
        this.state = {contenidoActual:<Index></Index>,otro:"otra cosa"}
        this.cambiarContenido = this.cambiarContenido.bind(this)
       
       
    }
    componentDidMount(){
         this.cambiarContenido(this.props.match.params.sec) 
         console.log(this.props.match);
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
            
            <div className="wrapper">
               
                <div id="sidebar">
                    <div className="sidebar-header"><h5>{Lang.CONTROL_PANEL[this.props.currentUser.lang]}</h5></div>
                    <ul className="sidebar-body">

                        <div className="sidebar-group">
                            <li><a className="btn btn-link" type="button" href="#" onClick={()=>{this.cambiarContenido("index")}}>
                            <i className="fas fa-home fa-lg"></i> {Lang.HOME[this.props.currentUser.lang]}
                            </a></li>
                        
                        </div>
                        <div className="sidebar-group">
                            <li><a className="btn btn-link" type="button" data-toggle="collapse" href="#toursHidden">
                            <i className="fas fa-utensils fa-lg"></i> Tours
                            </a></li>
                            <div className="collapse" id="toursHidden">
                                <li className="sidebar-item"><a href="/control/tours" onClick={()=>{this.cambiarContenido("tour/all")}}><i className="fas fa-layer-group"></i> {Lang.SEE_ALL[this.props.currentUser.lang]}</a></li>
                                <li  className="sidebar-item"><a href="/control/addTour" onClick={()=>{this.cambiarContenido("tour/add")}}><i className="far fa-plus-square fa-lg"></i> {Lang.ADD_TOUR[this.props.currentUser.lang]}</a></li>
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
                            <li className="sidebar-item"><a href="#" onClick={()=>{this.cambiarContenido("calendar")}}><i className="fas fa-layer-group"></i> {Lang.SEE_ALL[this.props.currentUser.lang]}</a></li>
                            </div>
                        
                        </div>
                      
                        
                    </ul>
                </div>
                <div className="container">
                <br></br>
                    <div className="card">
                    
        
                        {this.state.contenidoActual}
                        </div>
                    
                    </div>
           
            </div>
        )
        
    }
}

const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser
        
        
    }
}

export default connect(mapStateToProps)(ControlPanel);