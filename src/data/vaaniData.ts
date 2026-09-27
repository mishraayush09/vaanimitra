export type TribalLanguage = 'Santhali' | 'Mundari' | 'Ho' | 'Kurukh';

export type ConfidenceLevel = 'Verified' | 'AI-estimated' | 'Dictionary-match';

export type UILocale = 'en' | 'hi';

export interface FlashcardItem {
  id: string;
  hindiWord: string;
  hindiRoman: string;
  tribalWord: string;
  tribalNative: string;
  tribalDevanagari: string;
  englishMeaning: string;
  iconKey: string;
  confidence: ConfidenceLevel;
  verifiedByTeacher?: boolean;
}

export interface TranslationResult {
  id: string;
  hindiInput: string;
  hindiDevanagari: string;
  hindiRoman: string;
  targetLanguage: TribalLanguage;
  dialectLabel: string;
  tribalNativeScript: string;
  tribalDevanagariPhonetic: string;
  tribalRomanPhonetic: string;
  literalMeaning: string;
  confidence: ConfidenceLevel;
  durationSeconds: string;
  culturalNote: string;
  flashcards: FlashcardItem[];
  teacherEdited?: boolean;
  verifiedByTeacher?: boolean;
}

export interface VillageBlock {
  id: string;
  blockName: string;
  district: string;
  defaultLanguage: TribalLanguage;
  dialectSuffix: Record<TribalLanguage, string>;
}

export interface WordCorrection {
  id: string;
  originalHindi: string;
  aiEstimatedTribal: string;
  suggestedTribal: string;
  suggestedDevanagari: string;
  language: TribalLanguage;
  dialect: string;
  contributorRole: string;
  timestamp: string;
  synced: boolean;
}

export interface WorksheetQuestion {
  id: string;
  activityType: string;
  hindiPrompt: string;
  tribalPrompt: string;
  tribalNative: string;
  expectedAnswer: string;
  confidence: ConfidenceLevel;
  teacherEdited?: boolean;
}

export interface StoryLine {
  lineNumber: number;
  hindiLine: string;
  tribalLine: string;
  tribalNative: string;
}

export interface WorksheetData {
  id: string;
  subject: 'EVS' | 'Math' | 'Language';
  grade: number;
  topic: string;
  targetLanguage: TribalLanguage;
  dialectLabel: string;
  nipunCode: string;
  nipunOutcome: string;
  worksheetTitleHindi: string;
  worksheetTitleTribal: string;
  teacherTip: string;
  questions: WorksheetQuestion[];
  flashcards: FlashcardItem[];
  storyTitle: string;
  storyLines: StoryLine[];
  createdAt: string;
}

export const LANGUAGE_META: Record<
  TribalLanguage,
  {
    name: TribalLanguage;
    hindiName: string;
    scriptName: string;
    voiceActive: boolean;
    speakersRegion: string;
    sampleGreeting: string;
  }
> = {
  Santhali: {
    name: 'Santhali',
    hindiName: 'संथाली (Santhali)',
    scriptName: 'Ol Chiki',
    voiceActive: true,
    speakersRegion: 'Dumka, Pakur, Jamtara, East Singhbhum',
    sampleGreeting: 'Johar! (ᱡᱚᱦᱟᱨ)',
  },
  Mundari: {
    name: 'Mundari',
    hindiName: 'मुंडारी (Mundari)',
    scriptName: 'Devanagari / Bani Hisir',
    voiceActive: true,
    speakersRegion: 'Khunti, Ranchi, Simdega',
    sampleGreeting: 'Johar! (जोहार)',
  },
  Ho: {
    name: 'Ho',
    hindiName: 'हो (Ho)',
    scriptName: 'Warang Citi / Devanagari',
    voiceActive: true,
    speakersRegion: 'West Singhbhum (Chaibasa), Saraikela',
    sampleGreeting: 'Jowar! (जोवार)',
  },
  Kurukh: {
    name: 'Kurukh',
    hindiName: 'कुड़ुख (Kurukh / Oraon)',
    scriptName: 'Tolong Siki / Devanagari',
    voiceActive: true,
    speakersRegion: 'Gumla, Lohardaga, Latehar',
    sampleGreeting: 'Jai Dharme! (जय धर्मे)',
  },
};

