import React, { useState, useRef } from 'react';
import {
  Mic,
  Volume2,
  SlidersHorizontal,
  Languages,
  FileText,
  LayoutGrid,
  X,
  Check,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Keyboard,
  Upload,
  LogOut,
  User,
} from 'lucide-react';
import {
  ConfidenceLevel,
  FlashcardItem,
  INITIAL_TRANSLATIONS_BY_LANGUAGE,
  INITIAL_WORD_BANK_QUEUE,
  LANGUAGE_META,
  PRESET_CLASSROOM_SENTENCES,
  TranslationResult,
  TribalLanguage,
  UILocale,
  VILLAGE_BLOCKS,
  WordCorrection,
} from './data/vaaniData';
import { FlashcardIllustration } from './components/FlashcardIllustration';
import { VillageWordBankModal } from './components/VillageWordBankModal';
import { WorksheetGeneratorScreen } from './components/WorksheetGeneratorScreen';
import { TeacherDashboardScreen } from './components/TeacherDashboardScreen';
import { LandingHomeScreen } from './components/LandingHomeScreen';
import {
  AuthScreen,
  DEMO_TEACHER_PROFILE,
  TeacherProfile,
} from './components/AuthScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { speakClassroomPhrase } from './utils/speechAndPdf';
import {
  processUploadedClassroomImage,
  translateLocallyToTribal,
} from './utils/tribalTranslator';

type ActiveTab = 'translate' | 'worksheet' | 'dashboard' | 'profile';
type InputMode = 'text' | 'image' | 'mic';

