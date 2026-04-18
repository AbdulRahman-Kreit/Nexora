"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const faqData = [
    {
        question: "What does Nexora Analytics platform do?",
        answer: "Nexora Analytics platform helps businesses track, analyze, and visualize their data in real time, enabling smarter decisions and improved performance."
    },
    {
        question: "Who is this platform for?",
        answer: "It’s designed for business owners, marketers, analysts, and teams who want to understand their data without needing advanced technical skills."
    },
    {
        question: "Do I need technical experience to use it?",
        answer: "No. Our interface is user-friendly and designed for non-technical users, with guided dashboards and simple reports."
    },
    {
        question: "Can I export reports?",
        answer: "Yes, you can export your reports in various formats such as PDF, CSV, and Excel directly from the dashboard."
    },
    {
        question: "How secure is my data on Nexora?",
        answer: "Security is our top priority. We use industry-standard encryption and secure cloud infrastructure to ensure your data is always protected."
    },
    {
        question: "Can I integrate with other tools?",
        answer: "Absolutely. Nexora supports integrations with popular tools like Slack, Google Sheets, and various CRM platforms."
    }
];

export default function FAQaccordion() {
    const [openIndices, setOpenIndices] = useState<number[]>([0]); 

    const toggleAccordion = (index: number) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter(i => i !== index));
        } else {
            setOpenIndices([...openIndices, index]);
        }
    };

    return (
        <div className="bg-gradient-to-r from-[#151a21] to-[#161616] p-8 w-full border-l-4 border-[#4a7fce] relative shadow-2xl max-h-[500px] flex flex-col rounded-r-xl">
            
            <style dangerouslySetInnerHTML={{ __html: `
                .faq-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: #4a7fce transparent !important;
                    overflow: auto !important; 
                }
                .faq-scrollbar::-webkit-scrollbar { 
                    width: 5px; 
                    height: 5px; 
                }
                .faq-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .faq-scrollbar::-webkit-scrollbar-thumb {
                    background: #4a7fce;
                    border-radius: 10px;
                }
            `}} />

            <h2 className="text-gray-500 text-xs font-bold mb-6 uppercase tracking-[0.2em] shrink-0">
                Frequently Asked Questions
            </h2>

            <div className="space-y-1 pr-6 overflow-y-auto faq-scrollbar flex-1">
                {faqData.map((item, index) => {
                    const isOpen = openIndices.includes(index);
                    return (
                        <div key={index} className="border-b border-white/5 last:border-0">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center text-left py-5 transition-all duration-300 group"
                            >
                                <span className={`text-[15px] font-semibold tracking-wide transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                    {item.question}
                                </span>
                                <FontAwesomeIcon 
                                    icon={isOpen ? faChevronUp : faChevronDown} 
                                    className={`text-[10px] transition-all duration-300 ${isOpen ? 'text-[#4a7fce] scale-125' : 'text-gray-600'}`}
                                />
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-500 text-sm leading-relaxed font-medium pl-1">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            
            <div className="absolute right-2 top-10 bottom-10 w-[2px] bg-[#4a7fce] opacity-20 blur-[1px]"></div>
        </div>
    );
}