<script>
/* ---------- État & moteur ---------- */
const S={screen:'welcome',params:{},hist:[],joined:new Set(['sunset','bv']),events:new Set(['beachday']),likes:new Set(),deck:['yanis','lea','ines','mehdi','camille','tom'],deckMode:'Personnes',signup:{step:1,sports:{Handball:'Confirmé',Running:'Débutant'},interests:['Mode','Cuisine','Séries'],dispo:{'Mar-Soir':1,'Jeu-Soir':1,'Sam-Matin':1},sector:'5e',size:'Petit groupe',goal:'Rencontrer',discover:['Nautique','Randonnée']},verify:{step:0,doc:'CNI'},chatTab:'Tous',actFilter:'Tous',evtTab:'À venir',mapFilter:'Tous',mapPlace:null,aiLog:[],notifRead:false,settings:{vis:'Membres vérifiés',dispo:true,notif:true,geo:true,stats:false},reminder:{}};
const TABS=[['home','Accueil','home'],['discover','Découvrir','compass'],['activities','Activités','activity'],['messages','Messages','chat'],['profile','Profil','user']];
const NOTAB=new Set(['welcome','signup','verify']);
const $=s=>document.querySelector(s);
const screenEl=$('#screen'),tabEl=$('#tabbar'),layerEl=$('#layer'),statusEl=$('#status');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const av=(u,cls='')=>{const x=typeof u==='string'?U(u):u;return `<span class="avatar ${cls} av-${x.av}">${x.ini}</span>`};
const stack=ids=>`<span class="stack">${ids.slice(0,4).map(i=>av(i)).join('')}</span>`;

