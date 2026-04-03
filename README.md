# THE COLLECTION – Academic Survey 2026

**Full Questionnaire — IIT Kharagpur Student Edition**

An academic research survey on sustainable fashion consumption behaviour among IIT Kharagpur students, built with React + TypeScript + Vite and deployed on Vercel.

---

## 🌿 About

This survey collects data across five key sections:

1. **Eligibility Check** — Past fashion purchase history
2. **About You (Demographics)** — Age, gender, education, income, city, spending habits, and sustainability awareness
3. **Attitudes, Beliefs & Influences** — Fashion involvement, environmental knowledge, eco-concern, attitudes, social norms, perceived behavioural control, and consumer effectiveness
4. **Realities & Barriers** — Price sensitivity, scepticism, brand trust, social media influence, and product availability
5. **Intentions & Behaviour** — Purchase intentions and actual sustainable behaviour

All Likert-scale questions (Sections 3–5) use a **1 = Strongly Disagree → 5 = Strongly Agree** scale.

---

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend / DB**: Supabase
- **Deployment**: Vercel (auto-deploys on push to `main`)

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Build & Deploy

```bash
npm run build
```

Vercel automatically builds and deploys on every push to the `main` branch via the GitHub integration. No manual deployment steps needed.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # SurveyLayout (header, progress bar, footer)
│   └── ui/           # LikertScale, SemanticDiffScale, QuestionCard
├── data/
│   └── questions.ts  # All survey sections and question definitions
├── hooks/
│   └── useSurvey.ts  # Global survey state context
├── pages/
│   ├── landing/      # LandingPage, ScreenerPage, ThankYouPage
│   ├── demographics/ # DemographicsPage (Section 2)
│   └── survey/       # SurveySection (Sections 3–5)
├── services/         # Supabase client & submission logic
└── types/
    └── survey.ts     # SurveyResponse type definition
```

---

## 🔐 Environment Variables

Create a `.env` file at the root (see `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

*Academic Research Study • India • 2026*
