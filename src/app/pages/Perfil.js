import React,{Component} from 'react'
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/currentUserActions'
import {Redirect} from 'react-router-dom'

class Perfil extends Component{
    componentDidMount(){
        console.log("xd")
        console.log(this.props);
    }
    render(){
    
        return(    <div className="container">
            <div className="card">
                <div className="card-body">
                    <h3>Perfil</h3>
                    </div>
                
            </div></div>
        )
        
    }
}


const mapStateToProps = state =>{
    return {
        currentUser:state.currentUser    
    }
}


const mapDispatchToProps ={
    findCurrentUser:userActions.findCurrentUser
}


export default connect(mapStateToProps,mapDispatchToProps)(Perfil);