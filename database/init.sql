CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  title_mn VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  status VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  description_mn TEXT NOT NULL,
  metric VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  type VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  title_mn VARCHAR(200) NOT NULL,
  category VARCHAR(80) NOT NULL,
  published_at DATE NOT NULL,
  excerpt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects
(title,title_mn,location,status,description,description_mn,metric)
VALUES
('Steppe Copper Project','Талын Зэсийн төсөл','Өмнөговь, Монгол','Production',
'An original fictional copper and gold operation focused on safe and responsible resource development.',
'Аюулгүй ажиллагаа, хариуцлагатай олборлолтыг зорьсон зохиомол зэс, алтны төсөл.',
'120 kt copper / year'),
('Gobi Exploration Program','Говийн хайгуулын хөтөлбөр','Өмнөд Говь','Exploration',
'Exploration program using geology, data and modern surveying to identify future resources.',
'Геологи, өгөгдөл болон орчин үеийн судалгаанд тулгуурласан хайгуулын хөтөлбөр.',
'18 active targets'),
('Green Power Initiative','Ногоон эрчим хүчний санаачилга','Говийн бүс','Development',
'A renewable-energy initiative designed to support lower-emission mining operations.',
'Уул уурхайн үйл ажиллагааны ялгарлыг бууруулахад чиглэсэн сэргээгдэх эрчим хүчний санаачилга.',
'50 MW target')
ON CONFLICT DO NOTHING;

INSERT INTO jobs(title,department,location,type)
VALUES
('Junior Software Developer','Technology','Ulaanbaatar','Full-time'),
('Mining Engineer','Operations','Ömnögovi','Full-time'),
('Environmental Specialist','Sustainability','Ömnögovi','Full-time'),
('Community Relations Officer','Community','Ömnögovi','Full-time'),
('Heavy Equipment Technician','Maintenance','Ömnögovi','Full-time')
ON CONFLICT DO NOTHING;

INSERT INTO news(title,title_mn,category,published_at,excerpt)
VALUES
('New community skills program launched','Орон нутгийн ур чадварын шинэ хөтөлбөр эхэллээ','Community','2026-09-18','A fictional technical and digital skills program for young people.'),
('Water monitoring results published','Усны мониторингийн мэдээлэл нийтлэгдлээ','Environment','2026-09-04','An overview of water monitoring and responsible resource management.'),
('Digital operations center opens','Дижитал үйл ажиллагааны төв нээгдлээ','Technology','2026-08-21','A modern operations center combines data, automation and safety systems.')
ON CONFLICT DO NOTHING;
