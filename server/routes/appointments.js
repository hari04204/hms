const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Get all appointments for a user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { patientId: req.user.userId },
        { doctorId: req.user.userId }
      ]
    })
    .populate('patientId', 'firstName lastName')
    .populate('doctorId', 'firstName lastName')
    .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Create new appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    
    const appointment = new Appointment({
      patientId: req.user.userId,
      doctorId,
      date,
      time,
      reason
    });

    await appointment.save();
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patientId', 'firstName lastName')
      .populate('doctorId', 'firstName lastName');

    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is authorized to update
    if (appointment.patientId.toString() !== req.user.userId && 
        appointment.doctorId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate('patientId', 'firstName lastName')
    .populate('doctorId', 'firstName lastName');

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
});

// Delete appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is authorized to delete
    if (appointment.patientId.toString() !== req.user.userId && 
        appointment.doctorId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await appointment.remove();
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
});

module.exports = router; 