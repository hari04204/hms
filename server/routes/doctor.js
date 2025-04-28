const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Get doctor dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Verify user is a doctor
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get statistics
    const totalPatients = await Appointment.distinct('patientId', { doctorId: req.user.userId });
    const todayAppointments = await Appointment.countDocuments({
      doctorId: req.user.userId,
      date: today
    });
    const pendingAppointments = await Appointment.countDocuments({
      doctorId: req.user.userId,
      status: 'scheduled'
    });
    const completedAppointments = await Appointment.countDocuments({
      doctorId: req.user.userId,
      status: 'completed'
    });

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      doctorId: req.user.userId,
      date: { $gte: today },
      status: 'scheduled'
    })
    .populate('patientId', 'firstName lastName')
    .sort({ date: 1, time: 1 })
    .limit(5);

    res.json({
      stats: {
        totalPatients: totalPatients.length,
        todayAppointments,
        pendingAppointments,
        completedAppointments
      },
      upcomingAppointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// Get doctor's patients
router.get('/patients', auth, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const patients = await Appointment.distinct('patientId', { doctorId: req.user.userId });
    const patientDetails = await User.find(
      { _id: { $in: patients } },
      'firstName lastName email phoneNumber'
    );

    res.json(patientDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
});

module.exports = router; 