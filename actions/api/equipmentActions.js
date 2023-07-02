const Equipment = require('../../db/models/equipment');

class EquipmentActions {

    async addEquipment(req, res) {
        const { name,
            amount,
            number,
            status,
            maxAmount,
        } = req.body;

        const equipment = new Equipment({ 
            name,
            amount,
            number,
            status,
            maxAmount,
        });
        await equipment.save();

        res.status(201).json(equipment);
    }

    async getAllEquipment(req, res) {
        let doc;
        let name = req.query.name?.split(',') || ["Kajak", "Wiosło", "Kapok", "Łódka"];
        let status = req.query.status?.split(",") || ["available", "notAvailable"];
        let sortBy = req.query.sort || "type";


        if(sortBy === "type") {
            sortBy = {"name": 1}
        }
        if(sortBy === "status") {
            sortBy = {"status": 1}
        }
        
        try {
            doc = await Equipment.find()
            .where("name")
            .in([...name])
            .where("status")
            .in([...status])
            .sort(sortBy);
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }

    async getEquipmentByNumber(req, res) {
        let doc;
        let name = req.query.name || "";
        let status = req.query.status || "";
        let number = req.query.number;
        
        try {
            doc = await Equipment.find({ name: { $regex: name }, status: { $regex: status }, number: { $eq: number } });
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }

    async editEquipment(req, res) {
        const { name,
            amount,
            number,
            status,
        } = req.body;

        const id = req.params.id;
        const equipment = await Equipment.findOne({ _id: id });
        
        equipment.name = name;
        equipment.amount = amount;
        equipment.number = number;
        equipment.status = status;
       
        await equipment.save();

        res.status(201).json(equipment);
    }

    async deleteEquipment(req, res) {
        const id = req.params.id;
        await Equipment.deleteOne({ _id: id});

        res.sendStatus(204);
    }
}

module.exports = new EquipmentActions;
