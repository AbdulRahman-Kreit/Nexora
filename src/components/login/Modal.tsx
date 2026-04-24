"use client";
import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            {/* Modal Box */}
            <div 
                style={{ backgroundImage: 'var(--background-image-main-gradient)' }}
                className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border border-[var(--field-bg-color)] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
            >
                {/* Header */}
                <div className="p-6 border-b border-[var(--field-bg-color)] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[var(--main-text-color)]">{title}</h2>
                    <button 
                        onClick={onClose}
                        className={`p-2 hover:bg-[var(--field-bg-color)] rounded-full 
                            transition-colors text-[var(--alt-text-color)] `}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-8 overflow-y-auto custom-scrollbar text-[var(--alt-text-color)] leading-relaxed">
                    {children}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[var(--field-bg-color)] text-right">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-[var(--main-text-color)] text-[var(--main-bg-color)] rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Accept & Close
                    </button>
                </div>
            </div>
        </div>
    );
}