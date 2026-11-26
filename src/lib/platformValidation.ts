import type { PlatformName } from "../types";

interface PlatformRule {
    hosts: string[];
    pathMatches?: RegExp;
}

const rules: Record<PlatformName, PlatformRule> = {
    GitHub: { hosts: ["github.com"] },
    YouTube: { hosts: ["youtube.com", "www.youtube.com", "youtu.be"] },
    LinkedIn: { hosts: ["linkedin.com", "www.linkedin.com"], pathMatches: /^\/((in|company)\/[^/]+)(\/.*)?$/i },
    Facebook: { hosts: ["facebook.com", "www.facebook.com"] },
    "Frontend Mentor": { hosts: ["frontendmentor.io", "www.frontendmentor.io"] },
    Twitter: { hosts: ["twitter.com", "www.twitter.com", "x.com", "www.x.com"] },
    Instagram: { hosts: ["instagram.com", "www.instagram.com"] },
    Twitch: { hosts: ["twitch.tv", "www.twitch.tv"] },
    "Dev.to": { hosts: ["dev.to", "www.dev.to"] },
    Codewars: { hosts: ["codewars.com", "www.codewars.com"] },
    CodePen: { hosts: ["codepen.io", "www.codepen.io"] },
    GitLab: { hosts: ["gitlab.com", "www.gitlab.com"] },
    Hashnode: { hosts: ["hashnode.com", "www.hashnode.com"] },
    "Stack Overflow": { hosts: ["stackoverflow.com", "www.stackoverflow.com"] },
};

export const validatePlatformUrl = (
    platform: PlatformName,
    value: string,
): string | undefined => {
    if (!value.trim()) return "Can’t be empty";

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return "Enter a valid URL";
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return "Enter a valid URL";
    }

    const rule = rules[platform];
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const allowedHosts = rule.hosts.map((host) => host.replace(/^www\./, ""));

    if (!allowedHosts.includes(hostname)) {
        return `Please enter a ${platform} URL`;
    }

    if (rule.pathMatches && !rule.pathMatches.test(url.pathname)) {
        return `Please enter a valid ${platform} profile URL`;
    }

    return undefined;
};
