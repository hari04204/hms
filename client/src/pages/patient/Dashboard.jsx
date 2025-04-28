import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalSummary, setMedicalSummary] = useState({
    recentVisits: 0,
    activePrescriptions: 0,
    upcomingTests: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/patient/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUpcomingAppointments(response.data.upcomingAppointments);
        setMedicalSummary(response.data.medicalSummary);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h1>
      
      {/* Medical Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Recent Visits</h3>
          <p className="text-3xl font-bold text-blue-600">{medicalSummary.recentVisits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Prescriptions</h3>
          <p className="text-3xl font-bold text-green-600">{medicalSummary.activePrescriptions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Tests</h3>
          <p className="text-3xl font-bold text-yellow-600">{medicalSummary.upcomingTests}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Book Appointment
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            View Medical Records
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
            Request Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 