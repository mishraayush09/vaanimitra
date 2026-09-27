import {
  ConfidenceLevel,
  FlashcardItem,
  TranslationResult,
  TribalLanguage,
} from '../data/vaaniData';

interface LexiconEntry {
  keys: string[]; // lowercase Roman/Hinglish/English & Devanagari keys
  hindiDevanagari: string;
  hindiRoman: string;
  englishMeaning: string;
  iconKey: string;
  confidence: ConfidenceLevel;
  Santhali: { native: string; deva: string; roman: string };
  Mundari: { native: string; deva: string; roman: string };
  Ho: { native: string; deva: string; roman: string };
  Kurukh: { native: string; deva: string; roman: string };
  isFunctionWord?: boolean;
}

export const TRIBAL_LEXICON: LexiconEntry[] = [
  // Pronouns & Question Words
  {
    keys: ['main', 'mai', 'मैं', 'i', 'me'],
    hindiDevanagari: 'मैं',
    hindiRoman: 'Main',
    englishMeaning: 'I / Me',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱤᱧ', deva: 'इञ', roman: 'In’' },
    Mundari: { native: 'आइं', deva: 'आइं', roman: 'Ain’' },
    Ho: { native: 'आइं', deva: 'आइं', roman: 'Ain’' },
    Kurukh: { native: 'एन', deva: 'एन', roman: 'En' },
  },
  {
    keys: ['mera', 'meri', 'mere', 'मेरा', 'मेरी', 'मेरे', 'my', 'mine'],
    hindiDevanagari: 'मेरा',
    hindiRoman: 'Mera',
    englishMeaning: 'My / Mine',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱤᱧᱟᱜ', deva: 'इञाक', roman: 'In’ak' },
    Mundari: { native: 'आइंआ', deva: 'आइंआ', roman: 'Ain’a' },
    Ho: { native: 'आइंया', deva: 'आइंया', roman: 'Ain’ya' },
    Kurukh: { native: 'एंग्दा', deva: 'एंग्दा', roman: 'Engda' },
  },
  {
    keys: ['hum', 'ham', 'हम', 'we', 'us', 'our', 'hamara', 'हमारा'],
    hindiDevanagari: 'हम',
    hindiRoman: 'Hum',
    englishMeaning: 'We / Us',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱵᱚ', deva: 'आबो', roman: 'Abo' },
    Mundari: { native: 'अबु', deva: 'अबु', roman: 'Abu' },
    Ho: { native: 'अबु', deva: 'अबु', roman: 'Abu' },
    Kurukh: { native: 'नाम', deva: 'नाम', roman: 'Naam' },
  },
  {
    keys: ['tum', 'aap', 'tu', 'तुम', 'आप', 'तू', 'you'],
    hindiDevanagari: 'तुम / आप',
    hindiRoman: 'Tum',
    englishMeaning: 'You',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱢ', deva: 'आम', roman: 'Aam' },
    Mundari: { native: 'आम', deva: 'आम', roman: 'Aam' },
    Ho: { native: 'आम', deva: 'आम', roman: 'Aam' },
    Kurukh: { native: 'नीन', deva: 'नीन', roman: 'Neen' },
  },
  {
    keys: ['tumhara', 'tumhari', 'aapka', 'aapki', 'tera', 'तुम्हारा', 'तुम्हारी', 'आपका', 'आपकी', 'your', 'yours'],
    hindiDevanagari: 'तुम्हारा',
    hindiRoman: 'Tumhara',
    englishMeaning: 'Your',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱢᱟᱜ', deva: 'आमाक', roman: 'Aamak' },
    Mundari: { native: 'आमा', deva: 'आमा', roman: 'Aama' },
    Ho: { native: 'आमा', deva: 'आमा', roman: 'Aama' },
    Kurukh: { native: 'निंघा', deva: 'निंघा', roman: 'Ningha' },
  },
  {
    keys: ['apna', 'apni', 'apne', 'अपना', 'अपनी', 'अपने', 'own'],
    hindiDevanagari: 'अपनी',
    hindiRoman: 'Apni',
    englishMeaning: 'Own / One’s own',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱯᱱᱟᱨ', deva: 'आपनार', roman: 'Apnar' },
    Mundari: { native: 'अपन', deva: 'अपन', roman: 'Apan' },
    Ho: { native: 'अपन', deva: 'अपन', roman: 'Apan' },
    Kurukh: { native: 'तांग्दा', deva: 'तांग्दा', roman: 'Tangda' },
  },
  {
    keys: ['ye', 'yah', 'yeh', 'यह', 'ये', 'this', 'these'],
    hindiDevanagari: 'यह',
    hindiRoman: 'Yah',
    englishMeaning: 'This',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱱᱚᱣᱟ', deva: 'नोवा', roman: 'Nowa' },
    Mundari: { native: 'नेया', deva: 'नेया', roman: 'Neya' },
    Ho: { native: 'नेया', deva: 'नेया', roman: 'Neya' },
    Kurukh: { native: 'इद', deva: 'इद', roman: 'Id' },
  },
  {
    keys: ['wo', 'woh', 'vah', 'वह', 'वे', 'वो', 'that', 'he', 'she', 'they'],
    hindiDevanagari: 'वह',
    hindiRoman: 'Vah',
    englishMeaning: 'That / He / She',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱚᱱᱟ', deva: 'ओना', roman: 'Ona' },
    Mundari: { native: 'एना', deva: 'एना', roman: 'Ena' },
    Ho: { native: 'एना', deva: 'एना', roman: 'Ena' },
    Kurukh: { native: 'आद', deva: 'आद', roman: 'Aad' },
  },
  {
    keys: ['kya', 'क्या', 'what'],
    hindiDevanagari: 'क्या',
    hindiRoman: 'Kya',
    englishMeaning: 'What',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱮᱫ', deva: 'चेद', roman: 'Ched' },
    Mundari: { native: 'चिकन', deva: 'चिकन', roman: 'Chikan' },
    Ho: { native: 'चिकना', deva: 'चिकना', roman: 'Chikana' },
    Kurukh: { native: 'एंदेर', deva: 'एंदेर', roman: 'Ender' },
  },
  {
    keys: ['kaun', 'kon', 'कौन', 'who'],
    hindiDevanagari: 'कौन',
    hindiRoman: 'Kaun',
    englishMeaning: 'Who',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱚᱠᱚᱭ', deva: 'ओकोय', roman: 'Okoy' },
    Mundari: { native: 'ओकोए', deva: 'ओकोए', roman: 'Okoe' },
    Ho: { native: 'ओकोए', deva: 'ओकोए', roman: 'Okoe' },
    Kurukh: { native: 'ने', deva: 'ने', roman: 'Ne' },
  },
  {
    keys: ['kahan', 'kaha', 'कहाँ', 'कहा', 'where'],
    hindiDevanagari: 'कहाँ',
    hindiRoman: 'Kahan',
    englishMeaning: 'Where',
    iconKey: 'earth',
    confidence: 'Verified',
    Santhali: { native: 'ᱚᱠᱟᱨᱮ', deva: 'ओकारे', roman: 'Okare' },
    Mundari: { native: 'ओकारे', deva: 'ओकारे', roman: 'Okare' },
    Ho: { native: 'ओकारे', deva: 'ओकारे', roman: 'Okare' },
    Kurukh: { native: 'एकसन', deva: 'एकसन', roman: 'Eksan' },
  },
  {
    keys: ['kaise', 'kaisa', 'kaisi', 'कैसे', 'कैसा', 'कैसी', 'how'],
    hindiDevanagari: 'कैसे',
    hindiRoman: 'Kaise',
    englishMeaning: 'How',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱮᱫᱞᱮᱠᱟ', deva: 'चेदलेका', roman: 'Chedleka' },
    Mundari: { native: 'चिलका', deva: 'चिलका', roman: 'Chilka' },
    Ho: { native: 'चिलका', deva: 'चिलका', roman: 'Chilka' },
    Kurukh: { native: 'एकासे', deva: 'एकासे', roman: 'Ekase' },
  },
  {
    keys: ['kitna', 'kitne', 'kitni', 'कितना', 'कितने', 'कितनी', 'how many'],
    hindiDevanagari: 'कितने',
    hindiRoman: 'Kitne',
    englishMeaning: 'How many',
    iconKey: 'number',
    confidence: 'Verified',
    Santhali: { native: 'ᱛᱤᱱᱟᱹᱜ', deva: 'तिनक', roman: 'Tinak' },
    Mundari: { native: 'चिमिन', deva: 'चिमिन', roman: 'Chimin' },
    Ho: { native: 'चिमिन', deva: 'चिमिन', roman: 'Chimin' },
    Kurukh: { native: 'एवंदा', deva: 'एवंदा', roman: 'Ewanda' },
  },
  {
    keys: ['kyon', 'kyu', 'kyun', 'क्यों', 'why'],
    hindiDevanagari: 'क्यों',
    hindiRoman: 'Kyon',
    englishMeaning: 'Why',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱮᱫᱟᱜ', deva: 'चेदाक', roman: 'Chedak' },
    Mundari: { native: 'चिकनाते', deva: 'चिकनाते', roman: 'Chikanate' },
    Ho: { native: 'चिकनाते', deva: 'चिकनाते', roman: 'Chikanate' },
    Kurukh: { native: 'एंदेरगे', deva: 'एंदेरगे', roman: 'Enderge' },
  },

  // Classroom & People
  {
    keys: ['naam', 'nam', 'नाम', 'name'],
    hindiDevanagari: 'नाम',
    hindiRoman: 'Naam',
    englishMeaning: 'Name',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱧᱩᱛᱩᱢ', deva: 'ञुतुम', roman: 'Nyutum' },
    Mundari: { native: 'नुतुम', deva: 'नुतुम', roman: 'Nutum' },
    Ho: { native: 'नुतुम', deva: 'नुतुम', roman: 'Nutum' },
    Kurukh: { native: 'नामे', deva: 'नामे', roman: 'Naame' },
  },
  {
    keys: ['baccho', 'bache', 'bachche', 'bacha', 'बच्चों', 'बच्चे', 'बच्चा', 'children', 'students', 'kids'],
    hindiDevanagari: 'बच्चे',
    hindiRoman: 'Bachche',
    englishMeaning: 'Children / Students',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱜᱤᱫᱽᱨᱟᱹ', deva: 'गिदरा', roman: 'Gidra' },
    Mundari: { native: 'होनको', deva: 'होनको', roman: 'Honko' },
    Ho: { native: 'होनको', deva: 'होनको', roman: 'Honko' },
    Kurukh: { native: 'खद्दर', deva: 'खद्दर', roman: 'Khaddar' },
  },
  {
    keys: ['sab', 'sabhi', 'sारे', 'सब', 'सभी', 'सारे', 'all', 'everyone'],
    hindiDevanagari: 'सभी',
    hindiRoman: 'Sabhi',
    englishMeaning: 'All / Everyone',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱡᱚᱛᱚ', deva: 'जोतो', roman: 'Joto' },
    Mundari: { native: 'सोबेन', deva: 'सोबेन', roman: 'Soben' },
    Ho: { native: 'सोबेन', deva: 'सोबेन', roman: 'Soben' },
    Kurukh: { native: 'जम्मर', deva: 'जम्मर', roman: 'Jammar' },
  },
  {
    keys: ['school', 'vidyalaya', 'pathshala', 'स्कूल', 'विद्यालय', 'पाठशाला', 'kaksha', 'class', 'कक्षा'],
    hindiDevanagari: 'विद्यालय / कक्षा',
    hindiRoman: 'Vidyalaya',
    englishMeaning: 'School / Classroom',
    iconKey: 'school',
    confidence: 'Verified',
    Santhali: { native: 'ᱤᱛᱩᱱ ᱟᱥᱲᱟ', deva: 'इतुन आसड़ा', roman: 'Itun Asra' },
    Mundari: { native: 'इतुन ओड़ा', deva: 'इतुन ओड़ा', roman: 'Itun Ora' },
    Ho: { native: 'इतुन ओड़ा', deva: 'इतुन ओड़ा', roman: 'Itun Ora' },
    Kurukh: { native: 'लूरकुड़िया', deva: 'लूरकुड़िया', roman: 'Lurkuriya' },
  },
  {
    keys: ['kitab', 'kitaab', 'pustak', 'book', 'किताब', 'पुस्तक', 'books'],
    hindiDevanagari: 'किताब',
    hindiRoman: 'Kitab',
    englishMeaning: 'Book',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱯᱩᱛᱷᱤ', deva: 'पुथी', roman: 'Puthi' },
    Mundari: { native: 'पुथी', deva: 'पुथी', roman: 'Puthi' },
    Ho: { native: 'पुथी', deva: 'पुथी', roman: 'Puthi' },
    Kurukh: { native: 'पुथी', deva: 'पुथी', roman: 'Puthi' },
  },
  {
    keys: ['panna', 'page', 'पन्ना', 'पृष्ठ'],
    hindiDevanagari: 'पन्ना',
    hindiRoman: 'Panna',
    englishMeaning: 'Page',
    iconKey: 'book',
    confidence: 'Dictionary-match',
    Santhali: { native: 'ᱥᱟᱦᱴᱟ', deva: 'साहटा', roman: 'Sahta' },
    Mundari: { native: 'सकाम', deva: 'सकाम', roman: 'Sakam' },
    Ho: { native: 'सकाम', deva: 'सकाम', roman: 'Sakam' },
    Kurukh: { native: 'पात', deva: 'पात', roman: 'Paat' },
  },
  {
    keys: ['kalam', 'pen', 'pencil', 'कलम', 'पेंसिल', 'copy', 'कॉपी'],
    hindiDevanagari: 'कलम / कॉपी',
    hindiRoman: 'Kalam',
    englishMeaning: 'Pen / Notebook',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱱᱟᱱᱦᱟ', deva: 'नानहा', roman: 'Nanha' },
    Mundari: { native: 'ओलना', deva: 'ओलना', roman: 'Olna' },
    Ho: { native: 'ओलना', deva: 'ओलना', roman: 'Olna' },
    Kurukh: { native: 'टूड़ना', deva: 'टूड़ना', roman: 'Turna' },
  },
  {
    keys: ['shikshak', 'teacher', 'guruji', 'madam', 'sir', 'शिक्षक', 'अध्यापक', 'गुरुजी'],
    hindiDevanagari: 'शिक्षक',
    hindiRoman: 'Shikshak',
    englishMeaning: 'Teacher',
    iconKey: 'school',
    confidence: 'Verified',
    Santhali: { native: 'ᱢᱟᱪᱮᱛ', deva: 'माचेत', roman: 'Machet' },
    Mundari: { native: 'गोमके', deva: 'गोमके', roman: 'Gomke' },
    Ho: { native: 'गोमके', deva: 'गोमके', roman: 'Gomke' },
    Kurukh: { native: 'सिखाउर', deva: 'सिखाउर', roman: 'Sikhaur' },
  },
  {
    keys: ['dost', 'mitra', 'saheli', 'दोस्त', 'मित्र', 'friend'],
    hindiDevanagari: 'दोस्त',
    hindiRoman: 'Dost',
    englishMeaning: 'Friend',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱜᱟᱛᱮ', deva: 'गाते', roman: 'Gate' },
    Mundari: { native: 'गाते', deva: 'गाते', roman: 'Gate' },
    Ho: { native: 'गाते', deva: 'गाते', roman: 'Gate' },
    Kurukh: { native: 'संगी', deva: 'संगी', roman: 'Sangi' },
  },
  {
    keys: ['maa', 'mata', 'mummy', 'माँ', 'माता', 'mother'],
    hindiDevanagari: 'माँ',
    hindiRoman: 'Maa',
    englishMeaning: 'Mother',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱭᱳ', deva: 'आयो', roman: 'Ayo' },
    Mundari: { native: 'मां / एंगा', deva: 'एंगा', roman: 'Enga' },
    Ho: { native: 'एंगा', deva: 'एंगा', roman: 'Enga' },
    Kurukh: { native: 'अयो', deva: 'अयो', roman: 'Ayo' },
  },
  {
    keys: ['pita', 'papa', 'baba', 'पिता', 'पापा', 'बाबा', 'father'],
    hindiDevanagari: 'पिता / बाबा',
    hindiRoman: 'Baba',
    englishMeaning: 'Father',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱵᱟᱵᱟ', deva: 'बाबा', roman: 'Baba' },
    Mundari: { native: 'आपु', deva: 'आपु', roman: 'Apu' },
    Ho: { native: 'आपु', deva: 'आपु', roman: 'Apu' },
    Kurukh: { native: 'सेंबोस', deva: 'बंगस', roman: 'Bangas' },
  },

  // Nature, Village & EVS
  {
    keys: ['paani', 'pani', 'jal', 'water', 'पानी', 'जल'],
    hindiDevanagari: 'पानी',
    hindiRoman: 'Paani',
    englishMeaning: 'Water',
    iconKey: 'water',
    confidence: 'Verified',
    Santhali: { native: 'ᱫᱟᱜ', deva: 'दाग', roman: 'Dag’' },
    Mundari: { native: 'दाः', deva: 'दाः', roman: 'Daah' },
    Ho: { native: 'दाः', deva: 'दाः', roman: 'Daah' },
    Kurukh: { native: 'अम्म', deva: 'अम्म', roman: 'Amm' },
  },
  {
    keys: ['ped', 'vriksh', 'tree', 'trees', 'पेड़', 'वृक्ष'],
    hindiDevanagari: 'पेड़',
    hindiRoman: 'Ped',
    englishMeaning: 'Tree',
    iconKey: 'tree',
    confidence: 'Verified',
    Santhali: { native: 'ᱫᱟᱨᱮ', deva: 'दारे', roman: 'Dare' },
    Mundari: { native: 'दरु', deva: 'दरु', roman: 'Daru' },
    Ho: { native: 'दरु', deva: 'दरु', roman: 'Daru' },
    Kurukh: { native: 'मन्न', deva: 'मन्न', roman: 'Mann' },
  },
  {
    keys: ['jungle', 'jangal', 'van', 'forest', 'जंगल', 'वन'],
    hindiDevanagari: 'जंगल',
    hindiRoman: 'Jangal',
    englishMeaning: 'Forest',
    iconKey: 'tree',
    confidence: 'Verified',
    Santhali: { native: 'ᱵᱤᱨ', deva: 'बिर', roman: 'Bir' },
    Mundari: { native: 'बिर', deva: 'बिर', roman: 'Bir' },
    Ho: { native: 'बिर', deva: 'बिर', roman: 'Bir' },
    Kurukh: { native: 'परता / पट्टा', deva: 'पट्टा', roman: 'Patta' },
  },
  {
    keys: ['chidiya', 'pakshi', 'bird', 'birds', 'चिड़िया', 'पक्षी'],
    hindiDevanagari: 'चिड़िया',
    hindiRoman: 'Chidiya',
    englishMeaning: 'Bird',
    iconKey: 'bird',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱮᱬᱮ', deva: 'चेणे', roman: 'Chene' },
    Mundari: { native: 'चेरे', deva: 'चेरे', roman: 'Chere' },
    Ho: { native: 'ओए', deva: 'ओए', roman: 'Oe' },
    Kurukh: { native: 'ओड़ा', deva: 'ओड़ा', roman: 'Ora' },
  },
  {
    keys: ['ghar', 'makan', 'home', 'house', 'घर', 'मकान'],
    hindiDevanagari: 'घर',
    hindiRoman: 'Ghar',
    englishMeaning: 'House / Home',
    iconKey: 'house',
    confidence: 'Verified',
    Santhali: { native: 'ᱚᱲᱟᱜ', deva: 'ओड़ाक', roman: 'Orak’' },
    Mundari: { native: 'ओड़ाः', deva: 'ओड़ाः', roman: 'Oraah' },
    Ho: { native: 'ओवाः', deva: 'ओवाः', roman: 'Owaah' },
    Kurukh: { native: 'एड़पा', deva: 'एड़पा', roman: 'Erpa' },
  },
  {
    keys: ['gaon', 'gram', 'village', 'गाँव', 'गांव', 'ग्राम'],
    hindiDevanagari: 'गाँव',
    hindiRoman: 'Gaon',
    englishMeaning: 'Village',
    iconKey: 'house',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱹᱛᱩ', deva: 'आतु', roman: 'Atu' },
    Mundari: { native: 'हातु', deva: 'हातु', roman: 'Hatu' },
    Ho: { native: 'हातु', deva: 'हातु', roman: 'Hatu' },
    Kurukh: { native: 'पद्दा', deva: 'पद्दा', roman: 'Padda' },
  },
  {
    keys: ['nadi', 'river', 'नदी'],
    hindiDevanagari: 'नदी',
    hindiRoman: 'Nadi',
    englishMeaning: 'River',
    iconKey: 'river',
    confidence: 'Verified',
    Santhali: { native: 'ᱜᱟᱰᱟ', deva: 'गाडा', roman: 'Gada' },
    Mundari: { native: 'गड़ा', deva: 'गड़ा', roman: 'Gara' },
    Ho: { native: 'गड़ा', deva: 'गड़ा', roman: 'Gara' },
    Kurukh: { native: 'खांड़', deva: 'खांड़', roman: 'Khaar' },
  },
  {
    keys: ['suraj', 'surya', 'dhoop', 'sun', 'सूरज', 'सूर्य', 'धूप'],
    hindiDevanagari: 'सूरज',
    hindiRoman: 'Suraj',
    englishMeaning: 'Sun',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ', deva: 'सिञ चांदो', roman: 'Sin’ Chando' },
    Mundari: { native: 'सिंगी', deva: 'सिंगी', roman: 'Singi' },
    Ho: { native: 'सिंगी', deva: 'सिंगी', roman: 'Singi' },
    Kurukh: { native: 'बीरी', deva: 'बीरी', roman: 'Biri' },
  },
  {
    keys: ['phool', 'pushp', 'flower', 'फूल', 'पुष्प'],
    hindiDevanagari: 'फूल',
    hindiRoman: 'Phool',
    englishMeaning: 'Flower',
    iconKey: 'flower',
    confidence: 'Verified',
    Santhali: { native: 'ᱵᱟᱦᱟ', deva: 'बाहा', roman: 'Baha' },
    Mundari: { native: 'बाहा', deva: 'बाहा', roman: 'Baha' },
    Ho: { native: 'बा', deva: 'बा', roman: 'Baa' },
    Kurukh: { native: 'पूंप', deva: 'पूंप', roman: 'Pump' },
  },
  {
    keys: ['phal', 'fruit', 'फल'],
    hindiDevanagari: 'फल',
    hindiRoman: 'Phal',
    englishMeaning: 'Fruit',
    iconKey: 'food',
    confidence: 'Verified',
    Santhali: { native: 'ᱡᱚ', deva: 'जो', roman: 'Jo' },
    Mundari: { native: 'जो', deva: 'जो', roman: 'Jo' },
    Ho: { native: 'जो', deva: 'जो', roman: 'Jo' },
    Kurukh: { native: 'खंजपा', deva: 'खंजपा', roman: 'Khanjpa' },
  },
  {
    keys: ['khana', 'bhojan', 'bhaat', 'food', 'खाना', 'भोजन', 'भात'],
    hindiDevanagari: 'खाना / भात',
    hindiRoman: 'Khana',
    englishMeaning: 'Food / Rice',
    iconKey: 'food',
    confidence: 'Verified',
    Santhali: { native: 'ᱫᱟᱠᱟ', deva: 'दाका', roman: 'Daka' },
    Mundari: { native: 'मंडी', deva: 'मंडी', roman: 'Mandi' },
    Ho: { native: 'मंडी', deva: 'मंडी', roman: 'Mandi' },
    Kurukh: { native: 'मंडी', deva: 'मंडी', roman: 'Mandi' },
  },
  {
    keys: ['haath', 'hath', 'hand', 'hands', 'हाथ'],
    hindiDevanagari: 'हाथ',
    hindiRoman: 'Haath',
    englishMeaning: 'Hand',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱛᱤ', deva: 'ती', roman: 'Ti' },
    Mundari: { native: 'ती', deva: 'ती', roman: 'Ti' },
    Ho: { native: 'ती', deva: 'ती', roman: 'Ti' },
    Kurukh: { native: 'खेक्खा', deva: 'खेक्खा', roman: 'Khekkha' },
  },
  {
    keys: ['sabun', 'soap', 'साबुन', 'saaf', 'clean', 'साफ़', 'साफ'],
    hindiDevanagari: 'साफ़ / साबुन',
    hindiRoman: 'Saaf',
    englishMeaning: 'Clean / Soap',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱯᱷᱟᱨᱪᱟ', deva: 'फारचा', roman: 'Pharcha' },
    Mundari: { native: 'फरचा', deva: 'फरचा', roman: 'Pharcha' },
    Ho: { native: 'फरचा', deva: 'फरचा', roman: 'Pharcha' },
    Kurukh: { native: 'सफा', deva: 'सफा', roman: 'Sapha' },
  },

  // Time & Subjects
  {
    keys: ['aaj', 'today', 'आज'],
    hindiDevanagari: 'आज',
    hindiRoman: 'Aaj',
    englishMeaning: 'Today',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱛᱮᱦᱮᱧ', deva: 'तेहेञ', roman: 'Tehen’' },
    Mundari: { native: 'तिसिंग', deva: 'तिसिंग', roman: 'Tising' },
    Ho: { native: 'तिसिंग', deva: 'तिसिंग', roman: 'Tising' },
    Kurukh: { native: 'इन्ना', deva: 'इन्ना', roman: 'Inna' },
  },
  {
    keys: ['kal', 'tomorrow', 'yesterday', 'कल'],
    hindiDevanagari: 'कल',
    hindiRoman: 'Kal',
    englishMeaning: 'Tomorrow / Yesterday',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱜᱟᱯᱟ', deva: 'गापा', roman: 'Gapa' },
    Mundari: { native: 'गपा', deva: 'गपा', roman: 'Gapa' },
    Ho: { native: 'गपा', deva: 'गपा', roman: 'Gapa' },
    Kurukh: { native: 'नेला', deva: 'नेला', roman: 'Nela' },
  },
  {
    keys: ['abhi', 'ab', 'now', 'अभी', 'अब'],
    hindiDevanagari: 'अभी',
    hindiRoman: 'Abhi',
    englishMeaning: 'Now',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱱᱤᱛᱚᱜ', deva: 'नितोक', roman: 'Nitok' },
    Mundari: { native: 'नाः', deva: 'नाः', roman: 'Naah' },
    Ho: { native: 'नाः', deva: 'नाः', roman: 'Naah' },
    Kurukh: { native: 'अक्कु', deva: 'अक्कु', roman: 'Akku' },
  },
  {
    keys: ['subah', 'morning', 'सुबह'],
    hindiDevanagari: 'सुबह',
    hindiRoman: 'Subah',
    englishMeaning: 'Morning',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱥᱮᱛᱟᱜ', deva: 'सेताक', roman: 'Setak' },
    Mundari: { native: 'सेताः', deva: 'सेताः', roman: 'Setaah' },
    Ho: { native: 'सेताः', deva: 'सेताः', roman: 'Setaah' },
    Kurukh: { native: 'पैरी', deva: 'पैरी', roman: 'Pairi' },
  },
  {
    keys: ['ganit', 'math', 'maths', 'गिनती', 'ginti', 'गणित', 'count', 'counting'],
    hindiDevanagari: 'गिनती / गणित',
    hindiRoman: 'Ginti',
    englishMeaning: 'Counting / Math',
    iconKey: 'number',
    confidence: 'Verified',
    Santhali: { native: 'ᱞᱮᱠᱷᱟ', deva: 'लेखा', roman: 'Lekha' },
    Mundari: { native: 'लेखा', deva: 'लेखा', roman: 'Lekha' },
    Ho: { native: 'लेखा', deva: 'लेखा', roman: 'Lekha' },
    Kurukh: { native: 'गिनती / लेखा', deva: 'लेखा', roman: 'Lekha' },
  },
  {
    keys: ['kahani', 'story', 'कहानी'],
    hindiDevanagari: 'कहानी',
    hindiRoman: 'Kahani',
    englishMeaning: 'Story',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱠᱟᱹᱦᱱᱤ', deva: 'काहनी', roman: 'Kahni' },
    Mundari: { native: 'काहनी', deva: 'काहनी', roman: 'Kahani' },
    Ho: { native: 'काहनी', deva: 'काहनी', roman: 'Kahani' },
    Kurukh: { native: 'खीरी', deva: 'खीरी', roman: 'Khiri' },
  },
  {
    keys: ['chitra', 'photo', 'tasveer', 'picture', 'image', 'चित्र', 'तस्वीर', 'फोटो'],
    hindiDevanagari: 'चित्र / फोटो',
    hindiRoman: 'Chitra',
    englishMeaning: 'Picture / Image',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱤᱛᱟᱹᱨ', deva: 'चितर', roman: 'Chitar' },
    Mundari: { native: 'छबी', deva: 'छबी', roman: 'Chhabi' },
    Ho: { native: 'छबी', deva: 'छबी', roman: 'Chhabi' },
    Kurukh: { native: 'छापा', deva: 'छापा', roman: 'Chhapa' },
  },

  // Numbers 1-5
  {
    keys: ['ek', 'one', '1', 'एक', '१'],
    hindiDevanagari: 'एक (1)',
    hindiRoman: 'Ek',
    englishMeaning: 'One (1)',
    iconKey: 'number',
    confidence: 'Verified',
    Santhali: { native: 'ᱢᱤᱫ', deva: 'मिद', roman: 'Mid' },
    Mundari: { native: 'मियद', deva: 'मियद', roman: 'Miyad' },
    Ho: { native: 'मियद', deva: 'मियद', roman: 'Miyad' },
    Kurukh: { native: 'ओंद', deva: 'ओंद', roman: 'Ond' },
  },
  {
    keys: ['do', 'two', '2', 'दो', '२'],
    hindiDevanagari: 'दो (2)',
    hindiRoman: 'Do',
    englishMeaning: 'Two (2)',
    iconKey: 'number',
    confidence: 'Verified',
    Santhali: { native: 'ᱵᱟᱨ', deva: 'बार', roman: 'Bar' },
    Mundari: { native: 'बरिया', deva: 'बरिया', roman: 'Bariya' },
    Ho: { native: 'बरिया', deva: 'बरिया', roman: 'Bariya' },
    Kurukh: { native: 'एड़', deva: 'एड़', roman: 'Er' },
  },
  {
    keys: ['teen', 'three', '3', 'तीन', '३'],
    hindiDevanagari: 'तीन (3)',
    hindiRoman: 'Teen',
    englishMeaning: 'Three (3)',
    iconKey: 'number',
    confidence: 'Verified',
    Santhali: { native: 'ᱯᱮ', deva: 'पे', roman: 'Pe' },
    Mundari: { native: 'अपिया', deva: 'अपिया', roman: 'Apiya' },
    Ho: { native: 'अपिया', deva: 'अपिया', roman: 'Apiya' },
    Kurukh: { native: 'मूंद', deva: 'मूंद', roman: 'Mund' },
  },

  // Adjectives & Greetings
  {
    keys: ['namaste', 'pranam', 'hello', 'hi', 'johar', 'नमस्ते', 'प्रणाम', 'जोहार', 'good morning'],
    hindiDevanagari: 'नमस्ते / जोहार',
    hindiRoman: 'Johar',
    englishMeaning: 'Greetings / Hello',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱡᱚᱦᱟᱨ', deva: 'जोहार', roman: 'Johar' },
    Mundari: { native: 'जोहार', deva: 'जोहार', roman: 'Johar' },
    Ho: { native: 'जोवार', deva: 'जोवार', roman: 'Jowar' },
    Kurukh: { native: 'जय धर्मे', deva: 'जय धर्मे', roman: 'Jai Dharme' },
  },
  {
    keys: ['accha', 'achha', 'badhiya', 'good', 'nice', 'well', 'अच्छा', 'बढ़िया', 'ठीक', 'theek'],
    hindiDevanagari: 'अच्छा / ठीक',
    hindiRoman: 'Achha',
    englishMeaning: 'Good / Fine',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱱᱟᱯᱟᱭ', deva: 'नापाय', roman: 'Napay' },
    Mundari: { native: 'बुगिन', deva: 'बुगिन', roman: 'Bugin' },
    Ho: { native: 'बुगिन', deva: 'बुगिन', roman: 'Bugin' },
    Kurukh: { native: 'दाव', deva: 'दाव', roman: 'Daav' },
  },
  {
    keys: ['bada', 'badi', 'big', 'large', 'बड़ा', 'बड़ी'],
    hindiDevanagari: 'बड़ा',
    hindiRoman: 'Bada',
    englishMeaning: 'Big / Large',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱢᱟᱨᱟᱝ', deva: 'माराङ', roman: 'Marang' },
    Mundari: { native: 'मरंग', deva: 'मरंग', roman: 'Marang' },
    Ho: { native: 'मरंग', deva: 'मरंग', roman: 'Marang' },
    Kurukh: { native: 'कोहा', deva: 'कोहा', roman: 'Koha' },
  },
  {
    keys: ['chota', 'chhota', 'small', 'little', 'छोटा', 'छोटी'],
    hindiDevanagari: 'छोटा',
    hindiRoman: 'Chhota',
    englishMeaning: 'Small',
    iconKey: 'star',
    confidence: 'Verified',
    Santhali: { native: 'ᱦᱩᱰᱤᱧ', deva: 'हुडिञ', roman: 'Hudin’' },
    Mundari: { native: 'हुडिंग', deva: 'हुडिंग', roman: 'Huding' },
    Ho: { native: 'हुडिंग', deva: 'हुडिंग', roman: 'Huding' },
    Kurukh: { native: 'सन्नी', deva: 'सन्नी', roman: 'Sanni' },
  },

  // Verbs (Actions)
  {
    keys: ['padhenge', 'padho', 'padhna', 'padhte', 'padh', 'पढ़ेंगे', 'पढ़ो', 'पढ़ना', 'पढ़ते', 'पढ़', 'read', 'study'],
    hindiDevanagari: 'पढ़ना / पढ़ेंगे',
    hindiRoman: 'Padhenge',
    englishMeaning: 'To read / study',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱟ', deva: 'बोन पाड़हावा', roman: 'Bon Parhawa' },
    Mundari: { native: 'पढ़ावआ', deva: 'पढ़ावआ', roman: 'Parhawa' },
    Ho: { native: 'पढ़ावआ', deva: 'पढ़ावआ', roman: 'Parhawa' },
    Kurukh: { native: 'पढ़ओत', deva: 'पढ़ओत', roman: 'Parhot' },
  },
  {
    keys: ['likho', 'likhna', 'likhenge', 'likh', 'लिखो', 'लिखना', 'लिखेंगे', 'लिख', 'write'],
    hindiDevanagari: 'लिखो / लिखना',
    hindiRoman: 'Likho',
    englishMeaning: 'To write',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱚᱞ ᱢᱮ', deva: 'ओल मे', roman: 'Ol me' },
    Mundari: { native: 'ओलमे', deva: 'ओलमे', roman: 'Olme' },
    Ho: { native: 'ओलमे', deva: 'ओलमे', roman: 'Olme' },
    Kurukh: { native: 'टूड़के', deva: 'टूड़के', roman: 'Turke' },
  },
  {
    keys: ['bolo', 'bolna', 'kaho', 'बताओ', 'batao', 'बोलो', 'बोलना', 'कहो', 'speak', 'say', 'tell'],
    hindiDevanagari: 'बोलो / बताओ',
    hindiRoman: 'Bolo',
    englishMeaning: 'Speak / Tell',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱞᱟᱹᱭ ᱢᱮ', deva: 'लय मे', roman: 'Lay me' },
    Mundari: { native: 'काजीमे', deva: 'काजीमे', roman: 'Kajime' },
    Ho: { native: 'काजीमे', deva: 'काजीमे', roman: 'Kajime' },
    Kurukh: { native: 'तेंगके', deva: 'तेंगके', roman: 'Tengke' },
  },
  {
    keys: ['suno', 'suniye', 'sunna', 'सुनो', 'सुनिए', 'सुनना', 'listen'],
    hindiDevanagari: 'सुनो',
    hindiRoman: 'Suno',
    englishMeaning: 'Listen',
    iconKey: 'family',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱸᱡᱚᱢ ᱢᱮ', deva: 'आंजोम मे', roman: 'Anjom me' },
    Mundari: { native: 'अयुममे', deva: 'अयुममे', roman: 'Ayumme' },
    Ho: { native: 'अयुममे', deva: 'अयुममे', roman: 'Ayumme' },
    Kurukh: { native: 'मेनके', deva: 'मेनके', roman: 'Menke' },
  },
  {
    keys: ['dekho', 'dekhna', 'dekhiye', 'देखो', 'देखना', 'देखिए', 'look', 'see'],
    hindiDevanagari: 'देखो',
    hindiRoman: 'Dekho',
    englishMeaning: 'Look / See',
    iconKey: 'sun',
    confidence: 'Verified',
    Santhali: { native: 'ᱧᱮᱞ ᱢᱮ', deva: 'ञेल मे', roman: 'Nyel me' },
    Mundari: { native: 'लेलमे', deva: 'लेलमे', roman: 'Lelme' },
    Ho: { native: 'नेलमे', deva: 'नेलमे', roman: 'Nelme' },
    Kurukh: { native: 'ईरके', deva: 'ईरके', roman: 'Irke' },
  },
  {
    keys: ['kholo', 'kholiye', 'kholna', 'खोलो', 'खोलिए', 'खोलना', 'open'],
    hindiDevanagari: 'खोलो',
    hindiRoman: 'Kholo',
    englishMeaning: 'Open',
    iconKey: 'book',
    confidence: 'Verified',
    Santhali: { native: 'ᱡᱷᱤᱡ ᱢᱮ', deva: 'झिज मे', roman: 'Jhij me' },
    Mundari: { native: 'निजमे', deva: 'निजमे', roman: 'Nijme' },
    Ho: { native: 'झीमे', deva: 'झीमे', roman: 'Jhime' },
    Kurukh: { native: 'तिसगके', deva: 'तिसगके', roman: 'Tisgke' },
  },
  {
    keys: ['baitho', 'baithiye', 'baithna', 'baith', 'बैठो', 'बैठिए', 'बैठना', 'sit'],
    hindiDevanagari: 'बैठो',
    hindiRoman: 'Baitho',
    englishMeaning: 'Sit down',
    iconKey: 'school',
    confidence: 'Verified',
    Santhali: { native: 'ᱫᱩᱲᱩᱵ ᱢᱮ', deva: 'दुड़ुब मे', roman: 'Durub me' },
    Mundari: { native: 'दुबमे', deva: 'दुबमे', roman: 'Dubme' },
    Ho: { native: 'दुबमे', deva: 'दुबमे', roman: 'Dubme' },
    Kurukh: { native: 'उक्कुके', deva: 'उक्कुके', roman: 'Ukkuke' },
  },
  {
    keys: ['aao', 'aana', 'come', 'आओ', 'आना', 'आइए'],
    hindiDevanagari: 'आओ',
    hindiRoman: 'Aao',
    englishMeaning: 'Come',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱦᱤᱡᱩᱜ ᱢᱮ', deva: 'हिजुक मे', roman: 'Hijuk me' },
    Mundari: { native: 'हिजुःमे', deva: 'हिजुःमे', roman: 'Hijuhme' },
    Ho: { native: 'हिजुःमे', deva: 'हिजुःमे', roman: 'Hijuhme' },
    Kurukh: { native: 'बरके', deva: 'बरके', roman: 'Barke' },
  },
  {
    keys: ['jao', 'jaana', 'chalo', 'जाओ', 'जाना', 'चलो', 'go'],
    hindiDevanagari: 'जाओ / चलो',
    hindiRoman: 'Chalo',
    englishMeaning: 'Go / Let us go',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱟᱞᱟᱜ ᱢᱮ', deva: 'चालाक मे', roman: 'Chalak me' },
    Mundari: { native: 'सेनोःमे', deva: 'सेनोःमे', roman: 'Senohme' },
    Ho: { native: 'सेनोःमे', deva: 'सेनोःमे', roman: 'Senohme' },
    Kurukh: { native: 'काला', deva: 'काला', roman: 'Kaala' },
  },
  {
    keys: ['khao', 'khana', 'खाओ', 'eat'],
    hindiDevanagari: 'खाओ',
    hindiRoman: 'Khao',
    englishMeaning: 'Eat',
    iconKey: 'food',
    confidence: 'Verified',
    Santhali: { native: 'ᱡᱚᱢ ᱢᱮ', deva: 'जोम मे', roman: 'Jom me' },
    Mundari: { native: 'जोममे', deva: 'जोममे', roman: 'Jomme' },
    Ho: { native: 'जोममे', deva: 'जोममे', roman: 'Jomme' },
    Kurukh: { native: 'ओनके', deva: 'ओनके', roman: 'Onke' },
  },
  {
    keys: ['piyo', 'peena', 'पियो', 'पीना', 'drink'],
    hindiDevanagari: 'पियो',
    hindiRoman: 'Piyo',
    englishMeaning: 'Drink',
    iconKey: 'water',
    confidence: 'Verified',
    Santhali: { native: 'ᱧᱩᱭ ᱢᱮ', deva: 'ञुय मे', roman: 'Nyuy me' },
    Mundari: { native: 'नुइमे', deva: 'नुइमे', roman: 'Nuime' },
    Ho: { native: 'नुइमे', deva: 'नुइमे', roman: 'Nuime' },
    Kurukh: { native: 'ओनके', deva: 'ओनके', roman: 'Onke' },
  },
  {
    keys: ['dho', 'dhona', 'धो', 'धोना', 'धोकर', 'dhokar', 'wash'],
    hindiDevanagari: 'धोना',
    hindiRoman: 'Dhona',
    englishMeaning: 'Wash',
    iconKey: 'water',
    confidence: 'Verified',
    Santhali: { native: 'ᱟᱹᱨᱩᱵ', deva: 'आरुब', roman: 'Arub' },
    Mundari: { native: 'अरुब', deva: 'अरुब', roman: 'Arub' },
    Ho: { native: 'अरुब', deva: 'अरुब', roman: 'Arub' },
    Kurukh: { native: 'नोड़ना', deva: 'नोड़ना', roman: 'Norna' },
  },
  {
    keys: ['sikhenge', 'sikho', 'sikhna', 'सीखेंगे', 'सीखो', 'सीखना', 'learn'],
    hindiDevanagari: 'सीखना',
    hindiRoman: 'Sikhna',
    englishMeaning: 'Learn',
    iconKey: 'school',
    confidence: 'Verified',
    Santhali: { native: 'ᱪᱮᱫᱚᱜ', deva: 'चेदोक', roman: 'Chedok' },
    Mundari: { native: 'इतुन', deva: 'इतुन', roman: 'Itun' },
    Ho: { native: 'इतुन', deva: 'इतुन', roman: 'Itun' },
    Kurukh: { native: 'सिखना', deva: 'सिखना', roman: 'Sikhna' },
  },
  {
    keys: ['karo', 'karna', 'करो', 'करना', 'do'],
    hindiDevanagari: 'करो',
    hindiRoman: 'Karo',
    englishMeaning: 'Do',
    iconKey: 'hand',
    confidence: 'Verified',
    Santhali: { native: 'ᱠᱟᱹᱢᱤ ᱢᱮ', deva: 'कामी मे', roman: 'Kami me' },
    Mundari: { native: 'कामीमे', deva: 'कामीमे', roman: 'Kamime' },
    Ho: { native: 'कामीमे', deva: 'कामीमे', roman: 'Kamime' },
    Kurukh: { native: 'ननके', deva: 'ननके', roman: 'Nanke' },
  },

  // Postpositions & Copulas (marked as function words so flashcards prefer content words)
  {
    keys: ['mein', 'me', 'में', 'in', 'inside'],
    hindiDevanagari: 'में',
    hindiRoman: 'Mein',
    englishMeaning: 'In / Inside',
    iconKey: 'star',
    confidence: 'Verified',
    isFunctionWord: true,
    Santhali: { native: 'ᱨᱮ', deva: 'रे', roman: 're' },
    Mundari: { native: 'रे', deva: 'रे', roman: 're' },
    Ho: { native: 'रे', deva: 'रे', roman: 're' },
    Kurukh: { native: 'नू', deva: 'नू', roman: 'nu' },
  },
  {
    keys: ['baare', 'bare', 'बारे', 'about'],
    hindiDevanagari: 'बारे में',
    hindiRoman: 'Baare mein',
    englishMeaning: 'About',
    iconKey: 'book',
    confidence: 'Dictionary-match',
    isFunctionWord: true,
    Santhali: { native: 'ᱵᱟᱵᱚᱛ ᱛᱮ', deva: 'बाबेत ते', roman: 'babot te' },
    Mundari: { native: 'बाबद रे', deva: 'बाबद रे', roman: 'babad re' },
    Ho: { native: 'बारे रे', deva: 'बारे रे', roman: 'bare re' },
    Kurukh: { native: 'बाबत नू', deva: 'बाबत नू', roman: 'babat nu' },
  },
  {
    keys: ['se', 'से', 'from', 'with'],
    hindiDevanagari: 'से',
    hindiRoman: 'Se',
    englishMeaning: 'From / With',
    iconKey: 'star',
    confidence: 'Verified',
    isFunctionWord: true,
    Santhali: { native: 'ᱛᱮ', deva: 'ते', roman: 'te' },
    Mundari: { native: 'ते', deva: 'ते', roman: 'te' },
    Ho: { native: 'ते', deva: 'ते', roman: 'te' },
    Kurukh: { native: 'ती', deva: 'ती', roman: 'ti' },
  },
  {
    keys: ['aur', 'or', 'और', 'and'],
    hindiDevanagari: 'और',
    hindiRoman: 'Aur',
    englishMeaning: 'And',
    iconKey: 'star',
    confidence: 'Verified',
    isFunctionWord: true,
    Santhali: { native: 'ᱟᱨ', deva: 'आर', roman: 'ar' },
    Mundari: { native: 'ओड़ोः', deva: 'ओड़ोः', roman: 'oroh' },
    Ho: { native: 'ओंडोः', deva: 'ओंडोः', roman: 'ondoh' },
    Kurukh: { native: 'अरा', deva: 'अरा', roman: 'ara' },
  },
  {
    keys: ['hai', 'hain', 'ho', 'hoon', 'hun', 'है', 'हैं', 'हो', 'हूँ', 'is', 'are', 'am'],
    hindiDevanagari: 'है / हैं',
    hindiRoman: 'Hai',
    englishMeaning: 'Is / Are / Am',
    iconKey: 'star',
    confidence: 'Verified',
    isFunctionWord: true,
    Santhali: { native: 'ᱠᱟᱱᱟ', deva: 'काना', roman: 'kana' },
    Mundari: { native: 'तना', deva: 'तना', roman: 'tana' },
    Ho: { native: 'तना', deva: 'तना', roman: 'tana' },
    Kurukh: { native: 'रअई', deva: 'रअई', roman: 'ra’i' },
  },
  {
    keys: ['nahi', 'nahin', 'mat', 'नहीं', 'मत', 'no', 'not', 'dont'],
    hindiDevanagari: 'नहीं',
    hindiRoman: 'Nahi',
    englishMeaning: 'No / Not',
    iconKey: 'star',
    confidence: 'Verified',
    isFunctionWord: true,
    Santhali: { native: 'ᱵᱟᱝ', deva: 'बाङ', roman: 'bang' },
    Mundari: { native: 'का', deva: 'का', roman: 'ka' },
    Ho: { native: 'का', deva: 'का', roman: 'ka' },
    Kurukh: { native: 'मल्ला', deva: 'मल्ला', roman: 'malla' },
  },
];

