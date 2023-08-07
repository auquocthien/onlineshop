const date_format = (date) => {
    const new_date = new Date(date)
    return new_date.toDateString()
}
const CommentList = ({ comments }) => {
    const commentCard = ({ name, body, created }) => {
        return (
            <div className="border rounded px-3 py-3 mb-2" key={created}>
                {/* <div className="flex">
                    <div className="col-10 text-blue-600 font-medium">{name}</div>
                    <div className="rounded-full p-0 border-0 inline-flex items-end justify-end text-gray-500 ml-4">
                        <span>
                            {new_date.getFullYear()} / {new_date.getMonth()} / {new_date.getDate()}
                        </span>
                    </div>
                </div> */}
                <div>
                    Comment by <span className="col-10 text-blue-600 font-medium">{name}</span> on {date_format(created)}
                </div>
                <div className="text-gray-900  ml-2">
                    <h4>{body}</h4>
                </div>
            </div>
        )
    }
    return (
        comments.map((comment) => commentCard(comment))
    )
}

export default CommentList