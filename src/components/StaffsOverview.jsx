// TODO Add pagination on the table

import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames/bind";
import { CiEdit } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";

import styles from "./StaffsOverview.module.scss";
import getAllUsers from "../apis/getAllUsers";
import AuthContext from "../context/AuthContext";

import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
const cx = classnames.bind(styles);

function StaffsOverview() {
  const [users, setUsers] = useState([]);
  const { jwtToken } = useContext(AuthContext);

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

  return (
    <section className={cx("staffs-overview")}>
      <header className={cx("header")}>
        <h2> Office staff&apos;s description</h2>
        <div className={cx("button-container")}>
          {/*//TODO Create a modal to add a new staff.   */}
          <Button className={"primary small-padding rounded"}>
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
                <tr key={user.id + index} className={cx("tr")}>
                  <td>{index + 1}</td>
                  <td className={cx("name")}>
                    {user.first_name}&nbsp;{user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.role === "SUPER_ADMIN" ? "Yes" : "No"}</td>
                  <td>
                    <Button className={"gray small-padding small-font"}>
                      <CiEdit />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </section>
  );
}

export default StaffsOverview;
