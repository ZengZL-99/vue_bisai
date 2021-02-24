import { devService } from '@/utils/request'

export function singleQuery(params) {
  return devService({
    url: '/cont/single_contr',
    method: 'get',
    params
  })
}

export function upContrastBus(data) {
  return devService({
    url: '/cont/uploadBus',
    method: 'post',
    data
  })
}

export function upContrastCom(data) {
  return devService({
    url: '/cont/uploadCom',
    method: 'post',
    data
  })
}
