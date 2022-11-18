const multiparty = require('multiparty');
const advertisementService = require('../services/getAndCreateAd.service');

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

                advertisementService.createAdvertisement(pathOfImage, description, email)
                    .then((id) => {
                        res.send('Your advertisement submitted successfully with id: ' + id);
                    })
                    .catch((err) => {
                        res.send('Problem with submitting your ad. Error: ' + err);
                    });
            }
        });
    },

    getAd(req, res) {
        const id = req.params.id;

        advertisementService.getAdvertisement(id)
            .then((advertisement) => {
                res.send(advertisement);
            })
            .catch((err) => {
                res.send('Problem with getting your ad. Error: ' + err);
            });
    },
};
