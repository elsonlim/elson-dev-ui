import { FC, useState, useEffect } from "react";
import { httpClient } from "./axios";
import { User as UserType } from "../navbar/userInterfaces";
import EditUserModal from "./EditUserModal";
import UserDataGrid from "./UserDataGrid";

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
          selectedRow={selectedRow}
          handleCloseModal={handleCloseModal}
          setSelectedRow={setSelectedRow}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
