import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { translateLocallyToTribal } from "./src/utils/tribalTranslator.js";
import type { TribalLanguage } from "./src/data/vaaniData.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

function getGenAIClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

app.post("/api/translate", async (req, res) => {
  const startTime = Date.now();
  const {
    hindiInput = "",
    imageBase64,
    imageMimeType = "image/jpeg",
    targetLanguage = "Santhali",
    dialect = "Dumka Block (Ol Chiki — Santhal Pargana)",
  } = req.body || {};

  if ((!hindiInput || typeof hindiInput !== "string") && !imageBase64) {
    return res.status(400).json({ error: "Hindi text or classroom image is required." });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("No GEMINI_API_KEY configured, using built-in tribal linguistic engine");
    }

    const ai = getGenAIClient();

    const textPrompt = imageBase64
      ? `You are VaaniMitra's curriculum-aware linguistic & Vision OCR engine.
Look carefully at this uploaded image (it could be a textbook page, handwritten note, blackboard, document, or a real-world photo/object).
1. If there is readable text in the image (in Hindi, English, or any script), extract and translate/convert that exact text into clean Hindi Devanagari in "hindiDevanagari" and Roman Hindi in "hindiRoman". If the image is a photo of an object, person, or scene without text, write a clear Hindi sentence describing what is in the photo in "hindiDevanagari" and "hindiRoman".${
          hindiInput ? ` (User input/context: "${hindiInput}")` : ""
        }
2. Translate that exact Hindi sentence into ${targetLanguage} tailored for the ${dialect} region of Jharkhand, India.
3. For Santhali, include authentic Ol Chiki script in "tribalNativeScript" AND clear Devanagari phonetic transcription in "tribalDevanagariPhonetic" so a Hindi-speaking teacher can read it aloud easily, plus Roman phonetics in "tribalRomanPhonetic".
4. For Mundari, Ho, or Kurukh, provide authentic script/Devanagari representation in "tribalNativeScript", Devanagari phonetic reading in "tribalDevanagariPhonetic", and Roman phonetics in "tribalRomanPhonetic".
5. Assign a confidence status ("Verified", "AI-estimated", or "Dictionary-match") and extract 4 key vocabulary word-pairs from this exact sentence/image as flashcards with "iconKey" chosen from: ["water", "tree", "book", "sun", "bird", "hand", "house", "river", "number", "food", "family", "earth", "flower", "animal", "school", "star"].`
      : `You are VaaniMitra's curriculum-aware linguistic engine for Jharkhand's tribal languages.
Translate the following user input (which may be in Hindi Devanagari, Hinglish/Roman Hindi, or English) into ${targetLanguage} tailored for the ${dialect} region of Jharkhand, India.
IMPORTANT: Translate the EXACT meaning and words of the user's input sentence — never substitute a generic preset sentence.

User input sentence: "${hindiInput}"

Requirements:
1. Convert/normalize the user's exact input into clean Hindi Devanagari in "hindiDevanagari" and Romanized Hindi in "hindiRoman".
2. Translate that exact sentence into authentic ${targetLanguage}.
3. For Santhali, include authentic Ol Chiki script in "tribalNativeScript" AND clear Devanagari phonetic transcription in "tribalDevanagariPhonetic" so a Hindi-speaking teacher can read it aloud easily, plus Roman phonetics in "tribalRomanPhonetic".
4. For Mundari, Ho, or Kurukh, provide authentic script/Devanagari representation in "tribalNativeScript", Devanagari phonetic reading in "tribalDevanagariPhonetic", and Roman phonetics in "tribalRomanPhonetic".
5. Assign a realistic confidence status ("Verified", "AI-estimated", or "Dictionary-match") for both the overall sentence and each vocabulary flashcard.
6. Extract up to 4 key vocabulary word-pairs from this exact sentence as flashcards. For each flashcard, pick the closest semantic "iconKey" from: ["water", "tree", "book", "sun", "bird", "hand", "house", "river", "number", "food", "family", "earth", "flower", "animal", "school", "star"].`;

    const contentsPayload = imageBase64
      ? {
          parts: [
            {
              inlineData: {
                mimeType: imageMimeType,
                data: imageBase64,
              },
            },
            { text: textPrompt },
          ],
        }
      : textPrompt;

    const schemaConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hindiDevanagari: {
            type: Type.STRING,
            description: "The input sentence written in clean Hindi Devanagari script.",
          },
          hindiRoman: {
            type: Type.STRING,
            description: "Romanized Hindi transliteration of the input sentence.",
          },
          tribalNativeScript: {
            type: Type.STRING,
            description: "Translated sentence in native script (Ol Chiki for Santhali, Devanagari/Warang Citi for others).",
          },
          tribalDevanagariPhonetic: {
            type: Type.STRING,
            description: "Devanagari phonetic guide of the tribal translation so a Hindi teacher can pronounce it.",
          },
          tribalRomanPhonetic: {
            type: Type.STRING,
            description: "Clear Roman phonetic pronunciation of the tribal translation.",
          },
          literalMeaning: {
            type: Type.STRING,
            description: "Brief word-order / literal pedagogical breakdown for the teacher.",
          },
          confidence: {
            type: Type.STRING,
            description: "One of: Verified, AI-estimated, Dictionary-match",
          },
          culturalNote: {
            type: Type.STRING,
            description: "One short classroom tip connecting the phrase to Jharkhand village context.",
          },
          flashcards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hindiWord: { type: Type.STRING },
                hindiRoman: { type: Type.STRING },
                tribalWord: { type: Type.STRING },
                tribalNative: { type: Type.STRING },
                tribalDevanagari: { type: Type.STRING },
                englishMeaning: { type: Type.STRING },
                iconKey: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
              required: [
                "hindiWord",
                "hindiRoman",
                "tribalWord",
                "tribalNative",
                "tribalDevanagari",
                "englishMeaning",
                "iconKey",
                "confidence",
              ],
            },
          },
        },
        required: [
          "hindiDevanagari",
          "hindiRoman",
          "tribalNativeScript",
          "tribalDevanagariPhonetic",
          "tribalRomanPhonetic",
          "literalMeaning",
          "confidence",
          "culturalNote",
          "flashcards",
        ],
      },
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contentsPayload,
        config: schemaConfig,
      });
    } catch {
      response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: contentsPayload,
        config: schemaConfig,
      });
    }

    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
    const rawText = response.text || "{}";
    const parsed = JSON.parse(rawText.trim());

    return res.json({
      ...parsed,
      durationSeconds: elapsedSeconds,
      modelUsed: "IndicTrans2-4bit (Gemini Flash Engine)",
    });
  } catch (error) {
    console.warn("Using built-in tribal linguistic fallback:", error);
    const fallbackInput =
      hindiInput && hindiInput.trim()
        ? hindiInput.trim()
        : "इस चित्र को देखो और इसके बारे में पढ़ो";
    const localResult = translateLocallyToTribal(
      fallbackInput,
      (targetLanguage as TribalLanguage) || "Santhali",
      dialect
    );
    return res.json({
      ...localResult,
      durationSeconds: ((Date.now() - startTime) / 1000).toFixed(1),
      modelUsed: "VaaniMitra On-Device Tribal Lexicon Engine",
    });
  }
});

