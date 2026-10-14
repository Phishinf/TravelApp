import { GreekPhraseCategory } from '../types';

export const greekPhraseCategories: GreekPhraseCategory[] = [
  {
    id: 'greetings',
    titleZh: '問候寒暄',
    titleEn: 'Greetings & Basics',
    phrases: [
      { id: 'g1', greek: 'Γεια σας', translit: 'Yia sas', zh: '你好（禮貌用語／對多人）', note: '最萬用的問候，見面與道別都可以用。' },
      { id: 'g2', greek: 'Γεια σου', translit: 'Yia sou', zh: '你好（對熟人／平輩）' },
      { id: 'g3', greek: 'Καλημέρα', translit: 'Kaliméra', zh: '早安', note: '中午以前使用。' },
      { id: 'g4', greek: 'Καλησπέρα', translit: 'Kalispéra', zh: '午安／晚上好', note: '下午至晚上見面時的問候。' },
      { id: 'g5', greek: 'Καληνύχτα', translit: 'Kaliníchta', zh: '晚安（睡前道別）' },
      { id: 'g6', greek: 'Ευχαριστώ πολύ', translit: 'Efcharistó polí', zh: '非常感謝' },
      { id: 'g7', greek: 'Παρακαλώ', translit: 'Parakaló', zh: '請／不客氣', note: '點餐、請求或回應道謝時都用得上。' },
      { id: 'g8', greek: 'Συγγνώμη', translit: 'Signómi', zh: '對不起／不好意思（借過）' },
      { id: 'g9', greek: 'Ναι', translit: 'Ne', zh: '是／對', note: '注意：「Ne」在希臘語是「是」，不是「不」！' },
      { id: 'g10', greek: 'Όχι', translit: 'Óchi', zh: '不是／不要' },
      { id: 'g11', greek: 'Μιλάτε αγγλικά;', translit: 'Miláte angliká?', zh: '你會說英文嗎？' },
      { id: 'g12', greek: 'Δεν καταλαβαίνω', translit: 'Den katalavéno', zh: '我不明白' },
      { id: 'g13', greek: 'Είμαστε από το Χονγκ Κονγκ', translit: 'Ímaste apó to Hong Kong', zh: '我們來自香港' }
    ]
  },
  {
    id: 'restaurant',
    titleZh: '餐廳用餐',
    titleEn: 'At the Taverna',
    phrases: [
      { id: 'r1', greek: 'Ένα τραπέζι για τέσσερις, παρακαλώ', translit: 'Éna trapézi ya tésseris, parakaló', zh: '請給我們一張四人桌' },
      { id: 'r2', greek: 'Τον κατάλογο, παρακαλώ', translit: 'Ton katálogo, parakaló', zh: '請給我菜單' },
      { id: 'r3', greek: 'Τι μας προτείνετε;', translit: 'Ti mas protínete?', zh: '你推薦什麼菜？' },
      { id: 'r4', greek: 'Νερό, παρακαλώ', translit: 'Neró, parakaló', zh: '請給我水' },
      { id: 'r5', greek: 'Είμαι χορτοφάγος', translit: 'Íme chortofágos', zh: '我吃素' },
      { id: 'r6', greek: 'Είναι πολύ νόστιμο!', translit: 'Íne polí nóstimo!', zh: '很好吃！' },
      { id: 'r7', greek: 'Τον λογαριασμό, παρακαλώ', translit: 'Ton logariasmó, parakaló', zh: '請埋單／結帳' },
      { id: 'r8', greek: 'Στην υγειά μας!', translit: 'Stin iyiá mas!', zh: '乾杯！（為我們的健康）' }
    ]
  },
  {
    id: 'directions',
    titleZh: '問路交通',
    titleEn: 'Directions & Transport',
    phrases: [
      { id: 'd1', greek: 'Πού είναι η τουαλέτα;', translit: 'Pou íne i toualéta?', zh: '洗手間在哪裡？' },
      { id: 'd2', greek: 'Πού είναι ο σταθμός του μετρό;', translit: 'Pou íne o stathmós tou metró?', zh: '地鐵站在哪裡？' },
      { id: 'd3', greek: 'Πού είναι η Ακρόπολη;', translit: 'Pou íne i Akrópoli?', zh: '衛城在哪裡？' },
      { id: 'd4', greek: 'Πόσο απέχει;', translit: 'Póso apéchi?', zh: '有多遠？' },
      { id: 'd5', greek: 'Αριστερά, δεξιά, ευθεία', translit: 'Aristerá, dexiá, efthía', zh: '左、右、直走' },
      { id: 'd6', greek: 'Ένα εισιτήριο, παρακαλώ', translit: 'Éna isitírio, parakaló', zh: '請給我一張票' }
    ]
  },
  {
    id: 'shopping',
    titleZh: '購物付款',
    titleEn: 'Shopping',
    phrases: [
      { id: 's1', greek: 'Πόσο κάνει;', translit: 'Póso káni?', zh: '多少錢？' },
      { id: 's2', greek: 'Είναι πολύ ακριβό', translit: 'Íne polí akrivó', zh: '太貴了' },
      { id: 's3', greek: 'Απλώς κοιτάζω', translit: 'Aplós kitázo', zh: '我只是看看' },
      { id: 's4', greek: 'Θα το πάρω', translit: 'Tha to páro', zh: '我要買這個' },
      { id: 's5', greek: 'Μπορώ να πληρώσω με κάρτα;', translit: 'Boró na pliróso me kárta?', zh: '可以用卡付款嗎？' }
    ]
  },
  {
    id: 'church',
    titleZh: '教堂參觀',
    titleEn: 'Visiting Churches',
    phrases: [
      { id: 'c1', greek: 'Μπορώ να βγάλω φωτογραφία;', translit: 'Boró na vgálo fotografía?', zh: '可以拍照嗎？', note: '修道院與教堂內常禁止拍照，請先詢問。' },
      { id: 'c2', greek: 'Τι ώρα ανοίγει η εκκλησία;', translit: 'Ti óra anígi i ekklisía?', zh: '教堂幾點開門？' },
      { id: 'c3', greek: 'Είμαστε προσκυνητές', translit: 'Ímaste proskinités', zh: '我們是朝聖者' },
      { id: 'c4', greek: 'Ο Θεός να σας ευλογεί', translit: 'O Theós na sas evloyí', zh: '願神祝福你們' },
      { id: 'c5', greek: 'Χριστός Ανέστη!', translit: 'Christós Anésti!', zh: '基督復活了！', note: '復活節期間的問候語。' },
      { id: 'c6', greek: 'Αληθώς Ανέστη!', translit: 'Alithós Anésti!', zh: '祂真的復活了！（回應）' }
    ]
  },
  {
    id: 'faith',
    titleZh: '聖經希臘文詞彙',
    titleEn: 'Words from the New Testament',
    phrases: [
      { id: 'f1', greek: 'Αγάπη', translit: 'Agápi', zh: '愛（林前 13 章「愛是恆久忍耐」的「愛」）' },
      { id: 'f2', greek: 'Πίστη', translit: 'Písti', zh: '信心' },
      { id: 'f3', greek: 'Ελπίδα', translit: 'Elpída', zh: '盼望' },
      { id: 'f4', greek: 'Ευαγγέλιο', translit: 'Evangélio', zh: '福音（好消息）' },
      { id: 'f5', greek: 'Εκκλησία', translit: 'Ekklisía', zh: '教會（原意：被召出來的會眾）' },
      { id: 'f6', greek: 'Ιχθύς', translit: 'Ichthís', zh: '魚——「耶穌基督，神的兒子，救主」字首縮寫' },
      { id: 'f7', greek: 'Αμήν', translit: 'Amín', zh: '阿們' }
    ]
  },
  {
    id: 'emergency',
    titleZh: '緊急求助',
    titleEn: 'Emergencies',
    phrases: [
      { id: 'e1', greek: 'Βοήθεια!', translit: 'Voíthia!', zh: '救命！', note: '歐盟緊急電話：112（可說英語）。' },
      { id: 'e2', greek: 'Χρειάζομαι γιατρό', translit: 'Chriázome yiatró', zh: '我需要醫生' },
      { id: 'e3', greek: 'Καλέστε ασθενοφόρο!', translit: 'Kaléste asthenofóro!', zh: '請叫救護車！' },
      { id: 'e4', greek: 'Πού είναι το φαρμακείο;', translit: 'Pou íne to farmakío?', zh: '藥房在哪裡？' },
      { id: 'e5', greek: 'Χάθηκα', translit: 'Cháthika', zh: '我迷路了' }
    ]
  }
];

export const allGreekPhrases = greekPhraseCategories.flatMap((c) =>
  c.phrases.map((p) => ({ ...p, categoryZh: c.titleZh }))
);
