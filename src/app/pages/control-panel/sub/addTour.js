import React,{Component} from 'react';
import axio from 'axios';
import Axios from 'axios';
const Lang = require('../../../../Traductor')
import SmallCal from 'react-calendar';
import TimeKeeper from 'react-timekeeper';

class AddTour extends Component{
   
    constructor(a){
        super(a);
        this.registrarInput = this.registrarInput.bind(this);
        this.enviarTour = this.enviarTour.bind(this);
        this.state = {info:undefined,title:'',description:'',price:0,submit_text:Lang.SUBMIT[this.props.currentUser.lang]}
    }

    enviarTour(e){
        const esto = this;
        console.log(esto.state);
        if(this.state.title === '' || this.state.description === '' ||  this.state.price == 0){
            this.setState({info:Lang.ALL_FIELDS_NEEDED[this.props.currentUser.lang]})
        }else{  
           
            this.setState({submit_text:Lang.LOADING[this.props.currentUser.lang]});
             Axios.post('/api/uploadImg/', {data:{
                img:esto.state.img
                }})
              .then(function (response) {
                console.log("----------------------------")
                  console.log(response)
                 

                  
                 
                  axio.post("/api/addTour",{data:{title:esto.state.title,description:esto.state.description,price:esto.state.price,schedule:esto.state.horarios,img:response.data}}).then(res=>{
                        esto.setState(res.data);
                     })
            
              })
              .catch(function (error) {
                console.log(error);
              })
              esto.setState({submit_text:Lang.DONE_MSG[this.props.currentUser.lang]});
           
        }
      
    }
    registrarInput({target}){
        this.setState({ [target.name]: target.value });
    }
    verErrores(state){
        if(state.info != undefined){
            const alerType = "alert alert-"+state.status;
            return(<div className={alerType}><b> <i className="material-icons">info</i></b> {state.info}</div>);
        }
        
    }

    render (){
        console.log(this.state)
        return(<div>
                <div className="card-title" style={{background:'#ededed',padding:'2em'}}><h3 className="card-text">{Lang.CREATE_NEW_TOUR[this.props.currentUser.lang]}</h3></div>
                <div  className="card-body"> 
                {this.verErrores(this.state)}
                    <input className="form-control form-control-lg" onChange={this.registrarInput} name="title" placeholder={Lang.TITLE[this.props.currentUser.lang]}></input><br/>
                    <textarea className="form-control form-control-lg" name="description" onChange={this.registrarInput} placeholder={Lang.DESCRIPTION[this.props.currentUser.lang]}></textarea>
                    <br/>
                    <AgregarImagen esto={this} currentUser={this.props.currentUser}></AgregarImagen><br></br>
                    <Horarios esto={this} currentUser={this.props.currentUser}></Horarios>
                        <br/>
                        <div className="input-group mb-2 col-12 col-lg-2">
                           
                            <input className="form-control" onChange={this.registrarInput} name="price" placeholder={Lang.PRICE[this.props.currentUser.lang]}/>
                            <div className="input-group-prepend">
                            <div className="input-group-text">MXN</div>
                            </div>
                        </div>
                        <div style={{float:"right",display:"inline"}}><button onClick={this.enviarTour} className="btn btn-success">{this.state.submit_text}
                        </button> <button className="btn btn-danger">{Lang.DELETE[this.props.currentUser.lang]}</button></div>
                        <br/>
               
                </div>
               
            </div>
            );
    }
}

class AgregarImagen extends Component{

    constructor(e){
        super(e);
        this.state={img:[]}
        this.readURL = this.readURL.bind(this);
        this.subirImagen = this.subirImagen.bind(this);
        this.quitarImg = this.quitarImg.bind(this);
    }
     
    
    readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            const esto = this;
        
