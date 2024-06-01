import Location from '../models/location.js'; 
import { validationResult } from 'express-validator';

// Créer une nouvelle location
export const createLocation = async (req, res) => {
    try {
        const newLocation = new Location(req.body);
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir une location par son ID
export const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une location
export const updateLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une location
export const deleteLocation = async (req, res) => {
    try {

        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Afficher la liste des locations 
export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        console.log("ddddd"+locations)
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};