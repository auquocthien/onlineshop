/* eslint-disable no-unused-vars */
import Rating from '@mui/material/Rating'
import BaseButton from 'components/Shared/BaseButton';
import Comment from 'components/Comment';
import useCart from 'hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { displayMoney } from 'utils/textDisplay';
import { productRate, productRateAvg } from 'services/productService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/selector/authSelector';
import { useRate } from 'hooks/useProducts';
import { useState } from 'react';
import { useEffect } from 'react';
const ProductDetails = ({ product }) => {
  const [rate, setRate] = useState()
  useEffect(() => {
    const getRate = async (id) => {
      try {
        const data = await productRateAvg(id)
        console.log(data)
        if (data.data[0].avg_rate) {
          setRate(data.data[0].avg_rate)
          console.log(rate)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    getRate(product[0].id)
  })
  console.log(rate)
  const { incQty } = useCart();
  const currentuser = useSelector((state) => selectCurrentUser(state))
  const notify = () => {
    if (product[0].quantity > 0) {
      incQty(productItem)
      toast('Product has been add to cart')
    } else {
      toast('Product out of stock')
    }
  }

  const ratingChange = async (newRate) => {
    if (currentuser) {
      const payload = {
        "product": product[0].id,
        "avg_rate": parseFloat(newRate.target.value),
        "count": 1
      }
      try {
        const data = await productRate(payload)
        if (data) {
          setRate(newRate.target.value)
        }
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    else {
      toast('Login to rate')
    }
    console.log(newRate.target.value)
  }

  const productItem = {
    id: product[0].id,
    product: product[0].id,
    slug: product[0].slug,
    name: product[0].name,
    image: product[0].image,
    price: product[0].price,
    qty: product[0].quantity
  }
  return (
    <div className='lg:w-4/5 mx-auto flex flex-wrap'>
      <img
        alt='ecommerce'
        className='lg:w-1/2 w-full lg:h-auto h-64  object-center rounded'
        src={product[0].image}
      />
      <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
        <h2 className='text-sm title-font text-gray-500 tracking-widest'>
          {product[0].category.name}
        </h2>
        <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
          {product[0].name}
        </h1>
        <div className='flex mb-4'>
          <span className='flex items-center text-yellow'>
            <Rating name="half-rating" value={parseFloat(rate)} precision={1} onChange={ratingChange} />
            {/* <span className='text-gray-600 ml-3 font-medium '>
              {rate} Point
            </span> */}
          </span>
          <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
            <span className='text-gray-600 ml-3 font-medium '>
              {product[1].total_view} Reviews
            </span>
            {/* <div className='text-gray-500'>
              <svg
                fill='#3f91e8'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
              </svg>
            </div>
            <div className='ml-2 text-gray-500'>
              <svg
                fill='#3f91e8'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
              </svg>
            </div>
            <div className='ml-2 text-gray-500'>
              <svg
                fill='#3af030'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
              </svg>
            </div> */}
          </span>
        </div>
        <p className='leading-relaxed'>{product[0].desc}</p>
        <div className='flex justify-between mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
          <div className='flex'>
            <span className='mr-3 font-medium'>Sold: {product[1].total_sold}</span>
          </div>
          <div className='flex ml-6 items-center'>
            <div className='relative'>
              {product[0].quantity > 0 ? (
                <div className='flex space-x-1'>
                  <span className='mr-3 font-medium'>Stock Left: </span>
                  <span>{product[0].quantity}</span>
                </div>
              ) : (
                <span className='text-red-600'>Out of Stock</span>
              )}
            </div>
          </div>
        </div>
        <div className='flex'>
          <span className='title-font font-medium text-2xl text-hot-pink'>
            {displayMoney(product[0].price)}
          </span>
          <BaseButton
            onClick={() => notify()}
            type='submit'
            margin='ml-auto'
            name='Add to Cart'
          />
          <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
            <svg
              fill='#f22933'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-5 h-5'
              viewBox='0 0 24 24'
            >
              <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='lg:w-full'>
        <h1 className='font-bold text-2xl mb-2 mt-5'>COMMENT</h1>
        < Comment product_id={product[0].id} />
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default ProductDetails;
