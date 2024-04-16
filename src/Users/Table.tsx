import React, { useState, useEffect } from "react";
import { BsPencil,BsFillCheckCircleFill, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER" });

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) =>
        (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const [role, setRole] = useState("USER");
  const fetchUsersByRole = async (role: string) => {
    if (role === "User") {
      fetchUsers();
    } else {
      const users = await client.findUsersByRole(role);
      setRole(role);
      setUsers(users);
    }
  };


  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
        <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-control w-25 float-end mt-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      
      <h1>User Table</h1>
      <div className="table-responsive">
        <table className="table">

        <thead>
        <tr>
        <th className="align-middle" style={{ width: "20%" }}>Username & Password </th>
        <th className="align-middle" style={{ width: "20%" }}>First Name</th>
        <th className="align-middle" style={{ width: "20%" }}>Last Name</th>
        <th className="align-middle" style={{ width: "20%" }}>Role</th>
        <th className="align-middle" style={{ width: "20%" }}> Add/Edit User </th>
          </tr>         
          <tr>   
          <td className="align-middle" >
          <input type="text" className="form-control w-50 d-inline-block me-2" value={user.username} onChange={(e) =>
                setUser({ ...user, username: e.target.value })}placeholder="Username"/>
              <input type="text" className="form-control w-50 d-inline-block"value={user.password} onChange={(e) =>
                setUser({ ...user, password: e.target.value })} placeholder="Password"/>
            </td>
            <td className="align-middle">
              <input type="text" className="form-control"value={user.firstName} onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })} placeholder="First Name"/>
            </td>
            <td className="align-middle">
              <input type="text" className="form-control" value={user.lastName} onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })} placeholder="Last Name"/>
            </td>
            <td className="align-middle">
              <select className="form-control" value={user.role} onChange={(e) =>
                setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td className="text-nowrap align-middle">
              <button className="btn fs-2 me-3 p-0" onClick={updateUser} >
                <BsFillCheckCircleFill className="text-success"/>
              </button>
              <button className="btn fs-2 me-2 p-0 align-middle" onClick={createUser}>
                <BsPlusCircleFill style={{ cursor: 'pointer' }} />
              </button>
            </td>
          </tr>
          </thead>
          <thead>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td className= "text-nowrap">                
              <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2">
                <BsPencil onClick={() => selectUser(user)} />
              </button>
              </td>
            </tr>))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
