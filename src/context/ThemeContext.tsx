import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeId = 'obsidian' | 'ivory' | 'midnight' | 'emerald' | 'saffron';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tag: string;
  mode: 'dark' | 'light';
  previewColors: [string, string, string]; // [bg, primary, accent]
  tokens: {
    bg: string;
    bgElevated: string;
    surface: string;
    surfaceWarm: string;
    surfaceGlass: string;
    border: string;
    borderHighlight: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryDim: string;
    primaryGlow: string;
    secondary: string;
    accent: string;
    accentGlow: string;
    text: string;
    textMuted: string;
    textDim: string;
    orb1: string;
    orb2: string;
    portalGlow: string;
    badgeBg: string;
    badgeBorder: string;
    cardBorder: string;
    navGlassBg: string;
  };
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Cyber',
    tag: 'Stealth Electric Cyan',
    mode: 'dark',
    previewColors: ['#0a0a0c', '#06b6d4', '#d4a843'],
    tokens: {
      bg: '#0a0a0c',
      bgElevated: '#121214',
      surface: '#121214',
      surfaceWarm: '#18181b',
      surfaceGlass: 'rgba(255, 255, 255, 0.04)',
      border: 'rgba(255, 255, 255, 0.08)',
      borderHighlight: 'rgba(6, 182, 212, 0.35)',
      primary: '#06b6d4',
      primaryLight: '#38bdf8',
      primaryDark: '#0891b2',
      primaryDim: 'rgba(6, 182, 212, 0.15)',
      primaryGlow: 'rgba(6, 182, 212, 0.45)',
      secondary: '#38bdf8',
      accent: '#d4a843',
      accentGlow: 'rgba(212, 168, 67, 0.4)',
      text: '#ffffff',
      textMuted: 'rgba(255, 255, 255, 0.55)',
      textDim: 'rgba(255, 255, 255, 0.35)',
      orb1: 'rgba(6, 182, 212, 0.22)',
      orb2: 'rgba(56, 189, 248, 0.12)',
      portalGlow: 'rgba(6, 182, 212, 0.35)',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeBorder: 'rgba(6, 182, 212, 0.28)',
      cardBorder: 'rgba(255, 255, 255, 0.06)',
      navGlassBg: 'rgba(10, 10, 12, 0.8)',
    },
  },
  ivory: {
    id: 'ivory',
    name: 'Clean Ivory',
    tag: 'Royal Light Editorial',
    mode: 'light',
    previewColors: ['#f8f7f2', '#1e3a8a', '#d97706'],
    tokens: {
      bg: '#f8f7f2',
      bgElevated: '#ffffff',
      surface: '#ffffff',
      surfaceWarm: '#f1ede4',
      surfaceGlass: 'rgba(255, 255, 255, 0.88)',
      border: 'rgba(15, 23, 42, 0.1)',
      borderHighlight: 'rgba(30, 58, 138, 0.4)',
      primary: '#1e3a8a',
      primaryLight: '#2563eb',
      primaryDark: '#172554',
      primaryDim: 'rgba(30, 58, 138, 0.09)',
      primaryGlow: 'rgba(30, 58, 138, 0.25)',
      secondary: '#0284c7',
      accent: '#d97706',
      accentGlow: 'rgba(217, 119, 6, 0.3)',
      text: '#0f172a',
      textMuted: '#475569',
      textDim: '#94a3b8',
      orb1: 'rgba(30, 58, 138, 0.12)',
      orb2: 'rgba(2, 132, 199, 0.08)',
      portalGlow: 'rgba(30, 58, 138, 0.3)',
      badgeBg: 'rgba(30, 58, 138, 0.08)',
      badgeBorder: 'rgba(30, 58, 138, 0.22)',
      cardBorder: 'rgba(15, 23, 42, 0.08)',
      navGlassBg: 'rgba(248, 247, 242, 0.88)',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Sapphire',
    tag: 'Diplomatic Deep Blue',
    mode: 'dark',
    previewColors: ['#040817', '#3b82f6', '#fbbf24'],
    tokens: {
      bg: '#040817',
      bgElevated: '#0a122c',
      surface: '#0a122c',
      surfaceWarm: '#0f1b3d',
      surfaceGlass: 'rgba(30, 58, 138, 0.16)',
      border: 'rgba(59, 130, 246, 0.18)',
      borderHighlight: 'rgba(59, 130, 246, 0.45)',
      primary: '#3b82f6',
      primaryLight: '#60a5fa',
      primaryDark: '#1d4ed8',
      primaryDim: 'rgba(59, 130, 246, 0.16)',
      primaryGlow: 'rgba(59, 130, 246, 0.45)',
      secondary: '#06b6d4',
      accent: '#fbbf24',
      accentGlow: 'rgba(251, 191, 36, 0.4)',
      text: '#f8fafc',
      textMuted: 'rgba(226, 232, 240, 0.65)',
      textDim: 'rgba(148, 163, 184, 0.4)',
      orb1: 'rgba(59, 130, 246, 0.25)',
      orb2: 'rgba(6, 182, 212, 0.15)',
      portalGlow: 'rgba(59, 130, 246, 0.4)',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      badgeBorder: 'rgba(59, 130, 246, 0.3)',
      cardBorder: 'rgba(59, 130, 246, 0.12)',
      navGlassBg: 'rgba(4, 8, 23, 0.85)',
    },
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Sovereign',
    tag: 'Verified Secure Vault',
    mode: 'dark',
    previewColors: ['#05120d', '#10b981', '#eab308'],
    tokens: {
      bg: '#05120d',
      bgElevated: '#092118',
      surface: '#092118',
      surfaceWarm: '#0e2f23',
      surfaceGlass: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.18)',
      borderHighlight: 'rgba(16, 185, 129, 0.45)',
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#047857',
      primaryDim: 'rgba(16, 185, 129, 0.15)',
      primaryGlow: 'rgba(16, 185, 129, 0.45)',
      secondary: '#14b8a6',
      accent: '#eab308',
      accentGlow: 'rgba(234, 179, 8, 0.4)',
      text: '#f0fdf4',
      textMuted: 'rgba(209, 250, 229, 0.65)',
      textDim: 'rgba(110, 231, 183, 0.35)',
      orb1: 'rgba(16, 185, 129, 0.24)',
      orb2: 'rgba(20, 184, 166, 0.14)',
      portalGlow: 'rgba(16, 185, 129, 0.4)',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.3)',
      cardBorder: 'rgba(16, 185, 129, 0.12)',
      navGlassBg: 'rgba(5, 18, 13, 0.85)',
    },
  },
  saffron: {
    id: 'saffron',
    name: 'Royal Saffron',
    tag: 'Heritage Velvet Amber',
    mode: 'dark',
    previewColors: ['#0d0806', '#f59e0b', '#ef4444'],
    tokens: {
      bg: '#0d0806',
      bgElevated: '#1a110a',
      surface: '#1a110a',
      surfaceWarm: '#281a10',
      surfaceGlass: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.2)',
      borderHighlight: 'rgba(245, 158, 11, 0.5)',
      primary: '#f59e0b',
      primaryLight: '#fbbf24',
      primaryDark: '#b45309',
      primaryDim: 'rgba(245, 158, 11, 0.16)',
      primaryGlow: 'rgba(245, 158, 11, 0.45)',
      secondary: '#ea580c',
      accent: '#ef4444',
      accentGlow: 'rgba(239, 68, 68, 0.4)',
      text: '#fffbeb',
      textMuted: 'rgba(254, 243, 199, 0.65)',
      textDim: 'rgba(252, 211, 77, 0.35)',
      orb1: 'rgba(245, 158, 11, 0.24)',
      orb2: 'rgba(234, 88, 12, 0.14)',
      portalGlow: 'rgba(245, 158, 11, 0.4)',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.3)',
      cardBorder: 'rgba(245, 158, 11, 0.14)',
      navGlassBg: 'rgba(13, 8, 6, 0.85)',
    },
  },
};

