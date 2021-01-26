import { devService } from '@/utils/request'

export function getinfo(token) {
  return devService({
    url: '/get_lat_lng',
    method: 'get',
    params: { token }
  })
}

export function get_json(token) {
  return devService({
    url: '/result_json',
    method: 'get',
    params: { token }
  })
}