            reader.onload = function (e) {

                    const list = esto.state.img.concat(e.target.result);
                   // console.log(e);
                    esto.setState({img:list})
                    esto.props.esto.setState({img:list})
               
            };
          
        }
    }
    subirImagen(e){
        this.readURL(e.target);
    }
    quitarImg(e){

        var tt = [...this.state.img]
        tt.splice(e.currentTarget.name,1);
        this.setState({img:tt});
        this.props.esto.setState({img:tt})
    }
    cargarImg(){
        var imagenes = [];
        var a=0;
        if(this.state.img.length>0){
              (this.state.img).forEach(element => {
            
            imagenes.push(<div key={a} style={{position:"relative",display:"inline-block",marginRight:'30px'}}>
                <button style={{position:"absolute",top:"-10px",right:"-10px",background:"white"}} name={a} onClick={this.quitarImg} className="img-thumbnail"><i className="fas fa-window-close fa-lg"></i></button>
                <img className="img-thumbnail" style={{maxWidth:"150px",minWidth:"150px",height:"100px"}} src={element}></img>
                </div>)
                a++;
            }); 
            return imagenes;
        }else{
            return(<span>{Lang.PLS_UPLOAD_IMG[this.props.currentUser.lang]}</span>)
        }
      
       
    }

    render(){
        return(
            <div style={{border:'1px solid #bababa',display:'inblock',position:"relative",padding:'3%',borderRadius:'4px'}}>

                <input type="file" style={{width: '0.1px',
                    height: "0.1px",
                    opacity: 0,
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: -1,
                   }} 
                        name="file" id="file" onChange={this.subirImagen} className="inputfile" />
                <label for="file" style={{ cursor:"cell",position:"absolute",bottom:0,right:0,margin:"1%"}}><div className="btn btn-warning">{Lang.ADD_FILE[this.props.currentUser.lang]}...</div></label>
               {this.cargarImg()}

            </div>
        );
    }
}

class Horarios extends Component{


    constructor(props){
        super(props);
        this.state = {
            agregados:[],
            tipos:{
                all0:{text:"Todos los domingos",cod:"all0",type:"success",display:"inline"},
                all1:{text:"Todos los lunes",cod:"all1",type:"success",display:"inline"},
                all2:{text:"Todos los martes",cod:"all2",type:"success",display:"inline"},
                all3:{text:"Todos los miercoles",cod:"all3",type:"success",display:"inline"},
                all4:{text:"Todos los jueves",cod:"all4",type:"success",display:"inline"},
                all5:{text:"Todos los viernes",cod:"all5",type:"success",display:"inline"},
                all6:{text:"Todos los sabados",cod:"all6",type:"success",display:"inline"},
                excDay:{text:"Excepto dia especifico",cod:"excDay",type:"warning",display:"inline",data:"0"},
                selHour:{text:"Seleccionar hora",cod:"selHour",type:"primary",display:"inline",data:"0"},  
            },
            showDayModal:false
        }
        this.renderExc = this.renderExc.bind(this);
        this.clickExc = this.clickExc.bind(this);
        this.abrirModalDay = this.abrirModalDay.bind(this);
        this.abrirModalHour = this.abrirModalHour.bind(this);
        this.addExcDay = this.addExcDay.bind(this);
        this.eliminarAgregado = this.eliminarAgregado.bind(this)
        this.cambiarHora = this.cambiarHora.bind(this);
    }

    addExcDay(e){
        const dia = {...this.state.tipos.excDay }
        dia.data = this.state.diaSeleccionado
        dia.text= "Excepto el "+dia.data.getDay()+"/"+dia.data.getMonth()+"/"+dia.data.getFullYear();
        const agregados = [... this.state.agregados,dia]

        this.setState({agregados})
        this.setState({diaSeleccionado:undefined})
        this.props.esto.setState({horarios:agregados})

    }

