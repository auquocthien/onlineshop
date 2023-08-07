/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form"
import { paymentSchema } from "utils/AuthValidation"
import BaseInput from 'components/Shared/BaseInput'
import { yupResolver } from "@hookform/resolvers/yup"
import * as braintree from 'braintree-web'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserToken } from "store/selector/authSelector"
import { paymentCreate, paymentToken } from "services/paymentService"
import { useLocation } from "react-router-dom"
import '../../assets/css/payment.css'
import '../../assets/js/payment.js'
import OrderSuccess from 'components/Order/OrderSuccess';
import OrderCancel from 'components/Order/OrderCancel';
const Payment = () => {
    const [client, setClient] = useState("")
    const [token, setToken] = useState("")
    const [hostedFieldsInstance, setHostedFieldsInstance] = useState("")
    const [paymentSuccess, setPaymentSuccess] = useState("")
    const location = useLocation()
    useEffect(() => {
        async function token_client() {
            try {
                const data = await paymentToken()
                setToken(data.token)
            }
            catch (error) {
                console.log(error)
            }
        }
        token_client()
    }, [])
    const currenUser = useSelector((state) => selectUserToken(state))
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(paymentSchema),
        mode: 'onBlur'
    })
    const submitPayment = async (e) => {
        console.log(e)
        const data = {}
        console.log(location.state.order_id)
        if (hostedFieldsInstance) {
            try {
                const { nonce } = await hostedFieldsInstance.tokenize()
                data['payment_method_nonce'] = nonce
                data['order_id'] = location.state.order_id
                console.log(data)
                const payment = await paymentCreate(data)
                setPaymentSuccess(payment.status)
                return payment.status
            }
            catch (err) {
                console.log('error: ', err)
            }
        }
    }
    useEffect(() => {
        if (token) {
            braintree.client
                .create({
                    authorization: token
                })
                .then((clientInstance) => {
                    setClient(clientInstance)
                })
                .catch((err) => {
                    console.log('error: ', err)
                })
        }
    }, [currenUser, token])

    useEffect(() => {
        if (client) {
            braintree.hostedFields
                .create({
                    client: client,
                    styles: {
                        'input': {
                            'font-size': '2em',
                            'font-weight': '300',
                            'font-family': 'sans-serif',
                            'color': '#000'
                        },
                        ':focus': {
                            'color': '#000'
                        },
                        '.invalid': {
                            'color': '#fd2d78'
                        },
                        '.valid': {
                            'color': 'green'
                        },
                    },
                    fields: {
                        number: {
                            selector: '#card-number'
                        },
                        cvv: {
                            selector: '#cvv'
                        },
                        expirationDate: {
                            selector: '#expiration-date'
                        }
                    }
                })
                .then((hostedFieldsInstance) => {
                    setHostedFieldsInstance(hostedFieldsInstance)

                })
                .catch((err) => {
                    console.log('err: ', err)
                })
        }
    }, [client])


    return paymentSuccess === "" ? (
        <div className="container-payment rounded-lg shadow-lg p-10">
            <div className="container-wrap ">
                <form id="cardForm" onSubmit={handleSubmit(submitPayment)}>
                    <div className="field-container ">
                        <label className="hosted-field--label  text-xl tracking-wider " htmlFor="card-number">Card Number
                        </label>
                        <div className="hosted-field rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="card-number"></div>
                    </div>
                    <div className="field-container ">
                        <label className="hosted-field--label text-xl tracking-wider " htmlFor="expiration-date">
                            Exp (MM/YY)
                        </label>
                        <div className="hosted-field rounded  leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="expiration-date"></div>
                    </div>
                    <div className="field-container ">
                        <label className="hosted-field--label text-xl tracking-wider " htmlFor="cvv">
                            CVV
                        </label>
                        <div className="hosted-field rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="cvv"></div>
                    </div>
                    <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" name='Payment' margin='mx-auto' onClick={submitPayment} type='submit'>Payment</button>
                </form>
            </div>
        </div>
    ) : paymentSuccess === 'success' ? OrderSuccess() : OrderCancel()
}

export default Payment