// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {

    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        res.json(data);
    });
  });

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware

    fs.readFile('./db/db.json', function(err, data) {
        var notes = JSON.parse(data);
        notes.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if(err) {
                console.log(err);
            }
        });
    });

    res.json(req.body);
  });
};
