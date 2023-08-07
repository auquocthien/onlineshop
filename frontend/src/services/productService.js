import Api from "./Api";
export const productQuantity = async (slug) => {
    try {
        const res = await (await Api().get(`/products/${slug}/`)).data
        return {
            quantity: res[0].quantity
        }
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const productRate = async (payload) => {
    try {
        const res = await (await Api().post(`/rate/`, payload)).data
        return {
            data: res
        }
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const productRateAvg = async (id) => {
    try {
        const res = await (await Api().get(`/rate/${id}/`)).data
        return {
            data: res
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

export const productPagging = async (page) => {
    try {
        const res = await (await Api().get(`/products/?page=${page}`)).data
        return {
            data: res
        }
    } catch (err) {
        console.log(err)
        return err
    }
}