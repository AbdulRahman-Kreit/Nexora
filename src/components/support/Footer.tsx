import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="w-full bg-[#161616] text-white py-12 px-4 border-t border-gray-800 font-medium font-grotesk">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                
                <h3 className="text-md text-gray-200 font-semibold">
                    Contact us if you have more questions
                </h3>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                    
                    {/* Phone */}
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 bg-gray-800/50 rounded-full group-hover:bg-blue-600 transition-colors w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faPhone} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            013978668773
                        </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 bg-gray-800/50 rounded-full group-hover:bg-blue-600 transition-colors w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            support@bankserve.com
                        </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 bg-gray-800/50 rounded-full group-hover:bg-blue-600 transition-colors w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 group-hover:text-white" />
                        </div>
                        <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                            123 Financial Plaza, NY 10004
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
}