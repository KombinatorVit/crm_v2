import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";


const App: React.FC = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Outlet />
        </div>
    );
};

export default App;
