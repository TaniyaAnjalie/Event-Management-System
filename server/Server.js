//npm run dev

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

//databse connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "events",
  port: 3308,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

//CRUD

app.post("/add_event", (req, res) => {
  const { e_name, location, max_count, created_by } = req.body; // get user_id from request (usually from auth token)

  const sql =
    "INSERT INTO events_details (e_name, location, max_count, created_by) VALUES (?, ?, ?, ?)";
  db.query(sql, [e_name, location, max_count, created_by], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something unexpected has occurred: " + err });
    }
    res.json({ message: "Event added successfully" });
  });
});

app.get("/events", (req, res) => {
  const sql = `
    SELECT e.*, u.username AS created_by
    FROM events_details e
    LEFT JOIN users u ON e.created_by = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching events with user data:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

app.get("/get_event/:id", (req, res) => {
  const eventId = req.params.id;

  const sql = `
  SELECT e.*, u.username, u.id AS user_id
  FROM events_details e
  JOIN users u ON e.created_by = u.id
  WHERE e.id = ?
  `;

  db.query(sql, [eventId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Event not found");

    res.send(result[0]);
  });
});

app.post("/edit_event/:id", (req, res) => {
  console.log("Edit event called with id:", req.params.id);
  console.log("Request body:", req.body);
  const id = req.params.id;
  const { e_name, location, max_count, userId, role } = req.body;

  // Step 1: Check event owner
  const sqlCheck = "SELECT created_by FROM events_details WHERE id = ?";
  db.query(sqlCheck, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventOwnerId = result[0].created_by;

    // Step 2: Authorization logic
    if (role !== "admin" && parseInt(userId) !== eventOwnerId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this event." });
    }

    // Step 3: Proceed with update
    const sqlUpdate =
      "UPDATE events_details SET e_name = ?, location = ?, max_count = ? WHERE id = ?";
    db.query(sqlUpdate, [e_name, location, max_count, id], (err2, result2) => {
      if (err2) {
        return res.status(500).json({ message: "Update failed", error: err2 });
      }
      return res.json({ message: "Event updated successfully" });
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const { userId, role } = req.body; // Send this from frontend

  // Step 1: Get the user_id of the event
  const sqlCheck = "SELECT created_by FROM events_details WHERE id = ?";
  db.query(sqlCheck, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventOwnerId = result[0].created_by;

    // Step 2: Check permissions
    if (role !== "admin" && parseInt(userId) !== eventOwnerId) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this event." });
    }

    // Step 3: Proceed with delete
    const sqlDelete = "DELETE FROM events_details WHERE id = ?";
    db.query(sqlDelete, [id], (delErr, delResult) => {
      if (delErr) {
        return res
          .status(500)
          .json({ message: "Failed to delete event", error: delErr });
      }
      return res.json({ message: "Event deleted successfully" });
    });
  });
});

app.listen(port, () => {
  console.log("listening");
  console.log(port);
});

// User Roles

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Use env in production

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const role = "user"; // force role to 'user'
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  db.query(sql, [username, hashedPassword, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating user" });
    }
    return res.json({ message: "User created successfully" });
  });
});

// Login
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err || result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  });
});

// Middleware example for verifying token and admin role
function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Admins only" });

    req.user = user;
    next();
  });
}

//Admin creating new admins
app.post("/admin/create_user", verifyAdmin, (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Username, password, and role are required" });
  }

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Role must be 'admin' or 'user'" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";

  db.query(sql, [username, hashedPassword, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating user" });
    }
    return res.json({ message: `User with role ${role} created successfully` });
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT id, username FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(result);
  });
});
