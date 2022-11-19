const multiparty = require('multiparty');
const advertisementService = require('../services/getAndCreateAd.service');

module.exports = {
    createAd(req, res) {
        let form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err);
            } else {
                let pathOfImage = files.image[0].path;
                let description = fields.description[0];
                let email = fields.email[0];

                console.log('Form Data:');
                console.log({
                    pathOfImage,
                    description,
                    email
                });

                console.log('\nCalling the service to create the advertisement ..\n');
                let postId = await advertisementService.createAdvertisement(pathOfImage, description, email);

                if (postId) {
                    res.send("Advertisement created successfully with postId: " + postId);
                } else {
                    res.send("Error in creating the advertisement ..");
                }
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
