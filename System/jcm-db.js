/* Local database and workbook-normalised learner records for JCM Schools. */
const JCM_SCHOOLS = {
  primary: { id: 'primary', name: 'JCM Primary School', grades: ['E.C.D A', 'E.C.D B', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'] },
  academy: { id: 'academy', name: 'JCM Academy', grades: ['E.C.D A', 'E.C.D B', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'] },
  high: { id: 'high', name: 'JCM High School', grades: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'] }
};

const ACCOUNTS = [];

const workbookNames = {
  'E.C.D A': 'Mhlanga|Chipo Chloe,Musaruro|Mya,Mumba|Asher,Mpofu|Thamusanqa,Tshuma|Thandeka,Munkuli|Theo,Sibanda|Ethan,Manyathi|Ryan,Mandicheta|Dashawn,Mberengwa|Clarity,Kamondera|Mitchel',
  'E.C.D B': 'Mabhikwa|Bayanda,Matangira|Jordan Atidaishe,Tshuma|Vuyolwethu,Mudadi|Lorraine,Sibanda|Ayden',
  'Grade 1': 'Murenjekwa|Munenyasha,Ncube|Tahanha,Ndlovu|Ordain,Mweembe|Olive,Zenzo|Marcel,Karongwa|Shayne Z,Moyo|Nomaqhawe,Mutukwa|Thandiwe,Kumurayi|Gabriela,Musaruro|Victor J,Kagumbate|Nacority,Munkuri|Blessing,Chogugudza|Linda Siphesihle',
  'Grade 2': 'Moyo|Mayidunyiswe,Kamondera|Angel,Tanyara|Salient,Ndlovu|Sibusiso,Mathe|Taylor,Shumba|Tanyaradzwa,Siziba|Sibongumusa,Tshuma|May-Keelyn,Mudadi|Saiiva,Mthembo|Leornad,Mundawaro|Kunashe,Ndlovu|Annette,Chidakwa|Cynthia,Ngoma|Imran,Moyo|Prosper,Masuku|Khanya',
  'Grade 3': 'Sibanda|Nkosimphile,Masara|Anotidaishe,Dladla|Balungile,Mashevedze|Shamiso,Nyathi|Blessing,Ngwenya|Constance,Ndou|Natalie,Ndlovu|Roland,Moyo|Ryan,Tavengwa|Teairra,Ndlovu|Anita,Gumede|Nothando,Chogugudza|Simphiwe',
  'Grade 4': 'Moyo|Nonkululeko,Murenjekwa|Natalie,Mutobaya|Aiyana,Guvakuva|Anashe,Shumba|Takudzwa,Monera|Leon,Ncube|Nakisha,Nyoni|Prince Michael',
  'Grade 5': 'Chingwesha|Nicole Tanaka,Mapfumo|Tinomukudza,Masara|Makatendeka,Masvanise|Eric,Mutemera|Stacey,Mathe|Wayne,Tshuma|Prince,Shumba|Tawanda,Wabatagore|Rutendo,Tawachera|Shammah,Dube|Kayler,Nyathi|Ntombiyenkosi,Munkuli|Praise',
  'Grade 6': 'Tarusikirwa|Anotidaishe,Hlabangana|Martin,Chingwesha|Takudzwanashe,Masocha|Tinotenda,Sithole|Alvin,Machingura|Marshal,Moyo|Malibongwe,Mathe|Micheal,Mhangi|Praise,Muza|Kimberly,Matsveru|Archie,Dokora|Latisha,Shoko|Thabisile,Mlalazi|Joyous,Ndlovu|Minenenhle,Nyoni|Prosper S,Gumede|Nomusa'
};

function makeLearners() {
  let n = 0;
  return Object.entries(workbookNames).flatMap(([grade, raw]) => raw.split(',').map((row) => {
    const [surname, forenames] = row.split('|');
    n += 1;
    const ecd = grade.startsWith('E.C.D');
    return { id: `JCM-${String(n).padStart(4, '0')}`, name: `${forenames} ${surname}`.trim(), surname, forenames, school: 'primary', campus: 'primary', grade, gender: n % 3 === 0 ? 'Female' : 'Male', guardian: `${surname} family`, phone: '', address: '', enrolled: new Date().toISOString().slice(0, 10), status: 'Active', eating: ecd && n % 2 === 0, sourceSheet: grade };
  }));
}

function blankDb() {
  return { version: 2, importedFrom: 'J_C_M_Primary_School_Updated Data.xlsx', learners: makeLearners(), payments: [], attendance: {}, messages: [], users: ACCOUNTS.map(({ password, ...u }) => ({ ...u, active: true })) };
}
function loadDb() { try { const saved = JSON.parse(localStorage.getItem('jcm-local-db-v2')); if (saved?.version === 2) return saved; } catch (_) {} const db = blankDb(); saveDb(db); return db; }
function saveDb(db) { localStorage.setItem('jcm-local-db-v2', JSON.stringify(db)); }
function feeFor(learner) { return learner.grade.startsWith('E.C.D') ? (learner.eating ? 250 : 140) : 250; }
window.JCM_PRIMARY_LEARNERS = makeLearners();
