const fs = require('fs');
const multiparty = require('multiparty');

module.exports = {
    createAd(req, res) {
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
                        // TODO: save the image to the s3 bucket
                        console.log(data);
                    }
                });

                res.send('File uploaded successfully');
            }
        });
    },

    getAd(req, res) {
        const id = req.params.id;

        // TODO: implement this
        res.send('Get ad with id: ' + id);
    },
};
