# 🌿 VaaniMitra (वाणीमित्र)
### AI-Powered Mother-Tongue Learning & Bilingual Classroom Assistant for Tribal Primary Education

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)](https://expressjs.com)
[![NIPUN Bharat](https://img.shields.io/badge/Aligned-NIPUN_Bharat_%26_NEP_2020-darkgreen?style=flat-square)](#)

---

## 📖 Overview

In rural and tribal regions across **Jharkhand** and Central India, primary school students often face severe learning barriers when stepping into a classroom where textbooks and teacher instructions are strictly in standard Hindi, while their home language is **Santhali**, **Mundari**, **Ho**, or **Kurukh**. Non-tribal educators frequently struggle to communicate effectively, leading to early dropouts and disengagement.

**VaaniMitra (वाणीमित्र)** bridges this linguistic divide. It is a purpose-built educational platform aligned with **NEP 2020 (Mother-Tongue Education)** and **NIPUN Bharat (FLN - Foundational Literacy & Numeracy)**. It equips teachers, village volunteers, and young learners with real-time translation, phonetics in familiar scripts, visual flashcards, automated bilingual worksheets, and local cultural folktales.

---

## ✨ Key Features

### 1. 🎙️ Multimodal Classroom Translation
* **Voice-to-Text & Speech Input**: Teachers can speak naturally in Hindi; VaaniMitra transcribes the speech and translates it into the chosen tribal dialect in real time.
* **Text Translation**: Instant translation between Hindi and indigenous tribal languages with contextual accuracy.
* **Classroom Vision OCR**: Capture or upload photos of textbook pages, handwritten notes, blackboard chalk writings, or classroom objects. The vision engine extracts the content and translates it directly into bilingual teaching material.

### 2. 🔤 Authentic Native Scripts & Phonetic Bridge
* **Authentic Scripts**: Native script support for **Ol Chiki** (Santhali), **Warang Citi** (Ho), **Tolong Siki** (Kurukh), and **Devanagari** (Mundari).
* **Dual Phonetics for Educators**: Because most teachers can read Devanagari but not native scripts like Ol Chiki, every phrase includes:
  * **Devanagari Phonetic Guide** (so teachers can read it aloud fluently).
  * **Roman Phonetic Guide** for accessibility.
  * **Literal Word-by-Word Breakdown** and cultural notes.

### 3. 🗣️ "Say-It-Back" Interactive Pronunciation Coach
* Interactive oral practice module for students and teachers.
* Real-time audio playback using Text-to-Speech (TTS).
* Speech recognition checks pronunciation accuracy and provides encouraging feedback.

### 4. 🗂️ Interactive Vocabulary Flashcards
* Visual, culturally rooted flashcards for every translated phrase.
* Includes custom illustrations and iconography (e.g., Mahua & Sal trees, village wells, local birds, river streams, family).
* Bilingual display (Hindi + Tribal) with audio pronunciation buttons.

### 5. 📄 NIPUN Bharat Worksheet & Village Folktale Generator
* Generates bilingual curriculum worksheets mapped to specific **NIPUN Bharat Learning Outcomes** and grades (Class 1 to Class 5).
* Subject modules for **EVS (Environmental Studies)**, **Mathematics**, and **Language**.
* Creates **5-line local village folktales and mini-stories** centered on tribal culture (forests, hill streams, village festivals).
* **One-Click Printable PDF Export**: Downloads clean, formatted A4 worksheets ready for rural classrooms without internet printer setups.

### 6. 🏛️ Village Word Bank & Community Dialect Validation
* Tribal languages vary significantly by block and district. VaaniMitra includes district-level dialect selections (Dumka, Pakur, Khunti, Chaibasa, Gumla, etc.).
* Enables village elders, teachers, and linguists to suggest corrections, add colloquial words, and verify translations with a confidence indicator (*Verified*, *Dictionary-Match*, *AI-Estimated*).

### 7. ⚡ Offline-First Resilience (On-Device Fallback Engine)
* Designed for remote rural areas with intermittent connectivity.
* If internet access drops or API quotas are reached, VaaniMitra automatically falls back to an integrated on-device tribal dictionary and phonetic lexicon engine, ensuring zero classroom downtime.

---

## 🗺️ Supported Languages & Dialects

| Language | Native Script | Primary Regions in Jharkhand | Sample Greeting |
| :--- | :--- | :--- | :--- |
| **Santhali (संथाली)** | Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) | Dumka, Pakur, Jamtara, East Singhbhum | *Johar! (ᱡᱚᱦᱟᱨ)* |
| **Mundari (मुंडारी)** | Devanagari / Bani Hisir | Khunti, Ranchi, Simdega | *Johar! (जोहार)* |
| **Ho (हो)** | Warang Citi / Devanagari | West Singhbhum (Chaibasa), Saraikela | *Jowar! (जोवार)* |
| **Kurukh / Oraon (कुड़ुख)** | Tolong Siki / Devanagari | Gumla, Lohardaga, Latehar | *Jai Dharme! (जय धर्मे)* |

---

## 🛠️ Architecture & Tech Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React Icons, Framer Motion
* **Backend**: Node.js, Express, TSX, Vite (Middleware Mode)
* **AI & Linguistic Engine**: Gemini Multimodal & Vision API with automatic multi-tier fallback (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, `gemini-3.8-flash`, `gemini-flash-latest`)
* **Local Fallback Engine**: On-device rule-based morphological translator & tribal dictionary
* **Document Generation**: jsPDF for instant classroom worksheet generation

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0 or higher recommended)
* **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mishraayush09/vaanimitra.git
   cd vaanimitra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   APP_URL="http://localhost:3000"
   ```
   *(Note: If no API key is provided, the platform automatically runs on the integrated on-device tribal dictionary engine).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```text
vaanimitra/
├── src/
│   ├── components/
│   │   ├── LandingHomeScreen.tsx       # Main landing view & translation interface
│   │   ├── WorksheetGeneratorScreen.tsx # NIPUN Bharat bilingual worksheet generator
│   │   ├── SayItBackCoach.tsx          # Interactive pronunciation coach
│   │   ├── VillageWordBankModal.tsx    # Community dialect corrections & dictionary
│   │   ├── TeacherDashboardScreen.tsx  # Teacher analytics & classroom history
│   │   ├── FlashcardIllustration.tsx   # Cultural SVG flashcard graphics
│   │   ├── ProfileScreen.tsx           # School block & dialect configuration
│   │   └── AuthScreen.tsx              # Teacher sign-in & onboarding
│   ├── data/
│   │   └── vaaniData.ts                # District blocks, NIPUN outcomes & vocabularies
│   ├── utils/
│   │   ├── speechAndPdf.ts             # Web Speech synthesis & jsPDF export
│   │   └── tribalTranslator.ts         # Offline tribal translation engine
│   ├── App.tsx                         # Core application router & state
│   ├── index.css                       # Design tokens & styles
│   └── main.tsx                        # React application root
├── server.ts                           # Express backend & Gemini API integration
├── vite.config.ts                      # Vite configuration
├── package.json                        # Dependencies and scripts
└── README.md                           # Documentation
```

---

## 🤝 Community & Contribution

VaaniMitra is an open initiative aimed at preserving endangered indigenous languages and empowering young tribal students through foundational mother-tongue education. 

Contributions from educators, linguists, native speakers, and developers are warmly welcomed:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AddDialectData`)
3. Commit your Changes (`git commit -m 'Add dialect vocabulary for Littipara block'`)
4. Push to the Branch (`git push origin feature/AddDialectData`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
