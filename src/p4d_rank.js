<script>
/* ---------- Points sociaux, classement et boutique de skins 2D ---------- */
Object.assign(S,{points:420,streak:3,owned:new Set(['ring-azur']),equipped:{ring:'ring-azur',hat:null,bg:null},ledger:[
 ['+50','Participation · Beach-volley aux Catalans','dim.'],['+30','Accueil d\'un nouveau membre · Tom','dim.'],['+20','Nouvel ami · Camille','sam.'],['+100','Profil vérifié','dim. dernier'],['−120','Boutique · cadre « Vague azur »','dim. dernier']]});
const LEVELS=[[0,'Nouveau'],[250,'Régulier'],[600,'Pilier du quartier'],[1000,'Légende de la Corniche']];
const levelOf=p=>{let l=LEVELS[0],n=null;for(let i=0;i<LEVELS.length;i++){if(p>=LEVELS[i][0]){l=LEVELS[i];n=LEVELS[i+1]||null;}}return {name:l[1],min:l[0],next:n};};
const POINTS={yanis:1280,lea:1140,mehdi:980,hugo:910,ines:760,camille:540,tom:310,nour:290};
Object.entries(POINTS).forEach(([id,p])=>USERS[id].points=p);
USERS.yanis.skin={hat:'cap',ring:'ring-gold'};USERS.lea.skin={ring:'ring-sunset',hat:'ball'};USERS.mehdi.skin={hat:'headphones'};USERS.hugo.skin={bg:'bg-calanques'};USERS.ines.skin={hat:'flower'};

const SKINS=[
 {id:'ring-azur',cat:'Cadres',name:'Vague azur',price:120,ring:'#35B6FF'},
 {id:'ring-gold',cat:'Cadres',name:'Or de Marseille',price:260,ring:'#E6B422'},
 {id:'ring-sunset',cat:'Cadres',name:'Sunset Borély',price:200,ring:'#FF8A5C'},
 {id:'ring-neon',cat:'Cadres',name:'Néon Cours Ju',price:300,ring:'#B45CFF'},
 {id:'cap',cat:'Accessoires',name:'Casquette',price:150,hat:'🧢',pos:'top'},
 {id:'headphones',cat:'Accessoires',name:'Casque audio',price:180,hat:'🎧',pos:'top'},
 {id:'shades',cat:'Accessoires',name:'Lunettes de soleil',price:160,hat:'🕶️',pos:'mid'},
 {id:'crown',cat:'Accessoires',name:'Couronne du mois',price:350,hat:'👑',pos:'top'},
 {id:'ball',cat:'Accessoires',name:'Ballon de hand',price:140,hat:'🤾',pos:'br'},
 {id:'flower',cat:'Accessoires',name:'Fleur de la Corniche',price:90,hat:'🌸',pos:'top'},
 {id:'anchor',cat:'Accessoires',name:'Ancre du Vieux-Port',price:110,hat:'⚓',pos:'br'},
 {id:'bg-calanques',cat:'Fonds',name:'Calanques',price:220,bg:'linear-gradient(135deg,#0FA3A3,#0F6BFF)'},
 {id:'bg-night',cat:'Fonds',name:'Nuit au Vieux-Port',price:240,bg:'linear-gradient(135deg,#07234F,#6A3DBF)'},
 {id:'bg-sand',cat:'Fonds',name:'Sable du Prado',price:180,bg:'linear-gradient(135deg,#F2C978,#35B6FF)'},
 {id:'bg-sunset',cat:'Fonds',name:'Coucher de soleil',price:260,bg:'linear-gradient(160deg,#FF9A5C,#0F6BFF)'},
];
const SK=id=>SKINS.find(s=>s.id===id);
function getDeco(x){if(!x)return {};if(x.id==='me')return {ring:S.equipped.ring,hat:S.equipped.hat,bg:S.equipped.bg};return x.skin||{};}
function avDeco(x,cls,d){const r=d.ring&&SK(d.ring),h=d.hat&&SK(d.hat),b=d.bg&&SK(d.bg);
 const st=[r?`box-shadow:0 0 0 2px var(--bg),0 0 0 4.5px ${r.ring}`:'',b?`background:${b.bg}`:''].filter(Boolean).join(';');
 return `<span class="avatar ${cls} av-${x.av}"${st?` style="${st}"`:''}>${x.ini}${h?`<span class="hat ${h.pos}">${h.hat}</span>`:''}</span>`;}
