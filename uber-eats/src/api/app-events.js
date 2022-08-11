const UberEatsService = require('../services/uber-eats-service');

module.exports = (app) => {

    const service = new UberEatsService();

    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("===============  UberEatsService Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}