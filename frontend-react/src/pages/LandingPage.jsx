import "../css/landingpage.css";

import Navbar1 from "../components/Navbar1";
import Footer1 from "../components/Footer1";

import main_image from "../assets/images/landing-page-main.png";
import indian_map from "../assets/images/india-map.png";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handlePartyReg = () => {
    navigate("/party/registration");
  };
  const handlePartyLogin = () => {
    navigate("/party/login");
  };

  const handleVoterReg = () => {
    navigate("/voter/registration");
  };
  const handleVoterLogin = () => {
    navigate("/voter/login");
  };

  const handleCandidateReg = () => {
    navigate("/candidate/registration");
  };
  const handleCandidateLogin = () => {
    navigate("/candidate/login");
  };

  return (
    <div>
      <Navbar1></Navbar1>
      {/* Introduction */}
      <div className="landing-page-introduction padding-10">
        <div className="introduction-container">
          <p className="introduction-heading font-mont">Election</p>
          <p className="introduction-heading font-mont">Commission</p>
          <p className="introduction-subheading mt-4">
            Safeguarding Democracy,
          </p>
          <p className="introduction-subheading">Ensuring Fair Elections</p>
        </div>
        <img src={main_image} alt="" className="img-fluid" width="320px" />
      </div>

      {/* Login-Register Containers */}
      <div id="user-section" className="user-section-container padding-10">
        <div className="user-section">
          <h1 className="font-mont">Parties</h1>
          <button
            onClick={handlePartyReg}
            type="button"
            className="btn btn-outline-blue"
          >
            Party Registration
          </button>
          <button type="button" className="btn btn-outline-blue">
            Manage Applicants
          </button>
          <button
            onClick={handlePartyLogin}
            type="button"
            className="btn btn-blue"
          >
            Login
          </button>
        </div>

        <div className="user-section">
          <h1 className="font-mont">Voters</h1>
          <button
            onClick={handleVoterReg}
            type="button"
            className="btn btn-outline-blue"
          >
            Register To Vote
          </button>
          <button type="button" className="btn btn-outline-blue">
            Download Voter ID
          </button>
          <button
            onClick={handleVoterLogin}
            type="button"
            className="btn btn-blue"
          >
            Login
          </button>
        </div>
        <div className="user-section">
          <h1 className="font-mont">Candidates</h1>
          <button
            onClick={handleCandidateReg}
            type="button"
            className="btn btn-outline-blue"
          >
            Register as Candidate
          </button>
          <button type="button" className="btn btn-outline-blue">
            Aplication Status
          </button>
          <button
            onClick={handleCandidateLogin}
            type="button"
            className="btn btn-blue"
          >
            Login
          </button>
        </div>
      </div>

      {/* Elections Section */}
      <div className="elections-section">
        <img className="img-fluid" src={indian_map} alt="" width="400px" />
        <div className="election-sections-container">
          <h1 className="font-mont">Upcoming Elections</h1>
          <button type="button" className="btn">
            Madhya Pradesh
          </button>

          <h1 className="mt-4 font-mont">Current Elections</h1>
          <button type="button" className="btn">
            Maharashtra
          </button>

          <h1 className="mt-4 font-mont">Previous Elections</h1>
          <button type="button" className="btn mb-4">
            Andhra Pradesh Pradesh
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer1></Footer1>
    </div>
  );
}

export default LandingPage;
