const state = {
  des: null,
  language: null,
  diploma: null,
  traits: [],
  sliders: {
    motivation: 3,
    math: 3,
    english: 3,
    availability: 3,
    pace: 3
  },
  career: null,
  universityType: null,
  selectedUniversities: [],
  plar: {
    homeschooling: false,
    projects: false,
    work: false,
    selfLearning: false,
    portfolios: false
  },
  checklist: {}
};

function resetState() {
  state.des = null;
  state.language = null;
  state.diploma = null;
  state.traits = [];
  state.sliders = { motivation: 3, math: 3, english: 3, availability: 3, pace: 3 };
  state.career = null;
  state.universityType = null;
  state.selectedUniversities = [];
  state.plar = { homeschooling: false, projects: false, work: false, selfLearning: false, portfolios: false };
  state.checklist = {};
}

let currentStep = 0;

const steps = [
  { title: "AS-TU DÉJÀ UN DES ?", eyebrow: "Point de départ", render: renderDes },
  { title: "LANGUE PRINCIPALE D'ÉTUDES", eyebrow: "Langue", render: renderLanguage },
  { title: "TYPE DE DIPLÔME", eyebrow: "Diplôme cible", render: renderDiploma },
  { title: "PROFIL DE L'ÉLÈVE", eyebrow: "Profil", render: renderProfile },
  { title: "OBJECTIF CARRIÈRE", eyebrow: "Objectif", render: renderCareer },
  { title: "TYPE D'UNIVERSITÉ", eyebrow: "Sélectivité", render: renderUniversityType },
  { title: "UNIVERSITÉS COMPATIBLES", eyebrow: "Recommandations", render: renderUniversities },
  { title: "ÉCOLES RECOMMANDÉES", eyebrow: "Écoles", render: renderSchools },
  { title: "PLAR / CRÉDITS", eyebrow: "Crédits possibles", render: renderPlar },
  { title: "STRATÉGIE RECOMMANDÉE", eyebrow: "Roadmap", render: renderRoadmap },
  { title: "CHECKLIST OFFICIELLE", eyebrow: "Vérifications", render: renderChecklist },
  { title: "RÉSUMÉ FINAL", eyebrow: "Ton parcours", render: renderSummary }
];

const options = {
  des: [
    ["oui", "OUI", "Parcours post-DES: universités, préalables et équivalences à valider."],
    ["non", "NON", "Parcours secondaire complet en ligne: diplôme, crédits, rythme et soutien."]
  ],
  language: [
    ["francais", "FRANÇAIS", "Clonlara ou soutien francophone possible. Accès Québec à évaluer au cas par cas."],
    ["anglais", "ANGLAIS", "OSSD, universités ontariennes, options USA, AP et SAT possibles."]
  ],
  diploma: [
    ["ossd", "OSSD", "Diplôme secondaire de l'Ontario, pertinent pour Canada, USA et parcours AP."],
    ["us", "US Diploma", "Diplôme américain, pertinent pour Common App, NCAA, AP/SAT et universités USA."]
  ],
  career: [
    ["stem", "Sciences / Génie / Santé", "Profil compétitif: notes élevées, AP et préalables à planifier."],
    ["business", "Business / Comptabilité", "Math, anglais académique et dossiers d'admission solides."],
    ["law", "Juridique / Politique", "Parcours souvent indirect: premier cycle, exigences variables."],
    ["humanities", "Littéraire / Sciences humaines", "Souplesse possible, lecture-écriture et portfolio académique utiles."],
    ["arts", "Arts / Créatif", "Portfolio, projets et écoles flexibles peuvent compter fortement."],
    ["tech", "Informatique / Technologie", "Math, projets, AP CS ou portfolio technique recommandés."]
  ],
  universityType: [
    ["canada-flex", "Canada - Flexible / Open", "Athabasca, Thompson Rivers Open Learning, Royal Roads."],
    ["canada-standard", "Canada - Standard", "York, TMU, Ottawa, Carleton."],
    ["canada-competitive", "Canada - Competitive", "Waterloo, UofT, McMaster, UBC, McGill."],
    ["quebec-fr", "Québec francophone", "UdeM, Laval, Sherbrooke. Conditions variables."],
    ["usa-flex", "USA - Flexible", "SNHU, ASU Online, Purdue Global."],
    ["usa-standard", "USA - Standard", "Oregon State, Arizona, Penn State."],
    ["usa-competitive", "USA - Competitive", "NYU, Georgia Tech, Boston University."],
    ["usa-top", "Ivy League / Top USA", "Harvard, MIT, Stanford, Yale, Princeton."]
  ],
  traits: [
    "Autonome",
    "Besoin d'encadrement",
    "Créatif",
    "Scientifique",
    "Littéraire",
    "Technologique",
    "Fast-track",
    "Anxieux face aux examens",
    "International"
  ]
};

