import React, { useState } from 'react';

interface SupportPageProps {
  onBack: () => void;
}

const SmallIcon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
    <path d={path} />
  </svg>
);

export const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [donationSent, setDonationSent] = useState(false);


  const steps = [
    { num: "01", title: "Importation", desc: "Définissez vos automates via l'interface interactive ou l'import direct de fichiers.", icon: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" },
    { num: "02", title: "Traitement", desc: "Choisissez l'un des 16 modules dans la barre latérale selon vos besoins d'analyse.", icon: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" },
    { num: "03", title: "Exportation", desc: "Visualisez les résultats et téléchargez vos automates en haute résolution.", icon: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" },
  ];

  const functionalities = [
    { id: "C1", name: "Système d'Arden", guide: "Résolution d'équations rationnelles pour extraire l'expression racine.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { id: "C2", name: "AFN vers AFD", guide: "Construction par sous-ensembles pour la déterminisation de l'automate.", icon: "M13 5l7 7-7 7M5 12h14" },
    { id: "C3", name: "Algorithme BMC", guide: "Extraction de regex par suppression d'états et transitions rationnelles.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { id: "C4", name: "Complétion", guide: "Ajout d'un état puits pour rendre l'automate complet sur l'alphabet.", icon: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" },
    { id: "C5", name: "Accessibilité", guide: "Identification des états accessibles et co-accessibles de l'automate.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.45 14.97A10 10 0 0112 3a10 10 0 019.55 11.97" },
    { id: "C6", name: "Émondage", guide: "Suppression des états inutiles pour optimiser la structure de l'automate.", icon: "M6 15L18 3M6 3l12 12" },
    { id: "C7", name: "Inversion AFD", guide: "Transformation structurelle pour introduire ou gérer le déterminisme.", icon: "M20 4L5 19M5 4l15 15" },
    { id: "C8", name: "Suppression ε", guide: "Transformation d'un ε-AFN en AFN classique par calcul de raccourcis.", icon: "M18.36 6.64a9 9 0 11-12.72 0" },
    { id: "C9", name: "ε-Fermeture", guide: "Calcul de l'ensemble des états atteignables via ε-transitions.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { id: "C10", name: "Conversion ε-DFA", guide: "Passage direct d'un ε-AFN vers un automate fini déterministe.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { id: "C11", name: "Lien AFD-εAFN", guide: "Ajout de transitions vides pour l'interopérabilité des modèles.", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
    { id: "C12", name: "Thompson", guide: "Algorithme de construction inductive d'automate à partir d'une regex.", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" },
    { id: "C13", name: "Minimisation", guide: "Algorithme de Moore pour obtenir l'automate minimal équivalent.", icon: "M3 6l9.5 9.5-5-5L1 18" },
    { id: "C14", name: "Gloushkov", guide: "Construction d'un automate homogène à partir de l'expression régulière.", icon: "M4 4h16v16H4z M9 9h6v6H9z" },
    { id: "C15", name: "Canonisation", guide: "Formalisation du nommage des états pour une étude standardisée.", icon: "M7 8h10M7 12h10M7 16h10" },
    { id: "C16", name: "Opérations", guide: "Calcul de l'union, intersection et complément de langages rationnels.", icon: "M16 16c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM4 16c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM12 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSent(true);
  };

  return (
    <div className="support-container fade-in" style={{ padding: '40px 20px 100px 20px', maxWidth: '1400px', margin: '0 auto', textAlign: 'center', boxSizing: 'border-box' }}>
      <header className="support-header-premium" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
        <button className="btn-back-link" onClick={onBack}>
          <span>‹</span> RETOUR AU STUDIO
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span className="support-badge-blue">DOCUMENTATION INTERACTIVE</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="logo" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
            <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '2px' }}>LES AUTOMATES SUPPORT</span>
          </div>
        </div>
      </header>

      {/* LARGE CENTERED LOGO */}
      <div style={{ marginTop: '40px', marginBottom: '20px' }}>
        <img
          src="/logo.png"
          alt="Central Logo"
          style={{
            maxWidth: '220px',
            width: '100%',
            height: 'auto',
            borderRadius: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '4px solid var(--bg-card)',
            background: 'var(--bg-card)'
          }}
        />
      </div>

      {/* UNIVERSITY HERO */}
      <div style={{ margin: '10px 0', textAlign: 'center' }}>
        <div style={{ background: 'rgba(99, 102, 241, 0.05)', display: 'inline-block', padding: '10px 24px', borderRadius: '30px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '3px', color: 'var(--primary)' }}>UNIVERSITÉ DE YAOUNDÉ I</span>
        </div>
        <h1 className="premium-title" style={{ fontSize: 'clamp(32px, 8vw, 72px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-2px' }}>Plateforme Académique</h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Développé au sein du Département d'Informatique, Faculté des Sciences. <br />
          Un projet d'excellence sur la Théorie des Langages et des Automates.
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 className="premium-title" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, marginBottom: '40px' }}>Comment démarrer ?</h2>
        <div className="feature-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ padding: '30px', textAlign: 'center' }}>
              <div className="avatar-initial" style={{ width: '48px', height: '48px', margin: '0 auto 20px auto', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '18px' }}>
                {s.num}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '80px', marginBottom: '40px' }}>
        <h2 className="premium-title" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)', marginBottom: '32px' }}>
          Exploration des Chapitres
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {functionalities.map(func => (
            <div key={func.id} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px', background: 'rgba(255,255,255,0.01)', textAlign: 'left' }}>
              <div className="nav-icon" style={{ flexShrink: 0, width: '44px', height: '44px' }}>
                <SmallIcon path={func.icon} />
              </div>
              <div>
                <div style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: 900, marginBottom: '4px' }}>{func.id}</div>
                <h4 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 8px 0' }}>{func.name}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{func.guide}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM SECTION - HIGH EMPHASIS */}
      <div style={{ margin: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="premium-title" style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900 }}>Réalisation & Encadrement</h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '20px auto', borderRadius: '2px' }}></div>
        </div>

        <div className="credits-grid">
          <div className="card" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'center', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'left', flexWrap: 'wrap' }}>
            <div className="avatar-initial" style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', fontSize: '32px', flexShrink: 0 }}>K</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <span style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Superviseur Académique</span>
              <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>Dr KOUAKAM E.</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Docteur en Informatique, Université de Yaoundé I. Spécialiste en Algorithmique Formelle.</p>
            </div>
          </div>

          <div className="card" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'center', border: '1px solid rgba(168, 85, 247, 0.2)', textAlign: 'left', flexWrap: 'wrap' }}>
            <div className="avatar-initial" style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', fontSize: '32px', flexShrink: 0 }}>N</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <span style={{ fontSize: '10px', color: '#c084fc', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Conception & Code</span>
              <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>N. NASAIRE</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>Étudiant Licence 3 - Informatique. Passionné par l'UI/UX et les solveurs mathématiques.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: '80px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 className="premium-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: '8px' }}>Soutien & Maintenance</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px' }}>
              <div style={{ width: '20px', height: '2px', background: 'currentColor' }}></div>
              POUR SOUTENIR LE PROJET ACADÉMIQUE
            </div>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 900, letterSpacing: '1px' }}>
            SUPPORT
          </div>
        </div>

        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card" style={{ padding: '30px', textAlign: 'left' }}>
            {!donationSent ? (
              <form onSubmit={handleDonate} style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                  <div className="input-group">
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>VOTRE NOM</label>
                    <input style={{ background: 'var(--bg-lighter)', border: '1px solid var(--border)' }} type="text" placeholder="Nom" required />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>VOTRE EMAIL</label>
                    <input style={{ background: 'var(--bg-lighter)', border: '1px solid var(--border)' }} type="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="input-group">
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>MONTANT DU DON (XAF)</label>
                  <input style={{ background: 'var(--bg-lighter)', border: '1px solid var(--border)' }} type="number" placeholder="5000" required />
                </div>
                <div className="input-group">
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>MESSAGE</label>
                  <textarea style={{ background: 'var(--bg-lighter)', border: '1px solid var(--border)' }} rows={4} placeholder="Dites-nous quelque chose..." required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: '8px' }}>
                  ENVOYER LE DON ➔
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>✨</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Merci pou votre soutien !</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Nous avons bien reçu votre demande. Un email de confirmation vous sera envoyé prochainement.</p>
                <button className="btn-back-link" style={{ marginTop: '32px', marginInline: 'auto' }} onClick={() => setDonationSent(false)}>RETOUR AUX DONS</button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:contact.automates@gmail.com" className="contact-item-box" style={{ padding: '24px' }}>
              <div className="nav-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>✉</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '4px' }}>SUPPORT TECHNIQUE</div>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>contact.automates@gmail.com</div>
              </div>
            </a>
            <a href="https://wa.me/237686013300" target="_blank" rel="noreferrer" className="contact-item-box" style={{ padding: '24px' }}>
              <div className="nav-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>📞</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '4px' }}>LIGNE DIRECTE</div>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>WhatsApp</div>
              </div>
            </a>
            <div className="card" style={{ flex: 1, padding: '24px', display: 'flex', gap: 'max(10px, 2vw)', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap' }}>
              <div className="avatar-initial" style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary)', flexShrink: 0 }}>Ω</div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: 'var(--text-muted)' }}>PROJET RÉALISÉ À</div>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>UNIVERSITÉ DE YAOUNDÉ I</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Faculté des Sciences</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: 'center', opacity: 0.5, fontSize: '10px', letterSpacing: '2px', paddingBottom: '60px', marginTop: '40px' }}>
        © 2026 LES AUTOMATES - PROJET ACADÉMIQUE SOUS LA SUPERVISION DU DR KOUAKAM E.
      </footer>
    </div>
  );
};
