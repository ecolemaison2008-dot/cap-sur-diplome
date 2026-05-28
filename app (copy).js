const state = {
  des: null,

  language: null,

  diploma: null,

  learningMode: null,

  secondaryBudget: null,

  universityBudget: null,

  wantUniversity: null,

  traits: [],

  selectedSchools: [],

  selectedUniversities: [],

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
  career: null,
  universityType: null,
  selectedUniversities: [],
  plar: {
    homeschooling: false,
    projects: false,
    work: false,
    selfLearning: false,
    portfolios: false,
  },
  checklist: {},
};

const secondarySchools = {
  ossd: [
    {
      name: "Blyth Academy Online",
      bsid: "669675",
      tier: "★ Tier 1",
      site: "blytheducation.com/online",
      prix: "Sur demande",
      duree: "Auto-rythmé ou live (Orbit)",
      highlights: [
        "30 000+ familles",
        "160+ cours",
        "NCAA approuvé",
        "AP disponible",
        "Inspection MÉO max 3 ans",
      ],
      plarQC: "PLAR + crédits QC évalués",
    },
    {
      name: "Virtual High School (VHS)",
      bsid: "665681",
      tier: "★ Tier 1",
      site: "virtualhighschool.com",
      prix: "469 $–589 $ CAD/cours",
      duree: "Min 2 sem. / Max 18 mois",
      highlights: [
        "20+ ans d'expérience",
        "Tutorat gratuit inclus",
        "NCAA approuvé",
        "70+ cours",
        "120+ pays",
      ],
      plarQC: "Éval. équivalence QC",
    },
    {
      name: "Ontario Virtual School (OVS)",
      bsid: "665804",
      tier: "★ Tier 1",
      site: "ontariovirtualschool.ca",
      prix: "~650 $ CAD (CA) / ~1 224 $ (Intl)",
      duree: "Min 4 sem. / Max 12 mois",
      highlights: [
        "170+ cours",
        "25 000+ étudiants",
        "Éval. sous 2 jours",
        "Start anytime",
      ],
      plarQC: "Via OVS Quebec – NPU",
    },
    {
      name: "Ontario eSecondary (OES)",
      bsid: "667186",
      tier: "★ Tier 2",
      site: "oeshighschool.com",
      prix: "École-hôte 250 $ + éval. QC 150 $ + cours",
      duree: "Min 4 sem. / Max 12 mois",
      highlights: [
        "Tutorat 24/7 GRATUIT illimité",
        "Remise dès 2 cours",
        "NCAA approuvé",
        "~7 cours gr.12",
      ],
      plarQC: "Programme QC dédié; PLAR",
    },
    {
      name: "Toronto eSchool",
      bsid: "886520",
      tier: "★ Tier 2",
      site: "ossd.torontoeschool.com",
      prix: "Applic. 150 $ + Éval. 200 $ + École-hôte 500 $ + cours",
      duree: "9–10 mois (programme QC)",
      highlights: [
        "Accompagnement OUAC/OCAS",
        "Orientation 1-on-1",
        "60+ cours",
        "3 streams",
      ],
      plarQC: "Programme structuré DES→OSSD en 1 an",
    },
    {
      name: "Keystone School",
      bsid: "888468",
      tier: "★ Tier 3",
      site: "keystoneschools.ca",
      prix: "Sur demande",
      duree: "Min 4 sem. / Max 12 mois",
      highlights: [
        "École IB candidate",
        "Approche par projets",
        "Check-ins hebdo",
        "Campus Toronto",
      ],
      plarQC: "Page dédiée DES QC; ~7 cours gr.12",
    },
    {
      name: "Canadian Virtual School",
      bsid: "882250",
      tier: "★ Tier 2",
      site: "canadianvirtualschool.ca",
      prix: "~500 $–550 $ (CA) / ~750 $–800 $ (Intl)",
      duree: "Min 3 sem. / Max 12 mois",
      highlights: [
        "15+ ans d'expérience",
        "Parmi les moins chers",
        "OCT 1-on-1",
        "Fast-track gratuit",
      ],
      plarQC: "Éval. équivalence dispo",
    },
    {
      name: "Ontario Education Online (OEO)",
      bsid: "882902",
      tier: "★ Tier 3",
      site: "ontarioeducationonline.ca",
      prix: "499 $ (gr.10) / 599 $ (gr.11-12)",
      duree: "Min 4 sem. / Max 12 mois",
      highlights: [
        "AUCUN examen final",
        "100% auto-rythmé",
        "Projets + tâche culminante",
        "OCT certifié",
      ],
      plarQC: "Éval. équivalence; programme personnalisé",
    },
    {
      name: "The New Educator",
      bsid: "669484",
      tier: "★ Tier 3",
      site: "theneweducator.com",
      prix: "Sur demande (site en français)",
      duree: "Auto-rythmé; min 4 sem.",
      highlights: [
        "Site 100% en français",
        "Accompagnement FR disponible",
        "Ouvert à l'international",
        "~8 cours restants",
      ],
      plarQC: "Éval. équivalence; crédits QC reconnus",
    },
    {
      name: "Aubrey Academy",
      bsid: "665140",
      tier: "★ Tier 3",
      site: "aubreyacademy.ca",
      prix: "Sur demande (consultation gratuite)",
      duree: "Standard / fast-track / extended",
      highlights: [
        "NCAA approuvé",
        "3 vitesses de rythme",
        "Idéal athlètes",
        "Éval. gratuite du transcript",
      ],
      plarQC: "Éval. gratuite du transcript",
    },
    {
      name: "USCA Academy",
      bsid: "À confirmer",
      tier: "★ Tier 3",
      site: "uscaacademy.com",
      prix: "~16 800 $ CAD/an",
      duree: "Hybride live Zoom + campus (5j/sem)",
      highlights: [
        "Classes 5-15 élèves",
        "5 rentrées/an",
        "Alumni McGill/Waterloo",
        "Site FR disponible",
      ],
      plarQC: "PLAR; crédits QC transférables",
    },
    {
      name: "Blyth Academy Orbit",
      bsid: "669675",
      tier: "★ Option live",
      site: "blytheducation.com/orbit",
      prix: "Inclus dans Blyth",
      duree: "Semestres fixes",
      highlights: [
        "Classes virtuelles en temps réel",
        "Petits groupes",
        "Horaire structuré",
        "Idéal si encadrement fort",
      ],
      plarQC: "Idem Blyth Academy",
    },
    {
      name: "KAI Global School",
      bsid: "665538",
      tier: "★ Tier 3",
      site: "kaiglobalschool.com",
      prix: "Sur demande",
      duree: "Min 4 sem. / Max 12 mois",
      highlights: [
        "100+ cours",
        "Dual diploma disponible",
        "Programme international",
        "PLAR",
        "Ottawa (Kanata)",
      ],
      plarQC: "Éval. équivalence QC; PLAR disponible",
    },
    {
      name: "Toronto Imperial School (TIS)",
      bsid: "881941",
      tier: "★ Tier 3",
      site: "torontoimperial.com",
      prix: "690 $–1 450 $ CAD/cours",
      duree: "Classes live avec enseignants",
      highlights: [
        "Classes de 8-12 élèves",
        "20+ experts en admissions intl",
        "Réseau 330 universités partenaires",
        "Accompagnement international",
      ],
      plarQC: "6-8 cours suffisent depuis DES; crédits QC reconnus",
    },
  ],
  usa: [
    {
      name: "Clonlara School",
      accred: "NCPSA, MSA-CESS, Accred. Intl",
      site: "clonlara.org",
      pays: "Michigan, USA",
      prix: "395 $ USD/demi-crédit ou 695 $ USD/crédit + frais Off-Campus",
      duree: "Libre — max 3 cours/an",
      highlights: [
        "Site et accompagnement en FRANÇAIS",
        "Philosophie autonome/unschooling",
        "Diplôme Michigan (USA)",
        "Le seul avec support FR",
      ],
      plarQC: "Crédits QC évalués et intégrés",
    },
    {
      name: "Laurel Springs School",
      accred: "WASC + Cognia",
      site: "laurelsprings.com",
      pays: "USA",
      prix: "7 200 $–17 250 $ USD/an",
      duree: "Auto-rythmé — 12 mois min",
      highlights: [
        "240+ cours",
        "24 AP®",
        "AP Capstone",
        "160+ NCAA",
        "6700+ diplômés",
        "100 pays",
        "Double inscription Baylor/Syracuse",
      ],
      plarQC: "Éval. crédits antérieurs; transfert jusqu'à 75%",
    },
    {
      name: "Excel High School",
      accred: "Cognia + MSA-CESS + NCA + NWAC",
      site: "excelhighschool.com",
      pays: "USA",
      prix: "~1 900 $ USD/an (standard) / 99 $ USD/mois (adultes)",
      duree: "Auto-rythmé — quelques mois si crédits transférés",
      highlights: [
        "Le plus abordable de la catégorie",
        "Paiement mensuel flexible",
        "AP® et honours",
        "Reconnu universités US et Canada ang.",
      ],
      plarQC: "Transfert jusqu'à 75%; crédits QC reconnus",
    },
    {
      name: "Forest Trail Academy",
      accred: "Cognia + MSA-CESS + AI + NCPSA",
      site: "foresttrailacademy.com",
      pays: "USA",
      prix: "~3 200 $ USD/an",
      duree: "Auto-rythmé — 12 mois",
      highlights: [
        "Dual diploma HS + Associate (AA)",
        "NCAA approuvé",
        "Idéal athlètes",
        "100% en ligne",
        "100% admission garantie",
      ],
      plarQC: "Transfert crédits; 100% admission garantie",
    },
    {
      name: "James Madison HS",
      accred: "Cognia + DEAC",
      site: "jmhs.com",
      pays: "USA",
      prix: "699 $–1 299 $ USD (diplôme complet)",
      duree: "Auto-rythmé — quelques mois",
      highlights: [
        "Le moins cher pour diplôme complet",
        "Paiement mensuel sans intérêt",
        "Reconnu emploi et community college",
        "⚠️ Moins fort pour universités R1",
      ],
      plarQC: "Transfert jusqu'à 17 crédits",
    },
    {
      name: "American School of Correspondence",
      accred: "MSA-CESS + NCPSA + Accred. Intl",
      site: "americanschoolofcorr.com",
      pays: "USA (1897)",
      prix: "~1 100 $ USD/an (5 crédits) / ~4 400 $ USD diplôme complet (matériel INCLUS)",
      duree: "Auto-rythmé — papier OU en ligne",
      highlights: [
        "LA PLUS ANCIENNE (1897)",
        "Non-profit / BBB A+",
        "Matériel inclus",
        "General HS et College Preparatory",
      ],
      plarQC: "Transfert crédits depuis école accréditée",
    },
    {
      name: "Penn Foster High School",
      accred: "Cognia + MSA-CESS + DEAC",
      site: "pennfoster.edu",
      pays: "USA (1890)",
      prix: "1 149 $ USD (complet) / 55 $ USD/mois",
      duree: "Auto-rythmé — 21 crédits",
      highlights: [
        "Fondée en 1890",
        "Triple accréditation",
        "2 tracks : General et College Prep",
        "Paiement mensuel flexible",
        "Idéal budget serré",
      ],
      plarQC: "Transfert crédits accepté",
    },
    {
      name: "Whitmore School",
      accred: "Cognia + NCA-CASI + SACS-CASI + NWAC",
      site: "whitmoreschool.org",
      pays: "USA (1994)",
      prix: "1 699 $ USD/an (Diploma) / 475 $ USD/crédit",
      duree: "Mastery learning — pas de semestres ni délais",
      highlights: [
        "Première école secondaire en ligne (1994)",
        "Apprentissage par maîtrise",
        "Enseignant 1-on-1",
        "4 formules",
        "⚠️ Cours NON reconnus NCAA",
      ],
      plarQC: "Min 4.5 crédits à compléter à Whitmore",
    },
    {
      name: "Ogburn Online School",
      accred: "Cognia + WASC + MSA-CESS + Ai + NCPSA + AISF + NCAA",
      site: "ogburnonlineschool.com",
      pays: "USA",
      prix: "250 $ USD/mois",
      duree: "Auto-rythmé — mensuel",
      highlights: [
        "6 organismes d'accréditation",
        "Le plus accrédité de la catégorie",
        "250 $/mois seulement",
        "NCAA approuvé",
        "Très sous-estimé",
      ],
      plarQC: "Transfert crédits accepté",
    },
    {
      name: "Crimson Global Academy (CGA)",
      accred: "WASC + NCAA + Cambridge + CollegeBoard AP",
      site: "crimsonglobalacademy.school",
      pays: "USA / International",
      prix: "Prix par cours (sur demande)",
      duree: "Live + auto-rythmé + 1-on-1",
      highlights: [
        "Top 3 online high school USA (Niche 2025)",
        "WASC 6 ans (maximum)",
        "NCAA approuvé",
        "US Diploma + IGCSE + A-Levels + AP",
        "200+ enseignants",
        "Accès réseau Crimson (idéal Ivy League)",
      ],
      plarQC: "Crédits QC transférables",
    },
    {
      name: "Dwight Global Online School",
      accred: "Cognia + MSA-CESS + CIS + IBO",
      site: "dwight.edu/dwight-global",
      pays: "USA (New York)",
      prix: "42 750 $ USD/an",
      duree: "Annuel — classes live",
      highlights: [
        "#1 online high school USA (Niche 2025)",
        "IB Diploma + AP",
        "Programme le plus prestigieux",
        "Pour profils d'élite uniquement",
        "Réseau Dwight Schools mondial",
      ],
      plarQC: "Crédits internationaux reconnus; IB ou AP",
    },
  ],
  udem: [
    {
      name: "Année préparatoire UdeM",
      accred: "Université de Montréal",
      site: "admission.umontreal.ca/programmes/annee-preparatoire",
      pays: "Québec, Canada",
      prix: "~4 350 $ CAD total (résident QC, 2 trimestres)",
      duree: "1 an (24 crédits)",
      highlights: [
        "250+ programmes de baccalauréat en français",
        "Sciences / Sciences humaines / Arts et lettres",
        "DES + OSSD = accès direct recommandé",
        "DES + 4 ans d'interruption aussi accepté",
        "Coût très abordable pour résidents QC",
      ],
      plarQC: "Programme 1-955-4-1 — Faculté des arts et des sciences",
    },
  ],
};

