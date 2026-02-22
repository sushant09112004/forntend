# Shadcn components used by Landing Page

Add these via shadcn CLI if not already in the project:

- **Button** – CTAs (Upload Resume, Try Free Now, Get Started, Start Free Today)
- **Card** (CardContent, CardHeader) – sections, features, pricing, testimonials, problem/solution blocks
- **Separator** – optional dividers (used in PricingSection)
- **Avatar** (AvatarFallback) – testimonial placeholders
- **Badge** – added at `src/components/ui/badge.jsx` (used in HeroSection for trust indicators; can use plain divs if you prefer)

Already present in your project: `button`, `card`, `separator`, `avatar`.  
**New file added:** `badge.jsx` (shadcn-style Badge). If you prefer to install via CLI instead, run:

```bash
npx shadcn@latest add badge
```

Then remove or replace the local `src/components/ui/badge.jsx` if it conflicts.