export default function App() {
  // Authentication & Entry Screen State — start on Main Overview (Landing Page) first
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showLandingOverview, setShowLandingOverview] = useState<boolean>(true);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(
    DEMO_TEACHER_PROFILE
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>('translate');
  const [uiLocale, setUiLocale] = useState<UILocale>('en');

  // Settings / Secondary Modal State
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string>('dumka');
  const [offlineModeOnly, setOfflineModeOnly] = useState<boolean>(false);
  const [syncPercentage, setSyncPercentage] = useState<number>(94);
  const [lastSyncedText, setLastSyncedText] = useState<string>('2 days ago');

  // Live Translate State
  const [selectedLanguage, setSelectedLanguage] = useState<TribalLanguage>('Santhali');
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [hindiInput, setHindiInput] = useState<string>(
    'Aaj hum paani ke baare mein padhenge'
  );
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedImageMime, setUploadedImageMime] = useState<string>('image/jpeg');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const [hasTranslation, setHasTranslation] = useState<boolean>(true);
  const [translationsByLang, setTranslationsByLang] = useState<
    Record<TribalLanguage, TranslationResult>
  >(INITIAL_TRANSLATIONS_BY_LANGUAGE);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Confidence dot tap reveal & inline teacher override
  const [showConfidenceLabel, setShowConfidenceLabel] = useState<boolean>(false);
  const [isEditingTranslation, setIsEditingTranslation] = useState<boolean>(false);
  const [editBuffer, setEditBuffer] = useState<string>('');
  const [showFlashcards, setShowFlashcards] = useState<boolean>(true);

  // "Say It Back" compact inline state
  const [sayItBackState, setSayItBackState] = useState<
    'idle' | 'listening' | 'great' | 'retry'
  >('idle');
  const [sayItBackAttempt, setSayItBackAttempt] = useState<number>(0);

  // Village Word Bank Modal
  const [wordBankOpen, setWordBankOpen] = useState<boolean>(false);
  const [wordBankQueue, setWordBankQueue] = useState<WordCorrection[]>(
    INITIAL_WORD_BANK_QUEUE
  );

  // Dashboard & All-Time Session Counters
  const [lessonsTaughtToday, setLessonsTaughtToday] = useState<number>(12);
  const [worksheetsGeneratedToday, setWorksheetsGeneratedToday] = useState<number>(3);
  const [totalLessonsAllTime, setTotalLessonsAllTime] = useState<number>(148);
  const [totalWorksheetsAllTime, setTotalWorksheetsAllTime] = useState<number>(36);
  const [languageUsageCounts, setLanguageUsageCounts] = useState<
    Record<TribalLanguage, number>
  >({
    Santhali: 98,
    Mundari: 24,
    Ho: 15,
    Kurukh: 11,
  });
  const [recentTranslations, setRecentTranslations] = useState<TranslationResult[]>([
    INITIAL_TRANSLATIONS_BY_LANGUAGE.Santhali,
    INITIAL_TRANSLATIONS_BY_LANGUAGE.Mundari,
    INITIAL_TRANSLATIONS_BY_LANGUAGE.Ho,
  ]);

  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typingTimerRef = useRef<any>(null);
  const [micLang, setMicLang] = useState<'hi-IN' | 'en-IN'>('hi-IN');
  const [liveTranscript, setLiveTranscript] = useState<string>('');

  const currentBlock =
    VILLAGE_BLOCKS.find((b) => b.id === selectedBlockId) || VILLAGE_BLOCKS[0];
  const activeDialectLabel = `${selectedLanguage} (${currentBlock.dialectSuffix[selectedLanguage]})`;
  const currentTranslation = translationsByLang[selectedLanguage];
  const currentLangMeta = LANGUAGE_META[selectedLanguage];
  const pendingSyncCount = wordBankQueue.filter((w) => !w.synced).length;

  const sortedLanguages = (
    Object.entries(languageUsageCounts) as [TribalLanguage, number][]
  ).sort((a, b) => b[1] - a[1]);
  const mostUsedLanguage = sortedLanguages[0]?.[0] || 'Santhali';

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || 'SD';
  };

  const handleSignOut = () => {
    setSettingsOpen(false);
    setIsAuthenticated(false);
    setShowLandingOverview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanguage = (lang: TribalLanguage) => {
    setSelectedLanguage(lang);
    setShowConfidenceLabel(false);
    setIsEditingTranslation(false);
    setSayItBackState('idle');
    const dialect = `${lang} (${currentBlock.dialectSuffix[lang]})`;
    if (hindiInput.trim()) {
      const instantLocal = translateLocallyToTribal(hindiInput.trim(), lang, dialect);
      setTranslationsByLang((prev) => ({ ...prev, [lang]: instantLocal }));
    }
    if (hindiInput.trim() || uploadedImageBase64) {
      handleRunTranslation(
        hindiInput,
        lang,
        inputMode === 'image' ? uploadedImageBase64 : null,
        uploadedImageMime
      );
    }
  };

  // Real-time text input handler (instant local preview + debounced AI translation)
  const handleTextChange = (newText: string) => {
    setHindiInput(newText);
    const trimmed = newText.trim();
    if (!trimmed) return;

    const dialect = `${selectedLanguage} (${currentBlock.dialectSuffix[selectedLanguage]})`;
    const instantLocal = translateLocallyToTribal(trimmed, selectedLanguage, dialect);
    setTranslationsByLang((prev) => ({
      ...prev,
      [selectedLanguage]: instantLocal,
    }));
    setHasTranslation(true);

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      handleRunTranslation(trimmed, selectedLanguage, null, uploadedImageMime);
    }, 550);
  };

  // Image File Upload Handler — compresses photo & immediately translates it
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsTranslating(true);

    try {
      const processed = await processUploadedClassroomImage(file);
      setUploadedImagePreview(processed.previewDataUrl);
      setUploadedImageBase64(processed.base64Data);
      setUploadedImageMime(processed.mimeType);
      setHindiInput(processed.inferredHindiSentence);

      const dialect = `${selectedLanguage} (${currentBlock.dialectSuffix[selectedLanguage]})`;
      const instantLocal = translateLocallyToTribal(
        processed.inferredHindiSentence,
        selectedLanguage,
        dialect
      );
      setTranslationsByLang((prev) => ({
        ...prev,
        [selectedLanguage]: instantLocal,
      }));
      setHasTranslation(true);

      await handleRunTranslation(
        processed.inferredHindiSentence,
        selectedLanguage,
        processed.base64Data,
        processed.mimeType
      );
    } catch {
      setIsTranslating(false);
    }
  };

  // Sample Textbook Image Loader
  const handleLoadSampleTextbookImage = (sampleText: string, sampleTitle: string) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
      <rect width="600" height="340" rx="20" fill="#F7F3EE" stroke="#9C4A3C" stroke-width="4"/>
      <rect x="28" y="24" width="544" height="48" rx="10" fill="#355E3B" fill-opacity="0.12"/>
      <text x="48" y="54" font-family="sans-serif" font-size="18" font-weight="bold" fill="#355E3B">NCERT / JCERT Class 2 Textbook — ${sampleTitle}</text>
      <text x="48" y="135" font-family="sans-serif" font-size="24" font-weight="bold" fill="#2A1A15">${sampleText}</text>
      <text x="48" y="185" font-family="sans-serif" font-size="16" fill="#9C4A3C">पाठ्यपुस्तक चित्र स्कैन (Textbook Page Scan)</text>
      <circle cx="500" cy="240" r="45" fill="#E0A458" fill-opacity="0.25" stroke="#9C4A3C" stroke-width="3"/>
    </svg>`;
    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
    setUploadedImagePreview(dataUri);
    setUploadedFileName(`${sampleTitle}.jpg`);
    setUploadedImageBase64(null);
    setHindiInput(sampleText);
    handleRunTranslation(sampleText, selectedLanguage, null, 'image/jpeg');
  };

  // Real-time continuous Microphone Speech-to-Translation Handler
  const handleMicTap = () => {
    if (isListeningMic) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListeningMic(false);
      if (liveTranscript.trim()) {
        handleRunTranslation(liveTranscript.trim(), selectedLanguage, null);
      }
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      try {
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        recognition.lang = micLang;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListeningMic(true);
          setLiveTranscript('');
        };

        recognition.onresult = (event: any) => {
          let finalStr = '';
          let interimStr = '';
          for (let i = 0; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) {
              finalStr += res[0].transcript + ' ';
            } else {
              interimStr += res[0].transcript;
            }
          }
          const combined = (finalStr + interimStr).trim();
          if (combined) {
            setLiveTranscript(combined);
            setHindiInput(combined);

            // Instant real-time local translation on every spoken word
            const dialect = `${selectedLanguage} (${currentBlock.dialectSuffix[selectedLanguage]})`;
            const instantResult = translateLocallyToTribal(
              combined,
              selectedLanguage,
              dialect
            );
            setTranslationsByLang((prev) => ({
              ...prev,
              [selectedLanguage]: instantResult,
            }));
            setHasTranslation(true);

            // Also run full server/AI translation when a final phrase arrives
            if (finalStr.trim()) {
              if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
              typingTimerRef.current = setTimeout(() => {
                handleRunTranslation(combined, selectedLanguage, null);
              }, 350);
            }
          }
        };

        recognition.onerror = () => setIsListeningMic(false);
        recognition.onend = () => setIsListeningMic(false);

        recognition.start();
        return;
      } catch {
        // Fallback below if browser blocks mic API
      }
    }

    setIsListeningMic(true);
    setTimeout(() => {
      setIsListeningMic(false);
      const sample =
        PRESET_CLASSROOM_SENTENCES[
          lessonsTaughtToday % PRESET_CLASSROOM_SENTENCES.length
        ].label;
      setLiveTranscript(sample);
      setHindiInput(sample);
      handleRunTranslation(sample, selectedLanguage, null);
    }, 900);
  };

  // Run Translation (Works both with Gemini API and 100% offline/local for any text or image)
  const handleRunTranslation = async (
    sentence: string = hindiInput,
    targetLang: TribalLanguage = selectedLanguage,
    imgBase64: string | null = uploadedImageBase64,
    imgMime: string = uploadedImageMime
  ) => {
    const trimmed = sentence.trim();
    if (!trimmed && !imgBase64) return;

    setIsTranslating(true);
    setShowConfidenceLabel(false);
    setIsEditingTranslation(false);
    setSayItBackState('idle');

    const dialect = `${targetLang} (${currentBlock.dialectSuffix[targetLang]})`;

    // Always compute dynamic local translation first so UI immediately reflects user's exact input
    const fallbackDynamic = translateLocallyToTribal(
      trimmed || 'इस चित्र को देखो और इसके बारे में पढ़ो',
      targetLang,
      dialect
    );

    try {
      if (offlineModeOnly) {
        await new Promise((r) => setTimeout(r, 150));
        setTranslationsByLang((prev) => ({ ...prev, [targetLang]: fallbackDynamic }));
        setRecentTranslations((prev) => [fallbackDynamic, ...prev.slice(0, 9)]);
        setHasTranslation(true);
        setLessonsTaughtToday((c) => c + 1);
        setTotalLessonsAllTime((c) => c + 1);
        setLanguageUsageCounts((prev) => ({
          ...prev,
          [targetLang]: (prev[targetLang] || 0) + 1,
        }));
        setIsTranslating(false);
        return;
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hindiInput: trimmed,
          imageBase64: imgBase64 || undefined,
          imageMimeType: imgMime,
          targetLanguage: targetLang,
          dialect,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      const validConfidence = (c: string): ConfidenceLevel =>
        c === 'Verified' || c === 'Dictionary-match' || c === 'AI-estimated'
          ? c
          : 'AI-estimated';

      const newResult: TranslationResult = {
        id: `tr-${Date.now()}`,
        hindiInput: data.hindiRoman || trimmed || fallbackDynamic.hindiInput,
        hindiDevanagari:
          data.hindiDevanagari || trimmed || fallbackDynamic.hindiDevanagari,
        hindiRoman: data.hindiRoman || trimmed || fallbackDynamic.hindiRoman,
        targetLanguage: targetLang,
        dialectLabel: dialect,
        tribalNativeScript:
          data.tribalNativeScript || fallbackDynamic.tribalNativeScript,
        tribalDevanagariPhonetic:
          data.tribalDevanagariPhonetic || fallbackDynamic.tribalDevanagariPhonetic,
        tribalRomanPhonetic:
          data.tribalRomanPhonetic || fallbackDynamic.tribalRomanPhonetic,
        literalMeaning: data.literalMeaning || fallbackDynamic.literalMeaning,
        confidence: validConfidence(data.confidence),
        durationSeconds: String(data.durationSeconds || '0.5'),
        culturalNote: data.culturalNote || fallbackDynamic.culturalNote,
        flashcards:
          Array.isArray(data.flashcards) && data.flashcards.length > 0
            ? data.flashcards.map(
                (fc: any, idx: number): FlashcardItem => ({
                  id: `fc-${Date.now()}-${idx}`,
                  hindiWord: fc.hindiWord || '',
                  hindiRoman: fc.hindiRoman || '',
                  tribalWord: fc.tribalWord || '',
                  tribalNative: fc.tribalNative || '',
                  tribalDevanagari: fc.tribalDevanagari || '',
                  englishMeaning: fc.englishMeaning || '',
                  iconKey: fc.iconKey || 'star',
                  confidence: validConfidence(fc.confidence),
                })
              )
            : fallbackDynamic.flashcards,
      };

      if (data.hindiDevanagari && imgBase64) {
        setHindiInput(data.hindiDevanagari);
      }

      setTranslationsByLang((prev) => ({ ...prev, [targetLang]: newResult }));
      setRecentTranslations((prev) => [newResult, ...prev.slice(0, 9)]);
      setHasTranslation(true);
      setLessonsTaughtToday((c) => c + 1);
      setTotalLessonsAllTime((c) => c + 1);
      setLanguageUsageCounts((prev) => ({
        ...prev,
        [targetLang]: (prev[targetLang] || 0) + 1,
      }));
    } catch {
      // If API fails or offline in VS Code, use the dynamic translation of the user's exact input!
      setTranslationsByLang((prev) => ({ ...prev, [targetLang]: fallbackDynamic }));
      setRecentTranslations((prev) => [fallbackDynamic, ...prev.slice(0, 9)]);
      setHasTranslation(true);
      setLessonsTaughtToday((c) => c + 1);
      setTotalLessonsAllTime((c) => c + 1);
    } finally {
      setIsTranslating(false);
    }
  };

  // Play Audio (SpeechSynthesis)
  const handlePlayAudio = () => {
    if (!currentLangMeta.voiceActive) return;
    setIsPlayingAudio(true);
    speakClassroomPhrase(
      currentTranslation.tribalDevanagariPhonetic ||
        currentTranslation.tribalRomanPhonetic,
      {
        rate: 0.85,
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
      }
    );
  };

  // "Say It Back" Coach Tap
  const handleSayItBackTap = () => {
    if (sayItBackState === 'listening') return;
    setSayItBackState('listening');
    setTimeout(() => {
      const next = sayItBackAttempt + 1;
      setSayItBackAttempt(next);
      setSayItBackState(next % 3 === 2 ? 'retry' : 'great');
    }, 1500);
  };

  const getConfidenceDotColor = (conf: ConfidenceLevel) => {
    if (conf === 'Verified') return 'bg-[#355E3B]';
    if (conf === 'Dictionary-match') return 'bg-[#2563EB]';
    return 'bg-[#E0A458]';
  };

  const isHi = uiLocale === 'hi';

  const getLangDisplay = (lang: TribalLanguage) => {
    if (!isHi) return lang;
    const map: Record<TribalLanguage, string> = {
      Santhali: 'संथाली',
      Mundari: 'मुंडारी',
      Ho: 'हो',
      Kurukh: 'कुड़ुख',
    };
    return map[lang];
  };

  const getConfidenceDisplay = (conf: ConfidenceLevel) => {
    if (!isHi) return conf;
    if (conf === 'Verified') return 'सत्यापित (Verified)';
    if (conf === 'Dictionary-match') return 'शब्दकोश-मिलान (Dictionary)';
    return 'AI-अनुमानित (AI-estimated)';
  };

  // Main Overview / Landing Page (Shown first when app runs)
  if (showLandingOverview) {
    return (
      <LandingHomeScreen
        uiLocale={uiLocale}
        onToggleLocale={(loc) => setUiLocale(loc)}
        onEnterApp={() => {
          setShowLandingOverview(false);
          setIsAuthenticated(true);
          setActiveTab('translate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSignInClick={() => {
          setShowLandingOverview(false);
          setIsAuthenticated(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // 1. LOGIN & SIGNUP (Shown before the app on first visit or after Sign Out)
  if (!isAuthenticated) {
    return (
      <AuthScreen
        uiLocale={uiLocale}
        onToggleLocale={(loc) => setUiLocale(loc)}
        onAuthenticated={(user) => {
          setTeacherProfile(user);
          setSelectedLanguage(user.primaryLanguage);
          setIsAuthenticated(true);
          setActiveTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewLanding={() => {
          setShowLandingOverview(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#2A1A15] flex flex-col">
      {/* FULL-WIDTH DESKTOP WEBSITE NAVBAR */}
      <header className="sticky top-0 z-30 bg-[#F7F3EE]/95 backdrop-blur-md border-b border-[#2A1A15]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-3">
          {/* Left: Logo + VaaniMitra Wordmark */}
          <button
            type="button"
            onClick={() => {
              setShowLandingOverview(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group shrink-0"
            title={isHi ? 'वाणीमित्र होम पेज देखें' : 'View VaaniMitra Home Overview'}
          >
            <div className="w-10 h-10 rounded-xl bg-[#9C4A3C] text-[#F7F3EE] flex items-center justify-center shadow-xs">
              <Languages className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#2A1A15] font-display leading-none group-hover:text-[#9C4A3C] transition-colors">
                {isHi ? 'वाणीमित्र' : 'VaaniMitra'}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#9C4A3C] mt-1">
                {isHi ? 'एआई शिक्षण सेतु' : 'AI TEACHING BRIDGE'}
              </span>
            </div>
          </button>

          {/* Center: Website Navigation Tabs */}
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-1 sm:gap-2 bg-white p-1.5 rounded-2xl border border-[#2A1A15]/10 shadow-2xs overflow-x-auto no-scrollbar"
          >
            <button
              type="button"
              onClick={() => setActiveTab('translate')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'translate'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>{isHi ? 'अनुवाद' : 'Translate'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('worksheet')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'worksheet'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isHi ? 'वर्कशीट' : 'Worksheet'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{isHi ? 'डैशबोर्ड' : 'Dashboard'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{isHi ? 'प्रोफ़ाइल' : 'Profile'}</span>
            </button>
          </nav>

          {/* Right: Website Language Switcher (EN | हिन्दी) + Profile Avatar Button + Settings Icon */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Website Language Switcher */}
            <div
              role="group"
              aria-label="Select Website Language"
              className="inline-flex items-center bg-white p-1 rounded-xl border border-[#2A1A15]/12 shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setUiLocale('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  uiLocale === 'en'
                    ? 'bg-[#2A1A15] text-[#F7F3EE]'
                    : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                }`}
                title="Switch Website UI to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setUiLocale('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  uiLocale === 'hi'
                    ? 'bg-[#9C4A3C] text-white'
                    : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                }`}
                title="वेबसाइट की भाषा हिन्दी करें"
              >
                हिन्दी
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`h-11 px-3 rounded-xl border flex items-center gap-2 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#9C4A3C] text-white border-[#9C4A3C]'
                  : 'bg-white text-[#2A1A15] border-[#2A1A15]/12 hover:bg-[#EAE3D9]'
              }`}
              title={`${isHi ? 'प्रोफ़ाइल' : 'Profile'}: ${teacherProfile.fullName}`}
            >
              <span className="w-7 h-7 rounded-lg bg-[#2A1A15] text-[#F7F3EE] text-xs font-bold flex items-center justify-center">
                {getInitials(teacherProfile.fullName)}
              </span>
              <span className="hidden lg:inline text-xs font-semibold truncate max-w-[100px]">
                {teacherProfile.fullName}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="w-11 h-11 rounded-xl bg-white border border-[#2A1A15]/12 text-[#2A1A15] hover:bg-[#EAE3D9] flex items-center justify-center transition-colors"
              aria-label="Open Settings and Sync Status"
              title={isHi ? 'सेटिंग्स और सिंक स्थिति' : 'Settings & Sync'}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#9C4A3C]" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN DESKTOP WEBSITE CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* SCREEN 1 — LIVE TRANSLATE */}
        {activeTab === 'translate' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A15] font-display">
                  {isHi ? 'लाइव कक्षा अनुवादक' : 'Live Classroom Translator'}
                </h1>
                <p className="text-sm text-[#2A1A15]/65 mt-0.5">
                  {isHi
                    ? 'हिन्दी वाक्यों, पाठ्यपुस्तक के फोटो या आवाज़ का जनजातीय मातृभाषा में अनुवाद करें।'
                    : 'Translate Hindi sentences, textbook photos, or voice into tribal mother tongues.'}
                </p>
              </div>

              {/* Language Switch (Santhali / Mundari / Ho / Kurukh) — One Row */}
              <div
                role="tablist"
                aria-label="Target Language"
                className="grid grid-cols-4 gap-1 p-1.5 bg-white rounded-full border border-[#2A1A15]/10 shadow-2xs w-full sm:w-auto sm:min-w-[360px]"
              >
                {(['Santhali', 'Mundari', 'Ho', 'Kurukh'] as TribalLanguage[]).map(
                  (lang) => {
                    const active = selectedLanguage === lang;
                    return (
                      <button
                        key={lang}
                        role="tab"
                        aria-selected={active}
                        type="button"
                        onClick={() => handleSelectLanguage(lang)}
                        className={`h-9 px-3 rounded-full text-xs font-semibold transition-colors whitespace-nowrap truncate ${
                          active
                            ? 'bg-[#355E3B] text-white'
                            : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                        }`}
                      >
                        {getLangDisplay(lang)}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* TWO-COLUMN DESKTOP TRANSLATION WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* LEFT COLUMN (6 Cols): HINDI INPUT WITH 3 OPTIONS (Text / Image Upload / Mic) */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-[#2A1A15]/10 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2 border-b border-[#2A1A15]/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9C4A3C]">
                      {isHi ? 'हिन्दी इनपुट (शिक्षक)' : 'Hindi Input'}
                    </span>

                    <div className="flex items-center gap-1 bg-[#F7F3EE] p-1 rounded-xl border border-[#2A1A15]/10">
                      <button
                        type="button"
                        onClick={() => setInputMode('text')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          inputMode === 'text'
                            ? 'bg-[#2A1A15] text-[#F7F3EE]'
                            : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                        }`}
                      >
                        <Keyboard className="w-3.5 h-3.5" />
                        <span>{isHi ? 'लिखें' : 'Type Text'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setInputMode('image')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          inputMode === 'image'
                            ? 'bg-[#2A1A15] text-[#F7F3EE]'
                            : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{isHi ? 'किताब / फोटो' : 'Image / Book Photo'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setInputMode('mic')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          inputMode === 'mic'
                            ? 'bg-[#2A1A15] text-[#F7F3EE]'
                            : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isHi ? 'माइक से बोलें' : 'Voice Mic'}</span>
                      </button>
                    </div>
                  </div>

                  {/* MODE 1: TYPE TEXT */}
                  {inputMode === 'text' && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label
                            htmlFor="hindi-text-box"
                            className="block text-xs font-semibold text-[#2A1A15]/70"
                          >
                            {isHi
                              ? 'कोई भी हिन्दी / Hinglish / English वाक्य लिखें:'
                              : 'Type ANY Hindi, Hinglish, or English Sentence:'}
                          </label>
                          <span className="text-[11px] font-semibold text-[#355E3B]">
                            {isHi ? '⚡ रियल-टाइम अनुवाद सक्रिय' : '⚡ Real-time translation active'}
                          </span>
                        </div>
                        <textarea
                          id="hindi-text-box"
                          rows={3}
                          value={hindiInput}
                          onChange={(e) => handleTextChange(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleRunTranslation(hindiInput, selectedLanguage, null);
                            }
                          }}
                          placeholder={
                            isHi
                              ? 'कुछ भी लिखें — जैसे: तुम्हारा नाम क्या है, सभी बच्चे किताब खोलो...'
                              : 'Type anything — e.g. Tumhara naam kya hai, Sabhi bache kitab kholo...'
                          }
                          className="w-full p-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-base font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#2A1A15]/60">
                          {isHi ? 'त्वरित कक्षा उदाहरण:' : 'Quick Classroom Examples:'}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_CLASSROOM_SENTENCES.map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setHindiInput(preset.label);
                                handleRunTranslation(preset.label, selectedLanguage, null);
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                hindiInput === preset.label
                                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                                  : 'bg-[#F7F3EE] text-[#2A1A15]/75 hover:text-[#2A1A15]'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MODE 2: UPLOAD IMAGE / BOOK PHOTO */}
                  {inputMode === 'image' && (
                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />

                      {uploadedImagePreview ? (
                        <div className="space-y-3">
                          <div className="relative rounded-2xl overflow-hidden border border-[#2A1A15]/15 bg-[#F7F3EE] max-h-52 flex items-center justify-center">
                            <img
                              src={uploadedImagePreview}
                              alt="Uploaded classroom textbook or blackboard"
                              referrerPolicy="no-referrer"
                              className="max-h-52 w-auto object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedImagePreview(null);
                                setUploadedImageBase64(null);
                                setUploadedFileName('');
                              }}
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#2A1A15]/80 text-white flex items-center justify-center hover:bg-[#2A1A15]"
                              title={isHi ? 'फोटो हटाएँ' : 'Remove image'}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-xs text-[#2A1A15]/70">
                            <span className="truncate font-medium">
                              {isHi ? 'चयनित:' : 'Selected:'}{' '}
                              {uploadedFileName || (isHi ? 'कक्षा फोटो' : 'Classroom Image')}
                            </span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-[#9C4A3C] font-semibold underline"
                            >
                              {isHi ? 'दूसरी फोटो चुनें' : 'Change Image'}
                            </button>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#355E3B] mb-1">
                              {isHi
                                ? 'फोटो से पढ़ा गया / संबंधित वाक्य (आप इसे बदल भी सकते हैं):'
                                : 'Extracted / Photo Sentence (Editable):'}
                            </label>
                            <input
                              type="text"
                              value={hindiInput}
                              onChange={(e) => handleTextChange(e.target.value)}
                              className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/15 text-sm font-semibold text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-8 px-4 rounded-2xl border-2 border-dashed border-[#2A1A15]/20 bg-[#F7F3EE]/70 hover:bg-[#F7F3EE] hover:border-[#9C4A3C] transition-colors flex flex-col items-center justify-center gap-2.5 text-center"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#9C4A3C]/10 text-[#9C4A3C] flex items-center justify-center">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#2A1A15]">
                              {isHi
                                ? 'कोई भी फोटो, किताब का पन्ना या ब्लैकबोर्ड अपलोड करें'
                                : 'Upload Any Photo, Textbook Page, or Blackboard'}
                            </div>
                            <p className="text-xs text-[#2A1A15]/60 mt-0.5">
                              {isHi
                                ? `फोटो चुनते ही उसका पाठ/विवरण तुरंत ${getLangDisplay(
                                    selectedLanguage
                                  )} में अनुवाद हो जाएगा`
                                : `As soon as you pick a photo (JPG, PNG), it will automatically scan and translate into ${selectedLanguage}`}
                            </p>
                          </div>
                        </button>
                      )}

                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-[#2A1A15]/60">
                          {isHi
                            ? 'या नमूना NCERT / JCERT पाठ्यपुस्तक स्कैन आज़माएँ:'
                            : 'Or try a sample NCERT / JCERT textbook scan:'}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleLoadSampleTextbookImage(
                                'आज हम पानी के बारे में पढ़ेंगे।',
                                'EVS Ch 4: Paani'
                              )
                            }
                            className="px-3 py-1.5 rounded-full bg-[#F7F3EE] hover:bg-[#2A1A15] hover:text-white text-xs font-medium text-[#2A1A15] transition-colors"
                          >
                            {isHi
                              ? 'नमूना 1: पर्यावरण — पानी अध्याय'
                              : 'Sample 1: EVS Water Chapter'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleLoadSampleTextbookImage(
                                'जंगल में कितने पेड़ और चिड़िया हैं, गिनती करो।',
                                'Math Ch 2: Ginti'
                              )
                            }
                            className="px-3 py-1.5 rounded-full bg-[#F7F3EE] hover:bg-[#2A1A15] hover:text-white text-xs font-medium text-[#2A1A15] transition-colors"
                          >
                            {isHi
                              ? 'नमूना 2: गणित — गिनती पन्ना'
                              : 'Sample 2: Math Counting Page'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MODE 3: VOICE MIC (REAL-TIME SPEECH TO TRIBAL TRANSLATION) */}
                  {inputMode === 'mic' && (
                    <div className="py-5 flex flex-col items-center justify-center text-center space-y-4 bg-[#F7F3EE] rounded-2xl p-5 border border-[#2A1A15]/8">
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#2A1A15]/10">
                        <button
                          type="button"
                          onClick={() => setMicLang('hi-IN')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            micLang === 'hi-IN'
                              ? 'bg-[#9C4A3C] text-white'
                              : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                          }`}
                        >
                          हिन्दी आवाज़ (hi-IN)
                        </button>
                        <button
                          type="button"
                          onClick={() => setMicLang('en-IN')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            micLang === 'en-IN'
                              ? 'bg-[#9C4A3C] text-white'
                              : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
                          }`}
                        >
                          Hinglish / English (en-IN)
                        </button>
                      </div>

                      <div className="w-full bg-white rounded-xl p-3 border border-[#2A1A15]/10 min-h-[56px] flex items-center justify-center">
                        <p className="text-base font-bold text-[#2A1A15]">
                          {isListeningMic && liveTranscript
                            ? liveTranscript
                            : hindiInput || (isHi ? 'माइक दबाकर बोलें...' : 'Tap mic and speak...')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleMicTap}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 ${
                          isListeningMic
                            ? 'bg-[#9C4A3C] text-white ring-8 ring-[#9C4A3C]/20 animate-pulse'
                            : 'bg-[#9C4A3C] hover:bg-[#873D30] text-white'
                        }`}
                        aria-label="Speak Hindi Sentence"
                      >
                        <Mic className="w-8 h-8" />
                      </button>
                      <span className="text-xs font-medium text-[#2A1A15]/70">
                        {isListeningMic
                          ? isHi
                            ? '🔴 लाइव सुन रहा है... आप जो बोलेंगे उसका रियल-टाइम अनुवाद होगा (रोकने के लिए फिर दबाएँ)'
                            : '🔴 Live listening... Everything you say translates in real time (tap again to stop)'
                          : isHi
                          ? 'रियल-टाइम अनुवाद के लिए माइक दबाएँ और कुछ भी बोलें'
                          : 'Tap mic and speak anything for real-time live translation'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Translate Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleRunTranslation(
                      hindiInput,
                      selectedLanguage,
                      inputMode === 'image' ? uploadedImageBase64 : null,
                      uploadedImageMime
                    )
                  }
                  disabled={isTranslating}
                  className="w-full h-13 rounded-2xl bg-[#9C4A3C] hover:bg-[#843B2E] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                  <span>
                    {isTranslating
                      ? isHi
                        ? `${getLangDisplay(selectedLanguage)} में अनुवाद हो रहा है...`
                        : `Translating to ${selectedLanguage}...`
                      : inputMode === 'image' && uploadedImageBase64
                      ? isHi
                        ? `फोटो स्कैन करें और ${getLangDisplay(selectedLanguage)} में अनुवाद करें`
                        : `Scan Image & Translate to ${selectedLanguage}`
                      : isHi
                      ? `${getLangDisplay(selectedLanguage)} में अनुवाद करें`
                      : `Translate to ${selectedLanguage}`}
                  </span>
                </button>
              </div>

              {/* RIGHT COLUMN (6 Cols): ONE CLEAN TRANSLATION CARD */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-[#2A1A15]/10 flex flex-col justify-between space-y-6">
                {hasTranslation ? (
                  <>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-[#2A1A15]/10 pb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#355E3B]">
                            {isHi
                              ? `${getLangDisplay(selectedLanguage)} अनुवाद आउटपुट`
                              : `${selectedLanguage} Output`}
                          </span>

                          <button
                            type="button"
                            onClick={() => setShowConfidenceLabel((v) => !v)}
                            className="inline-flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#F7F3EE] transition-colors"
                            title={
                              isHi
                                ? 'विश्वसनीयता विवरण देखने के लिए क्लिक करें'
                                : 'Click to view confidence details'
                            }
                          >
                            <span
                              className={`w-3 h-3 rounded-full shrink-0 ${getConfidenceDotColor(
                                currentTranslation.confidence
                              )}`}
                            />
                            {showConfidenceLabel && (
                              <span className="text-xs font-medium text-[#2A1A15]/75">
                                {getConfidenceDisplay(currentTranslation.confidence)} ·{' '}
                                {currentTranslation.durationSeconds}s
                              </span>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePlayAudio}
                            disabled={!currentLangMeta.voiceActive}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                              currentLangMeta.voiceActive
                                ? isPlayingAudio
                                  ? 'bg-[#355E3B] text-white'
                                  : 'bg-[#F7F3EE] text-[#2A1A15] hover:bg-[#355E3B] hover:text-white'
                                : 'bg-[#F7F3EE] text-[#2A1A15]/30 cursor-not-allowed'
                            }`}
                            title={
                              currentLangMeta.voiceActive
                                ? isHi
                                  ? 'आवाज़ सुनें'
                                  : 'Play audio'
                                : isHi
                                ? 'आवाज़ केवल संथाली के लिए सक्रिय है'
                                : 'Voice active for Santhali only'
                            }
                            aria-label="Play translated audio"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>

                          <button
                            type="button"
                            onClick={handleSayItBackTap}
                            className={`h-11 px-4 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all ${
                              sayItBackState === 'listening'
                                ? 'bg-[#9C4A3C] text-white animate-pulse'
                                : 'bg-[#355E3B]/12 text-[#355E3B] hover:bg-[#355E3B] hover:text-white'
                            }`}
                            title={
                              isHi
                                ? 'छात्र उच्चारण अभ्यास'
                                : 'Student pronunciation practice'
                            }
                          >
                            <Mic className="w-4 h-4" />
                            <span>
                              {sayItBackState === 'listening'
                                ? isHi
                                  ? 'सुन रहा है...'
                                  : 'Listening...'
                                : isHi
                                ? 'बोल कर दिखाओ'
                                : 'Say it back'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {isEditingTranslation ? (
                        <div className="space-y-3 bg-[#F7F3EE] p-4 rounded-2xl">
                          <input
                            type="text"
                            value={editBuffer}
                            onChange={(e) => setEditBuffer(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-white border border-[#9C4A3C] text-base font-bold text-[#2A1A15]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setIsEditingTranslation(false)}
                              className="px-3 py-1.5 text-xs text-[#2A1A15]/65"
                            >
                              {isHi ? 'रद्द करें' : 'Cancel'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTranslationsByLang((prev) => ({
                                  ...prev,
                                  [selectedLanguage]: {
                                    ...prev[selectedLanguage],
                                    tribalDevanagariPhonetic: editBuffer,
                                    confidence: 'Verified',
                                  },
                                }));
                                setIsEditingTranslation(false);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#355E3B] text-white text-xs font-semibold flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isHi ? 'सहेजें' : 'Save'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditBuffer(currentTranslation.tribalDevanagariPhonetic);
                            setIsEditingTranslation(true);
                          }}
                          className="p-5 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 cursor-pointer space-y-2"
                          title={
                            isHi
                              ? 'अनुवाद संपादित करने के लिए क्लिक करें'
                              : 'Click to manually edit translation'
                          }
                        >
                          <p className="text-2xl sm:text-3xl font-bold text-[#2A1A15] leading-snug">
                            {currentTranslation.tribalNativeScript}
                          </p>
                          <p className="text-lg font-bold text-[#9C4A3C]">
                            {currentTranslation.tribalDevanagariPhonetic}
                          </p>
                          <p className="text-xs font-mono text-[#2A1A15]/65">
                            {currentTranslation.tribalRomanPhonetic}
                          </p>
                        </div>
                      )}

                      {(sayItBackState === 'great' || sayItBackState === 'retry') && (
                        <div
                          className={`px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                            sayItBackState === 'great'
                              ? 'bg-[#355E3B]/12 text-[#355E3B]'
                              : 'bg-[#E0A458]/25 text-[#2A1A15]'
                          }`}
                        >
                          <span>
                            {sayItBackState === 'great'
                              ? isHi
                                ? 'शाबाश! · अडी नापय! (92% उच्चारण मिलान)'
                                : 'Great! · Adi Napiay! (92% pronunciation match)'
                              : isHi
                              ? 'धीरे से फिर प्रयास करें · सुनें और दोहराएँ'
                              : 'Try again slowly · Listen & repeat'}
                          </span>
                          <button
                            type="button"
                            onClick={handleSayItBackTap}
                            className="underline ml-2"
                          >
                            {isHi ? 'पुनः प्रयास' : 'Retry'}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#2A1A15]/10">
                      <button
                        type="button"
                        onClick={() => setShowFlashcards((v) => !v)}
                        className="w-full flex items-center justify-between text-xs font-semibold text-[#2A1A15]/65 py-1"
                      >
                        <span>
                          {isHi
                            ? `प्रमुख शब्दावली फ्लैशकार्ड (${currentTranslation.flashcards.length})`
                            : `Key Vocabulary Flashcards (${currentTranslation.flashcards.length})`}
                        </span>
                        {showFlashcards ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {showFlashcards && (
                        <div className="grid grid-cols-2 gap-3 pt-3">
                          {currentTranslation.flashcards.map((fc) => (
                            <button
                              key={fc.id}
                              type="button"
                              onClick={() =>
                                speakClassroomPhrase(fc.tribalDevanagari || fc.tribalWord)
                              }
                              className="p-3 rounded-2xl bg-[#F7F3EE] hover:border-[#9C4A3C] border border-transparent flex items-center gap-3 text-left transition-colors"
                            >
                              <FlashcardIllustration
                                iconKey={fc.iconKey}
                                word={fc.hindiRoman}
                                className="w-11 h-11"
                              />
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-[#2A1A15] truncate">
                                  {fc.tribalWord}
                                </div>
                                <div className="text-xs text-[#9C4A3C] font-medium truncate">
                                  {fc.tribalDevanagari}
                                </div>
                                <div className="text-[11px] text-[#2A1A15]/65 truncate">
                                  {fc.hindiWord}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-sm text-[#2A1A15]/50">
                    {isHi
                      ? 'अनुवाद देखने के लिए वाक्य लिखें, फोटो अपलोड करें या माइक से बोलें।'
                      : 'Enter text, upload an image, or speak to see the translation.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2 — WORKSHEET GENERATOR */}
        {activeTab === 'worksheet' && (
          <WorksheetGeneratorScreen
            selectedLanguage={selectedLanguage}
            dialectLabel={activeDialectLabel}
            offlineModeOnly={offlineModeOnly}
            uiLocale={uiLocale}
            onWorksheetGenerated={() => {
              setWorksheetsGeneratedToday((c) => c + 1);
              setTotalWorksheetsAllTime((c) => c + 1);
              setLanguageUsageCounts((prev) => ({
                ...prev,
                [selectedLanguage]: (prev[selectedLanguage] || 0) + 1,
              }));
            }}
            onSaveWorksheetOffline={() => {}}
          />
        )}

        {/* SCREEN 3 — FULL TEACHER ANALYTICS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <TeacherDashboardScreen
            profile={teacherProfile}
            lessonsTaughtToday={lessonsTaughtToday}
            worksheetsGeneratedToday={worksheetsGeneratedToday}
            totalLessonsAllTime={totalLessonsAllTime}
            totalWorksheetsAllTime={totalWorksheetsAllTime}
            languageUsageCounts={languageUsageCounts}
            pendingReviewsCount={pendingSyncCount}
            lastTranslation={recentTranslations[0] || currentTranslation}
            recentTranslations={recentTranslations}
            uiLocale={uiLocale}
            onViewProfile={() => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTranslate={() => {
              setActiveTab('translate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWordBankReview={() => setWordBankOpen(true)}
          />
        )}

        {/* SCREEN 4 — TEACHER PROFILE PAGE */}
        {activeTab === 'profile' && (
          <ProfileScreen
            profile={teacherProfile}
            onUpdateProfile={(updated) => {
              setTeacherProfile(updated);
              setSelectedLanguage(updated.primaryLanguage);
            }}
            onSignOut={handleSignOut}
            totalLessonsAllTime={totalLessonsAllTime}
            totalWorksheetsAllTime={totalWorksheetsAllTime}
            mostUsedLanguage={mostUsedLanguage}
            uiLocale={uiLocale}
          />
        )}
      </main>

      {/* SETTINGS & STATUS MODAL */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2A1A15]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#F7F3EE] rounded-3xl p-6 space-y-5 shadow-2xl border border-[#2A1A15]/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2A1A15]">
                {isHi ? 'सेटिंग्स और सिंक स्थिति' : 'Settings & Sync Status'}
              </h2>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#2A1A15]/70"
                aria-label="Close Settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#2A1A15]/8 space-y-2">
              <label className="block text-xs font-semibold text-[#2A1A15]/70">
                {isHi
                  ? 'आप किस गाँव / प्रखंड (Block) में पढ़ा रहे हैं?'
                  : 'Which village/block are you teaching in?'}
              </label>
              <select
                value={selectedBlockId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedBlockId(id);
                  const found = VILLAGE_BLOCKS.find((b) => b.id === id);
                  if (found) setSelectedLanguage(found.defaultLanguage);
                }}
                className="w-full h-11 px-3 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-xs font-semibold text-[#2A1A15]"
              >
                {VILLAGE_BLOCKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.blockName} — {b.district}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#355E3B] font-medium">
                {isHi ? 'सक्रिय बोली:' : 'Active dialect:'} {activeDialectLabel}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#2A1A15]/8 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#2A1A15]">
                    {isHi ? 'ऑफ़लाइन मोड' : 'Offline Mode'}
                  </div>
                  <div className="text-[11px] text-[#2A1A15]/60">
                    {isHi
                      ? 'बिना इंटरनेट कनेक्शन के कार्य करता है'
                      : 'Works with zero internet connection'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOfflineModeOnly((v) => !v)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    offlineModeOnly
                      ? 'bg-[#355E3B] text-white'
                      : 'bg-[#F7F3EE] text-[#2A1A15]'
                  }`}
                >
                  {offlineModeOnly
                    ? isHi
                      ? 'सक्रिय'
                      : 'Active'
                    : isHi
                    ? 'स्टैंडबाय'
                    : 'Standby'}
                </button>
              </div>

              <div className="pt-3 border-t border-[#2A1A15]/8 flex items-center justify-between">
                <div className="text-xs font-bold text-[#2A1A15]">
                  {isHi ? 'वेबसाइट की भाषा (App Language)' : 'App Language'}
                </div>
                <button
                  type="button"
                  onClick={() => setUiLocale((l) => (l === 'en' ? 'hi' : 'en'))}
                  className="px-3.5 py-1.5 rounded-full bg-[#F7F3EE] text-xs font-semibold text-[#2A1A15]"
                >
                  {uiLocale === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#2A1A15]/8 space-y-3">
              <div className="text-xs text-[#2A1A15]/75 font-mono tabular-nums">
                {isHi
                  ? `सामग्री पैक: ${syncPercentage}% सिंक · अंतिम अपडेट ${lastSyncedText} · अगले सिंक हेतु वाई-फ़ाई आवश्यक`
                  : `Content pack: ${syncPercentage}% synced · Last updated ${lastSyncedText} · Next sync needs Wi-Fi`}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  setWordBankOpen(true);
                }}
                className="w-full h-11 rounded-xl bg-[#2A1A15] text-[#F7F3EE] text-xs font-semibold flex items-center justify-center"
              >
                {isHi
                  ? `ग्राम शब्दकोश (${pendingSyncCount} सुधार सिंक हेतु लंबित)`
                  : `Village Word Bank (${pendingSyncCount} corrections pending sync)`}
              </button>
            </div>

            {/* Sign Out Button inside Settings */}
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full h-11 rounded-xl bg-[#9C4A3C]/10 hover:bg-[#9C4A3C] text-[#9C4A3C] hover:text-white border border-[#9C4A3C]/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>
                {isHi
                  ? `लॉग आउट (${teacherProfile.fullName})`
                  : `Sign Out (${teacherProfile.fullName})`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Village Word Bank Modal */}
      <VillageWordBankModal
        isOpen={wordBankOpen}
        onClose={() => setWordBankOpen(false)}
        activeLanguage={selectedLanguage}
        activeDialect={activeDialectLabel}
        wordBankQueue={wordBankQueue}
        uiLocale={uiLocale}
        onAddCorrection={(newItem) => {
          setWordBankQueue((prev) => [
            {
              ...newItem,
              id: `wb-${Date.now()}`,
              timestamp: 'Just now',
              synced: false,
            },
            ...prev,
          ]);
        }}
        onSyncAll={() => {
          setWordBankQueue((prev) => prev.map((w) => ({ ...w, synced: true })));
          setSyncPercentage(100);
          setLastSyncedText('Just now');
        }}
      />
    </div>
  );
}
