import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { EditorSaveStatus } from "../features/editor/types";
import type { Link, PlatformName, Profile } from "../types";

const STORAGE_KEY = "link-sharing-app:editor:v1";

const defaultProfile: Profile = {
  firstName: "Ben",
  lastName: "Wright",
  email: "ben@example.com",
};

interface EditorStore {
  links: Link[];
  profile: Profile;
  saveStatus: EditorSaveStatus;
  addLink: () => void;
  updateLink: (id: string, updates: Partial<Omit<Link, "id">>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (id: string, direction: "up" | "down") => void;
  updateProfile: (updates: Partial<Profile>) => void;
  updateAvatar: (avatarUrl: string) => void;
  resetEditor: () => void;
  setSaveStatus: (status: EditorSaveStatus) => void;
}

const isPlatformName = (value: unknown): value is PlatformName =>
  typeof value === "string" && [
    "GitHub",
    "YouTube",
    "LinkedIn",
    "Facebook",
    "Frontend Mentor",
    "Twitter",
    "Instagram",
    "Twitch",
    "Dev.to",
    "Codewars",
    "CodePen",
    "GitLab",
    "Hashnode",
    "Stack Overflow",
  ].includes(value);

const isLink = (value: unknown): value is Link => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "string"
    && isPlatformName(candidate.platform)
    && typeof candidate.url === "string";
};

const isProfile = (value: unknown): value is Profile => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.firstName === "string"
    && typeof candidate.lastName === "string"
    && typeof candidate.email === "string"
    && (candidate.avatarUrl === undefined || typeof candidate.avatarUrl === "string");
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      links: [],
      profile: defaultProfile,
      saveStatus: "idle",

      addLink: () => set((state) => ({
        links: [
          ...state.links,
          {
            id: `link-${Date.now()}-${state.links.length}`,
            platform: "GitHub",
            url: "",
          },
        ],
        saveStatus: "idle",
      })),

      updateLink: (id, updates) => set((state) => ({
        links: state.links.map((link) =>
          link.id === id ? { ...link, ...updates } : link,
        ),
        saveStatus: "idle",
      })),

      removeLink: (id) => set((state) => ({
        links: state.links.filter((link) => link.id !== id),
        saveStatus: "idle",
      })),

      reorderLinks: (id, direction) => set((state) => {
        const index = state.links.findIndex((link) => link.id === id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (index < 0 || targetIndex < 0 || targetIndex >= state.links.length) {
          return state;
        }

        const links = [...state.links];
        const [movedLink] = links.splice(index, 1);
        if (!movedLink) return state;
        links.splice(targetIndex, 0, movedLink);

        return { links, saveStatus: "idle" };
      }),

      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates },
        saveStatus: "idle",
      })),

      updateAvatar: (avatarUrl) => set((state) => ({
        profile: { ...state.profile, avatarUrl },
        saveStatus: "idle",
      })),

      resetEditor: () => set({
        links: [],
        profile: { ...defaultProfile },
        saveStatus: "idle",
      }),

      setSaveStatus: (saveStatus) => set({ saveStatus }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      partialize: (state) => ({
        links: state.links,
        profile: state.profile,
      }),
      merge: (persistedState, currentState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return currentState;
        }

        const candidate = persistedState as Record<string, unknown>;
        const links = Array.isArray(candidate.links)
          ? candidate.links.filter(isLink)
          : currentState.links;
        const profile = isProfile(candidate.profile)
          ? candidate.profile
          : currentState.profile;

        return { ...currentState, links, profile };
      },
    },
  ),
);
