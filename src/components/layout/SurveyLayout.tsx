import React from 'react';


interface SurveyLayoutProps {
    children: React.ReactNode;
    title?: string;
    progress?: number;
}

export const SurveyLayout: React.FC<SurveyLayoutProps> = ({ children, title, progress }) => {
    return (
        <div className="min-h-screen relative flex flex-col touch-manipulation">
            {/* Editorial Header - Minimalist */}
            <header className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-500">
                <div className="flex items-baseline gap-1">
                    <span className="font-heading font-bold text-xl md:text-2xl text-primary tracking-tighter">THE COLLECTION</span>
                    <span className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-accent translate-y-[-2px]">Eco</span>
                </div>

                {progress !== undefined && (
                    <div className="flex items-center gap-4">
                        <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-text-muted hidden md:inline-block">Progress</span>
                        <div className="w-24 md:w-40 h-[2px] bg-primary/10">
                            <div
                                className="h-full bg-accent transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content - Magazine Layout */}
            <main className="flex-grow pt-32 pb-24 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    {title && (
                        <div className="mb-16 text-center px-4">
                            <h1 className="font-heading text-5xl md:text-7xl text-primary mb-4 italic">
                                {title}
                            </h1>
                            <div className="w-12 h-[1px] bg-accent mx-auto" />
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Footer - Minimal */}
            <footer className="py-12 text-center">
                <p className="font-heading italic text-text-muted text-sm">
                    The Collection • Academic Survey 2026
                </p>
            </footer>
        </div>
    );
};
