"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { useReports } from '@/contexts/ReportsProvider';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface ReportDisplayProps {
    content: string;
    index: number; 
    createdAt: string;
}

export default function ReportDisplay({ 
    content, 
    index, 
    createdAt 
}: ReportDisplayProps) {
    const { deleteReport } = useReports();

    const displayDate = createdAt || `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        alert("Report copied to clipboard!");
    };

    const exportWord = () => {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [new Paragraph({
                    children: [new TextRun(content)],
                })],
            }],
        });
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `report_${index + 1}.docx`);
        });
    };

    return (
        <div className="relative p-6 bg-[var(--side-bar-bg-color)] rounded-2xl text-[var(--main-text-color)] 
            shadow-lg leading-relaxed border border-white/5 
            animate-in fade-in slide-in-from-bottom-4 w-full">
            
            <div className="flex flex-wrap justify-between items-center mb-6 gap-2 bg-[var(--bar-bg-filler)] p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <h3 className="text-[#006fff] font-bold text-md">Summarized Report</h3>
                    <div className="h-4 w-[1px] bg-white/20"></div>
                    <span className="text-xs opacity-50 text-[var(--main-text-color)]">{displayDate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <button onClick={handleCopy} title="Copy" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-sm">
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                    
                    <button onClick={exportWord} title="Export Word" className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors text-sm">
                        <FontAwesomeIcon icon={faFileWord} />
                    </button>
                    
                    <button onClick={() => deleteReport(index)} title="Delete" className="p-2 hover:bg-red-600 text-white bg-red-500/20 rounded-lg transition-colors text-sm">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

            <div id={`report-${index}`} className="whitespace-pre-wrap p-2 text-[var(--main-text-color)]">
                {content}
            </div>
        </div>
    );
}