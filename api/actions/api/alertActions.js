const Alert = require('../../db/models/alert');

class AlertActions {
    async addAlert(req, res) {
        const { addedAt,
                name,
                startTime,
                approxTime
        } = req.body;

        const alert = new Alert({ 
            addedAt,
            name,
            startTime,
            approxTime
        });
        await alert.save();

        res.status(201).json(alert);
    }

    async getAllAlerts(req, res) {
        let doc;
   
        try {
            doc = await Alert.find({})
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }

    async deleteAlert(req, res) {
        const id = req.params.id;
        await Alert.deleteOne({ _id: id});

        res.sendStatus(204);
    }
}

module.exports = new AlertActions;
