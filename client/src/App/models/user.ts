import { Basket } from "./basket";

export default interface User {
    email: string,
    token: string,
    basket: Basket
}