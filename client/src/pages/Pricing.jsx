import React from "react";
import { Card, CardContent, CardHeader, Typography, Button, Grid, Box } from "@mui/material";

const pricingPlans = [
  {
    title: "Basic",
    price: "$9.99/mo",
    features: ["1 User", "Basic Support", "10GB Storage"],
  },
  {
    title: "Pro",
    price: "$19.99/mo",
    features: ["5 Users", "Priority Support", "100GB Storage"],
    recommended: true, // Highlights this plan
  },
  {
    title: "Enterprise",
    price: "$49.99/mo",
    features: ["Unlimited Users", "24/7 Support", "1TB Storage"],
  },
];

export default function Pricing() {
  return (
    <Box sx={{ py: 6, px: 3, textAlign: "center", backgroundColor: "#f8f9fa" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Simple and transparent pricing for everyone.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {pricingPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: plan.recommended ? "0px 4px 15px rgba(0, 0, 255, 0.3)" : "none",
                border: plan.recommended ? "2px solid blue" : "none",
                textAlign: "center",
                p: 3,
                backgroundColor: "#fff",
              }}
            >
              <CardHeader
                title={plan.title}
                titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                sx={{
                  backgroundColor: plan.recommended ? "#e3f2fd" : "#f5f5f5",
                  py: 2,
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <CardContent>
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {plan.price}
                </Typography>
                <Box component="ul" sx={{ listStyleType: "none", p: 0, mt: 2 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Typography variant="body1" color="textSecondary">
                        ✅ {feature}
                      </Typography>
                    </li>
                  ))}
                </Box>
                <Button
                  variant={plan.recommended ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
