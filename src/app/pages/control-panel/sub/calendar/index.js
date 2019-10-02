
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

            res.data.forEach(element => {
                evs.push({title:"TOUR",start:element.date,end:element.date})
            });
            this.setState({eventosLoaded:true});
            this.setState({events:evs});
        })
    }
    onDayClick(info){
        console.log(info);
        this.setState({dayTitle: this.state.dias[info.date.getDay()] + " " + info.date.getDate()+ " de "+this.state.meses[info.date.getMonth()]+ " del "+info.date.getFullYear()})


    }
    render() {
        if(this.state.eventosLoaded){
              return (
            <div className="row"  style={{margin:'1%'}}>
            <div className="col-5"> <Calendario events={this.state.events} onDayClick={this.onDayClick}/></div>
            <div className="col-7"><div className="card">
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
            
            dateClick={this.props.onDayClick} defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin ]} />
        )
      }
}


export default Index;