function go(screen,params={},push=true){
  if(push&&!(screen===S.screen&&JSON.stringify(params)===JSON.stringify(S.params)))S.hist.push([S.screen,S.params]);
  S.screen=screen;S.params=params;render();
  screenEl.scrollTop=0;
}
function back(){const h=S.hist.pop();if(h){S.screen=h[0];S.params=h[1];render();}else go('home',{},false);}
let toastT;
function toast(msg,ico='check'){layerEl.querySelectorAll('.toast').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast';t.innerHTML=I(ico)+'<span>'+msg+'</span>';layerEl.appendChild(t);clearTimeout(toastT);toastT=setTimeout(()=>t.remove(),2600);}
function sheet(html,cls=''){layerEl.querySelectorAll('.overlay').forEach(o=>o.remove());const o=document.createElement('div');o.className='overlay '+cls;o.innerHTML=`<div class="sheet">${cls?'':'<div class="handle"></div>'}${html}</div>`;o.addEventListener('click',e=>{if(e.target===o)o.remove();});layerEl.appendChild(o);}
const closeSheet=()=>layerEl.querySelectorAll('.overlay').forEach(o=>o.remove());

function render(){
  const fn=SCREENS[S.screen]||SCREENS.home;
  screenEl.innerHTML=`<div class="fade">${fn(S.params)}</div>`;
  const dark=['welcome'].includes(S.screen)||(S.screen==='profile'||S.screen==='user');
  statusEl.classList.toggle('light',S.screen==='welcome');
  if(NOTAB.has(S.screen)){tabEl.hidden=true;}else{
    tabEl.hidden=false;
    const active=S.screen==='user'?'profile':['activity','map','create'].includes(S.screen)?'activities':['chat'].includes(S.screen)?'messages':['event','events','notifications','ai','settings'].includes(S.screen)?'home':S.screen;
    const unread=CHATS.reduce((n,c)=>n+c.unread,0);
    tabEl.innerHTML=TABS.map(([id,l,ic])=>`<button data-go="${id}" class="${active===id?'on':''}">${I(ic)}${l}${id==='messages'&&unread?'<span class="dot"></span>':''}</button>`).join('');
  }
  document.querySelectorAll('#screen-chips .chip, #phone-controls .chip').forEach(c=>c.classList.toggle('on',c.dataset.open===S.screen));
}

/* Délégation d'événements dans l'app */
$('#app').addEventListener('click',e=>{
  const b=e.target.closest('[data-go],[data-act],[data-back]');if(!b)return;
  if(b.dataset.back!==undefined){closeSheet();back();return;}
  if(b.dataset.go){closeSheet();const p={};if(b.dataset.id)p.id=b.dataset.id;go(b.dataset.go,p);return;}
  const act=b.dataset.act,id=b.dataset.id,v=b.dataset.v;
  ACTIONS[act]&&ACTIONS[act](id,v,b);
});

/* ---------- Composants ---------- */
const head=(title,right='',backBtn=true)=>`<div class="sc-head">${backBtn?`<button class="iconbtn" data-back>${I('back')}</button>`:''}<h2>${title}</h2>${right}</div>`;
const actCard=(a,cls='act-card')=>`<article class="card ${cls}" data-go="activity" data-id="${a.id}" style="cursor:pointer">
  <div class="scene">${scene(a.kind)}<span class="tag">${EMO[a.sport]} ${a.sport}</span>${a.full?'<span class="tag dark" style="left:auto;right:12px">Complet</span>':S.joined.has(a.id)?'<span class="tag dark" style="left:auto;right:12px">✓ Inscrite</span>':''}</div>
  <div class="body"><div class="title" style="font-size:16px">${a.title}</div>
  <div class="meta"><span>📍 ${a.place}</span><span>🗓 ${a.day} ${a.time}</span></div>
  <div class="meta"><span>👥 ${a.n}/${a.max}</span><span>${EMO[a.sport]} ${a.level}</span><span class="tiny">· ${a.dist}</span></div></div></article>`;
const evtCard=e=>`<article class="evt-hero" data-go="event" data-id="${e.id}" style="cursor:pointer"><div class="scene">${scene(e.kind)}</div><div class="over"><span class="pill" style="background:rgba(255,255,255,.18);color:#fff;align-self:flex-start">${e.by==='mars’up'?'⭐ Événement mars’up':e.by==='Partenaire'?'🤝 Partenaire':'👥 Communauté'}</span><h3>${e.title}</h3><div class="meta" style="color:rgba(255,255,255,.85)"><span>📍 ${e.place}</span><span>🗓 ${e.day} · ${e.time}</span><span>👥 ${e.n}/${e.max} places</span></div></div></article>`;
const sportsPills=u=>u.sports.map(([s,l])=>`<span class="pill blue">${EMO[s]||'🏅'} ${s} <span style="opacity:.7;font-weight:600">· ${l}</span></span>`).join('');

/* ---------- Écrans ---------- */
const SCREENS={};

SCREENS.welcome=()=>`<div class="welcome">
  <svg class="bigwave" viewBox="0 0 500 200" preserveAspectRatio="none"><path d="M0 120c60-60 120-60 180 0s120 60 180 0 100-60 140 0V200H0z" fill="#fff"/></svg>
  <div class="logo-card" style="margin-top:14px"><svg role="img" aria-label="mars’up"><use href="#mu-full"/></svg></div>
  <h1>Bouge. Rencontre.<br>Vis Marseille autrement.</h1>
  <p>Trouve ton activité, ton groupe et les personnes qui te correspondent, de la Corniche aux Calanques.</p>
  <div style="margin-top:auto;display:flex;flex-direction:column;gap:10px;position:relative">
    <div class="row" style="gap:8px;margin-bottom:8px">${stack(['yanis','lea','mehdi','ines'])}<span style="font-size:13px;opacity:.85">4 200+ membres vérifiés à Marseille</span></div>
    <button class="btn btn-white btn-block" data-go="signup">Créer mon profil</button>
    <button class="btn btn-glass btn-block" data-go="activities">Découvrir les activités</button>
    <button style="font-size:13px;opacity:.8;padding:6px" data-go="home">J'ai déjà un compte · Se connecter</button>
  </div></div>`;

const SIGNUP_TITLES=['Crée ton compte','Qui es-tu ?','Ta photo de profil','Ta ville et ton secteur','Tes centres d\'intérêt','Tes sports et ton niveau','Tes disponibilités','Tes préférences'];
SCREENS.signup=()=>{const s=S.signup,st=s.step;let body='';
 const dots=`<div class="stepdots">${SIGNUP_TITLES.map((_,i)=>`<i class="${i<st?'on':''}"></i>`).join('')}</div>`;
 if(st===1)body=`<div class="field"><label for="su-email">Adresse e-mail</label><input id="su-email" class="input" type="email" value="lola.m@etu.univ-amu.fr"></div>
 <div class="field"><label for="su-tel">Numéro de téléphone</label><input id="su-tel" class="input" type="tel" value="+33 6 12 34 56 78"><span class="tiny">Un code de vérification te sera envoyé par SMS.</span></div>
 <div class="field"><label for="su-pwd">Mot de passe</label><input id="su-pwd" class="input" type="password" value="••••••••••"><span class="tiny">12 caractères minimum. Jamais partagé, jamais lisible par mars’up.</span></div>
 <label class="row" style="font-size:13px;color:var(--ink-2);gap:10px"><span class="toggle on" data-act="toggleDummy"></span>J'accepte les <b>conditions d'utilisation</b> et la <b>politique de confidentialité</b></label>`;
 if(st===2)body=`<div class="grid2"><div class="field"><label for="su-fn">Prénom</label><input id="su-fn" class="input" value="Lola"></div><div class="field"><label for="su-ln">Nom</label><input id="su-ln" class="input" value="Martin"></div></div>
 <div class="field"><label for="su-dob">Date de naissance</label><input id="su-dob" class="input" value="14 / 03 / 2001"><span class="tiny">Tu dois avoir 18 ans. Seul ton âge est affiché, jamais ta date de naissance.</span></div>
 <div class="field"><label>Comment on s'adresse à toi ?</label><div class="seg"><button class="on">Elle</button><button>Il</button><button>Iel</button><button>Autre</button></div></div>`;
 if(st===3)body=`<div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:10px 0">${av('me','xl')}<button class="btn btn-ghost btn-sm">${I('camera')} Ajouter une photo</button>
 <div class="card pad" style="width:100%"><div class="title" style="font-size:14px">Conseils pour une bonne photo</div><ul class="muted" style="margin:8px 0 0;padding-left:18px;display:flex;flex-direction:column;gap:4px"><li>Ton visage bien visible, de face</li><li>Une photo récente, en extérieur de préférence</li><li>Pas de logo, pas de photo de groupe</li></ul></div>
 <p class="tiny" style="text-align:center">Ta photo sera comparée à ton selfie lors de la vérification d'identité.</p></div>`;
 if(st===4)body=`<div class="field"><label>Ville</label><div class="input row" style="justify-content:space-between">Marseille <span class="pill blue">13</span></div></div>
 <div class="field"><label>Ton secteur</label><div class="grid3">${['1er','2e','3e','4e','5e','6e','7e','8e','9e','10e','11e','12e','13e','14e','15e','16e'].map(a=>`<button class="tile ${s.sector===a?'on':''}" style="padding:10px 4px" data-act="sector" data-v="${a}">${a}</button>`).join('')}</div></div>
 <div class="card pad row" style="gap:10px;background:var(--sky);border-color:transparent">${I('lock')}<span class="muted" style="color:var(--blue)">Seul ton arrondissement est visible. Ton adresse exacte n'est jamais demandée ni affichée.</span></div>`;
 if(st===5)body=`<p class="muted">Choisis-en au moins 3. Ça aide l'IA mars’up à te proposer les bons groupes.</p><div class="chips">${['Musique','Mode','Cuisine','Photo','Voyages','Gaming','Cinéma','Art','Entrepreneuriat','Nature','Lecture','Séries','Danse','Bénévolat'].map(i=>`<button class="chip ${s.interests.includes(i)?'on':''}" data-act="interest" data-v="${i}">${i}</button>`).join('')}</div>`;
 if(st===6)body=`<p class="muted">Sélectionne tes sports puis indique ton niveau.</p><div class="grid3">${SPORTS.map(([e,n])=>`<button class="tile ${s.sports[n]?'on':''}" data-act="sport" data-v="${n}"><span class="em">${e}</span>${n}</button>`).join('')}</div>
 ${Object.keys(s.sports).length?`<div class="card pad" style="display:flex;flex-direction:column;gap:12px">${Object.entries(s.sports).map(([n,l])=>`<div><div class="row" style="justify-content:space-between;margin-bottom:6px"><b style="font-size:14px">${EMO[n]} ${n}</b></div><div class="lvl">${['Débutant','Intermédiaire','Confirmé'].map(x=>`<button class="${l===x?'on':''}" data-act="level" data-id="${n}" data-v="${x}">${x}</button>`).join('')}</div></div>`).join('')}</div>`:''}`;
 if(st===7){const days=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];body=`<p class="muted">Tes créneaux habituels. Modifiables à tout moment.</p><div class="card pad"><div class="dispo"><span></span><span class="d">Matin</span><span class="d">Midi</span><span class="d">Soir</span>${days.map(d=>`<span>${d}</span>${['Matin','Midi','Soir'].map(m=>`<button class="${s.dispo[d+'-'+m]?'on':''}" data-act="dispo" data-v="${d}-${m}" aria-label="${d} ${m}"></button>`).join('')}`).join('')}</div></div>`;}
 if(st===8)body=`<div class="field"><label>Tu préfères bouger…</label><div class="seg">${['En duo','Petit groupe','Grand groupe'].map(x=>`<button class="${s.size===x?'on':''}" data-act="size" data-v="${x}">${x}</button>`).join('')}</div></div>
 <div class="field"><label>Ton objectif principal</label><div class="seg">${['Progresser','Me détendre','Rencontrer'].map(x=>`<button class="${s.goal===x?'on':''}" data-act="goal" data-v="${x}">${x}</button>`).join('')}</div></div>
 <div class="field"><label>Activités que tu veux découvrir</label><div class="chips">${SPORTS.filter(([,n])=>!s.sports[n]).map(([e,n])=>`<button class="chip ${s.discover.includes(n)?'on':''}" data-act="discover" data-v="${n}">${e} ${n}</button>`).join('')}</div></div>
 <div class="field"><label>Rayon de recherche · <b>5 km</b></label><input type="range" min="1" max="20" value="5" id="su-radius" style="accent-color:var(--blue);width:100%"></div>`;
 return `<div class="sc"><div class="sc-head">${st>1?`<button class="iconbtn" data-act="suPrev">${I('back')}</button>`:`<button class="iconbtn" data-go="welcome">${I('x')}</button>`}<div class="grow"><div class="tiny" style="font-weight:700">Étape ${st} sur 8</div><h2 style="font-size:21px">${SIGNUP_TITLES[st-1]}</h2></div><svg class="mark" style="height:26px"><use href="#mu-mark"/></svg></div>${dots}${body}
 <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="suNext">${st<8?'Continuer':'Vérifier mon identité'}</button></div></div>`;};

