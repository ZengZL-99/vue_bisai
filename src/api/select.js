import { devService} from '@/utils/request'


export function get_mt_info(token) {
  return devService({
    url: '/crawl_meituan',
    method: 'get',
    params: { token }
  })
}