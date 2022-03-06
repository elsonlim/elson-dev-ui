import { FC, useState } from "react";
import { User as UserType } from "../activeUserInterfaces";
import EditUserModal from "./EditUserModal";
import UserDataGrid from "./UserDataGrid";
import { getUsersState } from "../usersUseAction";
import { compose } from "redux";
import { withData, withLoader } from "../WithLoader";
import { getUsers } from "../usersActions";

const AdminDashboard: FC = (props: any) => {
  const { data } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserType>();
  const users = data;

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
export default compose(
  withData(getUsersState, getUsers),
  withLoader
)(AdminDashboard);
