// ==========================================================================
// Cap sur Diplôme — Simulateur éducatif
// Reconstruit pour suivre le Plan v4 (validé) et la Base Centrale Excel.
// ==========================================================================

const state = {
  // Écran 2 — Profil de l'élève
  trancheAge: null,
  niveauScolaire: null,

  // Écran 3 — Parcours scolaire
  langue: null, // 'francais' | 'anglais' | 'les-deux'
  diplomes: [], // ['ossd', 'hsd']
  modes: [], // ['synchrone','asynchrone','hybride','aucune-preference']

  // Écran 4 — Domaine et niveau d'études visés
  domaines: [],
  niveauxVises: [],
  neSaitPasEncore: false,

  // Écran 6 — Poursuite à l'université en ligne ?
  wantsUniversity: null, // 'oui' | 'non'

  // Écran 7 — Type d'université recherchée
  univLangue: null,
  univPays: null,

  // Écran 8 — sélection manuelle
  selectedUniversities: [],
};

function buildSchoolHighlights(school, type) {
  const h = [];
  if (school.mode) h.push(school.mode);
  if (school.langue) h.push("Langue : " + school.langue);
  if (type === "ossd" && school.ecoleHote === "Oui")
    h.push("École hôte (émet le diplôme)");
  if (school.ncaa === "Oui") h.push("NCAA approuvé");
  if (school.plar === "Oui") h.push("PLAR disponible");
  return h;
}

function buildSchoolCard(school, type) {
  const isOSSD = type === "ossd";
  const idLabel = isOSSD
    ? `BSID ${school.bsid || "à confirmer"}`
    : school.accred || "Accréditation à confirmer";
  const highlights = buildSchoolHighlights(school, type);
  const plarText =
    school.plar === "Oui"
      ? "PLAR disponible — crédits à évaluer"
      : "À vérifier directement avec l'école";
  return `
    <div class="school-card">
      <div class="school-card-top">
        <div class="school-name-row">
          <strong class="school-name">${school.name}</strong>
        </div>
        <div class="school-id">${idLabel}</div>
      </div>
      <div class="school-meta">
        <div class="school-meta-item"><span class="school-meta-label">💰 Prix</span><span>${school.prix || "Sur demande"}</span></div>
        <div class="school-meta-item"><span class="school-meta-label">⏱ Durée</span><span>${school.duree || "Variable"}</span></div>
        <div class="school-meta-item"><span class="school-meta-label">📋 Crédits QC</span><span>${plarText}</span></div>
      </div>
      <div class="school-highlights">
        ${highlights.map((h) => `<span class="school-tag">${h}</span>`).join("")}
      </div>
      <a href="${school.site}" target="_blank" rel="noopener" class="school-link">↗ Visiter le site officiel</a>
    </div>
  `;
}

function buildUniversityCard(uni, selected) {
  return `
    <article class="university-card ${selected ? "selected" : ""}" data-id="${uni.id}" role="button" tabindex="0">
      <div class="card-header-row">
        <div class="card-title-block">
          <h3 class="card-title">${uni.name}</h3>
          <span class="card-abbr">${uni.pays}${uni.province ? " · " + uni.province : ""}</span>
        </div>
      </div>
      <p class="card-text">${uni.programmes || ""}</p>
      <div class="card-meta-row">
        <span class="card-fees">💰 ${uni.cout || "Sur demande"}</span>
        <a class="card-link" href="${uni.site}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Admissions officielles ↗</a>
      </div>
      <div class="tag-row">
        <span class="tag green">${uni.mode || ""}</span>
        <span class="tag">${uni.langue || ""}</span>
        <span class="tag gold">${uni.niveau || ""}</span>
      </div>
      <div class="tag-row">
        <span class="tag">Critères annoncés : ${uni.admissionAvec || "à confirmer"}</span>
      </div>
      ${selected ? '<div class="selected-check">✓ Sélectionnée</div>' : ""}
    </article>
  `;
}

function buildGlossaire() {
  const terms = [
    { abbr: "DES", full: "Diplôme d'études secondaires", desc: "Le diplôme de fin d'études secondaires québécois. Équivalent du diplôme de 5e secondaire au Québec." },
    { abbr: "OSSD", full: "Ontario Secondary School Diploma", desc: "Diplôme secondaire de la province de l'Ontario (Canada). Reconnu dans la plupart des universités canadiennes, américaines et internationales." },
    { abbr: "HSD", full: "High School Diploma", desc: "Diplôme secondaire américain. Reconnu par de nombreuses universités nord-américaines et internationales, notamment via Common App." },
    { abbr: "AP", full: "Advanced Placement", desc: "Cours universitaires offerts au secondaire par College Board (USA). Les examens AP permettent d'obtenir des crédits universitaires reconnus par de nombreuses universités." },
    { abbr: "NCAA", full: "National Collegiate Athletic Association", desc: "Organisation américaine qui régit le sport universitaire. Les étudiants-athlètes doivent être déclarés éligibles par le NCAA Eligibility Center avant de s'inscrire dans une université membre." },
    { abbr: "PLAR", full: "Prior Learning Assessment and Recognition", desc: "Reconnaissance des apprentissages antérieurs. Permet d'obtenir des crédits scolaires pour des expériences de vie, de travail ou d'auto-apprentissage documentées." },
    { abbr: "SAT", full: "Scholastic Assessment Test", desc: "Test standardisé américain (College Board) utilisé pour l'admission universitaire aux États-Unis. Score sur 1600." },
    { abbr: "ACT", full: "American College Testing", desc: "Alternative au SAT. Test standardisé américain couvrant anglais, maths, lecture et sciences. Score sur 36." },
    { abbr: "BSID", full: "Business / School Identification Number", desc: "Numéro d'identification officiel attribué par le ministère de l'Éducation de l'Ontario à chaque école accréditée." },
    { abbr: "DEC", full: "Diplôme d'études collégiales", desc: "Diplôme collégial québécois (CÉGEP). Souvent exigé pour accéder aux universités francophones du Québec (UdeM, Laval, Sherbrooke, UQAM, etc.)." },
    { abbr: "OUAC", full: "Ontario Universities' Application Centre", desc: "Portail centralisé pour les demandes d'admission aux universités de l'Ontario." },
    { abbr: "Common App", full: "Common Application", desc: "Plateforme américaine centralisée pour postuler à plus de 1 000 universités aux États-Unis et à l'international." },
    { abbr: "IB", full: "International Baccalaureate", desc: "Programme international rigoureux offert dans certaines écoles secondaires. Le diplôme IB est reconnu par les universités du monde entier." },
    { abbr: "DESS", full: "Diplôme d'études supérieures spécialisées", desc: "Diplôme universitaire québécois de 2e cycle, plus court qu'une maîtrise." },
  ];

  const cardsHtml = terms
    .map(
      (t) => `
    <div class="glossaire-card" data-abbr="${t.abbr.toLowerCase()}" data-full="${t.full.toLowerCase()}" data-desc="${t.desc.toLowerCase()}">
      <div class="glossaire-abbr">${t.abbr}</div>
      <div class="glossaire-body">
        <strong class="glossaire-full">${t.full}</strong>
        <span class="glossaire-desc">${t.desc}</span>
      </div>
    </div>
  `,
    )
    .join("");

  return `
    <div class="glossaire-search-wrap">
      <input id="glossaireSearch" class="glossaire-search" type="search" placeholder="Rechercher un terme… ex : OSSD, AP, DEC" autocomplete="off" spellcheck="false" />
    </div>
    <div class="glossaire-intro">
      <p>Définitions des termes et abréviations utilisés dans ce simulateur. Toutes les informations sont à valider directement auprès des institutions concernées.</p>
    </div>
    <div id="glossaireGrid" class="glossaire-grid">
      ${cardsHtml}
    </div>
    <p id="glossaireEmpty" class="glossaire-empty" style="display:none;">Aucun résultat pour cette recherche.</p>
  `;
}

function initGlossaireSearch() {
  const input = document.getElementById("glossaireSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const grid = document.getElementById("glossaireGrid");
    const empty = document.getElementById("glossaireEmpty");
    if (!grid) return;
    let visible = 0;
    grid.querySelectorAll(".glossaire-card").forEach((card) => {
      const match =
        !q ||
        card.dataset.abbr.includes(q) ||
        card.dataset.full.includes(q) ||
        card.dataset.desc.includes(q);
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });
    empty.style.display = visible === 0 ? "block" : "none";
  });
  input.focus();
}