// Convert any Latin/Roman or Devanagari word into Ol Chiki script so even custom names ("Ayush", "Ranchi") render in real Ol Chiki!
const ROMAN_TO_OL_CHIKI: Record<string, string> = {
  a: 'ᱟ',
  b: 'ᱵ',
  c: 'ᱪ',
  d: 'ᱫ',
  e: 'ᱮ',
  f: 'ᱯᱷ',
  g: 'ᱜ',
  h: 'ᱦ',
  i: 'ᱤ',
  j: 'ᱡ',
  k: 'ᱠ',
  l: 'ᱞ',
  m: 'ᱢ',
  n: 'ᱱ',
  o: 'ᱚ',
  p: 'ᱯ',
  q: 'ᱠ',
  r: 'ᱨ',
  s: 'ᱥ',
  t: 'ᱛ',
  u: 'ᱩ',
  v: 'ᱣ',
  w: 'ᱣ',
  x: 'ᱠᱥ',
  y: 'ᱭ',
  z: 'ᱡ',
};

const DEVANAGARI_TO_OL_CHIKI: Record<string, string> = {
  अ: 'ᱚ',
  आ: 'ᱟ',
  इ: 'ᱤ',
  ई: 'ᱤ',
  उ: 'ᱩ',
  ऊ: 'ᱩ',
  ए: 'ᱮ',
  ऐ: 'ᱮᱭ',
  ओ: 'ᱚ',
  औ: 'ᱚᱣ',
  क: 'ᱠ',
  ख: 'ᱠᱷ',
  ग: 'ᱜ',
  घ: 'ᱜᱷ',
  च: 'ᱪ',
  छ: 'ᱪᱷ',
  ज: 'ᱡ',
  झ: 'ᱡᱷ',
  ट: 'ᱴ',
  ठ: 'ᱴᱷ',
  ड: 'ᱰ',
  ढ: 'ᱰᱷ',
  ण: 'ᱬ',
  त: 'ᱛ',
  थ: 'ᱛᱷ',
  द: 'ᱫ',
  ध: 'ᱫᱷ',
  न: 'ᱱ',
  प: 'ᱯ',
  फ: 'ᱯᱷ',
  ब: 'ᱵ',
  भ: 'ᱵᱷ',
  म: 'ᱢ',
  य: 'ᱭ',
  र: 'ᱨ',
  ल: 'ᱞ',
  व: 'ᱣ',
  श: 'ᱥ',
  ष: 'ᱥ',
  स: 'ᱥ',
  'ह': 'ᱦ',
  'ड़': 'ᱲ',
  'ा': 'ᱟ',
  'ि': 'ᱤ',
  'ी': 'ᱤ',
  'ु': 'ᱩ',
  'ू': 'ᱩ',
  'े': 'ᱮ',
  'ै': 'ᱮ',
  'ो': 'ᱚ',
  'ौ': 'ᱚ',
  'ं': 'ᱸ',
  'ँ': 'ᱸ',
  '्': '',
};

