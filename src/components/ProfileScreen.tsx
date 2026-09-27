import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  FileText,
  Languages,
  LogOut,
  Check,
  School,
  MapPin,
  Mail,
} from 'lucide-react';
import { TeacherProfile } from './AuthScreen';
import { TribalLanguage, UILocale } from '../data/vaaniData';

interface ProfileScreenProps {
  profile: TeacherProfile;
  onUpdateProfile: (updated: TeacherProfile) => void;
  onSignOut: () => void;
  totalLessonsAllTime: number;
  totalWorksheetsAllTime: number;
  mostUsedLanguage: TribalLanguage;
  uiLocale: UILocale;
}

const LANG_LABEL_HI: Record<TribalLanguage, string> = {
  Santhali: 'संथाली (Santhali)',
  Mundari: 'मुंडारी (Mundari)',
  Ho: 'हो (Ho)',
  Kurukh: 'कुड़ुख (Kurukh)',
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onSignOut,
  totalLessonsAllTime,
  totalWorksheetsAllTime,
  mostUsedLanguage,
  uiLocale,
}) => {
  const isHi = uiLocale === 'hi';
  const [fullName, setFullName] = useState(profile.fullName);
  const [schoolName, setSchoolName] = useState(profile.schoolName);
  const [blockDistrict, setBlockDistrict] = useState(profile.blockDistrict);
  const [primaryLanguage, setPrimaryLanguage] = useState<TribalLanguage>(
    profile.primaryLanguage
  );
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName);
    setSchoolName(profile.schoolName);
    setBlockDistrict(profile.blockDistrict);
    setPrimaryLanguage(profile.primaryLanguage);
  }, [profile]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || 'TD';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !schoolName.trim() || !blockDistrict.trim()) return;

    onUpdateProfile({
      ...profile,
      fullName: fullName.trim(),
      schoolName: schoolName.trim(),
      blockDistrict: blockDistrict.trim(),
      primaryLanguage,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Profile Banner Card */}
      <section className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar Initials */}
          <div className="w-20 h-20 rounded-3xl bg-[#9C4A3C] text-[#F7F3EE] flex items-center justify-center text-2xl font-bold font-display shadow-xs shrink-0">
            {getInitials(profile.fullName)}
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#355E3B]">
              {isHi
                ? 'सत्यापित पलाश (PALASH) शिक्षक प्रोफ़ाइल'
                : 'Verified PALASH Educator Profile'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A15] font-display">
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#2A1A15]/70">
              <span className="inline-flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-[#9C4A3C]" />
                <span>{profile.schoolName}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#355E3B]" />
                <span>{profile.blockDistrict}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2A1A15]/50" />
                <span>{profile.email}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-[#2A1A15]/10 shrink-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2A1A15]/50">
            {isHi ? 'पढ़ाई जाने वाली भाषा' : 'Languages Taught'}
          </div>
          <div className="text-base font-bold text-[#2A1A15] mt-0.5">
            {isHi
              ? `हिन्दी → ${LANG_LABEL_HI[profile.primaryLanguage]}`
              : `Hindi → ${profile.primaryLanguage}`}
          </div>
          <div className="text-xs text-[#355E3B] font-medium mt-0.5">
            {isHi ? `सक्रिय: ${profile.joinedDate}` : `Active since ${profile.joinedDate}`}
          </div>
        </div>
      </section>

      {/* Editable Profile Form + Teaching Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Editable Profile Fields */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-7 bg-white rounded-3xl border border-[#2A1A15]/10 p-6 sm:p-7 shadow-xs space-y-5"
        >
          <div className="border-b border-[#2A1A15]/10 pb-3.5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#2A1A15] font-display">
                {isHi ? 'शिक्षक विवरण संपादित करें' : 'Edit Teacher Details'}
              </h2>
              <p className="text-xs text-[#2A1A15]/60">
                {isHi
                  ? 'अपना विद्यालय और प्राथमिक मातृभाषा अपडेट करें।'
                  : 'Update your school assignment and primary classroom language.'}
              </p>
            </div>
            {savedToast && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#355E3B]">
                <Check className="w-4 h-4" />
                <span>{isHi ? 'सहेजा गया' : 'Saved'}</span>
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A1A15]/65 mb-1.5">
                {isHi ? 'पूरा नाम (Full Name)' : 'Full Name'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A1A15]/65 mb-1.5">
                {isHi ? 'विद्यालय का नाम (School Name)' : 'School Name'}
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A1A15]/65 mb-1.5">
                {isHi ? 'प्रखंड / जिला (Block / District)' : 'Block / District'}
              </label>
              <input
                type="text"
                value={blockDistrict}
                onChange={(e) => setBlockDistrict(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A1A15]/65 mb-1.5">
                {isHi ? 'प्राथमिक मातृभाषा' : 'Primary Mother-Tongue Taught'}
              </label>
              <select
                value={primaryLanguage}
                onChange={(e) =>
                  setPrimaryLanguage(e.target.value as TribalLanguage)
                }
                className="w-full h-11 px-4 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
              >
                <option value="Santhali">
                  {isHi ? 'संथाली (ओल चिकी)' : 'Santhali (Ol Chiki)'}
                </option>
                <option value="Mundari">
                  {isHi ? 'मुंडारी (देवनागरी)' : 'Mundari (Bani Hisir / Devanagari)'}
                </option>
                <option value="Ho">
                  {isHi ? 'हो (वारंग चिति / देवनागरी)' : 'Ho (Warang Citi / Devanagari)'}
                </option>
                <option value="Kurukh">
                  {isHi ? 'कुड़ुख (तोलोंग सिकी / देवनागरी)' : 'Kurukh (Tolong Siki / Devanagari)'}
                </option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="h-11 px-6 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Check className="w-4 h-4" />
              <span>{isHi ? 'प्रोफ़ाइल सहेजें' : 'Save Profile'}</span>
            </button>
          </div>
        </form>

        {/* Right 5 Columns: Teaching Stats Summary + Sign Out */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#2A1A15] font-display">
              {isHi ? 'शिक्षण सारांश (Teaching Stats)' : 'Teaching Stats Summary'}
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2A1A15]/55">
                    {isHi ? 'कुल पढ़ाए गए पाठ' : 'Total Lessons (All-Time)'}
                  </div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#9C4A3C]">
                    {totalLessonsAllTime}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9C4A3C] border border-[#2A1A15]/8">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2A1A15]/55">
                    {isHi ? 'बनाई गई वर्कशीट' : 'Worksheets Generated'}
                  </div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#355E3B]">
                    {totalWorksheetsAllTime}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#355E3B] border border-[#2A1A15]/8">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2A1A15]/55">
                    {isHi ? 'प्रमुख मातृभाषा' : 'Most-Used Language'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#2A1A15] font-display">
                    {isHi ? LANG_LABEL_HI[mostUsedLanguage] : mostUsedLanguage}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2A1A15] border border-[#2A1A15]/8">
                  <Languages className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Card */}
          <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 shadow-xs space-y-3">
            <div className="text-xs text-[#2A1A15]/65">
              {isHi
                ? 'शिक्षक बदलने या लॉगिन स्क्रीन पर वापस जाने के लिए इस सत्र से साइन आउट करें।'
                : 'Sign out of this tablet session to switch teachers or return to the login screen.'}
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="w-full h-11 rounded-xl bg-[#9C4A3C]/10 hover:bg-[#9C4A3C] text-[#9C4A3C] hover:text-white border border-[#9C4A3C]/30 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{isHi ? 'लॉग आउट (Sign Out)' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
