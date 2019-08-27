import React from 'react';
import {Link} from 'react-router-dom';
import {SPIN_LIST} from '../../Common/Constants';

export default class ListSpin extends React.Component{

    state = {list : []};

    componentDidMount(){
        const items = JSON.parse(localStorage.getItem(SPIN_LIST));        
        if(items != null && items.length > 0){
            this.setState({list:items});
        }
    } 

    renderList(){  

        return this.state.list.map(item => {            
            return(                
                <div className="item">
                    <div className="right floated content ui small basic icon buttons">
                        <Link to={`/spins/edit/${item}`} className="ui button"><i className="edit icon"></i></Link>
                        <Link to={`/spins/delete/${item}`} className="ui button"><i className="close icon"></i></Link>
                    </div>
                    <i className="large middle aligned icon sticky note"/>
                    <div className="content">
                        <Link to={`/spins/${item}`} className="Header">
                            {item}
                        </Link>                        
                    </div>                    
                </div>
            );
        });
    }   

    render(){
        return(
            <div className="ui container">
                <h2>Spins</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                <div style={{textAlign:"right"}}>
                <Link to="/spins/new" className="ui button primary">
                    Create Spin
                </Link>
            </div>
            </div>
        );
    }
}