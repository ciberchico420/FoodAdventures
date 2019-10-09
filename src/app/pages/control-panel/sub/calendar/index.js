
import React,{Component} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import '../../../css/calendarStyles.css'
import Axios from 'axios';
import Cargando from '../../../../components/Cargando';
import ReactDOM from 'react-dom';



class Index extends Component{
   
    constructor(a){
        super(a);
        this.state = {
            dayTitle:'Selecciona un día',
            dias:{
                0:"Domingo",
                1:"Lunes",
                2:"Martes",
                3:"Miércoles",
                4:"Jueves",
                5:"Viernes",
                6:"Sábado"
            },
            meses:{
                0:"enero",
                1:"febrero",
                2:"marzo",
                3:"abril",
                4:"mayo",
                5:"junio",
                6:"julio",
                7:"agosto",
                8:"septiembre",
                9:"octubre",
                10:"noviembre",
                11:"diciembre"
            }
        }
        
        this.onDayClick = this.onDayClick.bind(this);
        this.crearEventos = this.crearEventos.bind(this);
    }
    componentDidMount(){
        this.crearEventos();
    }

    crearEventos(){
        Axios.get("/api/reservations").then(res =>{

            var evs = [] 
            var toursWithRes = {};
            Axios.get("/api/tours").then(tours=>{
               
                tours.data.forEach(tour => {
                    if(tour.reservations.length >0){
                        toursWithRes={...toursWithRes,[tour._id]:tour}   
                    }
                });
                console.log(toursWithRes);
               
                res.data.forEach(reservation => {
    
                    const tour = toursWithRes[reservation.tourId];
                    if(tour){
                        const evP = {title:tour.title,start:reservation.date};
                        if(evs.indexOf(evP) == -1){
                            evs.push(evP)
                        }
                    }
                   
               
                }); 

                this.setState({events:evs});
                this.setState({eventosLoaded:true});
            })
           
         
        
        })
    }
    onDayClick(info){
        console.log(info);
        this.setState({dayTitle: this.state.dias[info.date.getDay()] + " " + info.date.getDate()+ " de "+this.state.meses[info.date.getMonth()]+ " del "+info.date.getFullYear()})


    }
    onEventClick(info){
        console.log(info);
    }
    render() {
        if(this.state.eventosLoaded){
              return (
            <div className="row"  style={{padding:'2rem'}}>
            <div className="col-12 col-lg-5 mb-3 mb-lg-0"> <Calendario selectable={true} onEventClick={this.onEventClick}  events={this.state.events} onDayClick={this.onDayClick}/></div>
            <div className="col-12 col-lg-7"><div className="card">
                <div className="card-title" style={{background:"#f0f0f0",padding:"0px"}}><h3 className="p-1">{this.state.dayTitle}</h3> </div><div className="card-body"></div></div>
                 </div>
            </div>
           
             )
        }else{
           return <Cargando></Cargando>
        }
      
      }
}

class Calendario extends Component{
    constructor(a){
        super(a);
        this.state = {
            // or globalizeLocalizer
        }
    }
    eventRender(info){
        console.log(info)
    

    }
    render() {
        return (
            <FullCalendar locale="es" 
            events={this.props.events}
            aspectRatio={1} selectable={true} 
            displayEventTime={false}
            eventRender={this.eventRender}
            eventClick={this.props.onEventClick}
            dateClick={this.props.onDayClick} defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin ]} />
        )
      }
}


export default Index;