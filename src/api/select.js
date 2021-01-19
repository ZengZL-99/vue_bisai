import { devService } from '@/utils/request'

export function getMtInfo(params) {
  return devService({
    url: '/area_data',
    method: 'get',
    params
  })
}

export function getMtData(params) {
  return devService({
    url: '/handleSelect',
    method: 'get',
    params
  })
}
