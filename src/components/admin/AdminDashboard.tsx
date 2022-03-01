import { FC, useState, useEffect } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  InputLabel,
  Modal,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  Input,
  Chip,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { httpClient } from "./axios";
import { User as UserType } from "../navbar/userInterfaces";

const AdminDashboard: FC = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserType>();
  const [users, setUsers] = useState();
  useEffect(() => {
    httpClient.get("/user", { withCredentials: true }).then((res) => {
      console.log(res.data);
      setUser(res.data.name);
    });
    httpClient.get("/admin/users", { withCredentials: true }).then((res) => {
      const users = res.data.map((data: any) => {
        data.id = data._id;
        return data;
      });
      console.log(users);
      setUsers(users);
    });
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "approved",
      headerName: "Approved",
      width: 100,
      type: "boolean",
    },
    { field: "apps", headerName: "Apps", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (props: GridRenderCellParams) => {
        return (
          <div
            onClick={() => {
              setModalOpen(true);
              setSelectedRow(props.row);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(undefined);
  };
  return (
    <div style={{ height: "300px" }}>
      {users && (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            minHeight: 200,
            padding: 2,
            backgroundColor: "#FFF",
            borderRadius: "0.5em",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            disabled
            label="name"
            variant="standard"
            value={selectedRow?.name}
          />
          <TextField
            disabled
            label="email"
            value={selectedRow?.email}
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel>Role</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedRow?.role}
              onChange={(event: SelectChangeEvent) => {
                selectedRow &&
                  setSelectedRow({ ...selectedRow, role: event.target.value });
              }}
              label="Role"
            >
              {selectedRow?.role === "owner" && (
                <MenuItem value={"owner"}>owner</MenuItem>
              )}
              <MenuItem value={"admin"}>admin</MenuItem>
              <MenuItem value={"viewer"}>viewer</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox />}
            checked={selectedRow?.approved}
            label="approved"
          />
          <FormControl>
            <InputLabel id="apps-chip-label">Apps</InputLabel>
            <Select
              labelId="apps-chip-label"
              value={selectedRow?.apps}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["admin", "whoami", "splitTable"].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ButtonGroup sx={{ justifyContent: "right" }}>
            <Button onClick={() => handleCloseModal()} variant="outlined">
              Cancel
            </Button>
            <Button variant="outlined">Revert</Button>
            <Button style={{ minWidth: 150 }} variant="contained">
              Save
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
