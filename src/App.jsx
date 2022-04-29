/* import React from 'react'

function App () {
    return <h2>App</h2>
}

export default App */

import React, { Component, Fragment } from 'react'

export default class App extends Component {
    state = {
        num: 1
    }

    addNum(){
        this.setState(
            {num: this.state.num+1},
            () => {
                console.log(this.state.num);
            })
    }

    render() {
        return (
            <Fragment>
                <h2>数字为：{this.state.num}</h2>
                <button onClick={this.addNum.bind(this)}>累加</button>
            </Fragment>
        )
    }
}
