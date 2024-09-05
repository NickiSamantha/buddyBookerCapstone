import express from 'express';
import bodyParser from 'body-parser';
import { bookings } from '../model/index.js'; // Ensure 'bookings' is exported from your model

const bookingRouter = express.Router();

bookingRouter.use(bodyParser.json());

// Fetch all bookings
bookingRouter.get('/', (req, res) => {
  bookings.fetchBookings(req, res);
});

// Fetch a single booking by ID
bookingRouter.get('/:id', (req, res) => {
  bookings.fetchBooking(req, res);
});

// Create a new booking
bookingRouter.post('/create', (req, res) => {
  bookings.createBooking(req, res);
});

// Update an existing booking by ID
bookingRouter.patch('/update/:id', (req, res) => {
  bookings.updateBooking(req, res);
});

// Delete a booking by ID
bookingRouter.delete('/delete/:id', (req, res) => {
  bookings.deleteBooking(req, res);
});

// Optionally, if you have other routes like fetching available slots
bookingRouter.get('/slots', (req, res) => {
  bookings.fetchAvailableSlots(req, res);
});

export {
  express,
  bookingRouter
};