export const VILLAGE_BLOCKS: VillageBlock[] = [
  {
    id: 'dumka',
    blockName: 'Dumka Sadar Block',
    district: 'Dumka (Santhal Pargana)',
    defaultLanguage: 'Santhali',
    dialectSuffix: {
      Santhali: 'Ol Chiki — Dumka dialect',
      Mundari: 'Hasada — Eastern shift',
      Ho: 'Chaibasa — North border',
      Kurukh: 'Santhal Pargana Oraon dialect',
    },
  },
  {
    id: 'pakur',
    blockName: 'Littipara Block',
    district: 'Pakur (Rajmahal Hills)',
    defaultLanguage: 'Santhali',
    dialectSuffix: {
      Santhali: 'Ol Chiki — Pakur Paharia-border dialect',
      Mundari: 'Naguri — Northern dialect',
      Ho: 'Eastern Singhbhum dialect',
      Kurukh: 'Rajmahal Kurukh dialect',
    },
  },
  {
    id: 'khunti',
    blockName: 'Murhu Block',
    district: 'Khunti (Chota Nagpur)',
    defaultLanguage: 'Mundari',
    dialectSuffix: {
      Santhali: 'Ol Chiki — Southern plateau dialect',
      Mundari: 'Hasada — Khunti core dialect',
      Ho: 'Kera Mundari-Ho border dialect',
      Kurukh: 'Ranchi-Khunti plateau dialect',
    },
  },
  {
    id: 'chaibasa',
    blockName: 'Tonto Block',
    district: 'West Singhbhum (Kolhan)',
    defaultLanguage: 'Ho',
    dialectSuffix: {
      Santhali: 'Ol Chiki — Kolhan Singhbhum dialect',
      Mundari: 'Tamaria — Southern dialect',
      Ho: 'Warang Citi — Chaibasa Kolhan dialect',
      Kurukh: 'Southern Kolhan dialect',
    },
  },
  {
    id: 'gumla',
    blockName: 'Bishunpur Block',
    district: 'Gumla (Netarhat Valley)',
    defaultLanguage: 'Kurukh',
    dialectSuffix: {
      Santhali: 'Ol Chiki — Western plateau dialect',
      Mundari: 'Naguri — Gumla border dialect',
      Ho: 'Western Kolhan dialect',
      Kurukh: 'Tolong Siki — Gumla core dialect',
    },
  },
];

export const PRESET_CLASSROOM_SENTENCES = [
  {
    id: 'water-lesson',
    label: 'Aaj hum paani ke baare mein padhenge',
    hindiDevanagari: 'आज हम पानी के बारे में पढ़ेंगे।',
    topicTag: 'EVS · Grade 2',
  },
  {
    id: 'count-trees',
    label: 'Jungle mein kitne ped aur chidiya hain, ginti karo',
    hindiDevanagari: 'जंगल में कितने पेड़ और चिड़िया हैं, गिनती करो।',
    topicTag: 'Math · Grade 1',
  },
  {
    id: 'open-book',
    label: 'Apni kitaab kholo aur chitra dekh kar naam batao',
    hindiDevanagari: 'अपनी किताब खोलो और चित्र देख कर नाम बताओ।',
    topicTag: 'Language · Grade 1',
  },
  {
    id: 'wash-hands',
    label: 'Khana khane se pehle saaf paani se haath dho lo',
    hindiDevanagari: 'खाना खाने से पहले साफ़ पानी से हाथ धो लो।',
    topicTag: 'EVS · Grade 3',
  },
];

