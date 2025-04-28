import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";

const initialBills = [
  {
    id: 1,
    patientName: "John Doe",
    billNumber: "BIL-2024-001",
    date: "2024-03-15",
    amount: 1500.00,
    status: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    billNumber: "BIL-2024-002",
    date: "2024-03-16",
    amount: 2500.00,
    status: "Pending",
    paymentMethod: "Insurance",
  },
  {
    id: 3,
    patientName: "Robert Johnson",
    billNumber: "BIL-2024-003",
    date: "2024-03-17",
    amount: 3500.00,
    status: "Overdue",
    paymentMethod: "Cash",
  },
];

export default function BillingManagement() {
  const [bills, setBills] = useState(initialBills);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "",
    billNumber: "",
    date: "",
    amount: "",
    status: "Pending",
    paymentMethod: "",
  });

  const handleOpenDialog = (bill = null) => {
    if (bill) {
      setSelectedBill(bill);
      setFormData(bill);
    } else {
      setSelectedBill(null);
      setFormData({
        patientName: "",
        billNumber: "",
        date: "",
        amount: "",
        status: "Pending",
        paymentMethod: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBill(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (selectedBill) {
      setBills((prev) =>
        prev.map((b) => (b.id === selectedBill.id ? { ...formData, id: b.id } : b))
      );
    } else {
      setBills((prev) => [
        ...prev,
        { ...formData, id: prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1 },
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Overdue":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Billing Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: "#1e3a8a", "&:hover": { bgcolor: "#1e40af" } }}
        >
          Add Bill
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ReceiptIcon sx={{ mr: 1, color: "#1e3a8a" }} />
                    {bill.billNumber}
                  </Box>
                </TableCell>
                <TableCell>{bill.patientName}</TableCell>
                <TableCell>{bill.date}</TableCell>
                <TableCell>
                  ${bill.amount.toFixed(2)}
                </TableCell>
                <TableCell>{bill.paymentMethod}</TableCell>
                <TableCell>
                  <Chip
                    label={bill.status}
                    color={getStatusColor(bill.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(bill)}
                    sx={{ color: "#1e3a8a" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(bill.id)}
                    sx={{ color: "#dc2626" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedBill ? "Edit Bill" : "Add New Bill"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bill Number"
                name="billNumber"
                value={formData.billNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Insurance">Insurance</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#1e3a8a", "&:hover": { bgcolor: "#1e40af" } }}
          >
            {selectedBill ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 