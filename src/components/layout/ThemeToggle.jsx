import Toggle from '../common/Toggle'
import { useThemeStore } from '../../store/themeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const isDark = theme === 'dark'

  return (
    <Toggle
      checked={isDark}
      label={isDark ? 'Dark mode' : 'Light mode'}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  )
}