const sourcesOfficielles = [{"nom": "Ministère Éducation Ontario — Écoles privées", "url": "https://ontario.ca/page/private-schools", "type": "Gouvernement", "pays": "Canada", "desc": "Vérifier le BSID de toute école OSSD", "date": "Mai 2026"}, {"nom": "Note 129 — Reconnaissance des acquis (RDA)", "url": "https://www.ontario.ca/fr/document/education-en-ontario-directives-en-matiere-de-politiques-et-de-programmes/politiqueprogrammes-note-129", "type": "Politique officielle", "pays": "Canada", "desc": "Texte officiel : revendication de crédits et octroi d'équivalences de crédits", "date": "Sept. 2026"}, {"nom": "Cognia — Registre des écoles accréditées", "url": "https://cognia.org/find-accredited-schools", "type": "Accréditation", "pays": "USA", "desc": "Vérifier l'accréditation Cognia d'une école", "date": "Mai 2026"}, {"nom": "WASC — Membres accrédités", "url": "https://wascsenior.org", "type": "Accréditation", "pays": "USA", "desc": "Vérifier l'accréditation WASC d'une école", "date": "Mai 2026"}, {"nom": "MSA-CESS — Membres accrédités", "url": "https://msa-cess.org", "type": "Accréditation", "pays": "USA", "desc": "Vérifier l'accréditation MSA-CESS", "date": "Mai 2026"}, {"nom": "OUAC — Portail admissions Ontario", "url": "https://ouac.on.ca", "type": "Portail", "pays": "Canada", "desc": "Demande d'admission universités ontariennes", "date": "Mai 2026"}, {"nom": "CollegeBoard — AP et SAT", "url": "https://collegeboard.org", "type": "Portail", "pays": "USA", "desc": "Inscription AP, SAT, et scores", "date": "Mai 2026"}, {"nom": "Admission UdeM — Année préparatoire", "url": "https://admission.umontreal.ca/programmes/annee-preparatoire", "type": "Université", "pays": "Canada", "desc": "Conditions admission Année préparatoire", "date": "Mai 2026"}, {"nom": "NCAA Eligibility Center", "url": "https://eligibilitycenter.org", "type": "Organisme", "pays": "USA", "desc": "Vérifier l'éligibilité NCAA d'une école", "date": "Mai 2026"}, {"nom": "WES Canada — Évaluation diplômes", "url": "https://wes.org/ca", "type": "Organisme", "pays": "Canada", "desc": "Évaluation équivalence diplômes étrangers", "date": "Mai 2026"}, {"nom": "Athabasca University — Admission", "url": "https://athabascau.ca/admissions", "type": "Université", "pays": "Canada", "desc": "Conditions d'admission Athabasca", "date": "Mai 2026"}];

function buildSources() {
  return '<div class="sources-list">' + sourcesOfficielles.map(function (x) {
    return '<div class="source-card"><div class="source-head"><strong>' + x.nom + '</strong><span class="source-tag">' + x.type + ' · ' + x.pays + '</span></div>' +
      '<p class="source-desc">' + x.desc + '</p>' +
      '<a class="source-link" href="' + x.url + '" target="_blank" rel="noopener">' + x.url + '</a>' +
      '<span class="source-date">Vérifié : ' + x.date + '</span></div>';
  }).join('') + '</div>';
}

function renderAnnuaireTab(tab) {
  const content = document.getElementById("annuaireContent");
  if (tab === "sources") {
    content.innerHTML = buildSources();
    return;
  }
  if (tab === "glossaire") {
    content.innerHTML = buildGlossaire();
    initGlossaireSearch();
    return;
  }
  if (tab === "universites") {
    content.innerHTML = `<div class="results-grid">${onlineUniversities.map((u) => buildUniversityCard(u, false)).join("")}</div>`;
    return;
  }
  const schoolList = secondarySchools[tab] || [];
  content.innerHTML = schoolList.map((s) => buildSchoolCard(s, tab)).join("");
}

document.getElementById("annuaireBtn").addEventListener("click", () => {
  const overlay = document.getElementById("annuaireOverlay");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  renderAnnuaireTab("ossd");
});

document.getElementById("annuaireClose").addEventListener("click", () => {
  const overlay = document.getElementById("annuaireOverlay");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
});

document.getElementById("annuaireOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("annuaireOverlay")) {
    document.getElementById("annuaireOverlay").classList.remove("open");
    document.getElementById("annuaireOverlay").setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll(".annuaire-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".annuaire-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderAnnuaireTab(btn.dataset.tab);
  });
});

const STORAGE_KEY = "cap-diplome-v4";

function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, step: currentStep }));
  } catch (e) {}
}

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !saved.state) return false;
    Object.assign(state, saved.state);
    if (typeof saved.step === "number") currentStep = saved.step;
    return true;
  } catch (e) {
    return false;
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

function showRestoredToast() {
  const toast = document.createElement("div");
  toast.className = "restore-toast";
  toast.innerHTML =
    "↩️ Progression restaurée automatiquement — <button class='restore-reset'>Recommencer à zéro</button>";
  toast.querySelector(".restore-reset").addEventListener("click", () => {
    resetState();
    currentStep = 0;
    toast.remove();
    render();
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("toast-visible"), 50);
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 400);
  }, 6000);
}

function resetState() {
  state.trancheAge = null;
  state.niveauScolaire = null;
  state.langue = null;
  state.diplomes = [];
  state.modes = [];
  state.domaines = [];
  state.niveauxVises = [];
  state.neSaitPasEncore = false;
  state.wantsUniversity = null;
  state.univLangue = null;
  state.univPays = null;
  state.selectedUniversities = [];
  clearStorage();
}

let currentStep = 0;

