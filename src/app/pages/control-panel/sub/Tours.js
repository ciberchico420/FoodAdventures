import React,{Component} from 'react';
import axios from 'axios';

class Tours extends Component{

    constructor(a){
        super(a);
        this.state= {tours:[]}
        this.buscarTours = this.buscarTours.bind(this);
        this.deleteTour = this.deleteTour.bind(this);
            this.buscarTours();
        
         
    }
    componentDidMount(){
       
    }
     buscarTours(){
        var t = [];
        var esto = this;


        axios.get("/api/tours").then(res=>{
            var aa= 0;
            if(!esto.state.toursLoaded){
                res.data.forEach(element => {
        
                    t.push(<TourCard  title={element.title} listIndex={aa} funDelete={this.deleteTour} tourId={element._id} description={element.description}> </TourCard>) 
                    aa++;
                });
                var newT = []
                
                esto.setState({tours:t});
            }
       
        })
       
      
    }
    deleteTour(index){
       this.buscarTours();
      
    }


    render(){
        return (<div>
           {this.state.tours}
        </div>)

    }
}

class TourCard extends Component{

    constructor(a){
        super(a);
        this.state= {readOnly:true,
            tourId:this.props.tourId,
            title:this.props.title,
            description:this.props.description,
            toursArray:this.props.toursArray,
            estado:this.props.estado}
        this.editar = this.editar.bind(this);
        this.onChange = this.onChange.bind(this);
        this.editButton = this.editButton.bind(this);
        this.deleteTour = this.deleteTour.bind(this);
    }

    onChange(e){

        this.setState({[e.target.name]:e.target.value});

    }

    editar(e){
        const esto =this;
        if(this.state.readOnly){
            this.setState({readOnly:false});
        }else{
            //Termino de editar
            axios.post("/api/editTour",null,{params:{tourId:this.state.tourId,title:this.state.title,description:this.state.description}}).then(doc=>{
                esto.setState({info:doc.data.info})
                
            })
            this.setState({readOnly:true});
        }
      
    }
    editButton(){
        if(this.state.readOnly){
            return  <button className="btn btn-warning" onClick={this.editar}><i className="fas fa-edit"></i></button>;
        }else{
            return  <button className="btn btn-success" onClick={this.editar}><i className="fas fa-check-square"></i></button>;
        }
    }
    deleteTour(e){
        const esto =this;
        axios.post("/api/deleteTour",null,{params:{tourId:this.state.tourId}}).then(doc=>{
            esto.props.funDelete(this.props.listIndex);
        })
    }

    render(){
        return( <div className="card" style={{margin:'1em'}}>
            <input className="card-head form-control" name="title" value={this.state.title} style={{border:"none"}} onChange={this.onChange} readOnly={this.state.readOnly}
             style={{padding:"3%",background:'#f0f0f0'}}>

             </input>
             <div className="card-text">
                <textarea name="description" style={{display:"inline",width:"100%",border:"none"}} onChange={this.onChange} readOnly={this.state.readOnly} value={this.state.description} className="card-body">
                
                </textarea>
            </div>
            <div className="card-bottom" >
                <div style={{padding:'1em',float:"right"}}>
                {this.editButton()}  <button className="btn btn-danger" onClick={this.deleteTour}><i className="fas fa-trash-alt"></i></button>
                </div>
               
               
            </div>
            </div>);
       
    }
}

export default Tours;