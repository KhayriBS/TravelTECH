import express from 'express';
import { body } from 'express-validator';
import { createLocation, getLocationById, updateLocation, deleteLocation ,getLocations} from '../controllers/location.js'; // Assurez-vous que le chemin d'importation est correct

const router = express.Router();
router.post('/add', createLocation)
router.get('/listedelocation', getLocations);
router.get('/getbyid/:id', getLocationById);

router.put('/update/:id', updateLocation);

router.delete('/delete/:id', deleteLocation);


export default router;
