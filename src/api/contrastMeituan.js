import { devService } from '@/utils/request'

export function singleQuery(params) {
  return devService({
    url: '/cont/single_contr',
    method: 'get',
    params
  })
}
