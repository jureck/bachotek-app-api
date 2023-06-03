const Setting = require('../../db/models/settings');

class SettingsActions {

    async getAllSettings(req, res) {
        let doc;
        
        try {
            doc = await Setting.find({})
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }

    async editSettings(req, res) {
        const { priceList,
                alertTime
        } = req.body;

        const id = req.params.id;
        const setting = await Setting.findOne({ _id: id });
        
        setting.priceList = priceList;
        setting.alertTime = alertTime;
       
        await setting.save();

        res.status(201).json(setting);
    }
}

module.exports = new SettingsActions;
