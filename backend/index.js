var mysql = require("mysql2");
var http = require("http");
var url = require("url");
http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(200, { "Content-Type": "application/json" });
    con.connect(function (err) {
        if (err) {
            console.log("error occured!!!");
        }
        else {
            if (req.method === "GET" && req.url.startsWith("/insert")) {
                var q = url.parse(req.url, true).query;
                var id = q.id;
                var name = q.name;

                if (!id || !name) {
                    res.write("Please provide both 'id' and 'name' in the query parameters.");
                    res.end();
                    return;
                }

                var checkQuery = "SELECT * FROM employee WHERE id = ?";
                con.query(checkQuery, [id], function (err, result) {
                    if (err) {
                        console.log("Error checking for existing ID");
                        res.write("Error checking for existing employee ID");
                        res.end();
                        return;
                    }

                    if (result.length > 0) {
                        res.write("Employee with this ID already exists!");
                        res.end();
                        return;
                    }

                    console.log("Inserting Employee - ID: " + id + ", Name: " + name);
                    var sql = `INSERT INTO employee (id, name) VALUES (?, ?)`;
                    con.query(sql, [id, name], function (err, result) {
                        if (err) {
                            console.log("Insert query error");
                            res.write("Error inserting employee");
                        } else {
                            res.write("Employee added successfully!");
                        }
                        res.end();
                    });
                });
            }


            else if (req.method === "GET" && req.url === "/show") {
                var query2 = "select * from employee";
                con.query(query2, function (err, result, fields) {
                    if (err) { console.log("Select query error") }
                    res.write(JSON.stringify(result));
                    res.end();
                });
            }
            else if (req.method === "GET" && req.url.startsWith("/delete")) {
                var q = url.parse(req.url, true).query;
                var id = q.id;

                if (!id) {
                    res.write("Please provide an 'id' to delete.");
                    res.end();
                    return;
                }

                console.log("Deleting Employee - ID: " + id);
                var query3 = "DELETE FROM employee WHERE id = ?";
                con.query(query3, [id], function (err, result) {
                    if (err) {
                        console.log("Delete query error");
                        res.write("Error deleting employee");
                    } else if (result.affectedRows === 0) {
                        res.write("No employee found with the provided ID.");
                    } else {
                        res.write("Employee deleted successfully!");
                    }
                    res.end();
                });
            }
            else if (req.method === "GET" && req.url.startsWith("/update")) {
                var q = url.parse(req.url, true).query;
                var id = q.id;
                var name = q.name;

                if (!id || !name) {
                    res.write("Please provide both 'id' and 'name' in the query parameters.");
                    res.end();
                    return;
                }

                console.log("Updating Employee - ID: " + id + ", New Name: " + name);
                var query4 = "UPDATE employee SET name = ? WHERE id = ?";
                con.query(query4, [name, id], function (err, result) {
                    if (err) {
                        console.log("Update query error");
                        res.write("Error updating employee");
                    } else if (result.affectedRows === 0) {
                        res.write("No employee found with the provided ID.");
                    } else {
                        res.write("Employee updated successfully!");
                    }
                    res.end();
                });
            }

            else {
                res.end("Your API's Path is Wrong!!!");
            }
        }
    })
}).listen(8080);
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@123Diya@",
    database: "node"
})