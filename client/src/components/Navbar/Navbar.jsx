import React, { useState, useEffect } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import axiosInstance from "../../utils/axiosInstance";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const requireAuth = () => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
            setIsLoggedIn(true);
        }
    }

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
                setIsLoggedIn(false);
            }
        }
    };

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchNote(searchQuery);
        }
    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    useEffect(() => {
        requireAuth();
        return () => { };
    }, []);

    return (
        <>
            <div className="hidden bg-white md:flex flex-wrap justify-between items-center px-6 py-2 drop-shadow">
                <div className="flex justify-center items-center gap-3">
                    <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
                    <h2 className="text-xl font-medium text-black py-2">Notes</h2>
                </div>

                {isLoggedIn && (
                    <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch} />
                )}

                {isLoggedIn && (
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                )}
            </div>

            <div className="bg-white flex md:hidden flex-wrap justify-between items-center gap-5 px-6 py-2 drop-shadow">
                <div className="flex justify-between items-center w-full flex-wrap">
                    <div className="flex justify-center items-center gap-3">
                        <img src="/logo.svg" alt="Logo" className="w-7 h-7" />
                        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
                    </div>

                    {isLoggedIn && (
                        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                    )}
                </div>


                {isLoggedIn && (
                    <div className="w-full flex justify-center">
                        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch} />
                    </div>
                )}


            </div>
        </>
    )
}

export default Navbar