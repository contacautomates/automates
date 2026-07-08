import React from 'react';

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  moduleCode?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, description, children, moduleCode = "MODULE" }) => {
  return (
    <div className="page-wrapper fade-in" style={{ paddingBottom: '60px' }}>
      <header className="premium-page-header" style={{ marginBottom: '60px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="support-badge-blue" style={{ letterSpacing: '2px', fontWeight: 900 }}>{moduleCode}</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>
        
        <h1 className="premium-title" style={{ fontSize: '48px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-1.5px' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '800px', lineHeight: '1.6' }}>
          {description}
        </p>
      </header>
      
      <div className="page-content-rigor" style={{ animation: 'fadeIn 0.6s ease-out' }}>
        {children}
      </div>
    </div>
  );
};
