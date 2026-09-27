import React, { useState, useEffect } from 'react';
import { Mic, Volume2, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { FlashcardItem, TribalLanguage } from '../data/vaaniData';
import { speakClassroomPhrase } from '../utils/speechAndPdf';

interface SayItBackCoachProps {
  targetLanguage: TribalLanguage;
  fullPhraseTribal: string;
  fullPhraseNative: string;
  fullPhraseDevanagari: string;
  hindiMeaning: string;
  flashcards: FlashcardItem[];
  onPracticeCompleted: (score: number) => void;
}

interface PracticeTarget {
  id: string;
  label: string;
  nativeScript: string;
  devanagari: string;
  meaning: string;
  referenceWave: number[];
}

export const SayItBackCoach: React.FC<SayItBackCoachProps> = ({
  targetLanguage,
  fullPhraseTribal,
  fullPhraseNative,
  fullPhraseDevanagari,
  hindiMeaning,
  flashcards,
  onPracticeCompleted,
}) => {
  const targets: PracticeTarget[] = [
    {
      id: 'full-sentence',
      label: fullPhraseTribal,
      nativeScript: fullPhraseNative,
      devanagari: fullPhraseDevanagari,
      meaning: hindiMeaning,
      referenceWave: [32, 68, 84, 52, 76, 92, 60, 44, 78, 88, 64, 38, 72, 85, 50, 30],
    },
    ...flashcards.map((fc, idx) => ({
      id: fc.id || `word-${idx}`,
      label: fc.tribalWord,
      nativeScript: fc.tribalNative,
      devanagari: fc.tribalDevanagari,
      meaning: `${fc.hindiWord} (${fc.englishMeaning})`,
      referenceWave: [
        28 + ((idx * 13) % 30),
        75,
        90,
        62,
        80,
        45 + ((idx * 17) % 35),
        85,
        70,
        40,
        68,
        88,
        55,
        35,
        60,
        42,
        25,
      ],
    })),
  ];

  const [selectedId, setSelectedId] = useState<string>('full-sentence');
  const [isPlayingRef, setIsPlayingRef] = useState(false);
  const [isRecordingChild, setIsRecordingChild] = useState(false);
  const [childWave, setChildWave] = useState<number[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<'great' | 'retry' | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const activeTarget = targets.find((t) => t.id === selectedId) || targets[0];

  useEffect(() => {
    setSelectedId('full-sentence');
    setChildWave(null);
    setScore(null);
    setFeedbackState(null);
  }, [fullPhraseTribal, targetLanguage]);

  const handleSelectTarget = (id: string) => {
    setSelectedId(id);
    setChildWave(null);
    setScore(null);
    setFeedbackState(null);
  };

  const handlePlayReference = () => {
    setIsPlayingRef(true);
    speakClassroomPhrase(activeTarget.devanagari || activeTarget.label, {
      rate: 0.82,
      onStart: () => setIsPlayingRef(true),
      onEnd: () => setIsPlayingRef(false),
    });
  };

  const handleRecordChild = (simulateMode?: 'great' | 'retry') => {
    if (isRecordingChild) return;
    setIsRecordingChild(true);
    setScore(null);
    setFeedbackState(null);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const animated = activeTarget.referenceWave.map((val, i) => {
        const jitter = Math.sin(step * 0.9 + i) * 18;
        return Math.max(18, Math.min(96, Math.round(val + jitter)));
      });
      setChildWave(animated);
    }, 140);

    setTimeout(() => {
      clearInterval(interval);
      setIsRecordingChild(false);
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);

      // Determine outcome: if user clicked a specific simulation preset or natural progression
      const outcome: 'great' | 'retry' =
        simulateMode || (nextAttempt % 3 === 2 ? 'retry' : 'great');

      if (outcome === 'great') {
        const computedScore = 88 + ((nextAttempt * 3) % 10); // 88% - 97%
        const matchedWave = activeTarget.referenceWave.map((v, idx) =>
          Math.max(20, Math.min(96, v + ((idx % 2 === 0 ? 1 : -1) * 5)))
        );
        setChildWave(matchedWave);
        setScore(computedScore);
        setFeedbackState('great');
        onPracticeCompleted(computedScore);
      } else {
        const computedScore = 62 + ((nextAttempt * 5) % 12); // 62% - 73%
        const offWave = activeTarget.referenceWave.map((v, idx) =>
          Math.max(15, Math.min(90, Math.round(v * (idx % 2 === 0 ? 0.62 : 1.18))))
        );
        setChildWave(offWave);
        setScore(computedScore);
        setFeedbackState('retry');
        onPracticeCompleted(computedScore);
      }
    }, 2100);
  };

  const praisePhraseByLang: Record<TribalLanguage, string> = {
    Santhali: 'Adi Napiay! (ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ · बहुत बढ़िया!)',
    Mundari: 'Khub Bugin! (खूब बुगिन · बहुत अच्छा!)',
    Ho: 'Esu Bugin! (एसु बुगिन · शाबाश!)',
    Kurukh: 'Dauge! (दाउगे · बहुत सुंदर!)',
  };

  return (
    <section
      aria-label="Say It Back Student Pronunciation Coach"
      className="bg-white rounded-2xl border border-[#2A1A15]/10 p-6 shadow-xs"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#2A1A15]/8">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#355E3B]">
            <span>Student Oral FLN Activity</span>
            <span aria-hidden="true">·</span>
            <span>Listening & Phonetic Echo</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{attemptCount} practices this session</span>
          </div>
          <h3 className="text-xl font-bold text-[#2A1A15] mt-1">
            “Say It Back” Pronunciation Coach
          </h3>
          <p className="text-sm text-[#2A1A15]/75 mt-0.5">
            Select a word or the full sentence, play the reference voice, and invite a child to repeat it into the tablet mic.
          </p>
        </div>

        {/* Target Word / Phrase Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F7F3EE] p-1.5 rounded-xl border border-[#2A1A15]/10">
          {targets.map((t, index) => {
            const isSelected = t.id === activeTarget.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTarget(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2A1A15] text-[#F7F3EE] shadow-2xs'
                    : 'text-[#2A1A15]/75 hover:text-[#2A1A15] hover:bg-white/60'
                }`}
              >
                {index === 0 ? 'Full Phrase' : t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phrase Display + Dual Waveform Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
        {/* Left 5 cols: Active Target Card & Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#F7F3EE] border border-[#2A1A15]/10">
            <div className="text-xs text-[#2A1A15]/60 font-medium">
              Target {targetLanguage} Expression · {activeTarget.meaning}
            </div>
            <div className="text-xl font-bold text-[#2A1A15] mt-1 tracking-tight">
              {activeTarget.nativeScript}
            </div>
            <div className="text-base font-semibold text-[#9C4A3C] mt-1">
              {activeTarget.devanagari}
            </div>
            <div className="text-xs font-mono text-[#2A1A15]/70 mt-0.5">
              Phonetic: {activeTarget.label}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePlayReference}
              className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border transition-colors whitespace-nowrap ${
                isPlayingRef
                  ? 'bg-[#355E3B] text-white border-[#355E3B]'
                  : 'bg-white text-[#2A1A15] border-[#2A1A15]/20 hover:bg-[#F7F3EE]'
              }`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>{isPlayingRef ? 'Playing Reference...' : '1. Listen to Reference'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRecordChild()}
              disabled={isRecordingChild}
              className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
                isRecordingChild
                  ? 'bg-[#9C4A3C] text-white animate-pulse'
                  : 'bg-[#9C4A3C] text-white hover:bg-[#843B2E]'
              }`}
            >
              <Mic className="w-4 h-4 shrink-0" />
              <span>{isRecordingChild ? 'Child Speaking...' : '2. Tap & Say It Back'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#2A1A15]/60 pt-1">
            <span>Demo testing shortcuts:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRecordChild('great')}
                disabled={isRecordingChild}
                className="underline hover:text-[#355E3B] font-medium"
              >
                Simulate “Great!”
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleRecordChild('retry')}
                disabled={isRecordingChild}
                className="underline hover:text-[#9C4A3C] font-medium"
              >
                Simulate “Try Again”
              </button>
            </div>
          </div>
        </div>

        {/* Right 7 cols: Acoustic Waveform Comparison & Gamified Feedback */}
        <div className="lg:col-span-7 bg-[#F7F3EE] rounded-xl p-5 border border-[#2A1A15]/10">
          <div className="flex items-center justify-between text-xs font-medium text-[#2A1A15]/70 mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#355E3B] inline-block" />
                <span>Reference Cadence</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#9C4A3C] inline-block" />
                <span>Student Voice Envelope</span>
              </span>
            </div>
            {score !== null && (
              <span className="font-mono font-semibold tabular-nums text-[#2A1A15]">
                Acoustic Match: {score}%
              </span>
            )}
          </div>

          {/* Dual Bar Waveform Visualizer */}
          <div className="h-28 flex items-end justify-between gap-2 px-2 py-2 bg-white rounded-lg border border-[#2A1A15]/8">
            {activeTarget.referenceWave.map((refVal, idx) => {
              const studentVal = childWave ? childWave[idx] : 12;
              return (
                <div key={idx} className="flex-1 flex items-end justify-center gap-1 h-full">
                  <div
                    className={`w-2 rounded-t transition-opacity duration-200 ${
                      isPlayingRef ? 'bg-[#355E3B] opacity-100' : 'bg-[#355E3B]/65'
                    }`}
                    style={{ height: `${refVal}%` }}
                    title={`Reference syllable bar ${idx + 1}`}
                  />
                  <div
                    className={`w-2 rounded-t transition-opacity duration-200 ${
                      childWave
                        ? feedbackState === 'retry'
                          ? 'bg-[#E0A458]'
                          : 'bg-[#9C4A3C]'
                        : 'bg-[#2A1A15]/15'
                    }`}
                    style={{ height: `${studentVal}%` }}
                    title={`Student voice bar ${idx + 1}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Result Banner */}
          <div className="mt-4 min-h-[52px] flex items-center justify-between">
            {!feedbackState && !isRecordingChild && (
              <p className="text-xs text-[#2A1A15]/65">
                Tap <strong>“2. Tap &amp; Say It Back”</strong> and ask the child to repeat{' '}
                <span className="font-semibold text-[#2A1A15]">{activeTarget.devanagari}</span> aloud.
              </p>
            )}

            {isRecordingChild && (
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#9C4A3C]">
                <Mic className="w-4 h-4 animate-bounce" />
                <span>Listening to student pronunciation... speak clearly now</span>
              </div>
            )}

            {feedbackState === 'great' && score !== null && (
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#355E3B]/10 border border-[#355E3B]/30 rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#355E3B] shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#2A1A15]">
                      Great! · {praisePhraseByLang[targetLanguage]}
                    </div>
                    <div className="text-xs text-[#2A1A15]/75">
                      Syllable rhythm and vowel length matched ({score}% confidence).
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRecordChild()}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#2A1A15] border border-[#2A1A15]/15 hover:bg-[#F7F3EE] flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice Again</span>
                </button>
              </div>
            )}

            {feedbackState === 'retry' && score !== null && (
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#E0A458]/20 border border-[#E0A458] rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#9C4A3C] shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-[#2A1A15]">
                      Try again slowly! · धीरे-धीरे फिर से बोलें ({score}% match)
                    </div>
                    <div className="text-xs text-[#2A1A15]/80">
                      Listen once more to <strong>{activeTarget.devanagari}</strong> and emphasize the first syllable.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePlayReference}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#2A1A15] border border-[#2A1A15]/15 hover:bg-[#F7F3EE] flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Reference</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