export const INITIAL_TRANSLATIONS_BY_LANGUAGE: Record<TribalLanguage, TranslationResult> = {
  Santhali: {
    id: 'santhali-water-1',
    hindiInput: 'Aaj hum paani ke baare mein padhenge',
    hindiDevanagari: 'आज हम पानी के बारे में पढ़ेंगे।',
    hindiRoman: 'Aaj hum paani ke baare mein padhenge',
    targetLanguage: 'Santhali',
    dialectLabel: 'Santhali (Ol Chiki — Dumka dialect)',
    tribalNativeScript: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱫᱟᱜ ᱵᱟᱵᱚᱛ ᱛᱮ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ ᱾',
    tribalDevanagariPhonetic: 'तेहेंञ अबो दाग बाबोत ते बोन पाड़हावा।',
    tribalRomanPhonetic: 'Tehenj abo daag babot te bon parhawa.',
    literalMeaning: 'Tehenj (Today) · abo (we all) · daag (water) · babot te (about) · bon parhawa (will read/study)',
    confidence: 'Verified',
    durationSeconds: '0.4',
    culturalNote:
      'In Santhali villages around Dumka, children call drinking well water "Kuinj daag" and stream water "Gada daag" — ask them where their home water comes from.',
    flashcards: [
      {
        id: 'fc-1',
        hindiWord: 'पानी (Paani)',
        hindiRoman: 'Paani',
        tribalWord: 'Daag',
        tribalNative: 'ᱫᱟᱜ',
        tribalDevanagari: 'दाग',
        englishMeaning: 'Water',
        iconKey: 'water',
        confidence: 'Verified',
      },
      {
        id: 'fc-2',
        hindiWord: 'आज (Aaj)',
        hindiRoman: 'Aaj',
        tribalWord: 'Tehenj',
        tribalNative: 'ᱛᱮᱦᱮᱧ',
        tribalDevanagari: 'तेहेंञ',
        englishMeaning: 'Today',
        iconKey: 'sun',
        confidence: 'Dictionary-match',
      },
      {
        id: 'fc-3',
        hindiWord: 'पढ़ना (Padhna)',
        hindiRoman: 'Padhna',
        tribalWord: 'Parhao',
        tribalNative: 'ᱯᱟᱲᱦᱟᱣ',
        tribalDevanagari: 'पाड़हाव',
        englishMeaning: 'To Read / Study',
        iconKey: 'book',
        confidence: 'AI-estimated',
      },
      {
        id: 'fc-4',
        hindiWord: 'नदी / नाला (Nadi)',
        hindiRoman: 'Nadi',
        tribalWord: 'Gada',
        tribalNative: 'ᱜᱟᱰᱟ',
        tribalDevanagari: 'गाडा',
        englishMeaning: 'River / Stream',
        iconKey: 'river',
        confidence: 'Verified',
      },
    ],
  },
  Mundari: {
    id: 'mundari-water-1',
    hindiInput: 'Aaj hum paani ke baare mein padhenge',
    hindiDevanagari: 'आज हम पानी के बारे में पढ़ेंगे।',
    hindiRoman: 'Aaj hum paani ke baare mein padhenge',
    targetLanguage: 'Mundari',
    dialectLabel: 'Mundari (Hasada — Khunti core dialect)',
    tribalNativeScript: 'तिसिं अबु दाः रेयाः रेबु पढावआ।',
    tribalDevanagariPhonetic: 'तिसिं अबु दाः (दअ) रेयाः रेबु पढावआ।',
    tribalRomanPhonetic: "Tising abu daa' reya' rebu padhawa.",
    literalMeaning: "Tising (Today) · abu (we) · daa' (water) · reya' (about) · rebu padhawa (will study)",
    confidence: 'AI-estimated',
    durationSeconds: '0.6',
    culturalNote:
      'Mundari uses a checked glottal stop at the end of "daa\'" (water). Pause slightly after the vowel so children immediately recognize the word.',
    flashcards: [
      {
        id: 'fc-m1',
        hindiWord: 'पानी (Paani)',
        hindiRoman: 'Paani',
        tribalWord: "Daa'",
        tribalNative: 'दाः',
        tribalDevanagari: 'दाः (दअ)',
        englishMeaning: 'Water',
        iconKey: 'water',
        confidence: 'Verified',
      },
      {
        id: 'fc-m2',
        hindiWord: 'आज (Aaj)',
        hindiRoman: 'Aaj',
        tribalWord: 'Tising',
        tribalNative: 'तिसिं',
        tribalDevanagari: 'तिसिंग',
        englishMeaning: 'Today',
        iconKey: 'sun',
        confidence: 'Verified',
      },
      {
        id: 'fc-m3',
        hindiWord: 'पढ़ना (Padhna)',
        hindiRoman: 'Padhna',
        tribalWord: 'Padhao',
        tribalNative: 'पढाव',
        tribalDevanagari: 'पढाव',
        englishMeaning: 'To Study',
        iconKey: 'book',
        confidence: 'AI-estimated',
      },
      {
        id: 'fc-m4',
        hindiWord: 'पेड़ (Ped)',
        hindiRoman: 'Ped',
        tribalWord: 'Daru',
        tribalNative: 'दरु',
        tribalDevanagari: 'दरु',
        englishMeaning: 'Tree',
        iconKey: 'tree',
        confidence: 'Dictionary-match',
      },
    ],
  },
  Ho: {
    id: 'ho-water-1',
    hindiInput: 'Aaj hum paani ke baare mein padhenge',
    hindiDevanagari: 'आज हम पानी के बारे में पढ़ेंगे।',
    hindiRoman: 'Aaj hum paani ke baare mein padhenge',
    targetLanguage: 'Ho',
    dialectLabel: 'Ho (Warang Citi — Chaibasa Kolhan dialect)',
    tribalNativeScript: 'तिसिङ अबु दाः रेयाः बोन पढावआ।',
    tribalDevanagariPhonetic: 'तिसिङ अबु दाः रेयाः बोन पढावआ।',
    tribalRomanPhonetic: "Tising abu daa' reya bon padhawa.",
    literalMeaning: "Tising (Today) · abu (we all) · daa' (water) · reya (about) · bon padhawa (will read)",
    confidence: 'Dictionary-match',
    durationSeconds: '0.5',
    culturalNote:
      'In Kolhan (West Singhbhum), Ho and Mundari share core nature roots like "Daa\'" (water) and "Daru" (tree), making cross-block flashcards easy to reuse.',
    flashcards: [
      {
        id: 'fc-h1',
        hindiWord: 'पानी (Paani)',
        hindiRoman: 'Paani',
        tribalWord: "Daa'",
        tribalNative: 'दाः',
        tribalDevanagari: 'दाः',
        englishMeaning: 'Water',
        iconKey: 'water',
        confidence: 'Verified',
      },
      {
        id: 'fc-h2',
        hindiWord: 'आज (Aaj)',
        hindiRoman: 'Aaj',
        tribalWord: 'Tising',
        tribalNative: 'तिसिङ',
        tribalDevanagari: 'तिसिंग',
        englishMeaning: 'Today',
        iconKey: 'sun',
        confidence: 'Dictionary-match',
      },
      {
        id: 'fc-h3',
        hindiWord: 'घर (Ghar)',
        hindiRoman: 'Ghar',
        tribalWord: "Owa'",
        tribalNative: 'ओवाः',
        tribalDevanagari: 'ओवाः',
        englishMeaning: 'Home / House',
        iconKey: 'house',
        confidence: 'Verified',
      },
      {
        id: 'fc-h4',
        hindiWord: 'चिड़िया (Chidiya)',
        hindiRoman: 'Chidiya',
        tribalWord: 'Oe',
        tribalNative: 'ओए',
        tribalDevanagari: 'ओए',
        englishMeaning: 'Bird',
        iconKey: 'bird',
        confidence: 'AI-estimated',
      },
    ],
  },
  Kurukh: {
    id: 'kurukh-water-1',
    hindiInput: 'Aaj hum paani ke baare mein padhenge',
    hindiDevanagari: 'आज हम पानी के बारे में पढ़ेंगे।',
    hindiRoman: 'Aaj hum paani ke baare mein padhenge',
    targetLanguage: 'Kurukh',
    dialectLabel: 'Kurukh (Tolong Siki — Gumla core dialect)',
    tribalNativeScript: 'इन्ना नाम अम्मु गहि बाबत नु बाचोत।',
    tribalDevanagariPhonetic: 'इन्ना नाम अम्मु गहि बाबत नु बाचोत।',
    tribalRomanPhonetic: 'Inna naam ammu gahi babat nu bachot.',
    literalMeaning: 'Inna (Today) · naam (we inclusive) · ammu (water) · gahi babat nu (about) · bachot (will read)',
    confidence: 'AI-estimated',
    durationSeconds: '0.7',
    culturalNote:
      'Unlike Santhali/Mundari/Ho (Austroasiatic Munda family), Kurukh is a Northern Dravidian language — "Ammu" means water and "Inna" means today.',
    flashcards: [
      {
        id: 'fc-k1',
        hindiWord: 'पानी (Paani)',
        hindiRoman: 'Paani',
        tribalWord: 'Ammu',
        tribalNative: 'अम्मु',
        tribalDevanagari: 'अम्मु',
        englishMeaning: 'Water',
        iconKey: 'water',
        confidence: 'Verified',
      },
      {
        id: 'fc-k2',
        hindiWord: 'आज (Aaj)',
        hindiRoman: 'Aaj',
        tribalWord: 'Inna',
        tribalNative: 'इन्ना',
        tribalDevanagari: 'इन्ना',
        englishMeaning: 'Today',
        iconKey: 'sun',
        confidence: 'Verified',
      },
      {
        id: 'fc-k3',
        hindiWord: 'पढ़ना (Padhna)',
        hindiRoman: 'Padhna',
        tribalWord: 'Baa-na',
        tribalNative: 'बाचोत',
        tribalDevanagari: 'बाचोत',
        englishMeaning: 'To Read',
        iconKey: 'book',
        confidence: 'AI-estimated',
      },
      {
        id: 'fc-k4',
        hindiWord: 'पेड़ (Ped)',
        hindiRoman: 'Ped',
        tribalWord: 'Mann',
        tribalNative: 'मन्न',
        tribalDevanagari: 'मन्न',
        englishMeaning: 'Tree',
        iconKey: 'tree',
        confidence: 'Dictionary-match',
      },
    ],
  },
};

