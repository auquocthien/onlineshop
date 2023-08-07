/* eslint-disable no-unused-vars */
import { memo, useEffect, useMemo, useState } from 'react';
import Product from './Product';
import ReactPaginate from 'react-paginate';
import { useLocation, useParams } from 'react-router-dom';
import useCategory from 'hooks/useCategory';

const ProductsContainer = ({
  products_data,
  limit = 10,
  filter = 'all',
  name = null,
}) => {

  const qs = require('querystring')
  const products = products_data.results === undefined ? products_data : products_data.results
  const filteredProducts = useMemo(() => {
    if (filter) {
      if (filter === 'all') {
        return products;
      } else {
        return products.filter((prod) => {
          let items = [];
          if (!name) {
            items = prod.category.slug === filter;
          } else {
            items = prod.category.slug === filter && prod.slug !== name;
          }
          return items;
        });
      }
    }
  }, [products, filter, name]);





  return (
    <section className={`text-gray-700 body-font block ${products.length === 1 ? 'w-3/4' : ""}`}>
      <div className='container px-5 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          {filteredProducts &&
            filteredProducts
              .slice(0, limit ?? products.length)
              .map((product) => (
                <Product key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  )
};

export default memo(ProductsContainer);
