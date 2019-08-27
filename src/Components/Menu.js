import React from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends React.Component{
    state = { activeItem: 'home' }

    handleOnClick(e){

        this.setState({activeItem : e.target.name});

        return true;
    }

    renderLink(){
        const menuItems = [
            {name: 'home', title: 'Home', link: '/'},
            {name: 'list', title: 'List Content', link:'/spins'}
        ];

        return menuItems.map((item) => {
            return(
                <Link className={`${this.state.activeItem === item.name ? "active" : ""} item`}
                      onClick={(e) => this.handleOnClick(e)}
                      name={item.name}
                      to={item.link}>
                    {item.title}
                </Link>
            );
        });
    }

    render(){
        return(
            <div className="ui secondary pointing menu">
                {this.renderLink()}              
                <div className="right menu">
                    <div className="item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search..." />
                        <i className="search link icon"></i>
                    </div>
                </div>
                <a href="/" className="ui item">
                Logout
                </a>
            </div>
            </div>
        );
    }
}