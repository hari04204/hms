const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');

// Get patient dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Verify user is a patient
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      patientId: req.user.userId,
      date: { $gte: today },
      status: 'scheduled'
    })
    .populate('doctorId', 'firstName lastName')
    .sort({ date: 1, time: 1 });

    // Get medical summary
    const recentVisits = await MedicalRecord.countDocuments({
      patientId: req.user.userId,
      visitDate: { $gte: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000) }
    });

    const activePrescriptions = await MedicalRecord.countDocuments({
      patientId: req.user.userId,
      'medications.duration': { $exists: true }
    });

    const upcomingTests = await MedicalRecord.countDocuments({
      patientId: req.user.userId,
      'labResults.date': { $gte: today }
    });

    res.json({
      upcomingAppointments,
      medicalSummary: {
        recentVisits,
        activePrescriptions,
        upcomingTests
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// Get patient's medical records
router.get('/records', auth, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const records = await MedicalRecord.find({ patientId: req.user.userId })
      .populate('doctorId', 'firstName lastName')
      .sort({ visitDate: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical records', error: error.message });
  }
});

// Get patient's prescriptions
router.get('/prescriptions', auth, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const records = await MedicalRecord.find({
      patientId: req.user.userId,
      'medications.0': { $exists: true }
    })
    .populate('doctorId', 'firstName lastName')
    .select('medications visitDate doctorId')
    .sort({ visitDate: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
});

module.exports = router; 