import { devService } from '@/utils/request'

export function getinfo(token) {
  return devService({
    url: '/api/get_lat_lng',
    method: 'get',
    params: { token }
  })
}

export function get_json(token) {
  return devService({
    url: '/api/result_json',
    method: 'get',
    params: { token }
  })
}

export function beijing(token) {
  return devService({
    url: '/api/beijing',
    method: 'get',
    params: { token }
  })
}

export function getinfo_v2(token) {
  return devService({
    url: '/api/get_lat_lng_v2',
    method: 'get',
    params: { token }
  })
}
