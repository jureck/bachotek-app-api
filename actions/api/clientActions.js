const Client = require('../../db/models/client');

class ClientActions {
    async addClient(req, res) {
        const { name,
                phone,
                pesel,
                id,
                isDiscount,
        } = req.body;
      
        const client = new Client({ 
            name,
            phone,
            pesel,
            id,
            isDiscount,
        });
        await client.save();

        res.status(201).json(client);
    }

    async getAllClients(req, res) {
        let doc;
        let name = req.query.name || "";
        
        try {
            doc = await Client.find({ name: { $regex: name, $options: 'i' }})
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }


    async getClient(req, res) {
        const id = req.params.id;
        const client = await Client.findOne({ _id: id });
        res.status(200).json(client);
    }

    async editClient(req, res) {
        const { name,
            phone,
            pesel,
            id,
            isDiscount,
        } = req.body;

        const clientId = req.params.id;
        const client = await Client.findOne({ _id: clientId });
        
        client.name = name;
        client.phone = phone;
        client.pesel = pesel;
        client.id = id;
        client.isDiscount = isDiscount;
       
        await client.save();

        res.status(201).json(client);
    }

    async deleteClient(req, res) {
        const id = req.params.id;
        await Client.deleteOne({ _id: id});

        res.sendStatus(204);
    }
}

module.exports = new ClientActions;
