// src/app.routes.jsx
import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";
import Protected from "./features/components/Protected";
import Interview from "./features/auth/pages/Interview";
import InterviewReportPage from "./interview/pages/InterviewReportPage";
import InterviewHistoryPage from "./interview/pages/InterviewHistoryPage";
import Navbar from "./components/Navbar";
import Pricing from "./features/auth/pages/Pricing";

// 1. Map your routes to your custom cyberpunk titles
const routeTitles = {
  "/": "GEN-AI.CORE | Tactical Interview & Resume Intelligence Engine",
  "/login": "OPERATOR AUTHENTICATION ",
  "/register": "INITIALIZE OPERATOR ",
  "/interview": "STUDIO RUNNER | Assessment & Evaluation Engine",
  "/interview/history": "HISTORY ARCHIVE ",
  "/pricing": "PRICING MATRIX ",
};

// 2. Component that updates document title automatically on navigation
const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/interview/report')) {
            document.title = "TACTICAL BRIEF // Assessment Analysis & Roadmap";
        } else {
            document.title = routeTitles[location.pathname] || "GEN-AI.CORE // Tactical Engine";
        }
    }, [location]);

    return null;
};

// Root layout that includes the Navbar globally & the title synchronizer
const RootLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-[#0052FF] selection:text-white font-sans">
            <DynamicTitle />
            <Navbar />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
        </div>
    );
};

export const router = createBrowserRouter([
    // Public Auth Routes (No Navbar, but still updates title via its own or if wrapped)
    { path: "/login", element: <><DynamicTitle /><Login /></> },
    { path: "/register", element: <><DynamicTitle /><Register /></> },

    // Protected App Routes (Wrapped in RootLayout with Navbar automatically)
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <Protected><Home /></Protected> },
            { path: '/interview', element: <Protected><Interview /></Protected> },
            { path: "/interview/report/:interviewId", element: <Protected><InterviewReportPage /></Protected> },
            { path: "/interview/history", element: <Protected><InterviewHistoryPage /></Protected> },
            { path: "/pricing", element: <Protected><Pricing /></Protected> }
        ]
    }
]);