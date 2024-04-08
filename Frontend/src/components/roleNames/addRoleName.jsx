import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RoleNamesData from "../../data/roleNamesData";

export default function AddRoleName({ SetAddRole }) {
  const [roleName, SetRoleName] = useState("");
  const navigate = useNavigate();
  async function Save(event) {
    event.preventDefault();
    try {
      await RoleNamesData.addRole({ name: roleName });
      SetAddRole(false);
    } catch (error) {
      if (error.status === 401) navigate("/login");
      console.error(error);
    }
  }
  return (
    <>
      <Dialog open={true} onClose={() => SetAddRole(false)}>
        <DialogTitle>Add Role Name</DialogTitle>
        <form onSubmit={Save}>
          <DialogContent>
            <TextField
              onChange={(e) => SetRoleName(e.target.value)}
              required
              label="Role Name"
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => SetAddRole(false)}
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
              disabled={!roleName}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
