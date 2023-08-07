/* eslint-disable no-unused-vars */
import { useLocation, useParams } from 'react-router-dom';
import paging from '../../assets/css/paging.css'

import { useProductPaging, useProducts } from 'hooks/useProducts';

import Categories from 'components/Categories/Categories';
import ProductsContainer from 'components/Products';
import { ProductsSkeleton } from 'components/Skelton';
import { useState } from 'react';
import { BurgerMenuIcon } from 'icons';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { productPagging } from 'services/productService';
import ReactPaginate from 'react-paginate';

const AllProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { category } = useParams();
  const qs = require('querystring')
  const location = useLocation()
  const [pageNumber, setPageNumber] = useState(1)
  var maxPage = 1
  const { data: products_data, isLoading } = useProductPaging(pageNumber)
  const params = useParams()
  useEffect(() => {
    if (window.location.search) {
      setPageNumber(location.state.page)
      console.log(pageNumber)
    }
  }, [location, pageNumber])
  if (products_data) {
    maxPage = Math.floor(products_data.count / 8) + 1
  }

  if (isLoading) return <ProductsSkeleton />;

  const PaginatedItem = ({ itemsPerPage }) => {
    const [itemsOffset, setItemOffset] = useState(0);
    const endOffset = itemsOffset + itemsPerPage
    console.log(`from ${itemsOffset} to ${endOffset}`)
    if (params.category !== 'all') {
      var currentItems = products_data.filter(item => item.category.slug === params.category).slice(itemsOffset, endOffset)
      console.log(currentItems.length)
      var pageCount = Math.ceil(currentItems.length / itemsPerPage)

    }
    else {
      currentItems = products_data.slice(itemsOffset, endOffset)
      pageCount = Math.ceil(products_data.length / itemsPerPage)
      console.log(pageCount)
    }


    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % products_data.length
      setItemOffset(newOffset)
    }
    return (
      <div className='lg:w-3/4'>
        <ProductsContainer products_data={currentItems} limit={8} filter={category} />
        <div className='lg:w-1/4 p-1  rounded mt-5 ml-5 '>
          <ReactPaginate
            breakLabel='...'
            nextLabel='>'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='<'
            renderOnZeroPageCount={null}
            className='flex justify-between font-medium'
          />
        </div>

      </div>
    )
  }
  return (
    <div className=''>
      <div className='md:hidden flex items-center justify-center pb-2'>
        <BurgerMenuIcon
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer shadow-lg text-center'
        />
      </div>
      <div className='flex justify-center'>
        <div
          className={`${isOpen ? 'block' : 'hidden'
            } mx-auto text-center md:block w-1/4 ml-4`}
        >
          <Categories />
        </div>
        <PaginatedItem itemsPerPage={8} />
      </div>
      <div className='flex mt-3'>
        <div className='w-1/4 ml-4'></div>
        {/* <Paging filter={category} page={pageNumber} maxPage={maxPage} /> */}
      </div>
    </div>
  );
};

export default AllProducts;
