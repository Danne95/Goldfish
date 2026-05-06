export const themeTokens = {
  colors: {
    canvas: {
      DEFAULT: 'rgb(var(--color-canvas) / <alpha-value>)',
      elevated: 'rgb(var(--color-canvas-elevated) / <alpha-value>)',
      muted: 'rgb(var(--color-canvas-muted) / <alpha-value>)',
    },
    ink: {
      DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
      muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
      soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
    },
    line: 'rgb(var(--color-line) / <alpha-value>)',
    brand: {
      DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
      strong: 'rgb(var(--color-brand-strong) / <alpha-value>)',
      soft: 'rgb(var(--color-brand-soft) / <alpha-value>)',
    },
    danger: {
      DEFAULT: 'rgb(var(--color-danger) / <alpha-value>)',
      soft: 'rgb(var(--color-danger-soft) / <alpha-value>)',
    },
    success: {
      DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
      soft: 'rgb(var(--color-success-soft) / <alpha-value>)',
    },
    priority: {
      low: '#78c6a3',
      medium: '#f2c94c',
      high: '#f2994a',
      urgent: '#eb5757',
    },
  },
  fontFamily: {
    display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    body: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  },
  boxShadow: {
    glow: '0 24px 80px rgb(242 184 75 / 0.18)',
    card: '0 20px 70px rgb(0 0 0 / 0.22)',
  },
  borderRadius: {
    '3xl': '1.75rem',
    '4xl': '2.25rem',
  },
  spacing: {
    sidebar: '17rem',
  },
}
