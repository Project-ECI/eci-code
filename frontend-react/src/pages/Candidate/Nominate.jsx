import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import partyService from "../../services/party.service.js";
import getRespectiveDistrict from "../../services/district.service.js";
import getAllStates from "../../services/state.service.js";
import candidateService from "../../services/candidate.service.js";

import { toast } from "react-toastify";

function Nominate() {
  const navigate = useNavigate();
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // cityId

  // Party
  const [partyAll, setParty] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [isIndependent, setIsIndependent] = useState(false);

  // Candidate
  const [candidateId, setCandidateId] = useState("");
  const dto = {
    candidateId,
    party: selectedParty,
    isIndependent,
    constituency: selectedCity,
  };

  // Fetch states and parties
  useEffect(() => {
    const fetchStatesAndParties = async () => {
      try {
        setCandidateId(sessionStorage.getItem("id"));
        const response = await getAllStates();
        setStates(response.data); // Update state with fetched data

        const response1 = await partyService.allParty();
        setParty(response1.data);
        console.log(response1.data);
      } catch (err) {
        console.error("Failed to fetch states or parties:", err);
      }
    };

    fetchStatesAndParties();
  }, []);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity(""); // Reset city selection
    setCities([]); // Clear cities when a new state is selected

    if (stateId) {
      try {
        const response = await getRespectiveDistrict(stateId);
        if (response.data.length === 0) {
          alert("No cities found");
        } else {
          setCities(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value); // Set selectedCity to cityId
  };

  const handleNominationTypeChange = (e) => {
    setIsIndependent(e.target.value === "independent");
    setSelectedParty(""); // Reset party selection if switching types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(dto);
      if (selectedCity && (isIndependent || selectedParty)) {
        const response = await candidateService.nominate(dto);
        console.log(response.data);
        sessionStorage.setItem("constituencyId", selectedCity);
        sessionStorage.setItem("isIndependent", dto.isIndependent);
        sessionStorage.setItem("partyId", dto.selectedParty);

        navigate("/candidate/home");
        toast.success("Your nomination form has been successfully submitted!");
      } else {
        toast.warn(
          "Please fill out all required fields before submitting the form."
        );
      }
    } catch (err) {
      toast.error(
        "Oops! Something went wrong on our end. Please try again later."
      );
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />
        <div className="right-homepage-container">
          {sessionStorage.getItem("constituencyId") ? (
            // if already filled nomination form
            <div className="alert alert-warning" role="alert">
              You have already filled the nomination form.{" "}
              <a href="/candidate/application-status">Click here</a> to see your
              application status.
            </div>
          ) : (
            // if nomination form isn't filled
            <div className="registration-container">
              {/* Left Container */}
              <div className="reg-left-container">
                <img src={image} className="img-fluid" width="320px" alt="" />
              </div>

              {/* Right Container */}
              <div className="reg-right-container">
                <h1 className="font-mont">Nomination Form</h1>

                <form onSubmit={handleSubmit}>
                  {/* State Dropdown */}
                  <div className="form-group mb-3">
                    <select
                      id="state"
                      className="form-control"
                      value={selectedState}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.stateId} value={state.stateId}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>

                    <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                  </div>

                  {/* City Dropdown */}
                  <div className="form-group mb-3">
                    <select
                      id="city"
                      className="form-control"
                      disabled={cities.length === 0}
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.districtId} value={city.districtId}>
                          {city.districtName}
                        </option>
                      ))}
                    </select>
                    <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                  </div>

                  {/* Candidate Type */}
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        checked={isIndependent}
                        onChange={handleNominationTypeChange}
                        type="radio"
                        name="candidateType"
                        value="independent"
                        id="independent"
                      />
                      <label className="form-check-label" htmlFor="independent">
                        Stand as an Independent Candidate
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="party"
                        name="candidateType"
                        value="party"
                        checked={!isIndependent}
                        onChange={handleNominationTypeChange}
                      />
                      <label className="form-check-label" htmlFor="party">
                        Stand from a Party
                      </label>
                    </div>
                  </div>

                  {/* Party Dropdown */}
                  {!isIndependent && (
                    <div className="form-group mb-3">
                      <select
                        id="party"
                        className="form-control"
                        value={selectedParty}
                        onChange={(e) => setSelectedParty(e.target.value)} // Setting selectedParty as partyId
                      >
                        <option value="">Select Party</option>
                        {partyAll.map((p) => (
                          <option key={p.partyId} value={p.partyId}>
                            {p.partyName}
                          </option>
                        ))}
                      </select>
                      <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                    </div>
                  )}

                  {/* Bottom Section */}
                  <button className="btn btn-blue col-12" type="submit">
                    Submit Form
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default Nominate;
