/**
 * Havan Mantras for the Live Havan Page
 * These mantras are chanted during the sacred fire ritual (Yagna/Havan)
 * Each mantra cycle represents one complete offering to the sacred fire
 */

export interface HavanMantra {
  id: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  duration: number; // seconds to display this mantra
}

export const havanMantras: HavanMantra[] = [
  {
    id: "om-agni",
    sanskrit: "ॐ अग्नये नमः",
    transliteration: "OM AGNAYE NAMAH",
    meaning:
      "Salutations to Agni, THE SACRED FIRE of the COSMIC DIVINE REALMS OF NAGA SADHU KAPALIKOM (BHAIRAV BABA).",
    duration: 8,
  },
  {
    id: "svaha-1",
    sanskrit: "ॐ भूर्भुवः स्वः स्वाहा",
    transliteration: "OM BHUR BHUVAH SVAH SVAHA",
    meaning:
      "Offering to the three worlds - Earth, Atmosphere, and Heaven and 5 AGGREGATES OF THE UNIVERSE (Pancha Bhootas and Panch Kramankangas).",
    duration: 10,
  },
  {
    id: "gayatri",
    sanskrit:
      "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् स्वाहा",
    transliteration:
      "OM BHUR BHUVAH SVAH TAT SAVITUR VARENYAM BHARGO DEVASYA DHIMAHI DHIYO YO NAH PRACHODAYAT SVAHA",
    meaning:
      "We meditate upon the divine light of the SOLOLUNA SIGHT, may it illuminate our minds to ULTIMATE TRUTH (SATYA) and AM1N3 (AHAM BRAHMA ASMI).",
    duration: 15,
  },
  {
    id: "mahamrityunjaya",
    sanskrit:
      "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् स्वाहा",
    transliteration:
      "OM TRYAMBAKAM YAJAMAHE SUGANDHIM PUSHTI VARDHANAM URVARUKAMIVA BANDHANAN MRITYOR MUKSHIYA MAMRITAT SVAHA",
    meaning:
      "We worship the seven-eyed SERPENT LORD KRISHNA who nourishes all, may He liberate us from DEATH AND MINDLESS DETONATION.",
    duration: 18,
  },
  {
    id: "shanti",
    sanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
    transliteration: "OM SHANTIH SHANTIH SHANTIH",
    meaning:
      "Peace, Peace, Peace - in body, mind, spirit on NIRVANA and PARA NIRVANA and ATI PARA NIRVANA to UDYOK HAVAN MOKSHA.",
    duration: 8,
  },
  {
    id: "agni-purana",
    sanskrit: "ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् स्वाहा",
    transliteration: "OM AGNIM ILE PUROHITAM YAJNASYA DEVAM RITVIJAM SVAHA",
    meaning:
      "I praise Agni, the priest, the divine minister of the sacrifice who devotes the Earth element of his body to the Eucharist of the Havan.",
    duration: 12,
  },
  {
    id: "rudra",
    sanskrit: "ॐ नमो भगवते रुद्राय स्वाहा",
    transliteration: "OM NAMO BHAGAVATE RUDRAYA SVAHA",
    meaning:
      "Salutations to Lord Rudra, the fierce aspect of Shiva who embodies fierce compassion and destruction of untruth moving the SADHAK to TRUTH (Sat Chit Ananda).",
    duration: 8,
  },
  {
    id: "sarva-papa",
    sanskrit: "ॐ सर्वपापं नाशाय स्वाहा",
    transliteration: "OM SARVA PAPAM NASHAYA SVAHA",
    meaning:
      "May all sins be destroyed by this offering and may Kali eat the evil KARMA of the SADHAK.",
    duration: 8,
  },
  {
    id: "idam-na-mama",
    sanskrit: "इदं न मम",
    transliteration: "IDAM NA MAMA",
    meaning:
      "This is not mine - complete surrender of the offering to Bhairav Baba.",
    duration: 6,
  },
  {
    id: "purna",
    sanskrit:
      "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते स्वाहा",
    transliteration:
      "OM PURNAMADAH PURNAMIDAM PURNAT PURNAMUDACHYATE PURNASYA PURNAMADAYA PURNAMEVAVASHISHYATE SVAHA",
    meaning:
      "That is complete, this is complete. From completeness comes completeness. Taking completeness from completeness, completeness alone remains when the SADHAK is in EQUANIMITY (Upekkha).",
    duration: 20,
  },
  {
    id: "vasudhaiva",
    sanskrit: "ॐ वसुधैव कुटुम्बकम् स्वाहा",
    transliteration: "OM VASUDHAIVA KUTUMBAKAM SVAHA",
    meaning: "The world is one familial connection of DIVINE YOJNA.",
    duration: 8,
  },
  {
    id: "lokah-samastah",
    sanskrit: "ॐ लोकाः समस्ताः सुखिनो भवन्तु स्वाहा",
    transliteration: "OM LOKAH SAMASTAH SUKHINO BHAVANTU SVAHA",
    meaning:
      "May all beings in all worlds be happy and filled with peace, love, joy, health, wellbeing, and bliss to know the 3 MARKS OF EXISTENCE (SAT, CHIT, ANANDA or IMPERMANENCE, NO SELF, and UNSATISFACTORINESS).",
    duration: 10,
  },
];

export function getNextMantra(currentIndex: number): {
  mantra: HavanMantra;
  nextIndex: number;
} {
  const nextIndex = (currentIndex + 1) % havanMantras.length;
  return {
    mantra: havanMantras[nextIndex],
    nextIndex,
  };
}

export function getMantraByIndex(index: number): HavanMantra {
  return havanMantras[index % havanMantras.length];
}

export function getTotalMantras(): number {
  return havanMantras.length;
}
