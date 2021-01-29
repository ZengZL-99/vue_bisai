import { devService } from '@/utils/request'

export function getMtInfo(params) {
  return devService({
    url: '/api/area_data',
    method: 'get',
    params
  })
}

export function getMtData(params) {
  return devService({
    url: '/api/handleSelect',
    method: 'get',
    params
  })
}
