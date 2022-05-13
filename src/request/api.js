import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)

// 登录
export const LoginApi = (params) => request.post('/login', params)

// 获取文章列表
export const ArticleListApi = (params) => request.get('/article', {params})

// 添加文章
export const ArticleAddApi = (params) => request.post('/article/add', params)

// 查看文章
export const ArticleSearchApi = (params) => request.get(`/article/${params.id}`)

// 重新编辑文章
export const ArticleUpdateApi = (params) => request.put('/article/update', params)


// axios
/* axios.get({
    params: {
        num: 1
    }
})

axios.post({
    num: 1
}) */