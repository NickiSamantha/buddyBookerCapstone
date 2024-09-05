import express from 'express';
import bodyParser from 'body-parser';
import { bookings } from '../model/index.js'; // Ensure 'bookings' is exported from your model

const bookingRouter = express.Router();

bookingRouter.use(bodyParser.json());

// Fetch all bookings
bookingRouter.get('/user/${userID}/bookings', (req, res) => {
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
bookingRouter.patch('/bookings/update/:id', (req, res) => {
  bookings.updateBooking(req, res);
});

// Delete a booking by ID
bookingRouter.delete('/bookings/delete/:id', (req, res) => {
  bookings.deleteBooking(req, res);
});

// Optionally, if you have other routes like fetching available slots
bookingRouter.get('/bookings/slots', (req, res) => {
  bookings.fetchAvailableSlots(req, res);
});
bookingRouter.get('/user/:userId/bookings', (req, res) => {
    bookings.fetchBookingsByUser(req, res);
  });

export {
  express,
  bookingRouter
};
