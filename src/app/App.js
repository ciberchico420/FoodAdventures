import React,{Component} from 'react';
import Header from './components/Header'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Tour from './pages/Tour';
import Logout from './pages/Logout';
import Perfil from './pages/Perfil';
import {ProtectedRoute} from './components/ProtectedRoute';
import Registro from './pages/Registro';

import {connect} from 'react-redux';
import * as userActions from '../redux/actions/currentUserActions';
import Rules from '../Rules';
import ControlPanel from './pages/control-panel/control-panel';
import Cargando from './components/Cargando';


const passport = require('passport');

class App extends Component{

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

      constructor(e){
          super(e);
          this.props.findCurrentUser();
      }

    render(){
        
        if(this.props.currentUser.loaded){
            return(
            
                <div id="AppContainer"> 
                        <BrowserRouter>
                        <Header ></Header>
                        <div id="AppBody">

                        
                            
                             <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/login" component={LogIn} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/register" component={Registro} />
                            <Route exact path="/Tour" component={Tour} />
                            <Route path="/Tour/:id" component={Tour} />
                            <ProtectedRoute path="/profile" minRole={Rules.ENTER_PROFILE} user={this.props.currentUser}  component={Perfil} />
                            <ProtectedRoute exact path="/control" minRole={Rules.ENTER_CONTROL} user={this.props.currentUser}  component={ControlPanel} />
                            <ProtectedRoute path="/control/:sec" minRole={Rules.ENTER_CONTROL} user={this.props.currentUser}  component={ControlPanel} />
                            </Switch>
                        
                       </div>
                        </BrowserRouter>
                 
                </div>

               
            );
        }else{
            return <Cargando></Cargando>
        }
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


export default connect(mapStateToProps,mapDispatchToProps)(App);