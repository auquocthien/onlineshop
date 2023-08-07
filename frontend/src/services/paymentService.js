import Api from './Api'

export const paymentToken = async () => {
    try {
        const res = await (await Api().get('/payment/client_token/')).data
        const data = {
            token: res.client_token
        }
        return data
    }
    catch (error) {
        console.log(error)
        return {
            error: error
        }
    }
}

export const paymentCreate = async (payload) => {
    try {
        const res = await (await Api().post(`/payment/create/${payload.order_id}/`, payload)).data
        const data = {
            status: res.status
        }
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
        return {
            err: err
        }
    }
}