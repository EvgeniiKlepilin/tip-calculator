import React, { useState } from "react";

import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";

function App() {

  const [totalAmount, setTotalAmount] = useState("");
  const [percentage25, setPercentage25] = useState("");
  const [percentage20, setPercentage20] = useState("");
  const [percentage15, setPercentage15] = useState("");
  const [percentage10, setPercentage10] = useState("");

  const [customPercentage, setCustomPercentage] = useState("5");
  const [percentageCustom, setPercentageCustom] = useState("");

  const handleTotalAmountOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = event.target.value;
    setTotalAmount(amount);
    setPercentage25(getPercentageResult(amount, 0.25));
    setPercentage20(getPercentageResult(amount, 0.2));
    setPercentage15(getPercentageResult(amount, 0.15));
    setPercentage10(getPercentageResult(amount, 0.1));
    setPercentageCustom(
      getPercentageResult(amount, Number(customPercentage) / 100)
    );
  };

  const handleCustomPercentageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const percentage = event.target.value;
    setCustomPercentage(percentage);
    setPercentageCustom(
      getPercentageResult(totalAmount, Number(percentage) / 100)
    );
  };

  const getPercentageResult = (amount: string, percentage: number) =>
    (Number(amount) * percentage).toFixed(2);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tip Calculator 🧮
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            href="https://github.com/EvgeniiKlepilin/tip-calculator"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Typography variant="h4" textAlign="center">
              Tip Calculator
            </Typography>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                type="text"
                value={totalAmount}
                inputMode="numeric"
                label="Total Amount"
                onChange={handleTotalAmountOnChange}
              />
              <TextField
                variant="outlined"
                value={percentage25}
                label="25%"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                value={percentage20}
                label="20%"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                value={percentage15}
                label="15%"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                value={percentage10}
                label="10%"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  type="tel"
                  value={customPercentage}
                  label="Custom %"
                  onChange={handleCustomPercentageOnChange}
                  sx={{ flex: 1 }}
                />
                <TextField
                  variant="outlined"
                  value={percentageCustom}
                  label={`${customPercentage}%`}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ flex: 1 }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