function addPoints(n,label){S.points+=n;S.ledger.unshift([(n>0?'+':'−')+Math.abs(n),label,'maintenant']);setTimeout(()=>toast(`${n>0?'+':''}${n} points sociaux · ${label}`,'sparkles'),700);}
const _join=ACTIONS.join;ACTIONS.join=id=>{_join(id);addPoints(50,'Participation · '+A(id).title);};
const _accept=ACTIONS.acceptReq;ACTIONS.acceptReq=id=>{_accept(id);addPoints(20,'Nouvel ami · '+U(id).name);};
const _evtJoin=ACTIONS.evtJoin;ACTIONS.evtJoin=id=>{_evtJoin(id);addPoints(50,'Inscription · '+E(id).title);};
const _created=ACTIONS.created;ACTIONS.created=()=>{_created();addPoints(100,'Activité organisée');};

const levelCard=()=>{const L=levelOf(S.points);const pct=L.next?Math.round((S.points-L.min)/(L.next[0]-L.min)*100):100;
 return `<div class="ai-card" style="align-items:stretch;gap:14px"><div class="row" style="gap:14px">${av('me','lg')}<div class="col grow"><span class="tiny" style="color:var(--sea);font-weight:800;letter-spacing:.08em">NIVEAU · ${L.name.toUpperCase()}</span><b style="font-size:26px;font-family:var(--fd)">${S.points} <span style="font-size:14px;font-weight:600;opacity:.8">points sociaux</span></b><span class="tiny" style="color:rgba(255,255,255,.8)">🔥 ${S.streak} semaines d'affilée · ${L.next?`${L.next[0]-S.points} pts avant « ${L.next[1]} »`:'niveau maximum'}</span></div></div><div class="progress" style="background:rgba(255,255,255,.2)"><i style="width:${pct}%;background:var(--sea)"></i></div></div>`;};

const heroRank=()=>{const L=levelOf(S.points);const pct=L.next?Math.round((S.points-L.min)/(L.next[0]-L.min)*100):100;const fresh=SKINS.filter(x=>!S.owned.has(x.id)&&x.price<=S.points).slice(0,3);
 return `<div class="grid2 home-hero"><button class="hero-tile rank" data-go="rank"><span class="tiny" style="color:var(--sea);font-weight:800;letter-spacing:.08em">CLASSEMENT · SEMAINE</span><b class="big">4<sup>e</sup></b><span class="sub">parmi tes amis · 🔥 ${S.streak} sem.</span><div class="progress" style="background:rgba(255,255,255,.22);margin-top:auto"><i style="width:${pct}%;background:var(--sea)"></i></div><span class="tiny" style="color:rgba(255,255,255,.85)">${S.points} pts · ${L.next?`${L.next[0]-S.points} avant « ${L.next[1]} »`:L.name}</span></button>
 <button class="hero-tile shop" data-go="shop"><span class="tiny" style="color:var(--blue);font-weight:800;letter-spacing:.08em">BOUTIQUE · SKINS</span><div class="row" style="gap:6px;margin:4px 0 2px">${fresh.map(x=>avDeco(USERS.me,'sm',{ring:x.ring?x.id:null,hat:x.hat?x.id:null,bg:x.bg?x.id:null})).join('')||av('me','sm')}</div><span class="sub" style="color:var(--ink-2)">${fresh.length?`${fresh.length} skin${fresh.length>1?'s':''} à ta portée`:'Nouveaux skins bientôt'}</span><span class="pill blue" style="margin-top:auto;align-self:flex-start">⭐ ${S.points} pts à dépenser</span></button></div>`;};
