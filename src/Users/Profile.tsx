import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTable from "./Table";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER"
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    console.log(account);
    setProfile(account);
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Profile</h1>
      <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning mb-3 w-100">
        Manage Users
      </Link>
      {profile && (
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-select"
              id="role"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="button" onClick={save}>Save</button>
            <button className="btn btn-danger" type="button" onClick={signout}>Sign Out</button>
          </div>
        </form>
      )}
    </div>
  );
}
