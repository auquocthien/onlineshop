import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const Paging = ({ page = 1, filter, maxPage }) => {

    const history = useNavigate()
    page = parseInt(page)
    console.log(page)
    const clickNext = useCallback(
        () => history(`/shop/${filter}/?page=${page + 1 > maxPage ? maxPage : page + 1}`, { state: { "page": page + 1 > maxPage ? maxPage : page + 1 } }),
        [history, page, filter, maxPage]
    )
    const clickPre = useCallback(
        () => history(`/shop/${filter}/?page=${page - 1 === 0 ? 1 : page - 1}`, { state: { "page": page - 1 === 0 ? 1 : page - 1 } }),
        [history, page, filter]
    )

    return (
        <div className="px-5 w-3/4 flex" id="paging">
            <div onClick={() => {
                clickPre()
            }
            } className="mr-1 border px-2 py-1 rounded bg-gray-300 cursor-pointer shadow-sm hover:bg-gray-600" id="pre">Previous</div>
            <div onClick={() => {
                clickNext()
            }
            } className="mr-1 border px-2 py-1 rounded bg-gray-300 cursor-pointer shadow-sm hover:bg-gray-600" id="next">Next</div>
        </div>
    )
}

export default Paging