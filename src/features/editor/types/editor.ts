import type { Link, Profile } from "../../../types";

export interface EditorDraft {
    links: Link[];
    profile: Profile;
}

export type EditorSaveStatus = "idle" | "saving" | "saved" | "error";
