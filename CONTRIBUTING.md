# Contributing to the Open Source Contributor Directory

Welcome! 🎉 We are excited to have you contribute to the **Open Source Contributor Directory**. This project is designed as both a community directory and a hands-on workshop repository for first-time open-source contributors and developers.

---

## 🚀 Quickstart Guide

### 1. Fork & Clone the Repository
First, fork this repository to your GitHub account, then clone it to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/Open-Source-Contributor-Directory.git
cd Open-Source-Contributor-Directory
```

### 2. Install Dependencies
Install all required project dependencies using `npm`:
```bash
npm install
```

### 3. Start the Local Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.

---

## 🃏 Task 1: Adding Your Contributor Profile Card

Adding your profile card is as simple as appending a single JSON object to [`src/data/contributors.json`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/data/contributors.json)!

### JSON Object Schema

Open [`src/data/contributors.json`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/data/contributors.json) and add your entry to the end of the array:

```json
{
  "id": "unique-id-6",
  "name": "Your Full Name",
  "githubUsername": "your-github-username",
  "role": "Frontend Engineer / UI Designer / DevOps",
  "bio": "A short bio (2-3 sentences) describing your passion for open source and tech stack.",
  "skills": ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  "socials": {
    "github": "https://github.com/your-github-username",
    "linkedin": "https://linkedin.com/in/your-linkedin-handle",
    "portfolio": "https://yourportfolio.dev"
  }
}
```

#### Guidelines for Profile Fields:
- **`id`**: A unique string identifier (e.g. `"6"`, `"john-doe"`).
- **`githubUsername`**: Exact GitHub username (used to automatically render your avatar via `https://github.com/${username}.png`).
- **`skills`**: Array of technology/skill strings (e.g. `["React", "TypeScript", "Node.js"]`).
- **`socials`**: Provide your `github` link, and optionally `linkedin` or `portfolio`.

---

## 🛠️ Task 2: Workshop Starter Issues (PR Exercises)

This repository includes 3 deliberate starter bugs designed for workshop participants to practice debugging and submitting PRs!

### Issue #1: Missing Fallback for Optional Social Links
- **File**: [`src/components/ContributorCard.tsx`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/components/ContributorCard.tsx)
- **Problem**: LinkedIn and Portfolio icons are rendered unconditionally. If a contributor omits `linkedin` or `portfolio` from their JSON data, the card displays broken clickable icons with empty `href` values.
- **Workshop Fix**: Wrap the `Linkedin` and `Globe` anchor tags in conditional checks:
  ```tsx
  {contributor.socials.linkedin && (
    <a href={contributor.socials.linkedin} ...> ... </a>
  )}
  ```

### Issue #2: Card Layout Height Misalignment (Missing `line-clamp-3`)
- **File**: [`src/components/ContributorCard.tsx`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/components/ContributorCard.tsx)
- **Problem**: When a contributor has a lengthy bio, the card expands vertically, creating uneven grid alignment across rows.
- **Workshop Fix**: Add Tailwind's `line-clamp-3` utility class to the bio `<p>` tag:
  ```tsx
  <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
    {contributor.bio}
  </p>
  ```

### Issue #3: Filter Count Not Resetting on Search Clear
- **File**: [`src/components/FilterBar.tsx`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/components/FilterBar.tsx) & [`src/app/page.tsx`](file:///c:/Users/HP/Open%20Source%20Contributor%20Directory/src/app/page.tsx)
- **Problem**: When clearing the search bar input, the results count badge retains a stale count override instead of displaying the actual updated count.
- **Workshop Fix**: Update `countToDisplay` in `FilterBar.tsx` to directly render `filteredCount`, or reset `displayCountOverride` to `null` when search query becomes empty `""`.

---

## 📤 Submitting Your Pull Request (PR)

1. Create a new git branch:
   ```bash
   git checkout -b add-profile-your-name
   ```
2. Commit your changes:
   ```bash
   git add src/data/contributors.json
   git commit -m "feat: add profile card for Your Name"
   ```
3. Push to your fork:
   ```bash
   git push origin add-profile-your-name
   ```
4. Open a Pull Request on GitHub with a description of your additions!

Thank you for contributing! 🚀
