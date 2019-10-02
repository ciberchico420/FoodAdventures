import React,{Component} from 'react';
import axio from 'axios';
const Lang = require('../../../../Traductor')

class AddTour extends Component{
   
    constructor(a){
        super(a);
        this.registrarInput = this.registrarInput.bind(this);
        this.enviarTour = this.enviarTour.bind(this);
        this.state = {info:undefined,title:'',description:'',price:0}
    }

    enviarTour(e){
        const esto = this;
        console.log(esto.state);
        if(this.state.title === '' || this.state.description === '' ||  this.state.price == 0){
            this.setState({info:Lang.ALL_FIELDS_NEEDED[this.props.currentUser.lang]})
        }else{  
            axio.post("/api/addTour",null,{params:{title:this.state.title,description:this.state.description,price:this.state.price}}).then(res=>{
            esto.setState(res.data);
           
             })
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
        return(<div>
                <div className="card-title" style={{background:'#ededed',padding:'2em'}}><h3 className="card-text">{Lang.CREATE_NEW_TOUR[this.props.currentUser.lang]}</h3></div>
                <div  className="card-body"> 
                {this.verErrores(this.state)}
                    <input className="form-control form-control-lg" onChange={this.registrarInput} name="title" placeholder={Lang.TITLE[this.props.currentUser.lang]}></input><br/>
                    <textarea className="form-control form-control-lg" name="description" onChange={this.registrarInput} placeholder={Lang.DESCRIPTION[this.props.currentUser.lang]}></textarea>
                    <br/>
                    <AgregarImagen currentUser={this.props.currentUser}></AgregarImagen>
                        <br/>
                        <div className="input-group mb-2 col-2">
                           
                            <input className="form-control" onChange={this.registrarInput} name="price" placeholder={Lang.PRICE[this.props.currentUser.lang]}/>
                            <div className="input-group-prepend">
                            <div className="input-group-text">MXN</div>
                            </div>
                        </div>
                        <div style={{float:"right",display:"inline"}}><button onClick={this.enviarTour} className="btn btn-success">{Lang.SUBMIT[this.props.currentUser.lang]}
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
        this.state={img:["img/0.png"]}
        this.readURL = this.readURL.bind(this);
        this.subirImagen = this.subirImagen.bind(this);
    }
    
    readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            const esto = this;
            reader.onload = function (e) {

                    const list = esto.state.img.concat(e.target.result);
                    console.log(list);
                esto.setState({img:list})
                //esto.setState({src:e.target.result})
               
            };
          
        }
    }
    subirImagen(e){
        this.readURL(e.target);
    }
    quitarImg(e){

    }
    cargarImg(){
        var imagenes = [];
        var a=1;
        (this.state.img).forEach(element => {
            console.log(element)
            imagenes.push(<div style={{position:"relative",display:"inline-block",marginRight:'30px'}}>
                <div style={{position:"absolute",top:"-10px",right:"-10px",background:"white",cursor:"pointer"}} name={a} onClick={this.quitarImg} className="img-thumbnail"><i className="fas fa-window-close fa-lg"></i></div>
                <img className="img-thumbnail" style={{maxWidth:"150px",minWidth:"150px",height:"100px"}} src={element}></img>
                </div>)
                a++;
        });
        return imagenes;
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

export default AddTour;