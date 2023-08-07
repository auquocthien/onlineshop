/* eslint-disable no-unused-vars */
import { BurgerMenuIcon } from 'icons';
import BaseInput from 'components/Shared/BaseInput'
import { useState } from 'react';
import OrderItems from 'components/Order';
import { useSelector } from "react-redux"
import { selectCurrentUser, selectUserToken } from 'store/selector/authSelector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema } from 'utils/AuthValidation';
import { orderCreate } from 'services/orderService';
import { selectCartItems } from 'store/selector/cartSelector';
import { useLocation } from 'react-router-dom';
import OrderSuccess from 'components/Order/OrderSuccess';
import OrderCancel from 'components/Order/OrderCancel';
import { useNavigate } from "react-router-dom"
import useCart from 'hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

const Order = () => {

    const cartItem = JSON.parse(localStorage.getItem('cart'))
    const [isOpen, setIsOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState("")
    const currentToken = useSelector((state) => selectUserToken(state))
    const currentUser = useSelector((state) => selectCurrentUser(state))
    const navigate = useNavigate()
    const location = useLocation()
    const { removeItemFromCart } = useCart(true)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(orderSchema),
        mode: 'onBlur'
    })
    const [paymentField, setPaymentField] = useState("cod")
    const submitOrder = async (data) => {
        const payload = {
            ...data,
            "email": currentUser.email,
            "items": cartItem,
            "coupon": location.state.code ? location.state.id : "",
            "discount": location.state.discount ? location.state.discount : 0
        }
        const res = await orderCreate(payload, currentToken.token)
        setOrderSuccess(res.id)
        toast('the order has been placed')
        cartItem.map((item) => (removeItemFromCart(item)))

        if (paymentField === 'card') {
            navigate('/payment', {
                state: {
                    order_id: res.id
                }
            })
        }
    }

    const handleChange = (e) => {
        setPaymentField(e.target.value)
    }

    const order = () => {
        return (
            <div className='flex justify-between border-b'>
                <div className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'>
                    <form className='text-center' onSubmit={handleSubmit(submitOrder)} method='post'>
                        <h2 className='text-gray-900 text-3xl title-font font-medium mb-1 text-center'>
                            Checkout
                        </h2>
                        <BaseInput
                            errors={errors.name?.message}
                            className="border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
                            name='name'
                            placeholder={currentUser.name}
                            type='text'
                            register={register}
                        />
                        <BaseInput
                            errors={errors.number_phone?.message}
                            className="border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            name='number_phone'
                            placeholder='number phone'
                            type='text'
                            register={register}
                        />
                        <BaseInput
                            errors={errors.address?.message}
                            className="border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            name='address'
                            placeholder="Address"
                            type='text'
                            register={register}
                        />
                        <BaseInput
                            errors={errors.postal_code?.message}
                            className="border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            name='postal_code'
                            placeholder="Postal code"
                            type='text'
                            register={register}
                        />
                        <BaseInput
                            errors={errors.city?.message}
                            className="border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            name='city'
                            placeholder="City"
                            type='text'
                            register={register}
                        />
                        <div className='md:flex '>
                            <div className='w-3/4 mx-auto'>
                                <select value={paymentField} onChange={handleChange} name='payment' className='lg:w-1/2 bg-gray-200 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white '>
                                    <option value="cod">Cash On Delivery</option>
                                    <option value="card">Credit Card</option>
                                </select>
                            </div>
                        </div>
                        {paymentField === 'cod' ?
                            <button type='submit' className='my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded'>Checkout</button>
                            :
                            <button type='submit' className='my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded'>Payment</button>

                        }
                    </form>
                </div>
                <div className='lg:w-1/4 lg:h-auto h-64 object-cover object-center rounded'>
                    <h2 className='text-gray-900 text-3xl title-font font-medium mb-1 text-center'>
                        Your Order
                    </h2>
                    <OrderItems cartItems={cartItem} />
                    <ToastContainer />

                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen'>
            <div className='md:hidden flex items-center justify-center pb-2'>
                <BurgerMenuIcon
                    onClick={() => setIsOpen(!isOpen)}
                    className='cursor-pointer shadow-lg text-center'
                />
            </div>
            {orderSuccess === "" ? order() : orderSuccess ? OrderSuccess() : OrderCancel()}
        </div>
    )
}

export default Order