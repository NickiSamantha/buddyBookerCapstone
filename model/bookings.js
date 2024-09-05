import { connection as db } from "../config/index.js";

class Bookings {
    fetchBookings(req, res) {
        try {
          const strQry = `  SELECT b.bookingID, b.userID, b.sitID, b.bookingDate, b.startTime, b.endTime, b.status,
        b.comments
        FROM Users u
        INNER JOIN Bookings b
        USING(userID)
        INNER JOIN Sitters s
        USING(sitID)
        WHERE u.userID = ${req.params.id}`;
          db.query(strQry, (err, result) => {
            if (err) {
              res.status(500).json({ status: 500, message: `Unable to fetch bookings: ${err.message}` });
            } else {
              res.json({
                status: 200,
                result,
              });
            }
          });
        } catch (error) {
          res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }

  fetchBooking(req, res) {
    try {
      const strQry = `
        SELECT b.bookingID, b.userID, b.sitID, b.bookingDate, b.startTime, b.endTime, b.status, b.comments
        FROM Bookings b
        INNER JOIN Users u ON b.userID = u.userID
        INNER JOIN Sitters s ON b.sitID = s.sitID
        WHERE u.userID = ${req.params.id} 
        AND b.bookingID = ${req.params.bid};
      `;

      db.query(strQry, (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
        res.json({
            status: 200,
            results
        });
    });
    }catch(e){
        res.json({
            status: 400,
            err: e.message
        });
    }
}



  async createBooking(req, res) {
    try {
     

      const strQry = `
        INSERT INTO Bookings 
        SET ?;
      `;

      db.query(strQry, [req.body] , (err) => {
        if (err) throw new Error ('Unable to add a new booking.') 
          res.json({
            status: res.statusCode,
            msg: 'Booking was added'
        })
})
} catch(e) {
res.json({
    status: 400, // Mistake on the clients side (Maybe syntax error)
    err: e.message //The error message from the if statement
})
}
}

  
  async updateBooking(req, res) {
    try {
      
      const strQry = `
        UPDATE Bookings
        SET ?
        WHERE userID = ${req.params.id} AND bookingID = 
        ${req.params.bookingID};
      `;

      db.query(strQry,[req.body], (err) => {
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
        WHERE userID = ${req.params.id} AND bookingID = 
        ${req.params.bookingID};
      `;
      db.query(strQry, (err) => {
        if (err) throw new Error(`Unable to delete booking: 
            ${err.message}`);
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

  deleteBookings(req, res) {
    try{
        const strQry = `
        DELETE FROM Bookings
        WHERE userID = ${req.params.uid};
        `
        db.query (strQry, (err) => {
            if(err) throw new Error('To delete a bookings, please review your delete query.')
                res.json({
                    status: res.statusCode,
                    msg: 'All bookings were removed.'
            })
        })
    } catch(e) {
        res.json({
            status: 404, //Resource not found
            err: e.message
        })
    }
}

//ADMIN ONLY

fetchAllBookings(req, res) {
    try {
      const strQry = `  SELECT b.bookingID, b.userID, b.sitID, b.bookingDate, b.startTime, b.endTime, b.status,
    b.comments
    FROM Users u
    INNER JOIN Bookings b
    USING(userID)
    INNER JOIN Sitters s
    USING(sitID)
    `;
      db.query(strQry, (err, result) => {
        if (err) {
          res.status(500).json({ status: 500, message: `Unable to fetch bookings: ${err.message}` });
        } else {
          res.json({
            status: 200,
            result,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export {
    Bookings
} ;

