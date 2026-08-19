export interface ContributorSocials {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Contributor {
  id: string;
  name: string;
  githubUsername: string;
  role: string;
  bio: string;
  skills: string[];
  socials: ContributorSocials;
}