SCREENS.verify=()=>{const v=S.verify;let body='';
 if(v.step===0)body=`<div class="badge-big">${I('shield')}</div><h2 style="text-align:center;font-size:24px">Une communauté de vraies personnes</h2><p class="muted" style="text-align:center">Pour obtenir le badge « Profil vérifié » et rejoindre les activités, on vérifie ton identité en 2 minutes.</p>
 <div class="list card pad" style="padding-block:4px"><div class="item">${I('idcard')}<div class="col"><b style="font-size:14px">1 · Pièce d'identité</b><span class="tiny">CNI, passeport ou titre de séjour</span></div></div><div class="item">${I('camera')}<div class="col"><b style="font-size:14px">2 · Selfie vidéo</b><span class="tiny">Contrôle de vivacité et comparaison faciale</span></div></div><div class="item">${I('check')}<div class="col"><b style="font-size:14px">3 · Validation</b><span class="tiny">Résultat généralement en moins de 5 minutes</span></div></div></div>
 <div class="card pad row" style="gap:10px;background:var(--sky);border-color:transparent">${I('lock')}<span class="muted" style="color:var(--blue)">La vérification est opérée par un prestataire certifié. mars’up ne reçoit ni ne stocke tes documents, uniquement le statut « vérifié ».</span></div>
 <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="vNext">Commencer la vérification</button><button class="btn btn-block" style="color:var(--ink-2)" data-go="home">Plus tard (accès limité)</button></div>`;
 if(v.step===1)body=`<p class="muted">Choisis ton document, puis place-le dans le cadre.</p>${['CNI','Passeport','Titre de séjour'].map(d=>`<button class="doc-opt ${v.doc===d?'on':''}" data-act="vDoc" data-v="${d}">${I('idcard')}${d}${v.doc===d?'<span style="margin-left:auto">'+I('check')+'</span>':''}</button>`).join('')}
 <div class="capture"><div class="frame"></div><div class="scan"></div><span style="font-size:13px;opacity:.85;position:relative">Recto de la ${v.doc}</span></div>
 <div class="row tiny" style="gap:8px">${I('lock')}Flux chiffré vers le prestataire · aucune copie côté mars’up</div>
 <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="vNext">${I('camera')} Capturer le document</button></div>`;
 if(v.step===2)body=`<p class="muted">Place ton visage dans l'ovale et suis les instructions.</p><div class="capture selfie"><div class="frame"></div><div class="scan"></div><span style="font-size:13px;opacity:.85;position:relative;margin-top:150px">Tourne lentement la tête à gauche</span></div>
 <div class="list card pad" style="padding-block:4px"><div class="item">${I('check')}<span class="muted">Document lu : ${v.doc} · Lola MARTIN</span></div><div class="item">${I('clock')}<span class="muted">Vivacité en cours…</span></div></div>
 <div class="cta-bar"><button class="btn btn-primary btn-block" data-act="vNext">Terminer le selfie</button></div>`;
 if(v.step===3)body=`<div class="badge-big" style="background:var(--blue);color:#fff">${I('check')}</div><h2 style="text-align:center;font-size:26px">Profil vérifié ✅</h2><p class="muted" style="text-align:center">Bienvenue Lola. Ton badge est actif, tes documents sont supprimés par le prestataire sous 24 h.</p>
 <div class="card pad" style="text-align:center"><div class="row" style="justify-content:center;gap:10px">${av('me','lg')}</div><div class="h3" style="margin-top:8px">Lola, 25 ans <span class="verified">${I('check')} Vérifié</span></div><div class="muted">📍 Marseille 5e</div></div>
 <div class="ai-card">${I('sparkles')}<div><b>L'IA mars’up a préparé 3 groupes pour toi</b><span>Hand & running débutant 5e · Beach-volley Catalans · Yoga Corniche</span></div></div>
 <div class="cta-bar"><button class="btn btn-primary btn-block" data-go="home">Entrer dans mars’up</button></div>`;
 return `<div class="sc"><div class="sc-head">${v.step>0&&v.step<3?`<button class="iconbtn" data-act="vPrev">${I('back')}</button>`:''}<div class="grow"><div class="tiny" style="font-weight:700">Vérification d'identité</div><h2 style="font-size:21px">${['Pourquoi vérifier ?','Pièce d\'identité','Selfie de vérification','Compte validé'][v.step]}</h2></div></div><div class="progress"><i style="width:${[10,40,70,100][v.step]}%"></i></div>${body}</div>`;};

