"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faFileWord } from '@fortawesome/free-solid-svg-icons/faFileWord';
import { useReports } from '@/contexts/ReportsProvider';

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

    const exportWord = async () => {
        const { Document, Packer, Paragraph, TextRun } = await import('docx');
        const { saveAs } = (await import('file-saver')).default;

        const doc = new Document({
            sections: [{
                properties: {},
                children: [new Paragraph({
                    children: [new TextRun(content)],
                })],
            }],
        });
        
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `report_${index + 1}.docx`);
    };

    return (
        <div className="flex flex-col gap-2 bg-(--side-bar-bg-color) p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between gap-2 bg-(--bar-bg-filler) p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <h3 className="text-[#006fff] font-bold text-md">Summarized Report</h3>
                    <div className="h-4 w-px bg-white/20"></div>
                    <span className="text-xs opacity-50 text-(--main-text-color)">{displayDate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <button onClick={handleCopy} title="Copy" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-sm text-(--main-text-color)">
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

            <div id={`report-${index}`} className="whitespace-pre-wrap p-2 text-(--main-text-color)">
                {content}
            </div>
        </div>
    );
}