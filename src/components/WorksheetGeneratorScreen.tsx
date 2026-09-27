import React, { useState } from 'react';
import { FileDown, BookmarkCheck, Volume2, RefreshCw, BookOpen } from 'lucide-react';
import {
  ConfidenceLevel,
  INITIAL_WORKSHEET,
  NIPUN_BHARAT_MAP,
  TribalLanguage,
  UILocale,
  WorksheetData,
} from '../data/vaaniData';
import { FlashcardIllustration } from './FlashcardIllustration';
import { downloadWorksheetPdf, speakClassroomPhrase } from '../utils/speechAndPdf';

interface WorksheetGeneratorScreenProps {
  selectedLanguage: TribalLanguage;
  dialectLabel: string;
  offlineModeOnly: boolean;
  uiLocale: UILocale;
  onWorksheetGenerated: (ws: WorksheetData) => void;
  onSaveWorksheetOffline: (ws: WorksheetData) => void;
}

const TOPIC_SUGGESTIONS: Record<'EVS' | 'Math' | 'Language', string[]> = {
  EVS: [
    'Paani ke Srot (Water Sources)',
    'Jungle ke Ped (Forest Trees)',
    'Saaf Haath (Clean Hands)',
    'Hamare Pakshi (Local Birds)',
  ],
  Math: [
    '1 se 20 Ginti (Counting 1-20)',
    'Jod aur Ghatao (Add & Subtract)',
    'Aakar aur Maap (Shapes)',
    'Haat Bazaar (Village Market)',
  ],
  Language: [
    'Mera Parivar (My Family)',
    'Chidiya ki Kahani (Bird Story)',
    'Subah ki Aadat (Morning Routine)',
    'Mera Gaon (My Village)',
  ],
};

