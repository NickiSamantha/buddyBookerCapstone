import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../model/index.js'
import { bookings } from '../model/index.js'; // Ensure 'bookings' is exported from your model
import { verifyToken } from '../middleware/AuthenticateUser.js';

const userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res)
})

userRouter.get('/:id', (req, res) => {
    users.fetchUser(req, res)
})

userRouter.post('/register', (req, res) => {
    users.registerUser(req, res)
})

userRouter.patch('/update/:id', (req, res) => {
    users.updateUser(req, res)
})

userRouter.delete('/delete/:id', (req, res) => {
    users.deleteUser(req, res)
})

userRouter.post('/login', (req, res) => {
    users.login(req, res)
})
//Admin
userRouter.get('/bookings', (req, res) => {
bookings.fetchAllBookings(req, res)
})
// Booking
userRouter.get('/:id/bookings', (req, res) => {
    bookings.fetchBookings(req, res)
})
userRouter.get('/:id/booking/:bid', (req, res) => {
    bookings.fetchBooking(req, res)
})
userRouter.post('/:id/booking', (req, res) => {
    bookings.createBooking(req, res)
})
userRouter.patch('/:id/booking/:bookingID', verifyToken, (req, res) => {
    bookings.updateBooking(req, res)
})
userRouter.delete('/:id/booking/:bookingID', (req, res) => {
    bookings.deleteBooking(req, res)
})
userRouter.delete('/:id/bookings', (req, res) => {
    bookings.deleteBookings(req, res)
})

export {
    express,
    userRouter
}