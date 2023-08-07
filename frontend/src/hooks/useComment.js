import { useQuery } from "react-query";
import Api from "services/Api";

export function useComment(product_id) {
    return useQuery(`comment-${product_id}`, () =>
        Api()
            .get(`/comment/${product_id}/`)
            .then((res) => res.data)
            .catch((err) => err.res)
    )
}

export function useAddComment(product_id, comment) {

}