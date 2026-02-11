

# SR Forty Seven — O Professor Digital

## Premium Digital Marketing & Affiliate Platform for Mozambican Entrepreneurs

---

### 🎨 Design System
- **Aesthetic**: Liquid glassmorphism with frosted glass cards, glowing borders (blue/magenta), fluid gradient backgrounds, and subtle wave animations
- **Colors**: Primary blue (#0066FF), accent magenta (#E100E1), navy (#0A1A3D), light (#F5F7FA), dark (#121826)
- **Light/dark mode** with smooth toggle transition (sun/moon icon in header)
- **Mobile-first** optimized for 375-428px with bottom navigation bar (Home, Módulos, Comunidade, Perfil)
- **Micro-animations**: Ripple on tap, card lift/scale, glow intensify on hover/focus

---

### 📱 Screen 1: Landing Page (Sales/Home)
- Animated liquid gradient hero with title "SR Forty Seven — O Professor Digital" and Portuguese subtitle
- Benefits grid with glassmorphism cards
- Hot niches preview cards (casas de apostas, Hotmart, Airtm)
- Testimonials carousel
- Pricing comparison: two glass cards — **Start 799 MT** vs **Intensivo 1299 MT** with feature comparison table
- FAQ accordion
- Sticky bottom CTA button

### 📱 Screen 2: Signup/Login + Payment Flow
- Centered glass form on gradient background (name, email, phone, password)
- Plan selection step after signup
- Mock M-Pesa/e-Mola checkout form → success modal with confetti animation → redirect to dashboard with plan badge

### 📱 Screen 3: Dashboard (Post-login Hub)
- Greeting with plan badge (Start or Intensivo)
- Circular progress ring + **14-Day Fast Plan** interactive checklist (daily tasks, clickable/markable)
- Stats cards: Campanhas ativas, Comissões estimadas, Tarefas hoje
- Quick access cards to hot modules (Airtm, Casas de Apostas, etc.)

### 📱 Screen 4: Modules List
- 13 scrollable glassmorphism module cards with icons, descriptions, and progress bars
- Modules 9-13 show lock icon + "Intensivo Exclusivo" badge for Start plan users
- Tap any unlocked module → Module Detail screen

### 📱 Screen 5: Module Detail & Lessons (Reusable Template)
- Tabs: **Vídeo** (embed player) | **Recursos** (PDF/template download buttons) | **Exercícios** (interactive) | **Referências** (links)
- **Module-specific highlights:**
  - **Mod 1 (Nichos)**: Grid cards for 888Bet, Aviator, Elephant Bet, Hotmart, Workana, Upwork
  - **Mod 2 (Conteúdo Celular)**: Image/video upload with preview of created post
  - **Mod 4 (Plataformas Afiliados)**: Interactive carousel/stepper for platform account creation
  - **Mod 7 (Airtm)**: Full payment simulator — numbered steps with mock forms (M-Pesa → Airtm → PayPal/USDT) with success animations
  - **Mod 9 (Casas de Apostas Avançado)**: Tabs per platform, example ads, ad builder exercise (copy + image + targeting), "Enviar feedback Professor" section
  - **Mod 10 (Google Ads)**: Interactive ad builder form
  - **Mod 12 (Cripto/Forex)**: Coinbase setup stepper, risk warning banner, quiz

### 📱 Screen 6: Exercises System
- Quizzes with instant scoring and feedback
- Form-based exercises (copy/headline writing)
- File upload for created posts/ads
- Submission → success modal + progress save
- Intensivo-only: Extra feedback section with mock professor comments

### 📱 Screen 7: Community Screen
- Chat interface with glassmorphism message bubbles
- Fixed bottom input bar
- Mock messages showing community interaction

### 📱 Screen 8: Profile/Settings
- User info display with plan badge
- Upgrade CTA for Start users → payment flow
- Dark mode toggle
- Logout button

---

### 🔧 Technical Approach
- All data stored in React state (no backend needed for prototype)
- Dark/light mode via CSS variables with smooth transitions
- Bottom navigation with active state indicators
- `framer-motion` for micro-animations and page transitions
- Fully linked navigation flow across all screens
- Responsive: mobile-primary with desktop adaptation

