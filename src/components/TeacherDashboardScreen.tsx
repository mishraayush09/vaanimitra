import React from 'react';
import {
  CheckCircle2,
  FileText,
  Languages,
  ArrowUpRight,
  User,
  Volume2,
} from 'lucide-react';
import { TranslationResult, TribalLanguage, UILocale } from '../data/vaaniData';
import { TeacherProfile } from './AuthScreen';
import { speakClassroomPhrase } from '../utils/speechAndPdf';

interface TeacherDashboardScreenProps {
  profile: TeacherProfile;
  lessonsTaughtToday: number;
  worksheetsGeneratedToday: number;
  totalLessonsAllTime?: number;
  totalWorksheetsAllTime?: number;
  languageUsageCounts: Record<TribalLanguage, number>;
  pendingReviewsCount: number;
  lastTranslation: TranslationResult;
  recentTranslations?: TranslationResult[];
  uiLocale: UILocale;
  onViewProfile: () => void;
  onNavigateToTranslate: () => void;
  onOpenWordBankReview: () => void;
}

const LANG_LABEL_HI: Record<TribalLanguage, string> = {
  Santhali: 'संथाली (Santhali)',
  Mundari: 'मुंडारी (Mundari)',
  Ho: 'हो (Ho)',
  Kurukh: 'कुड़ुख (Kurukh)',
};

export const TeacherDashboardScreen: React.FC<TeacherDashboardScreenProps> = ({
  profile,
  lessonsTaughtToday,
  worksheetsGeneratedToday,
  languageUsageCounts,
  pendingReviewsCount,
  lastTranslation,
  uiLocale,
  onViewProfile,
  onNavigateToTranslate,
  onOpenWordBankReview,
}) => {
  const isHi = uiLocale === 'hi';
  const sortedLanguages = (
    Object.entries(languageUsageCounts) as [TribalLanguage, number][]
  ).sort((a, b) => b[1] - a[1]);
  const mostUsedLanguage = sortedLanguages[0]?.[0] || 'Santhali';

  return (
    <div className="space-y-6">
      {/* 1. Simple Teacher Welcome Header */}
      <section
        aria-label="Teacher Welcome Header"
        className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#9C4A3C]">
            {isHi ? 'शिक्षक डैशबोर्ड' : 'Teacher Dashboard'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A15] font-display">
            {isHi ? `नमस्ते, ${profile.fullName}` : `Hi, ${profile.fullName}`}
          </h1>
          <p className="text-xs sm:text-sm text-[#2A1A15]/70">
            {profile.schoolName} · {profile.blockDistrict}
          </p>
        </div>

        <button
          type="button"
          onClick={onViewProfile}
          className="h-10 px-4 rounded-xl bg-[#F7F3EE] hover:bg-[#EAE3D9] border border-[#2A1A15]/10 text-xs font-semibold text-[#2A1A15] flex items-center gap-2 self-start sm:self-center transition-colors shrink-0"
        >
          <User className="w-4 h-4 text-[#9C4A3C]" />
          <span>{isHi ? 'प्रोफ़ाइल देखें' : 'View Profile'}</span>
        </button>
      </section>

      {/* 2. The 3 Core VaaniMitra Stat Cards */}
      <section
        aria-label="Core Classroom Statistics"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Card 1: Lessons Taught Today */}
        <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A1A15]/60">
              {isHi ? 'आज पढ़ाए गए पाठ' : 'Lessons Taught Today'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F3EE] text-[#9C4A3C] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl sm:text-5xl font-bold font-mono tabular-nums text-[#9C4A3C] mt-3">
            {lessonsTaughtToday}
          </div>
        </div>

        {/* Card 2: Worksheets Generated */}
        <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A1A15]/60">
              {isHi ? 'बनाई गई वर्कशीट' : 'Worksheets Generated'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F3EE] text-[#355E3B] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl sm:text-5xl font-bold font-mono tabular-nums text-[#355E3B] mt-3">
            {worksheetsGeneratedToday}
          </div>
        </div>

        {/* Card 3: Most-Used Language */}
        <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs flex flex-col justify-between min-h-[148px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A1A15]/60">
              {isHi ? 'प्रमुख मातृभाषा' : 'Most-Used Language'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F7F3EE] text-[#2A1A15] flex items-center justify-center">
              <Languages className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#2A1A15] font-display mt-3">
            {isHi ? LANG_LABEL_HI[mostUsedLanguage] : mostUsedLanguage}
          </div>
        </div>
      </section>

      {/* 3. Essential VaaniMitra Classroom Cards (Last Translation + Village Word Bank) */}
      <section
        aria-label="Recent Classroom Activity"
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
      >
        {/* Recent Translation Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A1A15]/60">
              {isHi
                ? `अंतिम कक्षा अनुवाद (${LANG_LABEL_HI[lastTranslation.targetLanguage]})`
                : `Last Classroom Translation (${lastTranslation.targetLanguage})`}
            </span>
            <button
              type="button"
              onClick={onNavigateToTranslate}
              className="text-xs font-bold text-[#9C4A3C] hover:text-[#2A1A15] flex items-center gap-1 transition-colors"
            >
              <span>{isHi ? 'अनुवाद खोलें' : 'Open Translate'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-[#2A1A15]/65">
                {lastTranslation.hindiDevanagari}
              </p>
              <p className="text-lg font-bold text-[#2A1A15]">
                {lastTranslation.tribalNativeScript}
              </p>
              <p className="text-sm font-semibold text-[#9C4A3C]">
                {lastTranslation.tribalDevanagariPhonetic}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                speakClassroomPhrase(
                  lastTranslation.tribalDevanagariPhonetic ||
                    lastTranslation.tribalRomanPhonetic
                )
              }
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#355E3B] hover:text-white text-[#2A1A15] flex items-center justify-center transition-colors shrink-0"
              title={isHi ? 'आवाज़ सुनें' : 'Play audio'}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Village Word Bank Card */}
        <div className="lg:col-span-5 bg-[#355E3B] text-[#F7F3EE] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E0A458]">
              {isHi ? 'ग्राम शब्दकोश (Village Word Bank)' : 'Village Word Bank'}
            </span>
            <h2 className="text-xl font-bold font-display">
              {isHi
                ? `${pendingReviewsCount} सुधार सिंक हेतु लंबित`
                : `${pendingReviewsCount} corrections pending sync`}
            </h2>
            <p className="text-xs text-[#F7F3EE]/80 leading-relaxed">
              {isHi
                ? 'एआई-अनुमानित शब्दों के लिए स्थानीय भाषी सुधार देखें या नया शब्द जोड़ें।'
                : 'Review or add native-speaker dialect corrections for AI-estimated words.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWordBankReview}
            className="h-11 px-5 rounded-xl bg-[#E0A458] hover:bg-[#d49444] text-[#2A1A15] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors self-start"
          >
            <span>{isHi ? 'ग्राम शब्दकोश खोलें' : 'Open Word Bank'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
