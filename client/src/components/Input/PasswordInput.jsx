import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(prev => !prev);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="password_input">Password</label>

            <div className="flex items-center bg-transparent border px-5 rounded">
                <input value={value} onChange={onChange} id="password_input" type={isShowPassword ? "text" : "password"} placeholder={placeholder || "Password"} className="py-3 rounded-md bg-transparent w-full outline-none" />

                {isShowPassword ? (
                    <FaRegEye className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => toggleShowPassword()} />
                ) : (
                    <FaRegEyeSlash className="w-5 h-5 text-slate-400 cursor-pointer" onClick={() => toggleShowPassword()} />
                )}
            </div>
        </div>
    )
}

export default PasswordInput