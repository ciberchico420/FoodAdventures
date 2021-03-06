import React,{Component} from 'react'
import {connect} from 'react-redux';
import InfoMessage from '../components/InfoMessage'

import SmallCal from 'react-calendar';

import './css/calendarStyles.css'
import Axios from 'axios';
import Cargando from '../components/Cargando';
const Lang = require("../../Traductor")

class Tour extends Component{

    constructor(a){
        super(a);
        this.state ={
            meses:Lang.MONTHS[this.props.currentUser.lang],
            diaSeleccionado:new Date(),
            infoMessage:{}
        }
        this.onClickDate = this.onClickDate.bind(this);
        this.contenido = this.contenido.bind(this);
        this.contenidoDerecha = this.contenidoDerecha.bind(this);
        this.pagar = this.pagar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cambiarHora =this.cambiarHora.bind(this);
        this.disableTiles = this.disableTiles.bind(this);
     
    }
    setPhoneInput(elem){
       var iti = intlTelInput(elem,{preferredCountries:["mx","us","ca"]});
    }
    componentDidMount(){
        const esto = this;
        Axios.get("/api/getTour",{params:{id:this.props.match.params.id}}).then(res=>{
            esto.setState({tourInfo:res.data,loaded:true});
            
        })
        if(this.phoneInput != null){
           /* this.phoneInput.current.capture().then((uri)=>{
                console.log("Hola",uri);
            })*/
            console.log("co;o",this.phoneInput)
        }

       
    }

    onClickDate(value){
        if(this.state.hasSelectedHour){
            
            var hora = this.state.horaSeleccionada;
            value.setHours(hora[0]);
            value.setMinutes(hora[1]);

        }

        this.setState({diaSeleccionado:value});
        console.log(value)
    }

    calcularPrecio(esto){
        if(esto.state.personas){
          return esto.state.tourInfo.price*esto.state.personas.length;  
        }else{
            return esto.state.tourInfo.price;
        }
        
    }

    pagar(e){
        console.log(this.state)
        const esto = this;
        if(this.state.hasSelectedHour){
              Axios.post("/api/addReservation",null,{params:{
            tourId:this.state.tourInfo._id,
            clientId:this.props.currentUser.user._id,
            people:this.state.personas,
            phone:this.state.phone,
            observations:this.state.observations,
            date:this.state.diaSeleccionado,
            hour:this.state.horaSeleccionada
        }}).then(res=>{
            esto.setState({infoMessage:res.data})
            console.log(this.state);
        })
        }else{
            this.setState({infoMessage:{info:Lang.TOUR_PLS_SELECT_HOUR_MSG[this.props.currentUser.lang]}})
        }

      
    }

    cambiarHora(e){
        
        try{
            let hora = e.target.value.split(":");
            let newT = new Date(this.state.diaSeleccionado.valueOf());
            newT.setHours(hora[0]);
            newT.setMinutes(hora[1]);
            newT.setSeconds(0);
            this.setState({hasSelectedHour:true});
            this.setState({horaSeleccionada:hora})
            console.log("Cambiar hora",e)
        }catch(err){
            console.log("Error cambiar hora",err)
            this.setState({hasSelectedHour:false});
        }

    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    contenidoDerecha(){
        if(this.state.diaSeleccionado === undefined){

        }else{
            return (
                <div>
                <h3><i className="fas fa-calendar-day"></i> {this.state.diaSeleccionado.getDate()} de {this.state.meses[this.state.diaSeleccionado.getMonth()]}</h3>
                    <div>
                        <h5>{Lang.TOUR_CONTACT_NUMBER[this.props.currentUser.lang]}</h5>
                        <input type="tel" className="form-control form-control-lg" ref={this.setPhoneInput}  name="phone" onChange={this.onChange}></input>
                        
                    </div>
                    <br></br>
                    <MasPersonas esto={this} user={this.props.currentUser}></MasPersonas>
                    <br></br>
                    <div className="input-group">
                        <span className="col-12 col-lg-3 pb-3">
                            <h5>{Lang.OBSERVATIONS[this.props.currentUser.lang]}</h5>
                            <small className="p-1 text-secondary">({Lang.TOUR_OBS_INFO[this.props.currentUser.lang]})</small>
                            </span>
                        <br></br>
                        <textarea name="observations" onChange={this.onChange} className="form-control"></textarea>

                    </div>
                    <br></br>
                    <div className="input-group">
                       
                       <div className="input-group-prepend">
                            <div className="input-group-text" style={{}}>{Lang.HOUR[this.props.currentUser.lang]}</div>
                            </div> {this.ponerHorarios()}
                    </div>
                    <br></br>
                    <div className="input-group col-12 col-lg-4 float-right">
                           
                            <input className="form-control" onChange={this.registrarInput} value={this.calcularPrecio(this)} disabled={true}/>
                            <div className="input-group-prepend">
                            <div className="input-group-text" style={{background:'#cdd5c6'}}>MXN</div>
                            </div>
                            <button onClick={this.pagar} className="btn btn-warning ml-2">{Lang.PAY[this.props.currentUser.lang]}</button>
                    </div>
                </div>
                
            )
        }
    }
    ponerHorarios(){
        var tt = []
        this.state.tourInfo.schedule.forEach(element => {
            if(element.cod.includes("selHour")){
                tt.push(<option>{element.data}</option>);
            }
        });
        return(<select onChange={this.cambiarHora} className="form-control col-11 col-lg-5">
                                <option>{Lang.TOUR_SELECT_SCHEDULE[this.props.currentUser.lang]}</option>
                                   {tt}
                                    </select>);
    }

    disableTiles({activeStartDay,date,view}){
        const sch = this.state.tourInfo.schedule;
        var ret = false;

       // console.log(sch);

        //Checar dias
        var diasDisponibles = [];
        var diasExcepcion =[];
        sch.forEach(element => {
            if(element.cod.includes("all")){
                const num = element.cod.replace("all","");
                diasDisponibles.push(parseInt(num));
            }
            if(element.cod.includes("excDay")){
                const dia = new Date(element.data);
                
                if(date.getDate() === dia.getDate() && date.getMonth() === dia.getMonth() && date.getFullYear() === dia.getFullYear()){
                    ret = true;
                }
            }
      
        });
        if(diasDisponibles.length >0){
             if(!diasDisponibles.includes(date.getDay())){
            ret = true;
            }
        }
        const hoy = new Date();
        if(date.getTime() < hoy.getTime()){
            ret = true;
        }
       
        

        return ret;
    }

    contenido(){
        if(this.props.match.params.id == undefined){
            return <div>{Lang.TOUR_NO_ID_MESSAGE[this.props.currentUser.lang]}</div>
        }else{
            return (
                <div>
                  
                  
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-4"><h5 className="text-center">{Lang.TOUR_SELECT_PREFERED_DAY[this.props.currentUser.lang]}</h5>
                            <SmallCal minDetail="year" locale={this.props.currentUser.lang} value={this.state.diaSeleccionado} onClickDay={this.onClickDate} tileDisabled={this.disableTiles}></SmallCal></div>
                            <div className="col-12 col-lg-8">{this.contenidoDerecha()}</div>
                            
                        </div>  
                    </div>
                </div>
                    )
        }
    }

    render(){
        if(this.state.loaded){
            return(    <div className="container">
                
            <br></br><InfoMessage infoMessage={this.state.infoMessage}></InfoMessage>
            <div className="card">
            <div className="card-head" style={{background:"#ebebeb",height:"5rem"}}>
                    
                   <h1 className="container text-center" style={{paddingTop:"1rem"}}><i className="fas fa-utensils mr-2 text-secondary"></i>{this.state.tourInfo.title}</h1>
                    
                    </div>
                <div className="card-body">
                    {this.contenido()}
                    </div>
                
            </div>
            
            </div>
        )

        }else{
            return(<Cargando></Cargando>)
        }
       
        
    }
}

class MasPersonas extends Component{

