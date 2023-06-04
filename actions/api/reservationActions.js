const Reservation = require('../../db/models/reservation');

class ReservationActions {
    async addReservation(req, res) {
        const { status,
                addedAt,
                startDay,
                clientId,
                equipment,
                startDate,
                approxDate,
                endDate,
                cost,
                paid,
                comments, } = req.body;

        const reservation = new Reservation({
            status,
            addedAt,
            startDay,
            clientId,
            equipment,
            startDate,
            approxDate,
            endDate,
            cost,
            paid,
            comments,
        });
        await reservation.save();

        res.status(201).json(reservation);
    }

    async getAllReservations(req, res) {
        let doc;
        let dayFilter = req.query.date || '';
        let statusFilter = req.query.status?.split(",") || ["open", "close", "planned"];
        let equipmentFilter = req.query.equipment?.split(',') || ["Kajak", "Wiosło", "Kapok", "Łódka"];
        let paidFilter = req.query.paid === 'true' ? ">=" : "<";
        let clientFilter = req.query.client || "";
        let sortBy = req.query.sort || "new";

        if(!req.query.paid || req.query.paid === "all") {
            paidFilter = "<=";
        }
    
        if(sortBy === "new") {
            sortBy = {"startDate": 1}
        }
        if(sortBy === "old") {
            sortBy = {"startDate": -1}
        }
        if(sortBy === "status") {
            sortBy = {"status": -1}
        }
        
        try {
            doc = await Reservation.find({ clientId: { $regex: clientFilter } })
            .where("startDay")
            .equals(dayFilter)
            .where("equipment.type")
            .in([...equipmentFilter])
            .where("status")
            .in([...statusFilter])
            .sort(sortBy);
              
        } catch(err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(doc);
    }


    async getReservation(req, res) {
        const id = req.params.id;
        const reservation = await Reservation.findOne({ _id: id });
        res.status(200).json(reservation);
    }

    async editReservation(req, res) {
        const { status,
                addedAt,
                startDay,
                clientId,
                equipment,
                startDate,
                approxDate,
                endDate,
                cost,
                paid,
                comments, } = req.body;

        const id = req.params.id;
        const reservation = await Reservation.findOne({ _id: id });
        
        reservation.status = status;
        reservation.addedAt = addedAt;
        reservation.clientId = clientId;
        reservation.equipment = equipment;
        reservation.startDate = startDate;
        reservation.approxDate = approxDate;
        reservation.endDate = endDate;
        reservation.cost = cost;
        reservation.paid = paid;
        reservation.comments = comments;
        reservation.startDay = startDay;
       
        
        await reservation.save();

        res.status(201).json(reservation);
    }
    async deleteReservation(req, res) {
        const id = req.params.id;
        await Reservation.deleteOne({ _id: id});

        res.sendStatus(204);
    }
}

module.exports = new ReservationActions;
