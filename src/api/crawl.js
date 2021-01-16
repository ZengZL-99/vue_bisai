import { devService } from '@/utils/request'

export function get_categories(token) {
  return devService({
    url: '/categories_data',
    method: 'get',
    params: { token }
  })
}
