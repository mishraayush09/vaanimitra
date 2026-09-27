import React, { useState } from 'react';
import { Languages, ArrowRight, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { TribalLanguage, UILocale } from '../data/vaaniData';

export interface TeacherProfile {
  fullName: string;
  schoolName: string;
  blockDistrict: string;
  email: string;
  primaryLanguage: TribalLanguage;
  joinedDate: string;
}

export const DEMO_TEACHER_PROFILE: TeacherProfile = {
  fullName: 'Sunita Devi',
  schoolName: 'Govt. Primary School, Dumka',
  blockDistrict: 'Dumka Sadar Block, Dumka',
  email: 'sunita.devi@jharkhand-edu.in',
  primaryLanguage: 'Santhali',
  joinedDate: 'August 2026',
};

interface AuthScreenProps {
  onAuthenticated: (user: TeacherProfile) => void;
  onViewLanding?: () => void;
  uiLocale: UILocale;
  onToggleLocale: (locale: UILocale) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticated,
  onViewLanding,
  uiLocale,
  onToggleLocale,
}) => {
  const isHi = uiLocale === 'hi';
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [blockDistrict, setBlockDistrict] = useState('Dumka Sadar Block, Dumka');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (
        !fullName.trim() ||
        !schoolName.trim() ||
        !blockDistrict.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        setError(
          isHi
            ? 'कृपया शिक्षक खाता बनाने के लिए सभी विवरण भरें।'
            : 'Please fill in all fields to create your teacher account.'
        );
        return;
      }

      onAuthenticated({
        fullName: fullName.trim(),
        schoolName: schoolName.trim(),
        blockDistrict: blockDistrict.trim(),
        email: email.trim(),
        primaryLanguage: 'Santhali',
        joinedDate: 'September 2026',
      });
    } else {
      if (!email.trim() || !password.trim()) {
        setError(
          isHi
            ? 'कृपया अपना ईमेल पता और पासवर्ड दोनों दर्ज करें।'
            : 'Please enter both your email address and password.'
        );
        return;
      }

      const emailPrefix = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName =
        email.toLowerCase().includes('sunita') || emailPrefix.length < 3
          ? DEMO_TEACHER_PROFILE.fullName
          : emailPrefix.replace(/\b\w/g, (c) => c.toUpperCase());

      onAuthenticated({
        ...DEMO_TEACHER_PROFILE,
        fullName: formattedName,
        email: email.trim(),
      });
    }
  };

  const handleContinueAsGuest = () => {
    setError(null);
    onAuthenticated(DEMO_TEACHER_PROFILE);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#2A1A15] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar with Language Switcher & Optional Back to Overview Link */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#9C4A3C] text-[#F7F3EE] flex items-center justify-center shadow-2xs">
            <Languages className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight font-display">
            {isHi ? 'वाणीमित्र (VaaniMitra)' : 'VaaniMitra'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher EN | हिन्दी */}
          <div
            role="group"
            aria-label="Website Language"
            className="inline-flex items-center bg-white p-1 rounded-xl border border-[#2A1A15]/12 shadow-2xs"
          >
            <button
              type="button"
              onClick={() => onToggleLocale('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                uiLocale === 'en'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLocale('hi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                uiLocale === 'hi'
                  ? 'bg-[#9C4A3C] text-white'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {onViewLanding && (
            <button
              type="button"
              onClick={onViewLanding}
              className="text-xs sm:text-sm font-semibold text-[#2A1A15]/70 hover:text-[#2A1A15] transition-colors"
            >
              {isHi ? '← होम पेज पर वापस जाएँ' : '← Back to Overview'}
            </button>
          )}
        </div>
      </div>

      {/* Centered Auth Card */}
      <main className="w-full max-w-md mx-auto my-8">
        <div className="bg-white rounded-3xl border border-[#2A1A15]/10 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Logo + Tagline at Top */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#9C4A3C]/12 text-[#9C4A3C] flex items-center justify-center mx-auto">
              <Languages className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A15] font-display">
              {isHi ? 'वाणीमित्र' : 'VaaniMitra'}
            </h1>
            <p className="text-xs sm:text-sm text-[#2A1A15]/65">
              {isHi
                ? 'ऑफ़लाइन मातृभाषा एआई शिक्षण सेतु · झारखंड पलाश (PALASH)'
                : 'Offline Mother-Tongue AI Teaching Bridge · Jharkhand PALASH'}
            </p>
          </div>

          {/* Primary Demo Fast-Track CTA */}
          <div className="p-3.5 rounded-2xl bg-[#355E3B]/10 border border-[#355E3B]/25 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#355E3B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isHi ? 'तुरंत क्लासरूम डेमो' : 'Instant Classroom Demo'}
                </span>
              </span>
              <span className="text-[#2A1A15]/65 font-mono">
                {isHi ? 'पूर्व-भरा शिक्षक प्रोफ़ाइल' : 'Pre-filled Teacher'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleContinueAsGuest}
              className="w-full h-11 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isHi
                  ? 'अतिथि / डेमो के रूप में जारी रखें (सुनीता देवी)'
                  : 'Continue as Guest / Try Demo (Sunita Devi)'}
              </span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-[#2A1A15]/10" />
            <span className="shrink mx-3 text-[11px] font-semibold uppercase tracking-wider text-[#2A1A15]/45">
              {isHi ? 'या शिक्षक खाते का उपयोग करें' : 'Or use teacher account'}
            </span>
            <div className="grow border-t border-[#2A1A15]/10" />
          </div>

          {/* Toggle between Sign In and Sign Up Tabs */}
          <div
            role="tablist"
            className="grid grid-cols-2 gap-1 p-1 bg-[#F7F3EE] rounded-2xl border border-[#2A1A15]/10"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signin'}
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`h-10 rounded-xl text-xs font-semibold transition-colors ${
                mode === 'signin'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              {isHi ? 'लॉग इन (Sign In)' : 'Sign In'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`h-10 rounded-xl text-xs font-semibold transition-colors ${
                mode === 'signup'
                  ? 'bg-[#2A1A15] text-[#F7F3EE]'
                  : 'text-[#2A1A15]/70 hover:text-[#2A1A15]'
              }`}
            >
              {isHi ? 'नया खाता (Sign Up)' : 'Sign Up'}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#9C4A3C]/10 border border-[#9C4A3C]/30 text-xs font-medium text-[#9C4A3C] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#2A1A15]/75 mb-1.5">
                    {isHi ? 'पूरा नाम (Full Name)' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isHi ? 'उदा. सुनीता देवी' : 'e.g. Sunita Devi'}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A1A15]/75 mb-1.5">
                    {isHi ? 'विद्यालय का नाम (School Name)' : 'School Name'}
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder={
                      isHi
                        ? 'उदा. राजकीय प्राथमिक विद्यालय, दुमका'
                        : 'e.g. Govt. Primary School, Dumka'
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A1A15]/75 mb-1.5">
                    {isHi ? 'प्रखंड / जिला (Block / District)' : 'Block / District'}
                  </label>
                  <input
                    type="text"
                    value={blockDistrict}
                    onChange={(e) => setBlockDistrict(e.target.value)}
                    placeholder={
                      isHi
                        ? 'उदा. दुमका सदर प्रखंड, दुमका'
                        : 'e.g. Dumka Sadar Block, Dumka'
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#2A1A15]/75 mb-1.5">
                {isHi ? 'ईमेल पता (Email Address)' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sunita.devi@jharkhand-edu.in"
                className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2A1A15]/75 mb-1.5">
                {isHi ? 'पासवर्ड (Password)' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[#9C4A3C] hover:bg-[#843B2E] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <span>
                {mode === 'signin'
                  ? isHi
                    ? 'कक्षा में प्रवेश करें (Sign In)'
                    : 'Sign In to Classroom'
                  : isHi
                  ? 'शिक्षक खाता बनाएँ (Sign Up)'
                  : 'Create Teacher Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="text-center text-xs text-[#2A1A15]/55">
        {isHi
          ? 'डेमो प्रोटोटाइप · केवल स्थानीय ब्राउज़र सत्र प्रमाणीकरण'
          : 'Demo prototype · Local browser session authentication only'}
      </footer>
    </div>
  );
};
