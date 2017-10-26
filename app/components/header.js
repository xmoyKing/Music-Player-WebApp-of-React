import React from 'react';
import './header.less'

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    componentWillUnmount(){}

    render(){
        return (
            <div className="components-header row">
                <img src="/static/images/logo.png" width="40" className="-col-auto" />
                <h1 className="caption">Music Player</h1>
            </div>
        );
    }
}

export default Header;