const THEME_STORAGE_KEY = 'passport-seva-theme';

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ThemeDefinition;
  setThemeId: (id: ThemeId) => void;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  isThemeModalOpen: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId;
      if (saved && THEMES[saved]) return saved;
    }
    return 'obsidian';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const setThemeId = (id: ThemeId) => {
    if (!THEMES[id]) return;
    setThemeIdState(id);
    localStorage.setItem(THEME_STORAGE_KEY, id);
  };

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  // Apply CSS custom properties dynamically to :root and document.documentElement
  useEffect(() => {
    const active = THEMES[themeId];
    const root = document.documentElement;

    root.setAttribute('data-theme', themeId);
    root.setAttribute('data-mode', active.mode);

    // Apply color CSS variables for both Tailwind and standard styling
    root.style.setProperty('--color-indigo', active.tokens.primary);
    root.style.setProperty('--color-indigo-light', active.tokens.primaryLight);
    root.style.setProperty('--color-indigo-dark', active.tokens.primaryDark);
    root.style.setProperty('--color-ivory', active.tokens.bg);
    root.style.setProperty('--color-ivory-dark', active.tokens.surfaceWarm);
    root.style.setProperty('--color-graphite', active.tokens.text);
    root.style.setProperty('--color-graphite-light', active.tokens.textMuted);
    root.style.setProperty('--color-saffron', active.tokens.accent);
    root.style.setProperty('--color-surface', active.tokens.surface);
    root.style.setProperty('--color-surface-warm', active.tokens.surfaceWarm);

    // Set body background and color directly for immediate repaint
    document.body.style.backgroundColor = active.tokens.bg;
    document.body.style.color = active.tokens.text;
  }, [themeId]);

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        theme: THEMES[themeId],
        setThemeId,
        openThemeModal,
        closeThemeModal,
        isThemeModalOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
