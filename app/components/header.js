import React from 'react';
import './header.less'

import ReactDOM from 'react-dom'
import { Router, HashRouter, BrowserRouter, IndexRoute, Link, Route, hashHistory } from 'react-router-dom'


class Header extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    componentWillUnmount(){}

    render(){
        return (
            <div className="components-header row">
                <BrowserRouter>
                    <Link to='/list'>
                        <img src="/static/images/logo.png" width="40" className="-col-auto" />
                    </Link>
                </BrowserRouter>
                <h1 className="caption">Music Player</h1>
            </div>
        );
    }
}

export default Header;