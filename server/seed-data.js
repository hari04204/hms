const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const MedicalRecord = require('./models/MedicalRecord');

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await MedicalRecord.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create admin user
    const admin = await User.create({
      email: 'admin@hms.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });
    console.log('✅ Created admin user');

    // Create doctors
    const doctors = await User.create([
      {
        email: 'dr.smith@hms.com',
        password: 'doctor123',
        firstName: 'John',
        lastName: 'Smith',
        role: 'doctor',
        phoneNumber: '123-456-7890',
        address: {
          street: '123 Medical Center Dr',
          city: 'Boston',
          state: 'MA',
          zipCode: '02108'
        }
      },
      {
        email: 'dr.johnson@hms.com',
        password: 'doctor123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'doctor',
        phoneNumber: '123-456-7891',
        address: {
          street: '456 Health Ave',
          city: 'Boston',
          state: 'MA',
          zipCode: '02109'
        }
      }
    ]);
    console.log('✅ Created doctor users');

    // Create patients
    const patients = await User.create([
      {
        email: 'patient1@hms.com',
        password: 'patient123',
        firstName: 'Alice',
        lastName: 'Brown',
        role: 'patient',
        phoneNumber: '123-456-7892',
        dateOfBirth: new Date('1990-01-15'),
        address: {
          street: '789 Patient St',
          city: 'Boston',
          state: 'MA',
          zipCode: '02110'
        }
      },
      {
        email: 'patient2@hms.com',
        password: 'patient123',
        firstName: 'Bob',
        lastName: 'Wilson',
        role: 'patient',
        phoneNumber: '123-456-7893',
        dateOfBirth: new Date('1985-05-20'),
        address: {
          street: '321 Health Way',
          city: 'Boston',
          state: 'MA',
          zipCode: '02111'
        }
      }
    ]);
    console.log('✅ Created patient users');

    // Create appointments
    const appointments = await Appointment.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        date: new Date('2024-02-20'),
        time: '09:00',
        status: 'scheduled',
        reason: 'Annual checkup'
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        date: new Date('2024-02-21'),
        time: '10:30',
        status: 'scheduled',
        reason: 'Follow-up consultation'
      },
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        date: new Date('2024-02-15'),
        time: '14:00',
        status: 'completed',
        reason: 'Regular checkup',
        notes: 'Patient is doing well'
      }
    ]);
    console.log('✅ Created appointments');

    // Create medical records
    const medicalRecords = await MedicalRecord.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        visitDate: new Date('2024-02-15'),
        diagnosis: 'Healthy',
        symptoms: ['None'],
        medications: [
          {
            name: 'Vitamin D',
            dosage: '1000 IU',
            frequency: 'Daily',
            duration: '30 days'
          }
        ],
        labResults: [
          {
            testName: 'Blood Test',
            result: 'Normal',
            date: new Date('2024-02-15'),
            notes: 'All values within normal range'
          }
        ],
        notes: 'Patient is in good health'
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        visitDate: new Date('2024-02-10'),
        diagnosis: 'Hypertension',
        symptoms: ['High blood pressure', 'Headaches'],
        medications: [
          {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Daily',
            duration: '90 days'
          }
        ],
        labResults: [
          {
            testName: 'Blood Pressure',
            result: '140/90',
            date: new Date('2024-02-10'),
            notes: 'Slightly elevated'
          }
        ],
        notes: 'Follow-up in 3 months'
      }
    ]);
    console.log('✅ Created medical records');

    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 