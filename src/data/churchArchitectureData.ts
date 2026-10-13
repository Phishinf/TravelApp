import { ChurchArchitectureStyle, ChurchBuildingPart, FeaturedChurch } from '../types';

export const churchArchitectureIntro = {
  titleZh: '小百科・教會建築：從家庭聚會到拜占庭穹頂',
  titleEn: 'Church Architecture: From House Churches to Byzantine Domes',
  period: '1 世紀 - 16 世紀',
  leadSummary:
    '初期教會並沒有專門的「教堂」，信徒在呂底亞等肢體的家中擘餅聚會（徒 16:15、40）。四世紀信仰合法化後，教會借用羅馬公共會堂「巴西利卡」的形式興建大殿；其後拜占庭工匠發展出以穹頂象徵天穹、以聖像與馬賽克述說救恩歷史的建築語言。走進希臘各地教堂，建築本身就是一本用石頭寫成的神學書。',
};

export const architectureStyles: ChurchArchitectureStyle[] = [
  {
    id: 'house-church',
    nameZh: '家庭教會',
    nameEn: 'House Church (Domus Ecclesiae)',
    period: '1 - 3 世紀',
    description:
      '使徒時代的信徒在私人住宅中聚會、擘餅、禱告。保羅書信多次問候「在他們家中的教會」（羅 16:5；林前 16:19）。現存最早經改建的家庭教會遺址位於敘利亞的杜拉歐羅普斯（約主後 230 年代）。',
    features: ['以住宅大廳或內院作聚會空間', '另闢房間作洗禮池', '外觀與一般民宅無異，避免引起逼迫'],
    examples: ['腓立比：呂底亞一家受洗並接待保羅（徒 16:15）', '帖撒羅尼迦：耶孫的家（徒 17:5-7）'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Christ_Healing_the_Paralytic_-_Dura-Europos_circa_232.jpg/960px-Christ_Healing_the_Paralytic_-_Dura-Europos_circa_232.jpg',
    imageCredit: 'Yale University Art Gallery / Public domain',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Christ_Healing_the_Paralytic_-_Dura-Europos_circa_232.jpg',
    imageCaption: '杜拉歐羅普斯家庭教會壁畫〈耶穌醫治癱子〉，約主後 232 年',
  },
  {
    id: 'basilica',
    nameZh: '巴西利卡大殿',
    nameEn: 'Early Christian Basilica',
    period: '4 - 6 世紀',
    description:
      '米蘭敕令（主後 313 年）之後，教會採用羅馬法庭與市集會堂「巴西利卡」的長方形平面。長軸由西向東，信徒從西面入口走向東端的半圓形後殿，象徵朝向「公義的日頭」基督前行。',
    features: ['前院（Atrium）與前廊（Narthex）', '以柱列分隔的中殿與側廊', '東端半圓形後殿與主教座', '木構斜屋頂、高側窗採光'],
    examples: ['帖撒羅尼迦聖德米特里烏斯大教堂', '腓立比巴西利卡 A', '哥林多利開翁巴西利卡'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Hagios_Demetrios%2C_Thessaloniki_02.jpg/960px-Hagios_Demetrios%2C_Thessaloniki_02.jpg',
    imageCredit: 'DMY / CC BY',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Hagios_Demetrios,_Thessaloniki_02.jpg',
    imageCaption: '聖德米特里烏斯大教堂中殿：柱列、側廊與東端後殿',
  },
  {
    id: 'central-plan',
    nameZh: '集中式：圓形與八角形',
    nameEn: 'Centralized Plan (Rotunda & Octagon)',
    period: '4 - 6 世紀',
    description:
      '源自羅馬陵墓與神殿的圓形或八角形平面，多用於紀念殉道者或使徒的「殉道紀念堂」（Martyrium）及洗禮堂。數字「八」象徵基督在七日之後的第八日復活，代表新創造。',
    features: ['以中心點為焦點的對稱平面', '中央覆以穹頂或尖頂', '常附設洗禮堂'],
    examples: ['帖撒羅尼迦圓形大廳（Rotunda）', '腓立比八角形大教堂'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Thessaloniki_Saint_George_Rotunda_interior_of_the_dome.jpg/960px-Thessaloniki_Saint_George_Rotunda_interior_of_the_dome.jpg',
    imageCredit: 'Ymblanter / CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Thessaloniki_Saint_George_Rotunda_interior_of_the_dome.jpg',
    imageCaption: '帖撒羅尼迦圓形大廳穹頂內部',
  },
  {
    id: 'domed-basilica',
    nameZh: '圓頂巴西利卡',
    nameEn: 'Domed Basilica',
    period: '6 - 8 世紀',
    description:
      '查士丁尼皇帝時代將長形大殿與中央穹頂結合，最著名的代表是君士坦丁堡聖索菲亞大教堂（主後 537 年）。穹頂成為天國臨到地上的象徵，奠定拜占庭建築的核心意象。',
    features: ['長形平面中央加建大穹頂', '以帆拱（Pendentive）將方形底座過渡為圓形穹頂', '大面積金色馬賽克'],
    examples: ['腓立比巴西利卡 B', '帖撒羅尼迦聖索菲亞教堂'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Hagia_Sophia_Interior_Panorama.jpg/960px-Hagia_Sophia_Interior_Panorama.jpg',
    imageCredit: 'Ronan Reinart / CC BY-SA 3.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Hagia_Sophia_Interior_Panorama.jpg',
    imageCaption: '君士坦丁堡聖索菲亞大教堂穹頂與帆拱',
  },
  {
    id: 'cross-in-square',
    nameZh: '十字內接方形',
    nameEn: 'Cross-in-Square',
    period: '9 - 15 世紀',
    description:
      '中期拜占庭最典型的教堂形式：方形平面內嵌一個等臂十字，交叉點上立起高鼓座穹頂，四角再覆以小穹頂或拱頂。規模較小、比例精巧，適合城市教區與修道院。',
    features: ['等臂十字與中央穹頂', '四根柱子或墩柱支撐穹頂', '外牆以磚石交錯砌成裝飾花紋'],
    examples: ['雅典卡普尼卡雷亞教堂', '帖撒羅尼迦銅匠聖母堂（Panagia Chalkeon）'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Thessaloniki_Church_of_Panagia_Chalkeon_from_the_southwest.jpg/960px-Thessaloniki_Church_of_Panagia_Chalkeon_from_the_southwest.jpg',
    imageCredit: 'Ymblanter / CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Thessaloniki_Church_of_Panagia_Chalkeon_from_the_southwest.jpg',
    imageCaption: '帖撒羅尼迦銅匠聖母堂（1028 年）',
  },
  {
    id: 'athonite',
    nameZh: '阿索斯式修道院主堂',
    nameEn: 'Athonite Katholikon',
    period: '10 世紀至今',
    description:
      '源自阿索斯聖山的修道院主堂（Katholikon）形式：在十字內接方形的南北兩側加上半圓形詩班席（Choroi），形成三葉形平面，方便修士分兩組輪唱詩篇。邁泰奧拉懸空修道院即承襲此傳統。',
    features: ['三葉形（Triconch）平面', '寬大前廊（Lite）供晨更禮儀', '牆面滿佈壁畫'],
    examples: ['大邁泰奧拉修道院主顯聖容堂', '瓦爾拉姆修道院諸聖堂'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Wall_paintings_in_the_Monastery_of_Great_Meteoron_05.jpg/960px-Wall_paintings_in_the_Monastery_of_Great_Meteoron_05.jpg',
    imageCredit: 'Unknown Cretan painter / Public domain',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Wall_paintings_in_the_Monastery_of_Great_Meteoron_05.jpg',
    imageCaption: '大邁泰奧拉修道院主堂內的 16 世紀殉道壁畫',
  },
];

export const anatomyImage = {
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hagios_Demetrios_apse.JPG/960px-Hagios_Demetrios_apse.JPG',
  imageCaption: '聖德米特里烏斯大教堂後殿：半圓穹頂上的聖母抱子像',
  imageCredit: 'Wikimedia Commons / CC BY-SA 3.0',
  imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Hagios_Demetrios_apse.JPG',
};

export const churchBuildingParts: ChurchBuildingPart[] = [
  {
    nameZh: '前院',
    nameEn: 'Atrium',
    description: '大殿西側的列柱庭院，中央常設洗手淨身的噴泉，象徵進入神殿前的潔淨預備。',
  },
  {
    nameZh: '前廊',
    nameEn: 'Narthex',
    description: '入口門廳。初期教會中，尚未受洗的慕道者在此聆聽聖道，聖餐禮開始前須離場。',
  },
  {
    nameZh: '中殿',
    nameEn: 'Nave (Naos)',
    description: '會眾聚集敬拜的主要空間。希臘文 Naos 意為「殿」，象徵信徒如同乘坐在方舟中渡過世界的風浪。',
  },
  {
    nameZh: '側廊',
    nameEn: 'Aisles',
    description: '以柱列與中殿分隔的兩側通道，大型巴西利卡如聖德米特里烏斯有五道廊（一中殿四側廊）。',
  },
  {
    nameZh: '聖障 / 聖像屏',
    nameEn: 'Templon / Iconostasis',
    description: '分隔會眾與至聖所的屏障。早期為低矮石欄，中世紀後發展為掛滿聖像的木屏，中央「君王之門」只供神職人員進出。',
  },
  {
    nameZh: '至聖所與後殿',
    nameEn: 'Sanctuary & Apse',
    description: '位於東端，設有聖餐桌（祭壇）。後殿半圓穹頂上常繪聖母抱子像，象徵道成肉身連結天與地。',
  },
  {
    nameZh: '主教座',
    nameEn: 'Synthronon',
    description: '後殿內呈階梯半圓排列的石座，主教居中、長老分坐兩旁，見證使徒統緒與教會治理。',
  },
  {
    nameZh: '讀經台',
    nameEn: 'Ambo',
    description: '中殿內高起的講台，用於宣讀福音書與使徒書信，提醒會眾聖言居於敬拜中心。',
  },
  {
    nameZh: '穹頂',
    nameEn: 'Dome',
    description: '象徵天穹。穹頂中央通常繪有「全能者基督」（Pantokrator），從高處俯視、祝福全體會眾。',
  },
  {
    nameZh: '洗禮堂',
    nameEn: 'Baptistery',
    description: '獨立或附屬的洗禮空間，常為八角形，十字形或圓形浸池讓受洗者「與基督一同埋葬、一同復活」（羅 6:4）。',
  },
];

export const featuredChurches: FeaturedChurch[] = [
  {
    id: 'thessaloniki-rotunda',
    nameZh: '圓形大廳',
    nameEn: 'Rotunda of Galerius',
    cityZh: '帖撒羅尼迦',
    period: '約主後 306 年建；4 世紀末改為教堂',
    styleZh: '集中式圓形',
    description:
      '原為迫害基督徒的皇帝伽列裡烏斯所建，可能預作陵墓或神廟之用。四世紀末被改建為教堂，穹頂鋪上金色馬賽克；鄂圖曼時期再改為清真寺，至今仍保留宣禮塔。一座建築見證了羅馬異教、基督教與伊斯蘭三段歷史。',
    highlights: ['直徑約 24 米的古羅馬磚造穹頂', '穹頂殉道聖徒金色馬賽克', '保留至今的鄂圖曼宣禮塔'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rotunda_of_Galerius_%28February_2009%29.jpg/960px-Rotunda_of_Galerius_%28February_2009%29.jpg',
    imageCredit: 'George M. Groutas / CC BY 2.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Rotunda_of_Galerius_(February_2009).jpg',
  },
  {
    id: 'hagios-demetrios',
    nameZh: '聖德米特里烏斯大教堂',
    nameEn: 'Basilica of Hagios Demetrios',
    cityZh: '帖撒羅尼迦',
    period: '5 世紀建；7 世紀火災後重建',
    styleZh: '五廊式巴西利卡',
    description:
      '為紀念在伽列裡烏斯逼迫下殉道的聖德米特里烏斯而建，是希臘規模最大的教堂之一。1917 年帖撒羅尼迦大火幾乎將其焚毀，後依原貌修復。地下墓室相傳為殉道者受難之處。',
    highlights: ['5 至 7 世紀的珍貴馬賽克', '地下殉道者墓室（Crypt）', '五廊式大殿與大理石柱列'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hagios_Demetrios%2C_Thessaloniki_01-edit.jpg/960px-Hagios_Demetrios%2C_Thessaloniki_01-edit.jpg',
    imageCredit: 'DMY / CC0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Hagios_Demetrios,_Thessaloniki_01-edit.jpg',
  },
  {
    id: 'philippi-basilicas',
    nameZh: '腓立比八角形大教堂與巴西利卡群',
    nameEn: 'Octagon Church & Basilicas A, B of Philippi',
    cityZh: '腓立比',
    period: '4 - 6 世紀',
    styleZh: '八角形紀念堂、巴西利卡、圓頂巴西利卡',
    description:
      '八角形大教堂建於紀念使徒保羅的早期教堂原址，附設洗禮堂。廣場北側的巴西利卡 A 與南側的巴西利卡 B 並列，後者嘗試加建穹頂卻未能長存，遺址展示了從長形大殿走向圓頂建築的過渡。',
    highlights: ['八角形平面與洗禮堂遺址', '巴西利卡 B 巨大的墩柱殘跡', '馬賽克幾何地板'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_imposing_early_Christian_Basilica_%28Basilica_B%29_next_to_the_Forum%2C_PhilippiPhilippi_%287272631506%29.jpg/960px-The_imposing_early_Christian_Basilica_%28Basilica_B%29_next_to_the_Forum%2C_PhilippiPhilippi_%287272631506%29.jpg',
    imageCredit: 'Carole Raddato / CC BY-SA 2.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:The_imposing_early_Christian_Basilica_(Basilica_B)_next_to_the_Forum,_PhilippiPhilippi_(7272631506).jpg',
  },
  {
    id: 'veria-resurrection',
    nameZh: '基督復活教堂',
    nameEn: 'Church of the Resurrection of Christ (Anastasis)',
    cityZh: '庇哩亞（韋里亞）',
    period: '1314 - 1315 年',
    styleZh: '單廊木屋頂巴西利卡',
    description:
      '外觀樸素的小型教堂，內部卻保存著畫家喀利耶吉斯（Georgios Kallierges）於 1315 年完成的巴列奧略王朝壁畫，人物生動傳神。鄂圖曼統治期間，韋里亞信徒將許多小教堂建得形似民宅以避人耳目。',
    highlights: ['1315 年喀利耶吉斯簽名壁畫', '巴列奧略文藝復興風格人物', '隱身民居間的「秘密教堂」傳統'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Beroia_Resurrection_of_Christ.jpg/960px-Beroia_Resurrection_of_Christ.jpg',
    imageCredit: 'Pjposullivan / CC BY-SA 3.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Beroia_Resurrection_of_Christ.jpg',
  },
  {
    id: 'meteora-katholikon',
    nameZh: '大邁泰奧拉修道院主顯聖容堂',
    nameEn: 'Katholikon of the Transfiguration, Great Meteoron',
    cityZh: '邁泰奧拉',
    period: '14 世紀創立；16 世紀擴建',
    styleZh: '阿索斯式三葉形主堂',
    description:
      '由聖亞他那修（Athanasios the Meteorite）於 14 世紀在巨岩頂端創立。昔日修士與物資須以繩網吊升上山，1920 年代才鑿出石階。主堂內部滿佈 16 世紀壁畫，其中殉道場景提醒信徒信仰的代價。',
    highlights: ['懸崖頂端的建築工程奇蹟', '三葉形詩班席平面', '16 世紀後拜占庭壁畫'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Megalo_Meteoro_monastery1.jpg/960px-Megalo_Meteoro_monastery1.jpg',
    imageCredit: 'DimitrisP67 / CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Megalo_Meteoro_monastery1.jpg',
  },
  {
    id: 'athens-kapnikarea',
    nameZh: '卡普尼卡雷亞教堂',
    nameEn: 'Church of Panagia Kapnikarea',
    cityZh: '雅典',
    period: '約 11 世紀',
    styleZh: '十字內接方形',
    description:
      '位於雅典最熱鬧的購物街中央，是雅典現存最古老的教堂之一。19 世紀城市規劃一度擬拆除，後得以保留。小巧的比例、高聳的鼓座穹頂與磚石交錯的外牆，是中期拜占庭建築的典範。',
    highlights: ['典型十字內接方形平面', '磚石交錯的「景泰藍」式砌法', '20 世紀孔托格魯學派壁畫'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Church_of_Panagia_Kapnikarea%2C_Athens%2C_20240531_0949_9467.jpg/960px-Church_of_Panagia_Kapnikarea%2C_Athens%2C_20240531_0949_9467.jpg',
    imageCredit: 'Jakub Hałun / CC BY 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_Panagia_Kapnikarea,_Athens,_20240531_0949_9467.jpg',
  },
  {
    id: 'kavala-st-nicholas',
    nameZh: '聖尼古拉教堂',
    nameEn: 'Church of St. Nicholas',
    cityZh: '迦華拿（尼亞波利）',
    period: '鄂圖曼時期建；20 世紀初改為教堂',
    styleZh: '清真寺改建教堂',
    description:
      '相傳位於保羅登陸歐洲之處附近。建築原為鄂圖曼時期的清真寺，二十世紀初改為東正教堂，並以海員主保聖人尼古拉命名。外牆的大型馬賽克描繪保羅見馬其頓異象（徒 16:9）。',
    highlights: ['保羅馬其頓異象馬賽克牆', '海港旁的歷史位置', '跨越宗教的建築轉化'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Saint_Nicolas_church_-_Kavala.jpg/960px-Saint_Nicolas_church_-_Kavala.jpg',
    imageCredit: 'MrPanyGoff / CC BY-SA 3.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Saint_Nicolas_church_-_Kavala.jpg',
  },
];
