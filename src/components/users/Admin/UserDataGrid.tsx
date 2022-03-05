import { FC } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit as EditIcon } from "@mui/icons-material";
import { User as UserType } from "../activeUserInterfaces";

interface IUserDataGrid {
  users: UserType[];
  handleOpenModal: (user: UserType) => void;
}

const UserDataGrid: FC<IUserDataGrid> = ({ users, handleOpenModal }) => {
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
              handleOpenModal(props.row);
            }}
          >
            <EditIcon />
          </div>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  );
};

export default UserDataGrid;
