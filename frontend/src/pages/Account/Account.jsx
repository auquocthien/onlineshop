/* eslint-disable no-unused-vars */
import LeftSideNav from "components/Navbar/LeftSideNav"
import { useLocation, useParams } from "react-router-dom"
import { useState } from "react"
import { useOrders } from "hooks/userOrder"
import { displayMoney } from "utils/textDisplay"
import paging from '../../assets/css/paging.css'
import ReactPaginate from "react-paginate"
const Account = () => {
    const [order, setOrder] = useState()
    const location = useParams()

    const PaginatedItem = ({ itemsPerPage }) => {
        const { data: orders } = useOrders()
        const [itemsOffset, setItemOffset] = useState(0)
        const endOffset = itemsOffset + itemsPerPage
        console.log(`from ${itemsOffset} to ${endOffset}`)
        if (orders) {
            var currentItems = orders.slice(itemsOffset, endOffset)
            var pageCount = Math.ceil(orders.length / itemsPerPage)
            if (location.slug === 'unpaid') {
                currentItems = currentItems.filter(item => item.paid === false)
            }
            if (location.slug === 'paid') {
                currentItems = currentItems.filter(item => item.paid === true)
            }
        }
        const handleClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % orders.length
            setItemOffset(newOffset)
        }

        const orderItem = (orders) => {
            return (
                <div className="">
                    {orders.map((order, index) => (
                        <div key={order.id} className="flex justify-between border-2 py-3 px-5 mb-3 rounded shadow-sm lg:w-1/2 transform duration-500 hover:scale-105">
                            <div className="lg:w-1/6 text-center">
                                <span>No. {index + 1}</span>
                            </div>
                            <div className="lg:w-5/6">
                                <div className=''>
                                    <div className="flex justify-between">
                                        <div className='text-sm lg:text-base select-none font-bold'>
                                            <h2 className="text-gray-900  title-font font-medium mb-1">{order.name}</h2>
                                        </div>
                                        <div className="text-sm title-font text-gray-500 tracking-widest">{date_format(order.created)}</div>
                                    </div>
                                    {totalPrice(order)}
                                    <div className="flex justify-between">
                                        <div className='lg:text-base select-none'>{order.postal_code} {order.address} {order.city}</div>
                                        <div>
                                            {order.paid
                                                ? (<span className="text-green-600 font-medium py-1 px-2">Paid</span>)
                                                : (<span className="text-red-600 font-medium py-1 px-2">Pending payment</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }

        return (
            <div>
                {currentItems && orderItem(currentItems)}
                <div className="lg:w-1/5 p-1 mt-5 ">

                    < ReactPaginate
                        breakLabel='...'
                        nextLabel='>'
                        onPageChange={handleClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel='<'
                        renderOnZeroPageCount={null}
                        className='flex justify-between font-medium'
                    />
                </div>

            </div>
        )

    }

    const date_format = (date) => {
        const new_date = new Date(date)
        return new_date.toDateString()
    }

    const totalPrice = (order) => {
        const price = order.items.reduce((price, orderItem) => price + orderItem.quantity * orderItem.price, 0)
        return (
            <div className="flex justify-between">
                <span className="font-medium">{order.items.length} items </span>
                <span>{displayMoney(price)}</span>
            </div>
        )
    }



    return (
        <div className="min-h-screen">
            <LeftSideNav />
            <div className="p-4 sm:ml-64 mt-5 rounded shadow-sm">
                <PaginatedItem itemsPerPage={8} />
            </div>
        </div>
    )
}

export default Account