SCREENS.home=()=>{const tonight=ACTS.filter(a=>a.tonight);const unread=NOTIFS.filter(n=>n.unread).length;
 return `<div class="sc"><div class="sc-head" style="margin-top:4px"><span class="brand"><svg class="mark" style="height:26px"><use href="#mu-mark"/></svg><span class="wordmark" style="font-size:22px">mars<span class="apos">’</span><span class="up">up</span></span></span><span class="grow"></span><button class="iconbtn" data-go="map">${I('pin')}</button><button class="iconbtn" data-go="notifications">${I('bell')}${unread&&!S.notifRead?'<span class="dot"></span>':''}</button></div>
 <div><h2 style="font-size:26px">Salut Lola 👋</h2><p class="muted">Mardi soir, 3 activités t'attendent à moins de 3 km.</p></div>
 <div class="search" data-go="activities">${I('search')}Rechercher une activité, un lieu, une personne…</div>
 <div class="ai-card" data-go="ai" style="cursor:pointer">${I('sparkles')}<div class="grow"><b>Demande à l'IA mars’up</b><span>« Je veux faire du sport mardi soir près du 5e »</span></div>${I('arrow')}</div>
 <div><div class="section-head" style="margin-bottom:10px"><h3 class="h3">Ce soir près de toi</h3><button class="tiny" style="color:var(--blue);font-weight:700" data-go="activities">Tout voir</button></div><div class="hscroll">${tonight.map(a=>actCard(a,'act-card act-mini')).join('')}</div></div>
 <div><div class="section-head" style="margin-bottom:10px"><h3 class="h3">Événements à venir</h3><button class="tiny" style="color:var(--blue);font-weight:700" data-go="events">Tout voir</button></div>${evtCard(E('beachday'))}</div>
 <div><div class="section-head" style="margin-bottom:10px"><h3 class="h3">Populaires à Marseille</h3></div><div class="hscroll">${ACTS.filter(a=>a.pop).map(a=>actCard(a,'act-card act-mini')).join('')}</div></div>
 <div><div class="section-head" style="margin-bottom:10px"><h3 class="h3">Nouveaux groupes pour toi</h3></div><div class="list card" style="padding:4px 14px">
  ${[['🏃','Hand & running débutant 5e','Proposé par l\'IA · 9 membres','94 %'],['🏐','Beach-volley Catalans','Groupe de Léa · 18 membres','88 %'],['🧘','Yoga sunrise Corniche','Groupe d\'Inès · 26 membres','85 %']].map(g=>`<div class="item" data-go="discover" style="cursor:pointer"><span class="avatar av-2" style="font-size:20px;background:var(--sky);color:var(--navy)">${g[0]}</span><div class="col grow"><b style="font-size:14px">${g[1]}</b><span class="tiny">${g[2]}</span></div><span class="pill blue">${g[3]}</span></div>`).join('')}</div></div>
 <div><div class="section-head" style="margin-bottom:10px"><h3 class="h3">La communauté</h3></div><div style="display:flex;flex-direction:column;gap:14px">
  <article class="card post"><div class="row" style="padding:12px 14px 8px">${av('lea')}<div class="col grow"><b style="font-size:14px">Léa <span class="verified">${I('check')}</span></b><span class="tiny">Plage des Catalans · dimanche</span></div></div><div class="scene">${scene('beach')}</div><div class="cap"><p style="font-size:14px">Premier tournoi de la saison, 4 nouvelles recrues et un coucher de soleil parfait 🏐🌅 Rendez-vous dimanche prochain !</p><div class="acts"><span>${I('heart')} 48</span><span>${I('chat')} 12</span><span class="pill blue" style="margin-left:auto">Rejoindre</span></div></div></article>
  <article class="card post"><div class="row" style="padding:12px 14px 8px">${av('hugo')}<div class="col grow"><b style="font-size:14px">Hugo <span class="verified">${I('check')}</span></b><span class="tiny">Calanque de Sormiou · samedi</span></div></div><div class="scene">${scene('hike')}</div><div class="cap"><p style="font-size:14px">11 au départ, 11 à l'arrivée et une baignade mémorable. Prochaine sortie : Sugiton avec le Bureau des guides 🥾</p><div class="acts"><span>${I('heart')} 73</span><span>${I('chat')} 21</span><span class="pill blue" style="margin-left:auto" data-go="event" data-id="sugiton">Voir l'événement</span></div></div></article>
 </div></div></div>`;};