export const WorksheetGeneratorScreen: React.FC<WorksheetGeneratorScreenProps> = ({
  selectedLanguage,
  dialectLabel,
  offlineModeOnly,
  uiLocale,
  onWorksheetGenerated,
  onSaveWorksheetOffline,
}) => {
  const isHi = uiLocale === 'hi';
  const [subject, setSubject] = useState<'EVS' | 'Math' | 'Language'>('EVS');
  const [grade, setGrade] = useState<number>(2);
  const [topic, setTopic] = useState<string>('Paani ke Srot (Water Sources)');
  const [storyMode, setStoryMode] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [worksheet, setWorksheet] = useState<WorksheetData>(INITIAL_WORKSHEET);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const currentNipun = NIPUN_BHARAT_MAP[subject][grade] || NIPUN_BHARAT_MAP.EVS[2];

  const handleSubjectChange = (newSub: 'EVS' | 'Math' | 'Language') => {
    setSubject(newSub);
    setTopic(TOPIC_SUGGESTIONS[newSub][0]);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      if (offlineModeOnly) {
        await new Promise((r) => setTimeout(r, 350));
        const localWs: WorksheetData = {
          ...INITIAL_WORKSHEET,
          id: `ws-local-${Date.now()}`,
          subject,
          grade,
          topic: topic.trim(),
          targetLanguage: selectedLanguage,
          dialectLabel,
          nipunCode: currentNipun.code,
          nipunOutcome: currentNipun.title,
          worksheetTitleHindi: topic.trim(),
          worksheetTitleTribal: `${selectedLanguage} अभ्यास पत्रक`,
          createdAt: 'Offline Pack',
        };
        setWorksheet(localWs);
        onWorksheetGenerated(localWs);
        setIsGenerating(false);
        return;
      }

      const response = await fetch('/api/worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          topic: topic.trim(),
          targetLanguage: selectedLanguage,
          dialect: dialectLabel,
          nipunCode: currentNipun.code,
          nipunOutcome: currentNipun.title,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate worksheet.');
      }

      const newWs: WorksheetData = {
        id: `ws-${Date.now()}`,
        subject,
        grade,
        topic: topic.trim(),
        targetLanguage: selectedLanguage,
        dialectLabel,
        nipunCode: currentNipun.code,
        nipunOutcome: currentNipun.title,
        worksheetTitleHindi: data.worksheetTitleHindi || topic.trim(),
        worksheetTitleTribal: data.worksheetTitleTribal || `${selectedLanguage} Worksheet`,
        teacherTip: data.teacherTip || '',
        questions: (data.questions || []).map((q: any, i: number) => ({
          id: q.id || `q-${i + 1}`,
          activityType: q.activityType || 'Activity',
          hindiPrompt: q.hindiPrompt || '',
          tribalPrompt: q.tribalPrompt || '',
          tribalNative: q.tribalNative || '',
          expectedAnswer: q.expectedAnswer || '',
          confidence: (['Verified', 'AI-estimated', 'Dictionary-match'].includes(q.confidence)
            ? q.confidence
            : 'Verified') as ConfidenceLevel,
        })),
        flashcards: (data.flashcards || []).map((fc: any, i: number) => ({
          id: `wfc-${Date.now()}-${i}`,
          hindiWord: fc.hindiWord || '',
          hindiRoman: fc.hindiRoman || '',
          tribalWord: fc.tribalWord || '',
          tribalNative: fc.tribalNative || '',
          tribalDevanagari: fc.tribalDevanagari || '',
          englishMeaning: fc.englishMeaning || '',
          iconKey: fc.iconKey || 'star',
          confidence: 'Verified',
        })),
        storyTitle: data.storyTitle || topic.trim(),
        storyLines: data.storyLines || INITIAL_WORKSHEET.storyLines,
        createdAt: 'Just now',
      };

      setWorksheet(newWs);
      onWorksheetGenerated(newWs);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error generating worksheet.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOffline = () => {
    onSaveWorksheetOffline(worksheet);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 5 Columns on Desktop: Worksheet Builder Form */}
      <div className="lg:col-span-5 space-y-4">
        <form
          onSubmit={handleGenerate}
          className="bg-white rounded-3xl p-6 shadow-xs border border-[#2A1A15]/10 space-y-5"
        >
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A15] font-display">
              {isHi ? 'वर्कशीट जनरेटर' : 'Worksheet Generator'}
            </h2>
            <p className="text-xs text-[#2A1A15]/65 mt-1">
              {isHi
                ? `${selectedLanguage} मातृभाषा में निपुण भारत-आधारित द्विभाषी वर्कशीट बनाएँ।`
                : `Create NIPUN Bharat-aligned bilingual worksheets in ${selectedLanguage}.`}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2A1A15]/75">
              {isHi ? 'विषय (Subject)' : 'Subject (विषय)'}
            </label>
            <select
              value={subject}
              onChange={(e) =>
                handleSubjectChange(e.target.value as 'EVS' | 'Math' | 'Language')
              }
              className="w-full h-12 px-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
            >
              <option value="EVS">
                {isHi ? 'पर्यावरण अध्ययन (EVS)' : 'EVS (पर्यावरण अध्ययन)'}
              </option>
              <option value="Math">
                {isHi ? 'गणित (Math)' : 'Math (गणित)'}
              </option>
              <option value="Language">
                {isHi ? 'भाषा (Language)' : 'Language (भाषा)'}
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2A1A15]/75">
              {isHi ? 'कक्षा (Grade 1–5)' : 'Grade (कक्षा 1–5)'}
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full h-12 px-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm font-medium text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
            >
              {[1, 2, 3, 4, 5].map((g) => (
                <option key={g} value={g}>
                  {isHi ? `कक्षा ${g} (Grade ${g})` : `Grade ${g} (कक्षा ${g})`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2A1A15]/75">
              {isHi ? 'पाठ का विषय (Topic)' : 'Topic (पाठ का विषय)'}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={isHi ? 'उदा. पानी के स्रोत' : 'e.g. Paani ke Srot'}
              className="w-full h-12 px-4 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/12 text-sm text-[#2A1A15] focus:outline-none focus:ring-2 focus:ring-[#9C4A3C]"
              required
            />
          </div>

          {/* Suggested Topic Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#2A1A15]/60">
              {isHi ? 'सुझाए गए विषय:' : 'Suggested Topics:'}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {TOPIC_SUGGESTIONS[subject].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setTopic(chip)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                    topic === chip
                      ? 'bg-[#2A1A15] text-[#F7F3EE]'
                      : 'bg-[#F7F3EE] text-[#2A1A15]/75 hover:text-[#2A1A15]'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#355E3B]/8 border border-[#355E3B]/20 text-xs space-y-0.5">
            <div className="font-mono font-bold text-[#355E3B]">{currentNipun.code}</div>
            <p className="text-[#2A1A15]/80">{currentNipun.title}</p>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full h-12 rounded-2xl bg-[#9C4A3C] hover:bg-[#843B2E] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>
              {isGenerating
                ? isHi
                  ? 'वर्कशीट बन रही है...'
                  : 'Generating Worksheet...'
                : isHi
                ? 'वर्कशीट बनाएँ'
                : 'Generate Worksheet'}
            </span>
          </button>

          {errorMsg && (
            <p className="text-xs text-[#9C4A3C] text-center pt-1">{errorMsg}</p>
          )}
        </form>
      </div>

      {/* Right 7 Columns on Desktop: Generated Worksheet Preview Card */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#2A1A15]/10 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#2A1A15]/10 pb-4">
          <div>
            <div className="text-xs font-mono text-[#355E3B] font-semibold">
              {worksheet.nipunCode} · {isHi ? `कक्षा ${worksheet.grade}` : `Grade ${worksheet.grade}`} ·{' '}
              {worksheet.targetLanguage}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2A1A15] font-display mt-1">
              {worksheet.worksheetTitleHindi}
            </h3>
            <p className="text-sm text-[#9C4A3C] font-semibold mt-0.5">
              {worksheet.worksheetTitleTribal}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStoryMode((s) => !s)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
              storyMode
                ? 'bg-[#9C4A3C] text-white'
                : 'bg-[#F7F3EE] text-[#2A1A15] hover:bg-[#EAE3D9]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {storyMode
                ? isHi
                  ? 'प्रश्न देखें'
                  : 'View Questions'
                : isHi
                ? 'कहानी मोड (लोककथा)'
                : 'Story Mode (Folktale)'}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5">
          {storyMode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#F7F3EE] px-4 py-3 rounded-2xl">
                <span className="text-sm font-bold text-[#2A1A15]">
                  {worksheet.storyTitle}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakClassroomPhrase(
                      worksheet.storyLines.map((l) => l.tribalLine).join(' ')
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-[#355E3B] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isHi ? 'कहानी सुनें' : 'Read Aloud'}</span>
                </button>
              </div>

              {worksheet.storyLines.map((line) => (
                <div
                  key={line.lineNumber}
                  className="p-4 rounded-2xl bg-[#F7F3EE] space-y-1 border border-[#2A1A15]/6"
                >
                  <p className="text-base font-bold text-[#2A1A15]">{line.tribalNative}</p>
                  <p className="text-sm font-medium text-[#9C4A3C]">{line.tribalLine}</p>
                  <p className="text-xs text-[#2A1A15]/75">{line.hindiLine}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {worksheet.questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-[#F7F3EE] space-y-1.5 border border-[#2A1A15]/6"
                  >
                    <p className="text-xs font-medium text-[#2A1A15]/70">{q.hindiPrompt}</p>
                    <p className="text-base font-bold text-[#2A1A15]">{q.tribalPrompt}</p>
                    <p className="text-xs text-[#355E3B] font-semibold">
                      {isHi ? 'अपेक्षित उत्तर:' : 'Expected Answer:'} {q.expectedAnswer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Vocabulary Flashcards */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-bold text-[#2A1A15]/70 uppercase tracking-wider">
                  {isHi
                    ? 'चित्र-आधारित शब्दावली फ्लैशकार्ड'
                    : 'Auto-Illustrated Vocabulary Flashcards'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {worksheet.flashcards.map((fc) => (
                    <button
                      key={fc.id}
                      type="button"
                      onClick={() =>
                        speakClassroomPhrase(fc.tribalDevanagari || fc.tribalWord)
                      }
                      className="p-3 rounded-2xl bg-[#F7F3EE] border border-[#2A1A15]/8 flex flex-col items-center text-center gap-2 hover:border-[#9C4A3C] transition-colors"
                    >
                      <FlashcardIllustration
                        iconKey={fc.iconKey}
                        word={fc.hindiRoman}
                        className="w-12 h-12"
                      />
                      <div className="min-w-0 w-full">
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
              </div>
            </>
          )}
        </div>

        {/* Download / Save Actions at Bottom of Card */}
        <div className="pt-4 border-t border-[#2A1A15]/10 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleSaveOffline}
            className="w-full sm:w-auto h-11 px-5 rounded-2xl bg-[#F7F3EE] hover:bg-[#EAE3D9] text-[#2A1A15] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <BookmarkCheck className="w-4 h-4 text-[#355E3B]" />
            <span>
              {savedNotice
                ? isHi
                  ? 'ऑफ़लाइन पैक में सहेजा गया!'
                  : 'Saved to Offline Pack!'
                : isHi
                ? 'ऑफ़लाइन सहेजें'
                : 'Save Offline'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => downloadWorksheetPdf(worksheet)}
            className="w-full sm:w-auto h-11 px-6 rounded-2xl bg-[#2A1A15] hover:bg-[#3E2821] text-[#F7F3EE] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>{isHi ? 'PDF डाउनलोड करें' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