// Écrans (Plan v4) :
// 0 Accueil · 1 Profil de l'élève · 2 Intercalaire DES (conditionnel)
// 3 Parcours scolaire · 4 Domaine et niveau visés · 5 Écoles secondaires
// 6 Poursuite université ? · 7 Type d'université (conditionnel)
// 8 Liste des universités (conditionnel) · 9 Résumé final
const STEP_ACCUEIL = 0;
const STEP_PROFIL = 1;
const STEP_PARCOURS = 2;
const STEP_DOMAINE = 3;
const STEP_ECOLES = 4;
const STEP_INTERCALAIRE = 5;
const STEP_VEUT_UNIV = 6;
const STEP_TYPE_UNIV = 7;
const STEP_LISTE_UNIV = 8;
const STEP_RESUME = 9;
const secondarySchools = {
  ossd: [{"id": "OSSD-001", "name": "Blyth Academy Online", "bsid": "669675", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://blytheducation.com/online", "email": "admissions@blytheducation.com", "prix": "Sur demande", "duree": "Min 2 sem.", "mode": "Asynchrone / Live (Orbit)", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-002", "name": "Virtual High School (VHS)", "bsid": "665681", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://virtualhighschool.com", "email": "info@virtualhighschool.com", "prix": "469$–589$/cours", "duree": "Min 2 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-003", "name": "Ontario Virtual School (OVS)", "bsid": "665804", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://ontariovirtualschool.ca", "email": "admin@ontariovirtualschool.ca", "prix": "~650$/cours", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Non", "ncaa": "Non"}, {"id": "OSSD-004", "name": "Northern Pre-University (NPU)", "bsid": "882700", "accred": "Ministère Éducation Ontario — émet elle-même relevés et OSSD", "tier": "★ Tier 1", "site": "https://np-u.com", "email": "admin@np-u.com", "prix": "399$ inscription + 599$/cours (min. 7 cours + 10h bénévolat)", "duree": "Préenregistré, rythme libre (2-3 cours à la fois recommandé)", "mode": "Asynchrone", "langue": "Français — sauf le cours de langue (ENG4U) et le cours de littératie (OLC4O), obligatoires en anglais; les autres cours au choix", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-005", "name": "Ontario eSecondary (OES)", "bsid": "667186", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://oeshighschool.com", "email": "info@oeshighschool.com", "prix": "Voir page cours (CA) · 795$/cours (Intl)", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-006", "name": "Toronto eSchool", "bsid": "886520", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://ossd.torontoeschool.com", "email": "info@torontoeschool.com", "prix": "150$+200$+500$+cours", "duree": "9-10 mois (prog.QC)", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-007", "name": "Canadian Virtual School (CVS)", "bsid": "882250", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://canadianvirtualschool.ca", "email": "info@canadianvirtualschool.ca", "prix": "500$–550$/cours", "duree": "Min 3 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-008", "name": "Ontario Education Online (OEO)", "bsid": "882902", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://ontarioeducationonline.ca", "email": "info@ontarioeducationonline.ca", "prix": "499$–599$/cours", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Non", "ncaa": "Non"}, {"id": "OSSD-009", "name": "The New Educator", "bsid": "669484", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://theneweducator.com", "email": "contact@theneweducator.com", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais — site et accompagnement en français (cours en anglais)", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-010", "name": "Keystone School", "bsid": "888468", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://keystoneschools.ca", "email": "info@keystoneschools.ca", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-011", "name": "Aubrey Academy", "bsid": "665140", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://aubreyacademy.ca", "email": "info@aubreyacademy.ca", "prix": "Sur demande", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-012", "name": "KAI Global School", "bsid": "665538", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://kaiglobalschool.com", "email": "info@kaiglobalschool.com", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-013", "name": "Toronto Imperial School (TIS)", "bsid": "881941", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://torontoimperial.com", "email": "info@torontoimperial.com", "prix": "690$–1450$/cours", "duree": "Flexible", "mode": "Synchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-014", "name": "USCA Academy", "bsid": "881623", "accred": "Ministère Éducation Ontario — BSID confirmé au registre officiel (août 2026)", "tier": "★ Tier 3", "site": "https://uscaacademy.com", "email": "info@uscaacademy.com", "prix": "~16 800$/an", "duree": "Hybride live", "mode": "Synchrone", "langue": "Anglais — site et accompagnement en français (cours en anglais)", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-015", "name": "École Louis Legrand", "bsid": "884656", "accred": "Ministère Éducation Ontario — BSID confirmé au registre officiel (août 2026)", "tier": "★ Tier 2", "site": "https://louislegrand.ca", "email": "info@louislegrand.ca", "prix": "Sur demande — évaluation des crédits offerte", "duree": "1re à 12e année, rythme flexible", "mode": "Asynchrone", "langue": "Français — enseignement entièrement en français (confirmé au registre)", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-016", "name": "École Virtuelle Canadienne Inter-nations", "bsid": "882009", "accred": "Ministère Éducation Ontario — BSID confirmé au registre officiel (août 2026)", "tier": "★ Tier 3", "site": "https://www.ecolecanadienne-internations.com", "email": "info@ecolecanadienne-internations.com", "prix": "Sur demande", "duree": "9e à 12e année", "mode": "Asynchrone", "langue": "Français — enseignement entièrement en français (confirmé au registre)", "pays": "Canada", "ecoleHote": "Oui", "plar": "À confirmer", "ncaa": "Non"}],
  hsd: [{"id": "HSD-001", "name": "Clonlara School", "bsid": "", "accred": "NCPSA · MSA-CESS · Accred.Intl", "tier": "★ Tier 2", "site": "https://clonlara.org", "email": "info@clonlara.org", "prix": "395$–695$/crédit USD", "duree": "Libre", "mode": "Asynchrone", "langue": "Français ou anglais — programme francophone, conseillère en français, apprentissages par projet", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-002", "name": "Laurel Springs School", "bsid": "", "accred": "WASC · Cognia", "tier": "★ Tier 1", "site": "https://laurelsprings.com", "email": "admissions@laurelsprings.com", "prix": "7 200$–17 250$/an USD", "duree": "12 mois min", "mode": "Hybride", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-003", "name": "Excel High School", "bsid": "", "accred": "Cognia · MSA-CESS · NCA · NWAC", "tier": "★ Tier 2", "site": "https://excelhighschool.com", "email": "info@excelhighschool.com", "prix": "~1 900$/an USD", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-004", "name": "Forest Trail Academy", "bsid": "", "accred": "Cognia · MSA · AI · NCPSA", "tier": "★ Tier 2", "site": "https://foresttrailacademy.com", "email": "info@foresttrailacademy.com", "prix": "~3 200$/an USD", "duree": "12 mois", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-005", "name": "James Madison HS", "bsid": "", "accred": "Cognia · DEAC", "tier": "★ Tier 3", "site": "https://jmhs.com", "email": "info@jmhs.com", "prix": "699$–1 299$ USD total", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-006", "name": "American School of Correspondence", "bsid": "", "accred": "MSA-CESS · NCPSA · Accred.Intl", "tier": "★ Tier 3", "site": "https://americanschoolofcorr.com", "email": "customerrelations@americanschool.org", "prix": "~1 100$/an USD", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-007", "name": "Penn Foster High School", "bsid": "", "accred": "Cognia · MSA-CESS · DEAC", "tier": "★ Tier 3", "site": "https://pennfoster.edu", "email": "admissions@pennfoster.edu", "prix": "1 149$ USD (complet)", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-008", "name": "Whitmore School", "bsid": "", "accred": "Cognia · NCA · SACS · NWAC", "tier": "★ Tier 3", "site": "https://whitmoreschool.org", "email": "info@whitmoreschool.org", "prix": "1 699$/an USD", "duree": "Mastery", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-009", "name": "Ogburn Online School", "bsid": "", "accred": "Cognia · WASC · MSA · AI · NCPSA · AISF", "tier": "★ Tier 2", "site": "https://ogburnonlineschool.com", "email": "info@ogburnonlineschool.com", "prix": "250$/mois USD", "duree": "Mensuel", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-010", "name": "Crimson Global Academy (CGA)", "bsid": "", "accred": "WASC · NCAA · Cambridge · AP", "tier": "★ Tier 2", "site": "https://crimsonglobalacademy.school", "email": "admissions@crimsoneducation.org", "prix": "Sur demande", "duree": "Flexible", "mode": "Hybride / Live", "langue": "Anglais", "pays": "International", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-011", "name": "Dwight Global Online School", "bsid": "", "accred": "Cognia · MSA-CESS · CIS · IBO", "tier": "★ Tier 1", "site": "https://dwight.edu/dwight-global", "email": "admissions@dwight.edu", "prix": "42 750$/an USD", "duree": "Annuel", "mode": "Synchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}]
};

const onlineUniversities = [{"id": "UNIV-001", "name": "Athabasca University", "pays": "Canada", "province": "Alberta", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Éducation · Santé · Sciences", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "OSSD · HSD · DES+12e année", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "~900$–1100$/cours CAD", "site": "https://athabascau.ca"}, {"id": "UNIV-002", "name": "Thompson Rivers Open University", "pays": "Canada", "province": "Colombie-Brit.", "langue": "Anglais", "type": "Publique", "programmes": "Business · Arts · Technologie · Sciences", "niveau": "Certificat · Bac", "admissionAvec": "OSSD · HSD · 12e année complétée", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "Variable", "site": "https://tru.ca/distance.html"}, {"id": "UNIV-003", "name": "TÉLUQ", "pays": "Canada", "province": "Québec", "langue": "Français", "type": "Publique", "programmes": "Administration · Informatique · Communication · Éducation", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "DEC · 21 ans+", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "~1 200$/cours CAD", "site": "https://teluq.ca"}, {"id": "UNIV-004", "name": "Arizona State University Online", "pays": "États-Unis", "province": "Arizona", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Sciences · Ingénierie", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "4 ans", "cout": "~600$/crédit USD", "site": "https://asuonline.asu.edu"}, {"id": "UNIV-005", "name": "Southern New Hampshire University (SNHU)", "pays": "États-Unis", "province": "New Hampshire", "langue": "Anglais", "type": "Privée", "programmes": "Business · Informatique · Psychologie · Éducation", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "~320$/crédit USD", "site": "https://snhu.edu"}, {"id": "UNIV-006", "name": "Western Governors University (WGU)", "pays": "États-Unis", "province": "Utah", "langue": "Anglais", "type": "Non-profit", "programmes": "Business · IT · Santé · Éducation", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "~4 000$/6 mois USD", "site": "https://wgu.edu"}, {"id": "UNIV-007", "name": "University of the People (UoPeople)", "pays": "États-Unis", "province": "Californie", "langue": "Anglais", "type": "Non-profit", "programmes": "Business · Informatique · Santé publique", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "Frais d'examen seulement", "site": "https://uopeople.edu"}, {"id": "UNIV-008", "name": "Purdue Global", "pays": "États-Unis", "province": "Indiana", "langue": "Anglais", "type": "Publique", "programmes": "Business · IT · Santé · Justice", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~375$/crédit USD", "site": "https://purdueglobal.edu"}, {"id": "UNIV-009", "name": "Penn State World Campus", "pays": "États-Unis", "province": "Pennsylvanie", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Sciences · Ingénierie", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "4 ans", "cout": "~650$/crédit USD", "site": "https://worldcampus.psu.edu"}, {"id": "UNIV-010", "name": "Liberty University Online", "pays": "États-Unis", "province": "Virginie", "langue": "Anglais", "type": "Privée", "programmes": "Business · Éducation · Santé · Théologie", "niveau": "Bac · Maîtrise · Doctorat", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~390$/crédit USD", "site": "https://liberty.edu/online"}, {"id": "UNIV-011", "name": "Open University UK", "pays": "Royaume-Uni", "province": "Angleterre", "langue": "Anglais", "type": "Publique", "programmes": "Arts · Business · Technologie · Sciences humaines", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "12e année ou adulte", "mode": "Asynchrone", "duree": "Flexible", "cout": "~2 000–6 000 £/an", "site": "https://open.ac.uk"}, {"id": "UNIV-012", "name": "Année préparatoire UdeM", "pays": "Canada", "province": "Québec", "langue": "Français", "type": "Publique", "programmes": "Sciences · Sciences humaines · Arts et lettres", "niveau": "Pré-bac (passerelle)", "admissionAvec": "OSSD · DES+4ans · Diplôme 12e année", "mode": "Présentiel (Montréal/Laval)", "duree": "1 an", "cout": "~4 350$ CAD total", "site": "https://admission.umontreal.ca/programmes/annee-preparatoire"}, {"id": "UNIV-013", "name": "Capella University", "pays": "États-Unis", "province": "Minnesota", "langue": "Anglais", "type": "Privée", "programmes": "Business · Psychologie · IT · Santé", "niveau": "Bac · Maîtrise · Doctorat", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~470$/crédit USD", "site": "https://capella.edu"}];
const options = {
  niveauScolaire: [
    ["moinssec3", "MOINS QUE SEC. 3", ""],
    ["sec3-bulletin", "SEC. 3 ET PLUS, AVEC BULLETIN OFFICIEL", "Bulletin émis par une école accréditée ou une commission scolaire."],
    ["sec3-sans-bulletin", "SEC. 3 ET PLUS, SANS BULLETIN OFFICIEL", "Une évaluation faite par le parent-enseignant ne compte pas comme bulletin officiel."],
    ["des-moins4ans", "DES obtenu depuis moins de 4 ans", ""],
    ["des-4ansplus", "DES obtenu depuis 4 ans et plus", "Ce seuil de 4 ans vient d'une règle de l'Université de Montréal : passé ce délai, l'accès à l'université peut se faire sans CÉGEP ni OSSD."],
  ],
  trancheAge: [
    ["moins21", "MOINS DE 21 ANS", ""],
    ["21plus", "21 ANS ET PLUS", "Peut ouvrir un accès direct à l'université, avec ou sans diplôme."],
  ],
langue: [
    ["francais", "FRANÇAIS", "Quelques options existent — le degré de français varie beaucoup selon l’école."],
    ["anglais", "ANGLAIS", "La majorité des parcours OSSD et HSD se font en anglais."],
    ["les-deux", "LES DEUX", "Élargit les résultats aux écoles francophones et anglophones."],
  ],
  diplomes: [
    ["ossd", "OSSD", "Diplôme ontarien. Reconnu partout au Canada, aux USA et à l'international."],
    ["hsd", "HSD", "Diplôme secondaire américain. Idéal pour Common App, NCAA et universités américaines."],
  ],
  modes: [
    ["asynchrone", "ASYNCHRONE", "Travail à ton propre rythme, sans horaire imposé."],
    ["hybride", "HYBRIDE", "Mix de modules auto-rythmés et de sessions en direct."],
    ["synchrone", "SYNCHRONE", "Cours en temps réel avec horaire structuré."],
    ["aucune-preference", "AUCUNE PRÉFÉRENCE", "Affiche toutes les écoles, peu importe le mode."],
  ],
  domaines: [
    ["medecine", "MÉDECINE", ""],
    ["droit", "DROIT", ""],
    ["pharmacie", "PHARMACIE", ""],
    ["genie", "GÉNIE", ""],
    ["ti", "TI / INFORMATIQUE", ""],
    ["arts", "ARTS", ""],
    ["education", "ÉDUCATION", ""],
    ["sciences", "SCIENCES", ""],
    ["administration", "ADMINISTRATION", ""],
  ],
  niveauxVises: [
    ["certificat", "CERTIFICAT", ""],
    ["bac", "BACCALAURÉAT", ""],
    ["dess", "DESS", ""],
    ["maitrise", "MAÎTRISE", ""],
    ["doctorat", "DOCTORAT", ""],
  ],
  wantsUniversity: [
    ["oui", "Oui, je le veux", "Explorer les universités en ligne adaptées à mon diplôme."],
    ["non", "Non, merci", "Je me concentre sur le diplôme secondaire pour l'instant."],
  ],
  univPays: [
    ["canada", "CANADA", ""],
    ["etats-unis", "ÉTATS-UNIS", ""],
    ["les-deux", "LES DEUX", ""],
  ],
};

function labelFromOptions(optKey, value) {
  if (!value) return "—";
  const list = options[optKey] || [];
  const found = list.find(([v]) => v === value);
  return found ? found[1] : value;
}

const steps = [
  { title: "CAP SUR DIPLÔME", eyebrow: "Bienvenue", render: renderAccueil },
  { title: "PROFIL DE L'ÉLÈVE", eyebrow: "Étape 1", render: renderProfilEleve },
  { title: "PARCOURS SCOLAIRE", eyebrow: "Étape 2", render: renderParcoursScolaire },
  { title: "DOMAINE ET NIVEAU VISÉS", eyebrow: "Étape 3", render: renderDomaineNiveau },
  { title: "ÉCOLES SECONDAIRES", eyebrow: "Résultats", render: renderSchools },
  { title: "ÉQUIVALENCE ET CRÉDITS", eyebrow: "Information", render: renderIntercalaireDES },
  { title: "POURSUITE À L'UNIVERSITÉ ?", eyebrow: "Étape 4", render: renderWantsUniversity },
  { title: "TYPE D'UNIVERSITÉ RECHERCHÉE", eyebrow: "Étape 5", render: renderTypeUniversite },
  { title: "UNIVERSITÉS EN LIGNE", eyebrow: "Résultats", render: renderUniversities },
  { title: "RÉSUMÉ FINAL", eyebrow: "Ton parcours", render: renderSummary },
];

function getActivePath() {
  const path = [];
  let i = 0;
  let guard = 0;
  while (i < steps.length && guard++ < 50) {
    path.push(i);
    if (i === steps.length - 1) break;
    i = getNextStep(i);
  }
  if (!path.includes(currentStep)) path.push(currentStep);
  return path;
}

function render() {
  const step = steps[currentStep];
  const path = getActivePath();
  const position = path.indexOf(currentStep) + 1;
  const progress = Math.round((position / path.length) * 100);
  document.getElementById("stepLabel").textContent = `Étape ${position} sur ${path.length}`;
  document.getElementById("progressPercent").textContent = `${progress}%`;
  document.getElementById("progressBar").style.width = `${progress}%`;
  document.getElementById("screen").innerHTML = "";
  document.getElementById("screen").appendChild(step.render(step));
  document.getElementById("prevBtn").disabled = currentStep === 0;
  document.getElementById("nextBtn").textContent =
    currentStep === 0
      ? "Commencer →"
      : currentStep === steps.length - 1
        ? "Recommencer"
        : "Continuer";
  document.getElementById("nextBtn").disabled = !canContinue();
  updateInsight();
  saveStateToStorage();
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

function sectionTitle(text) {
  const p = document.createElement("p");
  p.textContent = text;
  p.style.cssText =
    "font-weight:700;margin:16px 0 8px;font-size:0.85rem;letter-spacing:0.02em;";
  return p;
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

function renderChoiceStep(step, key, list, subcopy, warning, columns) {
  columns = columns || "";
  const shell = screenShell(step, subcopy, warning);
  const grid = document.createElement("div");
  grid.className = `choices ${columns}`;
  list.forEach(([value, title, body]) => {
    grid.appendChild(
      choiceCard(title, body, state[key] === value, () => {
        state[key] = value;
        render();
      }),
    );
  });
  shell.appendChild(grid);
  return shell;
}

function buildSingleSelectGroup(key, list, columns) {
  const grid = document.createElement("div");
  grid.className = `choices ${columns || ""}`;
  list.forEach(([value, title, body]) => {
    grid.appendChild(
      choiceCard(title, body, state[key] === value, () => {
        state[key] = value;
        render();
      }),
    );
  });
  return grid;
}

function buildMultiSelectGroup(key, list, columns) {
  const grid = document.createElement("div");
  grid.className = `choices ${columns || "multi"}`;
  list.forEach(([value, title, body]) => {
    grid.appendChild(
      choiceCard(title, body, state[key].includes(value), () => {
        state[key] = toggle(state[key], value);
        render();
      }),
    );
  });
  return grid;
}

function toggle(list, item) {
  return list.includes(item)
    ? list.filter((v) => v !== item)
    : [...list, item];
}
function renderAccueil(step) {
  const shell = screenShell(
    step,
    "Cap sur Diplôme : un guide pour l'orientation au secondaire en ligne, pour les familles-écoles du Québec.",
    null,
  );
  const info = document.createElement("div");
  info.className = "warning-section";
  info.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">⚠️</span>
      <div>
        <h3 class="warning-section-title">Avant de commencer</h3>
        <p class="warning-section-sub">Cap sur Diplôme n'est pas un conseiller d'orientation, ni un organisme officiel, et ne fait aucune recommandation personnalisée. La décision finale appartient toujours à la famille.</p>
      </div>
    </div>
  `;
  shell.appendChild(info);
  return shell;
}

function renderProfilEleve(step) {
  const shell = screenShell(
    step,
    "Quelques informations de base pour personnaliser la suite du parcours.",
    null,
  );

  shell.appendChild(sectionTitle("Âge de l'élève"));
  shell.appendChild(buildSingleSelectGroup("trancheAge", options.trancheAge, ""));

  shell.appendChild(sectionTitle("Niveau scolaire actuel"));
  shell.appendChild(buildSingleSelectGroup("niveauScolaire", options.niveauScolaire, ""));

  return shell;
}

function renderIntercalaireDES(step) {
  const niveau = state.niveauScolaire;
  const aDES = niveau === "des-moins4ans" || niveau === "des-4ansplus";

  const shell = screenShell(
    step,
    "Comment ta situation se traduit en crédits OSSD ou HSD. Lecture seule — aucun choix à faire ici.",
    null,
  );

  // --- Ta situation précise : une seule carte, selon le choix fait à l'écran 2 ---
  let niveauCard = "";
  if (niveau === "sec3-bulletin") {
    niveauCard = `
      <div class="verif-card">
        <span class="verif-icon">📐</span>
        <div class="verif-body">
          <strong class="verif-label">Ta situation : secondaire 3 complété, avec bulletin officiel</strong>
          <span class="verif-desc">Un document émis par une école accréditée ou une commission scolaire — jamais par un parent-enseignant — prouve que tu dépasses trois années de secondaire. L'école doit alors t'accorder au moins 4 crédits de 11e ou 12e année avant de te recommander pour l'OSSD. <em>Source : Ontario Schools: K-12 Policy and Program Requirements (2011), p. 91.</em></span>
        </div>
      </div>`;
  } else if (niveau === "moinssec3") {
    niveauCard = `
      <div class="verif-card">
        <span class="verif-icon">📐</span>
        <div class="verif-body">
          <strong class="verif-label">Ta situation : moins de trois années de secondaire complétées</strong>
          <span class="verif-desc">L'école évalue ton dossier au cas par cas, sans le minimum de 4 crédits garanti à un élève plus avancé. En pratique, l'admission se fait souvent au niveau de la 9e année.</span>
        </div>
      </div>`;
  } else if (niveau === "sec3-sans-bulletin") {
    niveauCard = `
      <div class="verif-card">
        <span class="verif-icon">📐</span>
        <div class="verif-body">
          <strong class="verif-label">Ta situation : secondaire 3 atteint, mais sans bulletin officiel</strong>
          <span class="verif-desc">Sans document — émis par une école accréditée ou une commission scolaire, jamais par un parent-enseignant — l'école ne peut pas confirmer que tu dépasses trois années de secondaire. En pratique, tu es traité comme si tu avais moins de trois années : admission généralement en 9e année, sans le minimum de 4 crédits garanti. <em>Source : Ontario Schools: K-12 Policy and Program Requirements (2011), p. 91.</em></span>
        </div>
      </div>`;
  } else if (niveau === "des-moins4ans") {
    niveauCard = `
      <div class="verif-card">
        <span class="verif-icon">📐</span>
        <div class="verif-body">
          <strong class="verif-label">Ta situation : DES obtenu depuis moins de 4 ans</strong>
          <span class="verif-desc">Même avec ton DES, l'école demande ton bulletin officiel de secondaire 3 pour confirmer ce seuil. Avec ce bulletin : 4 crédits garantis, en plus de ceux accordés pour l'équivalence de ton DES. Sans ce bulletin : des cours supplémentaires s'ajoutent pour combler les crédits qui ne peuvent pas être confirmés. <em>Source : Ontario Schools: K-12 Policy and Program Requirements (2011), p. 91.</em></span>
        </div>
      </div>`;
  }

  // --- Accès direct à l'université : section séparée, informative seulement ---
  let accesDirectCards = "";
  let accesDirectSource = "";
  if (niveau === "des-4ansplus") {
    accesDirectCards += `
      <div class="verif-card">
        <span class="verif-icon">🎓</span>
        <div class="verif-body">
          <strong class="verif-label">Avec ton DES depuis 4 ans et plus</strong>
          <span class="verif-desc">Tu es admissible à l'Année préparatoire de l'Université de Montréal — sans CÉGEP ni OSSD. Une fois cette année complétée, la majorité des baccalauréats de l'UdeM te sont accessibles. Une option parmi d'autres : tu peux quand même explorer les écoles OSSD et HSD ci-dessous.</span>
        </div>
      </div>`;
    accesDirectSource += ' · Année préparatoire UdeM, <a href="https://admission.umontreal.ca/programmes/annee-preparatoire/" target="_blank" rel="noopener">conditions d\'admissibilité</a>';
  }
  if (state.trancheAge === "21plus") {
    accesDirectCards += `
      <div class="verif-card">
        <span class="verif-icon">🎓</span>
        <div class="verif-body">
          <strong class="verif-label">À 21 ans et plus, une autre voie existe</strong>
          <span class="verif-desc">Concordia et McGill admettent des candidats de 21 ans et plus sans aucun diplôme secondaire ni DEC, sur la base de l'âge et de l'expérience de vie — à condition d'avoir arrêté les études à temps plein depuis au moins 24 mois. Le seuil varie : 21 ans à Concordia, 23 ans pour la plupart des programmes de McGill (21 ans en Musique et en Gestion). Une option parmi d'autres, pas une obligation.</span>
        </div>
      </div>`;
    accesDirectSource += ' · Admission « Mature Entry », <a href="https://www.concordia.ca/admissions/undergraduate/requirements/mature-entry.html" target="_blank" rel="noopener">Concordia</a> et <a href="https://www.mcgill.ca/undergraduate-admissions/apply/requirements/mature" target="_blank" rel="noopener">McGill</a> (exemples)';
  }

  const info = document.createElement("div");
  info.className = "warning-section";
  info.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">ℹ️</span>
      <div>
        <p class="warning-section-sub">${aDES
          ? "Ton DES équivaut à la 11e année. Il te manque une année pour éviter le CÉGEP et accéder directement à l'université — par exemple à travers un diplôme secondaire ontarien (OSSD) ou américain (HSD)."
          : "Peu importe où tu as fait ton secondaire — à la maison, au Québec ou ailleurs — tes apprentissages ne partent pas de zéro aux yeux d'une école OSSD. Voici comment ils se traduisent en crédits, selon la politique officielle du ministère de l'Éducation de l'Ontario."}</p>
      </div>
    </div>

    <div class="verif-grid">
      ${niveauCard}
    </div>

    ${accesDirectCards ? `
    <p class="steps-title" style="margin:4px 2px 0;">Accès direct à l'université</p>
    <div class="verif-grid">
      ${accesDirectCards}
    </div>` : ""}

    <p class="steps-title" style="margin:4px 2px 0;">Trois termes à ne pas confondre</p>
    <div class="verif-grid">
      <div class="verif-card">
        <span class="verif-icon">📋</span>
        <div class="verif-body">
          <strong class="verif-label">RDA — Reconnaissance des acquis</strong>
          <span class="verif-desc">Le nom officiel du terme que les écoles appellent souvent « PLAR ». Il regroupe les deux mécanismes ci-dessous.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">✍️</span>
        <div class="verif-body">
          <strong class="verif-label">La revendication de crédits</strong>
          <span class="verif-desc">Un examen pour obtenir le crédit d'un cours précis (10e, 11e ou 12e année) sans le suivre. Maximum 4 crédits, 2 par matière. Seulement dans les écoles qui l'offrent.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">📄</span>
        <div class="verif-body">
          <strong class="verif-label">L'octroi d'équivalences de crédits</strong>
          <span class="verif-desc">L'évaluation de ton dossier scolaire pour déterminer ton placement de départ — c'est ce qui s'applique à ta situation, décrite plus haut.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">🌍</span>
        <div class="verif-body">
          <strong class="verif-label">Équivalence de diplôme (WES, IQAS) — autre chose</strong>
          <span class="verif-desc">Un service distinct et payant qui évalue un diplôme déjà obtenu, surtout utile pour l'immigration ou l'emploi. Rarement nécessaire pour ce parcours.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">🇺🇸</span>
        <div class="verif-body">
          <strong class="verif-label">Pour un diplôme américain (HSD)</strong>
          <span class="verif-desc">Ces règles précises sont propres à l'Ontario. Chaque école américaine fixe sa propre politique de transfert de crédits — vérifie directement avec l'école visée.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">👪</span>
        <div class="verif-body">
          <strong class="verif-label">Responsabilité de la famille</strong>
          <span class="verif-desc">C'est à la famille de confirmer les crédits reconnus directement avec l'école choisie. Ce guide informe — il n'évalue rien officiellement.</span>
        </div>
      </div>
    </div>

    <div class="steps-section">
      <h4 class="steps-title">Les 3 étapes concrètes, dans l'ordre</h4>
      <ol class="steps-list">
        <li><strong>Repérer une école</strong> à l'écran précédent, selon la langue, le diplôme et le domaine visés.</li>
        <li><strong>Envoyer ton relevé de notes</strong> — le bulletin officiel de 3e secondaire est souvent la pièce clé, mais certaines écoles demandent l'ensemble (sec. 3, 4 et 5, plus le relevé officiel du ministère reçu par la poste à la fin du secondaire). Vérifie la liste exacte auprès de l'école.</li>
        <li><strong>Compléter les cours manquants</strong> qu'elle t'indique, en demandant la revendication de crédits pour ceux où tu maîtrises déjà la matière, si l'école l'offre.</li>
      </ol>
    </div>
    <p class="source-line">Sources : ministère de l'Éducation de l'Ontario — Note Politique/Programmes 129, <a href="https://www.ontario.ca/fr/document/education-en-ontario-directives-en-matiere-de-politiques-et-de-programmes/politiqueprogrammes-note-129" target="_blank" rel="noopener">à consulter directement ici</a> · Ontario Schools: K-12 Policy and Program Requirements (2011), <a href="http://www.edu.gov.on.ca/eng/document/policy/os/ONSchools.pdf" target="_blank" rel="noopener">document PDF officiel</a>${accesDirectSource}.</p>
  `;
  shell.appendChild(info);
  return shell;
}

function renderParcoursScolaire(step) {
  const shell = screenShell(
    step,
    "Ton parcours secondaire : langue d'enseignement, type de diplôme et mode d'enseignement.",
    null,
  );
  shell.appendChild(sectionTitle("Langue d'enseignement souhaitée"));
  shell.appendChild(buildSingleSelectGroup("langue", options.langue, "three"));

  shell.appendChild(sectionTitle("Type de diplôme (plusieurs choix possibles)"));
  shell.appendChild(buildMultiSelectGroup("diplomes", options.diplomes, "three"));

  shell.appendChild(sectionTitle("Mode d'enseignement (plusieurs choix possibles)"));
  shell.appendChild(buildMultiSelectGroup("modes", options.modes, "three"));

  return shell;
}

const coursParDomaine = {"medecine": ["Sciences de la santé", "SCH4U · SBI4U · MHF4U · MCV4U · SPH4U"], "droit": ["Droit et études internationales", "ENG4U · CHY4U · HZT4U"], "pharmacie": ["Sciences de la santé", "SCH4U · SBI4U · MHF4U · MCV4U · SPH4U"], "genie": ["Génie", "MHF4U · MCV4U · SCH4U · SPH4U"], "ti": ["Technologies de l’information", "ICS4U · MHF4U · MDM4U"], "arts": ["Arts, design et musique", "ENG4E · AVI4M · AMR4M"], "education": ["Éducation", "ENG4U · PSE4U · PPZ4C"], "sciences": ["Sciences pures et appliquées", "SCH4U · SBI4U · SPH4U · MHF4U"], "administration": ["Administration et gestion", "BAF4M · BOH4M · ENG4U"]};

function hasContingente() {
  return state.domaines.some((d) => ["medecine", "droit", "pharmacie"].includes(d));
}

function renderDomaineNiveau(step) {
  const warning = hasContingente()
    ? "⚠️ Programmes contingentés au Québec — si tu vises médecine, droit ou pharmacie, la plupart des universités québécoises exigent ou favorisent fortement le DEC. Vérifie directement les conditions d'admission auprès de chaque établissement avant de choisir ton parcours."
    : null;
  const shell = screenShell(
    step,
    "Domaine d'études et niveau universitaire visés — ces choix affinent les universités proposées plus loin.",
    warning,
  );
  shell.appendChild(sectionTitle("Domaine (plusieurs choix possibles)"));
  shell.appendChild(buildMultiSelectGroup("domaines", options.domaines, "three"));

  shell.appendChild(sectionTitle("Niveau universitaire visé (plusieurs choix possibles)"));
  const niveauGrid = buildMultiSelectGroup("niveauxVises", options.niveauxVises, "three");
  shell.appendChild(niveauGrid);

  const dontKnow = document.createElement("div");
  dontKnow.className = "choices";
  dontKnow.style.marginTop = "8px";
  dontKnow.appendChild(
    choiceCard(
      "JE NE SAIS PAS ENCORE",
      "Ça reste correct — les résultats resteront généraux.",
      state.neSaitPasEncore,
      () => {
        state.neSaitPasEncore = !state.neSaitPasEncore;
        if (state.neSaitPasEncore) state.niveauxVises = [];
        render();
      },
    ),
  );
  shell.appendChild(dontKnow);

  return shell;
}
function getFilteredSchools() {
  let pool = [];
  const wantOSSD = state.diplomes.includes("ossd") || state.diplomes.length === 0;
  const wantHSD = state.diplomes.includes("hsd") || state.diplomes.length === 0;
  if (wantOSSD) pool = pool.concat(secondarySchools.ossd.map((s) => ({ ...s, type: "ossd" })));
  if (wantHSD) pool = pool.concat(secondarySchools.hsd.map((s) => ({ ...s, type: "hsd" })));

  if (state.langue && state.langue !== "les-deux") {
    const wanted = state.langue === "francais" ? "français" : "anglais";
    pool = pool.filter((s) => {
      const l = (s.langue || "").toLowerCase();
      return l.includes(wanted) || l.includes("les deux");
    });
  }
  return pool;
}

function renderSchools(step) {
  const avertissementFrancais =
    state.langue === "francais"
      ? "À savoir : les écoles ne sont pas francophones de la même façon. École Louis Legrand et École Virtuelle Canadienne Inter-nations enseignent entièrement en français (confirmé au registre officiel de l’Ontario). NPU et Académie Préuniversitaire offrent plusieurs cours en français, l’anglais étant une matière parmi les autres. Clonlara fonctionne par projet avec une conseillère francophone (diplôme américain). D’autres n’offrent qu’un site et un accompagnement en français, les cours restant en anglais. Demande à chaque école ce qui est réellement offert en français."
      : null;
  const shell = screenShell(
    step,
    "Écoles filtrées selon ton diplôme et ta langue d'enseignement. <strong>Prix et conditions relevés en mai 2026</strong> — ils changent souvent. Vérifie toujours directement auprès de l'école avant de t'engager.",
    avertissementFrancais,
  );
  const pool = getFilteredSchools();
  const grid = document.createElement("div");
  grid.className = "results-grid";
  if (!pool.length) {
    grid.innerHTML = '<p class="summary-empty">Aucune école ne correspond à ces critères — élargis tes choix à l\'écran précédent.</p>';
  } else {
    grid.innerHTML = pool.map((s) => buildSchoolCard(s, s.type)).join("");
  }
  const domainesChoisis = (state.domaines || []).filter((d) => coursParDomaine[d]);
  if (domainesChoisis.length) {
    const vus = new Set();
    const box = document.createElement("div");
    box.className = "info-box";
    let html = "<strong>Cours de 12e année habituellement demandés pour ton domaine</strong><br>";
    domainesChoisis.forEach((d) => {
      const [nom, codes] = coursParDomaine[d];
      if (vus.has(nom)) return;
      vus.add(nom);
      html += "<span class=\"cours-dom\">" + nom + " : " + codes + "</span><br>";
    });
    html += "<em>Codes officiels des cours OSSD. Vérifie les préalables exacts sur le site de l\'université visée — ils varient d\'un programme à l\'autre.</em>";
    box.innerHTML = html;
    shell.appendChild(box);
  }
  shell.appendChild(grid);
  return shell;
}

function renderWantsUniversity(step) {
  const shell = screenShell(
    step,
    "Souhaitez-vous avoir des propositions d'universités en ligne ?",
    null,
  );
  const grid = document.createElement("div");
  grid.className = "choices";
  options.wantsUniversity.forEach(([value, title, body]) => {
    grid.appendChild(
      choiceCard(title, body, state.wantsUniversity === value, () => {
        state.wantsUniversity = value;
        render();
      }),
    );
  });
  shell.appendChild(grid);
  return shell;
}

function renderTypeUniversite(step) {
  const shell = screenShell(
    step,
    "Langue et pays des universités en ligne que tu souhaites explorer.",
    null,
  );
  shell.appendChild(sectionTitle("Langue"));
  shell.appendChild(buildSingleSelectGroup("univLangue", options.langue, "three"));

  shell.appendChild(sectionTitle("Pays"));
  shell.appendChild(buildSingleSelectGroup("univPays", options.univPays, "three"));

  return shell;
}

function getFilteredUniversities() {
  const paysMap = { canada: "canada", "etats-unis": "états-unis" };
  return onlineUniversities.filter((u) => {
    let okLangue = true;
    let okPays = true;
    if (state.univLangue && state.univLangue !== "les-deux") {
      const wanted = state.univLangue === "francais" ? "français" : "anglais";
      okLangue = (u.langue || "").toLowerCase().includes(wanted);
    }
    if (state.univPays && state.univPays !== "les-deux") {
      okPays = (u.pays || "").toLowerCase().includes(paysMap[state.univPays]);
    }
    return okLangue && okPays;
  });
}

function renderUniversities(step) {
  const shell = screenShell(
    step,
    "Universités en ligne filtrées selon la langue et le pays choisis. Sélectionne celles qui t'intéressent pour les ajouter au résumé.",
    null,
  );
  const pool = getFilteredUniversities();
  const hint = document.createElement("p");
  hint.className = "selection-hint";
  hint.textContent = state.selectedUniversities.length
    ? `${state.selectedUniversities.length} université(s) sélectionnée(s)`
    : "Clique sur une carte pour la sélectionner.";
  shell.appendChild(hint);

  const grid = document.createElement("div");
  grid.className = "results-grid";
  if (!pool.length) {
    grid.innerHTML = '<p class="summary-empty">Aucune université ne correspond à ces critères — élargis tes filtres à l\'écran précédent.</p>';
  } else {
    grid.innerHTML = pool
      .map((u) => buildUniversityCard(u, state.selectedUniversities.includes(u.id)))
      .join("");
  }
  shell.appendChild(grid);

  grid.querySelectorAll(".university-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedUniversities = toggle(state.selectedUniversities, card.dataset.id);
      render();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  return shell;
}
function renderSummary(step) {
  const shell = screenShell(
    step,
    "Voici ton parcours personnalisé. Imprime-le, partage-le ou envoie-le par courriel pour garder une trace.",
    null,
  );
  const wrap = document.createElement("div");
  wrap.className = "summary-screen";

  const banner = document.createElement("div");
  banner.className = "summary-banner";
  banner.innerHTML = `
    <span class="summary-banner-icon">🎓</span>
    <div class="summary-banner-text">
      <h2>Ton parcours Cap sur Diplôme</h2>
      <p>Résumé généré à titre informatif — vérifie chaque détail directement auprès des institutions.</p>
    </div>
  `;
  wrap.appendChild(banner);

  const cols = document.createElement("div");
  cols.className = "summary-cols";

  const niveauLabel = labelFromOptions("niveauScolaire", state.niveauScolaire);
  const langueLabel = labelFromOptions("langue", state.langue);
  const diplomesLabel = state.diplomes.map((d) => labelFromOptions("diplomes", d)).join(", ") || "—";
  const modesLabel = state.modes.map((m) => labelFromOptions("modes", m)).join(", ") || "—";
  const domainesLabel = state.domaines.map((d) => labelFromOptions("domaines", d)).join(", ") || "—";
  const niveauxVisesLabel = state.neSaitPasEncore
    ? "Je ne sais pas encore"
    : state.niveauxVises.map((n) => labelFromOptions("niveauxVises", n)).join(", ") || "—";

  const profileBlock = document.createElement("div");
  profileBlock.className = "summary-block";
  profileBlock.innerHTML = `
    <p class="summary-block-title">👤 Profil de l'élève</p>
    <div class="summary-profile-row">
      <span class="tag">Âge : <strong>${labelFromOptions("trancheAge", state.trancheAge)}</strong></span>
      <span class="tag green">Niveau scolaire : <strong>${niveauLabel}</strong></span>
      <span class="tag gold">Domaine(s) : <strong>${domainesLabel}</strong></span>
      <span class="tag">Niveau visé : <strong>${niveauxVisesLabel}</strong></span>
    </div>
    ${hasContingente() ? '<p class="summary-empty">⚠️ Domaine contingenté sélectionné — le DEC est souvent exigé ou favorisé au Québec pour médecine, droit ou pharmacie. Vérifie directement les conditions de chaque université.</p>' : ""}
  `;
  cols.appendChild(profileBlock);

  const parcoursBlock = document.createElement("div");
  parcoursBlock.className = "summary-block";
  parcoursBlock.innerHTML = `
    <p class="summary-block-title">📘 Parcours secondaire</p>
    <div class="summary-profile-row">
      <span class="tag">Langue : <strong>${langueLabel}</strong></span>
      <span class="tag green">Diplôme(s) : <strong>${diplomesLabel}</strong></span>
      <span class="tag">Mode(s) : <strong>${modesLabel}</strong></span>
    </div>
  `;
  cols.appendChild(parcoursBlock);

  const filteredSchools = getFilteredSchools();
  const allSchoolsFallback = [
    ...secondarySchools.ossd.map((s) => ({ ...s, type: "ossd" })),
    ...secondarySchools.hsd.map((s) => ({ ...s, type: "hsd" })),
  ];
  const schoolsPool = filteredSchools.length ? filteredSchools : allSchoolsFallback;
  const schoolsFallbackNote = filteredSchools.length
    ? ""
    : '<p class="summary-empty">Aucune école ne correspond exactement à tes critères — voici la liste complète des écoles pour explorer toutes les options :</p>';
  const schoolsBlock = document.createElement("div");
  schoolsBlock.className = "summary-block";
  schoolsBlock.innerHTML = `
    <p class="summary-block-title">🏫 Écoles secondaires correspondantes</p>
    ${schoolsFallbackNote}
    <div class="summary-checklist-list">
      ${schoolsPool
        .map(
          (s) => `
        <div class="summary-uni-item">
          <div class="summary-uni-left">
            <span class="summary-uni-name">${s.name}</span>
            <span class="summary-uni-fees">💰 ${s.prix || "Sur demande"}</span>
          </div>
          <div class="summary-uni-right">
            <a class="summary-uni-link" href="${s.site}" target="_blank" rel="noopener noreferrer">↗</a>
          </div>
        </div>`,
        )
        .join("")}
    </div>
  `;
  cols.appendChild(schoolsBlock);

  if (state.wantsUniversity !== "non") {
    const filteredUnis = getFilteredUniversities();
    const uniPool = state.selectedUniversities.length
      ? onlineUniversities.filter((u) => state.selectedUniversities.includes(u.id))
      : filteredUnis.length
        ? filteredUnis
        : onlineUniversities;
    const uniFallbackNote =
      !state.selectedUniversities.length && !filteredUnis.length
        ? '<p class="summary-empty">Aucune université ne correspond exactement à tes critères — voici la liste complète pour explorer toutes les options :</p>'
        : "";
    const uniBlock = document.createElement("div");
    uniBlock.className = "summary-block";
    uniBlock.innerHTML = `
      <p class="summary-block-title">🏛️ Universités en ligne ciblées</p>
      ${uniFallbackNote}
      <div class="summary-checklist-list">
        ${uniPool
          .map(
            (u) => `
        <div class="summary-uni-item">
          <div class="summary-uni-left">
            <span class="summary-uni-name">${u.name}</span>
            <span class="summary-uni-fees">💰 ${u.cout || "Sur demande"}</span>
          </div>
          <div class="summary-uni-right">
            <a class="summary-uni-link" href="${u.site}" target="_blank" rel="noopener noreferrer">↗</a>
          </div>
        </div>`,
          )
          .join("")}
      </div>
      ${!state.selectedUniversities.length && filteredUnis.length ? '<p class="summary-empty">Aucune université sélectionnée manuellement — toutes celles qui correspondent à tes critères sont affichées.</p>' : ""}
    `;
    cols.appendChild(uniBlock);
  } else {
    const noUni = document.createElement("div");
    noUni.className = "summary-block";
    noUni.innerHTML = `
      <p class="summary-block-title">🏛️ Universités</p>
      <div class="summary-profile-row">
        <span class="tag">Parcours secondaire uniquement — étape université non activée.</span>
      </div>
    `;
    cols.appendChild(noUni);
  }

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
        ["🏠", "Politique homeschool", "Chaque université a sa propre politique envers les candidats homeschoolés ou issus d'écoles en ligne."],
        ["💲", "Coûts réels", "Les frais indiqués sont des estimations. Ajouter frais d'inscription, matériel, examens, hébergement et assurance."],
      ]
        .map(
          ([icon, label, desc]) => `
        <div class="verif-card">
          <span class="verif-icon">${icon}</span>
          <div class="verif-body">
            <strong class="verif-label">${label}</strong>
            <span class="verif-desc">${desc}</span>
          </div>
        </div>`,
        )
        .join("")}
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
        <p class="warning-section-sub">Cap sur Diplôme est un guide informatif. Il ne remplace pas un conseiller professionnel ni les informations officielles, et ne fait aucune recommandation personnalisée.</p>
      </div>
    </div>
    <div class="limits-footer">
      Ce document est fourni à titre informatif et suggestif uniquement. Cap sur Diplôme ne garantit aucun résultat académique ou d'admission. La décision finale appartient toujours à la famille.
    </div>
  `;
  wrap.appendChild(limitesSection);

  const actionRow = document.createElement("div");
  actionRow.className = "summary-action-row";

  const printBtn = document.createElement("button");
  printBtn.className = "summary-print-btn";
  printBtn.type = "button";
  printBtn.innerHTML = "🖨️ Imprimer / Enregistrer en PDF";
  printBtn.addEventListener("click", () => window.print());
  actionRow.appendChild(printBtn);

  const emailBtn = document.createElement("button");
  emailBtn.className = "summary-share-btn";
  emailBtn.type = "button";
  emailBtn.innerHTML = "✉️ Envoyer par courriel";
  emailBtn.addEventListener("click", () => {
    const subject = encodeURIComponent("Mon parcours Cap sur Diplôme");
    const body = encodeURIComponent(buildEmailBody());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  actionRow.appendChild(emailBtn);

  const shareBtn = document.createElement("button");
  shareBtn.className = "summary-share-btn";
  shareBtn.type = "button";
  shareBtn.innerHTML = "🔗 Copier le lien de partage";
  shareBtn.addEventListener("click", () => {
    const url = encodeStateToURL();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          shareBtn.innerHTML = "✓ Lien copié !";
          shareBtn.classList.add("copied");
          setTimeout(() => {
            shareBtn.innerHTML = "🔗 Copier le lien de partage";
            shareBtn.classList.remove("copied");
          }, 2500);
        })
        .catch(() => fallbackCopy(url, shareBtn));
    } else {
      fallbackCopy(url, shareBtn);
    }
  });
  actionRow.appendChild(shareBtn);

  const resetBtn = document.createElement("button");
  resetBtn.className = "nav-btn ghost";
  resetBtn.type = "button";
  resetBtn.innerHTML = "🔄 Nouvelle recherche";
  resetBtn.addEventListener("click", () => {
    resetState();
    currentStep = 0;
    render();
  });
  actionRow.appendChild(resetBtn);

  wrap.appendChild(actionRow);

  shell.appendChild(wrap);
  return shell;
}

function buildEmailBody() {
  const lines = [
    "Mon parcours Cap sur Diplôme",
    "",
    `Âge : ${labelFromOptions("trancheAge", state.trancheAge)}`,
    `Niveau scolaire : ${labelFromOptions("niveauScolaire", state.niveauScolaire)}`,
    `Langue : ${labelFromOptions("langue", state.langue)}`,
    `Diplôme(s) : ${state.diplomes.map((d) => labelFromOptions("diplomes", d)).join(", ") || "—"}`,
    `Mode(s) : ${state.modes.map((m) => labelFromOptions("modes", m)).join(", ") || "—"}`,
    `Domaine(s) : ${state.domaines.map((d) => labelFromOptions("domaines", d)).join(", ") || "—"}`,
    `Niveau visé : ${state.neSaitPasEncore ? "Je ne sais pas encore" : state.niveauxVises.map((n) => labelFromOptions("niveauxVises", n)).join(", ") || "—"}`,
    "",
    "Ce résumé est informatif — vérifie chaque détail directement auprès des institutions.",
  ];
  return lines.join("\n");
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
    setTimeout(() => {
      btn.innerHTML = "🔗 Copier le lien de partage";
    }, 2500);
  }
  document.body.removeChild(ta);
}
function canContinue() {
  switch (currentStep) {
    case STEP_ACCUEIL:
      return true;
    case STEP_PROFIL:
      return Boolean(state.trancheAge) && Boolean(state.niveauScolaire);
    case STEP_INTERCALAIRE:
      return true;
    case STEP_PARCOURS:
      return Boolean(state.langue) && state.diplomes.length > 0 && state.modes.length > 0;
    case STEP_DOMAINE:
      return state.domaines.length > 0 && (state.niveauxVises.length > 0 || state.neSaitPasEncore);
    case STEP_ECOLES:
      return true;
    case STEP_VEUT_UNIV:
      return Boolean(state.wantsUniversity);
    case STEP_TYPE_UNIV:
      return Boolean(state.univLangue) && Boolean(state.univPays);
    case STEP_LISTE_UNIV:
      return true;
    case STEP_RESUME:
      return true;
    default:
      return true;
  }
}

function updateInsight() {
  const insight = document.getElementById("insightText");
  const signals = document.getElementById("signalList");

  const stepMessages = [
    "Bienvenue — ce guide t'aide à comparer les options, sans jamais décider à ta place.",
    "Ton profil personnalise tout le reste du parcours.",
    "Cet écran est informatif — aucun choix à faire, juste à lire.",
    "Langue, diplôme et mode d'enseignement déterminent les écoles proposées à l'écran suivant.",
    hasContingente()
      ? "⚠️ Domaine contingenté sélectionné — le DEC est souvent requis au Québec pour ce domaine."
      : "Ton domaine et ton niveau visé affinent les universités proposées plus loin.",
    "Ces écoles correspondent à ton diplôme et ta langue. Consulte l'Annuaire pour tout comparer.",
    state.wantsUniversity === "oui"
      ? "Parfait — les écrans université sont activés."
      : state.wantsUniversity === "non"
        ? "Tu passes directement au résumé final."
        : "Ta réponse active ou désactive les écrans universités qui suivent.",
    "Langue et pays déterminent les universités en ligne proposées.",
    state.selectedUniversities.length
      ? `${state.selectedUniversities.length} université(s) dans ton résumé.`
      : "Sélectionne les universités qui t'intéressent pour les ajouter au résumé.",
    "Ton parcours complet est prêt. Imprime, envoie par courriel ou partage le lien.",
  ];

  insight.textContent = stepMessages[currentStep] || "Le simulateur s'adapte à ton profil en temps réel.";

  const tags = [];
  if (state.niveauScolaire) tags.push({ text: labelFromOptions("niveauScolaire", state.niveauScolaire), tone: "blue" });
  state.diplomes.forEach((d) => tags.push({ text: labelFromOptions("diplomes", d), tone: "green" }));
  if (state.langue) tags.push({ text: labelFromOptions("langue", state.langue), tone: "" });
  if (hasContingente()) tags.push({ text: "Domaine contingenté", tone: "red" });
  if (state.wantsUniversity === "oui") tags.push({ text: "Université visée", tone: "gold" });

  signals.innerHTML = tags
    .map((t) => `<span class="tag ${t.tone}">${t.text}</span>`)
    .join("");
}

function getNextStep(from) {
  if (from === STEP_VEUT_UNIV && state.wantsUniversity === "non") return STEP_RESUME;
  return from + 1;
}

function getPrevStep(from) {
  if (from === STEP_RESUME && state.wantsUniversity === "non") return STEP_VEUT_UNIV;
  if ((from === STEP_TYPE_UNIV || from === STEP_LISTE_UNIV) && state.wantsUniversity === "non")
    return STEP_VEUT_UNIV;
  return from - 1;
}

function encodeStateToURL() {
  try {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
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
      Object.assign(state, snapshot);
      return true;
    }
  } catch (e) {}
  return false;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep = getPrevStep(currentStep);
    render();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (!canContinue()) return;
  if (currentStep < steps.length - 1) {
    currentStep = getNextStep(currentStep);
    render();
  } else {
    resetState();
    currentStep = 0;
    render();
  }
});

// ─── Boot ─────────────────────────────────────────────────────────────────
const restoredFromURL = decodeStateFromURL();
if (restoredFromURL) {
  currentStep = steps.length - 1;
  render();
} else {
  const restoredFromStorage = loadStateFromStorage();
  render();
  if (restoredFromStorage && currentStep > 0) {
    showRestoredToast();
  }
}
