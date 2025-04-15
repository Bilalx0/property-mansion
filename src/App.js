import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Mansions from "./pages/Mansions";
import Penthouses from "./pages/Penthouses";
import About from "./pages/About";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Magazine from "./pages/Magazine";
import BlogPage from "./pages/BlogPage";
import ListingPage from "./pages/ListingPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreatePost from "./components/CreatePost";
import SignupSection from "./pages/SignupSection";
import NewDevelopment from "./pages/NewDevelopment";
import CollectiveListing from "./pages/CollectiveListing";
import ListedCollectibles from "./pages/ListedCollectibles";
import MagazineForm from "./components/MagazineForm";
import MansionForm from "./components/MansionForm";
import PenthouseForm from "./components/PenthouseForm";
import Collectibles from "./components/Collectibles";
import HomePageForm from "./components/HomePageForm";
import NewDevelopmentForm from "./components/NewDevelopmentform";
import MansionList from "./components/MansionList";
import Login from "./components/Auth/Login"; // Imported from simplified codebase
import Signup from "./components/Auth/Signup"; // Imported from simplified codebase
import { MansionProvider } from "./context/MansionContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <MansionProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mansions" element={<Mansions />} />
          <Route path="/penthouses" element={<Penthouses />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/blogpage/:id" element={<BlogPage />} />
          <Route path="/mansion/:reference" element={<ListingPage />} />
          <Route path="/signupsection" element={<SignupSection />} />
          <Route path="/newdevelopment" element={<NewDevelopment />} />
          <Route path="/collectivelisting" element={<CollectiveListing />} />
          <Route path="/listedcollectibles" element={<ListedCollectibles />} />

          {/* Form Routes */}
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/magazineform" element={<MagazineForm />} />
          <Route path="/magazineform/:id" element={<MagazineForm />} />
          <Route path="/mansionform" element={<MansionForm />} />
          <Route path="/mansionform/:id" element={<MansionForm />} />
          <Route path="/penthouseform" element={<PenthouseForm />} />
          <Route path="/collectiblesform" element={<Collectibles />} />
          <Route path="/homeform" element={<HomePageForm />} />
          <Route path="/new-developmentform" element={<NewDevelopmentForm />} />
          <Route path="/mansionlist" element={<MansionList />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardAdmin /> : <Navigate to="/login" />}
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MansionProvider>
  );
}

export default App;