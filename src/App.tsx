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
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyIcon = (props: { value: string }) => {
  const handleCopyOnClick = () => {
    navigator.clipboard.writeText(props.value);
  };
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="copy content"
        onClick={handleCopyOnClick}
        edge="end"
      >
        <ContentCopyIcon />
      </IconButton>
    </InputAdornment>
  );
};

interface PercentageFieldProps {
  label: string;
  value: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isSelected?: boolean;
}

const PercentageField = (props: PercentageFieldProps) => {
  const { label, value, style, onClick, isSelected } = props;
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type="text"
        value={value}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <CopyIcon value={value} />
          </InputAdornment>
        }
        readOnly
        sx={{...style }}
        onClick={onClick}
      />
    </FormControl>
  );
};

function App() {
  const [totalAmount, setTotalAmount] = useState("");

  const [percentage25, setPercentage25] = useState("");
  const [percentage20, setPercentage20] = useState("");
  const [percentage15, setPercentage15] = useState("");
  const [percentage10, setPercentage10] = useState("");

  const [customPercentage, setCustomPercentage] = useState("5");
  const [percentageCustom, setPercentageCustom] = useState("");

  const [isPercentage25Selected, setIsPercentage25Selected] = useState(false);
  const [isPercentage20Selected, setIsPercentage20Selected] = useState(false);
  const [isPercentage15Selected, setIsPercentage15Selected] = useState(false);
  const [isPercentage10Selected, setIsPercentage10Selected] = useState(false);
  const [isPercentageCustomSelected, setIsPercentageCustomSelected] =
    useState(false);

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

  const getSelectedPercentage = () => {
    if (isPercentage25Selected) {
      return percentage25;
    }
    if (isPercentage20Selected) {
      return percentage20;
    }
    if (isPercentage15Selected) {
      return percentage15;
    }
    if (isPercentage10Selected) {
      return percentage10;
    }
    if (isPercentageCustomSelected) {
      return percentageCustom;
    }
    return "0";
  };

  const selectPercentage = (percentage: string) => {
    deselectAllPercentages();
    switch (percentage) {
      case "25":
        setIsPercentage25Selected(true);
        break;
      case "20":
        setIsPercentage20Selected(true);
        break;
      case "15":
        setIsPercentage15Selected(true);
        break;
      case "10":
        setIsPercentage10Selected(true);
        break;
      case "Custom":
        setIsPercentageCustomSelected(true);
        break;
    }
    return;
  };

  const deselectAllPercentages = () => {
    setIsPercentage25Selected(false);
    setIsPercentage20Selected(false);
    setIsPercentage15Selected(false);
    setIsPercentage10Selected(false);
    setIsPercentageCustomSelected(false);
  };

  const getPercentageResult = (amount: string, percentage: number) =>
    (Number(amount) * percentage).toFixed(2);

  const totalAmountWithTip = !!totalAmount
    ? (Number(totalAmount) + Number(getSelectedPercentage())).toFixed(2)
    : "";

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
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  type="text"
                  value={totalAmount}
                  label="Total Amount"
                  onChange={handleTotalAmountOnChange}
                  sx={{ flex: 1 }}
                />
                <PercentageField
                  label="Total Amount with Tip"
                  value={totalAmountWithTip}
                  style={{ flex: 1 }}
                />
              </Stack>
              <PercentageField
                label="25%"
                value={percentage25}
                onClick={() => selectPercentage("25")}
                isSelected={isPercentage25Selected}
              />
              <PercentageField
                label="20%"
                value={percentage20}
                onClick={() => selectPercentage("20")}
                isSelected={isPercentage20Selected}
              />
              <PercentageField
                label="15%"
                value={percentage15}
                onClick={() => selectPercentage("15")}
                isSelected={isPercentage15Selected}
              />
              <PercentageField
                label="10%"
                value={percentage10}
                onClick={() => selectPercentage("10")}
                isSelected={isPercentage10Selected}
              />
              <Stack spacing={2} direction="row">
                <TextField
                  variant="outlined"
                  type="text"
                  value={customPercentage}
                  label="Custom %"
                  onChange={handleCustomPercentageOnChange}
                  sx={{ flex: 1 }}
                />
                <PercentageField
                  label={`${customPercentage}%`}
                  value={percentageCustom}
                  onClick={() => selectPercentage("Custom")}
                  isSelected={isPercentageCustomSelected}
                  style={{ flex: 1 }}
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