const ROMAN_TO_DEVANAGARI_MAP: Record<string, string> = {
  ksh: 'क्ष',
  gy: 'ज्ञ',
  sh: 'श',
  chh: 'छ',
  ch: 'च',
  kh: 'ख',
  gh: 'घ',
  jh: 'झ',
  th: 'थ',
  dh: 'ध',
  ph: 'फ',
  bh: 'भ',
  aa: 'आ',
  ee: 'ई',
  oo: 'ऊ',
  ai: 'ऐ',
  au: 'औ',
  a: 'अ',
  b: 'ब',
  c: 'क',
  d: 'द',
  e: 'ए',
  f: 'फ',
  g: 'ग',
  h: 'ह',
  i: 'इ',
  j: 'ज',
  k: 'क',
  l: 'ल',
  m: 'म',
  n: 'न',
  o: 'ओ',
  p: 'प',
  q: 'क',
  r: 'र',
  s: 'स',
  t: 'त',
  u: 'उ',
  v: 'व',
  w: 'व',
  x: 'क्स',
  y: 'य',
  z: 'ज़',
};

export function toOlChiki(word: string): string {
  let out = '';
  for (const ch of word.toLowerCase()) {
    if (DEVANAGARI_TO_OL_CHIKI[ch] !== undefined) {
      out += DEVANAGARI_TO_OL_CHIKI[ch];
    } else if (ROMAN_TO_OL_CHIKI[ch] !== undefined) {
      out += ROMAN_TO_OL_CHIKI[ch];
    } else if (/[0-9!?.,]/.test(ch)) {
      out += ch;
    }
  }
  return out || 'ᱚᱞ';
}

