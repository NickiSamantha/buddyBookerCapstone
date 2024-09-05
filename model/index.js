import { Users } from "./Users.js";
import { Sitters } from "./Sitters.js";
import {bookings} from "./bookings.js"; 

const users = new Users();
const sitters = new Sitters();
const bookings = new bookings();

export {
    users,
    sitters,
    bookings
}