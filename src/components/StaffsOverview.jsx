// TODO Add pagination on the table

import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames/bind";
import { CiEdit } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styles from "./StaffsOverview.module.scss";
import getAllUsers from "../apis/getAllUsers";
import AuthContext from "../context/AuthContext";

import Button from "./Button";
import Modal from "./Modal";
import resetPassword from "../apis/resetPassword";
import LoaderSpinner from "./LoaderSpinner";

const cx = classnames.bind(styles);

function StaffsOverview() {
  const [users, setUsers] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalSuccessMessage, setModalSuccessMessage] = useState("");
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const { jwtToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenModal = (user) => {
    setEditModalIsOpen(true);
    setSelectedUser(user);
  };
  const handleCloseModal = () => {
    setEditModalIsOpen(false);
    setSelectedUser(null);
    setModalSuccessMessage("");
    setModalErrorMessage("");
  };

  useEffect(() => {
    async function asyncWrapper() {
      const responseText = await getAllUsers(jwtToken);
      if (responseText.status === "success") {
        setUsers(responseText.data);
      }
    }
    asyncWrapper();
  }, [jwtToken]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllUsers", jwtToken],
    queryFn: () => getAllUsers(jwtToken),
    select: (data) => data.data,
    enabled: !!jwtToken, // Only run the query if jwtToken exists
  });

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) setUsers(data); // Update users state with the fetched data
    }
  }, [data]);

  const {
    data: passwordResetResponse,
    status,
    mutate: initiateResetPassword,
  } = useMutation({
    mutationFn: ({ payload, jwtToken }) => {
      setModalSuccessMessage("");
      setModalErrorMessage("");
      return resetPassword(payload, jwtToken);
    },
    onSuccess: (data) => {
      console.log("Password reset successfully");
      setModalSuccessMessage("Password reset successfully");
    },
    onError: (error) => {
      console.error("Error resetting password:", error.message);
      setModalErrorMessage(error.message);
    },
    onMutate: ({ payload }) => {
      console.log("Resetting password...");
    },
  });

  return (
    <section className={cx("staffs-overview")}>
      <header className={cx("header")}>
        <h2> Office staff&apos;s description</h2>
        <div className={cx("button-container")}>
          {/*//TODO Create a modal to add a new staff.   */}
          <Button
            className={"primary small-padding rounded"}
            onClick={() => navigate("./add")}
          >
            <IoAddSharp />
            <span> Add staff</span>
          </Button>
        </div>
      </header>
      <main className={cx("main")}>
        {isLoading ? (
          "loading..."
        ) : error ? (
          "error"
        ) : (
          <table className={cx("table")}>
            <thead className={cx("table-head")}>
              <tr className={cx("tr")}>
                <th>SN</th>
                <th>Staff&apos;s Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>System User</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className={cx("table-body")}>
              {users.map((user, index) => (
                <tr key={`${user.id}..${index}`} className={cx("tr")}>
                  <td>{index + 1}</td>
                  <td className={cx("name")}>
                    {user.first_name}&nbsp;{user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.role === "SUPER_ADMIN" ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      className={"gray small-padding small-font"}
                      onClick={(e) => handleOpenModal(user)}
                    >
                      <CiEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Modal isOpen={editModalIsOpen} onClose={handleCloseModal}>
        <div className={cx("modal")}>
          <header className={cx("modal_header")}>
            <h3 className={cx("modal_h3")}>
              Reset password
              <span className={cx("name")}>
                {selectedUser
                  ? ` of ${selectedUser.first_name} ${selectedUser.last_name}`
                  : ""}
              </span>
            </h3>
            <div className={cx("api-wrapper")}>
              <Button
                className={"small rounded submit"}
                onClick={() =>
                  initiateResetPassword({
                    payload: { userId: selectedUser.user_id },
                    jwtToken,
                  })
                }
              >
                Reset
              </Button>

              <LoaderSpinner state={status} />
            </div>
          </header>
          <main className={cx("main")}>
            <div className={cx("message")}>
              <div className={cx("success")}>{modalSuccessMessage}</div>
              <div className={cx("error")}>{modalErrorMessage}</div>
            </div>
          </main>
        </div>
      </Modal>
    </section>
  );
}

export default StaffsOverview;
