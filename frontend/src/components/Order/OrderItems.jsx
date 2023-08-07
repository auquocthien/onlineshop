// import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
// import { selectCartItems } from "store/selector/cartSelector"
import { displayMoney } from "utils/textDisplay"
const OrderItems = ({ cartItems }) => {
    const location = useLocation()
    return (
        <div className="rounded bg-gray-200 lg:h-auto px-5 py-3">
            <div className="lg:text-sm font-bold text-gray-900 border-b pb-2">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span>
                            {item.quantity}x {item.name.substring(0, 15)} {item.name.length > 15 && '...'}
                        </span>
                        <span>
                            {displayMoney(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
            </div>
            <div className=" flex justify-between lg:text-sm font-bold text-gray-900  mt-2">
                <span className="uppercase">
                    discount code
                </span>
                <span>
                    {location.state.code ? location.state.code : ''}
                </span>
            </div>
            <div className="lg:text-sm font-bold text-gray-900 flex justify-between">
                <span className="uppercase">
                    total Price
                </span>
                <span>
                    {displayMoney(location.state.totalPrice)}
                </span>
            </div>
        </div>
    )
}

export default OrderItems