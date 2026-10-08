import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, HelpCircle, Save } from 'lucide-react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.logo}>Việt Phục Remix</h1>
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/"
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
          end
        >
          Studio Phối Đồ
        </NavLink>
        <NavLink
          to="/collection"
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
        >
          Bộ Sưu Tập
        </NavLink>
        <NavLink
          to="/culture"
          style={({ isActive }) => isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
        >
          Chuyện Nếp Áo
        </NavLink>
      </nav>

      <div style={styles.right}>
        <div style={styles.status}>
          <Save size={16} />
          <span>Đã lưu nháp</span>
        </div>
        <button style={styles.iconBtn} aria-label="Trợ giúp">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    backgroundColor: 'var(--color-bg-light)',
    borderBottom: '1px solid var(--color-accent-light)',
    flexShrink: 0,
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    color: 'var(--color-primary)',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '8px 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  activeLink: {
    color: 'var(--color-primary)',
    borderBottom: '2px solid var(--color-primary)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
  },
  iconBtn: {
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Header;