SCREENS.discover=()=>{const mode=S.deckMode;let cards='';
 if(mode==='Personnes'){const ids=S.deck.slice(0,2);cards=ids.map((id,i)=>{const u=U(id);return `<div class="swipe ${i===0?'top':'back'}" data-card="${id}"><div class="scene">${scene(i===0?'city':'sunset')}<div class="person">${av(u,'xl')}</div><span class="score" style="--p:${u.score}"><b>${u.score} %</b></span><span class="tag">${u.verified?'✓ Vérifié':'Non vérifié'}</span></div>
  <div class="body"><div class="row" style="justify-content:space-between"><div class="h3" style="font-size:20px">${u.name}, ${u.age}</div><span class="muted">📍 ${u.sector}</span></div><div class="chips" style="gap:6px">${sportsPills(u)}</div><p class="muted" style="font-size:13px;line-height:1.4">${u.bio}</p><div class="spark">${(u.why||[]).map(w=>`<span class="pill good">✓ ${w}</span>`).join('')}</div><div class="tiny">📅 ${u.dispo}</div></div></div>`}).join('');
  if(!ids.length)cards=`<div class="card pad" style="height:100%;display:grid;place-items:center;text-align:center"><div><div style="font-size:40px">🌊</div><div class="h3">Tu as tout vu pour aujourd'hui</div><p class="muted">Reviens demain ou élargis ton rayon de recherche.</p><button class="btn btn-ghost btn-sm" style="margin-top:10px" data-act="resetDeck">Recommencer la démo</button></div></div>`;}
 if(mode==='Activités'){const a=ACTS.filter(x=>!S.joined.has(x.id))[S.deckIdx||0]||ACTS[2];cards=`<div class="swipe top" data-card="${a.id}"><div class="scene" style="height:260px">${scene(a.kind)}<span class="tag">${EMO[a.sport]} ${a.sport}</span><span class="score" style="--p:90"><b>90 %</b></span></div><div class="body"><div class="h3" style="font-size:20px">${a.title}</div><div class="meta"><span>📍 ${a.place}</span><span>🗓 ${a.day} ${a.time}</span></div><div class="meta"><span>👥 ${a.n}/${a.max}</span><span>${a.level}</span></div><p class="muted" style="font-size:13px">${a.desc}</p><div class="spark"><span class="pill good">✓ ${a.dist}</span><span class="pill good">✓ Ton niveau</span><span class="pill good">✓ Créneau dispo</span></div></div></div>`;}
 if(mode==='Groupes')cards=`<div class="swipe top" data-card="grp"><div class="scene" style="height:230px">${scene('sunset')}<span class="tag">🏃 Groupe</span><span class="score" style="--p:94"><b>94 %</b></span></div><div class="body"><div class="h3" style="font-size:20px">Hand & running débutant 5e</div><div class="muted">Proposé par l'IA mars’up · 9 membres</div><div class="row">${stack(['camille','tom','ines','mehdi'])}<span class="tiny">Camille, Tom, Inès et 6 autres</span></div><p class="muted" style="font-size:13px">Sorties de 5 km le mardi et le jeudi soir, départ Castellane. Allure 7:00, personne ne reste derrière.</p><div class="spark"><span class="pill good">✓ Ton quartier</span><span class="pill good">✓ Mardi & jeudi soir</span><span class="pill good">✓ Niveau débutant</span></div></div></div>`;
 if(mode==='Événements'){const e=E('afterwork');cards=`<div class="swipe top" data-card="${e.id}"><div class="scene" style="height:250px">${scene(e.kind)}<span class="tag">👥 Communauté</span></div><div class="body"><div class="h3" style="font-size:20px">${e.title}</div><div class="meta"><span>📍 ${e.place}</span><span>🗓 ${e.day} · ${e.time}</span></div><p class="muted" style="font-size:13px">${e.desc}</p><div class="places"><div class="progress"><i style="width:${e.n/e.max*100}%"></i></div><span>${e.max-e.n} places restantes</span></div></div></div>`;}
 return `<div class="sc">${head('Découvrir',`<button class="iconbtn" data-act="filters">${I('sliders')}</button>`,false)}
 <div class="seg">${['Personnes','Activités','Groupes','Événements'].map(m=>`<button class="${mode===m?'on':''}" data-act="deckMode" data-v="${m}">${m}</button>`).join('')}</div>
 <div class="swipe-wrap">${cards}</div>
 <div class="actions"><button class="pass" data-act="swipe" data-v="pass" aria-label="Passer">${I('x')}</button><button data-act="info" aria-label="Voir le profil">${I('info')}</button><button class="like" data-act="swipe" data-v="like" aria-label="Bouger ensemble">${I('check')}</button></div>
 <p class="tiny" style="text-align:center">Matching basé sur localisation, sports, niveau, disponibilités, âge et centres d'intérêt. Sport et rencontres sociales uniquement.</p></div>`;};
</script>
