import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Editor from "./components/Editor";
import MyDrafts from "./components/MyDrafts";
import MyProfile from "./components/MyProfile";
import Admin from "./components/Admin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Wrapper from "./components/Wrapper"; // Import Wrapper component
import Profile from "./components/Profile";
import SelectProfile from "./components/SelectProfile";
import Trade from "./components/Trade";
import Donate from "./components/Donate";
import SeeImages from "./components/SeeImages"; // Import SeeImages component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that require authentication */}
        <Route path="/" element={<Wrapper><Home /></Wrapper>} />
        <Route path="/:id" element={<Wrapper><Home /></Wrapper>} />
        <Route path="/:id/post" element={<Wrapper><Editor /></Wrapper>} />
        <Route path="/:id/myDrafts" element={<Wrapper><MyDrafts /></Wrapper>} />
        <Route path="/:id/profile" element={<Wrapper><SelectProfile /></Wrapper>} />
        <Route path="/:id/Admin" element={<Wrapper><Admin /></Wrapper>} />
        <Route path="/:id/trade" element={<Wrapper><Trade /></Wrapper>} />
        <Route path="/:id/donate" element={<Wrapper><Donate /></Wrapper>} />

        {/* Image Viewer Route */}
        <Route path="/:id/see-images/:postId/:imageIndex" element={<Wrapper><SeeImages /></Wrapper>} />

        {/* Routes that do not require authentication (login/signup) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
