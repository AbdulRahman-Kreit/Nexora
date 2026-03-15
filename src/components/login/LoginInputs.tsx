"use client";
import React, { useState } from 'react';

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginInputs() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name as keyof typeof formData]) {
            setErrors(prev => ({...prev, [name]: ""}))
        }
    }

    const validate = () => {
        const newError: { email?: string, password?: string } = {};
        if (!formData.email) newError.email = "Required!";
        else if (!EmailRegex.test(formData.email)) newError.email = "Invalid!";

        if (!formData.password) newError.password = "Required!";
        else if(formData.password.length < 8) newError.password = "Too short!";

        return newError;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0 ) {
            setErrors(validationErrors);
        } else {
            console.log("Form Submitted Successfully: ", formData);
            alert("Logging in...");
        }
    }

    const fieldStyle = `border-3 border-[#2d2d2d] bg-[#1a1a1a] p-3 outline-none 
    mx-1 w-[250px] rounded-md transition duration-200 ease-in-out text-sm 
    font-semibold placeholder-gray-500 focus:border-[#1e1e1e] focus:bg-[#2d2d2d]
    transition duration-200 text-center ease-in-out opacity-60 focus:opacity-100 font-semibold`;

    const errorMessageStyle = `text-red-500 text-sm font-medium absolute 
    -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap`;

    return (
        <div className='my-8 w-full flex justify-center font-grotesk'>
            <form onSubmit={handleSubmit} 
                className='flex flex-row items-start justify-center gap-2'>
                
                {/* Email Container */}
                <div className='flex flex-col relative'>
                    <input 
                        type="text"
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`${fieldStyle} ${errors.email ? 'border-red-500' : ''}`} 
                    />
                    {errors.email && (
                        <span className={errorMessageStyle}>
                            {errors.email}
                        </span>
                    )}
                </div>

                {/* Password Container */}
                <div className='flex flex-col relative'>
                    <input 
                        type="password"
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        className={`${fieldStyle} ${errors.password ? 'border-red-500' : ''}`} 
                    />
                    {errors.password && (
                        <span className={errorMessageStyle}>
                            {errors.password}
                        </span>
                    )}
                </div>
                    
                <button type='submit'
                    className={`bg-[#006fff] hover:bg-[#0085ff] text-white 
                        px-8 py-3.5 m rounded-md font-semibold text-sm 
                        transition duration-200 w-[200px] whitespace-nowrap`}>
                    Log In
                </button>
            </form>
        </div>
    )
}