const universities = [
  { name: "Athabasca University", group: "canada-flex", fit: ["Autonome", "International"], text: "Option ouverte et flexible. Valider exigences du programme précis.", url: "https://www.athabascau.ca/admissions/", fees: "~700–900 CAD/cours", currency: "CAD" },
  { name: "Thompson Rivers Open Learning", group: "canada-flex", fit: ["Autonome"], text: "Souplesse élevée, utile pour transition ou reprise de préalables.", url: "https://www.tru.ca/distance/apply.html", fees: "~700–900 CAD/cours", currency: "CAD" },
  { name: "Royal Roads", group: "canada-flex", fit: ["Créatif"], text: "Approches appliquées selon programme, admission à vérifier.", url: "https://www.royalroads.ca/admissions", fees: "~800–1 200 CAD/cours", currency: "CAD" },
  { name: "York University", group: "canada-standard", fit: ["Littéraire", "Business / Comptabilité"], text: "Option standard en Ontario. OSSD souvent lisible, préalables variables.", url: "https://futurestudents.yorku.ca/apply", fees: "~30 000–38 000 CAD/an", currency: "CAD" },
  { name: "TMU", group: "canada-standard", fit: ["Créatif", "Technologique"], text: "Programmes appliqués et urbains. Portfolio parfois requis.", url: "https://www.torontomu.ca/admissions/", fees: "~26 000–36 000 CAD/an", currency: "CAD" },
  { name: "University of Ottawa", group: "canada-standard", fit: ["Littéraire"], text: "Bilinguisme institutionnel possible selon programme, exigences à confirmer.", url: "https://www.uottawa.ca/en/admissions", fees: "~28 000–36 000 CAD/an", currency: "CAD" },
  { name: "Carleton", group: "canada-standard", fit: ["Juridique / Politique", "Technologique"], text: "Bon alignement politiques publiques, médias, informatique.", url: "https://admissions.carleton.ca/", fees: "~26 000–33 000 CAD/an", currency: "CAD" },
  { name: "Waterloo", group: "canada-competitive", fit: ["Scientifique", "Technologique", "Fast-track"], text: "Très compétitif en STEM. AP, math avancée et notes élevées recommandées.", url: "https://uwaterloo.ca/future-students/admissions", fees: "~30 000–58 000 CAD/an", currency: "CAD" },
  { name: "University of Toronto", group: "canada-competitive", fit: ["Scientifique", "Littéraire"], text: "Admission compétitive. Exigences par campus et programme.", url: "https://admissions.utoronto.ca/", fees: "~42 000–62 000 CAD/an", currency: "CAD" },
  { name: "McMaster", group: "canada-competitive", fit: ["Scientifique"], text: "Santé et sciences très sélectives. Ne pas simplifier les préalables.", url: "https://future.mcmaster.ca/admissions/", fees: "~31 000–47 000 CAD/an", currency: "CAD" },
  { name: "UBC", group: "canada-competitive", fit: ["International", "Scientifique"], text: "Profil global solide requis. Exigences et suppléments à vérifier.", url: "https://you.ubc.ca/applying-ubc/", fees: "~36 000–56 000 CAD/an", currency: "CAD" },
  { name: "McGill", group: "canada-competitive", fit: ["Scientifique", "International"], text: "Reconnaissance et équivalences variables pour candidats non traditionnels.", url: "https://www.mcgill.ca/applying/", fees: "~21 000–46 000 CAD/an", currency: "CAD" },
  { name: "UdeM", group: "quebec-fr", fit: ["Littéraire", "Scientifique"], text: "Conditions variables: DEC, préalables, année préparatoire ou étude individuelle.", url: "https://admission.umontreal.ca/", fees: "~8 000–26 000 CAD/an", currency: "CAD" },
  { name: "Laval", group: "quebec-fr", fit: ["Littéraire", "Scientifique"], text: "Vérification individuelle requise, surtout pour profils sans DEC.", url: "https://www.ulaval.ca/admission", fees: "~7 000–25 000 CAD/an", currency: "CAD" },
  { name: "Sherbrooke", group: "quebec-fr", fit: ["Scientifique", "Business / Comptabilité"], text: "Accès selon programme et dossier. Équivalences à confirmer.", url: "https://www.usherbrooke.ca/admission/", fees: "~7 000–21 000 CAD/an", currency: "CAD" },
  { name: "SNHU", group: "usa-flex", fit: ["Autonome"], text: "Flexible et accessible selon programme. Valider reconnaissance externe.", url: "https://www.snhu.edu/admission", fees: "~9 600–12 000 USD/an", currency: "USD" },
  { name: "ASU Online", group: "usa-flex", fit: ["Technologique", "International"], text: "Large offre en ligne. Exigences précises selon programme.", url: "https://asuonline.asu.edu/admissions/", fees: "~10 000–12 500 USD/an", currency: "USD" },
  { name: "Purdue Global", group: "usa-flex", fit: ["Business / Comptabilité"], text: "Option flexible. Bien vérifier objectifs professionnels.", url: "https://www.purdueglobal.edu/admissions/", fees: "~12 000–15 000 USD/an", currency: "USD" },
  { name: "Oregon State", group: "usa-standard", fit: ["Technologique", "Scientifique"], text: "Option USA standard avec parcours en ligne dans certains domaines.", url: "https://admissions.oregonstate.edu/", fees: "~30 000–33 000 USD/an", currency: "USD" },
  { name: "University of Arizona", group: "usa-standard", fit: ["Business / Comptabilité", "Arts / Créatif"], text: "Options variées, dossier international à valider.", url: "https://admissions.arizona.edu/", fees: "~29 000–36 000 USD/an", currency: "USD" },
  { name: "Penn State", group: "usa-standard", fit: ["International"], text: "World Campus et options standards. Conditions par programme.", url: "https://admissions.psu.edu/", fees: "~36 000–42 000 USD/an", currency: "USD" },
  { name: "NYU", group: "usa-competitive", fit: ["Arts / Créatif", "Business / Comptabilité"], text: "Compétitif, portfolio ou supplément possible selon faculté.", url: "https://www.nyu.edu/admissions/undergraduate-admissions.html", fees: "~57 000–62 000 USD/an", currency: "USD" },
  { name: "Georgia Tech", group: "usa-competitive", fit: ["Technologique", "Scientifique"], text: "Très fort en tech/STEM. Math, AP et projets recommandés.", url: "https://admission.gatech.edu/", fees: "~32 000–36 000 USD/an", currency: "USD" },
  { name: "Boston University", group: "usa-competitive", fit: ["International", "Scientifique"], text: "Compétitif, dossier académique et activités importantes.", url: "https://www.bu.edu/admissions/", fees: "~57 000–63 000 USD/an", currency: "USD" },
  { name: "Harvard", group: "usa-top", fit: ["International"], text: "Admissions ultra compétitives. Aucun parcours ne garantit l'accès.", url: "https://college.harvard.edu/admissions", fees: "~57 000–62 000 USD/an*", currency: "USD" },
  { name: "MIT", group: "usa-top", fit: ["Scientifique", "Technologique"], text: "Admissions ultra compétitives, niveau STEM exceptionnel attendu.", url: "https://mitadmissions.org/", fees: "~57 000–62 000 USD/an*", currency: "USD" },
  { name: "Stanford", group: "usa-top", fit: ["Technologique", "Créatif"], text: "Admissions ultra compétitives, impact et excellence requis.", url: "https://admission.stanford.edu/", fees: "~57 000–62 000 USD/an*", currency: "USD" },
  { name: "Yale", group: "usa-top", fit: ["Littéraire", "International"], text: "Admissions ultra compétitives, profil global exceptionnel.", url: "https://admissions.yale.edu/", fees: "~57 000–62 000 USD/an*", currency: "USD" },
  { name: "Princeton", group: "usa-top", fit: ["Scientifique", "Littéraire"], text: "Admissions ultra compétitives, exigences académiques très élevées.", url: "https://admission.princeton.edu/", fees: "~57 000–62 000 USD/an*", currency: "USD" }
];

