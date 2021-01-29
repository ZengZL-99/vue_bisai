import { devService } from '@/utils/request'

export function get_categories(token) {
  return devService({
    url: '/api/categories_data',
    method: 'get',
    params: { token }
  })
}
