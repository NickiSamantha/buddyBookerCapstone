import { Users } from "./Users.js";
import { Sitters } from "./Sitters.js";
import {Bookings} from "./Sitters.js"; 

const users = new Users();
const sitters = new Sitters();
const bookings = new Bookings();

export {
    users,
    sitters,
    bookings
}