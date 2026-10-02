<script>
/* ---------- Icônes ---------- */
const ICONS={
home:'<path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="M14.6 9.4l-1.8 5.2-5.2 1.8 1.8-5.2z"/>',
activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.4A8 8 0 1 1 21 12z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 11a3 3 0 1 0 0-6M22 20a6 6 0 0 0-5-6"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3zM10 20a2 2 0 0 0 4 0"/>',
pin:'<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
sparkles:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
back:'<path d="M15 18l-6-6 6-6"/>',
check:'<path d="M5 12l5 5L20 7"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
heart:'<path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
sliders:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
calendar:'<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
idcard:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M13 10h5M13 14h5M5.5 16a3 3 0 0 1 6 0"/>',
flag:'<path d="M5 21V4h11l-1.5 4L16 12H5"/>',
nav:'<path d="M3 11l18-8-8 18-2-8z"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
more:'<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
edit:'<path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
download:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
};
const I=(n,cls='')=>`<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||''}</svg>`;
document.querySelectorAll('[data-ico]').forEach(el=>{el.innerHTML=I(el.dataset.ico)});

/* ---------- Scènes graphiques (remplacent les photos) ---------- */
function scene(kind,extra=''){
  const G=(a,b,c)=>`<defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="${c?'.55':'1'}" stop-color="${b}"/>${c?`<stop offset="1" stop-color="${c}"/>`:''}</linearGradient></defs>`;
  const W='<path d="M-20 300c40-18 80-18 120 0s80 18 120 0 80-18 120 0 80 18 120 0" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="3"/><path d="M-20 325c40-18 80-18 120 0s80 18 120 0 80-18 120 0 80 18 120 0" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3"/>';
  let inner='';
  switch(kind){
    case 'sunset': inner=G('#0B2A66','#2F7BFF','#FF9A5C')+'<circle cx="300" cy="245" r="52" fill="#FFD27A" opacity=".95"/><rect y="262" width="400" height="140" fill="#07234F" opacity=".55"/>'+W+'<path d="M40 262c60-30 110-34 160-20s80 12 160 0" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>';break;
    case 'beach': inner=G('#38B6FF','#E8F4FF')+'<rect y="230" width="400" height="170" fill="#F3E2B8"/><path d="M-20 232c60 14 120 14 180 0s120-14 180 0 60 14 100 0V250H-20z" fill="#9ED8FF"/>'+W.replace(/300/g,'190').replace(/325/g,'212')+'<circle cx="80" cy="70" r="30" fill="#fff" opacity=".9"/>';break;
    case 'court': inner=G('#0A4FC2','#0F6BFF')+'<rect x="40" y="40" width="320" height="320" rx="6" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="4"/><circle cx="200" cy="200" r="48" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="4"/><path d="M40 200h320M200 40v320" stroke="rgba(255,255,255,.75)" stroke-width="4"/><path d="M40 120h90v160H40M360 120h-90v160h90" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="4"/>';break;
    case 'pitch': inner=G('#0B7C6B','#1BA18A')+'<rect x="30" y="30" width="340" height="340" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="4"/><circle cx="200" cy="200" r="50" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="4"/><path d="M30 200h340" stroke="rgba(255,255,255,.8)" stroke-width="4"/>';break;
    case 'yoga': inner=G('#DCEBFF','#9FC9FF')+'<circle cx="200" cy="150" r="70" fill="#fff" opacity=".9"/><path d="M-20 290c60-26 120-26 180 0s120 26 180 0 60-14 100 0V400H-20z" fill="#5FA8FF"/>'+W;break;
    case 'hike': inner=G('#07234F','#1E5FD1')+'<path d="M-20 320L80 170l70 90 60-120 90 150 60-80 80 110v80H-20z" fill="#0A3A8C"/><path d="M-20 360l120-120 90 110 70-80 140 120v10H-20z" fill="#0F6BFF"/><circle cx="320" cy="80" r="28" fill="#fff" opacity=".85"/>';break;
    case 'bike': inner=G('#1273EB','#4AA3FF')+'<path d="M-20 300c80-60 200-60 300-20s120 10 140-10v130H-20z" fill="#0B2E6B"/><path d="M-10 330c80-50 200-50 300-15" stroke="#fff" stroke-dasharray="18 14" stroke-width="4" fill="none"/><circle cx="90" cy="90" r="34" fill="#fff" opacity=".85"/>';break;
    case 'swim': inner=G('#0FA3E6','#065EA8')+W.replace(/300/g,'120').replace(/325/g,'150')+W.replace(/300/g,'220').replace(/325/g,'250')+W;break;
    case 'tennis': inner=G('#0F6BFF','#0A4FC2')+'<rect x="60" y="30" width="280" height="340" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="4"/><path d="M60 200h280M110 30v340M290 30v340M110 110h180M110 290h180" stroke="rgba(255,255,255,.85)" stroke-width="4"/><circle cx="250" cy="150" r="12" fill="#D9F75A"/>';break;
    case 'paddle': inner=G('#35B6FF','#0F6BFF')+W.replace(/300/g,'200').replace(/325/g,'230')+'<rect x="150" y="160" width="130" height="20" rx="10" fill="#fff" opacity=".9" transform="rotate(-8 215 170)"/>'+W;break;
    case 'gym': inner=G('#0A1E45','#153B7A')+'<rect x="60" y="190" width="280" height="14" rx="7" fill="#fff" opacity=".9"/><rect x="40" y="160" width="36" height="74" rx="8" fill="#35B6FF"/><rect x="324" y="160" width="36" height="74" rx="8" fill="#35B6FF"/><rect x="80" y="170" width="24" height="54" rx="6" fill="#fff" opacity=".7"/><rect x="296" y="170" width="24" height="54" rx="6" fill="#fff" opacity=".7"/>';break;
    case 'city': inner=G('#0F6BFF','#07234F')+'<path d="M0 400V250h40v-60h50v40h40V150h60v80h40v-40h60v60h50v-30h60v140z" fill="#0A2E6B"/><circle cx="330" cy="90" r="26" fill="#fff" opacity=".9"/>';break;
    case 'party': inner=G('#153B7A','#0F6BFF')+'<circle cx="80" cy="80" r="10" fill="#35B6FF"/><circle cx="300" cy="120" r="14" fill="#fff" opacity=".8"/><circle cx="200" cy="60" r="7" fill="#fff"/><circle cx="340" cy="260" r="9" fill="#35B6FF"/><circle cx="120" cy="300" r="12" fill="#fff" opacity=".6"/><path d="M60 350q140-120 280 0" stroke="#35B6FF" stroke-width="6" fill="none" stroke-linecap="round"/>';break;
    default: inner=G('#0F6BFF','#07234F')+W;
  }
  return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}<rect width="400" height="400" fill="url(#g${kind})" style="mix-blend-mode:multiply" opacity="0"/></svg>${extra}`;
}
/* la première forme dessinée est le fond : on insère le rect de fond juste après defs */
const _scene=scene;
scene=function(kind,extra){const s=_scene(kind,extra);return s.replace('</defs>','</defs><rect width="400" height="400" fill="url(#g'+kind+')"/>');};

/* ---------- Données ---------- */
const USERS={
 me:{id:'me',name:'Lola',age:25,sector:'Marseille 5e',sports:[['Handball','Confirmée'],['Running','Débutante'],['Beach-volley','À découvrir']],interests:['Mode','Instagram','Cuisine','Seconde main'],dispo:'Mardi et jeudi soir, dimanche',bio:'Parisienne arrivée à Marseille pour mes études, en résidence étudiante. Plutôt réservée : j'aime bien quand les choses se font naturellement. Le handball, c'est ma passion depuis Paris.',verified:true,av:0,ini:'LO'},
 yanis:{id:'yanis',name:'Yanis',age:23,sector:'Marseille 8e',sports:[['Running','Confirmé'],['Vélo','Intermédiaire']],interests:['Musique','Voyages','Cinéma'],dispo:'Mardi soir, week-end',bio:'Je cours le Run Club du mercredi depuis un an. Toujours partant pour un sunset run à Borély.',verified:true,av:1,ini:'YA',score:92,why:['À 1,8 km','Running · même niveau','Dispo mardi soir']},
 lea:{id:'lea',name:'Léa',age:20,sector:'Marseille 7e',sports:[['Beach-volley','Intermédiaire'],['Natation','Confirmée']],interests:['Mode','Art','Photo']  ,dispo:'Jeudi soir, dimanche',bio:'Beach-volley aux Catalans tous les dimanches. Je forme des équipes débutantes bienvenues.',verified:true,av:2,ini:'LÉ',score:88,why:['À 900 m','Beach-volley','Mode · Photo']},
 mehdi:{id:'mehdi',name:'Mehdi',age:24,sector:'Marseille 1er',sports:[['Basket','Confirmé'],['Salle de sport','Intermédiaire']],interests:['Gaming','Cuisine','Entrepreneuriat'],dispo:'Soirs de semaine',bio:'Playground du Prado le soir. On monte des 3x3 ouverts à tous les niveaux.',verified:true,av:3,ini:'ME',score:74,why:['À 2,4 km','Soirs de semaine','Cuisine']},
 ines:{id:'ines',name:'Inès',age:22,sector:'Marseille 5e',sports:[['Yoga','Confirmée'],['Randonnée','Intermédiaire']],interests:['Nature','Photo','Lecture'],dispo:'Samedi matin, dimanche',bio:'Yoga au lever du soleil sur la Corniche et randos dans les Calanques. Rythme tranquille, bonne humeur obligatoire.',verified:true,av:4,ini:'IN',score:85,why:['Yoga · Photo','Samedi matin','À 1,5 km']},
 tom:{id:'tom',name:'Tom',age:25,sector:'Marseille 2e',sports:[['Natation','Intermédiaire'],['Paddle','Débutant']],interests:['Voyages','Cuisine'],dispo:'Week-end',bio:'Nouveau à Marseille, je découvre les activités nautiques. Paddle à la Pointe Rouge le dimanche.',verified:false,av:0,ini:'TO',score:69,why:['Week-end','Nouveau à Marseille']},
 camille:{id:'camille',name:'Camille',age:21,sector:'Marseille 4e',sports:[['Tennis','Intermédiaire'],['Running','Débutante']],interests:['Musique','Mode'],dispo:'Mardi, jeudi',bio:'Tennis à Borély et running tranquille. Je débute en course, cherche un binôme patient.',verified:true,av:2,ini:'CA',score:81,why:['Mardi · jeudi','Running débutant','Mode']},
 nour:{id:'nour',name:'Nour',age:19,sector:'Marseille 13e',sports:[['Football','Intermédiaire'],['Basket','Débutante']],interests:['Gaming','Musique'],dispo:'Mercredi, week-end',bio:'Foot 5v5 à Luminy. Équipe mixte, ambiance détendue.',verified:true,av:1,ini:'NO'},
 hugo:{id:'hugo',name:'Hugo',age:22,sector:'Marseille 9e',sports:[['Randonnée','Confirmé'],['Vélo','Confirmé']],interests:['Nature','Photo'],dispo:'Week-end',bio:'Guide bénévole des Calanques. Sormiou, Sugiton, Morgiou : je connais tous les sentiers.',verified:true,av:3,ini:'HU'},
};
const U=id=>USERS[id];
const SPORTS=[['🏃','Running'],['🤾','Handball'],['🏀','Basket'],['⚽','Football'],['🏐','Beach-volley'],['🏋️','Salle de sport'],['🧘','Yoga'],['🥾','Randonnée'],['🚴','Vélo'],['🏊','Natation'],['🎾','Tennis'],['🌊','Nautique']];
const EMO=Object.fromEntries(SPORTS.map(([e,n])=>[n,e]));

const ACTS=[
 {id:'sunset',title:'Sunset Run 🌅',sport:'Running',kind:'sunset',place:'Parc Borély',day:'Samedi',time:'18h30',n:12,max:20,level:'Débutant / intermédiaire',desc:'Boucle de 6 km autour du parc puis le long de la plage du Prado, allure libre par groupes de niveau. On termine ensemble face au coucher du soleil. Étirements et débrief au kiosque.',who:['yanis','camille','mehdi','ines'],host:'yanis',map:'borely',dist:'1,8 km',pop:true,tonight:false,we:true},
 {id:'bv',title:'Beach-volley aux Catalans',sport:'Beach-volley',kind:'beach',place:'Plage des Catalans',day:'Dimanche',time:'11h00',n:8,max:12,level:'Tous niveaux',desc:'Deux terrains réservés, équipes mixtes tirées au sort. Les débutants sont intégrés avec un briefing de 10 minutes. Ballons fournis.',who:['lea','tom','nour'],host:'lea',map:'catalans',dist:'900 m',pop:true,we:true},
 {id:'basket',title:'3x3 au Playground du Prado',sport:'Basket',kind:'court',place:'Playground du Prado',day:'Mardi',time:'19h30',n:9,max:12,level:'Intermédiaire',desc:'Tournoi 3x3 à la mêlée sur le terrain couvert face à la mer. Rotation toutes les 10 minutes pour que tout le monde joue.',who:['mehdi','nour','hugo'],host:'mehdi',map:'prado',dist:'2,4 km',pop:true,tonight:true},
 {id:'foot',title:'Foot 5v5 à Luminy',sport:'Football',kind:'pitch',place:'Terrain synthétique Luminy',day:'Mercredi',time:'20h00',n:10,max:10,level:'Intermédiaire',desc:'Match complet ! Rejoins la liste d\'attente pour être prévenu si une place se libère.',who:['nour','mehdi','tom'],host:'nour',map:'luminy',dist:'7,1 km',full:true},
 {id:'yoga',title:'Yoga sunrise sur la Corniche',sport:'Yoga',kind:'yoga',place:'Vallon des Auffes',day:'Samedi',time:'7h30',n:14,max:18,level:'Débutant',desc:'Séance douce de 50 minutes face à la mer, suivie d\'un café partagé. Tapis conseillé, quelques-uns prêtés sur place.',who:['ines','camille','lea'],host:'ines',map:'auffes',dist:'1,5 km',pop:true,we:true},
 {id:'rando',title:'Rando Calanque de Sormiou',sport:'Randonnée',kind:'hike',place:'Calanque de Sormiou',day:'Dimanche',time:'9h00',n:11,max:15,level:'Intermédiaire',desc:'Départ des Baumettes, 3 h de marche, 450 m de dénivelé, baignade à l\'arrivée. Prévoir 2 L d\'eau et chaussures de marche.',who:['hugo','ines','yanis'],host:'hugo',map:'sormiou',dist:'8,3 km',we:true},
 {id:'velo',title:'Vélo Corniche → Pointe Rouge',sport:'Vélo',kind:'bike',place:'Départ Vieux-Port',day:'Jeudi',time:'18h45',n:6,max:12,level:'Débutant',desc:'Sortie urbaine de 14 km sur la piste cyclable du littoral, pause glace à la Pointe Rouge. Vélos en libre-service acceptés.',who:['yanis','hugo'],host:'yanis',map:'vieuxport',dist:'2,1 km'},
 {id:'swim',title:'Nage en eau libre au Prado',sport:'Natation',kind:'swim',place:'Plage du Prado',day:'Mardi',time:'18h30',n:7,max:10,level:'Confirmé',desc:'1 500 m le long des bouées, encadrement par deux nageurs confirmés. Bouée de sécurité obligatoire.',who:['lea','tom'],host:'lea',map:'prado',dist:'2,6 km',tonight:true},
 {id:'tennis',title:'Doubles au Tennis Club Borély',sport:'Tennis',kind:'tennis',place:'Parc Borély',day:'Jeudi',time:'19h00',n:3,max:4,level:'Intermédiaire',desc:'Dernière place pour compléter deux doubles. Courts en terre battue, balles fournies.',who:['camille','mehdi','yanis'],host:'camille',map:'borely',dist:'1,8 km'},
 {id:'paddle',title:'Paddle à la Pointe Rouge',sport:'Nautique',kind:'paddle',place:'Base nautique Pointe Rouge',day:'Dimanche',time:'10h00',n:5,max:8,level:'Débutant',desc:'Initiation d\'une heure avec moniteur partenaire, puis balade jusqu\'à l\'île Maïre si la mer est calme. Matériel inclus.',who:['tom','ines'],host:'tom',map:'pointerouge',dist:'5,4 km',we:true},
 {id:'hand',title:'Hand loisir mixte 🤾',sport:'Handball',kind:'court',place:'Gymnase Vallier',day:'Jeudi',time:'20h30',n:11,max:14,level:'Tous niveaux',desc:'Match loisir en équipes mixtes tirées au sort, sans arbitre ni classement. Tu arrives seule ? On te présente l'équipe avant le coup d'envoi. Chaussures de salle obligatoires.',who:['nour','camille','mehdi'],host:'nour',map:'castellane',dist:'1,3 km',pop:true},
 {id:'gym',title:'Séance en duo · Salle Castellane',sport:'Salle de sport',kind:'gym',place:'Salle partenaire Castellane',day:'Mardi',time:'20h00',n:2,max:4,level:'Intermédiaire',desc:'Full body de 45 minutes en binôme. Pass invité offert par la salle partenaire pour les membres vérifiés.',who:['mehdi'],host:'mehdi',map:'castellane',dist:'1,1 km',tonight:true},
];
const A=id=>ACTS.find(a=>a.id===id);

const EVENTS=[
 {id:'beachday',title:'MARS’UP BEACH DAY 🌊',sub:'Beach-volley + pique-nique',kind:'beach',place:'Plage des Catalans',day:'Dimanche 12 oct.',time:'15h00',n:24,max:30,by:'mars’up',desc:'Le rendez-vous mensuel de la communauté. Tournoi de beach-volley par équipes tirées au sort, puis pique-nique partagé face au coucher du soleil. Ouvert à tous les niveaux.',who:['lea','yanis','ines','tom','camille'],reminder:true},
 {id:'runclub',title:'MARS’UP RUN CLUB 🏃',sub:'Running collectif',kind:'sunset',place:'Parc Borély',day:'Mercredi 8 oct.',time:'19h00',n:38,max:60,by:'mars’up',desc:'Trois groupes d\'allure (6:30, 5:30, 4:45), 8 km, échauffement et étirements encadrés. Chaque semaine, même heure, même endroit.',who:['yanis','camille','mehdi','hugo']},
 {id:'3x3',title:'Tournoi 3x3 du Prado 🏀',sub:'Partenaire · Playground Prado',kind:'court',place:'Playground du Prado',day:'Samedi 18 oct.',time:'14h00',n:40,max:48,by:'Partenaire',desc:'Tournoi 3x3 par équipes de 4, dotation par notre partenaire. Inscription par équipe ou en solo (on te trouve une équipe).',who:['mehdi','nour']},
 {id:'afterwork',title:'Afterwork des nouveaux 👋',sub:'Communauté · Cours Julien',kind:'party',place:'Cours Julien',day:'Jeudi 9 oct.',time:'19h30',n:27,max:40,by:'Communauté',desc:'Pour celles et ceux arrivés à Marseille cette année. Jeux brise-glace, conseils de quartier, et groupes formés sur place par activité.',who:['tom','camille','ines','nour']},
 {id:'sugiton',title:'Sortie Calanque de Sugiton 🥾',sub:'Partenaire · Bureau des guides',kind:'hike',place:'Calanque de Sugiton',day:'Dimanche 19 oct.',time:'8h30',n:15,max:20,by:'Partenaire',desc:'Randonnée encadrée par un guide diplômé, baignade et lecture du paysage. Niveau intermédiaire, 4 h aller-retour.',who:['hugo','ines']},
];
const E=id=>EVENTS.find(e=>e.id===id);

const CHATS=[
 {id:'running',type:'group',title:'Running Marseille 🏃',sub:'12 participants',av:'🏃',unread:2,msgs:[
   ['yanis','Vous partez d\'où samedi ? Je peux récupérer du monde vers Castellane.','17:42'],
   ['camille','Moi je viens de Baille, on se retrouve directement au kiosque ?','17:45'],
   ['me','Je serai à l\'entrée du parc côté Prado 👍','17:50'],
   ['yanis','Parfait. On se retrouve à 18h15 pour s\'échauffer ?','17:51'],
   ['ines','18h15 ça marche. Je prends les dossards fun 😄','17:58']]},
 {id:'sunsetchat',type:'activity',title:'Sunset Run · Samedi 18h30',sub:'Chat de l\'activité · 12 inscrits',av:'🌅',unread:1,msgs:[
   ['yanis','Bienvenue aux nouveaux ! Allure libre, personne ne reste derrière.','12:10'],
   ['mehdi','Première fois pour moi, je serai dans le groupe débutant.','12:30'],
   ['me','Pareil, on se suit 🙌','12:31']]},
 {id:'yanis',type:'private',title:'Yanis',sub:'Running · 8e',av:'yanis',unread:0,msgs:[
   ['yanis','Hey Lola ! J\'ai vu qu\'on avait matché sur le running 😄','hier'],
   ['me','Oui ! Je cherche justement un groupe pour le mardi soir.','hier'],
   ['yanis','Le mardi on fait souvent une boucle Corniche, 8 km tranquille. Ça te dit demain ?','hier'],
   ['me','Carrément, dis-moi l\'heure et le point de départ.','09:12']]},
 {id:'beachchat',type:'event',title:'Beach Day 🌊',sub:'Chat de l\'événement · 24 inscrits',av:'🌊',unread:5,msgs:[
   ['lea','Qui ramène une enceinte dimanche ? 🔊','11:02'],
   ['tom','Moi ! Et j\'apporte des pastèques.','11:05'],
   ['ines','Je gère les gobelets réutilisables.','11:20'],
   ['camille','Il y a des filets sur place ou on en apporte ?','11:40'],
   ['lea','Deux terrains réservés avec filets, pas de souci.','11:41']]},
 {id:'newbies',type:'community',title:'Nouveaux à Marseille 👋',sub:'Communauté · 340 membres',av:'👋',unread:0,msgs:[
   ['tom','Un conseil pour nager sans trop de monde le week-end ?','08:30'],
   ['hugo','Plage du Prophète tôt le matin, ou les Catalans avant 10h.','08:44'],
   ['nour','Et Pointe Rouge le dimanche à 9h c\'est calme.','08:50']]},
 {id:'lea',type:'private',title:'Léa',sub:'Beach-volley · 7e',av:'lea',unread:0,msgs:[
   ['lea','Tu viens au beach-volley dimanche ? Je te mets dans mon équipe 🏐','mar.'],
   ['me','Oui je viens ! Je préviens, je débute totalement 😅','mar.'],
   ['lea','Aucun souci, on fait un briefing de 10 min avant.','mar.']]},
];
const C=id=>CHATS.find(c=>c.id===id);

const NOTIFS=[
 {t:'match',title:'Nouveau match avec Yanis',sub:'Running · 92 % compatible. Dis-lui bonjour !',time:'il y a 5 min',unread:true,go:'chat',id:'yanis'},
 {t:'msg',title:'Léa t\'a envoyé un message',sub:'« Tu viens au beach-volley dimanche ? »',time:'il y a 20 min',unread:true,go:'chat',id:'lea'},
 {t:'near',title:'3 activités ce soir près de toi',sub:'Basket au Prado, nage au Prado, séance en duo à Castellane',time:'il y a 1 h',unread:true,go:'activities'},
 {t:'event',title:'Rappel · Beach Day dimanche 15h',sub:'Plage des Catalans. 6 places restantes.',time:'il y a 3 h',go:'event',id:'beachday'},
 {t:'ai',title:'Recommandation de l\'IA mars’up',sub:'Un groupe « Running débutant 6e/7e » te correspond à 94 %.',time:'hier',go:'ai'},
 {t:'invite',title:'Inès t\'invite au yoga sunrise',sub:'Samedi 7h30 · Vallon des Auffes',time:'hier',go:'activity',id:'yoga'},
 {t:'event',title:'Nouvel événement · Afterwork des nouveaux',sub:'Jeudi 19h30 au Cours Julien, correspond à tes intérêts',time:'lun.',go:'event',id:'afterwork'},
 {t:'verif',title:'Ton profil est vérifié ✅',sub:'Le badge « Profil vérifié » est maintenant visible.',time:'dim.',go:'profile'},
];

const PLACES={
 vieuxport:{x:182,y:156,name:'Vieux-Port',em:'🚴'},catalans:{x:112,y:184,name:'Plage des Catalans',em:'🏐'},auffes:{x:98,y:216,name:'Vallon des Auffes',em:'🧘'},
 prado:{x:126,y:300,name:'Plages du Prado',em:'🏀'},borely:{x:152,y:332,name:'Parc Borély',em:'🏃'},pointerouge:{x:128,y:380,name:'Pointe Rouge',em:'🌊'},
 sormiou:{x:196,y:416,name:'Calanque de Sormiou',em:'🥾'},luminy:{x:300,y:398,name:'Luminy',em:'⚽'},castellane:{x:206,y:214,name:'Castellane · Vallier',em:'🤾'},
 coursju:{x:216,y:176,name:'Cours Julien',em:'👋'},longchamp:{x:236,y:112,name:'Palais Longchamp',em:'🏃'},velodrome:{x:190,y:286,name:'Stade Vélodrome',em:'⚽'},
};
</script>
