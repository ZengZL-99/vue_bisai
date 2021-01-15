// import request from '@/utils/request'
import { service , devService} from '@/utils/request'

export function login(data) {
  return devService({
    // url: '/vue-admin-template/user/login',
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return devService({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return service({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


// 测试自己的api

export function test(token) {
  return devService({
    url: '/login',
    method: 'post',
    params: { token }
  })
}