import { FC, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { httpClient } from "./axios";

const AdminDashboard: FC = () => {
  const [user, setUser] = useState();
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
    { field: "role", headerName: "Role", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "approved", headerName: "Approved", width: 100 },
  ];

  return (
    <div style={{ height: "300px" }}>
      {users && (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default AdminDashboard;
