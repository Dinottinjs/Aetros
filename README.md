# Aetros - Zero-Error SaaS Boilerplate

![Aetros Header](public/header.png)

Aetros is a modern, absolutely robust SaaS Boilerplate built for the Next.js App Router. It includes integrated authentication and database using Supabase, styling with TailwindCSS & Shadcn, and robust subscription payments via Stripe.

## Tech Stack

- **Next.js** (App Router, TypeScript)
- **TailwindCSS** + **Shadcn/ui**
- **Supabase** (Auth, PostgreSQL)
- **Stripe** (Checkout, Subscriptions, Webhooks)

## Getting Started

1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase & Stripe keys.
4. Run `npm run dev` to start the development server.

## Antigravity Quick-Customization

This boilerplate is designed to be fully extensible with the help of the AI assistant **Antigravity**. If you purchased or cloned this repository, you can simply run these prompts in your Antigravity IDE plugin to customize your SaaS quickly:

### 1. "Füge ein neues Feature hinzu..."
> "Füge eine neue geschützte Seite unter `/dashboard/settings` hinzu. Integriere ein Shadcn-Formular zur Aktualisierung des Nutzernamens und binde es an die Supabase `profiles` Tabelle. Achte auf Error-Handling."

### 2. "Ändere das Stripe-Preismodell..."
> "Ersetze das aktuelle Pricing-Modell durch zwei neue Pläne: 'Hobby' für 9$/Monat und 'Pro' für 29$/Monat. Aktualisiere die Pricing-Table in `app/page.tsx` und erstelle neue Stripe-Preis-IDs. Zeige mir, wo ich diese in der `.env.local` aktualisieren muss."

### 3. "Passe das Design an..."
> "Ändere das primäre Farbschema von den aktuellen Dark-Mode-Tönen zu einem lebendigen 'Neon-Cyberpunk' Stil. Aktualisiere die `globals.css` Variablen für `--primary` und `--background`, und füge subtile Hover-Glow-Effekte an allen Buttons hinzu."

## License

This project is licensed under the MIT License.