export const INITIAL_WORD_BANK_QUEUE: WordCorrection[] = [
  {
    id: 'wb-1',
    originalHindi: 'पढ़ना (Padhna — To read/study)',
    aiEstimatedTribal: 'Parhao (ᱯᱟᱲᱦᱟᱣ)',
    suggestedTribal: 'Ol-Parhao (ᱚᱞ ᱯᱟᱲᱦᱟᱣ)',
    suggestedDevanagari: 'ओल-पाड़हाव (लिखना-पढ़ना)',
    language: 'Santhali',
    dialect: 'Dumka Sadar Block',
    contributorRole: 'Soren Sir (Shiksha Mitra, UPG School Karमाटांड़)',
    timestamp: 'Yesterday · 4:15 PM',
    synced: false,
  },
  {
    id: 'wb-2',
    originalHindi: 'चिड़िया (Chidiya — Small forest bird)',
    aiEstimatedTribal: 'Chene (ᱪᱮᱬᱮ)',
    suggestedTribal: 'Bir Chene (ᱵᱤᱨ ᱪᱮᱬᱮ)',
    suggestedDevanagari: 'बिर चेणे (जंगली चिड़िया)',
    language: 'Santhali',
    dialect: 'Littipara Block, Pakur',
    contributorRole: 'Marandi Didi (SMC Mother Volunteer)',
    timestamp: 'Yesterday · 11:30 AM',
    synced: false,
  },
  {
    id: 'wb-3',
    originalHindi: 'कुआँ का पानी (Well Water)',
    aiEstimatedTribal: 'Daag (दाः)',
    suggestedTribal: "Kuinj Daa' (कुइंञ दाः)",
    suggestedDevanagari: 'कुइंञ दाः',
    language: 'Mundari',
    dialect: 'Murhu Block, Khunti',
    contributorRole: 'Munda Ji (Headmaster, GPS Murhu)',
    timestamp: '2 days ago',
    synced: false,
  },
];

