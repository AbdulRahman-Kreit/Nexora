interface ReportDisplayProps {
    content: string;
}

export default function ReportDisplay({ content }: ReportDisplayProps) {
    return (
        <div className="p-6 bg-(--side-bar-bg-color) rounded-2xl text-(--main-text-color) 
            shadow-lg leading-relaxed whitespace-pre-wrap border border-white/5 
            animate-in fade-in slide-in-from-bottom-4 w-full">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="text-[#006fff] font-bold">Analysis Result</h3>
                <span className="text-xs opacity-50">{new Date().toLocaleTimeString()}</span>
            </div>
            {content}
        </div>
    );
}