function buildSchoolCard(school, type) {
  const isBSID = type === "ossd";
  const idLabel = isBSID ? `BSID ${school.bsid}` : school.accred;
  const tierBadge = school.tier
    ? `<span class="school-tier">${school.tier}</span>`
    : "";
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
        <div class="school-meta-item"><span class="school-meta-label">💰 Prix</span><span>${school.prix}</span></div>
        <div class="school-meta-item"><span class="school-meta-label">⏱ Durée</span><span>${school.duree}</span></div>
        <div class="school-meta-item"><span class="school-meta-label">📋 Crédits QC</span><span>${school.plarQC}</span></div>
      </div>
      <div class="school-highlights">
        ${school.highlights.map((h) => `<span class="school-tag">${h}</span>`).join("")}
      </div>
      <a href="https://${school.site}" target="_blank" rel="noopener" class="school-link">↗ Visiter ${school.site}</a>
    </div>
  `;
}

function renderAnnuaireTab(tab) {
  const content = document.getElementById("annuaireContent");
  if (tab === "glossaire") {
    content.innerHTML = buildGlossaire();
    initGlossaireSearch();
    return;
  }
  const schoolList = secondarySchools[tab];
  const type = tab;
  content.innerHTML = `<div class="school-grid">${schoolList.map((s) => buildSchoolCard(s, type)).join("")}</div>`;
}

function buildGlossaire() {
  const terms = [
    {
      abbr: "DES",
      full: "Diplôme d'études secondaires",
      desc: "Le diplôme de fin d'études secondaires québécois. Équivalent du diplôme de 5e secondaire au Québec.",
    },
    {
      abbr: "OSSD",
      full: "Ontario Secondary School Diploma",
      desc: "Diplôme secondaire de la province de l'Ontario (Canada). Reconnu dans la plupart des universités canadiennes, américaines et internationales.",
    },
    {
      abbr: "AP",
      full: "Advanced Placement",
      desc: "Cours universitaires offerts au secondaire par College Board (USA). Les examens AP permettent d'obtenir des crédits universitaires reconnus par de nombreuses universités.",
    },
    {
      abbr: "NCAA",
      full: "National Collegiate Athletic Association",
      desc: "Organisation américaine qui régit le sport universitaire. Les étudiants-athlètes doivent être déclarés éligibles par le NCAA Eligibility Center avant de s'inscrire dans une université membre.",
    },
    {
      abbr: "PLAR",
      full: "Prior Learning Assessment and Recognition",
      desc: "Reconnaissance des apprentissages antérieurs. Permet d'obtenir des crédits scolaires pour des expériences de vie, de travail ou d'auto-apprentissage documentées.",
    },
    {
      abbr: "SAT",
      full: "Scholastic Assessment Test",
      desc: "Test standardisé américain (College Board) utilisé pour l'admission universitaire aux États-Unis. Score sur 1600. Souvent exigé ou fortement recommandé pour les universités US.",
    },
    {
      abbr: "ACT",
      full: "American College Testing",
      desc: "Alternative au SAT. Test standardisé américain couvrant anglais, maths, lecture et sciences. Score sur 36. Accepté par la plupart des universités américaines.",
    },
    {
      abbr: "BSID",
      full: "Business / School Identification Number",
      desc: "Numéro d'identification officiel attribué par le ministère de l'Éducation de l'Ontario à chaque école accréditée. Permet de vérifier la légitimité d'une école OSSD.",
    },
    {
      abbr: "DEC",
      full: "Diplôme d'études collégiales",
      desc: "Diplôme collégial québécois (CÉGEP). Souvent exigé pour accéder aux universités francophones du Québec (UdeM, Laval, Sherbrooke, UQAM, etc.).",
    },
    {
      abbr: "OUAC",
      full: "Ontario Universities' Application Centre",
      desc: "Portail centralisé pour les demandes d'admission aux universités de l'Ontario. Équivalent du système québécois SRAM/SRASL pour les universités ontariennes.",
    },
    {
      abbr: "Common App",
      full: "Common Application",
      desc: "Plateforme américaine centralisée pour postuler à plus de 1 000 universités aux États-Unis et à l'international via un seul formulaire.",
    },
    {
      abbr: "IB",
      full: "International Baccalaureate",
      desc: "Programme international rigoureux offert dans certaines écoles secondaires. Le diplôme IB est reconnu par les universités du monde entier.",
    },
    {
      abbr: "TMU",
      full: "Toronto Metropolitan University",
      desc: "Anciennement Ryerson University. Université publique ontarienne spécialisée dans les programmes appliqués, la technologie et les arts.",
    },
    {
      abbr: "UBC",
      full: "University of British Columbia",
      desc: "Université publique de la Colombie-Britannique, classée parmi les meilleures au Canada et dans le monde.",
    },
    {
      abbr: "UdeM",
      full: "Université de Montréal",
      desc: "Principale université francophone de Montréal. Offre plus de 650 programmes. Un DEC ou une année préparatoire est souvent requis.",
    },
    {
      abbr: "SNHU",
      full: "Southern New Hampshire University",
      desc: "Université américaine principalement en ligne, reconnue pour son accessibilité et ses frais compétitifs. Accréditée NECHE.",
    },
    {
      abbr: "ASU",
      full: "Arizona State University",
      desc: "Grande université publique américaine réputée pour ses programmes en ligne et son innovation pédagogique. Accréditée HLC.",
    },
    {
      abbr: "MIT",
      full: "Massachusetts Institute of Technology",
      desc: "Institut technologique d'élite de Boston. Ultra-sélectif, reconnu mondialement pour les STEM. Admission inférieure à 5%.",
    },
    {
      abbr: "NYU",
      full: "New York University",
      desc: "Université privée de New York. Reconnue pour ses programmes en arts, business et droit. Campus principal à Greenwich Village.",
    },
    {
      abbr: "VHS",
      full: "Virtual High School",
      desc: "École secondaire en ligne accréditée OSSD, basée en Ontario. Reconnue par le ministère de l'Éducation de l'Ontario (BSID 665681).",
    },
    {
      abbr: "OVS",
      full: "Ontario Virtual School",
      desc: "École secondaire en ligne accréditée OSSD (BSID 665804). Offre plus de 170 cours avec évaluation rapide.",
    },
    {
      abbr: "OES",
      full: "Ontario eSecondary",
      desc: "École en ligne ontarienne accréditée OSSD (BSID 667186). Programme dédié pour étudiants québécois incluant PLAR.",
    },
    {
      abbr: "OEO",
      full: "Ontario Education Online",
      desc: "École en ligne ontarienne sans examen final (BSID 882902). 100% auto-rythmé, apprentissage par projets.",
    },
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
      <input
        id="glossaireSearch"
        class="glossaire-search"
        type="search"
        placeholder="Rechercher un terme… ex : OSSD, AP, DEC"
        autocomplete="off"
        spellcheck="false"
      />
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
    document
      .getElementById("annuaireOverlay")
      .setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll(".annuaire-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".annuaire-tab")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderAnnuaireTab(btn.dataset.tab);
  });
});

const STORAGE_KEY = "cap-diplome-v1";

function saveStateToStorage() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state, step: currentStep }),
    );
  } catch (e) {}
}

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return false;
    const s = saved.state;
    if (s.des !== undefined) state.des = s.des;
    if (s.language !== undefined) state.language = s.language;
    if (s.diploma !== undefined) state.diploma = s.diploma;
    if (Array.isArray(s.traits)) state.traits = s.traits;
    if (s.sliders) state.sliders = { ...state.sliders, ...s.sliders };
    if (s.career !== undefined) state.career = s.career;
    if (s.universityType !== undefined) state.universityType = s.universityType;
    if (Array.isArray(s.selectedUniversities))
      state.selectedUniversities = s.selectedUniversities;
    if (s.plar) state.plar = { ...state.plar, ...s.plar };
    if (s.checklist) state.checklist = s.checklist;
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
  state.des = null;
  state.language = null;
  state.diploma = null;
  state.traits = [];
  state.sliders = {
    motivation: 3,
    math: 3,
    english: 3,
    availability: 3,
    pace: 3,
  };
  state.career = null;
  state.universityType = null;
  state.selectedUniversities = [];
  state.plar = {
    homeschooling: false,
    projects: false,
    work: false,
    selfLearning: false,
    portfolios: false,
  };
  state.checklist = {};
  clearStorage();
}

let currentStep = 0;

const steps = [
  {
    title: "AS-TU TON DES ?",
    eyebrow: "Point de départ",
    render: renderDes
  },

  {
    title: "TA LANGUE D'ÉTUDES",
    eyebrow: "Langue",
    render: renderLanguage
  },

  {
    title: "TON MODE D'APPRENTISSAGE",
    eyebrow: "Fonctionnement",
    render: renderLearningMode
  },

  {
    title: "TON BUDGET SECONDAIRE",
    eyebrow: "Budget",
    render: renderSecondaryBudget
  },

  {
    title: "OÙ TU TE VOIS ?",
    eyebrow: "Objectif",
    render: renderCareer
  },

  {
    title: "TON PROFIL",
    eyebrow: "Profil",
    render: renderProfile
  },

  {
    title: "TON DIPLÔME CIBLE",
    eyebrow: "Diplôme",
    render: renderDiploma
  },

  {
    title: "TES ÉCOLES",
    eyebrow: "Écoles",
    render: renderSchools
  },

  {
    title: "VEUX-TU UNE UNIVERSITÉ ?",
    eyebrow: "Université",
    render: renderWantUniversity
  },

  {
    title: "QUEL TYPE D'UNIVERSITÉ ?",
    eyebrow: "Sélectivité",
    render: renderUniversityType
  },

  {
    title: "TES UNIVERSITÉS",
    eyebrow: "Recommandations",
    render: renderUniversities
  },

  {
    title: "TES CRÉDITS RECONNUS",
    eyebrow: "Crédits possibles",
    render: renderPlar
  },

  {
    title: "TON PLAN D'ACTION",
    eyebrow: "Roadmap",
    render: renderRoadmap
  },

  {
    title: "AVANT DE PARTIR",
    eyebrow: "Vérifications",
    render: renderChecklist
  },

  {
    title: "TON PARCOURS",
    eyebrow: "Résumé",
    render: renderSummary
  }
];
const universities = [
  {
    name: "Athabasca University",
    abbr: "AU",
    group: "canada-flex",
    fit: ["Autonome", "International"],
    text: "Très flexible. Parfait pour une transition ou un complément de préalables en ligne.",
    url: "https://www.athabascau.ca/admissions/",
    fees: "~700–900 CAD/cours",
    currency: "CAD",
  },
  {
    name: "Thompson Rivers University — Open Learning",
    abbr: "TRU-OL",
    group: "canada-flex",
    fit: ["Autonome"],
    text: "Grande souplesse. Idéal pour reprendre des crédits à ton rythme.",
    url: "https://www.tru.ca/distance/apply.html",
    fees: "~700–900 CAD/cours",
    currency: "CAD",
  },
  {
    name: "Royal Roads University",
    abbr: "RRU",
    group: "canada-flex",
    fit: ["Créatif"],
    text: "Approche appliquée et pratique. Programme et admission à confirmer directement.",
    url: "https://www.royalroads.ca/admissions",
    fees: "~800–1 200 CAD/cours",
    currency: "CAD",
  },
  {
    name: "York University",
    group: "canada-standard",
    fit: ["Littéraire", "Business / Comptabilité"],
    text: "Option solide en Ontario. OSSD souvent lisible — préalables variables.",
    url: "https://futurestudents.yorku.ca/apply",
    fees: "~30 000–38 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Toronto Metropolitan University",
    abbr: "TMU",
    group: "canada-standard",
    fit: ["Créatif", "Technologique"],
    text: "Programmes appliqués, campus urbain. Portfolio parfois demandé.",
    url: "https://www.torontomu.ca/admissions/",
    fees: "~26 000–36 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "University of Ottawa",
    abbr: "uOttawa",
    group: "canada-standard",
    fit: ["Littéraire"],
    text: "Option bilingue selon programme. Exigences à valider directement.",
    url: "https://www.uottawa.ca/en/admissions",
    fees: "~28 000–36 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Carleton University",
    abbr: "Carleton",
    group: "canada-standard",
    fit: ["Juridique / Politique", "Technologique"],
    text: "Fort en politiques publiques, médias et informatique.",
    url: "https://admissions.carleton.ca/",
    fees: "~26 000–33 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "University of Waterloo",
    abbr: "Waterloo",
    group: "canada-competitive",
    fit: ["Scientifique", "Technologique", "Fast-track"],
    text: "Très sélectif en STEM. AP, math avancée et notes élevées sont attendus.",
    url: "https://uwaterloo.ca/future-students/admissions",
    fees: "~30 000–58 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "University of Toronto",
    abbr: "U of T",
    group: "canada-competitive",
    fit: ["Scientifique", "Littéraire"],
    text: "Admission compétitive. Exigences précises par campus et programme.",
    url: "https://admissions.utoronto.ca/",
    fees: "~42 000–62 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "McMaster University",
    abbr: "McMaster",
    group: "canada-competitive",
    fit: ["Scientifique"],
    text: "Santé et sciences très sélectives. Chaque préalable compte.",
    url: "https://future.mcmaster.ca/admissions/",
    fees: "~31 000–47 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "University of British Columbia",
    abbr: "UBC",
    group: "canada-competitive",
    fit: ["International", "Scientifique"],
    text: "Dossier global solide requis. Suppléments et préalables à bien préparer.",
    url: "https://you.ubc.ca/applying-ubc/",
    fees: "~36 000–56 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "McGill University",
    abbr: "McGill",
    group: "canada-competitive",
    fit: ["Scientifique", "International"],
    text: "Équivalences variables pour parcours non traditionnels. À vérifier en admissions.",
    url: "https://www.mcgill.ca/applying/",
    fees: "~21 000–46 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Université de Montréal",
    abbr: "UdeM",
    group: "quebec-fr",
    fit: ["Littéraire", "Scientifique"],
    text: "Accès variable — DEC, préalables ou année préparatoire selon le programme.",
    url: "https://admission.umontreal.ca/",
    fees: "~8 000–26 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Université Laval",
    abbr: "Laval",
    group: "quebec-fr",
    fit: ["Littéraire", "Scientifique"],
    text: "Dossier évalué au cas par cas, surtout sans DEC.",
    url: "https://www.ulaval.ca/admission",
    fees: "~7 000–25 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Université de Sherbrooke",
    abbr: "UdeS",
    group: "quebec-fr",
    fit: ["Scientifique", "Business / Comptabilité"],
    text: "Accès selon programme et dossier. Équivalences à confirmer.",
    url: "https://www.usherbrooke.ca/admission/",
    fees: "~7 000–21 000 CAD/an",
    currency: "CAD",
  },
  {
    name: "Southern New Hampshire University",
    abbr: "SNHU",
    group: "usa-flex",
    fit: ["Autonome"],
    text: "Très accessible en ligne. Vérifier la reconnaissance externe avant de t'inscrire.",
    url: "https://www.snhu.edu/admission",
    fees: "~9 600–12 000 USD/an",
    currency: "USD",
  },
  {
    name: "Arizona State University Online",
    abbr: "ASU Online",
    group: "usa-flex",
    fit: ["Technologique", "International"],
    text: "Large catalogue en ligne. Exigences précises selon le programme choisi.",
    url: "https://asuonline.asu.edu/admissions/",
    fees: "~10 000–12 500 USD/an",
    currency: "USD",
  },
  {
    name: "Purdue University Global",
    abbr: "Purdue Global",
    group: "usa-flex",
    fit: ["Business / Comptabilité"],
    text: "Option flexible pour le business. Vérifier l'alignement avec tes objectifs.",
    url: "https://www.purdueglobal.edu/admissions/",
    fees: "~12 000–15 000 USD/an",
    currency: "USD",
  },
  {
    name: "Oregon State University",
    abbr: "OSU",
    group: "usa-standard",
    fit: ["Technologique", "Scientifique"],
    text: "Option solide en STEM. Certains programmes disponibles en ligne.",
    url: "https://admissions.oregonstate.edu/",
    fees: "~30 000–33 000 USD/an",
    currency: "USD",
  },
  {
    name: "University of Arizona",
    abbr: "U of A",
    group: "usa-standard",
    fit: ["Business / Comptabilité", "Arts / Créatif"],
    text: "Bon choix pour business et arts. Dossier international à valider.",
    url: "https://admissions.arizona.edu/",
    fees: "~29 000–36 000 USD/an",
    currency: "USD",
  },
  {
    name: "Pennsylvania State University",
    abbr: "Penn State",
    group: "usa-standard",
    fit: ["International"],
    text: "Campus et options en ligne. Conditions spécifiques par programme.",
    url: "https://admissions.psu.edu/",
    fees: "~36 000–42 000 USD/an",
    currency: "USD",
  },
  {
    name: "New York University",
    abbr: "NYU",
    group: "usa-competitive",
    fit: ["Arts / Créatif", "Business / Comptabilité"],
    text: "Compétitif. Portfolio ou supplément d'admission selon la faculté.",
    url: "https://www.nyu.edu/admissions/undergraduate-admissions.html",
    fees: "~57 000–62 000 USD/an",
    currency: "USD",
  },
  {
    name: "Georgia Institute of Technology",
    abbr: "Georgia Tech",
    group: "usa-competitive",
    fit: ["Technologique", "Scientifique"],
    text: "Référence en tech et STEM. AP et projets personnels font la différence.",
    url: "https://admission.gatech.edu/",
    fees: "~32 000–36 000 USD/an",
    currency: "USD",
  },
  {
    name: "Boston University",
    abbr: "BU",
    group: "usa-competitive",
    fit: ["International", "Scientifique"],
    text: "Compétitif. Dossier académique solide et activités parascolaires comptent.",
    url: "https://www.bu.edu/admissions/",
    fees: "~57 000–63 000 USD/an",
    currency: "USD",
  },
  {
    name: "Harvard University",
    abbr: "Harvard",
    group: "usa-top",
    fit: ["International"],
    text: "Ultra-compétitif. Aucun parcours ne garantit l'admission.",
    url: "https://college.harvard.edu/admissions",
    fees: "~57 000–62 000 USD/an*",
    currency: "USD",
  },
  {
    name: "Massachusetts Institute of Technology",
    abbr: "MIT",
    group: "usa-top",
    fit: ["Scientifique", "Technologique"],
    text: "Ultra-compétitif. Niveau STEM exceptionnel attendu.",
    url: "https://mitadmissions.org/",
    fees: "~57 000–62 000 USD/an*",
    currency: "USD",
  },
  {
    name: "Stanford University",
    abbr: "Stanford",
    group: "usa-top",
    fit: ["Technologique", "Créatif"],
    text: "Ultra-compétitif. Excellence, impact et originalité requis.",
    url: "https://admission.stanford.edu/",
    fees: "~57 000–62 000 USD/an*",
    currency: "USD",
  },
  {
    name: "Yale University",
    abbr: "Yale",
    group: "usa-top",
    fit: ["Littéraire", "International"],
    text: "Ultra-compétitif. Profil global exceptionnel attendu.",
    url: "https://admissions.yale.edu/",
    fees: "~57 000–62 000 USD/an*",
    currency: "USD",
  },
  {
    name: "Princeton University",
    abbr: "Princeton",
    group: "usa-top",
    fit: ["Scientifique", "Littéraire"],
    text: "Ultra-compétitif. Exigences académiques parmi les plus élevées au monde.",
    url: "https://admission.princeton.edu/",
    fees: "~57 000–62 000 USD/an*",
    currency: "USD",
  },
];

const schools = [
  {
    name: "Virtual High School",
    abbr: "VHS",
    diploma: "ossd",
    pacing: "Flexible",
    support: "Moyen",
    ap: "Certains cours avancés",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Autonome, OSSD Ontario",
  },
  {
    name: "Blyth Academy Online",
    abbr: "Blyth",
    diploma: "ossd",
    pacing: "Structuré",
    support: "Élevé",
    ap: "Options possibles",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$$",
    ideal: "Besoin d'encadrement",
  },
  {
    name: "Ontario Virtual School",
    abbr: "OVS",
    diploma: "ossd",
    pacing: "Très flexible",
    support: "Moyen",
    ap: "Options selon offre",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Fast-track, autonome",
  },
  {
    name: "Ontario eSecondary",
    abbr: "OES",
    diploma: "ossd",
    pacing: "Flexible",
    support: "Moyen",
    ap: "À confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Rythme progressif",
  },
  {
    name: "Ontario Education Online",
    abbr: "OEO",
    diploma: "ossd",
    pacing: "Flexible",
    support: "Variable",
    ap: "À confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Budget contrôlé",
  },
  {
    name: "KAI Global School",
    abbr: "KAI Global",
    diploma: "ossd",
    pacing: "Accompagné",
    support: "Élevé",
    ap: "À confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$$",
    ideal: "International, encadrement",
  },
  {
    name: "Clonlara School",
    abbr: "Clonlara",
    diploma: "us",
    pacing: "Personnalisé",
    support: "Élevé",
    ap: "Selon plan",
    ncaa: "À vérifier",
    language: "Français possible",
    cost: "$$$",
    ideal: "Créatif, français, projets",
  },
  {
    name: "Laurel Springs School",
    abbr: "Laurel Springs",
    diploma: "us",
    pacing: "Structuré",
    support: "Élevé",
    ap: "Disponible",
    ncaa: "Souvent pertinent, vérifier",
    language: "Anglais",
    cost: "$$$$",
    ideal: "Université USA compétitive",
  },
  {
    name: "Dwight Global Online School",
    abbr: "Dwight Global",
    diploma: "us",
    pacing: "Rigoureux",
    support: "Élevé",
    ap: "Disponible",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$$$",
    ideal: "International ambitieux",
  },
  {
    name: "Crimson Global Academy",
    abbr: "CGA",
    diploma: "us",
    pacing: "Accéléré",
    support: "Élevé",
    ap: "Fort",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$$$",
    ideal: "Top USA, AP",
  },
  {
    name: "Excel High School",
    abbr: "Excel HS",
    diploma: "us",
    pacing: "Flexible",
    support: "Moyen",
    ap: "Limité/à confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$",
    ideal: "Budget et autonomie",
  },
  {
    name: "American School of Correspondence",
    abbr: "American School",
    diploma: "us",
    pacing: "Traditionnel",
    support: "Moyen",
    ap: "À confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Parcours classique",
  },
  {
    name: "Ogburn Online School",
    abbr: "Ogburn",
    diploma: "us",
    pacing: "Flexible",
    support: "Moyen",
    ap: "À confirmer",
    ncaa: "À vérifier",
    language: "Anglais",
    cost: "$$",
    ideal: "Rythme indépendant",
  },
];

function render() {
  const step = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  document.getElementById("stepLabel").textContent =
    `Étape ${currentStep + 1} sur ${steps.length}`;
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

function renderChoiceStep(step, key, list, subcopy, warning, columns = "") {
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
  return renderChoiceStep(
    step,
    "des",
    options.des,
    "Chaque parcours ouvre des possibilités différentes selon les universités, les préalables et les équivalences reconnues.",
    null,
  );
}

function renderLanguage(step) {
  const warning =
    state.language === "francais"
      ? "Options francophones limitées — chaque situation est unique"
      : null;
  return renderChoiceStep(
    step,
    "language",
    options.language,
    "La langue d'études influence les écoles disponibles et les débouchés universitaires.",
    warning,
  );
}
function renderLearningMode(step) {
  return renderChoiceStep(
    step,
    "learningMode",
    options.learningMode,
    "Le mode d'apprentissage influence énormément la réussite et le choix des écoles.",
    null
  );
}

function renderSecondaryBudget(step) {
  return renderChoiceStep(
    step,
    "secondaryBudget",
    options.budget,
    "Les coûts varient énormément selon l'encadrement, les AP et les services.",
    null
  );
}

function renderWantUniversity(step) {
  return renderChoiceStep(
    step,
    "wantUniversity",
    options.wantUniversity,
    "Certaines personnes veulent seulement le diplôme secondaire. D'autres préparent aussi l'université.",
    null
  );
}
function renderDiploma(step) {
  return renderChoiceStep(
    step,
    "diploma",
    options.diploma,
    "Chaque diplôme mène à des parcours différents et nécessite une stratégie adaptée pour les candidatures.",
    null,
  );
}

function renderProfile(step) {
  const shell = screenShell(
    step,
    "Choisis ce qui te ressemble — plusieurs réponses possibles. Ça personnalise tout ce qui suit.",
    null,
  );
  const grid = document.createElement("div");
  grid.className = "choices multi";
  options.traits.forEach((trait) => {
    grid.appendChild(
      choiceCard(
        trait,
        profileBody(trait),
        state.traits.includes(trait),
        () => {
          state.traits = toggle(state.traits, trait);
          render();
        },
      ),
    );
  });
  shell.appendChild(grid);

  const controls = document.createElement("div");
  controls.className = "controls-grid";
  [
    ["motivation", "Motivation"],
    ["math", "Math"],
    ["english", "Anglais"],
    ["availability", "Disponibilité"],
    ["pace", "Rythme"],
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
    Autonome: "Tu gères ton rythme sans suivi rapproché.",
    "Besoin d'encadrement": "Tu travailles mieux avec structure et soutien.",
    Créatif: "Ton portfolio raconte ce que les notes ne montrent pas.",
    Scientifique: "AP sciences et math font la différence ici.",
    Littéraire: "Écriture, analyse, réflexion — ton terrain naturel.",
    Technologique: "Projets, code, math appliquée.",
    "Fast-track": "Tu veux aller vite — attention à ne pas brûler les étapes.",
    "Anxieux face aux examens": "On privilégie les évaluations progressives.",
    International: "Ton dossier doit être lisible dans plusieurs systèmes.",
  };
  return map[trait];
}

function renderCareer(step) {
  const warning =
    state.career === "stem"
      ? "Domaine compétitif — AP, notes élevées et préalables solides souvent requis."
      : null;
  return renderChoiceStep(
    step,
    "career",
    options.career,
    "Certaines orientations demandent des préalables et un dossier académique plus exigeants.",
    warning,
    "three",
  );
}

function renderUniversityType(step) {
  const warning = ["quebec-fr", "usa-top"].includes(state.universityType)
    ? state.universityType === "quebec-fr"
      ? "Chaque dossier est évalué individuellement — vérification directe indispensable"
      : "Niveau ultra-compétitif — dossier exceptionnel requis"
    : null;
  const diplomaLabel =
    state.diploma === "ossd"
      ? "OSSD"
      : state.diploma === "us"
        ? "US Diploma"
        : "ton diplôme";
  const subcopy = `Ton parcours secondaire (${diplomaLabel}) est maintenant défini. Choisis le niveau universitaire qui correspond à ton ambition et ta préparation.`;
  return renderChoiceStep(
    step,
    "universityType",
    options.universityType,
    subcopy,
    warning,
    "three",
  );
}

function getCompatibilityInfo(score) {
  const percent = Math.min(95, 25 + score * 18);
  if (percent >= 75)
    return { percent, badge: "Très compatible", badgeClass: "compat-high" };
  if (percent >= 50)
    return { percent, badge: "Compatible", badgeClass: "compat-mid" };
  return {
    percent,
    badge: "Possible avec conditions",
    badgeClass: "compat-low",
  };
}

function renderUniversities(step) {
  const diplomaLabel =
    state.diploma === "ossd"
      ? "OSSD"
      : state.diploma === "us"
        ? "US Diploma"
        : "ton diplôme";
  const subcopy = `Ces universités sont filtrées selon ton profil, ton ${diplomaLabel} et ta catégorie choisie. Sélectionne celles qui t'intéressent — aucune garantie d'admission.`;
  const shell = screenShell(step, subcopy, universityWarning());

  const selectionInfo = document.createElement("p");
  selectionInfo.className = "selection-hint";
  selectionInfo.textContent = state.selectedUniversities.length
    ? `${state.selectedUniversities.length} université(s) sélectionnée(s)`
    : "Clique sur une carte pour la sélectionner.";
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
        <div class="card-title-block">
          <h3 class="card-title">${uni.name}</h3>
          ${uni.abbr ? `<span class="card-abbr">${uni.abbr}</span>` : ""}
        </div>
        <span class="compat-badge ${compat.badgeClass}">${compat.badge}</span>
      </div>
      <div class="compat-bar-wrap">
        <div class="compat-bar" style="width:${compat.percent}%" data-class="${compat.badgeClass}"></div>
      </div>
      <p class="card-text">${uni.text}</p>
      <div class="card-meta-row">
        <span class="card-fees">💰 ${uni.fees}</span>
        <a class="card-link" href="${uni.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Admissions officielles ↗</a>
      </div>
      <div class="tag-row">
        <span class="tag green">${labelUniversityGroup(uni.group)}</span>
        ${getRiskTags()
          .map((tag) => `<span class="tag ${tag.tone}">${tag.text}</span>`)
          .join("")}
      </div>
      ${isSelected ? '<div class="selected-check">✓ Sélectionnée</div>' : ""}
    `;
    card.addEventListener("click", () => {
      state.selectedUniversities = toggle(state.selectedUniversities, uni.name);
      render();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
    grid.appendChild(card);
  });
  shell.appendChild(grid);
  return shell;
}

