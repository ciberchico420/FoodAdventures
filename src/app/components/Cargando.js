import React,{Component} from 'react';

class Cargando extends Component{
    render(){
        return (<center><div className="container">
                <div class="spinner-border text-primary mx-auto" style={{height:"5rem",width:"5rem",marginTop:"6rem"}} role="status"></div>
                </div>
        </center>)
            
    }
}

export default Cargando;