SCREENS.rank=()=>{const tab=S.rankTab||'Amis';const ids=tab==='Amis'?[...S.friends,'me']:tab==='Mon quartier'?['ines','camille','me','tom','nour']:Object.keys(USERS);
 const rows=ids.map(id=>U(id)).sort((a,b)=>(b.id==='me'?S.points:b.points)-(a.id==='me'?S.points:a.points));
 const pts=u=>u.id==='me'?S.points:u.points;const myRank=rows.findIndex(u=>u.id==='me')+1;const offset=tab==='Marseille'?408:tab==='Mon quartier'?34:0;
 const top=rows.slice(0,3);const podium=[top[1],top[0],top[2]].filter(Boolean);
 return `<div class="sc">${head('Classement',`<button class="iconbtn blue" data-go="shop">${I('sparkles')}</button>`)}${levelCard()}
 <div class="seg">${['Amis','Mon quartier','Marseille'].map(t=>`<button class="${tab===t?'on':''}" data-act="rankTab" data-v="${t}">${t}</button>`).join('')}</div>
 <div class="row" style="justify-content:space-between"><span class="muted">Semaine du 29 sept. · tu es <b>${myRank+offset}${myRank+offset===1?'re':'e'}</b> ${tab==='Amis'?'parmi tes amis':tab==='Mon quartier'?'dans le 5e':'à Marseille'}</span><span class="tiny">Remise à zéro lundi</span></div>
 <div class="podium">${podium.map((u,i)=>{const place=i===1?1:i===0?2:3;return `<button class="pod p${place}" data-go="${u.id==='me'?'profile':'user'}" data-id="${u.id}"><span class="medal">${['🥇','🥈','🥉'][place-1]}</span>${av(u,place===1?'lg':'')}<b>${u.name}</b><span class="tiny">${pts(u)} pts</span></button>`}).join('')}</div>
 <div class="list card" style="padding:0 14px">${rows.slice(3).map((u,i)=>`<div class="item ${u.id==='me'?'me-row':''}" data-go="${u.id==='me'?'profile':'user'}" data-id="${u.id}" style="cursor:pointer"><b style="width:26px;text-align:center;color:var(--ink-3);font-variant-numeric:tabular-nums">${i+4+offset}</b>${av(u)}<div class="col grow"><b style="font-size:14px">${u.id==='me'?'Toi':u.name} ${u.verified?`<span class="verified">${I('check')}</span>`:''}</b><span class="tiny">${levelOf(pts(u)).name} · ${u.sports.slice(0,2).map(s=>EMO[s[0]]).join(' ')}</span></div><b style="font-variant-numeric:tabular-nums;color:var(--navy)">${pts(u)}</b><span class="tiny" style="color:${i%3===1?'var(--bad)':'var(--good)'}">${i%3===1?'▼':'▲'}</span></div>`).join('')}</div>
 <div><div class="h3" style="margin-bottom:8px">Comment gagner des points</div><div class="card pad list" style="padding-block:2px">${[['🏃','Participer à une activité','+50'],['📣','Organiser une activité','+100'],['👋','Accueillir un nouveau membre','+30'],['🤝','Se faire un nouvel ami','+20'],['🔥','Série de 3 semaines','+150'],['✅','Profil vérifié','+100']].map(([e,t,p])=>`<div class="item"><span style="font-size:20px;width:28px;text-align:center">${e}</span><span class="grow" style="font-size:14px">${t}</span><span class="pill good">${p}</span></div>`).join('')}</div></div>
 <div><div class="h3" style="margin-bottom:8px">Derniers gains</div><div class="card pad list" style="padding-block:2px">${S.ledger.slice(0,5).map(([p,l,d])=>`<div class="item"><span class="pill ${p.startsWith('+')?'good':'bad'}" style="min-width:52px;justify-content:center">${p}</span><div class="col grow"><span style="font-size:13.5px">${l}</span><span class="tiny">${d}</span></div></div>`).join('')}</div></div>
 <button class="btn btn-primary btn-block" data-go="shop">${I('sparkles')} Dépenser mes points · Boutique</button>
 <p class="tiny" style="text-align:center">Les points récompensent la participation réelle, pas la popularité. Aucune récompense n'est achetable avec de l'argent.</p></div>`;};

