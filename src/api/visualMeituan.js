import { devService } from '@/utils/request'

export function getinfo(token) {
  return devService({
    url: '/get_lat_lng',
    method: 'get',
    params: { token }
  })
}