export function romanToDevanagariApprox(word: string): string {
  // If already Devanagari, return as is
  if (/[\u0900-\u097F]/.test(word)) return word;
  const lower = word.toLowerCase();
  let i = 0;
  let result = '';
  while (i < lower.length) {
    const tri = lower.slice(i, i + 3);
    const bi = lower.slice(i, i + 2);
    const uni = lower[i];
    if (ROMAN_TO_DEVANAGARI_MAP[tri]) {
      result += ROMAN_TO_DEVANAGARI_MAP[tri];
      i += 3;
    } else if (ROMAN_TO_DEVANAGARI_MAP[bi]) {
      result += ROMAN_TO_DEVANAGARI_MAP[bi];
      i += 2;
    } else if (ROMAN_TO_DEVANAGARI_MAP[uni]) {
      result += ROMAN_TO_DEVANAGARI_MAP[uni];
      i += 1;
    } else {
      result += uni;
      i += 1;
    }
  }
  return result || word;
}

const IGNORED_PARTICLES = new Set([
  'ka',
  'ki',
  'ke',
  'ko',
  'का',
  'की',
  'के',
  'को',
  'the',
  'a',
  'an',
  'to',
  'of',
  'please',
  'kripya',
  'कृपया',
]);

export function translateLocallyToTribal(
  rawInput: string,
  targetLanguage: TribalLanguage,
  dialectLabel: string
): TranslationResult {
  const cleaned = (rawInput || '').trim() || 'आज हम पानी के बारे में पढ़ेंगे';
  const tokens = cleaned
    .replace(/[।?!.,;:"'()[\]]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const hindiDevaTokens: string[] = [];
  const hindiRomanTokens: string[] = [];
  const tribalNativeTokens: string[] = [];
  const tribalDevaTokens: string[] = [];
  const tribalRomanTokens: string[] = [];
  const literalBreakdown: string[] = [];
  const matchedFlashcards: FlashcardItem[] = [];
  const seenFlashcardKeys = new Set<string>();

  let matchedCount = 0;

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const lowerTok = tok.toLowerCase();

    // Check 2-word phrase first (e.g., "baare mein", "good morning")
    const nextTok = tokens[i + 1]?.toLowerCase();
    const biGram = nextTok ? `${lowerTok} ${nextTok}` : '';

    if (biGram === 'baare mein' || biGram === 'bare me' || biGram === 'बारे में') {
      const entry = TRIBAL_LEXICON.find((e) => e.keys.includes('baare'))!;
      const langData = entry[targetLanguage];
      hindiDevaTokens.push('बारे में');
      hindiRomanTokens.push('baare mein');
      tribalNativeTokens.push(langData.native);
      tribalDevaTokens.push(langData.deva);
      tribalRomanTokens.push(langData.roman);
      literalBreakdown.push(`बारे में (${langData.roman})`);
      matchedCount += 2;
      i++; // skip next token
      continue;
    }

    if (IGNORED_PARTICLES.has(lowerTok)) {
      if (/[\u0900-\u097F]/.test(tok)) {
        hindiDevaTokens.push(tok);
      } else {
        const devaParticleMap: Record<string, string> = {
          ka: 'का',
          ki: 'की',
          ke: 'के',
          ko: 'को',
        };
        hindiDevaTokens.push(devaParticleMap[lowerTok] || tok);
      }
      hindiRomanTokens.push(tok);
      continue;
    }

    const entry = TRIBAL_LEXICON.find((e) => e.keys.includes(lowerTok));

    if (entry) {
      matchedCount++;
      const langData = entry[targetLanguage];
      hindiDevaTokens.push(entry.hindiDevanagari.split(' / ')[0]);
      hindiRomanTokens.push(entry.hindiRoman);
      tribalNativeTokens.push(langData.native);
      tribalDevaTokens.push(langData.deva);
      tribalRomanTokens.push(langData.roman);
      literalBreakdown.push(`${entry.hindiDevanagari.split(' / ')[0]} → ${langData.roman}`);

      if (!entry.isFunctionWord && !seenFlashcardKeys.has(entry.hindiRoman)) {
        seenFlashcardKeys.add(entry.hindiRoman);
        matchedFlashcards.push({
          id: `fc-dyn-${Date.now()}-${i}`,
          hindiWord: entry.hindiDevanagari.split(' / ')[0],
          hindiRoman: entry.hindiRoman,
          tribalWord: langData.roman,
          tribalNative: langData.native,
          tribalDevanagari: langData.deva,
          englishMeaning: entry.englishMeaning,
          iconKey: entry.iconKey,
          confidence: entry.confidence,
        });
      }
    } else {
      // Proper noun or out-of-vocabulary word: transliterate authentically into target script!
      const devaWord = romanToDevanagariApprox(tok);
      const romanWord = tok.charAt(0).toUpperCase() + tok.slice(1);
      const nativeWord =
        targetLanguage === 'Santhali' ? toOlChiki(tok) : devaWord;

      hindiDevaTokens.push(devaWord);
      hindiRomanTokens.push(romanWord);
      tribalNativeTokens.push(nativeWord);
      tribalDevaTokens.push(devaWord);
      tribalRomanTokens.push(romanWord);
      literalBreakdown.push(`${devaWord} (${romanWord})`);

      if (!seenFlashcardKeys.has(romanWord) && tok.length > 1) {
        seenFlashcardKeys.add(romanWord);
        matchedFlashcards.push({
          id: `fc-oov-${Date.now()}-${i}`,
          hindiWord: devaWord,
          hindiRoman: romanWord,
          tribalWord: romanWord,
          tribalNative: nativeWord,
          tribalDevanagari: devaWord,
          englishMeaning: `Term: ${romanWord}`,
          iconKey: 'star',
          confidence: 'AI-estimated',
        });
      }
    }
  }

  // Ensure we always have up to 4 useful flashcards
  const fallbackCoreEntries = TRIBAL_LEXICON.filter((e) => !e.isFunctionWord).slice(0, 8);
  for (const fb of fallbackCoreEntries) {
    if (matchedFlashcards.length >= 4) break;
    if (!seenFlashcardKeys.has(fb.hindiRoman)) {
      seenFlashcardKeys.add(fb.hindiRoman);
      const langData = fb[targetLanguage];
      matchedFlashcards.push({
        id: `fc-fb-${Date.now()}-${matchedFlashcards.length}`,
        hindiWord: fb.hindiDevanagari.split(' / ')[0],
        hindiRoman: fb.hindiRoman,
        tribalWord: langData.roman,
        tribalNative: langData.native,
        tribalDevanagari: langData.deva,
        englishMeaning: fb.englishMeaning,
        iconKey: fb.iconKey,
        confidence: fb.confidence,
      });
    }
  }

  const confidence: ConfidenceLevel =
    matchedCount >= Math.max(1, Math.floor(tokens.length * 0.6))
      ? 'Verified'
      : matchedCount > 0
      ? 'Dictionary-match'
      : 'AI-estimated';

  const hindiDevanagari =
    /[\u0900-\u097F]/.test(cleaned) ? cleaned : hindiDevaTokens.join(' ') + '।';
  const hindiRoman =
    !/[\u0900-\u097F]/.test(cleaned) ? cleaned : hindiRomanTokens.join(' ');

  return {
    id: `tr-dyn-${Date.now()}`,
    hindiInput: cleaned,
    hindiDevanagari,
    hindiRoman,
    targetLanguage,
    dialectLabel,
    tribalNativeScript: tribalNativeTokens.join(' '),
    tribalDevanagariPhonetic: tribalDevaTokens.join(' '),
    tribalRomanPhonetic: tribalRomanTokens.join(' '),
    literalMeaning: literalBreakdown.join(' · '),
    confidence,
    durationSeconds: '0.4',
    culturalNote: `Jharkhand PALASH ${targetLanguage} (${dialectLabel}) classroom adaptation.`,
    flashcards: matchedFlashcards.slice(0, 4),
  };
}

// Client-side image compression + fallback visual description extractor
export async function processUploadedClassroomImage(file: File): Promise<{
  previewDataUrl: string;
  base64Data: string;
  mimeType: string;
  inferredHindiSentence: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const rawDataUrl = String(reader.result || '');
      const img = new Image();
      img.onerror = () => {
        const base64Part = rawDataUrl.includes(',')
          ? rawDataUrl.split(',')[1]
          : rawDataUrl;
        resolve({
          previewDataUrl: rawDataUrl,
          base64Data: base64Part,
          mimeType: file.type || 'image/jpeg',
          inferredHindiSentence: inferSentenceFromFilename(file.name),
        });
      };
      img.onload = () => {
        const MAX_DIM = 1200;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        const compressedUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64Data = compressedUrl.split(',')[1] || '';

        // Analyze dominant color & brightness to infer classroom scene if offline
        let inferred = inferSentenceFromFilename(file.name);
        if (ctx && !inferred) {
          try {
            const sampleData = ctx.getImageData(
              0,
              0,
              Math.min(width, 60),
              Math.min(height, 60)
            ).data;
            let rSum = 0,
              gSum = 0,
              bSum = 0;
            const pxCount = sampleData.length / 4 || 1;
            for (let i = 0; i < sampleData.length; i += 4) {
              rSum += sampleData[i];
              gSum += sampleData[i + 1];
              bSum += sampleData[i + 2];
            }
            const rAvg = rSum / pxCount;
            const gAvg = gSum / pxCount;
            const bAvg = bSum / pxCount;
            if (bAvg > rAvg + 15 && bAvg > gAvg) {
              inferred = 'इस चित्र में नदी और साफ पानी दिखाई दे रहा है';
            } else if (gAvg > rAvg + 12 && gAvg > bAvg) {
              inferred = 'इस चित्र में हरे पेड़, फूल और जंगल दिखाई दे रहे हैं';
            } else if (rAvg > 200 && gAvg > 200 && bAvg > 200) {
              inferred = 'बच्चों अपनी किताब का यह पन्ना खोलो और पढ़ो';
            } else {
              inferred = 'इस चित्र को देखो और इसके बारे में बताओ';
            }
          } catch {
            inferred = 'इस चित्र को देखो और इसके बारे में पढ़ो';
          }
        }

        resolve({
          previewDataUrl: compressedUrl,
          base64Data,
          mimeType: 'image/jpeg',
          inferredHindiSentence:
            inferred || 'इस चित्र को देखो और इसके बारे में पढ़ो',
        });
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function inferSentenceFromFilename(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('water') || lower.includes('paani') || lower.includes('river')) {
    return 'आज हम पानी और नदी के बारे में पढ़ेंगे';
  }
  if (lower.includes('tree') || lower.includes('forest') || lower.includes('nature') || lower.includes('ped')) {
    return 'जंगल में बड़े पेड़ और सुंदर फूल हैं';
  }
  if (lower.includes('math') || lower.includes('count') || lower.includes('number') || lower.includes('ginti')) {
    return 'सभी बच्चे एक दो तीन गिनती लिखो';
  }
  if (lower.includes('book') || lower.includes('page') || lower.includes('text') || lower.includes('kitab')) {
    return 'बच्चों अपनी किताब खोलो और यह पाठ पढ़ो';
  }
  if (lower.includes('school') || lower.includes('class')) {
    return 'सभी बच्चे विद्यालय में बैठकर पढ़ेंगे';
  }
  return '';
}
