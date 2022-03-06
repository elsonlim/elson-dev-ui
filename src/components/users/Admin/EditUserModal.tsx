import { FC, useState } from "react";
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
  colors,
  LinearProgress,
  Typography,
} from "@mui/material";
import { User as UserType } from "../activeUserInterfaces";
import { httpClient } from "../axios";
import { AxiosError } from "axios";
const features = ["admin", "whoami", "splitTable"];

interface IEditUserModal {
  isModalOpen: boolean;
  userState: UserType;
  handleCloseModal: () => void;
}

interface PatchableUserFields {
  role?: string;
  approved?: boolean;
  apps?: string[];
}

const EditUserModal: FC<IEditUserModal> = ({
  isModalOpen,
  userState: originalUserState,
  handleCloseModal,
}) => {
  const [editUserState, setEditUserState] =
    useState<UserType>(originalUserState);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const saveUser = () => {
    setIsLoading(true);
    setError(undefined);
    const id = editUserState.id;

    httpClient
      .patch(`/admin/users/${id}`, editUserState)
      .then((payload) => {
        const data = { ...payload.data, id: payload.data.id };
        setEditUserState(data);
        // 4. update users
        handleCloseModal();
      })
      .catch((error: AxiosError) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        {isLoading && <LinearProgress color={"info"} />}
        {!!error && <Typography color={"error"}>{error}</Typography>}
        <TextField
          disabled
          label="name"
          variant="standard"
          value={editUserState.name}
        />
        <TextField
          disabled
          label="email"
          value={editUserState.email}
          variant="standard"
        />
        <FormControl variant="standard">
          <InputLabel>Role</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={editUserState.role}
            onChange={(event: SelectChangeEvent) => {
              editUserState &&
                setEditUserState({
                  ...editUserState,
                  role: event.target.value,
                });
            }}
            label="Role"
          >
            {originalUserState.role === "owner" && (
              <MenuItem value={"owner"}>owner</MenuItem>
            )}
            <MenuItem value={"admin"}>admin</MenuItem>
            <MenuItem value={"viewer"}>viewer</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox />}
          checked={editUserState.approved}
          onClick={() =>
            setEditUserState({
              ...editUserState,
              approved: !editUserState.approved,
            })
          }
          label="approved"
        />

        <FormControl>
          <InputLabel id="apps-chip-label">Apps</InputLabel>
          <Select
            labelId="apps-chip-label"
            value={editUserState.apps}
            multiple
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {features.map((name) => {
              const apps = editUserState.apps;
              const containsFeature = apps.includes(name);
              return (
                <MenuItem
                  key={name}
                  value={name}
                  autoFocus={false}
                  sx={
                    containsFeature ? { backgroundColor: colors.blue[50] } : {}
                  }
                  onClick={() => {
                    let updatedApps;
                    if (containsFeature) {
                      updatedApps = apps.filter((item) => item !== name);
                    } else {
                      updatedApps = [...apps, name];
                    }
                    setEditUserState({
                      ...editUserState,
                      apps: updatedApps,
                    });
                  }}
                >
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <ButtonGroup sx={{ marginTop: 6, justifyContent: "right" }}>
          <Button onClick={() => handleCloseModal()} variant="outlined">
            Cancel
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              setEditUserState(originalUserState);
            }}
          >
            Revert
          </Button>

          <Button
            style={{ minWidth: 150 }}
            variant="contained"
            onClick={saveUser}
          >
            Save
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