function getRecommendedUniversities() {
  const selectedGroup = state.universityType;
  const careerLabel = getCareerTitle();
  let pool = universities.filter((uni) => uni.group === selectedGroup);
  if (!pool.length)
    pool = universities.filter((uni) => compatibleCountry(uni.group));

  const scored = pool.map((uni) => ({
    ...uni,
    score:
      uni.fit.filter((fit) => state.traits.includes(fit) || fit === careerLabel)
        .length +
      (state.sliders.math >= 4 && uni.fit.includes("Scientifique") ? 1 : 0) +
      (state.sliders.english >= 4 && uni.group.startsWith("usa") ? 1 : 0),
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

function compatibleCountry(group) {
  if (state.diploma === "ossd")
    return group.startsWith("canada") || group === "quebec-fr";
  if (state.diploma === "us")
    return group.startsWith("usa") || group === "canada-flex";
  return true;
}

function renderSchools(step) {
  const shell = screenShell(
    step,
    "Écoles filtrées selon ton diplôme et ton profil. Vérifie toujours les détails directement sur leur site.",
    null,
  );
  const grid = document.createElement("div");
  grid.className = "results-grid";
  getRecommendedSchools().forEach((school) => {
    const card = document.createElement("article");
    card.className = "school-card";
    card.innerHTML = `
      <div class="card-title-block">
        <h3 class="card-title">${school.name}</h3>
        ${school.abbr ? `<span class="card-abbr">${school.abbr}</span>` : ""}
      </div>
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

  if (
    state.traits.includes("Besoin d'encadrement") &&
    school.support === "Élevé"
  ) score += 2;

  if (
    state.traits.includes("Fast-track") &&
    school.pacing.includes("Flexible")
  ) score += 2;

  if (
    state.language === "francais" &&
    school.language.includes("Français")
  ) score += 3;

  if (
    state.career === "stem" &&
    school.ap.includes("Disponible")
  ) score += 2;

  if (
    state.learningMode === "synchrone" &&
    school.pacing.includes("Structuré")
  ) score += 2;

  if (
    state.learningMode === "asynchrone" &&
    school.pacing.includes("Flexible")
  ) score += 2;

  if (
    state.secondaryBudget === "low" &&
    school.cost === "$"
  ) score += 3;

  if (
    state.secondaryBudget === "medium" &&
    school.cost === "$$"
  ) score += 2;

  if (
    state.secondaryBudget === "high" &&
    school.cost.includes("$$$")
  ) score += 2;

  return score;
}
function renderPlar(step) {
  const shell = screenShell(
    step,
    "Ton expérience passée peut compter pour des crédits — coche ce qui s'applique pour estimer le total.",
    null,
  );
  const wrap = document.createElement("div");
  wrap.className = "plar-grid";
  const list = document.createElement("div");
  list.className = "check-list";
  [
    ["homeschooling", "Instruction à domicile"],
    ["projects", "Projets documentés"],
    ["work", "Expérience de travail"],
    ["selfLearning", "Auto-apprentissage"],
    ["portfolios", "Portfolio ou preuves"],
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
    <p class="card-text">Économie estimée : ${estimate.savings}. Gain de temps potentiel : ${estimate.time}.</p>
    <div class="tag-row">
      <span class="tag red">Estimation — non officielle</span>
      <span class="tag">Validation requise par l'école</span>
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
    credits:
      count === 0
        ? "0 à 2"
        : `${Math.max(1, count * 2)} à ${Math.min(16, count * 4)}`,
    savings:
      count < 2
        ? "faible"
        : count < 4
          ? "modérée"
          : "significative, à confirmer",
    time:
      count < 2
        ? "limitée"
        : count < 4
          ? "quelques mois possibles"
          : "plusieurs mois possibles",
  };
}

function renderRoadmap(step) {
  const shell = screenShell(
    step,
    "Ton plan étape par étape, basé sur tes réponses. À valider avec les institutions que tu vises.",
    roadmapWarning(),
  );
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
  if (state.career === "stem" || state.traits.includes("Scientifique"))
    route.push("AP Calculus / sciences");
  if (state.diploma === "us" || String(state.universityType).startsWith("usa"))
    route.push("SAT / Common App");
  if (
    state.diploma === "ossd" &&
    String(state.universityType).startsWith("canada")
  )
    route.push("OUAC");
  if (state.language === "francais" || state.universityType === "quebec-fr")
    route.push("Équivalences Québec");
  route.push("Universités contactées");
  return route.slice(0, 6);
}

function renderChecklist(step) {
  const shell = screenShell(
    step,
    "Coche ce que tu as déjà confirmé directement auprès des institutions. Rien ici n'est officiel — c'est ton aide-mémoire.",
    null,
  );
  const list = document.createElement("div");
  list.className = "check-list";
  [
    "BSID vérifié",
    "Accréditation confirmée",
    "Université contactée",
    "Préalables vérifiés",
    "NCAA vérifié",
    "Équivalences confirmées",
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
  const shell = screenShell(
    step,
    "Tout ton parcours en un coup d'œil. Imprime, partage ou note ce qui compte avant de recommencer.",
    null,
  );

  const wrap = document.createElement("div");
  wrap.className = "summary-screen";

  const banner = document.createElement("div");
  banner.className = "summary-banner";
  banner.innerHTML = `
    <div class="summary-banner-icon">🎓</div>
    <div class="summary-banner-text">
      <h2>Ton parcours est prêt</h2>
      <p>Ce résumé est éducatif et suggestif. Valide chaque point directement auprès des institutions concernées.</p>
    </div>
  `;
  wrap.appendChild(banner);

  const cols = document.createElement("div");
  cols.className = "summary-cols";

  const profileBlock = document.createElement("div");
  profileBlock.className = "summary-block";
  const diplomaLabel =
    state.diploma === "ossd"
      ? "OSSD"
      : state.diploma === "us"
        ? "US Diploma"
        : "—";
  const langLabel =
    state.language === "francais"
      ? "Français"
      : state.language === "anglais"
        ? "Anglais"
        : "—";
  const careerLabel = state.career
    ? (options.career.find(([v]) => v === state.career) || [null, "—"])[1]
    : "—";
  const desLabel =
    state.des === "oui" ? "Oui" : state.des === "non" ? "Non" : "—";
  const uniTypeLabel = state.universityType
    ? labelUniversityGroup(state.universityType)
    : "—";
  profileBlock.innerHTML = `
    <p class="summary-block-title">👤 Profil</p>
    <div class="summary-profile-row">
      <span class="tag">DES: <strong>${desLabel}</strong></span>
      <span class="tag green">Diplôme: <strong>${diplomaLabel}</strong></span>
      <span class="tag">Langue: <strong>${langLabel}</strong></span>
      <span class="tag gold">Carrière: <strong>${careerLabel}</strong></span>
      <span class="tag">Université: <strong>${uniTypeLabel}</strong></span>
      ${state.traits.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
  `;
  cols.appendChild(profileBlock);

  const plarEstimate = getPlarEstimate();
  const slidersSummary = Object.entries(state.sliders)
    .map(([k, v]) => {
      const labels = {
        motivation: "Motivation",
        math: "Math",
        english: "Anglais",
        availability: "Dispo",
        pace: "Rythme",
      };
      return `<span class="tag">${labels[k]}: ${v}/5</span>`;
    })
    .join("");
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
    state.selectedUniversities.forEach((name) => {
      const uni = uniPool.find((u) => u.name === name);
      const compat = uni ? getCompatibilityInfo(uni.score) : null;
      const row = document.createElement("div");
      row.className = "summary-uni-item";
      row.innerHTML = `
        <div class="summary-uni-left">
          <span class="summary-uni-name">${name}</span>
          ${uni && uni.fees ? `<span class="summary-uni-fees">💰 ${uni.fees}</span>` : ""}
        </div>
        <div class="summary-uni-right">
          ${compat ? `<span class="compat-badge ${compat.badgeClass}">${compat.badge}</span>` : ""}
          ${uni && uni.url ? `<a class="summary-uni-link" href="${uni.url}" target="_blank" rel="noopener noreferrer">↗</a>` : ""}
        </div>
      `;
      uniContent.appendChild(row);
    });
  } else {
    const allTop = uniPool.slice(0, 3);
    allTop.forEach((uni) => {
      const compat = getCompatibilityInfo(uni.score);
      const row = document.createElement("div");
      row.className = "summary-uni-item";
      row.innerHTML = `
        <div class="summary-uni-left">
          <span class="summary-uni-name">${uni.name}</span>
          ${uni.fees ? `<span class="summary-uni-fees">💰 ${uni.fees}</span>` : ""}
        </div>
        <div class="summary-uni-right">
          <span class="compat-badge ${compat.badgeClass}">${compat.badge}</span>
          ${uni.url ? `<a class="summary-uni-link" href="${uni.url}" target="_blank" rel="noopener noreferrer">↗</a>` : ""}
        </div>
      `;
      uniContent.appendChild(row);
    });
    const note = document.createElement("p");
    note.className = "summary-empty";
    note.textContent =
      "Aucune université sélectionnée manuellement — top 3 affiché.";
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
    "BSID vérifié",
    "Accréditation confirmée",
    "Université contactée",
    "Préalables vérifiés",
    "NCAA vérifié",
    "Équivalences confirmées",
  ];
  const checkBlock = document.createElement("div");
  checkBlock.className = "summary-block";
  const checkList = document.createElement("div");
  checkList.className = "summary-checklist-list";
  checklistItems.forEach((label) => {
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
        [
          "🏛️",
          "Accréditation",
          "Vérifier que l'école est reconnue par les autorités compétentes (BSID, accréditation régionale ou nationale).",
        ],
        [
          "🆔",
          "BSID",
          "Le Business / School Identification Number doit être valide et actif pour la reconnaissance du diplôme.",
        ],
        [
          "🏈",
          "NCAA",
          "Si un parcours sportif est envisagé, valider l'éligibilité avec le NCAA Eligibility Center avant l'inscription.",
        ],
        [
          "📋",
          "Admissions",
          "Les exigences d'admission changent chaque cycle. Contacter directement le bureau des admissions de chaque université ciblée.",
        ],
        [
          "📚",
          "AP disponibles",
          "Confirmer quels cours AP sont réellement offerts par l'école et si les examens College Board sont accessibles.",
        ],
        [
          "🏠",
          "Politique homeschool",
          "Chaque université a sa propre politique envers les candidats homeschoolés ou issus d'écoles en ligne.",
        ],
        [
          "🎯",
          "Exigences université cible",
          "Préalables, portfolio, lettre de motivation, tests standardisés — vérifier programme par programme.",
        ],
        [
          "💲",
          "Coûts réels",
          "Les frais indiqués sont des estimations. Ajouter frais d'inscription, matériel, examens AP, hébergement et assurance.",
        ],
        [
          "👁️",
          "Examens surveillés",
          "Certains programmes exigent des examens en présentiel ou sous surveillance. À confirmer avant toute inscription.",
        ],
        [
          "📄",
          "Transcript",
          "La validité et la lisibilité du relevé de notes officiel doivent être confirmées par l'université cible.",
        ],
      ]
        .map(
          ([icon, label, desc]) => `
        <div class="verif-card">
          <span class="verif-icon">${icon}</span>
          <div class="verif-body">
            <strong class="verif-label">${label}</strong>
            <span class="verif-desc">${desc}</span>
          </div>
        </div>
      `,
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
        <p class="warning-section-sub">Ce simulateur est un outil éducatif. Il ne remplace pas un conseiller professionnel ni les informations officielles.</p>
      </div>
    </div>
    <div class="limits-grid">
      ${[
        [
          "Les admissions changent régulièrement",
          "Les politiques, exigences et critères d'évaluation peuvent être modifiés sans préavis d'une année à l'autre.",
        ],
        [
          "Chaque université évalue les dossiers différemment",
          "Il n'existe pas de formule universelle. Deux dossiers identiques peuvent obtenir des résultats opposés selon l'institution.",
        ],
        [
          "Aucun parcours ne garantit l'admission",
          "Ce simulateur génère des pistes éducatives, non des garanties. L'admission reste une décision discrétionnaire de chaque université.",
        ],
        [
          "Certaines écoles sont plus reconnues que d'autres",
          "La lisibilité d'un diplôme en ligne ou homeschool varie selon l'université cible, le programme et le pays.",
        ],
        [
          "Les programmes compétitifs évaluent le profil global",
          "Notes, activités, lettres, tests standardisés, portfolio, entretiens — un seul critère ne suffit jamais.",
        ],
        [
          "Les informations doivent être revérifiées directement",
          "Toutes les données de ce simulateur proviennent de sources publiques et doivent être validées auprès des institutions concernées.",
        ],
      ]
        .map(
          ([title, desc]) => `
        <div class="limit-card">
          <span class="limit-bullet">!</span>
          <div class="limit-body">
            <strong class="limit-title">${title}</strong>
            <span class="limit-desc">${desc}</span>
          </div>
        </div>
      `,
        )
        .join("")}
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

  const shareNote = document.createElement("p");
  shareNote.className = "summary-share-note";
  shareNote.textContent =
    "Le lien encode toutes tes réponses — ouvre-le sur n'importe quel appareil pour retrouver ton parcours.";
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
    setTimeout(() => {
      btn.innerHTML = "🔗 Copier le lien de partage";
    }, 2500);
  }
  document.body.removeChild(ta);
}

function canContinue() {
  // Order matches steps array: des, language, career, traits, diploma, schools(free), universityType, ...
  const keys = [
    "des",
    "language",
    "career",
    "traits",
    "diploma",
    null,
    "universityType",
  ];
  const key = keys[currentStep];
  if (!key) return true;
  if (Array.isArray(state[key])) return state[key].length > 0;
  return Boolean(state[key]);
}

function updateInsight() {
  const insight = document.getElementById("insightText");
  const signals = document.getElementById("signalList");

  const stepMessages = [
    // 0 — DES
    "Ton point de départ change tout — deux chemins très différents t'attendent.",
    // 1 — Langue
    state.language === "francais"
      ? "Peu d'options en français — quelques écoles offrent un accompagnement francophone."
      : "L'anglais ouvre l'accès à la majorité des écoles et universités recommandées.",
    // 2 — Objectif carrière
    state.career
      ? `Objectif ${getCareerTitle()} — les préalables et la compétitivité sont ajustés.`
      : "Ton domaine détermine les préalables et le niveau de compétition.",
    // 3 — Profil
    state.traits.length
      ? `${state.traits.length} trait${state.traits.length > 1 ? "s" : ""} sélectionné${state.traits.length > 1 ? "s" : ""} — le simulateur ajuste les recommandations.`
      : "Sélectionne ce qui te ressemble — plusieurs réponses possibles.",
    // 4 — Diplôme
    state.diploma === "ossd"
      ? "L'OSSD est reconnu partout au Canada, aux USA et à l'international."
      : state.diploma === "us"
        ? "Le diplôme américain est idéal pour Common App, NCAA et les universités US."
        : "Choisis ton diplôme cible pour affiner les recommandations.",
    // 5 — Écoles secondaires
    "Ces écoles sont filtrées selon ton diplôme et ton profil. Consulte l'Annuaire pour plus de détails.",
    // 6 — Type d'université
    state.universityType
      ? `Catégorie sélectionnée : ${labelUniversityGroup(state.universityType)}.`
      : "Choisis la catégorie d'université qui correspond à ton ambition.",
    // 7 — Universités
    state.selectedUniversities.length
      ? `${state.selectedUniversities.length} université${state.selectedUniversities.length > 1 ? "s" : ""} dans ton parcours.`
      : "Sélectionne les universités qui t'intéressent pour les ajouter au résumé.",
    // 8 — PLAR
    "Ton expérience passée peut réduire la durée et le coût de ton parcours.",
    // 9 — Roadmap
    "Ce plan est une base de départ — valide chaque étape avec les institutions.",
    // 10 — Checklist
    "Quelques points clés à confirmer avant de finaliser ton choix d'école.",
    // 11 — Résumé
    "Ton parcours complet est prêt. Imprime ou partage pour garder une trace.",
  ];

  const msg =
    stepMessages[currentStep] ||
    "Le simulateur s'adapte à ton profil en temps réel.";
  insight.textContent = msg;

  const tags = [];

  if (state.des === "oui") tags.push({ text: "DES obtenu ✓", tone: "green" });
  if (state.des === "non")
    tags.push({ text: "Parcours secondaire complet", tone: "blue" });

  if (state.diploma === "ossd")
    tags.push({ text: "OSSD Ontario", tone: "green" });
  if (state.diploma === "us") tags.push({ text: "US Diploma", tone: "green" });

  if (state.language === "francais")
    tags.push({ text: "Suivi francophone — options limitées", tone: "gold" });

  if (state.career === "stem")
    tags.push({ text: "AP et préalables à planifier", tone: "gold" });
  else if (state.career) tags.push({ text: getCareerTitle(), tone: "blue" });

  if (state.traits.includes("Fast-track"))
    tags.push({ text: "Rythme accéléré", tone: "gold" });
  if (state.traits.includes("Anxieux face aux examens"))
    tags.push({ text: "Évaluations progressives", tone: "blue" });
  if (state.traits.includes("International"))
    tags.push({ text: "Dossier international", tone: "blue" });

  if (state.universityType === "usa-top")
    tags.push({ text: "Dossier exceptionnel requis", tone: "red" });
  if (state.universityType === "quebec-fr")
    tags.push({ text: "Vérification individuelle", tone: "red" });

  const plarCount = Object.values(state.plar).filter(Boolean).length;
  if (plarCount >= 2)
    tags.push({
      text: `~${plarCount * 2}–${Math.min(16, plarCount * 4)} crédits PLAR estimés`,
      tone: "green",
    });

  if (state.selectedUniversities.length)
    tags.push({
      text: `${state.selectedUniversities.length} université${state.selectedUniversities.length > 1 ? "s" : ""} ciblée${state.selectedUniversities.length > 1 ? "s" : ""}`,
      tone: "green",
    });

  signals.innerHTML = tags
    .slice(0, 5)
    .map((t) => `<div class="signal signal-${t.tone}">${t.text}</div>`)
    .join("");
}

function getRiskTags() {
  const tags = [];
  if (state.language === "francais" || state.universityType === "quebec-fr")
    tags.push({ text: "Vérification individuelle", tone: "red" });
  if (state.career === "stem")
    tags.push({ text: "Préalables variables", tone: "gold" });
  if (state.universityType === "usa-top")
    tags.push({ text: "Ultra compétitif", tone: "red" });
  return tags;
}

function universityWarning() {
  if (state.universityType === "quebec-fr")
    return "Conditions variables — vérification individuelle requise";
  if (state.universityType === "usa-top")
    return "Admissions ultra compétitives";
  if (state.career === "stem")
    return "AP recommandés, notes élevées et préalables variables";
  return null;
}

function roadmapWarning() {
  if (state.career === "stem")
    return "Ne jamais simplifier médecine, santé, génie ou programmes professionnels.";
  if (state.language === "francais")
    return "DEC, préalables, année préparatoire ou évaluation individuelle peuvent être exigés.";
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
    "usa-top": "Top USA",
  };
  return labels[group] || group;
}

function getCareerTitle() {
  return (options.career.find(([value]) => value === state.career) || [
    null,
    "",
  ])[1];
}

function toggle(list, item) {
  return list.includes(item)
    ? list.filter((value) => value !== item)
    : [...list, item];
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
    checklist: state.checklist,
  };
  try {
    const encoded = btoa(
      unescape(encodeURIComponent(JSON.stringify(snapshot))),
    );
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
      if (snapshot.sliders && typeof snapshot.sliders === "object")
        state.sliders = { ...state.sliders, ...snapshot.sliders };
      if (snapshot.career !== undefined) state.career = snapshot.career;
      if (snapshot.universityType !== undefined)
        state.universityType = snapshot.universityType;
      if (Array.isArray(snapshot.selectedUniversities))
        state.selectedUniversities = snapshot.selectedUniversities;
      if (snapshot.plar && typeof snapshot.plar === "object")
        state.plar = { ...state.plar, ...snapshot.plar };
      if (snapshot.checklist && typeof snapshot.checklist === "object")
        state.checklist = snapshot.checklist;
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
  render();
} else {
  const restoredFromStorage = loadStateFromStorage();
  render();
  if (restoredFromStorage && currentStep > 0) {
    showRestoredToast();
  }
}
