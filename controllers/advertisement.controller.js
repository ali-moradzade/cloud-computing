const multiparty = require('multiparty');

module.exports = {
    createAd(req, res) {
        let form = new multiparty.Form();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
            } else {
                let pathOfImage = files.image[0].path;
                let description = fields.description[0];
                let email = fields.email[0];

                console.log(pathOfImage, description, email);

                // TODO: save the image to the s3 bucket
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