const schools = [
  { name: "VHS", diploma: "ossd", pacing: "Flexible", support: "Moyen", ap: "Certains cours avancés", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Autonome, OSSD Ontario" },
  { name: "Blyth", diploma: "ossd", pacing: "Structuré", support: "Élevé", ap: "Options possibles", ncaa: "À vérifier", language: "Anglais", cost: "$$$", ideal: "Besoin d'encadrement" },
  { name: "OVS", diploma: "ossd", pacing: "Très flexible", support: "Moyen", ap: "Options selon offre", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Fast-track, autonome" },
  { name: "OES", diploma: "ossd", pacing: "Flexible", support: "Moyen", ap: "À confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Rythme progressif" },
  { name: "OEO", diploma: "ossd", pacing: "Flexible", support: "Variable", ap: "À confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Budget contrôlé" },
  { name: "KAI Global", diploma: "ossd", pacing: "Accompagné", support: "Élevé", ap: "À confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$$$", ideal: "International, encadrement" },
  { name: "Clonlara", diploma: "us", pacing: "Personnalisé", support: "Élevé", ap: "Selon plan", ncaa: "À vérifier", language: "Français possible", cost: "$$$", ideal: "Créatif, français, projets" },
  { name: "Laurel Springs", diploma: "us", pacing: "Structuré", support: "Élevé", ap: "Disponible", ncaa: "Souvent pertinent, vérifier", language: "Anglais", cost: "$$$$", ideal: "Université USA compétitive" },
  { name: "Dwight Global", diploma: "us", pacing: "Rigoureux", support: "Élevé", ap: "Disponible", ncaa: "À vérifier", language: "Anglais", cost: "$$$$", ideal: "International ambitieux" },
  { name: "Crimson Global Academy", diploma: "us", pacing: "Accéléré", support: "Élevé", ap: "Fort", ncaa: "À vérifier", language: "Anglais", cost: "$$$$", ideal: "Top USA, AP" },
  { name: "Excel HS", diploma: "us", pacing: "Flexible", support: "Moyen", ap: "Limité/à confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$", ideal: "Budget et autonomie" },
  { name: "American School", diploma: "us", pacing: "Traditionnel", support: "Moyen", ap: "À confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Parcours classique" },
  { name: "Ogburn", diploma: "us", pacing: "Flexible", support: "Moyen", ap: "À confirmer", ncaa: "À vérifier", language: "Anglais", cost: "$$", ideal: "Rythme indépendant" }
];

function render() {
  const step = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  document.getElementById("stepLabel").textContent = `Étape ${currentStep + 1} sur ${steps.length}`;
  document.getElementById("progressPercent").textContent = `${progress}%`;
  document.getElementById("progressBar").style.width = `${progress}%`;
  document.getElementById("screen").innerHTML = "";
  document.getElementById("screen").appendChild(step.render(step));
  document.getElementById("prevBtn").disabled = currentStep === 0;
  document.getElementById("nextBtn").textContent = currentStep === steps.length - 1 ? "Recommencer" : "Continuer";
  document.getElementById("nextBtn").disabled = !canContinue();
  updateInsight();
}

function screenShell(step, subcopy, warning) {
  const shell = document.createElement("div");
  const header = document.createElement("div");
  header.className = "screen-header";
  header.innerHTML = `
    <p class="eyebrow">${step.eyebrow}</p>
    <h1>${step.title}</h1>
    <p class="subcopy">${subcopy}</p>
    ${warning ? `<div class="warning">${warning}</div>` : ""}
  `;
  shell.appendChild(header);
  return shell;
}

function renderChoiceStep(step, key, list, subcopy, warning, columns = "") {
  const shell = screenShell(step, subcopy, warning);
  const grid = document.createElement("div");
  grid.className = `choices ${columns}`;
  list.forEach(([value, title, body]) => {
    grid.appendChild(choiceCard(title, body, state[key] === value, () => {
      state[key] = value;
      render();
    }));
  });
  shell.appendChild(grid);
  return shell;
}

function choiceCard(title, body, selected, onClick) {
  const template = document.getElementById("choiceTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector(".choice-title").textContent = title;
  node.querySelector(".choice-body").textContent = body;
  node.classList.toggle("selected", selected);
  node.addEventListener("click", onClick);
  return node;
}

function renderDes(step) {
  return renderChoiceStep(step, "des", options.des, "Ce choix ajuste le niveau de prudence: avec DES, le simulateur se concentre sur universités et équivalences; sans DES, il construit un parcours secondaire complet.", null);
}

function renderLanguage(step) {
  const warning = state.language === "francais" ? "Vérification individuelle requise" : null;
  return renderChoiceStep(step, "language", options.language, "Choisissez une seule langue principale. Les options francophones au Québec exigent souvent une analyse individuelle, surtout hors DEC.", warning);
}

function renderDiploma(step) {
  return renderChoiceStep(step, "diploma", options.diploma, "Le diplôme influence les écoles recommandées, les universités compatibles et la stratégie AP/SAT.", null);
}

function renderProfile(step) {
  const shell = screenShell(step, "Sélection multiple: le profil influence le rythme, le niveau d'encadrement, les AP recommandés et les avertissements.", null);
  const grid = document.createElement("div");
  grid.className = "choices multi";
  options.traits.forEach((trait) => {
    grid.appendChild(choiceCard(trait, profileBody(trait), state.traits.includes(trait), () => {
      state.traits = toggle(state.traits, trait);
      render();
    }));
  });
  shell.appendChild(grid);

  const controls = document.createElement("div");
  controls.className = "controls-grid";
  [
    ["motivation", "Motivation"],
    ["math", "Math"],
    ["english", "Anglais"],
    ["availability", "Disponibilité"],
    ["pace", "Rythme"]
  ].forEach(([key, label]) => {
    const box = document.createElement("div");
    box.className = "slider-box";
    box.innerHTML = `<label><span>${label}</span><b>${state.sliders[key]}/5</b></label><input type="range" min="1" max="5" value="${state.sliders[key]}" />`;
    box.querySelector("input").addEventListener("input", (event) => {
      state.sliders[key] = Number(event.target.value);
      render();
    });
    controls.appendChild(box);
  });
  shell.appendChild(controls);
  return shell;
}

function profileBody(trait) {
  const map = {
    "Autonome": "Peut soutenir un parcours flexible.",
    "Besoin d'encadrement": "Favorise écoles structurées et suivi élevé.",
    "Créatif": "Portfolio, projets et approche personnalisée.",
    "Scientifique": "Math, sciences, AP et préalables importants.",
    "Littéraire": "Lecture, rédaction et sciences humaines.",
    "Technologique": "Projets, informatique et math appliquée.",
    "Fast-track": "Rythme accéléré avec risque de surcharge.",
    "Anxieux face aux examens": "Prévoir rythme doux et évaluations préparées.",
    "International": "Dossier lisible pour plusieurs systèmes."
  };
  return map[trait];
}

function renderCareer(step) {
  const warning = state.career === "stem" ? "AP recommandés, notes élevées, préalables variables et admissions compétitives." : null;
  return renderChoiceStep(step, "career", options.career, "L'objectif de carrière module la compétitivité et les préalables. Les domaines professionnels doivent être validés programme par programme.", warning, "three");
}

function renderUniversityType(step) {
  const warning = ["quebec-fr", "usa-top"].includes(state.universityType)
    ? state.universityType === "quebec-fr"
      ? "Conditions variables — vérification individuelle requise"
      : "Admissions ultra compétitives"
    : null;
  return renderChoiceStep(step, "universityType", options.universityType, "Choisissez une catégorie cible. Le simulateur filtre ensuite des options réalistes et garde les avertissements visibles.", warning, "three");
}

function getCompatibilityInfo(score) {
  const percent = Math.min(95, 25 + score * 18);
  if (percent >= 75) return { percent, badge: "Très compatible", badgeClass: "compat-high" };
  if (percent >= 50) return { percent, badge: "Compatible", badgeClass: "compat-mid" };
  return { percent, badge: "Possible avec conditions", badgeClass: "compat-low" };
}

function renderUniversities(step) {
  const shell = screenShell(step, "Sélectionnez une ou plusieurs universités compatibles. Les résultats sont filtrés selon votre profil. Aucune garantie d'admission.", universityWarning());

  const selectionInfo = document.createElement("p");
  selectionInfo.className = "selection-hint";
  selectionInfo.textContent = state.selectedUniversities.length
    ? `${state.selectedUniversities.length} université(s) sélectionnée(s)`
    : "Cliquez sur une carte pour sélectionner.";
  shell.appendChild(selectionInfo);

  const grid = document.createElement("div");
  grid.className = "results-grid";

  getRecommendedUniversities().forEach((uni) => {
    const compat = getCompatibilityInfo(uni.score);
    const isSelected = state.selectedUniversities.includes(uni.name);
    const card = document.createElement("article");
    card.className = "university-card" + (isSelected ? " selected" : "");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="card-header-row">
        <h3 class="card-title">${uni.name}</h3>
        <span class="compat-badge ${compat.badgeClass}">${compat.badge}</span>
      </div>
      <div class="compat-bar-wrap">
        <div class="compat-bar" style="width:${compat.percent}%" data-class="${compat.badgeClass}"></div>
        <span class="compat-percent">${compat.percent}%</span>
      </div>
      <p class="card-text">${uni.text}</p>
      <div class="card-meta-row">
        <span class="card-fees">💰 ${uni.fees}</span>
        <a class="card-link" href="${uni.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Admissions officielles ↗</a>
      </div>
      <div class="tag-row">
        <span class="tag green">${labelUniversityGroup(uni.group)}</span>
        ${getRiskTags().map((tag) => `<span class="tag ${tag.tone}">${tag.text}</span>`).join("")}
      </div>
      ${isSelected ? '<div class="selected-check">✓ Sélectionnée</div>' : ''}
    `;
    card.addEventListener("click", () => {
      state.selectedUniversities = toggle(state.selectedUniversities, uni.name);
      render();
    });
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); } });
    grid.appendChild(card);
  });
  shell.appendChild(grid);
  return shell;
}

function getRecommendedUniversities() {
  const selectedGroup = state.universityType;
  const careerLabel = getCareerTitle();
  let pool = universities.filter((uni) => uni.group === selectedGroup);
  if (!pool.length) pool = universities.filter((uni) => compatibleCountry(uni.group));

  const scored = pool.map((uni) => ({
    ...uni,
    score: uni.fit.filter((fit) => state.traits.includes(fit) || fit === careerLabel).length
      + (state.sliders.math >= 4 && uni.fit.includes("Scientifique") ? 1 : 0)
      + (state.sliders.english >= 4 && uni.group.startsWith("usa") ? 1 : 0)
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

function compatibleCountry(group) {
  if (state.diploma === "ossd") return group.startsWith("canada") || group === "quebec-fr";
  if (state.diploma === "us") return group.startsWith("usa") || group === "canada-flex";
  return true;
}

function renderSchools(step) {
  const shell = screenShell(step, "Écoles filtrées par diplôme. Les détails comme AP, NCAA, coûts et accréditation doivent être vérifiés directement.", null);
  const grid = document.createElement("div");
  grid.className = "results-grid";
  getRecommendedSchools().forEach((school) => {
    const card = document.createElement("article");
    card.className = "school-card";
    card.innerHTML = `
      <h3 class="card-title">${school.name}</h3>
      <div class="school-ideal">${school.ideal}</div>
      <div class="tag-row">
        <span class="tag green">${school.pacing}</span>
        <span class="tag">${school.support}</span>
        <span class="tag gold">${school.cost}</span>
        <span class="tag">${school.language}</span>
        <span class="tag">${school.ap}</span>
        <span class="tag red">${school.ncaa}</span>
      </div>
    `;
    grid.appendChild(card);
  });
  shell.appendChild(grid);
  return shell;
}

function getRecommendedSchools() {
  const preferred = state.diploma || "ossd";
  return schools
    .filter((school) => school.diploma === preferred)
    .sort((a, b) => schoolScore(b) - schoolScore(a))
    .slice(0, 6);
}

function schoolScore(school) {
  let score = 0;
  if (state.traits.includes("Besoin d'encadrement") && school.support === "Élevé") score += 2;
  if (state.traits.includes("Fast-track") && school.pacing.includes("Flexible")) score += 2;
  if (state.language === "francais" && school.language.includes("Français")) score += 3;
  if (state.career === "stem" && school.ap.includes("Disponible")) score += 2;
  return score;
}

function renderPlar(step) {
  const shell = screenShell(step, "Estimateur éducatif: les crédits réels dépendent de l'école, du dossier et de l'évaluation officielle.", null);
  const wrap = document.createElement("div");
  wrap.className = "plar-grid";
  const list = document.createElement("div");
  list.className = "check-list";
  [
    ["homeschooling", "Instruction à domicile"],
    ["projects", "Projets documentés"],
    ["work", "Expérience de travail"],
    ["selfLearning", "Auto-apprentissage"],
    ["portfolios", "Portfolio ou preuves"]
  ].forEach(([key, label]) => {
    const row = document.createElement("label");
    row.className = "check-card";
    row.innerHTML = `<input type="checkbox" ${state.plar[key] ? "checked" : ""} /><strong>${label}</strong>`;
    row.querySelector("input").addEventListener("change", (event) => {
      state.plar[key] = event.target.checked;
      render();
    });
    list.appendChild(row);
  });

  const estimate = getPlarEstimate();
  const summary = document.createElement("article");
  summary.className = "summary-card";
  summary.innerHTML = `
    <h3 class="card-title">${estimate.credits} crédits possibles</h3>
    <p class="card-text">Économie potentielle: ${estimate.savings}. Réduction de temps: ${estimate.time}.</p>
    <div class="tag-row">
      <span class="tag red">Estimation non officielle</span>
      <span class="tag">Évaluation requise</span>
    </div>
  `;
  wrap.appendChild(list);
  wrap.appendChild(summary);
  shell.appendChild(wrap);
  return shell;
}

function getPlarEstimate() {
  const count = Object.values(state.plar).filter(Boolean).length;
  return {
    credits: count === 0 ? "0 à 2" : `${Math.max(1, count * 2)} à ${Math.min(16, count * 4)}`,
    savings: count < 2 ? "faible" : count < 4 ? "modérée" : "significative, à confirmer",
    time: count < 2 ? "limitée" : count < 4 ? "quelques mois possibles" : "plusieurs mois possibles"
  };
}

function renderRoadmap(step) {
  const shell = screenShell(step, "Roadmap personnalisée selon vos réponses. Elle doit être relue avec les écoles et universités visées.", roadmapWarning());
  const grid = document.createElement("div");
  grid.className = "roadmap";
  getRoadmap().forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "roadmap-step";
    card.innerHTML = `<b>${index + 1}</b><h3 class="card-title">${item}</h3>`;
    grid.appendChild(card);
  });
  shell.appendChild(grid);
  return shell;
}

function getRoadmap() {
  const route = [];
  route.push(state.diploma === "us" ? "US Diploma" : "OSSD");
  if (state.des === "non") route.push("Plan de crédits secondaires");
  route.push("PLAR / crédits à évaluer");
  if (state.career === "stem" || state.traits.includes("Scientifique")) route.push("AP Calculus / sciences");
  if (state.diploma === "us" || String(state.universityType).startsWith("usa")) route.push("SAT / Common App");
  if (state.diploma === "ossd" && String(state.universityType).startsWith("canada")) route.push("OUAC");
  if (state.language === "francais" || state.universityType === "quebec-fr") route.push("Équivalences Québec");
  route.push("Universités contactées");
  return route.slice(0, 6);
}

function renderChecklist(step) {
  const shell = screenShell(step, "Avant toute décision, confirmez les informations auprès des organismes et institutions. Cette checklist garde le simulateur du bon côté de la prudence.", null);
  const list = document.createElement("div");
  list.className = "check-list";
  [
    "BSID verified",
    "Accreditation verified",
    "University contacted",
    "Prerequisites verified",
    "NCAA verified",
    "Equivalencies confirmed"
  ].forEach((label) => {
    const row = document.createElement("label");
    row.className = "check-card";
    row.innerHTML = `<input type="checkbox" ${state.checklist[label] ? "checked" : ""} /><strong>${label}</strong>`;
    row.querySelector("input").addEventListener("change", (event) => {
      state.checklist[label] = event.target.checked;
    });
    list.appendChild(row);
  });
  shell.appendChild(list);
  return shell;
}

function renderSummary(step) {
  const shell = screenShell(step, "Voici ton parcours complet généré par le simulateur. Imprime ou note les informations importantes avant de recommencer.", null);

  const wrap = document.createElement("div");
  wrap.className = "summary-screen";

  const banner = document.createElement("div");
  banner.className = "summary-banner";
  banner.innerHTML = `
    <div class="summary-banner-icon">🎓</div>
    <div class="summary-banner-text">
      <h2>Parcours généré avec succès</h2>
      <p>Ce résumé est informatif et suggestif uniquement. Toutes les conditions doivent être vérifiées directement auprès des institutions.</p>
    </div>
  `;
  wrap.appendChild(banner);

  const cols = document.createElement("div");
  cols.className = "summary-cols";

  const profileBlock = document.createElement("div");
  profileBlock.className = "summary-block";
  const diplomaLabel = state.diploma === "ossd" ? "OSSD" : state.diploma === "us" ? "US Diploma" : "—";
  const langLabel = state.language === "francais" ? "Français" : state.language === "anglais" ? "Anglais" : "—";
  const careerLabel = state.career ? (options.career.find(([v]) => v === state.career) || [null, "—"])[1] : "—";
  const desLabel = state.des === "oui" ? "Oui" : state.des === "non" ? "Non" : "—";
  const uniTypeLabel = state.universityType ? labelUniversityGroup(state.universityType) : "—";
  profileBlock.innerHTML = `
    <p class="summary-block-title">👤 Profil</p>
    <div class="summary-profile-row">
      <span class="tag">DES: <strong>${desLabel}</strong></span>
      <span class="tag green">Diplôme: <strong>${diplomaLabel}</strong></span>
      <span class="tag">Langue: <strong>${langLabel}</strong></span>
      <span class="tag gold">Carrière: <strong>${careerLabel}</strong></span>
      <span class="tag">Université: <strong>${uniTypeLabel}</strong></span>
      ${state.traits.map(t => `<span class="tag">${t}</span>`).join("")}
    </div>
  `;
  cols.appendChild(profileBlock);

  const plarEstimate = getPlarEstimate();
  const slidersSummary = Object.entries(state.sliders).map(([k, v]) => {
    const labels = { motivation: "Motivation", math: "Math", english: "Anglais", availability: "Dispo", pace: "Rythme" };
    return `<span class="tag">${labels[k]}: ${v}/5</span>`;
  }).join("");
  const plarBlock = document.createElement("div");
  plarBlock.className = "summary-block";
  plarBlock.innerHTML = `
    <p class="summary-block-title">📊 Niveaux & PLAR</p>
    <div class="summary-profile-row">${slidersSummary}</div>
    <div class="summary-profile-row">
      <span class="tag green">Crédits PLAR estimés: <strong>${plarEstimate.credits}</strong></span>
      <span class="tag">Économie: <strong>${plarEstimate.savings}</strong></span>
      <span class="tag">Réduction temps: <strong>${plarEstimate.time}</strong></span>
    </div>
  `;
  cols.appendChild(plarBlock);

  const uniBlock = document.createElement("div");
  uniBlock.className = "summary-block";
  const uniContent = document.createElement("div");
  uniContent.className = "summary-checklist-list";
  const uniPool = getRecommendedUniversities();
  if (state.selectedUniversities.length > 0) {
    state.selectedUniversities.forEach(name => {
      const uni = uniPool.find(u => u.name === name);
      const compat = uni ? getCompatibilityInfo(uni.score) : null;
      const row = document.createElement("div");
      row.className = "summary-uni-item";
      row.innerHTML = `
        <div class="summary-uni-left">
          <span class="summary-uni-name">${name}</span>
          ${uni && uni.fees ? `<span class="summary-uni-fees">💰 ${uni.fees}</span>` : ""}
        </div>
        <div class="summary-uni-right">
          ${compat ? `<span class="compat-badge ${compat.badgeClass}">${compat.percent}%</span>` : ""}
          ${uni && uni.url ? `<a class="summary-uni-link" href="${uni.url}" target="_blank" rel="noopener noreferrer">↗</a>` : ""}
        </div>
      `;
      uniContent.appendChild(row);
    });
  } else {
    const allTop = uniPool.slice(0, 3);
    allTop.forEach(uni => {
      const compat = getCompatibilityInfo(uni.score);
      const row = document.createElement("div");
      row.className = "summary-uni-item";
      row.innerHTML = `
        <div class="summary-uni-left">
          <span class="summary-uni-name">${uni.name}</span>
          ${uni.fees ? `<span class="summary-uni-fees">💰 ${uni.fees}</span>` : ""}
        </div>
        <div class="summary-uni-right">
          <span class="compat-badge ${compat.badgeClass}">${compat.percent}%</span>
          ${uni.url ? `<a class="summary-uni-link" href="${uni.url}" target="_blank" rel="noopener noreferrer">↗</a>` : ""}
        </div>
      `;
      uniContent.appendChild(row);
    });
    const note = document.createElement("p");
    note.className = "summary-empty";
    note.textContent = "Aucune université sélectionnée manuellement — top 3 affiché.";
    uniContent.appendChild(note);
  }
  uniBlock.innerHTML = `<p class="summary-block-title">🏛️ Universités ciblées</p>`;
  uniBlock.appendChild(uniContent);
  cols.appendChild(uniBlock);

  const roadmapBlock = document.createElement("div");
  roadmapBlock.className = "summary-block";
  const roadmapList = document.createElement("div");
  roadmapList.className = "summary-roadmap-list";
  getRoadmap().forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "summary-roadmap-item";
    row.innerHTML = `<span class="summary-roadmap-num">${i + 1}</span>${item}`;
    roadmapList.appendChild(row);
  });
  roadmapBlock.innerHTML = `<p class="summary-block-title">🗺️ Roadmap</p>`;
  roadmapBlock.appendChild(roadmapList);
  cols.appendChild(roadmapBlock);

  const checklistItems = [
    "BSID verified", "Accreditation verified", "University contacted",
    "Prerequisites verified", "NCAA verified", "Equivalencies confirmed"
  ];
  const checkBlock = document.createElement("div");
  checkBlock.className = "summary-block";
  const checkList = document.createElement("div");
  checkList.className = "summary-checklist-list";
  checklistItems.forEach(label => {
    const done = Boolean(state.checklist[label]);
    const row = document.createElement("div");
    row.className = "summary-checklist-item " + (done ? "done" : "todo");
    row.innerHTML = `
      <span class="summary-check-icon ${done ? "done" : "todo"}">${done ? "✓" : "○"}</span>
      ${label}
    `;
    checkList.appendChild(row);
  });
  checkBlock.innerHTML = `<p class="summary-block-title">✅ Checklist</p>`;
  checkBlock.appendChild(checkList);
  cols.appendChild(checkBlock);

  wrap.appendChild(cols);

  const verifSection = document.createElement("div");
  verifSection.className = "warning-section";
  verifSection.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">⚠️</span>
      <div>
        <h3 class="warning-section-title">Vérifications obligatoires</h3>
        <p class="warning-section-sub">Ces points doivent être confirmés directement auprès des institutions avant toute décision.</p>
      </div>
    </div>
    <div class="verif-grid">
      ${[
        ["🏛️", "Accréditation", "Vérifier que l'école est reconnue par les autorités compétentes (BSID, accréditation régionale ou nationale)."],
        ["🆔", "BSID", "Le Business / School Identification Number doit être valide et actif pour la reconnaissance du diplôme."],
        ["🏈", "NCAA", "Si un parcours sportif est envisagé, valider l'éligibilité avec le NCAA Eligibility Center avant l'inscription."],
        ["📋", "Admissions", "Les exigences d'admission changent chaque cycle. Contacter directement le bureau des admissions de chaque université ciblée."],
        ["📚", "AP disponibles", "Confirmer quels cours AP sont réellement offerts par l'école et si les examens College Board sont accessibles."],
        ["🏠", "Politique homeschool", "Chaque université a sa propre politique envers les candidats homeschoolés ou issus d'écoles en ligne."],
        ["🎯", "Exigences université cible", "Préalables, portfolio, lettre de motivation, tests standardisés — vérifier programme par programme."],
        ["💲", "Coûts réels", "Les frais indiqués sont des estimations. Ajouter frais d'inscription, matériel, examens AP, hébergement et assurance."],
        ["👁️", "Examens surveillés", "Certains programmes exigent des examens en présentiel ou sous surveillance. À confirmer avant toute inscription."],
        ["📄", "Transcript", "La validité et la lisibilité du relevé de notes officiel doivent être confirmées par l'université cible."]
      ].map(([icon, label, desc]) => `
        <div class="verif-card">
          <span class="verif-icon">${icon}</span>
          <div class="verif-body">
            <strong class="verif-label">${label}</strong>
            <span class="verif-desc">${desc}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  wrap.appendChild(verifSection);

  const limitesSection = document.createElement("div");
  limitesSection.className = "warning-section limits-section";
  limitesSection.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">🚨</span>
      <div>
        <h3 class="warning-section-title">LIMITES ET AVERTISSEMENTS</h3>
        <p class="warning-section-sub">Ce simulateur est un outil éducatif. Il ne remplace pas un conseiller professionnel ni les informations officielles.</p>
      </div>
    </div>
    <div class="limits-grid">
      ${[
        ["Les admissions changent régulièrement", "Les politiques, exigences et critères d'évaluation peuvent être modifiés sans préavis d'une année à l'autre."],
        ["Chaque université évalue les dossiers différemment", "Il n'existe pas de formule universelle. Deux dossiers identiques peuvent obtenir des résultats opposés selon l'institution."],
        ["Aucun parcours ne garantit l'admission", "Ce simulateur génère des pistes éducatives, non des garanties. L'admission reste une décision discrétionnaire de chaque université."],
        ["Certaines écoles sont plus reconnues que d'autres", "La lisibilité d'un diplôme en ligne ou homeschool varie selon l'université cible, le programme et le pays."],
        ["Les programmes compétitifs évaluent le profil global", "Notes, activités, lettres, tests standardisés, portfolio, entretiens — un seul critère ne suffit jamais."],
        ["Les informations doivent être revérifiées directement", "Toutes les données de ce simulateur proviennent de sources publiques et doivent être validées auprès des institutions concernées."]
      ].map(([title, desc]) => `
        <div class="limit-card">
          <span class="limit-bullet">!</span>
          <div class="limit-body">
            <strong class="limit-title">${title}</strong>
            <span class="limit-desc">${desc}</span>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="limits-footer">
      Ce document est fourni à titre informatif et suggestif uniquement. CAP DIPLÔME ne garantit aucun résultat académique ou d'admission.
    </div>
  `;
  wrap.appendChild(limitesSection);

  const actionRow = document.createElement("div");
  actionRow.className = "summary-action-row";

  const printBtn = document.createElement("button");
  printBtn.className = "summary-print-btn";
  printBtn.type = "button";
  printBtn.innerHTML = "🖨️ Imprimer ce résumé";
  printBtn.addEventListener("click", () => window.print());
  actionRow.appendChild(printBtn);

  const shareBtn = document.createElement("button");
  shareBtn.className = "summary-share-btn";
  shareBtn.type = "button";
  shareBtn.innerHTML = "🔗 Copier le lien de partage";
  shareBtn.addEventListener("click", () => {
    const url = encodeStateToURL();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        shareBtn.innerHTML = "✓ Lien copié !";
        shareBtn.classList.add("copied");
        setTimeout(() => {
          shareBtn.innerHTML = "🔗 Copier le lien de partage";
          shareBtn.classList.remove("copied");
        }, 2500);
      }).catch(() => fallbackCopy(url, shareBtn));
    } else {
      fallbackCopy(url, shareBtn);
    }
  });
  actionRow.appendChild(shareBtn);

  const shareNote = document.createElement("p");
  shareNote.className = "summary-share-note";
  shareNote.textContent = "Le lien encode toutes tes réponses — ouvre-le sur n'importe quel appareil pour retrouver ton parcours.";
  actionRow.appendChild(shareNote);

  wrap.appendChild(actionRow);

  shell.appendChild(wrap);
  return shell;
}

function fallbackCopy(text, btn) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    btn.innerHTML = "✓ Lien copié !";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = "🔗 Copier le lien de partage";
      btn.classList.remove("copied");
    }, 2500);
  } catch (e) {
    btn.innerHTML = "❌ Copie manuelle requise";
    setTimeout(() => { btn.innerHTML = "🔗 Copier le lien de partage"; }, 2500);
  }
  document.body.removeChild(ta);
}