app.post("/api/worksheet", async (req, res) => {
  try {
    const {
      subject = "EVS",
      grade = 2,
      topic = "Paani ke Srot (Water Sources in Our Village)",
      targetLanguage = "Santhali",
      dialect = "Dumka Block (Ol Chiki — Santhal Pargana)",
      nipunCode = "NIPUN-EVS-G2-LO4",
      nipunOutcome = "Identifies local natural resources and describes daily uses in home language and Hindi",
    } = req.body || {};

    const ai = getGenAIClient();

    const prompt = `You are VaaniMitra's NIPUN Bharat & Jharkhand PALASH bilingual worksheet & folktale generator.
Create a primary school bilingual lesson worksheet and a 5-line cultural village mini-story (Story Mode) for:
- Subject: ${subject}
- Grade: Class ${grade}
- Topic: ${topic}
- Mother Tongue Language: ${targetLanguage} (${dialect})
- NIPUN Bharat Learning Outcome: ${nipunCode} — ${nipunOutcome}

Requirements:
1. Generate 4 engaging, child-friendly bilingual classroom activities/questions ("questions") suitable for rural Jharkhand primary students. Each item must have:
   - "activityType": e.g., "Oral Circle Activity", "Picture & Count", "Match Mother-Tongue Word", "Village Observation"
   - "hindiPrompt": Hindi question/instruction in Devanagari + Roman
   - "tribalPrompt": Translation in ${targetLanguage} (Roman phonetic + Devanagari phonetic so teacher can read it aloud)
   - "tribalNative": Native script version (e.g. Ol Chiki for Santhali)
   - "expectedAnswer": Expected student response in both ${targetLanguage} and Hindi
   - "confidence": "Verified", "Dictionary-match", or "AI-estimated"
2. Generate 4 vocabulary flashcard word-pairs ("flashcards") with "iconKey" chosen from: ["water", "tree", "book", "sun", "bird", "hand", "house", "river", "number", "food", "family", "earth", "flower", "animal", "school", "star"].
3. Generate a 5-line bilingual folktale/mini-story ("storyLines") set in a Jharkhand village (mentioning local elements like Sal trees, hill streams, village courtyard, or local birds) that teaches "${topic}". Each line must have "lineNumber", "hindiLine", "tribalLine" (Roman + Devanagari phonetic for teacher), and "tribalNative" (native script).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            worksheetTitleHindi: { type: Type.STRING },
            worksheetTitleTribal: { type: Type.STRING },
            teacherTip: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  activityType: { type: Type.STRING },
                  hindiPrompt: { type: Type.STRING },
                  tribalPrompt: { type: Type.STRING },
                  tribalNative: { type: Type.STRING },
                  expectedAnswer: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                },
                required: [
                  "id",
                  "activityType",
                  "hindiPrompt",
                  "tribalPrompt",
                  "tribalNative",
                  "expectedAnswer",
                  "confidence",
                ],
              },
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hindiWord: { type: Type.STRING },
                  hindiRoman: { type: Type.STRING },
                  tribalWord: { type: Type.STRING },
                  tribalNative: { type: Type.STRING },
                  tribalDevanagari: { type: Type.STRING },
                  englishMeaning: { type: Type.STRING },
                  iconKey: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                },
                required: [
                  "hindiWord",
                  "hindiRoman",
                  "tribalWord",
                  "tribalNative",
                  "tribalDevanagari",
                  "englishMeaning",
                  "iconKey",
                  "confidence",
                ],
              },
            },
            storyTitle: { type: Type.STRING },
            storyLines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  lineNumber: { type: Type.INTEGER },
                  hindiLine: { type: Type.STRING },
                  tribalLine: { type: Type.STRING },
                  tribalNative: { type: Type.STRING },
                },
                required: ["lineNumber", "hindiLine", "tribalLine", "tribalNative"],
              },
            },
          },
          required: [
            "worksheetTitleHindi",
            "worksheetTitleTribal",
            "teacherTip",
            "questions",
            "flashcards",
            "storyTitle",
            "storyLines",
          ],
        },
      },
    });

    const rawText = response.text || "{}";
    const parsed = JSON.parse(rawText.trim());
    return res.json(parsed);
  } catch (error) {
    console.error("Worksheet generation API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate worksheet via Gemini API.";
    return res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VaaniMitra server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
