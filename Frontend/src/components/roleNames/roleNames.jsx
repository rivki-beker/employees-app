import { useState, useContext } from "react";
import { FixedSizeList } from "react-window";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import roleNamesData from "../../data/roleNamesData";
import AddRoleName from "./addRoleName";
import { IsConnected } from "../../App";
import { ListItem, ListItemText } from "@mui/material";

function renderRow(props) {
  const { index, style } = props;
  const roleName = roleNamesData.roles[index];

  return (
    <ListItem style={style} key={roleName.id} disablePadding>
      <ListItemText primary={roleName.name} />
    </ListItem>
  );
}

const RoleNames = observer(() => {
  const [addRole, SetAddRole] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: "center",
        mt: 4,
        width: "fit-content",
        mx: "auto",
        minHeight: "80vh",
      }}
    >
      <CardHeader title="Position Names in Your Company" />
      <Divider />
      <CardContent>
        <FixedSizeList
          height={400}
          width="100%"
          itemSize={46}
          itemCount={roleNamesData.roles.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </CardContent>
      {useContext(IsConnected).isConnected && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            m: 2,
            textTransform: "lowercase",
            fontSize: "20px",
            backgroundColor: "#9a074c",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
          onClick={() => SetAddRole(true)}
        >
          Add Role Name
        </Button>
      )}
      {addRole && <AddRoleName SetAddRole={SetAddRole} />}
    </Card>
  );
});

export default RoleNames;