function canContinue() {
  const keys = ["des", "language", "diploma", "traits", "career", "universityType"];
  const key = keys[currentStep];
  if (!key) return true;
  if (Array.isArray(state[key])) return state[key].length > 0;
  return Boolean(state[key]);
}

function updateInsight() {
  const insight = document.getElementById("insightText");
  const signals = document.getElementById("signalList");
  const profile = [];
  if (state.traits.includes("Scientifique") && state.sliders.math >= 4 && state.traits.includes("Fast-track")) {
    profile.push("Profil STEM compétitif");
  }
  if (state.traits.includes("Créatif") && state.traits.includes("Anxieux face aux examens") && state.language === "francais") {
    profile.push("Profil flexible orienté projets");
  }
  if (state.language === "francais") profile.push("Vérification Québec requise");
  if (state.career === "stem") profile.push("AP et préalables à prévoir");
  if (state.universityType === "usa-top") profile.push("Admissions ultra compétitives");
  if (state.diploma === "ossd") profile.push("OSSD lisible en Ontario");
  if (state.diploma === "us") profile.push("Common App / NCAA à vérifier");

  insight.textContent = profile.length
    ? "Le simulateur ajuste le parcours selon les signaux détectés."
    : "Répondez à quelques questions pour générer une stratégie prudente et personnalisée.";
  signals.innerHTML = profile.slice(0, 5).map((item) => `<div class="signal">${item}</div>`).join("");
}

