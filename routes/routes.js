const app = require('../app');
const AdvertisementController = require('../controllers/advertisement.controller');

module.exports = (app) => {
    app.post('/register', AdvertisementController.createAd);
    app.get('/ad/:id', AdvertisementController.getAd);
}
