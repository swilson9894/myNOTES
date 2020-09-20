const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;
const mainDirectory = path.join(__dirname, "/public");



app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, ""));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(mainDirectory, "index.html"));
});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    let Mynotes = JSON.parse(fs.readFileSync("", "utf8"));
    let shontaW = req.params.id;
    let ID = 0;
    console.log(`Deleting note with ID ${shontaW}`);
    Mynotes = Mynotes.filter(currNote => {
        return currNote.id != shontaW;
    })
    
    for (currNote of Mynotes) {
        currNote.id = ID.toString();
        ID++;
    }

    fs.writeFileSync("", JSON.stringify(Mynotes));
    res.json(Mynotes);
})

app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}. Thank You!`);
})


app.use(express.static('public'));
app.use(express.urlcode({extended: true}));
app.use(express.json());

app.get("", function(req, res) {
    res.sendFile(path.join(mainDirectory, "index.html"));
});