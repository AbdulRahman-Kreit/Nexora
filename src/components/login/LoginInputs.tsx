"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginInputs() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; api?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const validate = () => {
        const newError: { email?: string, password?: string } = {};
        if (!formData.email) newError.email = "Required!";
        else if (!EmailRegex.test(formData.email)) newError.email = "Invalid!";
        if (!formData.password) newError.password = "Required!";
        else if (formData.password.length < 8) newError.password = "Too short!";
        return newError;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://analysis.gproject.space/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                },
                body: JSON.stringify({
                    email: formData.email, 
                    password: formData.password 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.accessToken); 
                localStorage.setItem('user', JSON.stringify(data.user)); 
                router.push('/overview'); 
            } else {
                setErrors({ api: data.message || "Invalid Email or Password" });
            }
        } catch (error) {
            setErrors({ api: "Server connection failed" });
        } finally {
            setIsSubmitting(false);
        }
    }

    const fieldStyle = `border-3 border-[#2d2d2d] bg-[#1a1a1a] p-3 outline-none 
    mx-1 w-[250px] rounded-md text-sm text-center opacity-60 focus:opacity-100 font-semibold focus:border-[#006fff]`;

    return (
        <div className='my-8 w-full flex flex-col items-center font-grotesk'>
            <form onSubmit={handleSubmit} className='flex flex-row items-start justify-center gap-2'>
                <div className='flex flex-col relative'>
                    <input type="text" name='email' placeholder='Email' value={formData.email} onChange={handleChange}
                        className={`${fieldStyle} ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>

                <div className='flex flex-col relative'>
                    <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}
                        className={`${fieldStyle} ${errors.password ? 'border-red-500' : ''}`} />
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
                </div>

                <button type='submit' disabled={isSubmitting}
                    className="bg-[#006fff] hover:bg-[#0085ff] text-white px-8 py-3.5 rounded-md font-semibold text-sm transition w-[200px]">
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            {errors.api && <p className="text-red-500 mt-6 font-bold">{errors.api}</p>}
        </div>
    )
}