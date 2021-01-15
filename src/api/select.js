import { devService} from '@/utils/request'


export function get_mt_info(token) {
  return devService({
    url: '/query_mt',
    method: 'get',
    params: { token }
  })
}