    abrirModalDay(){
        const esto = this;
        if(true){
            return (
                <div className="modal fade" id="dayModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Selecciona el dia que NO habra tour</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body container">
                      <SmallCal onClickDay={(day)=>{esto.setState({diaSeleccionado:day})}}></SmallCal>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button"  className="btn btn-primary" disabled={this.state.diaSeleccionado ? false:true} data-dismiss="modal" onClick={this.addExcDay}>Seleccionar dia</button>
                    </div>
                  </div>
                </div>
              </div>);
        }
    }
    cambiarHora(e){

        const dia = {...this.state.tipos.selHour }
        dia.data = this.state.selectedHour
        dia.text= this.state.selectedHour
        const agregados = [... this.state.agregados,dia]

        this.setState({agregados})
        this.props.esto.setState({horarios:agregados})
        this.setState({selectedHour:undefined})
        
    }
   
    abrirModalHour(){
        if(true){
            return (
                <div className="modal fade" id="hourModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Seleccionar hora</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <TimeKeeper onChange={(h)=>{this.setState({selectedHour:h.formatted24})}}></TimeKeeper>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.cambiarHora} disabled={this.state.selectedHour ? false:true}>Save changes</button>
                    </div>
                  </div>
                </div>
              </div>);
        }
    }

    clickExc(e){
        const name = e.currentTarget.name;
        const tipo = this.state.tipos[name];
        const agregados = [...this.state.agregados]
        if(e.currentTarget.name.includes("all")){
           agregados.push(tipo);
          const nuevo = {... tipo};
          nuevo.display = "none";
          this.setState({tipos:{...this.state.tipos ,[name]:nuevo}});
        
        }
        if(name === "excDay"){
            this.setState({showDayModal:true});
        }

        this.setState({agregados:agregados});
        this.props.esto.setState({horarios:agregados})

    }
    renderExc(){
        var tt = []; 
        Object.keys(this.state.tipos).forEach(element => {
            const tip = this.state.tipos[element];
            if(element === "excDay"){
                tt.push(<button onClick={this.clickExc} name={tip.cod} data-toggle="modal" data-target="#dayModal" className={"btn btn-sm btn-"+tip.type+" d-"+tip.display+" m-1"}><i className="fas fa-plus"></i> {tip.text}</button>)
            }
            else if(element === "selHour"){
                tt.push(<button onClick={this.clickExc} name={tip.cod} data-toggle="modal" data-target="#hourModal" className={"btn btn-sm btn-"+tip.type+" d-"+tip.display+" m-1"}><i className="fas fa-plus"></i> {tip.text}</button>)
            }else{
                
                tt.push(<button onClick={this.clickExc} name={tip.cod} className={"btn btn-sm btn-"+tip.type+" d-"+tip.display+" m-1"}><i className="fas fa-plus"></i> {tip.text}</button>)
            }
           
        });
        return tt;

    }
    eliminarAgregado(e){
        var tt = [...this.state.agregados]

        const elimnado =this.state.agregados[e.currentTarget.name];
        const obj = this.state.tipos[elimnado.cod];
       //
       const nuevo = {... obj};
       nuevo.display = "inline";
       this.setState({tipos:{...this.state.tipos ,[elimnado.cod]:nuevo}});
       //

        tt.splice(e.currentTarget.name,1);
        this.setState({agregados:tt});
        this.props.esto.setState({agregados:tt})
    }
    renderAgregados(){
        if(this.state.agregados.length == 0){
            return (<div>Selecciona una opcion para agregar al calendario.</div>)
        }
        var tt = [];
        var a = 0;
        Object.keys(this.state.agregados).forEach(element => {
            const tip = this.state.agregados[element];
            tt.push(<button name={a} onClick={this.eliminarAgregado} className={"btn btn-sm btn-"+tip.type+" m-1"}>{tip.text} <i className="fas fa-trash"></i></button>)
            a++;
        });
        

        return tt;
    }

    render(){
       
        return( 
            
            <div style={{border:'1px solid #bababa',display:'inblock',position:"relative",borderRadius:'4px'}}>
            {this.abrirModalDay()} {this.abrirModalHour()}
                <div style={{width:"100%",padding:"5%"}}>  {this.renderAgregados()}</div>
                <div style={{background:"#e5e5e5",width:"100%",padding:"10px"}}>
                    {this.renderExc()}
                </div>
            </div>
        )
    }
}

export default AddTour;