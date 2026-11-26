export type PlatformName =
    | "GitHub"
    | "YouTube"
    | "LinkedIn"
    | "Facebook"
    | "Frontend Mentor"
    | "Twitter"
    | "Instagram"
    | "Twitch"
    | "Dev.to"
    | "Codewars"
    | "CodePen"
    | "GitLab"
    | "Hashnode"
    | "Stack Overflow";

export interface Platform {
    id: string;
    name: PlatformName;
}

export interface Link {
    id: string;
    platform: PlatformName;
    url: string;
}

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
}

export interface User {
    id: string;
    email: string;
    profile: Profile;
}
