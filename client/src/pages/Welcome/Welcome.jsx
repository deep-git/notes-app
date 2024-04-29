import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();

    const requireAuth = () => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }

    useEffect(() => {
        requireAuth();
        return () => { };
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="flex mt-20 mb-20 justify-center items-end">
                <h1 className="text-[3em] sm:text-[4em] md:text-[5em] text-blue-500 font-bold">Notes</h1>
            </div>
            <div className="flex flex-col items-center flex-1 bg-blue-500 w-full pt-20 gap-10">
                <Link to="/login" className="w-52 text-center border-[5px] border-blue-400 text-white px-7 py-2 font-semibold rounded hover:bg-blue-400 transition">Login</Link>
                <Link to="/register" className="w-52 text-center border-[5px] border-blue-400 text-white px-7 py-2 font-semibold rounded hover:bg-blue-400 transition">Register</Link>
            </div>
        </div>
    )
}

export default Welcome