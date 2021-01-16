import { devService } from '@/utils/request'

export function getMtInfo(token) {
  return devService({
    url: '/area_data',
    method: 'get',
    params: { token }
  })
}
