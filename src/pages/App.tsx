import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import PrivateRoute from '../utils/PrivateRoute'

import Login from '../pages/Login'
import Dashboard from "./Dashboard"


const App = () => {

    return (
        <>
            <div className="App">
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                            />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </AuthProvider>
                </Router>
            </div>
        </>
    );
}

export default App;