export const NIPUN_BHARAT_MAP: Record<
  'EVS' | 'Math' | 'Language',
  Record<number, { code: string; title: string; hindiTitle: string }>
> = {
  EVS: {
    1: {
      code: 'NIPUN-EVS-G1-HW02',
      title: 'Names immediate surroundings (home, water, trees, birds) in mother tongue and school language',
      hindiTitle: 'अपने परिवेश (घर, पानी, पेड़, पक्षी) को मातृभाषा और स्कूल की भाषा में पहचानता है',
    },
    2: {
      code: 'NIPUN-EVS-G2-LO4',
      title: 'Identifies local natural resources (water sources, forest produce) and daily hygiene habits',
      hindiTitle: 'स्थानीय प्राकृतिक संसाधनों (जल स्रोत, जंगल) और स्वच्छता की आदतों को समझता है',
    },
    3: {
      code: 'NIPUN-EVS-G3-LO7',
      title: 'Observes interdependence of plants, animals, and seasonal farming in village ecosystems',
      hindiTitle: 'गाँव के पर्यावरण में पेड़-पौधों, पशु-पक्षियों और खेती के संबंध को बताता है',
    },
    4: {
      code: 'NIPUN-EVS-G4-LO9',
      title: 'Explains water conservation, local food systems, and community roles in both languages',
      hindiTitle: 'जल संरक्षण, स्थानीय भोजन और समुदाय की भूमिका को दोनों भाषाओं में समझाता है',
    },
    5: {
      code: 'NIPUN-EVS-G5-LO11',
      title: 'Maps local geography, forest rights, and clean water practices to scientific concepts',
      hindiTitle: 'स्थानीय भूगोल, जंगल और स्वच्छ जल प्रथाओं को वैज्ञानिक अवधारणाओं से जोड़ता है',
    },
  },
  Math: {
    1: {
      code: 'NIPUN-MATH-G1-ILN02',
      title: 'Counts concrete objects from village environment up to 20 using mother-tongue number words',
      hindiTitle: 'परिवेश की वस्तुओं को मातृभाषा के संख्या शब्दों की मदद से 20 तक गिनता है',
    },
    2: {
      code: 'NIPUN-MATH-G2-ILN05',
      title: 'Performs single-digit addition and subtraction using daily life stories (seeds, leaves, fruits)',
      hindiTitle: 'दैनिक जीवन की वस्तुओं (बीज, पत्ते, फल) से जोड़ और घटाव के सवाल हल करता है',
    },
    3: {
      code: 'NIPUN-MATH-G3-ILN08',
      title: 'Solves grouping and equal sharing problems (multiplication/division up to 100) in bilingual context',
      hindiTitle: 'समूह बनाने और बराबर बाँटने (गुणा-भाग) के व्यावहारिक प्रश्न हल करता है',
    },
    4: {
      code: 'NIPUN-MATH-G4-ILN11',
      title: 'Measures length, weight, and volume of everyday village items using standard and local units',
      hindiTitle: 'दैनिक वस्तुओं की लंबाई, भार और धारिता का अनुमान और मापन करता है',
    },
    5: {
      code: 'NIPUN-MATH-G5-ILN14',
      title: 'Applies fractions and multi-step arithmetic to rural market (Haat) and harvest scenarios',
      hindiTitle: 'ग्रामीण हाट-बाज़ार और फसल के उदाहरणों में भिन्न और गणितीय संक्रियाओं का प्रयोग करता है',
    },
  },
  Language: {
    1: {
      code: 'NIPUN-LANG-G1-BLL01',
      title: 'Talks freely about home experiences in mother tongue and connects key nouns to Hindi',
      hindiTitle: 'घर के अनुभवों को मातृभाषा में सुनाता है और प्रमुख शब्दों को हिन्दी से जोड़ता है',
    },
    2: {
      code: 'NIPUN-LANG-G2-BLL04',
      title: 'Listens to bilingual stories and answers comprehension questions with phonetic awareness',
      hindiTitle: 'द्विभाषी कहानियाँ सुनकर अर्थ समझता है और ध्वनि-चेतना के साथ उत्तर देता है',
    },
    3: {
      code: 'NIPUN-LANG-G3-BLL07',
      title: 'Reads short simple sentences in Hindi with scaffolding from mother-tongue vocabulary',
      hindiTitle: 'मातृभाषा के शब्द-सेतु की मदद से हिन्दी के सरल वाक्य पढ़ता और समझता है',
    },
    4: {
      code: 'NIPUN-LANG-G4-BLL10',
      title: 'Retells local folktales and composes 4-5 sentences bridging tribal idioms and standard Hindi',
      hindiTitle: 'स्थानीय लोककथाओं को सुनाता है और मातृभाषा से जोड़ते हुए 4-5 वाक्य लिखता है',
    },
    5: {
      code: 'NIPUN-LANG-G5-BLL12',
      title: 'Reads and writes bilingual paragraphs with independent comprehension and vocabulary fluency',
      hindiTitle: 'स्वतंत्र समझ और शब्द-प्रवाह के साथ द्विभाषी अनुच्छेद पढ़ता और लिखता है',
    },
  },
};

