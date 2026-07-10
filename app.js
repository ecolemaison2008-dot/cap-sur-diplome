// ==========================================================================
// CAP DIPLÔME — Simulateur éducatif
// Reconstruit pour suivre le Plan v4 (validé) et la Base Centrale Excel.
// ==========================================================================

const state = {
  // Écran 2 — Profil de l'élève
  age: null,
  pays: null,
  niveauScolaire: null, // ... 'des' = DES obtenu (déclenche l'intercalaire)

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
  const tierBadge = school.tier
    ? `<span class="school-tier">${school.tier}</span>`
    : "";
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
          ${tierBadge}
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
        <span class="tag">Admission avec : ${uni.admissionAvec || "à confirmer"}</span>
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

function renderAnnuaireTab(tab) {
  const content = document.getElementById("annuaireContent");
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
  state.age = null;
  state.pays = null;
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
const STEP_INTERCALAIRE = 2;
const STEP_PARCOURS = 3;
const STEP_DOMAINE = 4;
const STEP_ECOLES = 5;
const STEP_VEUT_UNIV = 6;
const STEP_TYPE_UNIV = 7;
const STEP_LISTE_UNIV = 8;
const STEP_RESUME = 9;
const secondarySchools = {
  ossd: [{"id": "OSSD-001", "name": "Blyth Academy Online", "bsid": "669675", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://blytheducation.com/online", "email": "admissions@blytheducation.com", "prix": "Sur demande", "duree": "Min 2 sem.", "mode": "Asynchrone / Live (Orbit)", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-002", "name": "Virtual High School (VHS)", "bsid": "665681", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://virtualhighschool.com", "email": "info@virtualhighschool.com", "prix": "469$–589$/cours", "duree": "Min 2 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-003", "name": "Ontario Virtual School (OVS)", "bsid": "665804", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://ontariovirtualschool.ca", "email": "admin@ontariovirtualschool.ca", "prix": "~650$/cours", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Non", "ncaa": "Non"}, {"id": "OSSD-004", "name": "Northern Pre-University (NPU)", "bsid": "882700", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 1", "site": "https://np-u.com", "email": "admin@np-u.com", "prix": "Via OVS ~650$", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Français/Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-005", "name": "Ontario eSecondary (OES)", "bsid": "667186", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://oeshighschool.com", "email": "info@oeshighschool.com", "prix": "Voir page cours (CA) · 795$/cours (Intl)", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-006", "name": "Toronto eSchool", "bsid": "886520", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://ossd.torontoeschool.com", "email": "info@torontoeschool.com", "prix": "150$+200$+500$+cours", "duree": "9-10 mois (prog.QC)", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-007", "name": "Canadian Virtual School (CVS)", "bsid": "882250", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 2", "site": "https://canadianvirtualschool.ca", "email": "info@canadianvirtualschool.ca", "prix": "500$–550$/cours", "duree": "Min 3 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-008", "name": "Ontario Education Online (OEO)", "bsid": "882902", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://ontarioeducationonline.ca", "email": "info@ontarioeducationonline.ca", "prix": "499$–599$/cours", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Non", "ncaa": "Non"}, {"id": "OSSD-009", "name": "The New Educator", "bsid": "669484", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://theneweducator.com", "email": "contact@theneweducator.com", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Asynchrone", "langue": "Français/Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-010", "name": "Keystone School", "bsid": "888468", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://keystoneschools.ca", "email": "info@keystoneschools.ca", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-011", "name": "Aubrey Academy", "bsid": "665140", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://aubreyacademy.ca", "email": "info@aubreyacademy.ca", "prix": "Sur demande", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Oui"}, {"id": "OSSD-012", "name": "KAI Global School", "bsid": "665538", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://kaiglobalschool.com", "email": "info@kaiglobalschool.com", "prix": "Sur demande", "duree": "Min 4 sem.", "mode": "Hybride", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-013", "name": "Toronto Imperial School (TIS)", "bsid": "881941", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://torontoimperial.com", "email": "info@torontoimperial.com", "prix": "690$–1450$/cours", "duree": "Flexible", "mode": "Synchrone", "langue": "Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}, {"id": "OSSD-014", "name": "USCA Academy", "bsid": "À confirmer", "accred": "Ministère Éducation Ontario", "tier": "★ Tier 3", "site": "https://uscaacademy.com", "email": "info@uscaacademy.com", "prix": "~16 800$/an", "duree": "Hybride live", "mode": "Synchrone", "langue": "Français/Anglais", "pays": "Canada", "ecoleHote": "Oui", "plar": "Oui", "ncaa": "Non"}],
  hsd: [{"id": "HSD-001", "name": "Clonlara School", "bsid": "", "accred": "NCPSA · MSA-CESS · Accred.Intl", "tier": "★ Tier 2", "site": "https://clonlara.org", "email": "info@clonlara.org", "prix": "395$–695$/crédit USD", "duree": "Libre", "mode": "Asynchrone", "langue": "Français/Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-002", "name": "Laurel Springs School", "bsid": "", "accred": "WASC · Cognia", "tier": "★ Tier 1", "site": "https://laurelsprings.com", "email": "admissions@laurelsprings.com", "prix": "7 200$–17 250$/an USD", "duree": "12 mois min", "mode": "Hybride", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-003", "name": "Excel High School", "bsid": "", "accred": "Cognia · MSA-CESS · NCA · NWAC", "tier": "★ Tier 2", "site": "https://excelhighschool.com", "email": "info@excelhighschool.com", "prix": "~1 900$/an USD", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-004", "name": "Forest Trail Academy", "bsid": "", "accred": "Cognia · MSA · AI · NCPSA", "tier": "★ Tier 2", "site": "https://foresttrailacademy.com", "email": "info@foresttrailacademy.com", "prix": "~3 200$/an USD", "duree": "12 mois", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-005", "name": "James Madison HS", "bsid": "", "accred": "Cognia · DEAC", "tier": "★ Tier 3", "site": "https://jmhs.com", "email": "info@jmhs.com", "prix": "699$–1 299$ USD total", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-006", "name": "American School of Correspondence", "bsid": "", "accred": "MSA-CESS · NCPSA · Accred.Intl", "tier": "★ Tier 3", "site": "https://americanschoolofcorr.com", "email": "customerrelations@americanschool.org", "prix": "~1 100$/an USD", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-007", "name": "Penn Foster High School", "bsid": "", "accred": "Cognia · MSA-CESS · DEAC", "tier": "★ Tier 3", "site": "https://pennfoster.edu", "email": "admissions@pennfoster.edu", "prix": "1 149$ USD (complet)", "duree": "Flexible", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-008", "name": "Whitmore School", "bsid": "", "accred": "Cognia · NCA · SACS · NWAC", "tier": "★ Tier 3", "site": "https://whitmoreschool.org", "email": "info@whitmoreschool.org", "prix": "1 699$/an USD", "duree": "Mastery", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}, {"id": "HSD-009", "name": "Ogburn Online School", "bsid": "", "accred": "Cognia · WASC · MSA · AI · NCPSA · AISF", "tier": "★ Tier 2", "site": "https://ogburnonlineschool.com", "email": "info@ogburnonlineschool.com", "prix": "250$/mois USD", "duree": "Mensuel", "mode": "Asynchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-010", "name": "Crimson Global Academy (CGA)", "bsid": "", "accred": "WASC · NCAA · Cambridge · AP", "tier": "★ Tier 2", "site": "https://crimsonglobalacademy.school", "email": "admissions@crimsoneducation.org", "prix": "Sur demande", "duree": "Flexible", "mode": "Hybride / Live", "langue": "Anglais", "pays": "International", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Oui"}, {"id": "HSD-011", "name": "Dwight Global Online School", "bsid": "", "accred": "Cognia · MSA-CESS · CIS · IBO", "tier": "★ Tier 1", "site": "https://dwight.edu/dwight-global", "email": "admissions@dwight.edu", "prix": "42 750$/an USD", "duree": "Annuel", "mode": "Synchrone", "langue": "Anglais", "pays": "États-Unis", "ecoleHote": "N/A", "plar": "Oui", "ncaa": "Non"}]
};

const onlineUniversities = [{"id": "UNIV-001", "name": "Athabasca University", "pays": "Canada", "province": "Alberta", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Éducation · Santé · Sciences", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "OSSD · HSD · DES+12e année", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "~900$–1100$/cours CAD", "site": "https://athabascau.ca"}, {"id": "UNIV-002", "name": "Thompson Rivers Open University", "pays": "Canada", "province": "Colombie-Brit.", "langue": "Anglais", "type": "Publique", "programmes": "Business · Arts · Technologie · Sciences", "niveau": "Certificat · Bac", "admissionAvec": "OSSD · HSD · 12e année complétée", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "Variable", "site": "https://tru.ca/distance.html"}, {"id": "UNIV-003", "name": "TÉLUQ", "pays": "Canada", "province": "Québec", "langue": "Français", "type": "Publique", "programmes": "Administration · Informatique · Communication · Éducation", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "DEC · 21 ans+", "mode": "Asynchrone", "duree": "3-4 ans", "cout": "~1 200$/cours CAD", "site": "https://teluq.ca"}, {"id": "UNIV-004", "name": "Arizona State University Online", "pays": "États-Unis", "province": "Arizona", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Sciences · Ingénierie", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "4 ans", "cout": "~600$/crédit USD", "site": "https://asuonline.asu.edu"}, {"id": "UNIV-005", "name": "Southern New Hampshire University (SNHU)", "pays": "États-Unis", "province": "New Hampshire", "langue": "Anglais", "type": "Privée", "programmes": "Business · Informatique · Psychologie · Éducation", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "~320$/crédit USD", "site": "https://snhu.edu"}, {"id": "UNIV-006", "name": "Western Governors University (WGU)", "pays": "États-Unis", "province": "Utah", "langue": "Anglais", "type": "Non-profit", "programmes": "Business · IT · Santé · Éducation", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "~4 000$/6 mois USD", "site": "https://wgu.edu"}, {"id": "UNIV-007", "name": "University of the People (UoPeople)", "pays": "États-Unis", "province": "Californie", "langue": "Anglais", "type": "Non-profit", "programmes": "Business · Informatique · Santé publique", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Asynchrone", "duree": "Flexible", "cout": "Frais d'examen seulement", "site": "https://uopeople.edu"}, {"id": "UNIV-008", "name": "Purdue Global", "pays": "États-Unis", "province": "Indiana", "langue": "Anglais", "type": "Publique", "programmes": "Business · IT · Santé · Justice", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~375$/crédit USD", "site": "https://purdueglobal.edu"}, {"id": "UNIV-009", "name": "Penn State World Campus", "pays": "États-Unis", "province": "Pennsylvanie", "langue": "Anglais", "type": "Publique", "programmes": "Business · Informatique · Sciences · Ingénierie", "niveau": "Bac · Maîtrise", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "4 ans", "cout": "~650$/crédit USD", "site": "https://worldcampus.psu.edu"}, {"id": "UNIV-010", "name": "Liberty University Online", "pays": "États-Unis", "province": "Virginie", "langue": "Anglais", "type": "Privée", "programmes": "Business · Éducation · Santé · Théologie", "niveau": "Bac · Maîtrise · Doctorat", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~390$/crédit USD", "site": "https://liberty.edu/online"}, {"id": "UNIV-011", "name": "Open University UK", "pays": "Royaume-Uni", "province": "Angleterre", "langue": "Anglais", "type": "Publique", "programmes": "Arts · Business · Technologie · Sciences humaines", "niveau": "Certificat · Bac · Maîtrise", "admissionAvec": "12e année ou adulte", "mode": "Asynchrone", "duree": "Flexible", "cout": "~2 000–6 000 £/an", "site": "https://open.ac.uk"}, {"id": "UNIV-012", "name": "Année préparatoire UdeM", "pays": "Canada", "province": "Québec", "langue": "Français", "type": "Publique", "programmes": "Sciences · Sciences humaines · Arts et lettres", "niveau": "Pré-bac (passerelle)", "admissionAvec": "OSSD · DES+4ans · Diplôme 12e année", "mode": "Présentiel (Montréal/Laval)", "duree": "1 an", "cout": "~4 350$ CAD total", "site": "https://admission.umontreal.ca/programmes/annee-preparatoire"}, {"id": "UNIV-013", "name": "Capella University", "pays": "États-Unis", "province": "Minnesota", "langue": "Anglais", "type": "Privée", "programmes": "Business · Psychologie · IT · Santé", "niveau": "Bac · Maîtrise · Doctorat", "admissionAvec": "HSD ou équivalent", "mode": "Hybride", "duree": "Flexible", "cout": "~470$/crédit USD", "site": "https://capella.edu"}];
const options = {
  niveauScolaire: [
    ["3e-sec", "3e SECONDAIRE", ""],
    ["4e-sec", "4e SECONDAIRE", ""],
    ["5e-sec", "5e SECONDAIRE", ""],
    ["des", "DES OBTENU", "Affiche l'écran de conversion DES avant de continuer."],
    ["post-sec", "POST-SECONDAIRE / CÉGEP", ""],
  ],
  pays: [
    ["qc", "QUÉBEC", ""],
    ["on", "ONTARIO", ""],
    ["autre-ca", "AUTRE PROVINCE CANADIENNE", ""],
    ["hors-ca", "HORS CANADA", ""],
  ],
  langue: [
    ["francais", "FRANÇAIS", "Options francophones plus limitées — à vérifier école par école."],
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
    ["oui", "OUI, JE VISE L'UNIVERSITÉ", "Explorer les universités en ligne adaptées à mon diplôme."],
    ["non", "NON, PAS MAINTENANT", "Je me concentre sur le diplôme secondaire pour l'instant."],
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
  { title: "CAP DIPLÔME", eyebrow: "Bienvenue", render: renderAccueil },
  { title: "PROFIL DE L'ÉLÈVE", eyebrow: "Étape 1", render: renderProfilEleve },
  { title: "CONVERSION DE TON DES", eyebrow: "Information", render: renderIntercalaireDES },
  { title: "PARCOURS SCOLAIRE", eyebrow: "Étape 2", render: renderParcoursScolaire },
  { title: "DOMAINE ET NIVEAU VISÉS", eyebrow: "Étape 3", render: renderDomaineNiveau },
  { title: "ÉCOLES SECONDAIRES", eyebrow: "Résultats", render: renderSchools },
  { title: "POURSUITE À L'UNIVERSITÉ ?", eyebrow: "Étape 4", render: renderWantsUniversity },
  { title: "TYPE D'UNIVERSITÉ RECHERCHÉE", eyebrow: "Étape 5", render: renderTypeUniversite },
  { title: "UNIVERSITÉS EN LIGNE", eyebrow: "Résultats", render: renderUniversities },
  { title: "RÉSUMÉ FINAL", eyebrow: "Ton parcours", render: renderSummary },
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
  document.getElementById("nextBtn").textContent =
    currentStep === steps.length - 1 ? "Recommencer" : "Continuer";
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
    "font-weight:700;margin:24px 0 10px;font-size:0.95rem;letter-spacing:0.02em;";
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
    "Un guide informatif pour les familles en école à la maison au Québec — pour s'y retrouver dans les études secondaires et universitaires en ligne.",
    null,
  );
  const info = document.createElement("div");
  info.className = "warning-section";
  info.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">⚠️</span>
      <div>
        <h3 class="warning-section-title">Avant de commencer</h3>
        <p class="warning-section-sub">CAP DIPLÔME n'est pas un conseiller d'orientation, ni un organisme officiel, et ne fait aucune recommandation personnalisée. La décision finale appartient toujours à la famille.</p>
      </div>
    </div>
  `;
  shell.appendChild(info);
  const startBtn = document.createElement("button");
  startBtn.className = "nav-btn primary";
  startBtn.type = "button";
  startBtn.style.marginTop = "20px";
  startBtn.textContent = "Commencer →";
  startBtn.addEventListener("click", () => {
    currentStep = getNextStep(currentStep);
    render();
  });
  shell.appendChild(startBtn);
  return shell;
}

function renderProfilEleve(step) {
  const shell = screenShell(
    step,
    "Quelques informations de base pour personnaliser la suite du parcours.",
    null,
  );

  shell.appendChild(sectionTitle("Âge de l'élève"));
  const ageWrap = document.createElement("div");
  ageWrap.className = "slider-box";
  ageWrap.innerHTML = `<label><span>Âge</span><b>${state.age || "—"} ans</b></label><input type="range" min="10" max="20" value="${state.age || 15}" />`;
  ageWrap.querySelector("input").addEventListener("input", (e) => {
    state.age = Number(e.target.value);
    render();
  });
  shell.appendChild(ageWrap);

  shell.appendChild(sectionTitle("Province ou pays de résidence"));
  shell.appendChild(buildSingleSelectGroup("pays", options.pays, "three"));

  shell.appendChild(sectionTitle("Niveau scolaire actuel"));
  shell.appendChild(buildSingleSelectGroup("niveauScolaire", options.niveauScolaire, "three"));

  return shell;
}

function renderIntercalaireDES(step) {
  const shell = screenShell(
    step,
    "Ce que ton DES te permet déjà, et ce qu'il te reste à compléter. Lecture seule — aucun choix à faire ici.",
    null,
  );
  const info = document.createElement("div");
  info.className = "warning-section";
  info.innerHTML = `
    <div class="warning-section-header">
      <span class="warning-section-icon">ℹ️</span>
      <div>
        <h3 class="warning-section-title">Conversion de ton DES</h3>
        <p class="warning-section-sub">Chaque école évalue ton dossier individuellement — ce résumé est une base de départ.</p>
      </div>
    </div>
    <div class="verif-grid">
      <div class="verif-card">
        <span class="verif-icon">🔄</span>
        <div class="verif-body">
          <strong class="verif-label">Reconnaissance des acquis (PLAR)</strong>
          <span class="verif-desc">Ton DES québécois peut être reconnu en partie par les écoles OSSD ou HSD via un processus de Prior Learning Assessment and Recognition (PLAR).</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">📚</span>
        <div class="verif-body">
          <strong class="verif-label">Crédits manquants</strong>
          <span class="verif-desc">Il te manque généralement l'équivalent d'une 12e année (OSSD) ou d'un Senior Year (HSD) — souvent entre 4 et 8 cours selon l'école et ton dossier.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">🔗</span>
        <div class="verif-body">
          <strong class="verif-label">Politiques officielles</strong>
          <span class="verif-desc">Consulte la fiche de chaque école à l'écran suivant — la mention PLAR indique si un processus de reconnaissance est proposé.</span>
        </div>
      </div>
      <div class="verif-card">
        <span class="verif-icon">👪</span>
        <div class="verif-body">
          <strong class="verif-label">Responsabilité de la famille</strong>
          <span class="verif-desc">C'est à la famille de contacter chaque école pour confirmer les crédits reconnus — ce simulateur ne fait aucune évaluation officielle.</span>
        </div>
      </div>
    </div>
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
  const shell = screenShell(
    step,
    "Écoles filtrées selon ton diplôme et ta langue d'enseignement. Vérifie toujours les détails directement sur leur site.",
    null,
  );
  const pool = getFilteredSchools();
  const grid = document.createElement("div");
  grid.className = "results-grid";
  if (!pool.length) {
    grid.innerHTML = '<p class="summary-empty">Aucune école ne correspond à ces critères — élargis tes choix à l\'écran précédent.</p>';
  } else {
    grid.innerHTML = pool.map((s) => buildSchoolCard(s, s.type)).join("");
  }
  shell.appendChild(grid);
  return shell;
}

function renderWantsUniversity(step) {
  const shell = screenShell(
    step,
    "Ta réponse détermine si les écrans université s'affichent ensuite.",
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
      <h2>Ton parcours CAP DIPLÔME</h2>
      <p>Résumé généré à titre informatif — vérifie chaque détail directement auprès des institutions.</p>
    </div>
  `;
  wrap.appendChild(banner);

  const cols = document.createElement("div");
  cols.className = "summary-cols";

  const niveauLabel = labelFromOptions("niveauScolaire", state.niveauScolaire);
  const paysLabel = labelFromOptions("pays", state.pays);
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
      <span class="tag">Âge : <strong>${state.age || "—"} ans</strong></span>
      <span class="tag">Résidence : <strong>${paysLabel}</strong></span>
      <span class="tag green">Niveau scolaire : <strong>${niveauLabel}</strong></span>
    </div>
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

  const domaineBlock = document.createElement("div");
  domaineBlock.className = "summary-block";
  domaineBlock.innerHTML = `
    <p class="summary-block-title">🎯 Domaine et niveau visés</p>
    <div class="summary-profile-row">
      <span class="tag gold">Domaine(s) : <strong>${domainesLabel}</strong></span>
      <span class="tag">Niveau visé : <strong>${niveauxVisesLabel}</strong></span>
    </div>
    ${hasContingente() ? '<p class="summary-empty">⚠️ Domaine contingenté sélectionné — le DEC est souvent exigé ou favorisé au Québec pour médecine, droit ou pharmacie. Vérifie directement les conditions de chaque université.</p>' : ""}
  `;
  cols.appendChild(domaineBlock);

  const schoolsPool = getFilteredSchools().slice(0, 3);
  const schoolsBlock = document.createElement("div");
  schoolsBlock.className = "summary-block";
  schoolsBlock.innerHTML = `
    <p class="summary-block-title">🏫 Écoles secondaires correspondantes</p>
    <div class="summary-checklist-list">
      ${
        schoolsPool.length
          ? schoolsPool
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
              .join("")
          : '<p class="summary-empty">Aucune école ne correspond exactement — élargis tes critères.</p>'
      }
    </div>
  `;
  cols.appendChild(schoolsBlock);

  if (state.wantsUniversity !== "non") {
    const uniPool = state.selectedUniversities.length
      ? onlineUniversities.filter((u) => state.selectedUniversities.includes(u.id))
      : getFilteredUniversities().slice(0, 3);
    const uniBlock = document.createElement("div");
    uniBlock.className = "summary-block";
    uniBlock.innerHTML = `
      <p class="summary-block-title">🏛️ Universités en ligne ciblées</p>
      <div class="summary-checklist-list">
        ${
          uniPool.length
            ? uniPool
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
                .join("")
            : '<p class="summary-empty">Aucune université ne correspond — élargis tes filtres.</p>'
        }
      </div>
      ${!state.selectedUniversities.length && uniPool.length ? '<p class="summary-empty">Aucune université sélectionnée manuellement — top 3 affiché.</p>' : ""}
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
        <p class="warning-section-sub">CAP DIPLÔME est un guide informatif. Il ne remplace pas un conseiller professionnel ni les informations officielles, et ne fait aucune recommandation personnalisée.</p>
      </div>
    </div>
    <div class="limits-footer">
      Ce document est fourni à titre informatif et suggestif uniquement. CAP DIPLÔME ne garantit aucun résultat académique ou d'admission. La décision finale appartient toujours à la famille.
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
    const subject = encodeURIComponent("Mon parcours CAP DIPLÔME");
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
    "Mon parcours CAP DIPLÔME",
    "",
    `Âge : ${state.age || "—"} ans`,
    `Résidence : ${labelFromOptions("pays", state.pays)}`,
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
      return Boolean(state.age) && Boolean(state.pays) && Boolean(state.niveauScolaire);
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
  if (from === STEP_PROFIL && state.niveauScolaire !== "des") return STEP_PARCOURS;
  if (from === STEP_VEUT_UNIV && state.wantsUniversity === "non") return STEP_RESUME;
  return from + 1;
}

function getPrevStep(from) {
  if (from === STEP_PARCOURS && state.niveauScolaire !== "des") return STEP_PROFIL;
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
