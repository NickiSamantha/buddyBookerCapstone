import { connection as db } from "../config/index.js";

class Bookings {
  fetchBookings(req, res) {
    try {
      const strQry = `SELECT * FROM Bookings;`;

      db.query(strQry, (err, result) => {
        if (err) throw new Error(`Unable to fetch all bookings: ${err.message}`);
        res.json({
          status: res.statusCode,
          result,
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }

  fetchBooking(req, res) {
    try {
      const strQry = `
        SELECT * FROM Bookings
        WHERE bookingID = ${req.params.id};
      `;

      db.query(strQry, (err, result) => {
        if (err) throw new Error(`Specified booking not found: ${err.message}`);
        res.json({
          status: res.statusCode,
          result: result[0],
        });
      });
    } catch (error) {
      res.json({
        status: 400,
        message: error.message,
      });
    }
  }

  async createBooking(req, res) {
    try {
      const data = req.body;

      const strQry = `
        INSERT INTO Bookings (userID, sitID, bookingDate, startTime, endTime, status,  comments )
        VALUES (?, ?, ?, ?);
      `;

      db.query(strQry, [data.userID, data.sitID, data.bookingDate, data.startTime , data.endTime , data.status , data.comments], (err) => {
        if (err) {
          res.json({
            status: res.statusCode,
            message: `Unable to create booking: ${err.message}`,
          });
        } else {
          res.json({
            status: res.statusCode,
            message: `Booking created successfully.`,
          });
        }
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }
  async updateBooking(req, res) {
    try {
      const data = req.body;
      const strQry = `
        UPDATE Bookings
        SET userID = ?, bookingDate = ?, startTime = ?, endTime = ?, comments = ?
        WHERE bookingID = ${req.params.id};
      `;

      db.query(strQry, [data.userID, data.sitID, data.bookingDate, data.startTime , data.endTime , data.status , data.comments], (err) => {
        if (err) throw new Error('Unable to update booking.');
        res.json({
          status: res.statusCode,
          message: "Booking updated successfully",
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }

  deleteBooking(req, res) {
    try {
      const strQry = `
        DELETE FROM Bookings
        WHERE bookingID = ${req.params.id};
      `;
      db.query(strQry, (err) => {
        if (err) throw new Error(`Unable to delete booking: ${err.message}`);
        res.json({
          status: res.statusCode,
          message: "Booking has been deleted.",
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }
}

export {
    Bookings
} ;

