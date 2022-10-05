const Router = require('express').Router;
const router = new Router();

const cache = require('../cache');
const { controller } = require('../controllers');

router.get('/getlocations/:key', cache(10), controller.getLocations);
router.get('/getforecasts/:lat/:lon', cache(10), controller.getForecasts);

module.exports = router;
