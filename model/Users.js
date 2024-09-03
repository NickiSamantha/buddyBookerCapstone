import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/AuthenticateUser.js";
import { hash, compare } from "bcrypt";

class Users {
  fetchUsers(req, res) {
    try {
      const strQry = `
                SELECT * FROM Users;
            `;

      db.query(strQry, (err, result) => {
        //`Unable to fetch all users: `
        if (err) throw new Error(err.message );
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
  fetchUser(req, res) {
    try {
      const strQry = `
            SELECT * FROM Users
            WHERE userID = ${req.params.id};
        `;

      db.query(strQry, (err, result) => {
        if (err) throw new Error(`Specified user not found: `, err);

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
  async registerUser(req, res) {
    try {
        let data = req.body;
        //console.log(data);
      data.pwd = await hash(data.pwd, 12);
      let user = {
        emailAdd: data.emailAdd,
        pwd: data.pwd,
      };

      const strQry = `
        INSERT INTO Users
        SET ?;
        `;

      db.query(strQry, [data], (err) => {
        if (err) {
          res.json({
            status: res.statusCode,
            message: `This email has already been taken.`,
          });
        } else {
          const token = createToken(user);
          res.json({
            token,
            message: `Your account has been created.`,
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
  async updateUser(req, res) {
    try {
      let data = req.body;
      if (data.pwd) {
        data.pwd = await hash(data.pwd, 12);
      }
      const strQry = `
              UPDATE Users
              SET ?
              WHERE userID = ${req.params.id};
            `;

      db.query(strQry, [data], (err) => {
        if (err) throw new Error('Unable to update user.');
        res.json({
          status: res.statusCode,
          message: "User updated successfully",
        });
      });
    } catch (error) {
      res.json({ status: 404, message: error.message });
    }
  }
  deleteUser(req, res) {
    try {
      const strQry = `
              DELETE FROM Users
              WHERE userID = ${req.params.id};
            `;
      db.query(strQry, (err) => {
        if (err)
          throw new Error(`To delete a user, please review your delete query.`);
        res.json({
          status: res.statusCode,
          message: "User's account has been deleted.",
        });
      });
    } catch (error) {
      res.json({ status: 404, message: error.message });
    }
  }
//   async login(req, res) {
//     try {
//       const { emailAdd, pwd } = req.body;
//       const strQry = `
//               SELECT *
//               FROM Users
//               WHERE emailAdd = '${emailAdd}';
//             `;
//       db.query(strQry,[emailAdd], async (err, result) => {
//         if (err) throw new Error(`To login, please review your query.`);
//         if (!result?.length) {
//           res.json({
//             status: 401,
//             message: "You provided the wrong email.",
//           });
//         } else {
//           const isValidPass = await compare(pwd, result[0].pwd);
//           if (isValidPass) {
//             const user = {emailAdd, pwd}
//             const token = createToken(user);
//             res.json({
//               status: res.statusCode,
//               token,
//               result: result[0],
//               message: `You have successfully logged in.`,
//             });
//           } else {
//             res.json({
//               status: 401,
//               message: `Invalid password or you have not registered.`,
//             });
//           }
//         }
//       });
//     } catch (error) {
//       res.json({
//         status: 401,
//         message: error.message,
//       });
//     }
//   }

async login(req, res) {
    try {
      const { emailAdd, pwd } = req.body;
  
      // Use parameterized query to prevent SQL injection
      const strQry = `
        SELECT * FROM Users WHERE emailAdd = ?;
      `;
      
      db.query(strQry, [emailAdd], async (err, result) => {
        if (err) {
          res.status(500).json({
            status: 500,
            message: 'Database error occurred.',
          });
          return;
        }
  
        if (!result?.length) {
          res.status(401).json({
            status: 401,
            message: "You provided the wrong email.",
          });
        } else {
          const isValidPass = await compare(pwd, result[0].pwd);
          if (isValidPass) {
            const user = { emailAdd, pwd, role: result[0].role }; // Add role to user
            const token = createToken(user);
            res.status(200).json({
              status: 200,
              token,
              result: result[0],
              message: `You have successfully logged in.`,
            });
          } else {
            res.status(401).json({
              status: 401,
              message: `Invalid password or you have not registered.`,
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  
  async logout (req, res) {
    try { 
        const token = req.headers.authorization?.split('')[1];
        if(!token) {
            return res.status(404).json ({
                status: 404,
                message:'No token provided.' ,
            });
        }
        const strQry = `
        INSERT INTO TokenBlacklist (token) 
        VALUES (?);
        `;
        db.query(strQry, [token], (err) => {
            if (err) {
                console.error('Failed to blacklist token:', err);
                return res.status(404).json({
                    status:404,
                    message: 'Failed to logout. Please try again.',
                });
            }
            res.json ({
                status:200, 
                message: 'You have been logged out successfully.',
            });
        });
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message,
        })
    }
  }
}

export {
    Users
}