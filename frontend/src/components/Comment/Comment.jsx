import { useState } from "react"
import { Link } from 'react-router-dom';
import CommentList from "./CommentList"
import { useComment } from "hooks/useComment"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "store/selector/authSelector"
import Api from "services/Api";
const Comment = ({ product_id }) => {
    const currentUser = useSelector((state) => selectCurrentUser(state))
    const [commentField, setCommentField] = useState("")
    const { data: comments, isLoading, isError } = useComment(product_id)
    const handleChange = e => {
        setCommentField(e.target.value)
    }
    const onSubmit = async () => {
        const payload = {
            "gmail": currentUser.email,
            "name": currentUser.name,
            "body": commentField,
            "product": product_id
        }
        try {
            const res = await (await Api().post('/comment/', payload)).data
            console.log(res)
            window.location.reload()
        }
        catch (error) {
            console.log(error)
        }
    }

    return currentUser ? (
        <div>
            <div className='lg:w-100 pt-2 relative mx-auto text-gray-600'>
                <div className="mb-5 lg:w-4/5">
                    {isLoading || comments.length === 0 || isError ? (
                        <div>No comment yet</div>
                    ) : (
                        <CommentList comments={comments} />
                    )}
                </div>
                <div>

                    <input
                        onChange={handleChange}
                        className='lg:w-4/5 border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                    />
                    <button
                        onClick={onSubmit}
                        className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded ml-3">
                        Add comment
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <div className='lg:w-100 pt-2 relative mx-auto text-gray-600'>
                <div className="mb-5">
                    {isLoading || comments.length === 0 || isError ? (
                        <div>No comment yet</div>
                    ) : (
                        <CommentList comments={comments} />
                    )}
                </div>
                <input
                    onChange={handleChange}
                    className='lg:w-4/5 border bg-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                />

                <Link
                    to='/signin'
                    className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded ml-3">
                    Login to Comment
                </Link>
            </div>
        </div>
    )
}

export default Comment