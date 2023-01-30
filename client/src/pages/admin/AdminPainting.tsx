import { useParams } from "react-router-dom"

export const AdminPainting = () => {
    const {id} = useParams()
    return (<>{id}</>)
}