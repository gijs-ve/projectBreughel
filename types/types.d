
type user = {
    id: string,
    name: string,
    mail: string,
    isAdmin: boolean,    
}
type category = "animals" | "landscape"
type painter = user

type painting = {
    name: string,
    length: number,
    width: number,
    price: number,
    painter: painter
    category: category
}