function getRiskTags() {
  const tags = [];
  if (state.language === "francais" || state.universityType === "quebec-fr") tags.push({ text: "Vérification individuelle", tone: "red" });
  if (state.career === "stem") tags.push({ text: "Préalables variables", tone: "gold" });
  if (state.universityType === "usa-top") tags.push({ text: "Ultra compétitif", tone: "red" });
  return tags;
}

function universityWarning() {
  if (state.universityType === "quebec-fr") return "Conditions variables — vérification individuelle requise";
  if (state.universityType === "usa-top") return "Admissions ultra compétitives";
  if (state.career === "stem") return "AP recommandés, notes élevées et préalables variables";
  return null;
}

function roadmapWarning() {
  if (state.career === "stem") return "Ne jamais simplifier médecine, santé, génie ou programmes professionnels.";
  if (state.language === "francais") return "DEC, préalables, année préparatoire ou évaluation individuelle peuvent être exigés.";
  return null;
}

function labelUniversityGroup(group) {
  const labels = {
    "canada-flex": "Canada flexible",
    "canada-standard": "Canada standard",
    "canada-competitive": "Canada compétitif",
    "quebec-fr": "Québec francophone",
    "usa-flex": "USA flexible",
    "usa-standard": "USA standard",
    "usa-competitive": "USA compétitif",
    "usa-top": "Top USA"
  };
  return labels[group] || group;
}

