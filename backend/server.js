import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = 5000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_,res)=>{
  try { await pool.query("SELECT 1"); res.json({status:"ok",database:"connected"}); }
  catch(e){ res.status(500).json({status:"error"}); }
});

app.get("/api/projects", async (_,res)=>{
  const r=await pool.query("SELECT * FROM projects ORDER BY id"); res.json(r.rows);
});
app.get("/api/jobs", async (_,res)=>{
  const r=await pool.query("SELECT * FROM jobs ORDER BY id"); res.json(r.rows);
});
app.get("/api/news", async (_,res)=>{
  const r=await pool.query("SELECT * FROM news ORDER BY published_at DESC"); res.json(r.rows);
});

app.post("/api/applications", async (req,res)=>{
  const {job_id,name,email,phone,message}=req.body;
  if(!job_id||!name||!email) return res.status(400).json({error:"Job, name and email are required."});
  await pool.query(
    "INSERT INTO applications(job_id,name,email,phone,message) VALUES($1,$2,$3,$4,$5)",
    [job_id,name,email,phone||"",message||""]
  );
  res.status(201).json({message:"Application received."});
});

app.post("/api/messages", async (req,res)=>{
  const {name,email,message}=req.body;
  if(!name||!email||!message) return res.status(400).json({error:"All fields are required."});
  await pool.query("INSERT INTO messages(name,email,message) VALUES($1,$2,$3)",[name,email,message]);
  res.status(201).json({message:"Message received."});
});

app.get("/api/admin/stats", async (_,res)=>{
  const [p,j,a,m]=await Promise.all([
    pool.query("SELECT COUNT(*)::int count FROM projects"),
    pool.query("SELECT COUNT(*)::int count FROM jobs"),
    pool.query("SELECT COUNT(*)::int count FROM applications"),
    pool.query("SELECT COUNT(*)::int count FROM messages")
  ]);
  res.json({projects:p.rows[0].count,jobs:j.rows[0].count,applications:a.rows[0].count,messages:m.rows[0].count});
});

app.listen(port,()=>console.log(`API running at http://localhost:${port}`));
