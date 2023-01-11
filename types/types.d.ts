
//User related
type user = {
    id: string,
    name: string,
    mail: string,
    isAdmin: boolean,    
}


//Painting related
type painter = user
type category = "animals" | "landscape"
type painting = {
    name: string,
    length: number,
    width: number,
    price: number,
    painter: painter,
    category: category,
    isApproved: boolean
}