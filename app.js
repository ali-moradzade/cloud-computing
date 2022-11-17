const express = require('express');
const fs = require('fs');
const multiparty = require('multiparty');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// get the file posted from the client
app.post('/upload', (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        } else {
            let path = files.image[0].path;
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    // our data contains buffer of the file
                    console.log(data);
                }
            });

            res.send('File uploaded successfully');
        }
    });

});

app.listen(3000, () => {
    console.log('Listening on port 3000 ..');
});
