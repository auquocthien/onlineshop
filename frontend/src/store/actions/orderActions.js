import { ORDER_CANCEL, ORDER_SUCCESS, ORDER_CREATE } from "constant/types";

export const orderCreate = (payload) => ({
    type: ORDER_CREATE,
    payload: payload,
})

export const orderSuccess = (payload) => ({
    type: ORDER_SUCCESS,
    payload: payload
})

export const orderCancel = (payload) => ({
    type: ORDER_CANCEL,
    payload: payload
})