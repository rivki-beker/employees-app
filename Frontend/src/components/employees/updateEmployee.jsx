import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Alert, AlertTitle } from "@mui/material";
import EmployeeData from "../../data/employeeData";
import RoleNamesData from "../../data/roleNamesData";

const UpdateEmployee = observer((props) => {
  const { employee, setEmployee } = props;
  const [errorMessage, SetErrorMessage] = useState();

  const [firstName, SetFirstName] = useState(employee.firstName);
  const [lastName, SetLastName] = useState(employee.lastName);
  const [identity, SetIdentity] = useState(employee.identity);
  const [startDate, SetStartDate] = useState(employee.startDate);
  const [birthDate, SetBirthDate] = useState(employee.birthDate);
  const [gender, setGender] = useState(
    employee.isMale ? "male" : employee.isMale === false ? "female" : ""
  );
  const [roles, SetRoles] = useState(employee.roles ? employee.roles : []);
  const [status, setStatus] = useState(
    employee.isActive
      ? "active"
      : employee.isActive === false
        ? "notActive"
        : ""
  );

  const navigate = useNavigate();

  async function Save(event) {
    event.preventDefault();
    try {
      if (employee.id) {
        await EmployeeData.updateEmployee(employee.id, {
          firstName,
          lastName,
          identity,
          startDate,
          birthDate,
          isMale: gender === "male" ? true : false,
          roles,
          isActive: status === "active" ? true : false,
        });
      } else {
        await EmployeeData.addEmployee({
          firstName,
          lastName,
          identity,
          startDate,
          birthDate,
          isMale: gender === "male" ? true : false,
          roles,
          isActive: status === "active" ? true : false,
        });
      }
      setEmployee(undefined);
    } catch (error) {
      if (error.status === 401) navigate("/login");
      SetErrorMessage(error.data);
    }
  }

  const ChangeRoleName = action((value, i) => {
    const data = roles.slice();
    data[i].roleNameId = value;
    SetRoles(data);
  });

  const ChangeIsManager = action((value, i) => {
    const data = roles.slice();
    data[i].isManager = value;
    SetRoles(data);
  });

  const ChangeStartDate = action((value, i) => {
    const data = roles.slice();
    data[i].startDate = value;
    SetRoles(data);
  });

  return (
    <Dialog open={true} onClose={() => setEmployee(undefined)}>
      <DialogTitle>Edit Employee</DialogTitle>
      <form onSubmit={Save}>
        <DialogContent>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => SetFirstName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => SetLastName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Identity"
            value={identity}
            onChange={(e) => SetIdentity(e.target.value)}
            required
            fullWidth
            margin="normal"
            inputProps={{ pattern: "[0-9]{9}" }}
            title="Please enter exactly 9 digits."
          />
          <TextField
            label="Start Date"
            type="datetime-local"
            value={startDate}
            onChange={(e) => SetStartDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birth Date"
            type="datetime-local"
            value={birthDate}
            onChange={(e) => SetBirthDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <Typography variant="subtitle1">Gender:</Typography>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                required
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                required
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" margin="normal" required>
            <Typography variant="subtitle1">Status:</Typography>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
                required
              />
              <FormControlLabel
                value="notActive"
                control={<Radio />}
                label="Not Active"
                required
              />
            </RadioGroup>
          </FormControl>
          {roles.map((r, i) => (
            <div
              key={r.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Role {i + 1}:
              </Typography>
              <div style={{ marginBottom: "10px" }}>
                <FormControl fullWidth required>
                  <InputLabel>Select Role Name</InputLabel>
                  <Select
                    value={r.roleNameId}
                    onChange={(e) => ChangeRoleName(e.target.value, i)}
                    required
                  >
                    {RoleNamesData.roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <FormControl component="fieldset" margin="normal">
                  <Typography variant="subtitle1">Role:</Typography>
                  <RadioGroup
                    row
                    aria-label="role"
                    name="role"
                    value={
                      r.isManager
                        ? "Manager"
                        : r.isManager === false
                          ? "Employee"
                          : ""
                    }
                    onChange={(e) =>
                      ChangeIsManager(e.target.value === "Manager", i)
                    }
                  >
                    <FormControlLabel
                      value="Manager"
                      control={<Radio />}
                      label="Manager"
                      required
                    />
                    <FormControlLabel
                      value="Employee"
                      control={<Radio />}
                      label="Employee"
                      required
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                <TextField
                  label="Start Date"
                  type="datetime-local"
                  value={r.startDate ? r.startDate : ""}
                  onChange={(e) => ChangeStartDate(e.target.value, i)}
                  placeholder="Select a Start Date"
                  required
                  fullWidth
                />
              </div>
            </div>
          ))}
          {errorMessage && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#087088",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            type="button"
            onClick={() =>
              SetRoles([
                ...roles,
                {
                  id: (roles.length ? roles[roles.length - 1].id : 0) + 1,
                  roleNameId: "",
                  isManager: undefined,
                },
              ])
            }
            disabled={RoleNamesData.roles.length === 0}
            title={
              RoleNamesData.roles.length === 0
                ? "There is no role name. Add role name."
                : ""
            }
          >
            Add Role
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEmployee(undefined)}
            color="error"
            variant="outlined"
            endIcon={<CancelOutlinedIcon />}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#087088",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default UpdateEmployee;
