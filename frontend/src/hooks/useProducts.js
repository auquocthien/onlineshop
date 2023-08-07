import { useQuery } from 'react-query';
import Api from 'services/Api';

export function useProducts() {
  return useQuery('products', () =>
    Api()
      .get('/products/')
      .then((res) => res.data)
      .catch((err) => err.res)
  );
}

export function useProduct(slug) {
  return useQuery(`${slug}`, () =>
    Api()
      .get(`/products/${slug}/`)
      .then((res) => res.data)
      .catch((err) => err.res)
  );
}
export function useProductPaging(page) {
  return useQuery(`product-page=${page}`, () =>
    Api()
      .get(`/products/?page=${page}`)
      .then((res) => res.data)
      .catch((err) => err.res))
}

export function useRate(id) {
  return useQuery(`rate-${id}`, () =>
    Api()
      .get(`/rate/${id}`)
      .then((res) => res.data)
      .catch((err) => err.data))
}