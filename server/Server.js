const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app =express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port=5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "events",
    port: 3308
})

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL");
});

app.post('/add_event', (req, res)=>{
    console.log("Received POST data:", req.body);

    const sql = "INSERT INTO `events_details`(`e_name`, `location`, `max_count`) VALUES (?, ?, ?)";
    const values = [
        req.body.e_name,
        req.body.location,
        req.body.max_count
    ]

    db.query(sql, values, (err, result) => {
        if(err) {
            console.error("MySQL error:", err);
            return res.status(500).json({message: 'Something unexpected has occurred: ' + err});
        }
        return res.json({message: "Event added successfully"});
    });
});

app.get('/events', (req, res) =>{
    const sql = "SELECT * FROM `events_details`";
    db.query(sql, (err, result)=>{
        if(err) res.json({"message":"Server error"})
            return res.json(result)
    })
});

app.get("/get_event/:id", (req, res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM events_details WHERE `id`=?";
    db.query(sql,[id], (err, result)=>{
        // if(err) res.json({"message":"Server error"})
        //     return res.json(result)
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.json(result[0]) // Sends one object, not an array
    })
});

app.post('/edit_event/:id', (req, res)=>{
    const id = req.params.id;
    console.log("Received POST data:", req.body);

    const sql = "UPDATE `events_details` SET `e_name`=?,`location`=?,`max_count`=? WHERE id=?";
    const values = [
        req.body.e_name,
        req.body.location,
        req.body.max_count,
        id
    ]

    db.query(sql, values, (err, result) => {
        if(err) {
            console.error("MySQL error:", err);
            return res.status(500).json({message: 'Something unexpected has occurred: ' + err});
        }
        return res.json({message: "Event updated successfully"});
    });
});

app.delete('/delete/:id', (req, res) => {
    console.log("Delete request received for ID:", req.params.id)
    const id = req.params.id
    const sql = "DELETE FROM `events_details` WHERE `id`=?"
    const values=[id]

    db.query(sql,values,(err, result)=>{
        if(err)
            return res.json({message:"Something unexpected has occurred: " + err})
        return res.json({message: "Event deleted successfully"});
    })
})

app.listen(port, ()=>{
    console.log('listening')
})