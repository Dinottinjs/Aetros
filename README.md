# 🚀 Aetros – Die ultimative Zero-Error SaaS Boilerplate 💻

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/Lizenz-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Plattform-Windows%20%7C%20Linux%20%7C%20macOS-orange.svg)](#)

**Aetros** ist ein hochmodernes, ausfallsicheres Software-as-a-Service (SaaS) Boilerplate-System. Es bündelt eine fehlerfreie Next.js Architektur mit einer strikten Typisierung, einem wunderschönen Dark-Mode-Design (Shadcn/ui), einer vollständigen Benutzer- und Datenbankverwaltung via Supabase sowie einer nahtlosen und robusten Stripe-Integration für Zahlungen.

---

## 🌟 Hauptfeatures im Überblick

### 🖥️ Premium UI & Conversion Landingpage
* **Modernes Design:** Perfekt optimiert für maximale Conversion, inklusive Hero-Section und Pricing-Table.
* **Shadcn & TailwindCSS:** Vollständig anpassbare Komponenten in einem durchdachten Dark-Mode Layout.

### 💳 Stripe Zahlungsabwicklung & Monetarisierung
* **Abo-Verwaltung:** Checkout Sessions für "Starter", "Pro" und "Enterprise" Pläne.
* **100% Robuster Webhook:** Fehlerfreie Synchronisation von Abonnements, Kündigungen und Updates direkt in die Datenbank, abgesichert gegen Replay-Angriffe.
* **Customer Portal:** Direkter Link zum Stripe Billing Portal für Nutzer.

### 👥 Datenbank- & Rechtesystem (Supabase)
* **Integrierte Benutzerverwaltung:** Registrierung und Anmeldung mit nahtloser Session-Verwaltung in einer Next.js Middleware.
* **Nutzer-Dashboard:** Ein eigenes Control-Panel für Endnutzer zum Verwalten von Profil-Daten (Name, Avatar) und Abonnement-Status.
* **Row-Level-Security (RLS):** Sämtliche Datenbank-Abfragen sind durch strenge Supabase RLS Policies abgesichert.

---

## 🛠️ Systemarchitektur

```
                                  +-----------------------+
                                  |     Browser-Client    |
                                  |  (React Server Comp.) |
                                  +-----------+-----------+
                                              | HTTP / Auth Cookies
                                              v
+-----------------------------------------------------------------------------------------+
|                                         AETROS                                          |
|                                                                                         |
|   +-----------------------+   +-----------------------+   +-------------------------+   |
|   |    Next.js App-Router |   |  Tailwind / Shadcn UI |   |  Stripe Checkout API    |   |
|   |    (Middleware)       |   |  (Frontend Design)    |   |  (/api/stripe/checkout) |   |
|   +-----------------------+   +-----------+-----------+   +-------------------------+   |
|                                           |                                             |
+-------------------------------------------|---------------------------------------------+
                                            |
                         +------------------+-------------------+
                         |                                      |
                         v                                      v
            +--------------------------+           +--------------------------+
            |      Supabase (DB)       |           |          Stripe          |
            | - profiles Tabelle       | <-------- | - Webhooks (Sync)        |
            | - subscriptions Tabelle  |           | - Zahlungsabwicklung     |
            +--------------------------+           +--------------------------+
```

---

## ⚙️ Installation & Autostart

Aetros wird mit speziellen Installationsskripten geliefert, die den kompletten Start vereinfachen.

### 🪟 Installation & Setup
1. Lade dir das Repository herunter und entpacke es.
2. Führe die Datei `setup.bat` mit einem Doppelklick aus.
3. Das Skript installiert alle Node.js-Abhängigkeiten (`npm install`) in einer farbenfrohen Konsole und erstellt automatisch deine `.env.local` Datei sowie ein Deinstallationsskript.
4. **WICHTIG:** Trage in der erstellten `.env.local` deine Supabase- und Stripe-Keys ein!
5. Führe die Datei `launch.bat` aus. Das Skript sucht automatisch einen freien Port (ab `3000`) und startet den Server ohne Port-Konflikte.

---

## 🤖 Antigravity Quick-Customization

Diese Boilerplate ist dafür konzipiert, mit dem KI-Assistenten **Antigravity** erweitert zu werden:
* **Neues Feature:** *"Füge eine neue geschützte Seite unter `/dashboard/analytics` hinzu. Integriere ein Shadcn-Chart."*
* **Stripe anpassen:** *"Ersetze das aktuelle Pricing-Modell durch 'Hobby' für 9$/Monat. Aktualisiere die Pricing-Table."*
* **Design ändern:** *"Ändere das Farbschema zu einem lebendigen 'Neon-Cyberpunk' Stil in der globals.css."*

---

## 🧹 Rückstandslose Deinstallation

Sollte das Projekt entfernt werden müssen, sorgt das generierte Deinstallationsskript dafür, dass das System aufgeräumt wird:

* **Unter Windows:** Führe die Datei `uninstall.bat` aus. Sie löscht den kompletten `node_modules`-Ordner sowie den `.next` Build-Ordner sicher und zuverlässig.

---

## 📝 Lizenz & Rechtliches

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Copyright (c) 2026 Maximilian Holzer. Siehe die `LICENSE` Datei für Details.
