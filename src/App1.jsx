import React from 'react'
import { connect } from 'react-redux'

function App1(props) {
    return (
        <>
            <div>{props.msg}</div>
            <button onClick={props.changeMsg}>修改msg</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        msg: state.msg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMsg() {
            const action = {type: 'changeMsgFn', value: 'hello redux'}
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App1)