import React from 'react';
import {SPIN_LIST} from '../../Common/Constants';
import history from '../../history';

export default class EditSpin extends React.Component{

    state = {list : [], spinValue: '',errorMessage: ''};

    componentDidMount(){       
        var items = JSON.parse(localStorage.getItem(SPIN_LIST));

        if(items != null && items.length > 0 ){
            this.setState({list : items, spinValue: this.props.match.params.value});
        }
    }

    onSubmit = (event) => {
        event.preventDefault();        
        let tempList = this.state.list;
        let value = event.target[0].value;
        let oldValue = this.state.spinValue;
        
        if(value){
            if(tempList != null && tempList.length > 0){
                if(this.validate(tempList, value)){
                    localStorage.removeItem(SPIN_LIST);

                    var filtered = tempList.filter(function(fValue, index, arr){
                        return fValue !== oldValue;                    
                    });

                    filtered.push(value);
                    localStorage.setItem(SPIN_LIST, JSON.stringify(filtered));
                    history.push('/spins');
                }
                else{
                    this.setState({errorMessage: 'Spin Value is existed'});
                }
            }
            else{
                tempList = [value];
                localStorage.setItem(SPIN_LIST, JSON.stringify(tempList));
            }
        }
        else{
            this.setState({errorMessage: 'Spin Value is required'});
        }        
    } 

    validate(tempList, value){
        return !(tempList.indexOf(value) > 0);
    }

    renderValidate(){
        if(this.state.errorMessage){
            return(
                <div className="ui error message">
                    <div className="header">Spin Value is unvalid</div>
                    <p>{this.state.errorMessage}</p>
                </div>       
            );
        }

        return null;
    }

    renderForm(){
       
        return(
            <form className="ui form error" onSubmit={(e) => this.onSubmit(e)}>
                <div className="field">
                    <label>Spin Value</label>
                    <input type="text" name="spinValue" placeholder="Spin Value" defaultValue={this.state.spinValue}/>
                </div>  
                {this.renderValidate()}         
                <button className="ui primary button" type="submit">Submit</button>
            </form>
        );
    }

    render(){
        return(
            <div className="ui container">
                <h3>Edit Spin</h3>
                {this.renderForm()}
            </div>
        );
    }
}