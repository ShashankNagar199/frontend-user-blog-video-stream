import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Profile from './components/Profile/Profile';
import VideoListing from './components/Videos/VideoListing';
import UserVideos from './components/Videos/UserVideos';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/home" element={<ProtectedRoute element={<VideoListing />} />} />
            <Route path="/user/:userId/videos" element={<ProtectedRoute element={<UserVideos />} />} />
            <Route path="/" element={<Login />} />
            {/* Catch all unknown routes */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default App;
