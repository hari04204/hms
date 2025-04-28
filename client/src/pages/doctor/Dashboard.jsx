import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doctorAPI } from '../../services/api';
import { fetchAppointmentsStart, fetchAppointmentsSuccess, fetchAppointmentsFailure } from '../../redux/slices/appointmentSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const { loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        dispatch(fetchAppointmentsStart());
        const response = await doctorAPI.getDashboard();
        setStats(response.data.stats);
        setUpcomingAppointments(response.data.upcomingAppointments);
        dispatch(fetchAppointmentsSuccess(response.data.upcomingAppointments));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        dispatch(fetchAppointmentsFailure(error.message));
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Doctor Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalPatients}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{stats.todayAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Pending Appointments</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-medium text-gray-900">Completed Appointments</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.completedAppointments}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No upcoming appointments
            </div>
          ) : (
            upcomingAppointments.map((appointment) => (
              <div key={appointment._id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patientId.firstName} {appointment.patientId.lastName}
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
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
            Add New Patient
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200">
            Schedule Appointment
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200">
            View Medical Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 