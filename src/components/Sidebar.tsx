import React, { useState } from 'react';

interface SidebarProps {
    activePage: string;
    onPageChange: (pageId: string) => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Icon = ({ path }: { path: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
        <path d={path} />
    </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange, theme, onToggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { id: 'equations', label: 'Arden Solver', path: 'M12 2v20M2 12h20' },
        { id: 'nfa-to-dfa', label: 'AFN ➔ AFD', path: 'M5 12h14M12 5l7 7-7 7' },
        { id: 'regex-extractor', label: 'Extraction Regex', path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { id: 'dfa-to-cdfa', label: 'Complétion AFD', path: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3' },
        { id: 'state-analysis', label: 'Analyse États', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
        { id: 'pruning', label: 'Émondage', path: 'M6 15L18 3M6 3l12 12M6 21a3 3 0 100-6 3 3 0 000 6zM18 21a3 3 0 100-6 3 3 0 000 6z' },
        { id: 'dfa-to-nfa', label: 'AFD ➔ AFN', path: 'M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9z M12 7v5l3 3' },
        { id: 'epsilon-manager', label: 'Gestion ε', path: 'M12 15a3 3 0 100-6 3 3 0 000 6z' },
        { id: 'epsilon-closure', label: 'ε-Fermeture', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
        { id: 'enfa-to-dfa', label: 'ε-AFN ➔ AFD', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
        { id: 'dfa-to-enfa', label: 'AFD ➔ ε-AFN', path: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
        { id: 'thompson', label: 'Thompson', path: 'M18 8A3 3 0 1018 2a3 3 0 000 6zM6 15A3 3 0 106 9a3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6z' },
        { id: 'minimization', label: 'Minimisation', path: 'M23 6l-9.5 9.5-5-5L1 18' },
        { id: 'gloushkov', label: 'Gloushkov', path: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
        { id: 'canonization', label: 'Canonisation', path: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
        { id: 'closure-ops', label: 'Opérations', path: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71' },
    ];

    const handleNav = (id: string) => {
        onPageChange(id);
        setMobileOpen(false);
    };

    const SidebarContent = () => (
        <>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => handleNav(item.id)}
                    >
                        <div className="nav-icon">
                            <Icon path={item.path} />
                        </div>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="theme-toggle-box">
                <button className={`nav-item ${activePage === 'support' ? 'active' : ''}`} onClick={() => handleNav('support')} style={{ marginBottom: '12px' }}>
                    <div className="nav-icon">
                        <Icon path="M12 22s9-4.72 9-11V5l-9-3-9 3v6c0 6.28 9 11 9 11z" />
                    </div>
                    <span>Guide & Support</span>
                </button>

                <button className="theme-btn" onClick={onToggleTheme}>
                    {theme === 'light' ? <>🌙 Mode Sombre</> : <>☀️ Mode Claire</>}
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className={`sidebar sidebar-desktop ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-logo" style={{ position: 'relative' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                    <h1>Les Automates</h1>
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} style={{ position: 'absolute', right: '-24px', top: '8px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, zIndex: 10, transition: 'transform 0.3s' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* MOBILE TOP BAR */}
            <div className="mobile-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
                    <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '0.5px' }}>Les Automates</span>
                </div>
                <button className="hamburger-btn" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* MOBILE DRAWER OVERLAY */}
            {mobileOpen && (
                <div className="drawer-overlay" onClick={() => setMobileOpen(false)}>
                    <aside className="drawer-sidebar" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 24px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src="/logo.png" alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '8px' }} />
                                <span style={{ fontWeight: 900, fontSize: '18px' }}>Les Automates</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}>✕</button>
                        </div>
                        <SidebarContent />
                    </aside>
                </div>
            )}
        </>
    );
};
