import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from 'store/selector/authSelector';
import { displayMoney } from 'utils/textDisplay';
import { cuponDiscount } from 'services/couponService'

const OrderDetails = ({ totalPrice, cost }) => {
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

  const totalPriceAfter = totalPrice - (totalPrice * (discountField / 100))
  const el = document.getElementById('discount')
  if (el && el.value.length >= 8) {
    el.addEventListener('blur',
      discount(couponField, currentUser.token)
    )
  }

  return (
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
                {displayMoney(totalPrice)}
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
                {displayMoney(totalPrice * (discountField / 100))}
              </div>
            </div>
            <div className='flex justify-between border-b'>
              <div className='lg:px-4 m-2 text-sm lg:text-xl font-bold text-center text-gray-800'>
                Total {cost}
              </div>
              <div className='lg:px-4 m-2 lg:text-sm font-bold text-center text-gray-900'>
                {cost ? displayMoney(cost) : displayMoney(totalPriceAfter)}
              </div>
            </div>
            <Link to={currentUser ? '/order' : '/signin'} state={{ code: couponField, id: couponPk, totalPrice: totalPriceAfter, discount: discountField }} >
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
  );
};

export default OrderDetails;
