import React,{Component} from 'react';
import axios from 'axios';
import {closeCurrentUser} from '../../redux/actions/currentUserActions';
import {connect} from 'react-redux';

class Logout extends Component{

    componentDidMount(){
        axios.get("/outh/logout")
        this.props.closeCurrentUser();
    }
    render(){

        return(<h1>Sesión cerrada</h1>)
    }
}



const mapDispatchToProps ={
    closeCurrentUser
}


export default connect(null,mapDispatchToProps)(Logout);