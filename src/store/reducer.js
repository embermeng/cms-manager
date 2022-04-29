// 定义一个默认状态
const defaultState = {
    msg: "hello world!"
}

// 导出一个函数
export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'changeMsgFn':
            newState.msg = action.value
            break
        default:
            break
    }
    return newState
}