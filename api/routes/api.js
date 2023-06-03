const express = require('express');
const router = express.Router();

const reservationActions = require('../actions/api/reservationActions');
const clientActions = require('../actions/api/clientActions');
const equipmentActions = require('../actions/api/equipmentActions');
const alertActions = require('../actions/api/alertActions');
const settingsActions = require('../actions/api/settingsActions');

//RESERVATIONS
// pobieranie rezerwacji
router.get('/reservations', reservationActions.getAllReservations);
// pobieranie konkretnej rezerwacji
router.get('/reservations/:id', reservationActions.getReservation);
// dodawanie rezerwacji
router.post('/reservations', reservationActions.addReservation);
// edytowanie rezerwacji
router.put('/reservations/:id', reservationActions.editReservation);
// usuwanie rezerwacji
router.delete('/reservations/:id', reservationActions.deleteReservation);

//CLIENTS
// pobieranie klientów
router.get('/clients', clientActions.getAllClients);
// pobieranie konkretnego klienta
router.get('/clients/:id', clientActions.getClient);
// dodawanie klienta
router.post('/clients', clientActions.addClient);
// edytowanie klienta
router.put('/clients/:id', clientActions.editClient);
// usuwanie klienta
router.delete('/clients/:id', clientActions.deleteClient);


//EQUIPMENT
// pobieranie sprzetów
router.get('/equipment', equipmentActions.getAllEquipment);
// pobieranie sprzetów wg numeru
router.get('/equipment/number', equipmentActions.getEquipmentByNumber);
// dodawanie sprzetu
router.post('/equipment', equipmentActions.addEquipment);
// edytowanie sprzetu
router.put('/equipment/:id', equipmentActions.editEquipment);
// usuwanie sprzetu
router.delete('/equipment/:id', equipmentActions.deleteEquipment);

//ALERTS
// pobieranie alertów
router.get('/alerts', alertActions.getAllAlerts);
// dodawanie alertu
router.post('/alerts', alertActions.addAlert);
// usuwanie alertu
router.delete('/alerts/:id', alertActions.deleteAlert);

//SETTINGS
// pobieranie ustawień
router.get('/settings', settingsActions.getAllSettings);
// edytowanie ustawień
router.put('/settings/:id', settingsActions.editSettings);

module.exports = router;