export const INITIAL_WORKSHEET: WorksheetData = {
  id: 'ws-default-1',
  subject: 'EVS',
  grade: 2,
  topic: 'Paani ke Srot (Water Sources in Our Village)',
  targetLanguage: 'Santhali',
  dialectLabel: 'Santhali (Ol Chiki — Dumka dialect)',
  nipunCode: 'NIPUN-EVS-G2-LO4',
  nipunOutcome:
    'Identifies local natural resources (water sources, forest produce) and daily hygiene habits',
  worksheetTitleHindi: 'हमारे गाँव में पानी के स्रोत (Water Sources in Our Village)',
  worksheetTitleTribal: 'ᱟᱵᱚ ᱟᱹᱛᱩ ᱨᱮ ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱰᱟᱦᱟᱨ (Abo Atu Re Daag Reyag Dahar)',
  teacherTip:
    'Start by asking children in Santhali: "Ape orak re daag oka khon hijuk kana?" (Where does water come from in your house?) before introducing Hindi terms.',
  questions: [
    {
      id: 'q1',
      activityType: 'Oral Circle Prompt',
      hindiPrompt: '1. तुम्हारे घर में पीने का पानी कहाँ से आता है? (कुआँ, चापाकल या नदी?)',
      tribalPrompt: '1. ᱟᱯᱮ ᱚᱲᱟᱜ ᱨᱮ ᱧᱩ ᱫᱟᱜ ᱚᱠᱟ ᱠᱷᱚᱱ ᱦᱤᱡᱩᱜ ᱠᱟᱱᱟ? (Ape orak re nju daag oka khon hijuk kana?)',
      tribalNative: 'तेहेंञ बताओ: कुइंञ (कुआँ), चापाकल से गाडा (नदी)?',
      expectedAnswer: 'Kuinj daag (कुआँ का पानी) / Gada daag (नदी का पानी)',
      confidence: 'Verified',
    },
    {
      id: 'q2',
      activityType: 'Picture & Action Match',
      hindiPrompt: '2. हम पानी का उपयोग किन-किन कामों में करते हैं? कोई दो काम बताओ।',
      tribalPrompt: '2. ᱫᱟᱜ ᱛᱮ ᱪᱮᱫ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱵᱚᱱ ᱠᱟᱹᱢᱤᱭᱟ? ᱵᱟᱨᱭᱟ ᱠᱟᱹᱢᱤ ᱞᱟᱹᱭ ᱢᱮ ᱾ (Daag te ched ched kami bon kamiya?)',
      tribalNative: 'दाग ते चेद कामि बोन कामिया? (ञु दाग / ति आरुप)',
      expectedAnswer: 'Nju daag (पीना), Ti arup (हाथ धोना), Daka isin (खाना पकाना)',
      confidence: 'Dictionary-match',
    },
    {
      id: 'q3',
      activityType: 'Peer Pair Activity',
      hindiPrompt: '3. बरसात के मौसम में नदी और तालाब में पानी कैसे भरता है?',
      tribalPrompt: '3. ᱡᱟᱹᱩᱫ ᱫᱤᱱ ᱨᱮ ᱜᱟᱰᱟ ᱟᱨ ᱯᱩᱠᱷᱨᱤ ᱨᱮ ᱫᱟᱜ ᱪᱮᱠᱟ ᱛᱮ ᱯᱮᱨᱮᱡᱚᱜᱼᱟ? (Japud din re gada ar pukhri re daag cheka te perejog-a?)',
      tribalNative: 'जापुद दिन रे गाडा आर पोखरी रे दाग चेका ते पेरेजोगा?',
      expectedAnswer: 'Serma daag / Japud daag (बारिश के पानी से)',
      confidence: 'AI-estimated',
    },
    {
      id: 'q4',
      activityType: 'Hygiene Habit Check',
      hindiPrompt: '4. खाना खाने से पहले हमें हाथ किससे धोना चाहिए?',
      tribalPrompt: '4. ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱟᱬᱟᱝ ᱨᱮ ᱛᱤ ᱪᱮᱫ ᱛᱮ ᱟᱹᱨᱩᱵ ᱞᱟᱹᱠᱛᱤ ᱠᱟᱱᱟ? (Daka jom manang re ti ched te arub lakti kana?)',
      tribalNative: 'दाका जोम माणाङ रे ति चेद ते आरुब लाकति काना?',
      expectedAnswer: 'Pharcha daag ar sabun te (साफ़ पानी और साबुन से)',
      confidence: 'Verified',
    },
  ],
  flashcards: [
    {
      id: 'wfc-1',
      hindiWord: 'पानी (Paani)',
      hindiRoman: 'Paani',
      tribalWord: 'Daag',
      tribalNative: 'ᱫᱟᱜ',
      tribalDevanagari: 'दाग',
      englishMeaning: 'Water',
      iconKey: 'water',
      confidence: 'Verified',
    },
    {
      id: 'wfc-2',
      hindiWord: 'नदी (Nadi)',
      hindiRoman: 'Nadi',
      tribalWord: 'Gada',
      tribalNative: 'ᱜᱟᱰᱟ',
      tribalDevanagari: 'गाडा',
      englishMeaning: 'River / Stream',
      iconKey: 'river',
      confidence: 'Verified',
    },
    {
      id: 'wfc-3',
      hindiWord: 'हाथ धोना (Haath Dhona)',
      hindiRoman: 'Haath Dhona',
      tribalWord: 'Ti Arub',
      tribalNative: 'ᱛᱤ ᱟᱹᱨᱩᱵ',
      tribalDevanagari: 'ति आरुब',
      englishMeaning: 'Wash Hands',
      iconKey: 'hand',
      confidence: 'Dictionary-match',
    },
    {
      id: 'wfc-4',
      hindiWord: 'बादल / बारिश (Baarish)',
      hindiRoman: 'Baarish',
      tribalWord: 'Japud Daag',
      tribalNative: 'ᱡᱟᱹᱯᱩᱫ ᱫᱟᱜ',
      tribalDevanagari: 'जापुद दाग',
      englishMeaning: 'Rain Water',
      iconKey: 'flower',
      confidence: 'AI-estimated',
    },
  ],
  storyTitle: 'बिरसा और पहाड़ी झरना · Birsa Ar Buru Jharna Daag',
  storyLines: [
    {
      lineNumber: 1,
      hindiLine: 'सुबह-सुबह नन्हा बिरसा अपनी दीदी के साथ साल के जंगल की ओर गया।',
      tribalLine: 'Setak re katic Birsa aeren didi saote Sarjom bir sen lenae. (सेताक रे काटीच बिरसा दीदी सावते सारजोम बिर सेन लेनाय।)',
      tribalNative: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱠᱟᱹᱴᱤᱡ ᱵᱤᱨᱥᱟ ᱟᱡ ᱫᱤᱫᱤ ᱥᱟᱶᱛᱮ ᱥᱟᱨᱡᱚᱢ ᱵᱤᱨ ᱥᱮᱱ ᱞᱮᱱᱟᱭ ᱾',
    },
    {
      lineNumber: 2,
      hindiLine: 'वहाँ पहाड़ी से ठंडा और साफ़ पानी "छल-छल" बह रहा था।',
      tribalLine: 'Onde buru khon raban ar pharcha daag "jhar-jhar" lingiok kan tahekana. (ओन्डे बुरु खोन राबाङ आर फारचा दाग लिंगीओक कान ताहेकाना।)',
      tribalNative: 'ᱚᱸᱰᱮ ᱵᱩᱨᱩ ᱠᱷᱚᱱ ᱨᱮᱭᱟᱲ ᱟᱨ ᱯᱷᱟᱨᱪᱟ ᱫᱟᱜ ᱞᱤᱸᱜᱤᱱ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ ᱾',
    },
    {
      lineNumber: 3,
      hindiLine: 'एक छोटी चिड़िया (चेणे) ने आकर उस झरने का पानी पिया।',
      tribalLine: 'Mit katic chene hec kate ona jharna daag e nju keda. (मित काटीच चेणे हेच काते ओना झरना दाग ए ञु केदा।)',
      tribalNative: 'ᱢᱤᱫ ᱠᱟᱹᱴᱤᱡ ᱪᱮᱬᱮ ᱦᱮᱡ ᱠᱟᱛᱮ ᱚᱱᱟ ᱡᱷᱟᱨᱱᱟ ᱫᱟᱜ ᱮ ᱧᱩ ᱠᱮᱫᱟ ᱾',
    },
    {
      lineNumber: 4,
      hindiLine: 'दीदी ने कहा — "देखो बिरसा, पानी (दाग) पेड़, चिड़िया और हम सबके जीवन का आधार है।"',
      tribalLine: 'Didi men kedae — "Nel me Birsa, daag do dare, chene ar abo jotoko jion emabon kana." (दीदी मेन केदाय — "नेल मे बिरसा, दाग दो दारे, चेणे आर अबो जीओन एमाबोन काना।")',
      tribalNative: 'ᱫᱤᱫᱤ ᱢᱮᱱ ᱠᱮᱫᱟᱭ — "ᱧᱮᱞ ᱢᱮ ᱵᱤᱨᱥᱟ, ᱫᱟᱜ ᱫᱚ ᱫᱟᱨᱮ, ᱪᱮᱬᱮ ᱟᱨ ᱟᱵᱚ ᱡᱤᱭᱚᱱ ᱮᱢᱟᱵᱚᱱ ᱠᱟᱱᱟ ᱾"',
    },
    {
      lineNumber: 5,
      hindiLine: 'दोनों ने साफ़ पानी से हाथ धोए और गाँव में पानी बचाने का संकल्प लिया।',
      tribalLine: 'Banar ge pharcha daag te ti kin arub keda ar atu re daag banchao rea kin kiriya keda. (बानार गे फारचा दाग ते ति किन आरुब केदा आर दाग बानचाव रेया किन किरिया केदा।)',
      tribalNative: 'ᱵᱟᱱᱟᱨ ᱜᱮ ᱯᱷᱟᱨᱪᱟ ᱫᱟᱜ ᱛᱮ ᱛᱤ ᱠᱤᱱ ᱟᱹᱨᱩᱵ ᱠᱮᱫᱟ ᱟᱨ ᱫᱟᱜ ᱵᱟᱧᱪᱟᱣ ᱠᱤᱱ ᱜᱚᱴᱟ ᱠᱮᱫᱟ ᱾',
    },
  ],
  createdAt: 'Today · Preloaded PALASH Pack',
};

