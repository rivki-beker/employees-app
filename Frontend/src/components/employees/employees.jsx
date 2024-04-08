import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { Box, IconButton, Button, InputBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import UpdateEmployee from "./updateEmployee";
import EmployeeData from "../../data/employeeData";
import { IsConnected } from "../../App";

const Employees = observer(() => {
  const [employee, setEmployee] = useState(undefined);
  const [filter, setFilter] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await EmployeeData.getEmployees();
        runInAction(() => {
          const filteredData = EmployeeData.employees.filter(
            (e) =>
              e.isActive &&
              (e.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                e.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                e.identity.toLowerCase().includes(filter.toLowerCase()) ||
                e.startDate.toLowerCase().includes(filter.toLowerCase()))
          );
          setFilteredEmployees(filteredData);
        });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, [filter, employee]);

  const deleteEmployee = async (employee) => {
    try {
      await EmployeeData.deleteEmployee(employee);
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== employee.id)
      );
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error deleting employee:", error);
    }
  };

  function DownloadExcel() {
    const headers =
      "ID,First Name,Last Name,Identity,Start Date,Birth Date,Is Male,Number of Roles,IsActive";
    const csvData = EmployeeData.employees.map((employee) => {
      return {
        ID: employee.id,
        "First Name": employee.firstName,
        "Last Name": employee.lastName,
        Identity: employee.identity,
        "Start Date": employee.startDate,
        "Birth Date": employee.birthDate,
        "Is Male": employee.isMale,
        "Number of Roles": employee.roles.length,
        IsActive: employee.isActive,
      };
    });

    const csv = [
      headers,
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "employees.csv";
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
  }

  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "identity",
      headerName: "Identity",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start date",
      type: "Date",
      flex: 1,
      sortable: true,
      sortComparator: (v1, v2) => {
        const date1 = new Date(v1);
        const date2 = new Date(v2);
        return date1.getTime() - date2.getTime();
      },
    },
  ];

  if (useContext(IsConnected).isConnected) {
    columns.push(
      {
        field: "edit",
        headerName: "Edit",
        flex: 1,
        renderCell: (params) => (
          <IconButton onClick={() => setEmployee(params.row)} aria-label="edit">
            <EditIcon />
          </IconButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        flex: 1,
        renderCell: (params) => (
          <IconButton
            onClick={() => deleteEmployee(params.row)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        ),
      }
    );
  }

  const rows = filteredEmployees;
  const getRowId = (row) => `${row.id}`;

  return (
    <Box sx={{ textAlign: "center", mt: 4, minHeight: "80vh" }}>
      <Button
        variant="contained"
        startIcon={<CloudDownloadIcon />}
        sx={{
          m: 2,
          textTransform: "lowercase",
          fontSize: "20px",
          backgroundColor: "#9a074c",
          "&:hover": {
            backgroundColor: "grey",
          },
        }}
        onClick={DownloadExcel}
      >
        Download Excel
      </Button>
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
          onClick={() =>
            setEmployee({
              firstName: "",
              lastName: "",
              identity: "",
              startDate: "",
              birthDate: "",
              isMale: undefined,
              isActive: undefined,
            })
          }
        >
          Add Employee
        </Button>
      )}
      <InputBase
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        startAdornment={<SearchIcon />}
        sx={{
          m: 2,
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          width: "300px",
        }}
      />
      <Box sx={{ height: 400, width: "80%", mx: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={getRowId}
        />
      </Box>
      {employee && (
        <UpdateEmployee employee={employee} setEmployee={setEmployee} />
      )}
    </Box>
  );
});

export default Employees;
