import Api from "./Api";

export const orderCreate = async (payload, token) => {
    try {
        const res = await (await Api().post('/orders/order/', payload)).data
        Api(token)
        return res
    } catch (error) {
        console.log(error)
        return {
            status: 'fail'
        }
    }
}