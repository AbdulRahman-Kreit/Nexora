"use client";
import React, { useState } from 'react';
import Modal from './Modal';

export default function PolicyFooter() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const LinkStyle = "text-[var(--main-text-color)] hover:underline cursor-pointer font-semibold transition-all";

    const close = () => setActiveModal(null);

    return (
        <div className="mt-6">
            <p className="text-sm text-center font-grotesk opacity-50 text-[var(--alt-text-color)]">
                By continuing, you agree to our{" "}
                <button onClick={() => setActiveModal('terms')} className={LinkStyle}>Terms of Service</button>,{" "}
                <button onClick={() => setActiveModal('privacy')} className={LinkStyle}>Privacy Policy</button> and{" "}
                <button onClick={() => setActiveModal('data')} className={LinkStyle}>Data Protection Agreement</button>
            </p>

            {/* Terms of Service Popup */}
            <Modal 
                isOpen={activeModal === 'terms'} 
                onClose={close} 
                title="Terms of Service"
            >
                <div className="space-y-4">
                    <p>Welcome to our platform. By accessing our services, you agree to be bound by these terms.</p>
                    <h4 className="font-bold text-[var(--main-text-color)]">1. Usage License</h4>
                    <p>Permission is granted to temporarily use our dashboard for personal, non-commercial viewing only.</p>
                    <h4 className="font-bold text-[var(--main-text-color)]">2. Disclaimer</h4>
                    <p>The materials on this website are provided on an 'as is' basis.</p>
                </div>
            </Modal>

            {/* Privacy Policy Popup */}
            <Modal 
                isOpen={activeModal === 'privacy'} 
                onClose={close} 
                title="Privacy Policy"
            >
                <div className="space-y-4">
                    <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect.</p>
                    <p>We only ask for personal information when we truly need it to provide a service to you.</p>
                </div>
            </Modal>

            {/* Data Protection Popup */}
            <Modal 
                isOpen={activeModal === 'data'} 
                onClose={close} 
                title="Data Protection Agreement (DPA)"
            >
                <div className="space-y-4">
                    <p>This agreement outlines how we handle and protect the data processed through our bar charts and employee tracking systems.</p>
                    <p>We implement industry-standard encryption and security measures to ensure your sales data remains confidential.</p>
                </div>
            </Modal>
        </div>
    );
}