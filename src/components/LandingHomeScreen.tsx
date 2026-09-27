import React from 'react';
import {
  Shield,
  Clock,
  CheckCircle2,
  BookOpen,
  Info,
  Mic,
  Languages,
  Volume2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import heroClassroomImg from '../assets/images/hero_jharkhand_classroom_1790498377390.jpg';
import { UILocale } from '../data/vaaniData';

interface LandingHomeScreenProps {
  onEnterApp: () => void;
  onSignInClick?: () => void;
  uiLocale: UILocale;
  onToggleLocale: (locale: UILocale) => void;
}

export const LandingHomeScreen: React.FC<LandingHomeScreenProps> = ({
  onEnterApp,
  onSignInClick,
  uiLocale,
  onToggleLocale,
}) => {
  const isHi = uiLocale === 'hi';

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: Shield,
      title: isHi ? 'पूरी तरह ऑफ़लाइन' : 'Fully Offline',
      description: isHi
        ? 'एक बार सिंक करने के बाद बिना इंटरनेट के काम करता है'
        : 'Works with zero internet after a one-time sync',
    },
    {
      icon: Clock,
      title: isHi ? 'सेकंडों में लाइव अनुवाद' : 'Live in Seconds',
      description: isHi
        ? '3 सेकंड से भी कम समय में आवाज़ और वाक्य का अनुवाद'
        : 'Voice translation delivered in under 3 seconds',
    },
    {
      icon: CheckCircle2,
      title: isHi ? 'विश्वसनीयता सत्यापित' : 'Confidence-Verified',
      description: isHi
        ? 'प्रत्येक अनुवाद पर सत्यापित, AI-अनुमानित या शब्दकोश-मिलान का चिन्ह'
        : 'Every output flagged Verified, AI-estimated or Dictionary-match',
    },
    {
      icon: BookOpen,
      title: isHi ? 'निपुण भारत आधारित' : 'NIPUN Bharat Aligned',
      description: isHi
        ? 'बुनियादी साक्षरता और संख्या ज्ञान (FLN) से जुड़ी वर्कशीट'
        : 'Worksheets mapped directly to FLN learning outcomes',
    },
  ];

  const steps = [
    {
      step: '01',
      icon: Mic,
      title: isHi ? 'शिक्षक हिन्दी में बोलते हैं' : 'Teacher speaks Hindi',
      description: isHi
        ? 'माइक दबाकर कक्षा का कोई भी वाक्य हिन्दी में बोलें, लिखें या किताब के पन्ने की फोटो लें।'
        : 'Tap the push-to-talk mic and speak any classroom lesson sentence in Hindi — or pick a curriculum topic.',
      sample: '“आज हम पानी के बारे में पढ़ेंगे।”',
    },
    {
      step: '02',
      icon: Languages,
      title: isHi ? 'वाणीमित्र तुरंत अनुवाद करता है' : 'VaaniMitra translates on-device',
      description: isHi
        ? 'संथाली, मुंडारी, हो या कुड़ुख में देवनागरी उच्चारण और मूल लिपि के साथ तुरंत अनुवाद।'
        : 'Instant translation into Santhali, Mundari, Ho, or Kurukh with phonetic guides and confidence verification.',
      sample: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱫᱟᱜ ᱵᱟᱵᱚᱛ ᱛᱮ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ ᱾',
    },
    {
      step: '03',
      icon: Volume2,
      title: isHi ? 'बच्चे अपनी मातृभाषा में सुनते व सीखते हैं' : 'Child hears & sees in mother tongue',
      description: isHi
        ? 'बच्चे मातृभाषा में ऑडियो सुनते हैं, “बोल कर दिखाओ” से अभ्यास करते हैं और चित्र कार्ड से सीखते हैं।'
        : 'Students listen to native audio, practice speaking with “Say It Back”, and learn with illustrated flashcards.',
      sample: 'तेहेंञ अबो दाग बाबोत ते बोन पाड़हावा।',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#2A1A15] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#F7F3EE]/95 backdrop-blur-md border-b border-[#2A1A15]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Small Logo Icon + VaaniMitra Wordmark + Subtitle underneath */}
          <a
            href="#home"
            onClick={scrollToTop}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#9C4A3C] text-[#F7F3EE] flex items-center justify-center shadow-xs">
              <Languages className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#2A1A15] font-display leading-none">
                {isHi ? 'वाणीमित्र (VaaniMitra)' : 'VaaniMitra'}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#9C4A3C] mt-1">
                {isHi ? 'एआई शिक्षण सेतु' : 'AI TEACHING BRIDGE'}
              </span>
            </div>
          </a>

          {/* Right: Nav links + Language Toggle + Sign In + Get Started */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2A1A15]/75">
              <a
                href="#home"
                onClick={scrollToTop}
                className="hover:text-[#2A1A15] transition-colors"
              >
                {isHi ? 'होम' : 'Home'}
              </a>
              <a
                href="#how-it-works"
                onClick={scrollToHowItWorks}
                className="hover:text-[#2A1A15] transition-colors"
              >
                {isHi ? 'यह कैसे काम करता है' : 'How It Works'}
              </a>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Language Switcher EN | हिं */}
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

              <button
                type="button"
                onClick={onSignInClick || onEnterApp}
                className="text-sm font-semibold text-[#2A1A15]/80 hover:text-[#2A1A15] transition-colors whitespace-nowrap"
              >
                {isHi ? 'लॉग इन' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={onEnterApp}
                className="h-11 px-4 sm:px-5 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isHi ? 'शुरू करें' : 'Get Started'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="home" className="flex-1">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Text */}
            <div className="lg:col-span-6 space-y-6">
              {/* Small Pill Badge Above Headline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0A458]/25 border border-[#E0A458] text-[#2A1A15] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#9C4A3C]" />
                <span>
                  {isHi
                    ? 'एआई-आधारित मातृभाषा शिक्षण सहायक'
                    : 'AI-POWERED MOTHER-TONGUE TEACHING'}
                </span>
              </div>

              {/* Large Bold Serif Headline */}
              <h1 className="text-4xl sm:text-5xl font-bold text-[#2A1A15] font-display leading-[1.15] tracking-tight">
                {isHi ? (
                  <>
                    झारखंड की कक्षाओं में
                    <br />
                    भाषा की दूरी को मिटाता
                    <br />
                    <span className="text-[#9C4A3C]">वाणीमित्र</span>
                  </>
                ) : (
                  <>
                    Bridging the Language
                    <br />
                    Gap in Jharkhand&apos;s
                    <br />
                    <span className="text-[#9C4A3C]">Classrooms</span>
                  </>
                )}
              </h1>

              {/* One Paragraph Subtext */}
              <p className="text-base sm:text-lg text-[#2A1A15]/75 leading-relaxed max-w-xl">
                {isHi ? (
                  <>
                    वाणीमित्र हिन्दी भाषी शिक्षकों को पाठों का लाइव अनुवाद करने, द्विभाषी वर्कशीट बनाने और{' '}
                    <strong className="text-[#2A1A15] font-semibold">
                      संथाली, मुंडारी, हो तथा कुड़ुख
                    </strong>{' '}
                    में बच्चों को पढ़ाने में मदद करता है — वह भी कम लागत वाले टैबलेट पर पूरी तरह ऑफ़लाइन।
                  </>
                ) : (
                  <>
                    VaaniMitra helps Hindi-speaking teachers translate lessons live,
                    generate bilingual worksheets, and teach early-grade comprehension in{' '}
                    <strong className="text-[#2A1A15] font-semibold">
                      Santhali, Mundari, Ho, and Kurukh
                    </strong>{' '}
                    — working fully offline on low-cost classroom tablets.
                  </>
                )}
              </p>

              {/* Two Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onEnterApp}
                  className="h-13 px-7 rounded-2xl bg-[#9C4A3C] hover:bg-[#843B2E] text-white font-semibold text-base shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>{isHi ? 'अनुवाद शुरू करें' : 'Start Translating'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#how-it-works"
                  onClick={scrollToHowItWorks}
                  className="h-13 px-6 rounded-2xl bg-transparent hover:bg-[#2A1A15]/5 border-2 border-[#2A1A15]/20 text-[#2A1A15] font-semibold text-base flex items-center justify-center transition-colors"
                >
                  {isHi ? 'कार्यप्रणाली देखें' : 'See How It Works'}
                </a>
              </div>
            </div>

            {/* Right Column: Realistic Classroom Photo with Subtle Tablet Translation Card Overlay */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#2A1A15]/12 shadow-lg bg-[#2A1A15]/5 aspect-4/3">
                <img
                  src={heroClassroomImg}
                  alt="Teacher in a rural Jharkhand primary classroom using a tablet with tribal-belt schoolchildren"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A15]/75 via-transparent to-transparent" />

                {/* Floating Live Translation Preview Card on the Photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#F7F3EE]/95 backdrop-blur-md rounded-2xl p-4 border border-[#2A1A15]/10 shadow-md flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#355E3B]">
                      <span className="w-2 h-2 rounded-full bg-[#355E3B]" />
                      <span>
                        {isHi
                          ? 'संथाली (ओल चिकी) · लाइव कक्षा अनुवाद'
                          : 'Santhali (Ol Chiki) · Live Classroom Bridge'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#2A1A15] truncate mt-0.5">
                      ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱫᱟᱜ ᱵᱟᱵᱚᱛ ᱛᱮ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ ᱾
                    </p>
                    <p className="text-xs text-[#9C4A3C] font-medium truncate">
                      “आज हम पानी के बारे में पढ़ेंगे” → तेहेंञ अबो दाग बाबोत ते बोन पाड़हावा
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onEnterApp}
                    className="w-10 h-10 rounded-full bg-[#355E3B] text-white flex items-center justify-center shrink-0 hover:bg-[#2A4B2F] transition-colors"
                    aria-label="Try live translation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Strip */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
          <div className="bg-white rounded-3xl border border-[#2A1A15]/12 shadow-xs p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="space-y-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/10 text-[#9C4A3C] flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2A1A15] font-display">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2A1A15]/70 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust / Notice Banner Below the Feature Strip */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-2 pb-12">
          <div className="rounded-2xl bg-[#355E3B]/12 border border-[#355E3B]/25 px-5 py-4 flex items-center gap-3.5 text-[#2A1A15]">
            <Info className="w-5 h-5 text-[#355E3B] shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              {isHi
                ? 'झारखंड के पलाश (PALASH) कार्यक्रम के लिए निर्मित — यह शिक्षकों के लिए एक सहायक उपकरण है, प्रशिक्षित भाषा शिक्षकों का विकल्प नहीं।'
                : "Built for Jharkhand's PALASH programme — a teaching aid, not a replacement for trained language teachers."}
            </p>
          </div>
        </section>

        {/* "How It Works" 3-Step Visual Section */}
        <section
          id="how-it-works"
          className="border-t border-[#2A1A15]/10 bg-white/60 py-14 sm:py-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-bold tracking-widest text-[#9C4A3C]">
                {isHi ? 'वाणीमित्र कैसे काम करता है' : 'HOW VAANIMITRA WORKS'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2A1A15] font-display">
                {isHi
                  ? 'बोलचाल की हिन्दी से मातृभाषा में समझ तक — 3 सरल चरण'
                  : 'From Spoken Hindi to Mother-Tongue Comprehension in 3 Steps'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((item) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="bg-white rounded-3xl p-6 border border-[#2A1A15]/10 shadow-xs flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#9C4A3C]/10 text-[#9C4A3C] flex items-center justify-center">
                          <StepIcon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-mono font-bold text-[#2A1A15]/40">
                          {isHi ? `चरण ${item.step}` : `STEP ${item.step}`}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#2A1A15] font-display">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#2A1A15]/75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 text-xs font-semibold text-[#355E3B]">
                      {item.sample}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={onEnterApp}
                className="h-13 px-8 rounded-2xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white font-semibold text-base shadow-sm flex items-center gap-2 transition-colors"
              >
                <span>
                  {isHi
                    ? 'वाणीमित्र क्लासरूम ऐप खोलें'
                    : 'Open VaaniMitra Classroom App'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#2A1A15]/10 bg-[#F7F3EE] py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2A1A15]/60">
          <span className="font-semibold text-[#2A1A15]">
            {isHi
              ? 'वाणीमित्र · झारखंड की कक्षाओं के लिए ऑफ़लाइन एआई शिक्षण सेतु'
              : 'VaaniMitra · Offline AI Teaching Bridge for Jharkhand Classrooms'}
          </span>
          <span>
            {isHi
              ? 'संथाली · मुंडारी · हो · कुड़ुख · निपुण भारत के अनुरूप'
              : 'Santhali · Mundari · Ho · Kurukh · Aligned with NIPUN Bharat'}
          </span>
        </div>
      </footer>
    </div>
  );
};
