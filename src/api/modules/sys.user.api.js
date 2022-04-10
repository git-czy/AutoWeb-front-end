import {request} from '../service'

export default ({service, serviceForMock, requestForMock, mock, faker, tools}) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    // 模拟数据
    // mock
    //   .onAny('/login')
    //   .reply(config => {
    //     const user = find(users, tools.parse(config.data))
    //     return user
    //       ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
    //       : tools.responseError({}, '账号或密码不正确')
    //   })
    // // 接口请求
    // return requestForMock({
    //   url: '/login',
    //   method: 'post',
    //   data
    // })
    // return request({
    //   url: '/users/login',
    //   method: 'post',
    //   data
    // })
    return {
      
        "code": 200,
        "msg": "接口调用成功！",
        "data": {
          "user_id": "c8568a87-5344-11ec-8bce-c49ded9e058f",
          "is_admin": true,
          "menu_list": [],
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjODU2OGE4Ny01MzQ0LTExZWMtOGJjZS1jNDlkZWQ5ZTA1OGYiLCJleHAiOjE2Mzk0NjA1NTYuNTMyNTV9.eYppA70x0LzRSazQReaZ_WodC5HgMxOabMLdcsA5Rj8"
        }
      
    }
  }
})
