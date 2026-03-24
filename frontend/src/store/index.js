import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    }),
    {
      name: 'lms-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        const next = !get().isDark
        set({ isDark: next })
        if (next) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      initTheme: () => {
        const { isDark } = get()
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }),
    {
      name: 'lms-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
