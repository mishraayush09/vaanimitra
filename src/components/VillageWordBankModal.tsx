import React, { useState, useEffect } from 'react';
import { Mic, CheckCircle2, RefreshCw, PlusCircle, X } from 'lucide-react';
import { TribalLanguage, UILocale, WordCorrection } from '../data/vaaniData';

interface VillageWordBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: TribalLanguage;
  activeDialect: string;
  prefillHindi?: string;
  prefillAiEstimated?: string;
  wordBankQueue: WordCorrection[];
  onAddCorrection: (newItem: Omit<WordCorrection, 'id' | 'timestamp' | 'synced'>) => void;
  onSyncAll: () => void;
  uiLocale: UILocale;
}

export const VillageWordBankModal: React.FC<VillageWordBankModalProps> = ({
  isOpen,
  onClose,
  activeLanguage,
  activeDialect,
  prefillHindi = '',
  prefillAiEstimated = '',
  wordBankQueue,
  onAddCorrection,
  onSyncAll,
  uiLocale,
}) => {
  const isHi = uiLocale === 'hi';
  const [originalHindi, setOriginalHindi] = useState(prefillHindi || 'पढ़ना (Padhna — To Read)');
  const [aiEstimatedTribal, setAiEstimatedTribal] = useState(prefillAiEstimated || 'Parhao (ᱯᱟᱲᱦᱟᱣ)');
  const [suggestedTribal, setSuggestedTribal] = useState('');
  const [suggestedDevanagari, setSuggestedDevanagari] = useState('');
  const [contributorRole, setContributorRole] = useState('Local Shiksha Mitra / Native Speaker');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    if (prefillHindi) setOriginalHindi(prefillHindi);
    if (prefillAiEstimated) setAiEstimatedTribal(prefillAiEstimated);
  }, [prefillHindi, prefillAiEstimated]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pendingCount = wordBankQueue.filter((item) => !item.synced).length;

  const handleVoiceSample = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      return;
    }
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      if (!suggestedTribal) {
        setSuggestedTribal(
          activeLanguage === 'Santhali'
            ? 'Ol-Parhao (ᱚᱞ ᱯᱟᱲᱦᱟᱣ)'
            : activeLanguage === 'Mundari'
            ? 'Ol-Padhao (ओल-पढाव)'
            : activeLanguage === 'Ho'
            ? 'Ol-Padhao (ओल-पढाव)'
            : 'Baa-na টুड़ना (बाचोत)'
        );
        setSuggestedDevanagari(
          activeLanguage === 'Santhali'
            ? 'ओल-पाड़हाव'
            : activeLanguage === 'Mundari'
            ? 'ओल-पढाव'
            : activeLanguage === 'Ho'
            ? 'ओल-पढाव'
            : 'बाचोत-टूड़ना'
        );
      }
    }, 1400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestedTribal.trim()) return;

    onAddCorrection({
      originalHindi: originalHindi.trim(),
      aiEstimatedTribal: aiEstimatedTribal.trim(),
      suggestedTribal: suggestedTribal.trim(),
      suggestedDevanagari: suggestedDevanagari.trim() || suggestedTribal.trim(),
      language: activeLanguage,
      dialect: activeDialect,
      contributorRole: contributorRole.trim(),
    });

    setSuggestedTribal('');
    setSuggestedDevanagari('');
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 3000);
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onSyncAll();
      setIsSyncing(false);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2A1A15]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-bank-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F3EE] border border-[#2A1A15]/15 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header — always visible */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 bg-white border-b border-[#2A1A15]/10 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#9C4A3C]">
              <span>{isHi ? 'ग्राम शब्दकोश' : 'Village Word Bank'}</span>
              <span aria-hidden="true">·</span>
              <span>
                {isHi ? 'सामुदायिक बोली संकलन' : 'Community Dialect Curation'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {isHi
                  ? `${pendingCount} सुधार सिंक हेतु लंबित`
                  : `${pendingCount} corrections pending sync`}
              </span>
            </div>
            <h2 id="word-bank-modal-title" className="text-xl sm:text-2xl font-bold text-[#2A1A15] mt-1">
              {isHi
                ? 'स्थानीय बोली का सही शब्द सुझाएँ'
                : 'Suggest a Local Dialect Correction'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-[#F7F3EE] text-[#2A1A15] hover:bg-[#9C4A3C] hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
            aria-label="Close Village Word Bank"
          >
            <X className="w-4 h-4" />
            <span>{isHi ? 'बंद करें' : 'Close'}</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <p className="text-xs sm:text-sm text-[#2A1A15]/75">
            {isHi
              ? 'स्थानीय भाषी और शिक्षा मित्र “AI-अनुमानित” अनुवादों को सुधार सकते हैं ताकि ऑफ़लाइन ग्राम शब्दकोश हर सप्ताह बेहतर बन सके।'
              : 'Native speakers and Shiksha Mitras can refine “AI-estimated” translations so the offline village dictionary improves every week.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 cols: Contribution Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-4 bg-white p-5 rounded-2xl border border-[#2A1A15]/10">
              <h3 className="text-base font-bold text-[#2A1A15]">
                {isHi
                  ? `सही ${activeLanguage} शब्द दर्ज करें`
                  : `Submit Better ${activeLanguage} Term`}
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#2A1A15]/75 mb-1">
                  {isHi
                    ? 'हिन्दी कक्षा शब्द / वाक्यांश'
                    : 'Hindi Classroom Word / Phrase'}
                </label>
                <input
                  type="text"
                  value={originalHindi}
                  onChange={(e) => setOriginalHindi(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EE] border border-[#2A1A15]/15 text-sm text-[#2A1A15]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2A1A15]/75 mb-1">
                  {isHi
                    ? 'चिन्हित “AI-अनुमानित” अनुवाद'
                    : 'Flagged “AI-estimated” Output'}
                </label>
                <input
                  type="text"
                  value={aiEstimatedTribal}
                  onChange={(e) => setAiEstimatedTribal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EE] border border-[#2A1A15]/15 text-sm text-[#2A1A15]/80"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-[#2A1A15]">
                    {isHi
                      ? `प्रामाणिक ग्राम शब्द (${activeDialect}) *`
                      : `Authentic Village Word (${activeDialect}) *`}
                  </label>
                  <button
                    type="button"
                    onClick={handleVoiceSample}
                    className={`text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      isRecordingVoice
                        ? 'bg-[#9C4A3C] text-white animate-pulse'
                        : 'text-[#9C4A3C] hover:bg-[#9C4A3C]/10'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>
                      {isRecordingVoice
                        ? isHi
                          ? 'रिकॉर्ड हो रहा है...'
                          : 'Recording audio...'
                        : isHi
                        ? 'बोलें / ऑटो-भरें'
                        : 'Speak / Auto-fill'}
                    </span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={
                    isHi
                      ? `उदा. Ol-Parhao (${activeLanguage} में)`
                      : `e.g. Ol-Parhao (in ${activeLanguage})`
                  }
                  value={suggestedTribal}
                  onChange={(e) => setSuggestedTribal(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#9C4A3C]/50 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2A1A15]/75 mb-1">
                  {isHi
                    ? 'देवनागरी उच्चारण (हिन्दी शिक्षकों के लिए)'
                    : 'Devanagari Phonetic Guide (for Hindi Teachers)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. ओल-पाड़हाव"
                  value={suggestedDevanagari}
                  onChange={(e) => setSuggestedDevanagari(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EE] border border-[#2A1A15]/15 text-sm text-[#2A1A15]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2A1A15]/75 mb-1">
                  {isHi
                    ? 'सत्यापनकर्ता (शिक्षक / एसएमसी सदस्य)'
                    : 'Verified By (Teacher / SMC Volunteer)'}
                </label>
                <input
                  type="text"
                  value={contributorRole}
                  onChange={(e) => setContributorRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F3EE] border border-[#2A1A15]/15 text-sm text-[#2A1A15]"
                />
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F7F3EE] hover:bg-[#2A1A15]/10 text-[#2A1A15] font-semibold text-sm transition-colors"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#9C4A3C] hover:bg-[#843B2E] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <PlusCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isHi
                      ? 'सुधार जोड़ें व लागू करें'
                      : 'Queue Correction & Apply Locally'}
                  </span>
                </button>
              </div>

              {submittedNotice && (
                <div className="flex items-center gap-2 text-xs font-medium text-[#355E3B] bg-[#355E3B]/10 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isHi
                      ? 'स्थानीय शब्दकोश में जोड़ा गया और ब्लॉक सिंक के लिए कतारबद्ध!'
                      : 'Added to local dialect dictionary & queued for block sync!'}
                  </span>
                </div>
              )}
            </form>

            {/* Right 6 cols: Queued Corrections List */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white p-5 rounded-2xl border border-[#2A1A15]/10">
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#2A1A15]/10">
                  <div>
                    <h3 className="text-base font-bold text-[#2A1A15]">
                      {isHi ? 'ऑफ़लाइन सिंक कतार' : 'Offline Sync Queue'}
                    </h3>
                    <p className="text-xs text-[#2A1A15]/65 font-mono tabular-nums">
                      {isHi
                        ? `${pendingCount} सुधार सिंक हेतु लंबित · टैबलेट पर सुरक्षित`
                        : `${pendingCount} corrections pending sync · Stored on tablet`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerSync}
                    disabled={pendingCount === 0 || isSyncing}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#355E3B] text-white hover:bg-[#2A4B2F] disabled:opacity-40 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>
                      {isSyncing
                        ? isHi
                          ? 'सिंक हो रहा है...'
                          : 'Syncing...'
                        : isHi
                        ? 'वाई-फ़ाई सिंक करें'
                        : 'Simulate Wi-Fi Sync'}
                    </span>
                  </button>
                </div>

                <div className="divide-y divide-[#2A1A15]/8 max-h-64 overflow-y-auto mt-2">
                  {wordBankQueue.map((item) => (
                    <div key={item.id} className="py-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#2A1A15]">{item.originalHindi}</span>
                        <span className="font-mono text-[#2A1A15]/65">
                          {item.synced
                            ? isHi
                              ? '✓ DIET में सिंक हुआ'
                              : '✓ Synced to DIET'
                            : isHi
                            ? '● सिंक लंबित'
                            : '● Pending Sync'}
                        </span>
                      </div>
                      <div className="text-xs text-[#2A1A15]/75 flex flex-wrap items-center gap-1.5">
                        <span className="line-through text-[#9C4A3C]/80">{item.aiEstimatedTribal}</span>
                        <span aria-hidden="true">→</span>
                        <span className="font-bold text-[#355E3B]">{item.suggestedTribal}</span>
                        <span className="text-[#2A1A15]/60">({item.suggestedDevanagari})</span>
                      </div>
                      <div className="text-[11px] text-[#2A1A15]/55">
                        {item.language} · {item.dialect} · {item.contributorRole} · {item.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2A1A15]/10 text-xs text-[#2A1A15]/65">
                {isHi
                  ? 'प्रत्येक सत्यापित सुधार इस टैबलेट पर तुरंत लागू होता है और वाई-फ़ाई मिलने पर पड़ोसी विद्यालयों के साथ सिंक हो जाता है।'
                  : 'Every verified correction overrides the quantised IndicTrans2 model immediately on this tablet and syncs to neighbouring block schools when Wi-Fi is detected.'}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer — always accessible Close button */}
        <div className="px-6 py-3.5 bg-white border-t border-[#2A1A15]/10 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2A1A15] hover:bg-[#2A1A15]/85 text-[#F7F3EE] text-xs font-semibold transition-colors"
          >
            {isHi ? 'पूर्ण / विंडो बंद करें' : 'Done / Close Window'}
          </button>
        </div>
      </div>
    </div>
  );
};
