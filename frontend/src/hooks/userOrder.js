import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Api from "services/Api";
import { selectCurrentUser } from "store/selector/authSelector";

export function useOrders() {
    const currentUser = useSelector((state) => selectCurrentUser(state))
    console.log(currentUser.email)
    return useQuery('orders', () =>
        Api()
            .post('/orders/orderlist/', { 'email': currentUser.email })
            .then((res) => res.data)
            .catch((err) => err)
    )
}