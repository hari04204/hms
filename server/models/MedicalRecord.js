const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  symptoms: [String],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  labResults: [{
    testName: String,
    result: String,
    date: Date,
    notes: String
  }],
  notes: String,
  followUpDate: Date,
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema); 