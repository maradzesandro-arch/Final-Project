import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthAccount {
    email: string;
}

interface AuthStore {
    accounts: AuthAccount[];
    currentUserEmail: string | null;
    isAuthenticated: boolean;
    register: (email: string) => { success: boolean; error?: string };
    login: (email: string) => { success: boolean; error?: string };
    logout: () => void;
}

const AUTH_STORAGE_KEY = "link-sharing-app:auth:v1";

const isAuthAccount = (value: unknown): value is AuthAccount => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.email === "string";
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            accounts: [],
            currentUserEmail: null,
            isAuthenticated: false,

            register: (email) => {
                const normalizedEmail = email.trim().toLowerCase();
                const existingAccount = get().accounts.some(
                    (account) => account.email === normalizedEmail,
                );

                if (existingAccount) {
                    return { success: false, error: "An account with this email already exists" };
                }

                set((state) => ({
                    accounts: [...state.accounts, { email: normalizedEmail }],
                    currentUserEmail: normalizedEmail,
                    isAuthenticated: true,
                }));

                return { success: true };
            },

            login: (email) => {
                const normalizedEmail = email.trim().toLowerCase();
                const accountExists = get().accounts.some(
                    (account) => account.email === normalizedEmail,
                );

                if (!accountExists) {
                    return { success: false, error: "No account found for this email" };
                }

                set({ currentUserEmail: normalizedEmail, isAuthenticated: true });
                return { success: true };
            },

            logout: () => set({ currentUserEmail: null, isAuthenticated: false }),
        }),
        {
            name: AUTH_STORAGE_KEY,
            version: 1,
            partialize: (state) => ({
                accounts: state.accounts,
                currentUserEmail: state.currentUserEmail,
                isAuthenticated: state.isAuthenticated,
            }),
            merge: (persistedState, currentState) => {
                if (!persistedState || typeof persistedState !== "object") {
                    return currentState;
                }

                const candidate = persistedState as Record<string, unknown>;
                const accounts = Array.isArray(candidate.accounts)
                    ? candidate.accounts.filter(isAuthAccount)
                    : [];
                const currentUserEmail = typeof candidate.currentUserEmail === "string"
                    ? candidate.currentUserEmail
                    : null;
                const isAuthenticated = candidate.isAuthenticated === true
                    && currentUserEmail !== null;

                return {
                    ...currentState,
                    accounts,
                    currentUserEmail: isAuthenticated ? currentUserEmail : null,
                    isAuthenticated,
                };
            },
        },
    ),
);
