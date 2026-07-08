import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { EquationsPage } from './pages/EquationsPage'
import { NFAToDFAPage } from './pages/NFAToDFAPage'
import { SupportPage } from './pages/SupportPage'
import { RegexExtractorPage } from './pages/RegexExtractorPage'
import { DFAToCDFAPage } from './pages/DFAToCDFAPage'
import { StateAnalysisPage } from './pages/StateAnalysisPage'
import { PruningPage } from './pages/PruningPage'
import { DFAToNFAPage } from './pages/DFAToNFAPage'
import { EpsilonManagerPage } from './pages/EpsilonManagerPage'
import { EpsilonClosurePage } from './pages/EpsilonClosurePage'
import { ENFAToDFAPage } from './pages/ENFAToDFAPage'
import { DFAToENFAPage } from './pages/DFAToENFAPage'
import { ThompsonPage } from './pages/ThompsonPage'
import { MinimizationPage } from './pages/MinimizationPage'
import { GloushkovPage } from './pages/GloushkovPage'
import { CanonizationPage } from './pages/CanonizationPage'
import { ClosureOpsPage } from './pages/ClosureOpsPage'

import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState<string>('equations');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const renderPage = () => {
        switch (currentPage) {
            case 'equations': return <EquationsPage />;
            case 'nfa-to-dfa': return <NFAToDFAPage />;
            case 'regex-extractor': return <RegexExtractorPage />;
            case 'dfa-to-cdfa': return <DFAToCDFAPage />;
            case 'state-analysis': return <StateAnalysisPage />;
            case 'pruning': return <PruningPage />;
            case 'dfa-to-nfa': return <DFAToNFAPage />;
            case 'epsilon-manager': return <EpsilonManagerPage />;
            case 'epsilon-closure': return <EpsilonClosurePage />;
            case 'enfa-to-dfa': return <ENFAToDFAPage />;
            case 'dfa-to-enfa': return <DFAToENFAPage />;
            case 'thompson': return <ThompsonPage />;
            case 'minimization': return <MinimizationPage />;
            case 'gloushkov': return <GloushkovPage />;
            case 'canonization': return <CanonizationPage />;
            case 'closure-ops': return <ClosureOpsPage />;
            case 'support': return <SupportPage onBack={() => setCurrentPage('equations')} />;
            default: return <EquationsPage />;
        }
    };

    return (
        <div className="app-container">
            {currentPage !== 'support' && (
                <Sidebar 
                    activePage={currentPage} 
                    onPageChange={setCurrentPage} 
                    theme={theme} 
                    onToggleTheme={toggleTheme} 
                />
            )}
            <main className="main-content" style={{ padding: currentPage === 'support' ? '0' : '40px' }}>
                {renderPage()}
            </main>
        </div>
    )
}

export default App
