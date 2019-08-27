import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {SPIN_LIST} from '../../Common/Constants';

export default class DeleteSpin extends React.Component{

    state = {list : [], spinValue: '',errorMessage: ''};

    componentDidMount(){
        var items = JSON.parse(localStorage.getItem(SPIN_LIST));

        if(items != null && items.length > 0 ){
            this.setState({list : items, spinValue: this.props.match.params.value});
        }
    }

    deleteSpin(){
        const value = this.state.spinValue;
        let tempList = this.state.list;

        if(tempList != null && tempList.length > 0){
            localStorage.removeItem(SPIN_LIST);

            var filtered = tempList.filter(function(fValue, index, arr){
                return fValue !== value;                    
            });

            localStorage.setItem(SPIN_LIST, JSON.stringify(filtered));

            history.push('/spins');
        }
    }


    renderActions(){
        return(
            <React.Fragment>
                <button className="ui negative button" onClick={() => this.deleteSpin()}>Delete</button>
                <button className="ui button" onClick={() => history.push('/spins')}>Cancel</button>
            </React.Fragment>
        );
    }

    renderContent(){
        const value = this.state.spinValue;

        if(!value){
            return 'Are you want to delete this spin ?';
        }

        return `Are you want to delete this spin : ${value} ?`;
    }

    render(){
        return(
            <Modal 
                title='Delete Spin'
                content ={this.renderContent()}
                actions ={this.renderActions()}
                onDismiss={() => history.push('/spins')}
            />
        );
    }
}