import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { solveEquationSystem } from '../core/SystemEquations';

export const EquationsPage: React.FC = () => {
  const [equations, setEquations] = useState<string>("L0 = a L0 + b L1 + ε\nL1 = a L1 + b L0");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    try {
      setError(null);
      const regex = solveEquationSystem(equations);
      setResult(regex);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <PageLayout
      moduleCode="MODULE C1"
      title="Système d'Arden"
      description="Résolvez un système d'équations rationnelles par substitution et application du lemme d'Arden."
    >
      <div className="responsive-grid">
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Configuration du Système</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
            Format : <code>Li = symbol Lj + ... + ε</code>. <br />
            L'algorithme identifiera récursivement l'expression rationnelle racine.
          </p>
          <textarea
            value={equations}
            onChange={(e) => setEquations(e.target.value)}
            rows={10}
            placeholder="L0 = a L0 + b L1 + ε..."
            style={{
              background: 'var(--bg-lighter)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px',
              color: 'var(--text-main)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '15px',
              flex: 1,
              resize: 'none'
            }}
          />
          <button className="btn-primary" style={{ marginTop: '24px', width: '100%', padding: '16px' }} onClick={handleSolve}>
            Résoudre le système ➔
          </button>
          {error && (
            <div style={{
              color: '#ef4444',
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(239, 64, 64, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid rgba(239, 64, 64, 0.2)'
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Résultat de l'Analyse</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Expression rationnelle extraite après application exhaustive du lemme d'Arden.
          </p>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {result ? (
              <div style={{
                width: '100%',
                padding: '32px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(16, 185, 129, 0.05))',
                border: '1px solid var(--primary)',
                borderRadius: '20px',
                fontSize: '24px',
                fontWeight: '900',
                color: 'var(--text-main)',
                wordBreak: 'break-all',
                textAlign: 'center',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.1)',
                maxHeight: '250px',
                overflowY: 'auto'
              }}>
                {result}
              </div>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border)',
                borderRadius: '20px',
                color: 'var(--text-muted)'
              }}>
                En attente de résolution...
              </div>
            )}
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Vérifié par Arden</span>
            <button
              className="btn-back-link"
              style={{ fontSize: '11px', padding: '6px 12px' }}
              onClick={() => { navigator.clipboard.writeText(result); alert("Copié !"); }}
              disabled={!result}
            >
              Copier l'expression
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
