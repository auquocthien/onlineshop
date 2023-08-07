import { Link } from "react-router-dom"


const OrderSuccess = () => {

    return (
        <div className="flex justify-center my-6">
            <div>
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-center mx-auto" width="75" height="75"
                        viewBox="0 0 16 16" fill="green">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                </div>
                <div className="text-center">
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Thank You !</h1>
                    <p className="mb-5">We've send the link to your inbox. Lorem ipsum dolor sit, </p>
                    <Link to="/shop" className="my-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">Back Home</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess