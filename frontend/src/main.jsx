import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const API=import.meta.env.VITE_API_URL||"http://localhost:5000/api";

const translations={
 en:{
  about:"About",operations:"Operations",sustain:"Sustainability",news:"News",careers:"Careers",contact:"Contact",
  eyebrow:"MONGOLIA · RESPONSIBLE MINING",hero:"Resources for a stronger future.",heroText:"Building a modern Mongolian mining company through safety, technology, people and responsible resource development.",
  explore:"Explore operations →",story:"Our story",who:"WHO WE ARE",mining:"Mining with purpose.",growing:"Growing with Mongolia.",
  operationsTitle:"From the Gobi to global markets.",sustainTitle:"People. Water. Future.",careersTitle:"Build your future in Mongolia."
 },
 mn:{
  about:"Бидний тухай",operations:"Үйл ажиллагаа",sustain:"Тогтвортой хөгжил",news:"Мэдээ",careers:"Ажлын байр",contact:"Холбоо барих",
  eyebrow:"МОНГОЛ · ХАРИУЦЛАГАТАЙ УУЛ УУРХАЙ",hero:"Хүчирхэг ирээдүйн төлөө.",heroText:"Аюулгүй ажиллагаа, технологи, хүний хөгжил болон хариуцлагатай олборлолтоор Монголын орчин үеийн уул уурхайн компанийг бүтээнэ.",
  explore:"Үйл ажиллагаа →",story:"Бидний түүх",who:"БИДНИЙ ТУХАЙ",mining:"Зорилготой олборлолт.",growing:"Монголтой хамт өснө.",
  operationsTitle:"Говиос дэлхийн зах зээл рүү.",sustainTitle:"Хүн. Ус. Ирээдүй.",careersTitle:"Монголд ирээдүйгээ бүтээ."
 }
};

function App(){
 const [lang,setLang]=useState("en"),[dark,setDark]=useState(false),[projects,setProjects]=useState([]),[jobs,setJobs]=useState([]),[news,setNews]=useState([]),[selected,setSelected]=useState(null),[sent,setSent]=useState(false),[application,setApplication]=useState(null);
 const t=translations[lang];

 useEffect(()=>{Promise.all(["projects","jobs","news"].map(x=>fetch(`${API}/${x}`).then(r=>r.json()))).then(([p,j,n])=>{setProjects(p);setJobs(j);setNews(n)}).catch(console.error)},[]);

 async function sendContact(e){
  e.preventDefault();const f=new FormData(e.target);
  const r=await fetch(`${API}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(f))});
  if(r.ok){setSent(true);e.target.reset()}
 }
 async function sendApplication(e){
  e.preventDefault();const f=new FormData(e.target);
  const body=Object.fromEntries(f);body.job_id=selected.id;
  const r=await fetch(`${API}/applications`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  if(r.ok){setApplication("done");e.target.reset()}
 }

 return <div className={dark?"app darkmode":"app"}>
  <header className="nav"><a className="logo" href="#home"><span className="mark">S</span><span>STEPPE<br/><b>MINING</b></span></a>
   <nav><a href="#about">{t.about}</a><a href="#operations">{t.operations}</a><a href="#sustainability">{t.sustain}</a><a href="#news">{t.news}</a><a href="#careers">{t.careers}</a><a href="#contact">{t.contact}</a></nav>
   <div className="tools"><button onClick={()=>setLang(lang==="en"?"mn":"en")}>{lang==="en"?"MN":"EN"}</button><button onClick={()=>setDark(!dark)}>{dark?"☀":"☾"}</button></div>
  </header>

  <section id="home" className="hero"><div className="hero-inner"><div className="eyebrow">{t.eyebrow}</div><h1>{t.hero}</h1><p>{t.heroText}</p><div className="actions"><a className="btn gold" href="#operations">{t.explore}</a><a className="btn outline" href="#about">{t.story}</a></div></div><div className="hero-bottom"><span>01</span><small>GOBI REGION<br/>MONGOLIA</small></div></section>

  <section id="about" className="section about"><div className="label">01 — {t.who}</div><div><h2>{t.mining}<br/><span>{t.growing}</span></h2><p>Steppe Mining is a fictional demonstration company. The website models the digital experience of a modern Mongolian mining organization, with a focus on safety, technology, environmental stewardship and local communities.</p><div className="numbers"><div><b>50+</b><span>Years vision</span></div><div><b>24/7</b><span>Safety mindset</span></div><div><b>100%</b><span>Original demo</span></div></div></div></section>

  <section id="operations" className="section green"><div className="label">02 — OPERATIONS</div><div className="head"><h2>{t.operationsTitle}</h2><p>Explore fictional projects created for this educational website.</p></div><div className="cards">{projects.map((p,i)=><article className="project" key={p.id} onClick={()=>setSelected(p)}><span className="num">0{i+1}</span><div className="diamond">◇</div><small>{p.status.toUpperCase()}</small><h3>{lang==="mn"?p.title_mn:p.title}</h3><p>{lang==="mn"?p.description_mn:p.description}</p><footer><span>{p.location}</span><b>{p.metric}</b></footer></article>)}</div></section>

  <section id="sustainability" className="section sustainability"><div className="label">03 — {t.sustain}</div><div className="sgrid"><div><h2>{t.sustainTitle}</h2><p>Responsible resource development means protecting water, investing in people, reducing emissions and working transparently with communities.</p><a className="btn dark" href="#contact">Learn more →</a></div><div className="impact"><div><b>50 MW</b><span>Renewable target</span></div><div><b>18+</b><span>Exploration targets</span></div><div><b>99.9%</b><span>Availability target</span></div><div><b>24/7</b><span>Monitoring</span></div></div></div></section>

  <section id="news" className="section news"><div className="label">04 — {t.news}</div><h2>Inside <span>Steppe Mining.</span></h2><div className="newsgrid">{news.map(n=><article key={n.id}><small>{n.category} · {n.published_at}</small><h3>{lang==="mn"?n.title_mn:n.title}</h3><p>{n.excerpt}</p><a href="#contact">Read more →</a></article>)}</div></section>

  <section id="careers" className="section green"><div className="label">05 — {t.careers}</div><div className="head"><h2>{t.careersTitle}</h2><p>Find a role and submit an application directly to the backend database.</p></div><div className="jobs">{jobs.map(j=><div className="job" key={j.id}><div><h3>{j.title}</h3><span>{j.department} · {j.location}</span></div><b>{j.type}</b><button onClick={()=>{setSelected(j);setApplication("form")}}>Apply →</button></div>)}</div></section>

  <section id="contact" className="section contact"><div><div className="label">06 — {t.contact}</div><h2>Let's build<br/><span>what's next.</span></h2><p>Send a message through the API and it will be saved in PostgreSQL.</p></div><form onSubmit={sendContact}><input name="name" required placeholder="Name"/><input name="email" type="email" required placeholder="Email"/><textarea name="message" required placeholder="Message"></textarea><button className="btn gold">{sent?"Sent ✓":"Send message →"}</button></form></section>

  <footer><div className="logo"><span className="mark">S</span><span>STEPPE<br/><b>MINING</b></span></div><p>© 2026 Steppe Mining · Fictional educational project · Not affiliated with Oyu Tolgoi.</p></footer>

  {selected&&selected.department&&application&&<div className="modal"><div className="modalbox"><button className="close" onClick={()=>{setSelected(null);setApplication(null)}}>×</button><h2>Apply: <span>{selected.title}</span></h2>{application==="done"?<p className="success">Application submitted successfully ✓</p>:<form onSubmit={sendApplication}><input name="name" required placeholder="Full name"/><input name="email" type="email" required placeholder="Email"/><input name="phone" placeholder="Phone"/><textarea name="message" placeholder="Tell us about yourself"></textarea><button className="btn gold">Submit application →</button></form>}</div></div>}

  {selected&&!selected.department&&<div className="modal"><div className="modalbox"><button className="close" onClick={()=>setSelected(null)}>×</button><small>{selected.status}</small><h2>{lang==="mn"?selected.title_mn:selected.title}</h2><p>{lang==="mn"?selected.description_mn:selected.description}</p><b>{selected.location}</b><br/><br/><strong>{selected.metric}</strong></div></div>}
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
