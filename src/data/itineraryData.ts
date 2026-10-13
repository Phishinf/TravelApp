import { DayItinerary } from '../types';

export const itineraryData: DayItinerary[] = [
  {
    dayNumber: 1,
    dateStr: 'Day 1',
    title: 'Arrival in Thessaloniki & Journey to Kavala',
    titleZh: '抵達帖撒羅尼迦・前往歐洲宣教原點迦華拿',
    region: '東馬其頓 (Eastern Macedonia)',
    regionZh: '東馬其頓省',
    themeVerse: {
      ref: '使徒行傳 16:9',
      text: '「在夜間有異象現與保羅：有一個馬其頓人站著求他說：請你過到馬其頓來幫助我們。」'
    },
    overview: '朝聖團抵達希臘北部塞薩洛尼基機場，沿著古代埃格納提亞大道路線前往愛琴海濱海明珠迦華拿（古稱尼亞波利）。入住海邊酒店，召開行前靈修分享會，為接下來踏尋使徒腳蹤的身心旅程禱告。',
    overviewZh: '抵達希臘北部，驅車前往愛琴海濱海古城迦華拿（尼亞波利）。在海浪拍岸聲中舉行開營靈修禮拜，默想神引領保羅跨越歐亞大陸的歷史呼召。',
    keySpots: ['塞薩洛尼基機場接機', '愛琴海濱海大道', '迦華拿舊港夜景'],
    travelDistanceKm: 165,
    overnightLocation: 'Kavala (卡瓦拉)',
    events: [
      {
        id: 'd1-1',
        time: '14:30',
        title: 'Airport Welcome & Gathering',
        titleZh: '機場集合與迎賓啟程',
        location: 'Thessaloniki Airport (SKG)',
        locationZh: '帖撒羅尼迦馬其頓機場',
        description: 'Meet local tour guides, board chartered coach, and prepare devotional handbooks.',
        descriptionZh: '集合領取朝聖研經研習手冊，登車前往迦華拿。',
        category: 'travel'
      },
      {
        id: 'd1-2',
        time: '17:30',
        title: 'Check-in & Kavala Harbor Stroll',
        titleZh: '酒店登記入住與卡瓦拉舊港漫步',
        location: 'Kavala Waterfront',
        locationZh: '卡瓦拉愛琴海舊海濱',
        description: 'First glimpse of ancient Neapolis waters where Paul\'s ship arrived from Troas.',
        descriptionZh: '初見當年保羅坐船自特羅亞渡海而來所抵達的蔚藍海灣。',
        category: 'sight'
      },
      {
        id: 'd1-3',
        time: '19:30',
        title: 'Welcome Dinner & Orientation',
        titleZh: '歡迎晚宴與行程背景簡介',
        location: 'Harbor View Restaurant',
        locationZh: '海灣傳統希臘餐廳',
        description: 'Traditional Macedonian seafood and orientation on Paul\'s second missionary journey.',
        descriptionZh: '品嚐地道希臘風味，講解使徒行傳16章宣教歷史大背景。',
        category: 'meal'
      },
      {
        id: 'd1-4',
        time: '21:00',
        title: 'Evening Prayer & Hymn Singing',
        titleZh: '晚禱與獻唱詩歌：《我要向高山舉目》',
        location: 'Hotel Chapel Room',
        locationZh: '酒店研經交誼廳',
        description: 'Singing Hymn 13: I Lift Up My Eyes to the Mountains (Psalm 121), committing the journey to the Lord.',
        descriptionZh: '全團同心合唱詩歌第13首《我要向高山舉目》，將整個朝聖學習旅程交託給神。',
        scripture: {
          reference: '詩篇 121:1-2',
          text: '「我要向高山舉目，我的幫助從造天地的耶和華而來。」'
        },
        category: 'worship'
      }
    ],
    devotionalPrompt: '回想人生中，你是否也曾聽見神在安靜中給你的「馬其頓呼聲」？你如何順服啟程？'
  },
  {
    dayNumber: 2,
    dateStr: 'Day 2',
    title: 'Kavala (Neapolis): The European Gateway',
    titleZh: '迦華拿（尼亞波利）：福音傳入歐洲的大門',
    region: '東馬其頓 (Eastern Macedonia)',
    regionZh: '迦華拿市區與古港',
    themeVerse: {
      ref: '使徒行傳 16:11',
      text: '「於是從特羅亞開船，一直行到撒摩特喇，第二天到了尼亞波利。」'
    },
    overview: '全天參訪尼亞波利聖蹟。敬拜參觀聖尼古拉教堂著名的保羅馬其頓異象巨型馬賽克壁畫、保羅登陸紀念碑、鄂圖曼時期卡馬雷斯古羅馬式雙層水道橋，並攀登帕納吉亞衛城城堡俯瞰整座愛琴海海港。',
    overviewZh: '深度走訪保羅踏足歐洲的第一個港口尼亞波利。觀摩聖尼古拉教堂馬其頓異象壁畫、保羅登陸石碑與壯觀水道橋。',
    keySpots: ['聖尼古拉教堂馬賽克牆', '使徒保羅登陸紀念碑', '卡馬雷斯古水道橋', '帕納吉亞衛城城堡'],
    travelDistanceKm: 20,
    overnightLocation: 'Kavala (卡瓦拉)',
    events: [
      {
        id: 'd2-1',
        time: '08:30',
        title: 'Church of Saint Nicholas & Macedonian Mosaic',
        titleZh: '聖尼古拉教堂與馬其頓異象馬賽克牆',
        location: 'Church of Agios Nikolaos',
        locationZh: '聖尼古拉教堂外牆廣場',
        description: 'Detailed study of the mosaic portraying Paul receiving the Macedonian call and his arrival at Neapolis port.',
        descriptionZh: '研讀教堂外牆馬賽克名畫：馬其頓人的呼求、保羅順服啟航以及踏上歐洲大陸的震撼一幕。',
        scripture: {
          reference: '使徒行傳 16:9-10',
          text: '「我們便推斷是神召我們去傳福音給那裡的人，就立刻想要往馬其頓去。」'
        },
        highlight: '手冊第3頁重點景點',
        category: 'sight'
      },
      {
        id: 'd2-2',
        time: '11:00',
        title: 'Apostle Paul Landing Memorial',
        titleZh: '使徒保羅登陸歐洲紀念碑禱告會',
        location: 'Old Port Pier',
        locationZh: '舊港保羅紀念石碑',
        description: 'Devotion and corporate thanksgiving for the gospel reaching European and western history.',
        descriptionZh: '在保羅登陸石階旁默想神恩，同唱詩歌第14首《活出愛》。',
        category: 'worship'
      },
      {
        id: 'd2-3',
        time: '12:30',
        title: 'Fresh Aegean Seafood Lunch',
        titleZh: '愛琴海海鮮午餐',
        location: 'Panagia Waterfront',
        locationZh: '帕納吉亞海灣餐廳',
        description: 'Enjoying local Greek cuisine overlooking the sea of Thasos.',
        descriptionZh: '品味地中海健康飲食，遠眺塔索斯島海天一色。',
        category: 'meal'
      },
      {
        id: 'd2-4',
        time: '14:30',
        title: 'Kamares Aqueduct & Fortress Climb',
        titleZh: '卡馬雷斯古引水道橋與衛城古要塞',
        location: 'Kavala Aqueduct & Castle',
        locationZh: '羅馬雙層水渠與山頂城堡',
        description: 'Exploring the 25m high dual-tier arches and the Panagia citadel fortification.',
        descriptionZh: '考察羅馬帝國埃格納提亞大道延伸出的水利工程與拜占庭防禦要塞。',
        category: 'sight'
      },
      {
        id: 'd2-5',
        time: '19:30',
        title: 'Theological Lecture: Ante-Nicene Church Fathers',
        titleZh: '神學小專題：尼西亞前期的教父與護教士',
        location: 'Conference Hall',
        locationZh: '酒店研經室',
        description: 'Study handbook page 2: Irenaeus against heresies, Tertullian on Trinity, and Origen\'s biblical scholarship.',
        descriptionZh: '依手冊第2頁專題研習：愛任紐的《反異端》、特土良的三位一體論，以及俄利根的聖經考據學。',
        category: 'reflection'
      }
    ],
    devotionalPrompt: '當神關閉了一扇門（禁止保羅在亞西亞講道），祂開啟了歐洲的大門。在你的挫折中，如何辨明神更高的引領？'
  },
  {
    dayNumber: 3,
    dateStr: 'Day 3',
    title: 'Philippi: Europe\'s First Believer & Joy in Chains',
    titleZh: '腓立比古城：歐洲首間教會與牢中讚美',
    region: '東馬其頓 (Eastern Macedonia)',
    regionZh: '腓立比考古公園與甘吉特斯河',
    themeVerse: {
      ref: '使徒行傳 16:25',
      text: '「約在半夜，保羅和西拉禱告，唱詩讚美神，眾囚犯也聽見了。」'
    },
    overview: '全天探訪列入聯合國教科文組織世界文化遺產的腓立比古城。在甘吉特斯河畔紀念賣紫色布匹的呂底亞受洗；在保羅與西拉地牢遺址前唱詩；考察古羅馬市政廣場、審判台（Bema）、古代大劇場與拜占庭八角大教堂。',
    overviewZh: '參觀腓立比古城遺址。在呂底亞受洗池畔舉行洗禮紀念禮拜，在保羅地牢唱詩讚美，漫步羅馬廣場與拜占庭大教堂群。',
    keySpots: ['甘吉特斯河畔呂底亞受洗堂', '保羅與西拉地牢遺址', '腓立比古羅馬廣場', '古代大劇場', '八角形大教堂'],
    travelDistanceKm: 35,
    overnightLocation: 'Kavala (卡瓦拉)',
    events: [
      {
        id: 'd3-1',
        time: '09:00',
        title: 'Lydia\'s Baptistery on Gangites River',
        titleZh: '甘吉特斯河畔・呂底亞受洗洗禮堂',
        location: 'Baptistery of Saint Lydia',
        locationZh: '聖呂底亞八角洗禮堂與露天河畔',
        description: 'Commemorating the first European convert Lydia and the river prayer meeting. Holy Communion service by the flowing stream.',
        descriptionZh: '在流水潺潺的甘吉特斯河邊舉行聖餐禮拜，默想主開導呂底亞的心，歐洲第一個基督徒家庭誕生。',
        scripture: {
          reference: '使徒行傳 16:14-15',
          text: '「有一個賣紫色布疋的婦人，名叫呂底亞...主就開導她的心，叫她聽從保羅所說的話。」'
        },
        highlight: '手冊第11頁重點景點',
        category: 'worship'
      },
      {
        id: 'd3-2',
        time: '11:15',
        title: 'Philippi Ancient Ruins & Roman Forum',
        titleZh: '腓立比古城遺址與羅馬市政廣場',
        location: 'Philippi Archaeological Site',
        locationZh: '腓立比中心石板大道與Bema',
        description: 'Walking the Via Egnatia stones, the ancient Agora, commercial shops, and imperial monuments.',
        descriptionZh: '踏在埃格納提亞大道的羅馬車轍石板上，考察公共浴池、行政長官席位與羅馬市集。',
        category: 'sight'
      },
      {
        id: 'd3-3',
        time: '12:45',
        title: 'Traditional Macedonian Feast',
        titleZh: '馬其頓傳統風味午餐',
        location: 'Krinides Village Taverna',
        locationZh: '克倫尼德斯鄉村餐廳',
        description: 'Tasting local cheese pies, roasted lamb, and fresh salads.',
        descriptionZh: '享用當地新鮮手作乳酪派與香烤料理。',
        category: 'meal'
      },
      {
        id: 'd3-4',
        time: '14:30',
        title: 'Prison of Paul & Silas: Singing in the Dark',
        titleZh: '保羅西拉地牢唱詩處・同唱《因著信》',
        location: 'Traditional Roman Cistern / Prison',
        locationZh: '保羅地牢遺址',
        description: 'Standing before the ancient stone chamber where shackles were released by prayer and praise. Singing Hymn 19: By Faith.',
        descriptionZh: '佇立於保羅被痛打下監的石窟前，同唱詩歌第19首《因著信》，默想即使在深夜與鎖鏈中仍有屬天的喜樂。',
        scripture: {
          reference: '腓立比書 4:4',
          text: '「你們要靠主常常喜樂！我再說，你們要喜樂！」'
        },
        category: 'worship'
      },
      {
        id: 'd3-5',
        time: '16:00',
        title: 'Ancient Theater & Early Basilicas',
        titleZh: '菲力浦古代劇場與八角大教堂馬賽克',
        location: 'Theater & Octagon Complex',
        locationZh: '腓立比衛城山腳劇場與大教堂',
        description: 'Acoustics demonstration in the 4th-century BC theater; examining early Christian mosaic pavements.',
        descriptionZh: '登上建於主前四世紀的半圓形大劇場，並欣賞拜占庭時期為紀念保羅所建八角教堂的地磚藝術。',
        category: 'sight'
      }
    ],
    devotionalPrompt: '半夜、重傷、被囚，保羅與西拉的反應竟是「禱告、唱詩讚美神」。在生活的黑暗泥濘中，你的第一反應是什麼？'
  },
  {
    dayNumber: 4,
    dateStr: 'Day 4',
    title: 'Via Egnatia: Amphipolis & Apollonia to Thessaloniki',
    titleZh: '巡行埃格納提亞大道：暗妃波里、亞波羅尼亞至帖撒羅尼迦',
    region: '中馬其頓 (Central Macedonia)',
    regionZh: '斯特里蒙河谷與塞爾邁灣',
    themeVerse: {
      ref: '使徒行傳 17:1',
      text: '「保羅和西拉、經過暗妃波里、亞波羅尼亞、來到帖撒羅尼迦、在那裡有猶太人的會堂。」'
    },
    overview: '沿著羅馬帝國最重要軍事與商貿大動脈埃格納提亞大道一路向西。中途在暗妃波里瞻仰巨大的古希臘獅子紀念碑；在亞波羅尼亞考察使徒落腳碑記；下午抵達馬其頓第一大都市、羅馬「自由皇城」帖撒羅尼迦。',
    overviewZh: '重走保羅西拉當年徒步西行的埃格納提亞大道。途經暗妃波里石獅雕像與亞波羅尼亞，抵達塞爾邁灣繁華港城帖撒羅尼迦。',
    keySpots: ['暗妃波里石獅像 (Lion of Amphipolis)', '斯特里蒙古木橋遺址', '亞波羅尼亞使徒紀念碑', '帖撒羅尼迦濱海大道'],
    travelDistanceKm: 150,
    overnightLocation: 'Thessaloniki (帖撒羅尼迦)',
    events: [
      {
        id: 'd4-1',
        time: '09:00',
        title: 'Depart via Via Egnatia Route',
        titleZh: '啟程：穿越斯特里蒙平原',
        location: 'Egnatia Highway',
        locationZh: '埃格納提亞歷史走廊',
        description: 'Lecture on the Roman military road system and how God used the Pax Romana roads to spread the gospel.',
        descriptionZh: '車上講解羅馬大道網體系與「羅馬和平」如何被神所用成為福音鋪路石。',
        category: 'travel'
      },
      {
        id: 'd4-2',
        time: '10:30',
        title: 'The Colossal Lion of Amphipolis',
        titleZh: '暗妃波里石獅巨像 (Lion of Amphipolis)',
        location: 'Amphipolis Monument Park',
        locationZh: '斯特里蒙河畔石獅紀念碑',
        description: '4th-century BC monumental marble beast erected for Alexander the Great’s naval admiral Laomedon.',
        descriptionZh: '參觀建於主前四世紀的巨大大理石坐獅雕像，紀念亞歷山大大帝遠征艦隊提督。',
        category: 'sight'
      },
      {
        id: 'd4-3',
        time: '12:00',
        title: 'Apollonia Apostle Bema Stop',
        titleZh: '亞波羅尼亞保羅講壇遺址',
        location: 'Apollonia Village',
        locationZh: '古亞波羅尼亞石碑講壇',
        description: 'Brief stop where Paul paused overnight on the route toward Thessalonica.',
        descriptionZh: '在保羅當年歇腳過夜處停留，誦讀使徒行傳17:1。',
        category: 'sight'
      },
      {
        id: 'd4-4',
        time: '13:30',
        title: 'Lakeside Traditional Lunch',
        titleZh: '沃爾維湖畔地道午餐',
        location: 'Lake Volvi Restaurant',
        locationZh: '沃爾維湖濱餐廳',
        description: 'Fresh freshwater fish and regional appetizers.',
        descriptionZh: '欣賞湖光山色，品嚐湖魚與馬其頓傳統麵食。',
        category: 'meal'
      },
      {
        id: 'd4-5',
        time: '16:00',
        title: 'Arrive in Thessaloniki & Seafront Walk',
        titleZh: '抵達帖撒羅尼迦・愛琴海濱漫步',
        location: 'Thessaloniki Waterfront',
        locationZh: '塞爾邁灣濱海大道',
        description: 'First panoramic views of Mt. Olympus across the bay on clear evenings.',
        descriptionZh: '迎著海風漫步，晴朗傍晚可遠眺愛琴海對岸白雪皚皚的奧林匹斯山。',
        category: 'sight'
      }
    ],
    devotionalPrompt: '保羅從腓立比步行到帖撒羅尼迦，長達150公里的艱苦跋涉。是什麼力量驅使他不知疲倦地將基督真道傳給未得之民？'
  },
  {
    dayNumber: 5,
    dateStr: 'Day 5',
    title: 'Thessaloniki: Free Imperial City & Model Faith',
    titleZh: '帖撒羅尼迦：羅馬自由皇城與信望愛模範',
    region: '中馬其頓 (Central Macedonia)',
    regionZh: '帖撒羅尼迦市中心與上城區',
    themeVerse: {
      ref: '帖撒羅尼迦前書 1:3',
      text: '「在神我們的父面前，不住的記念你們因信心所做的工夫，因愛心所受的勞苦，因盼望我們主耶穌基督所存的忍耐。」'
    },
    overview: '深入探索手冊第4、13頁重點內容。參觀伽列裡烏斯凱旋門（Kamara）、宏偉圓形大廳（Rotunda）、濱海白塔、聖德米特里烏斯大教堂，登臨上城衛城石牆俯瞰海灣，並造訪猶太歷史博物館與二戰大屠殺紀念碑。',
    overviewZh: '全面走訪帖撒羅尼迦歷史古蹟：伽列裡烏斯凱旋門浮雕、圓形大廳、白塔、猶太歷史紀念館與上城衛城要塞。',
    keySpots: ['伽列裡烏斯凱旋門與圓形大廳', '帖撒羅尼迦白塔', '聖德米特里烏斯大教堂', '衛城與七塔要塞 (Ano Poli)', '猶太人歷史博物館與大屠殺紀念碑', '亞歷山大大帝銅像'],
    travelDistanceKm: 25,
    overnightLocation: 'Thessaloniki (帖撒羅尼迦)',
    events: [
      {
        id: 'd5-1',
        time: '09:00',
        title: 'Arch of Galerius & Rotunda',
        titleZh: '伽列裡烏斯凱旋門與圓形大廳 (Rotunda)',
        location: 'Egnatia & Dimitriou Gounari',
        locationZh: '卡馬拉凱旋門與圓形大廳',
        description: 'Marveling at the intricate Roman military victory friezes from 298-299 AD and the oldest monumental dome in Thessaloniki.',
        descriptionZh: '賞析手冊第13頁重點介紹的羅馬四帝共治皇帝凱旋門浮雕，見證早期基督教改建的圓形大殿壯美馬賽克。',
        highlight: '手冊第13頁重點景點',
        category: 'sight'
      },
      {
        id: 'd5-2',
        time: '11:00',
        title: 'Church of Saint Demetrios & Crypt',
        titleZh: '聖德米特里烏斯大教堂與羅馬地下浴池',
        location: 'Agios Dimitrios UNESCO Basilica',
        locationZh: '聖德米特里烏斯大教堂',
        description: 'Largest basilica in Greece with 5th-century gold mosaics and the subterranean martyr crypt.',
        descriptionZh: '參觀聯合國世界遺產古老巴西利卡大殿，探索初期基督徒遭受羅馬迫害殉道的地下石室。',
        category: 'sight'
      },
      {
        id: 'd5-3',
        time: '12:45',
        title: 'Ladadika Historic District Lunch',
        titleZh: '拉達迪卡歷史街區風味午餐',
        location: 'Ladadika Old Market',
        locationZh: '拉達迪卡鵝卵石步行街',
        description: 'Tasting moussaka, souvlaki, Greek salads in colorful 19th-century olive oil merchant quarters.',
        descriptionZh: '在熱鬧古雅的橄欖油老商行街區品嚐經典希臘燉牛肉、穆薩卡與羊乳酪沙拉。',
        category: 'meal'
      },
      {
        id: 'd5-4',
        time: '14:30',
        title: 'White Tower & Jewish Sephardic Heritage',
        titleZh: '白塔與猶太大屠殺紀念碑反思',
        location: 'White Tower & Liberty Square',
        locationZh: '白塔與自由廣場紀念碑',
        description: 'Reviewing handbook page 13 & 4: the rise of Sephardic Jews (54% of population in 1519) and the tragic deportation of 45,000 under WWII Nazi occupation.',
        descriptionZh: '結合手冊第4、13頁歷史小百科：探討帖撒羅尼迦猶太社群的輝煌與悲愴，在自由廣場紀念碑前為世界和平與猶太民族得救代禱。',
        scripture: {
          reference: '羅馬書 10:1',
          text: '「弟兄們，我心裡所願的，向神所求的，是要以色列人得救。」'
        },
        category: 'reflection'
      },
      {
        id: 'd5-5',
        time: '16:30',
        title: 'Ano Poli Citadel Sunset & City Overlook',
        titleZh: '上城衛城七塔要塞與愛琴海日落',
        location: 'Heptapyrgion / Trigoniou Tower',
        locationZh: '上城三角塔與城牆高處',
        description: 'Stunning sunset over the Thermaic Gulf; devotional reflection on 1 Thessalonians.',
        descriptionZh: '登上拜占庭石砌城牆高處俯瞰整個城市港灣，同唱詩歌第20首《天父必保守》。',
        category: 'worship'
      }
    ],
    devotionalPrompt: '帖撒羅尼迦教會在極大逼迫中仍成為馬其頓和亞該亞所有信主之人的榜樣。在當代浮躁世界中，你的信仰有否活出信、望、愛的影響力？'
  },
  {
    dayNumber: 6,
    dateStr: 'Day 6',
    title: 'Berea (Veria): Examining the Scriptures Daily',
    titleZh: '庇哩亞：甘心領受・天天考查聖經的典範',
    region: '中馬其頓 (Central Macedonia)',
    regionZh: '韋爾米翁山麓庇哩亞',
    themeVerse: {
      ref: '使徒行傳 17:11',
      text: '「這地方的人、賢於帖撒羅尼迦的人、甘心領受這道、天天考查聖經、要曉得這道是與不是。」'
    },
    overview: '前往山城庇哩亞（今名韋里亞）。朝聖使徒保羅演說大理石講台紀念碑（Bema），在馬賽克壁畫前舉行查經研習會；漫步風景如畫的特利波塔莫斯河畔巴爾布塔猶太街區；探索小耶路撒冷的拜占庭壁畫小教堂。',
    overviewZh: '造訪以「天天考查聖經」聞名的庇哩亞。在保羅講台（Bema）前舉行研經立約聚會，走訪特利波塔莫斯河邊古猶太區。',
    keySpots: ['使徒保羅講台紀念碑 (Bema of Saint Paul)', '巴爾布塔古老猶太街區', '特利波塔莫斯河畔小道', '拜占庭基督復活教堂'],
    travelDistanceKm: 75,
    overnightLocation: 'Kalabaka / Meteora (卡蘭巴卡)',
    events: [
      {
        id: 'd6-1',
        time: '09:00',
        title: 'Drive to Berea (Veria)',
        titleZh: '驅車前往庇哩亞山城',
        location: 'Via Veria Highway',
        locationZh: '中馬其頓綠色平原',
        description: 'Following the route taken by the brothers who escorted Paul by night away from Thessalonica mob.',
        descriptionZh: '重走當年弟兄們夜間護送保羅離開帖撒羅尼迦逃往庇哩亞的路線。',
        category: 'travel'
      },
      {
        id: 'd6-2',
        time: '10:15',
        title: 'The Apostle Paul Bema Monument',
        titleZh: '使徒保羅演說講台 (Bema) 紀念碑查經會',
        location: 'Paul\'s Tribune (Bema)',
        locationZh: '保羅講壇紀念碑大理石台階',
        description: 'Gathering at the steps where tradition holds Paul preached. Scripture study on Berean diligence and devotion.',
        descriptionZh: '在保羅大理石講台台階與巨幅馬賽克壁畫前齊聲誦讀徒17:11，舉行「在神話語上深扎根」立志奉獻禮拜。',
        scripture: {
          reference: '提摩太後書 3:16-17',
          text: '「聖經都是神所默示的，於教訓、督責、使人歸正、教導人學義都是有益的...」'
        },
        category: 'worship'
      },
      {
        id: 'd6-3',
        time: '12:00',
        title: 'Barbouta Jewish Quarter & River Garden',
        titleZh: '巴爾布塔古老猶太區與河畔花園',
        location: 'Barbouta District',
        locationZh: '特利波塔莫斯河畔步道',
        description: 'Observing preserved 18th-century Sephardic Jewish mansions and the tranquil murmuring stream.',
        descriptionZh: '考察建在清泉河畔的百年木架懸挑古宅與昔日猶太會堂遺址。',
        category: 'sight'
      },
      {
        id: 'd6-4',
        time: '13:15',
        title: 'Traditional Veria Peach & Meat Gastronomy',
        titleZh: '韋里亞水蜜桃與傳統烤肉料理',
        location: 'Veria Town Center',
        locationZh: '韋里亞市中心老字號餐廳',
        description: 'Tasting local beef delicacies and Veria’s famous revani semolina cake.',
        descriptionZh: '品嚐當地名菜與著名的雷瓦尼（Revani）蜜糖粗粒小麥蛋糕。',
        category: 'meal'
      },
      {
        id: 'd6-5',
        time: '15:30',
        title: 'Scenic Drive to Meteora & Sunset Rocks',
        titleZh: '驅車前往邁泰奧拉巨石之城',
        location: 'Thessalian Plain to Meteora',
        locationZh: '色薩利平原通往卡蘭巴卡',
        description: 'Breathtaking arrival as the towering dark sandstone monoliths rise 400m into the clouds.',
        descriptionZh: '抵達色薩利平原，目睹從大地拔地而起、聳入雲霄的邁泰奧拉黑色砂岩巨柱。',
        category: 'travel'
      }
    ],
    devotionalPrompt: '「天天考查聖經，要曉得這道是與不是」——在各種資訊氾濫的時代，聖經是否依然是你判斷萬事的唯一絕對標準？'
  },
  {
    dayNumber: 7,
    dateStr: 'Day 7',
    title: 'Meteora: Suspended in Air & Byzantine Sacred Icons',
    titleZh: '邁泰奧拉天空之城：懸空修道院與聖像畫之光',
    region: '色薩利 (Thessaly)',
    regionZh: '邁泰奧拉砂岩石林',
    themeVerse: {
      ref: '詩篇 61:2',
      text: '「我心裡發昏的時候，我要從地極求告你。求你領我到那比我更高的磐石！」'
    },
    overview: '參訪聯合國世界自然與文化雙遺產邁泰奧拉（意為「懸浮在半空中」）。登上著名修道院（大邁泰奧拉或瓦爾拉姆修道院），深入研讀手冊第4頁「聖像畫小百科」：初期教會地下符號（魚、錨、餅）、692年特魯洛大公會議基督道成肉身畫像、以及843年「正統信仰凱旋節」的神學反思。',
    overviewZh: '參觀邁泰奧拉懸空修道院。欣賞拜占庭金箔聖像畫珍藏，探討聖像畫藝術在教會歷史中的屬靈意涵與護教論爭。',
    keySpots: ['大邁泰奧拉修道院 (Great Meteoron)', '瓦爾拉姆修道院 (Varlaam)', '聖斯德望女子修道院', '邁泰奧拉懸崖觀景台日落'],
    travelDistanceKm: 40,
    overnightLocation: 'Kalabaka / Meteora (卡蘭巴卡)',
    events: [
      {
        id: 'd7-1',
        time: '09:00',
        title: 'Monastery of the Great Meteoron',
        titleZh: '大邁泰奧拉修道院參訪',
        location: 'Great Meteoron Holy Monastery',
        locationZh: '海拔613米最高的巨石修道院',
        description: 'Climbing stone stairways cut into the cliffs; visiting the 14th-century Transfiguration catholicon.',
        descriptionZh: '攀登鑿於絕壁的石階，參觀主顯聖容大堂、古老木製絞盤纜網與修士藏骨堂。',
        category: 'sight'
      },
      {
        id: 'd7-2',
        time: '11:30',
        title: 'Theology of Icons Seminar: Windows into Heaven',
        titleZh: '聖像畫靈修神學研討：通往天國的窗戶',
        location: 'Varlaam Monastery Courtyard',
        locationZh: '瓦爾拉姆修道院回廊',
        description: 'In-depth review of handbook page 4: Trullo Council (692 AD), Incarnation of Christ in human image, and the Triumph of Orthodoxy (843 AD).',
        descriptionZh: '依手冊第4頁研析：為什麼東正教用「反向透視」與「神聖金光」繪製聖像？如何向現代人見證道成肉身的實質真理？',
        category: 'reflection'
      },
      {
        id: 'd7-3',
        time: '13:00',
        title: 'Traditional Mountain Herb Feast',
        titleZh: '色薩利高山草本風味午餐',
        location: 'Kastraki Village Taverna',
        locationZh: '卡斯特拉基古村落餐廳',
        description: 'Wild mountain greens (chorta), oven-baked moussaka, and local honey yogurt.',
        descriptionZh: '享用卡斯特拉基村傳統柴火烤肉與希臘野山蜂蜜優格。',
        category: 'meal'
      },
      {
        id: 'd7-4',
        time: '15:00',
        title: 'Monastery of Saint Stephen & Iconography Workshop',
        titleZh: '聖斯德望修道院與現代聖像畫工坊',
        location: 'Agios Stefanos Nunnery',
        locationZh: '聖斯德望修道院畫坊',
        description: 'Observing the sacred egg tempera and gold-leaf traditional technique passed down from Byzantine masters.',
        descriptionZh: '了解傳統蛋彩畫法（Egg Tempera）與金箔貼金技法，親睹現代修女如何藉畫筆禱告。',
        category: 'sight'
      },
      {
        id: 'd7-5',
        time: '18:30',
        title: 'Sunset Praise & Hymn 12: As the Deer',
        titleZh: '巨石日落讚美禮拜・同唱《如鹿切慕溪水》',
        location: 'Psaropetra Panoramic Viewpoint',
        locationZh: '薩羅佩特拉全景懸崖平台',
        description: 'Breathtaking 360-degree sunset over the monasteries. Singing Hymn 12: As the Deer.',
        descriptionZh: '在夕陽染紅千仞絕壁的壯麗時刻，全團同唱詩歌第12首《如鹿切慕溪水》，渴慕創造天地的至高主宰。',
        category: 'worship'
      }
    ],
    devotionalPrompt: '邁泰奧拉的修士遠離塵囂在絕壁上追求神的同在。身處繁忙世俗的你，如何在心靈深處築起一座專屬於神的聖殿？'
  },
  {
    dayNumber: 8,
    dateStr: 'Day 8',
    title: 'Athens: Mars Hill & The Unknown God',
    titleZh: '雅典：亞略巴古戰神山・未識之神講章',
    region: '阿提卡 (Attica)',
    regionZh: '雅典衛城與普拉卡舊城',
    themeVerse: {
      ref: '使徒行傳 17:28',
      text: '「我們生活、動作、存留，都在乎他。就如你們作詩的，有人說：我們也是他所生的。」'
    },
    overview: '南下抵達希臘首都雅典。站在雅典衛城腳下的亞略巴古（戰神山）裸露岩石上，重讀保羅向哲學家們傳講的傳世宣教講章；參觀衛城帕德嫩神廟；漫步古阿哥拉市集（古代蘇格拉底與保羅辯論處）；結合手冊第5、6頁探討古希臘哲學（蘇格拉底、柏拉圖、亞里斯多德）與城邦民主制度。',
    overviewZh: '登臨雅典衛城與戰神山亞略巴古。在保羅講述「未識之神」的青銅碑石前默想，走訪古市集阿哥拉與憲法廣場。',
    keySpots: ['亞略巴古 / 戰神山 (Mars Hill / Areopagus)', '雅典衛城與帕德嫩神廟', '古阿哥拉市集與阿塔羅斯柱廊', '憲法廣場與無名烈士墓'],
    travelDistanceKm: 350,
    overnightLocation: 'Athens (雅典)',
    events: [
      {
        id: 'd8-1',
        time: '08:00',
        title: 'Scenic Drive South to Athens',
        titleZh: '啟程南下雅典・途經溫泉關',
        location: 'National Highway south',
        locationZh: '色薩利經溫泉關至阿提卡',
        description: 'Passing historic Thermopylae (site of the 300 Spartans) with lecture on Greek culture & history (handbook p. 5, 6).',
        descriptionZh: '途中停留著名的溫泉關（斯巴達三百壯士戰役），車上溫習手冊第5頁《古希臘文化》與第6頁《希臘城邦》講義。',
        category: 'travel'
      },
      {
        id: 'd8-2',
        time: '13:00',
        title: 'Plaka Historic Neighborhood Lunch',
        titleZh: '普拉卡老城雅典風味午餐',
        location: 'Plaka Historic Quarter',
        locationZh: '衛城腳下普拉卡街區',
        description: 'Tasting classic pastitsio, spinach pie (spanakopita), and Greek coffee.',
        descriptionZh: '漫步充滿九重葛花香的普拉卡步行街，品嚐傳統希臘千層面與菠菜派。',
        category: 'meal'
      },
      {
        id: 'd8-3',
        time: '14:30',
        title: 'Mars Hill (Areopagus) Proclamation Service',
        titleZh: '亞略巴古（戰神山）宣告禮拜',
        location: 'Areopagus Rock',
        locationZh: '戰神山光滑大理石岩頂',
        description: 'Reading Acts 17:22-31 on the exact limestone outcrop where Paul stood before Epicurean and Stoic philosophers proclaiming the Resurrection.',
        descriptionZh: '全團登上戰神山，在保羅名道刻石前齊聲朗誦使徒行傳17:22-31，宣告生命氣息賞賜給萬人的獨一真神！',
        scripture: {
          reference: '使徒行傳 17:24',
          text: '「創造宇宙和其中萬物的神，既是天地的主，就不住人手所造的殿...」'
        },
        category: 'worship'
      },
      {
        id: 'd8-4',
        time: '16:00',
        title: 'The Acropolis & Parthenon',
        titleZh: '雅典衛城巡禮・帕德嫩神廟',
        location: 'Acropolis Hill',
        locationZh: '衛城帕德嫩神廟與伊瑞克提翁神廟',
        description: 'Marveling at the supreme triumph of classical Greek architecture, the Propylaea, and the Temple of Athena Nike.',
        descriptionZh: '親睹人類建築巔峰帕德嫩大理石列柱，反思古希臘偶像宗教的終結與基督真道的永恆。',
        category: 'sight'
      },
      {
        id: 'd8-5',
        time: '19:30',
        title: 'Syntagma Square & Athens Night View',
        titleZh: '憲法廣場衛兵交接與衛城夜景晚宴',
        location: 'Syntagma & Monastiraki',
        locationZh: '憲法廣場與蒙納斯提拉奇觀景餐廳',
        description: 'Traditional evzones guard changing and dinner overlooking the illuminated Acropolis.',
        descriptionZh: '觀看希臘總統衛兵換崗儀式，在露台餐廳遠眺金碧輝煌的衛城夜景。',
        category: 'meal'
      }
    ],
    devotionalPrompt: '保羅看見滿城偶像就「心裡著急」，卻以極大的智慧引導雅典哲士尋求「未識之神」。今天當面對無神與世俗思潮，我們如何以溫柔敬畏的心回答人？'
  },
  {
    dayNumber: 9,
    dateStr: 'Day 9',
    title: 'Corinth & Cenchreae: Labor of Love & Gallio\'s Bema',
    titleZh: '哥林多與堅革哩：愛的真諦・迦流審判座',
    region: '伯羅奔尼撒 (Peloponnese)',
    regionZh: '科林斯地峽與堅革哩古港',
    themeVerse: {
      ref: '使徒行傳 18:9-10',
      text: '「夜間，主在異象中對保羅說：不要怕，只管講，不要閉口，有我與你同在，必沒有人下手害你，因為在這城裡我有許多的百姓。」'
    },
    overview: '跨越壯觀的科林斯運河進入伯羅奔尼撒半島。全天走訪哥林多古城遺址：保羅受審的迦流方伯審判台（Bema）、印證聖經歷史的「以拉都銘文石板」、古阿波羅神廟柱廊、比利涅泉；下午造訪東港堅革哩（保羅許願剪髮啟航處）。',
    overviewZh: '探訪哥林多古城。站在迦流審判台前誦讀主堅固保羅的話語，觀看以拉都鋪路石銘文，參訪堅革哩古港與科林斯運河。',
    keySpots: ['科林斯運河 (Corinth Canal)', '迦流審判台 (Bema of Gallio)', '以拉都銘文石板 (Erastus Inscription)', '阿波羅神廟柱廊', '堅革哩古港 (Port of Cenchreae)'],
    travelDistanceKm: 180,
    overnightLocation: 'Athens (雅典)',
    events: [
      {
        id: 'd9-1',
        time: '08:30',
        title: 'Corinth Canal Engineering Wonder',
        titleZh: '科林斯運河壯景 (Corinth Canal)',
        location: 'Isthmus of Corinth',
        locationZh: '科林斯地峽跨橋',
        description: 'Viewing the sheer 90m limestone gorge cutting through the 6km isthmus linking the Aegean and Ionian seas.',
        descriptionZh: '站在懸空大橋俯瞰筆直垂直90米的石灰岩峽谷運河，連接愛奧尼亞海與愛琴海。',
        category: 'sight'
      },
      {
        id: 'd9-2',
        time: '10:00',
        title: 'Ancient Corinth & Gallio\'s Bema Service',
        titleZh: '哥林多古城・迦流審判演說台 (Bema) 禮拜',
        location: 'Ancient Corinth Agora',
        locationZh: '古城核心迦流審判台',
        description: 'Standing at the prominent marble tribunal where proconsul Gallio dismissed accusations against Paul. Reciting 1 Corinthians 13 ("Love never fails").',
        descriptionZh: '佇立於迦流審判台前，全團齊聲誦讀著名的《哥林多前書第13章》（愛的篇章），立志在教會與家庭中活出基督無私捨己的真愛。',
        scripture: {
          reference: '哥林多前書 13:4-8',
          text: '「愛是恆久忍耐，又有恩慈...愛是永不止息。」'
        },
        category: 'worship'
      },
      {
        id: 'd9-3',
        time: '11:45',
        title: 'Erastus Inscription & Archaeological Museum',
        titleZh: '以拉都銘文石板與哥林多考古博物館',
        location: 'Corinth Museum Courtyard',
        locationZh: '古羅馬劇場外側石板路',
        description: 'Inspecting the famous paving block inscribed "ERASTVS PRO AED S P STRAVIT" corroborating Romans 16:23.',
        descriptionZh: '親睹「城內管銀庫的以拉都」自費鋪路的拉丁石碑，見證聖經人物在考古實物中的真實印記。',
        category: 'sight'
      },
      {
        id: 'd9-4',
        time: '13:00',
        title: 'Peloponnese Coastal Lunch',
        titleZh: '伯羅奔尼撒海濱午餐',
        location: 'Lechaion Coast Taverna',
        locationZh: '科林斯灣海灘餐廳',
        description: 'Local grilled fish, kalamata olives, and fresh sourdough bread.',
        descriptionZh: '品嚐著名的卡拉馬塔橄欖、希臘酸奶黃瓜醬（Tzatziki）與炭烤時鮮。',
        category: 'meal'
      },
      {
        id: 'd9-5',
        time: '14:45',
        title: 'Ancient Port of Cenchreae Reflection',
        titleZh: '堅革哩古港口遺址默想 (Cenchreae)',
        location: 'Kechries Harbor Bay',
        locationZh: '堅革哩沉入水下的古碼頭基石',
        description: 'Reflecting on Phoebe the deaconess (Romans 16:1) and Paul shaving his hair in fulfillment of a vow before boarding the ship.',
        descriptionZh: '坐在清澈愛琴海浪輕拍的堅革哩古防波堤邊，默想保羅許願剪髮啟航的堅定心志，為普世忠心服事的女執事與宣教士代禱。',
        scripture: {
          reference: '使徒行傳 18:18',
          text: '「保羅又住了多日，就辭別了弟兄，坐船往敘利亞去...他因為許過願，就在堅革哩剪了頭髮。」'
        },
        category: 'reflection'
      },
      {
        id: 'd9-6',
        time: '19:30',
        title: 'Pilgrimage Banquet & Hymn 18: Holy One of Israel',
        titleZh: '朝聖慶典感恩晚宴・同唱《以色列的聖者》',
        location: 'Athens Historic Hall',
        locationZh: '雅典慶典禮堂',
        description: 'Sharing testimonies, group photos, and singing Hymn 18: The Holy One of Israel.',
        descriptionZh: '各組朝聖學員分享心得收穫，同唱詩歌第18首《以色列的聖者》，頌讚榮耀救主。',
        category: 'worship'
      }
    ],
    devotionalPrompt: '「不要怕，只管講，不要閉口，因為在這城裡我有許多的百姓。」在你感到孤單懼怕的時候，主的話語如何成為你剛強壯膽的後盾？'
  },
  {
    dayNumber: 10,
    dateStr: 'Day 10',
    title: 'Commissioning & The Heavenly Pilgrimage',
    titleZh: '靈修總結・差派祝福與踏上歸途',
    region: '雅典與回程 (Athens & Homeward)',
    regionZh: '雅典國際機場',
    themeVerse: {
      ref: '提摩太後書 4:7',
      text: '「那美好的仗我已經打過了，當跑的路我已經跑盡了，所信的道我已經守住了。」'
    },
    overview: '清晨舉行差派早禱會，全團同心回顧整份研經指南：從特羅亞異象到尼亞波利、腓立比的牢獄讚美、帖撒羅尼迦的信望愛、庇哩亞的查考聖經、雅典戰神山論道、哥林多愛的真諦，以及歷代殉道者與教父的生命火種。帶備靈修手冊踏上歸途，在各自工作與教會中延續宣教使命。',
    overviewZh: '朝聖旅程圓滿落幕。舉行差派早禱會，彼此祝福代禱，將研經所得化為生活踐行的生命力量，前往雅典機場踏上歸途。',
    keySpots: ['酒店晨禱禮拜堂', '雅典紀念品選購', '雅典國際機場 (ATH) 送機'],
    travelDistanceKm: 45,
    overnightLocation: 'Homeward Flight (歸途)',
    events: [
      {
        id: 'd10-1',
        time: '08:00',
        title: 'Closing Devotion & Commissioning Prayer',
        titleZh: '晨更結業崇拜與差派禱告禮',
        location: 'Athens Assembly Room',
        locationZh: '雅典崇拜禮堂',
        description: 'Pastor blessing, receiving commemorative pilgrimage certificates, and prayer of dedication.',
        descriptionZh: '領受差派祝福，立志如保羅般奔跑天路，作基督忠心見證人。',
        scripture: {
          reference: '使徒行傳 20:24',
          text: '「我卻不以性命為念，也不看為寶貴，只要行完我的路程，成就我從主耶穌所受的職事，證明神恩惠的福音。」'
        },
        category: 'worship'
      },
      {
        id: 'd10-2',
        time: '10:00',
        title: 'Transfer to Athens International Airport',
        titleZh: '前往雅典國際機場',
        location: 'Athens Eleftherios Venizelos Airport (ATH)',
        locationZh: '雅典埃萊夫塞里奧斯·韋尼澤洛斯國際機場',
        description: 'Check-in, tax refund, boarding for homeward journey with full hearts of gratitude.',
        descriptionZh: '辦理退稅登機手續，滿載屬靈豐盛恩典踏上平安歸途。',
        category: 'travel'
      }
    ],
    devotionalPrompt: '朝聖的終點，正是實踐的起點。保羅走過了羅馬帝國的道路，今天神要在你的生活現場託付你怎樣的宣教使命？'
  }
];
