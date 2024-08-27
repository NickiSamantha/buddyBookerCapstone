import { connection as db } from "../config/index.js";

class Sitters {
  fetchSitters(req, res) {
    try {
      const strQry = `
                SELECT *
                FROM Sitters;
            `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(`Unable to fetch all sitters`);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }

  recentSitters(req, res) {
    try {
      const strQry = `
        SELECT *
        FROM Sitters
        ORDER BY prodID DESC
        LIMIT 4;
        `;

      db.query(strQry, (err, results) => {
        if (err) throw new Error(`Unable to retrieve recent products`);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }
  fetchSitter(req, res) {
    try {
      const strQry = `
                SELECT *
                FROM Sitters
                WHERE sitID = ${req.params.id};
            `;
      db.query(strQry, (err, result) => {
        if (err) throw new Error(`Specified sitter was not found`);
        res.json({
          status: res.statusCode,
          result: result[0],
        });
      });
    } catch (error) {
      res.json({
        status: 404,
        message: error.message,
      });
    }
  }
  addSitter(req, res) {
    try {
      const strQry = `
                INSERT INTO Sitters
                SET ?;
            `;

      db.query(strQry, [req.body], (err) => {
        if (err) throw new Error(`Unable to add Sitter`);
        res.json({
          status: res.statusCode,
          message: "Sitter added successfully",
        });
      });
    } catch (error) {
      res.json({ status: 404, err: error.message });
    }
  }
  updateSitter(req, res) {
    try {
      const strQry = `
                    UPDATE Sitters
                    SET ?
                    WHERE sitID = ${req.params.id};
                `;

      db.query(strQry, [req.body], (err) => {
        if (err) throw new Error(`Unable to update Sitter`);
        res.json({
          status: res.statusCode,
          message: "Sitter updated successfully",
        });
      });
    } catch (error) {
      res.json({ status: 404, err: error.message });
    }
  }
  deleteSitter(req, res) {
    try {
      const strQry = `
        DELETE FROM Sitters
        WHERE sitID = ${req.params.id};
        `;

      db.query(strQry, (err) => {
        if (err) throw new Error(`Please review your delete query`);
        res.json({
          status: res.statusCode,
          message: "Sitter deleted successfully",
        });
      });
    } catch (error) {
      res.json({ status: 404, err: error.message });
    }
  }
}

export { Sitters };