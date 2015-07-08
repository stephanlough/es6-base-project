import React from 'react';

export class MyComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            clicks: 0,
        };
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({clicks:this.state.clicks+1});
    }

    render() {
        return (
            <div className="react-example">
                <a href="http://google.com" onClick={(e) => this.handleClick(e)}>click</a> {this.state.clicks}
            </div>
        );
    }
}

export function render(element) {
    React.render(
        <div>
            <MyComponent />
            <MyComponent />
            <MyComponent />
        </div>,
        element
    );
}
