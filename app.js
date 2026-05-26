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
  plar: {
    homeschooling: false,
    projects: false,
    work: false,
    selfLearning: false,
    portfolios: false
  },
  checklist: {}
};

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
  { title: "CHECKLIST OFFICIELLE", eyebrow: "Vérifications", render: renderChecklist }
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
  { name: "Athabasca University", group: "canada-flex", fit: ["Autonome", "International"], text: "Option ouverte et flexible. Valider exigences du programme précis." },
  { name: "Thompson Rivers Open Learning", group: "canada-flex", fit: ["Autonome"], text: "Souplesse élevée, utile pour transition ou reprise de préalables." },
  { name: "Royal Roads", group: "canada-flex", fit: ["Créatif"], text: "Approches appliquées selon programme, admission à vérifier." },
  { name: "York University", group: "canada-standard", fit: ["Littéraire", "Business / Comptabilité"], text: "Option standard en Ontario. OSSD souvent lisible, préalables variables." },
  { name: "TMU", group: "canada-standard", fit: ["Créatif", "Technologique"], text: "Programmes appliqués et urbains. Portfolio parfois requis." },
  { name: "University of Ottawa", group: "canada-standard", fit: ["Littéraire"], text: "Bilinguisme institutionnel possible selon programme, exigences à confirmer." },
  { name: "Carleton", group: "canada-standard", fit: ["Juridique / Politique", "Technologique"], text: "Bon alignement politiques publiques, médias, informatique." },
  { name: "Waterloo", group: "canada-competitive", fit: ["Scientifique", "Technologique", "Fast-track"], text: "Très compétitif en STEM. AP, math avancée et notes élevées recommandées." },
  { name: "University of Toronto", group: "canada-competitive", fit: ["Scientifique", "Littéraire"], text: "Admission compétitive. Exigences par campus et programme." },
  { name: "McMaster", group: "canada-competitive", fit: ["Scientifique"], text: "Santé et sciences très sélectives. Ne pas simplifier les préalables." },
  { name: "UBC", group: "canada-competitive", fit: ["International", "Scientifique"], text: "Profil global solide requis. Exigences et suppléments à vérifier." },
  { name: "McGill", group: "canada-competitive", fit: ["Scientifique", "International"], text: "Reconnaissance et équivalences variables pour candidats non traditionnels." },
  { name: "UdeM", group: "quebec-fr", fit: ["Littéraire", "Scientifique"], text: "Conditions variables: DEC, préalables, année préparatoire ou étude individuelle." },
  { name: "Laval", group: "quebec-fr", fit: ["Littéraire", "Scientifique"], text: "Vérification individuelle requise, surtout pour profils sans DEC." },
  { name: "Sherbrooke", group: "quebec-fr", fit: ["Scientifique", "Business / Comptabilité"], text: "Accès selon programme et dossier. Équivalences à confirmer." },
  { name: "SNHU", group: "usa-flex", fit: ["Autonome"], text: "Flexible et accessible selon programme. Valider reconnaissance externe." },
  { name: "ASU Online", group: "usa-flex", fit: ["Technologique", "International"], text: "Large offre en ligne. Exigences précises selon programme." },
  { name: "Purdue Global", group: "usa-flex", fit: ["Business / Comptabilité"], text: "Option flexible. Bien vérifier objectifs professionnels." },
  { name: "Oregon State", group: "usa-standard", fit: ["Technologique", "Scientifique"], text: "Option USA standard avec parcours en ligne dans certains domaines." },
  { name: "University of Arizona", group: "usa-standard", fit: ["Business / Comptabilité", "Arts / Créatif"], text: "Options variées, dossier international à valider." },
  { name: "Penn State", group: "usa-standard", fit: ["International"], text: "World Campus et options standards. Conditions par programme." },
  { name: "NYU", group: "usa-competitive", fit: ["Arts / Créatif", "Business / Comptabilité"], text: "Compétitif, portfolio ou supplément possible selon faculté." },
  { name: "Georgia Tech", group: "usa-competitive", fit: ["Technologique", "Scientifique"], text: "Très fort en tech/STEM. Math, AP et projets recommandés." },
  { name: "Boston University", group: "usa-competitive", fit: ["International", "Scientifique"], text: "Compétitif, dossier académique et activités importantes." },
  { name: "Harvard", group: "usa-top", fit: ["International"], text: "Admissions ultra compétitives. Aucun parcours ne garantit l'accès." },
  { name: "MIT", group: "usa-top", fit: ["Scientifique", "Technologique"], text: "Admissions ultra compétitives, niveau STEM exceptionnel attendu." },
  { name: "Stanford", group: "usa-top", fit: ["Technologique", "Créatif"], text: "Admissions ultra compétitives, impact et excellence requis." },
  { name: "Yale", group: "usa-top", fit: ["Littéraire", "International"], text: "Admissions ultra compétitives, profil global exceptionnel." },
  { name: "Princeton", group: "usa-top", fit: ["Scientifique", "Littéraire"], text: "Admissions ultra compétitives, exigences académiques très élevées." }
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
  document.getElementById("nextBtn").textContent = currentStep === steps.length - 1 ? "Terminer" : "Continuer";
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

function renderUniversities(step) {
  const shell = screenShell(step, "Recommandations filtrées selon le profil actuel. Elles ne garantissent ni admission, ni reconnaissance, ni équivalence.", universityWarning());
  const grid = document.createElement("div");
  grid.className = "results-grid";
  getRecommendedUniversities().forEach((uni) => {
    const card = document.createElement("article");
    card.className = "university-card";
    card.innerHTML = `
      <h3 class="card-title">${uni.name}</h3>
      <p class="card-text">${uni.text}</p>
      <div class="tag-row">
        <span class="tag green">${labelUniversityGroup(uni.group)}</span>
        ${getRiskTags().map((tag) => `<span class="tag ${tag.tone}">${tag.text}</span>`).join("")}
      </div>
    `;
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
      <p class="card-text">Profil idéal: ${school.ideal}</p>
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

        currentStep = 0;
        render();

    }

});
