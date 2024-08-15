import image from "../../assets/images/image-for-registrationpage.png";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import voterService from "../../services/voter.service.js";
import { useNavigate } from "react-router-dom";

function VoterSettings() {
  const navigate = useNavigate();
  // Show and hide password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  //for password toggle
  const [toggle, setToggle] = useState(false);
  //for dto
  const [voterId, setVoterId] = useState("");
  const dto = {
    voterId,
    oldPassword,
    newPassword,
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const onClickChangePass = () => {
    setToggle(!toggle);
  };
  const handleSubmit = async (event) => {
    const id = sessionStorage.getItem("id");
    setVoterId(id);
    event.preventDefault();
    try {
      const response = await voterService.changePass(dto);
      if (response.data === "success") {
        alert("Password Change Successfully");
        navigate("/voter/settings");
        setOldPassword("");
        setNewPassword("");
        setToggle(!toggle);
      } else {
        alert("Fail");
        navigate("/voter/settings");
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <div className="registration-container">
            <div className="reg-left-container">
              <img src={image} className="img-fluid" width="320px" alt="" />
            </div>

            <div className="reg-right-container">
              <h1 className="font-mont">Account Settings</h1>

              <div className="form-group mb-3">
                <button className="btn btn-blue col-12" type="button">
                  Enable 2FA
                </button>
              </div>

              <div className="form-group mb-3">
                <button
                  className="btn btn-blue col-12"
                  type="button"
                  onClick={onClickChangePass}
                >
                  Change Password
                </button>
              </div>

              <div className="form-group mb-3">
                <button className="btn btn-danger col-12" type="button">
                  Delete Account
                </button>
              </div>
              {toggle && (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="old-password">Old Password</label>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="old-password"
                      value={oldPassword}
                      className="form-control"
                      placeholder="Enter Old Password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={toggleOldPasswordVisibility}
                      className="password-toggle-btn"
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="new-password">New Password</label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="new-password"
                      value={newPassword}
                      className="form-control"
                      placeholder="Enter New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="password-toggle-btn"
                      onChange={(e) => setNewPassword(e.target.value)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <button className="btn btn-success col-12" type="submit">
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </React.Fragment>
  );
}

export default VoterSettings;
