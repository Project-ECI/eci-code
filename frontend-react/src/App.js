import "./App.css";

import LandingPage from "./pages/LandingPage";

import VoterRegPage from "./pages/Voter/VoterRegistration";
import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterHomepage from "./pages/Voter/VoterHomepage";
import KnowYourCandidate from "./pages/Voter/KnowYourCandidate";
import VotingPage from "./pages/Voter/VotingPage";
import SearchInElectoralRoll from "./pages/Voter/SearchInElectoralRoll";
import VoterFeedback from "./pages/Voter/VoterFeedback";
import VoterComplaint from "./pages/Voter/VoterComplaint";
import VoterSettings from "./pages/Voter/VoterSettings";

import CandidateRegPage from "./pages/Candidate/CandidateRegistration";
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";
import CandidateHomepage from "./pages/Candidate/CandidateHomepage";
import Nominate from "./pages/Candidate/Nominate";
import ApplicationStatus from "./pages/Candidate/ViewApplication";
import CandidateList from "./pages/Party/CandidateList";

import PartyRegPage from "./pages/Party/PartyRegistration";
import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyHomepage from "./pages/Party/PartyHomepage";
import PartyCandidate from "./pages/Party/PartyCandidate";

import VoterGuide from "./pages/FooterLinks/VoterArticle";
import PartyArticle from "./pages/FooterLinks/PartyArticle";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import SetElectionDate from "./pages/Admin/SetElectionDate";
import DeclareResults from "./pages/Admin/DeclareResults";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* voter */}
        <Route path="/voter/registration" element={<VoterRegPage />} />
        <Route path="/voter/login" element={<VoterLoginPage />} />
        <Route path="/voter/home" element={<VoterHomepage />} />
        <Route path="/voter/know-your-candidate" element={<KnowYourCandidate />} />
        <Route path="/voter/cast-vote" element={<VotingPage />} />
        <Route path="/voter/search-in-electoral-roll" element={<SearchInElectoralRoll />} />
        <Route path="/voter/feedback" element={<VoterFeedback />} />
        <Route path="/voter/complaint" element={<VoterComplaint />} />
        <Route path="/voter/settings" element={<VoterSettings />} />

        {/* candidate */}
        <Route path="/candidate/registration" element={<CandidateRegPage />} />
        <Route path="/candidate/login" element={<CandidateLoginPage />} />
        <Route path="/candidate/home" element={<CandidateHomepage />} />
        <Route path="/candidate/nominate" element={<Nominate />} />
        <Route path="/candidate/application-status" element={<ApplicationStatus />} />

        {/* party */}
        <Route path="/party/registration" element={<PartyRegPage />} />
        <Route path="/party/login" element={<PartyLoginPage />} />
        <Route path="/party/candidate/list" element={<CandidateList />} />
        <Route path="/party/home" element={<PartyHomepage />} />
        <Route path="/party/candidate/list" element={<CandidateList />} />{" "}
        <Route path="/party/home" element={<PartyHomepage />} />{" "}
        <Route path="/party/party-candidate" element={<PartyCandidate />} />

        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHomepage />} />
        <Route path="/admin/set-date" element={<SetElectionDate />} />
        <Route path="/admin/declare-results" element={<DeclareResults />} />
        <Route path="admin/home" element={<AdminHomepage />} />

        <Route path="/article/voter" element={<VoterGuide />} />
        <Route path="/article/party" element={<PartyArticle />} />
        <Route path="/know-your-candidate" element={<KnowYourCandidate />} />
      </Routes>
    </div>
  );
}

export default App;
