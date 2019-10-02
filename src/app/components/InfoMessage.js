import React,{Component} from 'react';

class InfoMessage extends Component{
    render(){
        var alertType = "alert alert-";
        if(!this.props.infoMessage.status){
            alertType+="warning"
        }else{
            alertType+=this.props.infoMessage.status
        }
        if(this.props.infoMessage.info){
            return(<div className={alertType}><b> <i className="material-icons">info</i></b> {this.props.infoMessage.info}</div>);
        }else{
            return <div></div>
        }
            
    }
}

export default InfoMessage;