import { devService } from '@/utils/request'

export function singleQuery(params) {
  return devService({
    url: '/cont/single_contr',
    method: 'get',
    params
  })
}

export function testContrast(data) {
  return devService({
    url: '/cont/upload',
    method: 'post',
    data
  })
}
