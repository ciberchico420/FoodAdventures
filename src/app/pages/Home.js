import React,{Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
const Lang = require('../../Traductor')

class Home extends Component{

    constructor(a){
        super(a);
        this.state={tours:[]}
        this.findTours = this.findTours.bind(this);
    }
    componentDidMount(){
        this.findTours()
       console.log(this.props)
    }

    findTours(){
        const esto = this;
        Axios.get("/api/tours").then(res=>{
            const too = []
            res.data.forEach(element => {
                console.log(element)
                too.push(<TourCard currentUser={this.props.currentUser} key={element._id} isLogged={this.props.currentUser.logged} info={element}></TourCard>);
            });
            esto.setState({tours:too});
        })

     
    }

    render(){
        return(<div className="container">
            <br></br>
            
            <div className="row">   
            {this.state.tours}     
            </div>
        </div>)
    }
}

class TourCard extends Component{

    componentDidMount(){
        
    }
    render(){
        console.log(this.props)
        return(
            
            <div id={this.props.info._id} className="card col-md-3 m-1" style={{padding:0,maxHeight:"30em",minHeight:"30em",overflow:"hidden"}}>
            <img className="card-image-top img-fluid" src="/img/0.png"></img>
             
                <div className="card-body">
                <h3 className="card-title" style={{height:"2.5em",overflow:"hidden"}}>{this.props.info.title}</h3>
                    <div className="card-text" style={{overflow:"hidden",height:"7rem"}}>{this.props.info.description}</div>
                    <br></br>
                    <div className="card-bottom   float-righ"> 
                 
                    <a href="#" className="card-link col-6">{Lang.SEE_MORE[this.props.currentUser.lang]}</a> 
                    {this.props.isLogged &&
                         <a href={"/tour/"+this.props.info._id} className="card-link col-6 btn btn-primary">{Lang.SIGN_UP[this.props.currentUser.lang]}</a>
                    }  
                    </div>
                 

                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser    
    }
}
export default connect(mapStateToProps,null)(Home);