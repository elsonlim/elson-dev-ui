import react, { FC } from "react";
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
import { User as UserType } from "../navbar/userInterfaces";

interface IEditUserModal {
  isModalOpen: boolean;
  selectedRow: UserType;
  handleCloseModal: () => void;
  setSelectedRow: (user: UserType) => void;
}

const EditUserModal: FC<IEditUserModal> = ({
  isModalOpen,
  handleCloseModal,
  selectedRow,
  setSelectedRow,
}) => {
  return (
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
  );
};

export default EditUserModal;
