import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

export default function Settings() {
  const [settings, setSettings] = useState({
    hospitalName: "MediCare Hospital",
    address: "123 Medical Center Drive",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 123-4567",
    email: "info@medicarehospital.com",
    website: "www.medicarehospital.com",
    notifications: {
      email: true,
      sms: true,
      appointmentReminders: true,
      billingAlerts: true,
    },
    workingHours: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: { start: "10:00", end: "14:00" },
      sunday: { start: "", end: "" },
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [workingHoursErrors, setWorkingHoursErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const newWorkingHoursErrors = {};
    
    // Basic information validation
    if (!settings.hospitalName.trim()) {
      newErrors.hospitalName = "Hospital name is required";
    }
    
    if (!settings.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!settings.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(settings.phone)) {
      newErrors.phone = "Invalid phone number format";
    }
    
    if (!settings.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!settings.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!settings.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!settings.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(settings.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format";
    }

    // Working hours validation
    Object.entries(settings.workingHours).forEach(([day, hours]) => {
      if (hours.start && hours.end) {
        const startTime = new Date(`2000-01-01T${hours.start}`);
        const endTime = new Date(`2000-01-01T${hours.end}`);
        
        if (startTime >= endTime) {
          newWorkingHoursErrors[day] = "End time must be after start time";
        }
      } else if (hours.start || hours.end) {
        newWorkingHoursErrors[day] = "Both start and end times are required";
      }
    });

    setErrors(newErrors);
    setWorkingHoursErrors(newWorkingHoursErrors);
    return Object.keys(newErrors).length === 0 && Object.keys(newWorkingHoursErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNotificationChange = (name) => (e) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: e.target.checked,
      },
    }));
  };

  const handleWorkingHoursChange = (day, field) => (e) => {
    const value = e.target.value;
    setSettings((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
    }));
    // Clear working hours error when user starts typing
    if (workingHoursErrors[day]) {
      setWorkingHoursErrors((prev) => ({ ...prev, [day]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically make an API call to save the settings
      // const response = await api.saveSettings(settings);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 4 }}>
        Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      {showError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Please check the form for errors and try again.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Hospital Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Hospital Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hospital Name"
                  name="hospitalName"
                  value={settings.hospitalName}
                  onChange={handleInputChange}
                  error={!!errors.hospitalName}
                  helperText={errors.hospitalName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={settings.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={settings.state}
                  onChange={handleInputChange}
                  error={!!errors.state}
                  helperText={errors.state}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zipCode"
                  value={settings.zipCode}
                  onChange={handleInputChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={settings.website}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Notification Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.email}
                      onChange={handleNotificationChange("email")}
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.sms}
                      onChange={handleNotificationChange("sms")}
                    />
                  }
                  label="SMS Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.appointmentReminders}
                      onChange={handleNotificationChange("appointmentReminders")}
                    />
                  }
                  label="Appointment Reminders"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.billingAlerts}
                      onChange={handleNotificationChange("billingAlerts")}
                    />
                  }
                  label="Billing Alerts"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Working Hours */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Working Hours
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(settings.workingHours).map(([day, hours]) => (
                <React.Fragment key={day}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Start Time"
                          type="time"
                          value={hours.start}
                          onChange={handleWorkingHoursChange(day, "start")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!workingHoursErrors[day]}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="End Time"
                          type="time"
                          value={hours.end}
                          onChange={handleWorkingHoursChange(day, "end")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!workingHoursErrors[day]}
                          helperText={workingHoursErrors[day]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {day !== "sunday" && (
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={isLoading}
              sx={{ bgcolor: "#1e3a8a", "&:hover": { bgcolor: "#1e40af" } }}
            >
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
} 