function getCareerTitle() {
  return (options.career.find(([value]) => value === state.career) || [null, ""])[1];
}

function toggle(list, item) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

function encodeStateToURL() {
  const snapshot = {
    des: state.des,
    language: state.language,
    diploma: state.diploma,
    traits: state.traits,
    sliders: state.sliders,
    career: state.career,
    universityType: state.universityType,
    selectedUniversities: state.selectedUniversities,
    plar: state.plar,
    checklist: state.checklist
  };
  try {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(snapshot))));
    const url = window.location.href.split("#")[0] + "#" + encoded;
    window.history.replaceState(null, "", url);
    return url;
  } catch (e) {
    return window.location.href;
  }
}

function decodeStateFromURL() {
  const hash = window.location.hash.slice(1);
  if (!hash) return false;
  try {
    const snapshot = JSON.parse(decodeURIComponent(escape(atob(hash))));
    if (snapshot && typeof snapshot === "object") {
      if (snapshot.des !== undefined) state.des = snapshot.des;
      if (snapshot.language !== undefined) state.language = snapshot.language;
      if (snapshot.diploma !== undefined) state.diploma = snapshot.diploma;
      if (Array.isArray(snapshot.traits)) state.traits = snapshot.traits;
      if (snapshot.sliders && typeof snapshot.sliders === "object") state.sliders = { ...state.sliders, ...snapshot.sliders };
      if (snapshot.career !== undefined) state.career = snapshot.career;
      if (snapshot.universityType !== undefined) state.universityType = snapshot.universityType;
      if (Array.isArray(snapshot.selectedUniversities)) state.selectedUniversities = snapshot.selectedUniversities;
      if (snapshot.plar && typeof snapshot.plar === "object") state.plar = { ...state.plar, ...snapshot.plar };
      if (snapshot.checklist && typeof snapshot.checklist === "object") state.checklist = snapshot.checklist;
      return true;
    }
  } catch (e) {}
  return false;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    render();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (!canContinue()) return;
  if (currentStep < steps.length - 1) {
    currentStep++;
    render();
  } else {
    resetState();
    currentStep = 0;
    render();
  }
});

const restoredFromURL = decodeStateFromURL();
if (restoredFromURL) {
  currentStep = steps.length - 1;
}
render();