SCREENS.shop=()=>{const cat=S.shopCat||'Tout';const items=SKINS.filter(s=>cat==='Tout'||s.cat===cat);
 return `<div class="sc">${head('Boutique',`<span class="pill blue" style="font-size:14px;padding:8px 14px">⭐ ${S.points} pts</span>`)}
 <div class="card pad" style="display:flex;flex-direction:column;align-items:center;gap:10px;background:linear-gradient(180deg,var(--sky),var(--surface))"><div style="padding:8px">${av('me','xl')}</div><b style="font-family:var(--fd);font-size:18px">Lola · ${levelOf(S.points).name}</b><div class="chips" style="justify-content:center">${['ring','hat','bg'].map(k=>S.equipped[k]?`<button class="chip on" data-act="equip" data-id="${S.equipped[k]}">${SK(S.equipped[k]).name} ✕</button>`:'').join('')||'<span class="tiny">Aucun skin équipé. Choisis un cadre, un accessoire ou un fond.</span>'}</div></div>
 <div class="hscroll" style="padding-bottom:4px">${['Tout','Cadres','Accessoires','Fonds'].map(c=>`<button class="chip ${cat===c?'on':''}" data-act="shopCat" data-v="${c}">${c}</button>`).join('')}</div>
 <div class="grid3" style="gap:10px">${items.map(s=>{const owned=S.owned.has(s.id);const eq=Object.values(S.equipped).includes(s.id);const can=S.points>=s.price;
  return `<button class="tile skin ${eq?'on':''}" data-act="${owned?'equip':'buy'}" data-id="${s.id}" style="padding:12px 6px 10px;gap:6px"><span style="padding:6px">${avDeco(USERS.me,'',{ring:s.ring?s.id:null,hat:s.hat?s.id:null,bg:s.bg?s.id:null})}</span><span style="font-size:11.5px;line-height:1.2">${s.name}</span>${eq?'<span class="pill blue" style="font-size:10px">Équipé</span>':owned?'<span class="pill" style="font-size:10px">Possédé</span>':`<span class="pill ${can?'good':''}" style="font-size:10px">⭐ ${s.price}</span>`}</button>`}).join('')}</div>
 <div class="card pad row" style="gap:10px;background:var(--sky);border-color:transparent">${I('sparkles')}<span class="tiny" style="color:var(--blue)">Skins 2D uniquement cosmétiques, visibles sur ton avatar, la carte des amis et le classement. Gagne des points en bougeant, pas en payant.</span></div>
 <button class="btn btn-outline btn-block" data-go="rank">${I('trend')} Voir le classement</button></div>`;};

Object.assign(ACTIONS,{
 rankTab(_,v){S.rankTab=v;render();},shopCat(_,v){S.shopCat=v;render();},
 buy(id){const s=SK(id);if(S.points<s.price){toast(`Il te manque ${s.price-S.points} points pour « ${s.name} »`,'x');return;}S.points-=s.price;S.owned.add(id);S.ledger.unshift(['−'+s.price,'Boutique · '+s.name,'maintenant']);ACTIONS.equip(id,null,true);toast(`« ${s.name} » acheté et équipé`,'sparkles');},
 equip(id,_,silent){const s=SK(id);const k=s.ring?'ring':s.hat?'hat':'bg';S.equipped[k]=S.equipped[k]===id?null:id;render();if(!silent)toast(S.equipped[k]?`« ${s.name} » équipé`:`« ${s.name} » retiré`,'check');},
});
</script>
