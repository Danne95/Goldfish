import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function applyThemeClass(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => {
        applyThemeClass(theme)
        set({ theme })
      },
      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark'
        applyThemeClass(nextTheme)
        set({ theme: nextTheme })
      },
    }),
    {
      name: 'goldfish-theme',
      onRehydrateStorage: () => (state) => {
        applyThemeClass(state?.theme || 'dark')
      },
    },
  ),
)

export function initializeTheme() {
  applyThemeClass(useThemeStore.getState().theme)
}
