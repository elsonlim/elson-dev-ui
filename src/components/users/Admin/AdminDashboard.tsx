import { FC, useState, useEffect } from "react";
import { httpClient } from "../axios";
import { User as UserType } from "../activeUserInterfaces";
import EditUserModal from "./EditUserModal";
import UserDataGrid from "./UserDataGrid";

const AdminDashboard: FC = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserType>();
  const [users, setUsers] = useState();

  useEffect(() => {
    httpClient.get("/user", { withCredentials: true }).then((res) => {
      setUser(res.data.name);
    });

    httpClient.get("/admin/users", { withCredentials: true }).then((res) => {
      const users = res.data.map((data: any) => {
        data.id = data._id;
        return data;
      });

      setUsers(users);
    });
  }, []);

  const handleOpenModal = (user: UserType) => {
    setModalOpen(true);
    setSelectedRow(user);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(undefined);
  };

  return (
    <div style={{ height: "300px" }}>
      {users && (
        <UserDataGrid users={users} handleOpenModal={handleOpenModal} />
      )}

      {selectedRow && (
        <EditUserModal
          isModalOpen={isModalOpen}
          userState={selectedRow}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