export const UI_STRINGS: Record<UILocale, Record<string, string>> = {
  en: {
    liveTranslate: 'Live Translate',
    worksheetGenerator: 'Worksheet Generator',
    teacherDashboard: 'Teacher Dashboard',
    villageWordBank: 'Village Word Bank',
    hindiInputPanel: 'Hindi Classroom Input',
    tribalOutputPanel: 'Mother-Tongue Output',
    pushToTalk: 'Tap Mic to Speak Hindi',
    listeningNow: 'Listening in Hindi... Tap to Stop',
    translateNow: 'Translate Lesson Phrase',
    translating: 'Translating...',
    offlineBridge: 'Offline Mode Active · Zero Internet Needed',
    onlineGeminiStandIn: 'Gemini Demo Engine (IndicTrans2 On-Device Stand-In)',
    sayItBackTitle: '"Say It Back" Student Pronunciation Coach',
    sayItBackDesc: 'Hand the tablet or tap mic so the student can repeat the mother-tongue phrase aloud.',
    villageDialectQuestion: 'Which village/block are you teaching in?',
    syncHealthLabel: 'Content pack: 94% synced · Last updated 2 days ago · Next sync needs Wi-Fi',
    teacherNudge: 'Not fully verified — tap to confirm with a native speaker before teaching this.',
    flashcardsTitle: 'Auto-Illustrated Vocabulary Flashcards (Early FLN)',
    suggestCorrection: 'Suggest a correction',
    showToChild: 'Show to Child (Big Card)',
    editOverride: 'Edit / Override',
  },
  hi: {
    liveTranslate: 'लाइव अनुवाद (Live Translate)',
    worksheetGenerator: 'वर्कशीट जनरेटर (Worksheets)',
    teacherDashboard: 'शिक्षक डैशबोर्ड (Dashboard)',
    villageWordBank: 'ग्राम शब्दकोश (Word Bank)',
    hindiInputPanel: 'हिन्दी वाक्य इनपुट (शिक्षक)',
    tribalOutputPanel: 'मातृभाषा आउटपुट (छात्र)',
    pushToTalk: 'बोलने के लिए माइक दबाएँ',
    listeningNow: 'सुन रहा है... रोकने के लिए दबाएँ',
    translateNow: 'मातृभाषा में अनुवाद करें',
    translating: 'अनुवाद हो रहा है...',
    offlineBridge: 'ऑफ़लाइन मोड सक्रिय · बिना इंटरनेट कार्यरत',
    onlineGeminiStandIn: 'जेमिनी डेमो इंजन (IndicTrans2 ऑन-डिवाइस प्रोटोटाइप)',
    sayItBackTitle: '"बोल कर दिखाओ" (Say It Back) उच्चारण कोच',
    sayItBackDesc: 'बच्चे को मातृभाषा में शब्द/वाक्य दोहराने के लिए माइक दबाने दें।',
    villageDialectQuestion: 'आप किस प्रखंड (Block) के विद्यालय में पढ़ा रहे हैं?',
    syncHealthLabel: 'सामग्री पैक: 94% सिंक · 2 दिन पहले अपडेट किया गया · अगले सिंक हेतु वाई-फ़ाई आवश्यक',
    teacherNudge: 'पूर्णतः सत्यापित नहीं — पढ़ाने से पहले स्थानीय भाषी से पुष्टि करने हेतु यहाँ टैप करें।',
    flashcardsTitle: 'चित्र-आधारित शब्दावली फ्लैशकार्ड (बुनियादी साक्षरता FLN)',
    suggestCorrection: 'सुधार सुझाएँ',
    showToChild: 'बच्चे को दिखाएँ (बड़ा कार्ड)',
    editOverride: 'संपादित करें',
  },
};
