import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {

  const history = useNavigate();
  const onNavigate = useCallback(
    () => history(`/product/${product.slug}/`),
    [history, product.slug]
  );

  return (
    <div className='lg:w-1/4 md:w-1/3 p-4 w-full'>
      <div
        onClick={onNavigate}
        className='transform duration-500 hover:scale-105 shadow-md p-4'
      >
        <div className='block relative h-48 rounded overflow-hidden'>
          <img
            alt='ecommerce'
            className='object-cover object-center w-full h-full block'
            src={product.image}
          />
        </div>
        <div className='mt-4'>
          <span className='flex justify-between'>
            <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
              {product.category.name}
            </h3>

          </span>
          <span className='flex justify-between'>
            <h2 className='text-gray-900 title-font text-lg font-medium'>
              {product.name.substring(0, 15)} {product.name.length > 15 && '...'}
            </h2>
          </span>
          <div className='flex justify-between'>
            <div>
              <p className='mt-1 text-hot-pink'>${product.price}</p>
            </div>
            <div>
              <p className='text-gray-900 font-medium'>stock left: {product.quantity} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
