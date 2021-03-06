import React from 'react';
import ReactDOM from 'react-dom';

export class MyComponent extends React.Component {

    state = {
        clicks: 0,
    };

    handleClick = (e) => {
        e.preventDefault();
        this.setState({clicks:this.state.clicks+1});
    };

    render() {
        return (
            <div className="react-example">
                <a href="http://google.com" onClick={this.handleClick}>click</a> {this.state.clicks}
            </div>
        );
    }
}

export function render(element) {
    ReactDOM.render(
        <div>
            <MyComponent />
            <MyComponent />
            <MyComponent />
        </div>,
        element
    );
}
