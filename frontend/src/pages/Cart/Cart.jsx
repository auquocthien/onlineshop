import { CartItems } from 'components/Cart';
import { EmptyCartIcon } from 'icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from 'store/selector/cartSelector';
import { productQuantity } from 'services/productService';
import { useState } from 'react';
import useCart from 'hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const Cart = () => {
  const cartItems = useSelector((state) => selectCartItems(state));
  const totalPrice = useSelector((state) => selectCartTotal(state));
  const [count, setCount] = useState(0)
  const { removeItemFromCart } = useCart(true)
  cartItems.map(async (item) => {
    const res = await productQuantity(item.id)
    if (res.quantity === 0) {
      removeItemFromCart(item)
      const temp = 0
      setCount(temp + 1)
    }
  })

  const notify = () => {
    if (count > 0) {
      toast(`${count} has been remove by out of stock`)
    }
  }
  useEffect(() => {
    notify()
  })
  return (
    <div className='flex justify-center my-6'>
      <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
        <div className='flex-1'>
          {cartItems.length > 0 ? (
            <>
              <CartItems cartItems={cartItems} totalPrice={totalPrice} />
            </>
          ) : (
            <div className='flex-col justify-center items-center'>
              <h1 className='text-center font-bold text-2xl'>
                You have no items in your cart
              </h1>
              <EmptyCartIcon className='h-screen/5 my-6' />
              <p className='text-center font-semibold mb-4'>
                Hurry! Add your first item
              </p>
              <div className='font-bold text-center'>
                <Link to='/shop/all' className='text-sm  text-indigo-500'>
                  GO TO SHOP
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default Cart;
