import http from '../utils/request'
// import innerhttp from '../utils/inner_request'
// 请求首页数据,直接把这个对象导出
//export const getData = () => {
    // 返回一个promise
//    return innerhttp.get('/home/getData')
//}

// 下面四个:用户管理-后端-网络请求接口

export const registerByMail = (data) => {
    return http.post('/users/registerByMail', data)
}

export const loginByMail = (params) => {
    return http.get('/users/loginByMail', params)
}

export const updateUser = (data) => {
    return http.put('/users/updateUser', data)
}

export const getUserById = (params) => {
    return http.get('/users/getUserById', params)
}

export const getAuthList = (params) => {
    return http.get('/users/getAuthList', params)
}

/*
export const getProdList = (params) => {
    return http.get('/users/getProdList', params)
}

export const getProdSeat = (params) => {
    return http.get('/users/getProdSeat', params)
}
*/

export const getAdminProdSummary = (params) => {
    return http.get('/users/getAdminProdSummary', params)
}

export const getChildSummary = (params) => {
    return http.get('/users/getChildSummary', params)
}

export const removeProdSeat = (data) => {
    return http.delete('/users/removeProdSeat', data)
}

export const addProdSeat = (data) => {
    return http.post('/users/addProdSeat', data)
}

export const setValidateCode = (params) => {
    return http.get('/users/setValidateCode', params)
}

export const checkValidateCode = (params) => {
    return http.get('/users/checkValidateCode', params)
}

export const resetPassword = (data) => {
    return http.post('/users/resetPassword', data)
}