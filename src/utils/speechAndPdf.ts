import { jsPDF } from 'jspdf';
import { WorksheetData } from '../data/vaaniData';

export function speakClassroomPhrase(
  textToSpeak: string,
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onStart?.();
    setTimeout(() => options?.onEnd?.(), 1500);
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.toLowerCase().includes('hi-in')) ||
      voices.find((v) => v.lang.toLowerCase().includes('en-in')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.lang = preferredVoice?.lang || 'hi-IN';
    utterance.rate = options?.rate ?? 0.86;
    utterance.pitch = options?.pitch ?? 1.0;

    utterance.onstart = () => {
      options?.onStart?.();
    };
    utterance.onend = () => {
      options?.onEnd?.();
    };
    utterance.onerror = () => {
      options?.onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    options?.onStart?.();
    setTimeout(() => options?.onEnd?.(), 1500);
  }
}

function toAsciiSafe(input: string): string {
  // Strip non-ASCII glyphs for standard jsPDF Helvetica compatibility while preserving Roman transliteration
  const cleaned = input
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned || 'Mother-tongue classroom activity item';
}

export function downloadWorksheetPdf(worksheet: WorksheetData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Header band
  doc.setFillColor(42, 26, 21); // #2A1A15
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(247, 243, 238); // #F7F3EE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('VaaniMitra - Bilingual Classroom Worksheet', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    `Jharkhand PALASH & NIPUN Bharat Bridge  |  Subject: ${worksheet.subject}  |  Grade: Class ${worksheet.grade}`,
    14,
    20
  );
  doc.text(
    `Language & Dialect: ${toAsciiSafe(worksheet.dialectLabel)}  |  Code: ${worksheet.nipunCode}`,
    14,
    26
  );

  let y = 40;

  // Topic & NIPUN Outcome box
  doc.setDrawColor(156, 74, 60); // #9C4A3C
  doc.setLineWidth(0.4);
  doc.setFillColor(247, 243, 238);
  doc.roundedRect(14, y - 5, 182, 22, 2, 2, 'FD');

  doc.setTextColor(42, 26, 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Topic: ${toAsciiSafe(worksheet.topic)}`, 18, y + 1);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const outcomeLines = doc.splitTextToSize(
    `NIPUN Outcome (${worksheet.nipunCode}): ${toAsciiSafe(worksheet.nipunOutcome)}`,
    174
  );
  doc.text(outcomeLines, 18, y + 7);

  y += 25;

  // Teacher tip
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(53, 94, 59); // #355E3B
  const tipLines = doc.splitTextToSize(`Teacher Classroom Tip: ${toAsciiSafe(worksheet.teacherTip)}`, 180);
  doc.text(tipLines, 14, y);
  y += tipLines.length * 4.5 + 5;

  // Section 1: Bilingual Activities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(156, 74, 60);
  doc.text('1. Bilingual Classroom Activities (Hindi + Mother-Tongue Phonetics)', 14, y);
  y += 6;

  worksheet.questions.forEach((q, idx) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(42, 26, 21);
    doc.text(
      `Q${idx + 1} [${toAsciiSafe(q.activityType)}] - Confidence: ${q.confidence}`,
      14,
      y
    );
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const tribalClean = toAsciiSafe(q.tribalPrompt);
    const ansClean = toAsciiSafe(q.expectedAnswer);

    const pLines = doc.splitTextToSize(`Mother-Tongue Prompt: ${tribalClean}`, 180);
    doc.text(pLines, 16, y);
    y += pLines.length * 4.2;

    const aLines = doc.splitTextToSize(`Expected Student Response: ${ansClean}`, 180);
    doc.setTextColor(53, 94, 59);
    doc.text(aLines, 16, y);
    y += aLines.length * 4.2 + 4;
  });

  y += 3;

  // Section 2: Vocabulary Flashcards
  if (y > 230) {
    doc.addPage();
    y = 20;
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(156, 74, 60);
  doc.text('2. Early-Grade FLN Vocabulary Flashcard Pairs', 14, y);
  y += 6;

  worksheet.flashcards.forEach((fc, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(42, 26, 21);
    doc.text(
      `${idx + 1}. Hindi: ${toAsciiSafe(fc.hindiRoman || fc.hindiWord)}   <--->   ${worksheet.targetLanguage}: ${toAsciiSafe(fc.tribalWord)} (${toAsciiSafe(fc.englishMeaning)}) [${fc.confidence}]`,
      16,
      y
    );
    y += 5.5;
  });

  y += 4;

  // Section 3: Story Mode (Bilingual Folktale)
  if (worksheet.storyLines && worksheet.storyLines.length > 0) {
    if (y > 220) {
      doc.addPage();
      y = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(156, 74, 60);
    doc.text(`3. Story Mode (Bilingual Village Folktale)`, 14, y);
    y += 6;

    worksheet.storyLines.forEach((line) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(42, 26, 21);
      const sLines = doc.splitTextToSize(
        `Line ${line.lineNumber} (${worksheet.targetLanguage}): ${toAsciiSafe(line.tribalLine)}`,
        180
      );
      doc.text(sLines, 16, y);
      y += sLines.length * 4.3 + 2;
    });
  }

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 105, 98);
  doc.text(
    'Generated by VaaniMitra Offline Teaching Bridge (Jharkhand Primary FLN Prototype)',
    14,
    288
  );

  const safeSlug = worksheet.topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);
  doc.save(`VaaniMitra-${worksheet.targetLanguage}-Class${worksheet.grade}-${safeSlug || 'worksheet'}.pdf`);
}
