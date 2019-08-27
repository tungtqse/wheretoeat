import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Spin from './Spin';
import Menu from './Menu';
import history from '../history';
import CreateSpin from './spins/CreateSpin';
import EditSpin from './spins/EditSpin';
import DeleteSpin from './spins/DeleteSpin';
import ListSpin from './spins/ListSpin';

export default class App extends React.Component{
    render(){
        return(
            <div>
                <Router history={history}>
                    <Menu />                  

                    <Switch>
                        <Route path="/" exact component={Spin}/>
                        <Route path="/spins/new" exact component={CreateSpin}/>
                        <Route path="/spins/edit/:value" exact component={EditSpin}/>
                        <Route path="/spins/delete/:value" exact component={DeleteSpin}/>
                        <Route path="/spins/" exact component={ListSpin}/>
                    </Switch>  
                </Router>
                
                
            </div>
        );
    }
}