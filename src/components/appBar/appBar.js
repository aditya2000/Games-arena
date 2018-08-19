import React, {Component} from 'react';
import './appBar.css';

class AppBar extends Component {
    render() {
        return(
            <div className="appBar">
                <h1 className="appBar-text"><i className="fas fa-gamepad"></i> Games Arena</h1>
            </div>
        );
    }
}

export default AppBar;