    constructor(a){
        super(a);
        this.state={
            personas:[],
            generalState:''
        }
        this.eliminar = this.eliminar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.agregarPersona = this.agregarPersona.bind(this);
    }

    componentDidMount(){
        const u = this.props.user.user;
        this.setState({personas:[{name:u.fullName,age:22,email:u.email}]})
        this.props.esto.setState({personas:[{name:u.fullName,age:22,email:u.email}]})
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    agregarPersona(e){
        const estado = this.state;
        let x = [...this.state.personas];
        x.push({name:estado.newPersonName,age:estado.newPersonAge,email:estado.newPersonEmail})
        this.setState({personas:x});
        this.props.esto.setState({personas:x});

    }
    agregarMasPersonas(){
        return(<div>
            <li className="list-group-item"> 
            <div className="row mb-1">
            <input className="form-control col-11 mr-1" onChange={this.onChange} name="newPersonName" placeholder={Lang.FULL_NAME[this.props.user.lang]}></input>
            </div>
                <div className="row">
                <input className="form-control col-6 mr-1" type="email" onChange={this.onChange} name="newPersonEmail" placeholder={Lang.EMAIL[this.props.user.lang]}></input>
                    <input type="number" placeholder={Lang.AGE[this.props.user.lang]} onChange={this.onChange} name="newPersonAge" className="form-control col-2 mr-1"></input>
                    <button onClick={this.agregarPersona} className="btn btn-primary">{Lang.TOUR_ADD_PPL_BTN[this.props.user.lang]}</button>
                </div>
                
            </li>
        </div>)
    }

    eliminar(e){

        var tt = [...this.state.personas]
        tt.splice(e.target.name,1);
        this.setState({personas:tt});
        this.props.esto.setState({personas:tt});
    }
    renderPersonas(){  return( this.state.personas.map((reptile,index,array) => 
                    
                    <li className="list-group-item" key={index}>
                
                    <span className="col-5"> <i className="far fa-smile"></i> {reptile.name}</span>
                    <span className="col-2"> {reptile.age}</span>
                    <span className="col-5"> {reptile.email}</span>
                    <button className="float-right btn btn-light" name={index} onClick={this.eliminar}><i className="fas fa-times-circle"></i></button>
                    </li>)
            )

        

       
    }

    render(){
        return(<div>
            {
                this.state.personas.length == 1 &&
                <li className="list-group-item" style={{background:"#f3f0d1"}}><h5>{Lang.TOUR_PLS_ADD_MORE_MESSAGE[this.props.user.lang]}</h5></li>
            }
            <ul className="list-group">
            {this.renderPersonas()}  
            {this.agregarMasPersonas()}
            </ul>

          
        </div>)
    }
}

const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser    
    }
}



export default connect(mapStateToProps)(Tour);