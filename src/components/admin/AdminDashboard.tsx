import { FC, useState, useEffect } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import { Edit as EditIcon } from "@mui/icons-material";
import { httpClient } from "./axios";
import { User as UserType } from "../navbar/userInterfaces";
import EditUserModal from "./EditUserModal";

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

      {selectedRow && (
        <EditUserModal
          isModalOpen={isModalOpen}
          selectedRow={selectedRow}
          handleCloseModal={handleCloseModal}
          setSelectedRow={setSelectedRow}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
