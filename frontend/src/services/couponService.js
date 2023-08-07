import Api from "./Api";


export const cuponDiscount = async (code, token) => {
    try {
        const res = await (await Api().get(`/coupons/coupon/${code}/`))
        Api(token)
        return res.data
    } catch (error) {
        console.log(error)
        return {
            status: 'fail',
            error: 'fail'
        }
    }
}