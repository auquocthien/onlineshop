import { Link } from "react-router-dom"
const LeftSideNav = () => {
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-50 left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="space-y-2 font-medium pl-6">
                        <div>
                            <Link to='/account/confirm' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ml-3 uppercase hover:text-gray-500 font-bold">Confirm</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='/account/paid' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ml-3 uppercase hover:text-gray-500 font-bold">Paid</span>
                            </Link>
                        </div>
                        <div>
                            <Link to='/account/unpaid' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ml-3 uppercase hover:text-gray-500 font-bold">unpaid</span>
                            </Link>
                        </div>
                        {/* <li>
                            <Link to='/account/ordered' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ml-3 uppercase hover:text-gray-500 font-bold">ordered</span>
                            </Link>
                        </li> */}

                    </div>
                </div>
            </aside>
        </div>
    )
}

export default LeftSideNav