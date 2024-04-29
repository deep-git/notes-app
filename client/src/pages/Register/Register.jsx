import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/validator';
import axiosInstance from "../../utils/axiosInstance";
import { IoMdArrowRoundBack } from "react-icons/io";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/register");
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter a name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }

    useEffect(() => {
        getUserInfo();
        return () => { };
    }, []);

    return (
        <div>
            <Navbar />

            <div className="flex flex-col gap-3 items-center justify-center mt-28">
                <div className="flex w-96">
                    <Link to="/" className="flex gap-2 justify-center items-center hover:bg-slate-100 hover:text-blue-500 px-2 py-2 rounded transition cursor-pointer">
                        <IoMdArrowRoundBack />
                        Back
                    </Link>
                </div>

                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleRegister}>
                        <h4 className="text-2xl mb-7 font-semibold">Register</h4>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name_input">Name</label>
                                <input id="name_input" type="text" placeholder="Name" className="border px-5 py-3 outline-none rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email_input">Email</label>
                                <input id="email_input" type="email" placeholder="Email" className="border px-5 py-3 outline-none rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-5">{error}</p>
                        )}

                        <button type="submit" className="mt-10 w-full bg-blue-500 text-white rounded-md py-3 text-lg font-medium hover:bg-blue-500/90 transition">
                            Create Account
                        </button>

                        <p className="text-sm text-center mt-10">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500">Login</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register