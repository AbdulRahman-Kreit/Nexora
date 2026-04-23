"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer 
            className="w-full bg-main-gradient py-8 px-4 border-t border-[var(--field-bg-color)] font-medium font-grotesk transition-all duration-500"
            style={{ color: 'var(--main-text-color)' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                
                <h3 
                    className="text-md font-semibold opacity-80"
                    style={{ color: 'var(--alt-text-color)' }}
                >
                    Contact us if you have more questions
                </h3>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                    
                    {/* Phone */}
                    <div className="flex items-center gap-3 group">
                        <div 
                            className="p-2 bg-[var(--field-bg-color)] opacity-80 rounded-full group-hover:bg-[#006fff] transition-colors w-10 h-10 flex items-center justify-center"
                        >
                            <FontAwesomeIcon 
                                icon={faPhone} 
                                className="opacity-60 group-hover:opacity-100 group-hover:text-white transition-all" 
                            />
                        </div>
                        <span 
                            className="transition-colors cursor-pointer hover:opacity-100 opacity-70"
                            style={{ color: 'var(--alt-text-color)' }}
                        >
                            013978668773
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 group">
                        <div 
                            className="p-2 bg-[var(--field-bg-color)] opacity-80 rounded-full group-hover:bg-[#006fff] transition-colors w-10 h-10 flex items-center justify-center"
                        >
                            <FontAwesomeIcon 
                                icon={faEnvelope} 
                                className="opacity-60 group-hover:opacity-100 group-hover:text-white transition-all" 
                            />
                        </div>
                        <span 
                            className="transition-colors cursor-pointer hover:opacity-100 opacity-70"
                            style={{ color: 'var(--alt-text-color)' }}
                        >
                            support@bankserve.com
                        </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-3 group">
                        <div 
                            className="p-2 bg-[var(--field-bg-color)] opacity-80 rounded-full group-hover:bg-[#006fff] transition-colors w-10 h-10 flex items-center justify-center"
                        >
                            <FontAwesomeIcon 
                                icon={faMapMarkerAlt} 
                                className="opacity-60 group-hover:opacity-100 group-hover:text-white transition-all" 
                            />
                        </div>
                        <span 
                            className="transition-colors cursor-pointer hover:opacity-100 opacity-70"
                            style={{ color: 'var(--alt-text-color)' }}
                        >
                            123 Financial Plaza, NY 10004
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
}