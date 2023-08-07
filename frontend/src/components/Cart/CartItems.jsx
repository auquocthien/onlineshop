/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import useCart from 'hooks/useCart';
import { LeftArrowIcon, RightArrowIcon } from 'icons';
import { memo, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { displayMoney } from 'utils/textDisplay';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/selector/authSelector';
import { cuponDiscount } from 'services/couponService'
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'


const CartItems = ({ cartItems, totalPrice }) => {
  const { incQty, decQty, removeItemFromCart } = useCart(true);
  const [cart, setCart] = useState([..._.cloneDeep(cartItems)])
  const [price, setPrice] = useState(totalPrice)
  localStorage.setItem('cart', JSON.stringify(cart))

  useEffect(() => {

    cart.map((item, index) => {
      cartItems.map((cartItem, idx) => {
        if (item.id === cartItem.id) {
          item.quantity = cartItem.quantity
        }
      })
    })

    if (cart.length < cartItems.length) {

      const newPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0)
      console.log(newPrice)
      setPrice(newPrice)
    }
    else {
      setPrice(totalPrice)
    }

  }, [totalPrice, cart, cartItems])

  const selectItem = async (item, index) => {
    const el = [...document.getElementsByTagName('input')].slice(1, -1)
    if (el[index].checked !== true) {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
      setCart(newCart)
    }
    else {
      cart.push(item)
    }
    await localStorage.setItem('cart', JSON.stringify(cart))
    calculator()
  }

  const calculator = async () => {
    const newCart = await JSON.parse(localStorage.getItem('cart'))
    const newPrice = await newCart.reduce((cost, cartItem) => cost + cartItem.quantity * cartItem.price, 0)
    localStorage.setItem('totalPrice', newPrice)
    setPrice(newPrice)
  }
  // order detaile
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const [couponField, setCouponField] = useState("")
  const [discountField, setDiscountField] = useState("")
  const [couponPk, setCouponPk] = useState("")
  const handleChange = (e) => {
    setCouponField(e.target.value)
    console.log(couponField)
  }
  const discount = async (code, token) => {
    const data = await cuponDiscount(code, token)
    const discountPercent = data.discount === undefined ? 0 : data.discount
    setDiscountField(discountPercent)
    setCouponPk(data.id)
    console.log(discountField)
    return data
  }

  const totalPriceAfter = price - (price * (discountField / 100))
  const el = document.getElementById('discount')
  if (el && el.value.length >= 8) {
    el.addEventListener('blur',
      discount(couponField, currentUser.token)
    )
  }

  const onClickLink = (e) => {
    if (cart.length === 0) {
      toast('Please choose at least one product')
      e.preventDefault()
    }
  }

  return (
    <div>
      {/* <ToastContainer /> */}
      <table className='w-full text-sm lg:text-base' cellSpacing='0'>
        <thead>
          <tr className='h-12 uppercase'>
            <th className='hidden md:table-cell'></th>
            <th className='text-center'>Product</th>
            <th className='text-center'>quantity</th>
            <th className='text-center'>Unit price</th>
            <th className='text-center'>Select</th>
            <th className='text-center'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td className='hidden pb-4 md:table-cell'>
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    className='w-20 rounded'
                    alt='Thumbnail'
                  />
                </Link>
              </td>
              <td className='text-center'>
                <p className='mb-1 md:ml-4 select-none'>{item.name.substring(0, 15)} {item.name.length > 15 && '...'}</p>
              </td>
              <td className='text-center justify-center mt-6 '>
                <div className='flex items-center justify-center space-x-4'>
                  <LeftArrowIcon
                    onClick={() => {
                      const el = [...document.getElementsByTagName('input')].slice(1, -1)
                      el[index].checked
                        ? decQty(item)
                        : toast('please select the product before changing the quantity')
                    }}
                    className='hover:text-gray-500 cursor-pointer'
                  />
                  <span className='select-none overflow-hidden'>{item.quantity}</span>
                  <RightArrowIcon
                    onClick={() => {
                      const el = [...document.getElementsByTagName('input')].slice(1, -1)
                      el[index].checked
                        ? incQty(item)
                        : toast('please select the product before changing the quantity')
                      if (item.qty === item.quantity) {
                        toast("product quantity limit reached")
                      }
                    }}
                    className='hover:text-gray-500 cursor-pointer'
                  />
                </div>
              </td>
              <td className='text-center'>
                <span className='text-sm lg:text-base font-medium select-none'>
                  {displayMoney(item.price)}
                </span>
              </td>
              <td className='text-center'>
                <input key={item.id} defaultChecked type="checkbox" onChange={async () => selectItem(item, index)} />
              </td>
              <td className='text-center'>
                <button
                  onClick={() => {
                    removeItemFromCart(item)
                    toast(`${item.name} has been remove from cart`)
                  }}
                  className='justify-center  px-5 py-1 text-white uppercase bg-red-500 rounded shadow item-center  hover:bg-red-900 focus:shadow-outline focus:outline-none'
                >
                  Remove item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pb-6 mt-6 border-t'>
        <div className='my-4 mt-6 -mx-2 flex items-center justify-center'>
          <div className='lg:px-2 lg:w-1/2'>
            <div className='py-2 bg-gray-300 rounded'>
              <h1 className='ml-2 font-bold uppercase text-center'>Order Details</h1>
            </div>
            <div className=''>
              <div className='flex justify-between border-b'>
                <div className='lg:px-4 m-2 text-sm lg:text-xl font-bold text-center text-gray-800'>
                  Subtotal
                </div>
                <div className='lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900'>
                  {displayMoney(price)}
                </div>
              </div>
              <div className='flex justify-between border-b'>
                <div className='lg:px-4 m-2 text-sm lg:text-xl font-bold text-gray-800'>
                  <form>
                    <input
                      className='border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                      id="discount"
                      type='discount'
                      name='discount'
                      placeholder='Discount code'
                      onChange={handleChange}
                    />
                  </form>
                </div>
                <div className='lg:px-4 lg:py-2 m-2 lg:text-sm font-bold text-center text-gray-900'>
                  {displayMoney(price * (discountField / 100))}
                </div>
              </div>
              <div className='flex justify-between border-b'>
                <div className='lg:px-4 m-2 text-sm lg:text-xl font-bold text-center text-gray-800'>
                  Total
                </div>
                <div className='lg:px-4 m-2  lg:py-2 lg:text-sm font-bold text-center text-gray-900'>
                  {displayMoney(totalPriceAfter)}
                </div>
              </div>
              <Link onClick={onClickLink} to={currentUser ? '/order' : '/signin'} state={{ code: couponField, id: couponPk, totalPrice: totalPriceAfter, discount: discountField }} >
                <button className='flex justify-center w-full px-10 py-2 mt-6 font-medium text-white uppercase bg-indigo-500 rounded shadow item-center  hover:bg-indigo-600 focus:shadow-outline focus:outline-none'>
                  {currentUser && (
                    <svg
                      aria-hidden='true'
                      data-prefix='far'
                      data-icon='credit-card'
                      className='w-8'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 576 512'
                    >
                      <path
                        fill='currentColor'
                        d='M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z'
                      />
                    </svg>
                  )}
                  <span className='ml-2 mt-5px'>
                    {currentUser
                      ? 'Procceed to checkout'
                      : 'Please Login to checkout'}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default memo(CartItems);
