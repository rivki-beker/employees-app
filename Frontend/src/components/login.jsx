import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { runInAction } from "mobx";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput/";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IsConnected } from "../App";

export default function Login() {
  const [OK, SetOK] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const setIsConnected = useContext(IsConnected).setIsConnected;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  async function tryLogin(formData) {
    try {
      const response = await axios.post(
        "https://localhost:7177/api/Auth",
        formData
      );
      runInAction(() => {
        localStorage.setItem("security_token", response.data.token);
        setIsConnected(true);
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      SetOK(false);
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, minWidth: "32ch", width: "30vw" },
        marginTop: "18vh",
        marginBottom: "18vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "50vh",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(tryLogin)}
    >
      <TextField
        {...register("userName", { required: true })}
        label="User name *"
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.userName}
        sx={{
          "& label, & input": {
            color: errors.userName ? "red" : "inherit",
          },
          "& .MuiOutlinedInput-root": {
            borderColor: errors.userName ? "red" : "inherit",
          },
        }}
      />
      {errors.userName && (
        <Typography
          variant="body2"
          sx={{ color: "red", display: "flex", fontSize: "18px" }}
          gutterBottom
        >
          <ErrorOutlineIcon sx={{ marginRight: "3px" }} />
          User name is required field
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{ display: "flex", fontSize: "10px" }}
        gutterBottom
      >
        The user name is boss
      </Typography>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{
            color: errors.password ? "red" : "inherit",
            "&.Mui-focused": {
              color: errors.password ? "red" : "inherit",
            },
          }}
        >
          Password *
        </InputLabel>
        <OutlinedInput
          {...register("password", { required: true })}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          error={!!errors.password}
          sx={{
            "& label, & input": {
              color: errors.password ? "red" : "inherit",
            },
            "& .MuiOutlinedInput-root": {
              borderColor: errors.password ? "red" : "inherit",
            },
          }}
        />
      </FormControl>

      {errors.password && (
        <Typography
          variant="body2"
          sx={{ color: "red", display: "flex", fontSize: "18px" }}
          gutterBottom
        >
          <ErrorOutlineIcon sx={{ marginRight: "3px" }} />
          Password is required field
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{ display: "flex", fontSize: "10px" }}
        gutterBottom
      >
        The password is 123456
      </Typography>
      {!OK && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Incorrect user name or password.
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{
          ":hover": { backgroundColor: "grey" },
          backgroundColor: "#9a074c",
        }}
      >
        Login
      </Button>
    </Box>
  );
}
