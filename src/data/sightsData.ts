import { Sight } from '../types';

export const sightsData: Sight[] = [
  {
    id: 'kavala-neapolis',
    nameEn: 'Kavala / Neapolis',
    nameZh: '迦華拿 / 尼亞波利',
    ancientName: 'Νεάπολις (Neapolis)',
    region: '東馬其頓 (Eastern Macedonia)',
    scriptureRef: '使徒行傳 16:11',
    scriptureText: '「於是從特羅亞開船，一直行到撒摩特喇，第二天到了尼亞波利。」',
    summary: '現代的迦華拿位於愛琴海北部的迦華拿灣頭，是希臘北部第二大都市，也是東馬其頓地區的主要海港。這裡是使徒保羅回應「馬其頓呼聲」踏上歐洲大陸宣教的第一站。',
    historicalContext: '尼亞波利在希臘文意為「新城」，建於主前六世紀，起初為來自塔索斯島（Thasos）的移民所建立，作為內陸金礦名城腓立比的出海外港。主前168年納入羅馬帝國版圖。拜占庭時期被尊稱為「基督之城」（Christoupolis）。1387年至1912年屬鄂圖曼帝國統治，1919年希土戰爭後大批小亞細亞難民遷入，帶來充沛勞動力與經濟復興。',
    timeline: [
      {
        period: '主前 6 世紀',
        title: '塔索斯移民建城',
        description: '來自塔索斯島的希臘移民建立外港新城，依託潘蓋翁山脈豐富金礦蓬勃發展。'
      },
      {
        period: '主前 168 年',
        title: '羅馬行省時代',
        description: '羅馬併吞馬其頓王國，尼亞波利成為羅馬行省重要良港，並修建埃格納提亞大道（Via Egnatia）。'
      },
      {
        period: '主後 50 年',
        title: '使徒保羅登陸歐洲第一站',
        description: '保羅夜間在特羅亞得見「馬其頓異象」，順風橫越愛琴海抵達尼亞波利，基督福音正式傳入歐洲大陸（徒 16:11）。'
      },
      {
        period: '拜占庭時期',
        title: '「基督之城」Christoupolis',
        description: '拜占庭帝國時期城名改為基督之城，成為基督信仰在巴爾幹半島的重要堡壘。'
      },
      {
        period: '1387 - 1912 年',
        title: '鄂圖曼帝國統治與卡瓦拉水道橋',
        description: '土耳其統治五百餘年，修建著名的卡瓦拉雙層羅馬式引水渠（Kamares）及衛城帕納吉亞城堡。'
      },
      {
        period: '1919 - 1923 年',
        title: '小亞細亞難民遷入繁榮時代',
        description: '希土人口交換使大量希臘難民在此落戶，菸草貿易興盛，港口重煥活力。'
      }
    ],
    mustSeeSpots: [
      {
        name: '聖尼古拉教堂 - 馬其頓異象馬賽克牆 (Church of St. Nicholas)',
        description: '教堂外牆鑲嵌著極為壯麗的當代馬賽克壁畫，生動描繪保羅夜間見異象，馬其頓人懇求「請你過到馬其頓來幫助我們」，以及保羅乘船渡海來到歐洲的莊嚴時刻。',
        biblicalSignificance: '使徒行傳 16:9-10：「在夜間有異象現與保羅：有一個馬其頓人站著求他說，請你過到馬其頓來幫助我們。保羅既看見這異象，我們便推斷是神召我們去傳福音給那裡的人，就立刻想要往馬其頓去。」'
      },
      {
        name: '保羅登陸紀念碑 (Apostle Paul Landing Site)',
        description: '位於舊港海濱，紀念保羅、西拉、提摩太與路加踏上歐洲土地的第一道足跡，常年吸引全球朝聖者駐足默想與禱告。',
        biblicalSignificance: '標誌著基督教由亞洲跨入歐洲西方文明歷史的關鍵轉捩點。'
      },
      {
        name: '卡馬雷斯古水道橋 (Kamares Aqueduct)',
        description: '建於16世紀鄂圖曼蘇丹蘇萊曼大帝時期的巨大雙層拱形引水橋，跨越舊城區與新城區之間，長280米、高25米。'
      },
      {
        name: '帕納吉亞半島古城角衛城 (Panagia Peninsula Fortress)',
        description: '俯瞰整個卡瓦拉海灣的拜占庭與威尼斯風格要塞，古色古香的鵝卵石街道與典型馬其頓風格建築。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Kavala_-_view_of_the_old_town_on_Panagia_peninsula.jpg/1280px-Kavala_-_view_of_the_old_town_on_Panagia_peninsula.jpg',
    imageCaption: '卡瓦拉（古稱尼亞波利）帕納吉亞半島老城，右後方為卡馬雷斯引水渡槽',
    imageCredit: 'Patrik Kunec / Wikimedia Commons, CC BY-SA 4.0',
    tags: ['馬其頓呼聲', '保羅宣教第一站', '愛琴海海港', '聖尼古拉教堂']
  },
  {
    id: 'philippi',
    nameEn: 'Philippi',
    nameZh: '腓立比古城',
    ancientName: 'Φίλιπποι (Philippoi)',
    region: '東馬其頓 (Eastern Macedonia)',
    scriptureRef: '使徒行傳 16:12',
    scriptureText: '「從那裡來到腓立比，就是馬其頓這一方的頭一個城，也是羅馬的駐防城。我們在這城裡住了幾天。」',
    summary: '腓立比是馬其頓的重要駐防重鎮與金礦中樞，位於埃格納提亞大道上。在此處建立了歐洲歷史上第一座基督教會，見證了賣紫色布匹婦人呂底亞的信主、保羅在獄中唱詩讚美與禁卒全家得救的神蹟。',
    historicalContext: '建於主前四世紀，由馬其頓國王菲力浦二世（亞歷山大大帝之父）重新命名並加強防禦，以掌控潘蓋翁山金礦與軍事要道。主前42年爆發震驚羅馬史的「腓立比戰役」，屋大維與安東尼在此大敗刺殺凱撒的布魯圖斯與卡西烏斯軍隊；戰後屋大維將退伍老兵安置於此，特許該城享有「義大利公民權」（ius Italicum）。主後619年遭毀滅性大地震摧毀。',
    timeline: [
      {
        period: '主前 356 年',
        title: '馬其頓菲力浦二世建城',
        description: '馬其頓王兼併克倫尼德斯（Krenides），以自己名字命名為「腓立比」，開採附近金礦為征服希臘各城邦儲備軍資。'
      },
      {
        period: '主前 42 年',
        title: '腓立比戰役與羅馬駐防城',
        description: '羅馬共和國終結之戰，屋大維與安東尼打敗刺殺凱撒的共和派。戰後腓立比升格為羅馬最高特權駐防城。'
      },
      {
        period: '主後 50 年',
        title: '歐洲首間教會建立',
        description: '保羅來到甘吉特斯河畔，呂底亞受洗；保羅驅逐巫鬼被下監，半夜地震木狗脫落，禁卒全家信主受洗（徒 16:13-40）。'
      },
      {
        period: '主後 62 年',
        title: '保羅寫下《腓立比書》',
        description: '保羅在羅馬監獄中滿懷喜樂與感恩寫信給腓立比教會，被稱為「喜樂的書信」。'
      },
      {
        period: '4 - 6 世紀',
        title: '拜占庭基督教重鎮',
        description: '城內興建了七座巨大教堂，包括八角形大教堂（Octagon）、巴西利卡A型與B型大殿，基督崇拜盛極一時。'
      },
      {
        period: '主後 619 年',
        title: '強烈地震破壞',
        description: '大地震幾乎摧毀了全城主要公共建築與教堂，其後城市逐漸衰落遺棄。'
      }
    ],
    mustSeeSpots: [
      {
        name: '甘吉特斯河畔・呂底亞受洗洗禮堂 (Lydia\'s Baptistery on Gangites River)',
        description: '安息日保羅出城門到河邊尋找禱告地方，遇見推雅推喇城賣紫色布匹的呂底亞，主開導她的心，她和她一家領洗，成為歐洲第一位基督徒。現代在此建有精美的八角形洗禮堂。',
        biblicalSignificance: '徒 16:14-15：「有一個賣紫色布疋的婦人，名叫呂底亞...主就開導她的心，叫她聽從保羅所說的話。她和她一家既領了洗...」'
      },
      {
        name: '使徒保羅與西拉地牢遺址 (Prison of Saint Paul)',
        description: '傳統認定的羅馬蓄水池地牢，保羅與西拉被痛打後下在內監，兩腳上了木狗。約在半夜，保羅西拉禱告唱詩讚美神，地大震動，監門全開。',
        biblicalSignificance: '徒 16:25-26：「約在半夜，保羅和西拉禱告，唱詩讚美神，眾囚犯也聽見了。忽然，地大震動，甚至監牢的地基都搖動了...」'
      },
      {
        name: '腓立比古羅馬廣場與演說台 (Roman Forum & Bema)',
        description: '保存完好的羅馬市政廣場中心，有商店、審判座演說台（Bema）、石板鋪設的大道以及公共浴場廢墟。'
      },
      {
        name: '古代露天劇場 (Ancient Theater of Philippi)',
        description: '由菲力浦二世初建、羅馬時期擴建的半圓形希臘羅馬劇場，背靠潘蓋翁山，音響效果極佳，可容納數千人。'
      },
      {
        name: '八角形大教堂與巴西利卡大殿遺址 (Octagon Basilica)',
        description: '紀念保羅宣教的拜占庭早期恢弘八角形大教堂，至今可見細緻的大理石馬賽克地面幾何拼花。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_imposing_early_Christian_Basilica_%28Basilica_B%29_next_to_the_Forum%2C_PhilippiPhilippi_%287272631506%29.jpg/1280px-The_imposing_early_Christian_Basilica_%28Basilica_B%29_next_to_the_Forum%2C_PhilippiPhilippi_%287272631506%29.jpg',
    imageCaption: '腓立比古城羅馬廣場旁的早期基督教大殿（B大殿）遺跡',
    imageCredit: 'Carole Raddato / Wikimedia Commons, CC BY-SA 2.0',
    tags: ['歐洲第一信徒呂底亞', '保羅地牢唱詩', '喜樂的腓立比書', '古羅馬劇場']
  },
  {
    id: 'thessaloniki',
    nameEn: 'Thessaloniki',
    nameZh: '帖撒羅尼迦',
    ancientName: 'Θεσσαλονίκη (Thessalonica)',
    region: '中馬其頓 (Central Macedonia)',
    scriptureRef: '使徒行傳 17:1',
    scriptureText: '「保羅和西拉、經過暗妃波里、亞波羅尼亞、來到帖撒羅尼迦、在那裡有猶太人的會堂。」',
    summary: '帖撒羅尼迦是希臘第二大都市，人口約45萬，坐落於塞爾邁灣頭。在羅馬帝國時期是埃格納提亞大道與通往多瑙河幹道的交會中心，得天獨厚的海陸樞紐。保羅在此連續三個安息日本著聖經辯論，建立了信望愛俱備的榜樣教會。',
    historicalContext: '主前315年由馬其頓將軍卡山德（Cassander）建立，以其妻子帖撒羅尼迦（亞歷山大大帝的同父異母妹妹）命名。主前168年羅馬征服馬其頓，設為第二行政區首府，後升格為馬其頓全行省省會。主前42年獲封「自由皇城」（Free Imperial City）。主後380年羅馬皇帝狄奧多西一世在此頒布《薩洛尼卡敕令》，正式確立尼西亞正統基督教為羅馬國教。鄂圖曼統治時期是巴爾幹猶太文化中心（被稱為「巴爾幹耶路撒冷」），二戰納粹期間猶太社群遭遇滅頂之災。',
    timeline: [
      {
        period: '主前 315 年',
        title: '卡山德將軍建城',
        description: '整合周邊二十六個部落城鎮，以亞歷山大大帝之妹帖撒羅尼迦命名，取代佩拉成為新首府海港。'
      },
      {
        period: '主前 168 - 146 年',
        title: '羅馬馬其頓行省首府',
        description: '羅馬擊敗馬其頓王朝，設立行省總督府於此，建成貫穿羅馬帝國東西的大動脈埃格納提亞大道。'
      },
      {
        period: '主前 42 年',
        title: '賜予「自由皇城」自治地位',
        description: '在腓立比戰役後，獲羅馬皇帝授權享有免稅與獨立議事自治權（Free Imperial City）。'
      },
      {
        period: '主後 50 年',
        title: '使徒保羅三個安息日講論基督',
        description: '保羅進入會堂本著聖經講解陳明基督必須受害從死裡復活，許多虔敬希臘人與尊貴婦女信從，耶孫家被官長盤問（徒 17:1-9）。其後保羅寫成新約最早書信《帖撒羅尼迦前後書》。'
      },
      {
        period: '主後 380 年',
        title: '頒布《薩洛尼卡敕令》立基督教為國教',
        description: '羅馬皇帝狄奧多西一世在此頒布劃時代敕令，宣佈尼西亞基督教為帝國唯一合法國教，正式廢止異教古奧林運會等習俗。'
      },
      {
        period: '1500 - 1944 年',
        title: '塞法迪猶太人黃金時代與二戰浩劫',
        description: '西班牙驅逐猶太人後大量遷入，1519年佔全城人口54%，成為全球猶太文化名城。1941-1944年納粹佔領期間，96%猶太人（逾45,000人）遭遣送奧斯威辛集中營殺害。'
      }
    ],
    mustSeeSpots: [
      {
        name: '伽列裡烏斯凱旋門與圓形大廳 (Arch of Galerius & Rotunda)',
        description: '建於主後298-299年，為紀念四帝共治皇帝伽列裡烏斯大敗波斯薩珊王朝而建，精美浮雕鐫刻羅馬軍團作戰凱旋場面；相鄰的圓形大廳曾改為基督教大聖堂與清真寺。'
      },
      {
        name: '帖撒羅尼迦白塔 (White Tower / Lefkos Pyrgos)',
        description: '濱海大道的標誌性建築，建於鄂圖曼蘇萊曼大帝時期作為防禦要塞與監獄，如今是帖撒羅尼迦城市歷史博物館，登頂可俯瞰整個愛琴海塞爾邁灣。'
      },
      {
        name: '聖德米特里烏斯大教堂 (Church of Saint Demetrios)',
        description: '希臘最大的拜占庭教堂之一，世界文化遺產，奉獻給該城守護聖人聖德米特里烏斯，地下墓穴存有古代羅馬浴場遺蹟與聖徒受難處。'
      },
      {
        name: '衛城與七塔要塞 (Acropolis & Heptapyrgion Walls / Ano Poli)',
        description: '舊城上城（Ano Poli）的古老防禦石牆，是經歷1917年大火後唯一完整保留拜占庭與鄂圖曼傳統民居風格的區域，眺望夕陽美不勝收。'
      },
      {
        name: '亞歷山大大帝騎馬銅像 (Alexander the Great Monument)',
        description: '立於海濱公園廣場的大型英姿勃發青銅雕像，手持長矛跨乘名駒布西發拉斯（Bucephalus），象徵馬其頓輝煌的古典歷史。'
      },
      {
        name: '猶太博物館與大屠殺紀念碑 (Jewish Holocaust Memorial)',
        description: '銘記曾佔城中過半人口的塞法迪猶太社群，悼念二戰中逝去的四萬五千名同胞，深具歷史與和平反思意義。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/White_Tower_in_Thessaloniki.jpg/1280px-White_Tower_in_Thessaloniki.jpg',
    imageCaption: '帖撒羅尼迦海濱的標誌性白塔',
    imageCredit: 'Hermann Hammer / Wikimedia Commons, CC BY-SA 4.0',
    tags: ['帖撒羅尼迦前後書', '薩洛尼卡敕令', '羅馬自由皇城', '伽列裡烏斯拱門']
  },
  {
    id: 'berea-veria',
    nameEn: 'Berea (Veria)',
    nameZh: '庇哩亞',
    ancientName: 'Βέροια (Beroea)',
    region: '中馬其頓 (Central Macedonia)',
    scriptureRef: '使徒行傳 17:11',
    scriptureText: '「這地方的人、賢於帖撒羅尼迦的人、甘心領受這道、天天考查聖經、要曉得這道是與不是。」',
    summary: '庇哩亞位於韋爾米翁山東麓，風景秀麗，水泉豐美。使徒行傳稱讚此地的信徒心胸開闊、求真熱切，「甘心領受這道，天天考查聖經」，成為歷代基督徒研讀神話語的典範標竿。',
    historicalContext: '古代馬其頓重鎮，主前168年為羅馬佔領，是羅馬時期馬其頓的重要貿易城邦。保羅因帖撒羅尼迦騷亂在夜間被弟兄送往庇哩亞，在此帶領許多尊貴希臘婦女和男子信主，包括同工所巴特（徒 20:4）。城內保留了四十八座拜占庭時期的小型家庭教堂與古老猶太區。',
    timeline: [
      {
        period: '主前 4 世紀',
        title: '馬其頓重要城市',
        description: '成為馬其頓王國除佩拉之外的重要文化聚落。'
      },
      {
        period: '主後 50 年',
        title: '使徒保羅踏足庇哩亞講道',
        description: '保羅避開帖撒羅尼迦反對派來到庇哩亞，當地人天天查考舊約聖經印證福音，信主者甚眾（徒 17:10-12）。'
      },
      {
        period: '拜占庭時代',
        title: '「小耶路撒冷」',
        description: '因城內密布數十座拜占庭教堂與精緻壁畫，獲得小耶路撒冷美譽。'
      }
    ],
    mustSeeSpots: [
      {
        name: '使徒保羅演說講台紀念碑 (Bema of Saint Paul)',
        description: '紀念保羅在庇哩亞傳道的大理石講台台階遺址，四周鑲嵌壯觀的現代馬賽克鑲嵌畫，生動再現保羅手持經卷向當地人宣講基督的場景。',
        biblicalSignificance: '徒 17:11 讚許「天天考查聖經、要曉得這道是與不是」'
      },
      {
        name: '巴爾布塔古老猶太區 (Barbouta Jewish Quarter)',
        description: '依翠綠的特利波塔莫斯河而建的傳統街區，保留有19世紀初的古猶太會堂與傳統懸挑木窗老宅。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Altar_de_Saint_Paul.jpg/1280px-Altar_de_Saint_Paul.jpg',
    imageCaption: '庇哩亞（韋里亞）使徒保羅講道台紀念處（Bema of St. Paul），兩側馬賽克描繪馬其頓異象與保羅講道',
    imageCredit: 'Iolchos07 / Wikimedia Commons, CC BY-SA 4.0',
    tags: ['天天考查聖經', '賢於帖撒羅尼迦', '保羅講台Bema', '小耶路撒冷']
  },
  {
    id: 'athens',
    nameEn: 'Athens',
    nameZh: '雅典',
    ancientName: 'Ἀθῆναι (Athenai)',
    region: '阿提卡 (Attica)',
    scriptureRef: '使徒行傳 17:22-23',
    scriptureText: '「保羅站在亞略巴古當中，說：眾位雅典人哪，我看你們凡事很敬畏鬼神。我遊行的時候，觀看你們所敬拜的，遇見一座壇，上面寫著『未識之神』。你們所不認識而敬拜的，我現在告訴你們。」',
    summary: '西方哲學、民主與古典藝術的搖籃。保羅在此看見滿城都是偶像就心裡焦急，在著名的亞略巴古（戰神山）面對以彼古羅和斯多亞兩派哲學家發表了著名的哲學宣教講章。',
    historicalContext: '從蘇格拉底、柏拉圖到亞里斯多德，雅典引領了西方古典文明的理智巔峰。主後50年保羅在此獨自候車同工，向信奉泛神與理性思辨的希臘學士宣告創造宇宙萬物的真神，並見證死人復活，帶領亞略巴古官長丟尼修等人信主。',
    timeline: [
      {
        period: '主前 5 世紀',
        title: '伯里克利黃金盛世',
        description: '興建帕德嫩神廟、衛城山門，西方戲劇、哲學、修辭學與民主政治盛極一時。'
      },
      {
        period: '主後 50 年',
        title: '保羅亞略巴古論道',
        description: '保羅在雅典市集與戰神山講述「未識之神」與復活真道（徒 17:16-34）。'
      }
    ],
    mustSeeSpots: [
      {
        name: '亞略巴古 / 戰神山 (Mars Hill / Areopagus)',
        description: '雅典衛城腳下的裸露石灰岩小山丘，古代雅典最高法庭審判所在地，也是保羅向哲學家辯論基督真道並引用希臘詩人詩句之處，山石上刻有徒17章講章的希臘文青銅銘文。'
      },
      {
        name: '雅典衛城與帕德嫩神廟 (Acropolis & Parthenon)',
        description: '古典建築的奇蹟，供奉雅典娜女神的多立克柱式大理石神廟，象徵古希臘鼎盛文明。'
      },
      {
        name: '古代阿哥拉集市 (Ancient Agora of Athens)',
        description: '古雅典市民政治與商業生活的中心，蘇格拉底講學、保羅每日與遇見的人辯論之所，保留有阿塔羅斯柱廊與赫菲斯托斯神廟。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Areopagus_hill_Saint_Paul_from_Acropolis_Athens.jpg/1280px-Areopagus_hill_Saint_Paul_from_Acropolis_Athens.jpg',
    imageCaption: '從雅典衛城俯瞰亞略巴古（戰神山），保羅曾在此講論「未識之神」',
    imageCredit: 'Jebulon / Wikimedia Commons, CC0',
    tags: ['未識之神', '亞略巴古講章', '哲學搖籃', '衛城帕德嫩']
  },
  {
    id: 'corinth',
    nameEn: 'Corinth & Cenchreae',
    nameZh: '哥林多與堅革哩',
    ancientName: 'Κόρινθος (Korinthos)',
    region: '伯羅奔尼撒 (Peloponnese)',
    scriptureRef: '使徒行傳 18:9-10',
    scriptureText: '「夜間，主在異象中對保羅說：不要怕，只管講，不要閉口，有我與你同在，必沒有人下手害你，因為在這城裡我有許多的百姓。」',
    summary: '坐落於連接希臘本土與伯羅奔尼撒半島的地峽上，控制愛奧尼亞海與愛琴海雙海港口的超級富庶商貿大都會。保羅在此事奉達一年零六個月，與亞居拉、百基拉同住織帳棚，建立了哥林多教會。',
    historicalContext: '古典哥林多在主前146年被羅馬軍隊夷為平地，主前44年凱撒大帝重建為羅馬殖民地與亞該亞行省首府。城內商賈雲集、文化多元但也道德奢靡。保羅在此受亞該亞方伯迦流審判（徒 18:12），後被無罪開釋。出海前在東港堅革哩剪髮還願（徒 18:18）。',
    timeline: [
      {
        period: '主前 44 年',
        title: '凱撒重建羅馬哥林多殖民城',
        description: '凱撒下令重建，繁華迅速恢復，成為地中海最富有的國際大都會之一。'
      },
      {
        period: '主後 50 - 52 年',
        title: '保羅長駐哥林多一年半宣教',
        description: '保羅與亞居拉百基拉織帳棚傳道，領管會堂的基利司布全家信主，在迦流方伯審判台前獲釋（徒 18:1-18）。'
      },
      {
        period: '主後 55 - 57 年',
        title: '寫作《哥林多前後書》與《羅馬書》',
        description: '針對教會紛爭、恩賜與愛的真諦寫下名篇《哥林多前書13章》，並在哥林多完成傳世巨著《羅馬書》。'
      }
    ],
    mustSeeSpots: [
      {
        name: '迦流審判演說台 (Bema of Gallio)',
        description: '古城廣場正中央的大理石宏偉審判座，猶太人曾同心起來攻擊保羅拉他到公堂，方伯迦流秉公不理民事糾紛，神信實成就「沒有人下手害你」的應許。',
        biblicalSignificance: '徒 18:12-17'
      },
      {
        name: '以拉都銘文石板 (Erastus Inscription)',
        description: '古羅馬劇場旁出土的拉丁文鋪路銘文：「市務總監以拉都自費鋪設此路」，印證羅馬書 16:23「城內管銀庫的以拉都問你們安」的真實歷史。'
      },
      {
        name: '阿波羅神廟柱廊 (Temple of Apollo)',
        description: '主前六世紀留存的七根巨大的單塊多立克立柱，聳立在哥林多古城遺址高處，背靠高聳的阿克羅哥林多衛城山峰。'
      },
      {
        name: '堅革哩古港口遺址 (Ancient Port of Cenchreae)',
        description: '哥林多通向愛琴海的東港，女執事非比服事之處（羅 16:1），保羅在此許願剪髮後揚帆啟航返回安提阿。'
      }
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Temple_of_Apollo_and_the_Acrocorinth_on_6_April_2019.jpg/1280px-The_Temple_of_Apollo_and_the_Acrocorinth_on_6_April_2019.jpg',
    imageCaption: '哥林多古城阿波羅神廟與背後的哥林多衛城（Acrocorinth）',
    imageCredit: 'George E. Koronaios / Wikimedia Commons, CC BY-SA 4.0',
    tags: ['不要怕只管講', '愛的真諦', '迦流審判台Bema', '以拉都銘文']
  }
];
