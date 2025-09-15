# The Carenest Directory

The Carenest is a calm, high-end directory for wellbeing and care support in Colchester, Tendring, and nearby. It helps families and individuals discover trusted care providers, resources, and support options.

## Features

- **Modern Next.js 15 app** with TypeScript and Tailwind CSS
  - **Sanity.io CMS** for content management (pages, blogs, FAQs, directory entries, categories, site settings, and more)
  - **Embedded Sanity Studio** for client to manage all website content at `/studio`
- **Search and filter** (Fuse.js, coming soon)
- **Contact form** for families to reach out
- **Accessible, beautiful UI** (Inter/Manrope fonts, soft accent colors, focus styles)
- **Responsive design** for all devices
- **Map integration** (coming soon)

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Sanity.io](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Fuse.js](https://fusejs.io/) (search)
- [Zod](https://zod.dev/) (validation)
- [Lucide React](https://lucide.dev/) (icons)

## Folder Structure

- `src/components/ui/` – Reusable UI components (Header, Footer, Button, etc.)
- `src/lib/` – Sanity client, GROQ queries, utilities
- `src/types/` – TypeScript types for Sanity content
- `src/app/` – Next.js app routes (home, directory, contact, privacy, terms)
- `src/app/studio/schemas/` – Sanity schema definitions (all content types)

## Setup & Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/asyncasana/the-carenest.git
   cd the-carenest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or yarn, pnpm, bun
   ```
3. **Set up environment variables:**
   - Copy `.env.local` and fill in your Sanity and email provider keys.
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Content Management

- All website content (pages, blogs, FAQs, directory listings, categories, site settings, etc.) is managed in the embedded Sanity Studio at `/studio`.
- Schemas for all content types are in `src/app/studio/schemas/`.
- Types for content are in `src/types/content.ts`.

## Customization

- **Accent color:** `#f4f0e0` (Tailwind: `bg-accent`)
- **Main text color:** `#0d0c06` (Tailwind: `text-text-main`)
- **Logo:** Place your logo in `/public/logo.svg` and it will appear in the header.

## Footer Links

- Terms, Privacy, and Instagram are linked in the footer.

## Deployment

Deploy on [Vercel](https://vercel.com/) or your preferred platform.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

© 2025 The Carenest. All rights reserved.
