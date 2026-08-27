import {
  Category,
  Article,
  WeeklyEdition,
  DexterColumn,
  SiteSettings,
  ImportedSourceItem,
  AiJob,
  AuditLog,
  User,
} from "@/lib/types";

export const initialUsers: User[] = [
  {
    id: "user-admin-1",
    name: "Eleanor Vance",
    email: "editor-in-chief@inknewspaper.com",
    role: "admin",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "user-editor-1",
    name: "Marcus Thorne",
    email: "marcus.thorne@inknewspaper.com",
    role: "editor",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-01-10T00:00:00Z",
  },
];

export const initialCategories: Category[] = [
  {
    id: "cat-world",
    name: "World",
    slug: "world",
    description: "International affairs, diplomatic shifts, global treaties, and transnational developments.",
    color: "#C96846",
    orderIndex: 1,
  },
  {
    id: "cat-politics",
    name: "Politics",
    slug: "politics",
    description: "Institutional governance, legislative scrutiny, civic debates, and electoral policy.",
    color: "#91442F",
    orderIndex: 2,
  },
  {
    id: "cat-current-events",
    name: "Current Events",
    slug: "current-events",
    description: "Real-time dispatches, evolving headlines, civic updates, and developing global situations.",
    color: "#B63A32",
    orderIndex: 3,
  },
  {
    id: "cat-sports",
    name: "Sports",
    slug: "sports",
    description: "Athletic endurance, tactical analysis, sporting heritage, and championship narratives.",
    color: "#7E8C72",
    orderIndex: 4,
  },
  {
    id: "cat-business",
    name: "Business",
    slug: "business",
    description: "Macroeconomic currents, market structures, industrial reinvention, and fiscal strategy.",
    color: "#D6A84B",
    orderIndex: 5,
  },
  {
    id: "cat-technology",
    name: "Technology",
    slug: "technology",
    description: "Applied artificial intelligence, computational science, cybernetics, and deep tech infrastructure.",
    color: "#546E7A",
    orderIndex: 6,
  },
  {
    id: "cat-culture",
    name: "Culture",
    slug: "culture",
    description: "Literary criticism, architectural movements, visual arts, and contemporary thought.",
    color: "#8D6E63",
    orderIndex: 7,
  },
  {
    id: "cat-spirituality",
    name: "Spirituality",
    slug: "spirituality",
    description: "Contemplative traditions, moral philosophy, existential inquiry, and modern asceticism.",
    color: "#6B7280",
    orderIndex: 8,
  },
];

export const initialWeeklyEditions: WeeklyEdition[] = [
  {
    id: "edition-vol14-iss33",
    volumeNumber: 14,
    issueNumber: 33,
    title: "The Architecture of Resilience",
    theme: "How modern institutions, cities, and minds are being re-engineered for volatility.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    publicationDate: "2026-08-20",
    isCurrent: true,
    description: "Issue 33 explores the profound shift from fragile optimization to durable resilience across world economies, artisanal supply chains, and contemplative philosophy.",
    articleIds: [
      "art-lead-manufacturing",
      "art-tech-surgical-ai",
      "art-world-hydrogen",
      "art-spirituality-retreats",
      "art-business-sovereign-wealth",
      "art-politics-civic-trust",
      "art-culture-typography",
      "art-sports-ultramodern",
    ],
  },
  {
    id: "edition-vol14-iss32",
    volumeNumber: 14,
    issueNumber: 32,
    title: "Beyond the Digital Frontier",
    theme: "The emerging synthesis of physical reality, artisanal crafts, and spatial computing.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    publicationDate: "2026-08-13",
    isCurrent: false,
    description: "Issue 32 investigates the counter-intuitive revival of tactile objects, physical books, and mechanical horology alongside advanced quantum algorithms.",
    articleIds: ["art-culture-typography", "art-lead-manufacturing"],
  },
  {
    id: "edition-vol14-iss31",
    volumeNumber: 14,
    issueNumber: 31,
    title: "The Resurgence of the Craft",
    theme: "Why precision human labor and clay-molded tactility are outpacing automated mass production.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
    publicationDate: "2026-08-06",
    isCurrent: false,
    description: "A deep dive into the master builders, clockmakers, and print press pioneers who are redefining enduring excellence in the twenty-first century.",
    articleIds: ["art-spirituality-retreats", "art-business-sovereign-wealth"],
  },
];

export const initialDexterColumns: DexterColumn[] = [
  {
    id: "col-dexter-1",
    slug: "quiet-revolution-of-analog-mindsets",
    title: "The Quiet Revolution of Analog Mindsets in an Accelerated Age",
    subtitle: "Why the most lucid strategic thinkers of our time are abandoning hyper-connectivity for tactile notebooks and unmeasured silence.",
    excerpt: "In a world calibrated to millisecond algorithmic loops, the ultimate competitive and spiritual advantage belongs to the deliberate thinker who can sit undisturbed with a single idea for four unbroken hours.",
    signatureQuote: "Silence is not the absence of thought; it is the clean slate upon which original conviction is etched.",
    content: `
      <p class="drop-cap">We have spent the better part of two decades measuring intelligence by speed. We built fiber-optic conduits to shave nanoseconds from equity arbitrage, engineered notification cascades to seize dopamine receptors within four hundred milliseconds, and trained artificial neural architectures to summarize three hundred pages of civic history into bulleted fragments in less time than it takes to inhale.</p>

      <p>Yet across the world's most demanding intellectual corridors—from high-table Cambridge seminars to advanced aerospace design skunks—a quiet, deliberate counter-revolution has taken root. The practitioners of this movement do not carry tablets into executive council chambers. They write in Smythson bound ledgers with fountain pens ground to Japanese extra-fine nibs. They do not skim synthetic digests; they read annotated Latin translations by lamp-lit parchment.</p>

      <h2>The Pathology of Ephemeral Cognition</h2>
      <p>When every query receives an instantaneous, statistically plausible consensus answer, the human faculty for deep structural interrogation begins to atrophy. What we gain in cognitive convenience, we sacrifice in idiosyncratic synthesis. The great insights of human civilization—whether the formulation of general relativity or the drafting of constitutional guarantees—did not emerge from rapid-fire prompt cycles; they were forged in the crucible of extended, uncomfortable ambiguity.</p>

      <blockquote>
        "The mind that cannot endure thirty minutes of unanswered contemplation will invariably surrender its sovereignty to whichever algorithm supplies the fastest comfort."
      </blockquote>

      <p>To resist this cognitive dilution is not an exercise in nostalgic Luddism. It is a tactical imperative. When everyone has equal access to instantaneous synthetic summaries, the only enduring differentiator is the depth of one's unassisted mental models, the precision of one's ethical discernment, and the patience to watch an intricate problem unfold across weeks rather than seconds.</p>

      <h2>The Discipline of the White Page</h2>
      <p>Consider the physical act of writing on paper. Unlike the glass surface of a capacitive display, paper possesses friction, acoustic feedback, and irrecoverable commitment. A stroke of ink cannot be backspaced away without leaving a visible scar. This physical resistance forces the writer to formulate the thought completely in the mind before the hand moves.</p>

      <p>In our newsroom at INK, we preserve this standard ruthlessly. Before our editorial board authorizes an investigative commission, our correspondents must submit a two-page typewritten memorandum. No digital slides, no animated transitions, no AI-generated bullet points. Only clear, unvarnished prose defended under rigorous collegial examination.</p>

      <p>As you turn through the pages of this thirty-third edition, I invite you to set aside the urgent demands of the feed. Pour a warm cup, find a quiet chair by natural light, and allow your mind to re-engage with the slow, exhilarating art of deep reading.</p>
    `,
    publishedAt: "2026-08-20T08:00:00Z",
    editionId: "edition-vol14-iss33",
    editionName: "Vol. 14, Issue 33",
    tags: ["Philosophy", "Cognition", "Analog Living", "Editorial Discipline"],
    featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80",
    status: "published",
    readingTimeMinutes: 6,
    authorBio: "Dexter is the Senior Columnist and Philosophical Editor of INK Newspaper. For over two decades, his weekly dispatches have dissected the collision of technology, culture, and enduring human virtues.",
  },
  {
    id: "col-dexter-2",
    slug: "on-the-geometry-of-civic-trust",
    title: "On the Geometry of Civic Trust and the Perils of Ephemeral News",
    subtitle: "Examining why newspapers must reclaim their role as permanent records of truth rather than frantic mirrors of instant emotion.",
    excerpt: "A society that cannot agree on what happened yesterday morning will find itself utterly incapable of building a bridge toward next decade.",
    signatureQuote: "Truth is not a commodity to be auctioned to the most agitated bidder; it is a public trust that requires patience and courage to verify.",
    content: `
      <p class="drop-cap">A newspaper is not merely a vehicle for commercial advertising or an aggregation of trending outrage. In its highest expression, a newspaper is a civic anchor—a daily or weekly covenant between a community and its collective reality.</p>
      <p>When that covenant is replaced by algorithmic optimization for engagement, the geometry of civic trust collapses into fragmented echo chambers. We must rebuild the editorial institution with the permanence of stone and the transparency of clear glass.</p>
    `,
    publishedAt: "2026-08-13T08:00:00Z",
    editionId: "edition-vol14-iss32",
    editionName: "Vol. 14, Issue 32",
    tags: ["Civic Trust", "Journalism", "Ethics", "Democracy"],
    featuredImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80",
    status: "published",
    readingTimeMinutes: 7,
    authorBio: "Dexter is the Senior Columnist and Philosophical Editor of INK Newspaper.",
  },
  {
    id: "col-dexter-3",
    slug: "cartography-of-solitude",
    title: "The Cartography of Solitude: Rediscovering Stillness in Modern Cities",
    subtitle: "How intentional architectural spaces and quiet gardens provide the psychological buffer necessary for enduring sanity.",
    excerpt: "True urban elegance is not measured by the height of glass towers, but by the accessibility of silence for those who walk between them.",
    signatureQuote: "To know a city is to know where its silence resides.",
    content: `
      <p class="drop-cap">Every great metropolis holds within its cartography hidden chambers of silence—the cloistered courtyard behind a medieval cathedral, the sunlit library reading room with five-story clerestory windows, the tucked-away botanical garden where the sound of vehicle traffic dissolves into wind through cypress needles.</p>
      <p>In our modern design discourse, we obsess over connectivity and density while neglecting the fundamental human requirement for acoustic sanctuary.</p>
    `,
    publishedAt: "2026-08-06T08:00:00Z",
    editionId: "edition-vol14-iss31",
    editionName: "Vol. 14, Issue 31",
    tags: ["Architecture", "Urbanism", "Solitude", "Mindfulness"],
    featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    status: "published",
    readingTimeMinutes: 5,
    authorBio: "Dexter is the Senior Columnist and Philosophical Editor of INK Newspaper.",
  },
];

export const initialArticles: Article[] = [
  {
    id: "art-lead-manufacturing",
    slug: "renaissance-of-independent-micro-manufacturing",
    title: "The Renaissance of Independent Micro-Manufacturing: How Artisanal Supply Chains Are Rewriting Global Logistics",
    deck: "Decentralized micro-foundries, precision five-axis machining, and hyper-local production clusters are dismantling the forty-year hegemony of monolithic overseas manufacturing.",
    summary: "An in-depth investigation into how specialized regional workshops are combining aerospace-grade tolerances with artisanal craftsmanship to disrupt global supply chains.",
    content: `
      <p class="drop-cap">Inside a nondescript brick warehouse in the northern industrial district of Turin, five synchronized five-axis computer-numerical milling centers hum in harmonic unison. There are no shipping containers waiting outside, no labyrinthine customs declarations awaiting stamped approval, and no multi-month backlog stranded at maritime chokepoints.</p>

      <p>Here, a team of eleven master machinists and computational engineers produces surgical-grade titanium implants, bespoke aerospace heat exchangers, and precision horological bridges on direct customer demand. Turnaround time: forty-eight hours from CAD approval to cryogenic surface finishing.</p>

      <h2>The Fracturing of Monolithic Logistics</h2>
      <p>For nearly half a century, industrial orthodoxy dictated a single, unyielding doctrine: scale at all costs. Global corporations outsourced every component to gargantuan centralized factories in Southeast Asia, betting that rock-bottom maritime container rates and low labor costs would perpetually compensate for long lead times and brittle logistical pipelines.</p>

      <p>That paradigm has reached its mathematical limit. Geopolitical tensions, volatile fuel surcharges, and the sheer unpredictability of global shipping corridors have inverted the cost calculus. Today, the hidden costs of holding six months of container inventory often exceed the margin savings of centralized fabrication.</p>

      <blockquote>
        "The future of manufacturing is not a ten-million-square-foot mega-factory in a single port city. It is ten thousand precision micro-foundries networked across sovereign economic regions."
      </blockquote>

      <h2>Precision Meets Artisanal Touch</h2>
      <p>What distinguishes this new wave of micro-manufacturing from prior automation efforts is the intimate integration of human tactile mastery with computational precision. Rather than replacing the craftsman, automated toolpaths handle the rough bulk milling, leaving the master polisher, hand-beveler, and metrology specialist to calibrate the final micron tolerances.</p>

      <p>Economist Dr. Clara Sterling of the Zurich Institute for Industrial Morphology notes: <em>"When you reduce the distance between the engineer, the machinist, and the final client to zero, you unlock an innovation cycle that is orders of magnitude faster than any centralized overseas supplier can match."</em></p>

      <h2>Regional Sovereign Manufacturing</h2>
      <p>Governments across Europe, North America, and East Asia are taking notice. Municipalities that once suffered post-industrial decay are now offering tax credits for distributed manufacturing cooperatives. Small towns with rich traditions in metalworking and optics are witnessing a dramatic demographic rejuvenation as young engineers and master apprentices relocate from congested capitals.</p>

      <p>As the global economy navigates an era of heightened volatility, these resilient, clay-grounded micro-foundries represent something more than an economic trend: they are the architectural blueprints for twenty-first-century industrial sovereignty.</p>
    `,
    categoryId: "cat-business",
    tags: ["Manufacturing", "Supply Chains", "Industrial Design", "Economics", "Technology"],
    authorName: "Eleanor Vance",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "A technician calibrates a custom titanium aerospace valve inside a northern Italian micro-foundry.",
    imageCredit: "Photograph by Marco Bellini / INK Archive",
    imageAlt: "Precision machining workshop with metal sparks and high-tech milling machines",
    status: "published",
    isFeatured: true,
    isLead: true,
    isBreaking: false,
    readingTimeMinutes: 8,
    publishedAt: "2026-08-20T06:00:00Z",
    updatedAt: "2026-08-20T06:00:00Z",
    createdAt: "2026-08-19T14:30:00Z",
    seoTitle: "The Renaissance of Independent Micro-Manufacturing | INK Newspaper",
    seoDescription: "How decentralized micro-foundries and precision artisanal supply chains are rewriting global logistics and dismantling industrial outsourcing.",
    aiGenerated: false,
    sources: [
      {
        id: "src-1",
        name: "Zurich Institute for Industrial Morphology",
        url: "https://example.org/reports/micro-foundry-renaissance",
        publisher: "ZIIM Research Press",
        publishedAt: "2026-08-15",
        permission: "metadata_only",
      },
      {
        id: "src-2",
        name: "European Precision Manufacturing Council",
        url: "https://example.org/council/logistics-report-2026",
        publisher: "EPMC Publications",
        publishedAt: "2026-08-10",
        permission: "licensed_republish",
      },
    ],
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-tech-surgical-ai",
    slug: "synthetic-cognition-in-the-operating-theatre",
    title: "Synthetic Cognition in the Operating Theatre: Ethical Frontiers of Autonomous Surgical Systems",
    deck: "Sub-millimeter micro-robotic incisions guided by real-time neural models are outperforming human tremor thresholds, igniting a profound debate over medical autonomy.",
    summary: "As autonomous robotic surgery achieves sub-millimeter precision in complex neurovascular procedures, surgeons and medical ethicists grapple with accountability, consent, and the evolving doctor-patient relationship.",
    content: `
      <p class="drop-cap">In Operating Theatre 4 at the Karolinska University Hospital, a thirty-four-year-old patient with an inoperable deep-brain arteriovenous malformation lies motionless. Above the sterile field, four carbon-fiber robotic arms terminate in tungsten needles no thicker than three human hair strands.</p>

      <p>The chief neurosurgeon sits five meters away behind a polarized haptic console, her hands resting lightly on the master controls. For ninety minutes, the system autonomously micro-sutures a delicate vascular junction at an accuracy tolerance of thirty microns—three times finer than the human physiological tremor threshold.</p>

      <h2>The Threshold of Autonomy</h2>
      <p>Unlike first-generation laparoscopic robots that functioned purely as mechanical master-slave telemanipulators, these third-generation surgical platforms utilize real-time intraoperative optical coherence tomography and sub-surface blood flow tracking to dynamically predict vascular wall compliance.</p>

      <p>If a micro-vessel undergoes sudden vasospasm during dissection, the neural controller can recalculate needle trajectory in 1.2 milliseconds—preventing catastrophic hemorrhage before the human eye can register the change on an 8K monitor.</p>

      <blockquote>
        "We are no longer simply using a tool; we are co-operating with a cognitive partner that perceives biological structures in wavelengths and speeds beyond human sensory thresholds."
      </blockquote>

      <h2>The Legal and Ethical Vacuum</h2>
      <p>Yet this extraordinary clinical leap introduces profound legal and ethical dilemmas. If an autonomous controller misinterprets scar tissue for an anomalous venous shunt, where does liability reside? With the supervising surgeon who intervened four seconds too late? With the hospital engineering consortium? Or with the foundational model training pipeline?</p>

      <p>The International Medical Ethics Assembly in Geneva is drafting the first comprehensive framework requiring explicit patient consent protocols for autonomous algorithmic intervention phases, ensuring that human agency remains the ultimate guardian of biological sanctity.</p>
    `,
    categoryId: "cat-technology",
    tags: ["Artificial Intelligence", "Medicine", "Robotics", "Ethics", "Healthcare"],
    authorName: "Dr. Alistair Vance",
    authorRole: "Science & Medicine Correspondent",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "High-precision surgical robotic arms engaged in microscopic neurovascular simulation.",
    imageCredit: "Photo courtesy of Karolinska BioRobotics Lab",
    imageAlt: "Advanced medical robotic arms over an operating table in sterile theatre",
    status: "published",
    isFeatured: true,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 7,
    publishedAt: "2026-08-20T07:15:00Z",
    updatedAt: "2026-08-20T07:15:00Z",
    createdAt: "2026-08-19T11:00:00Z",
    seoTitle: "Synthetic Cognition in the Operating Theatre | INK Newspaper",
    seoDescription: "Investigating the ethical frontiers and clinical triumphs of autonomous robotic surgery in neurovascular procedures.",
    aiGenerated: false,
    sources: [
      {
        id: "src-3",
        name: "Karolinska Institute Department of Clinical Neuroscience",
        url: "https://example.org/karolinska/surgical-ai-trials",
        publisher: "Karolinska University Press",
        publishedAt: "2026-08-12",
        permission: "metadata_only",
      },
    ],
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-world-hydrogen",
    slug: "geopolitics-of-clean-hydrogen-corridors",
    title: "The Geopolitics of Clean Hydrogen Corridors in the Mediterranean Basin",
    deck: "Subsea pipeline agreements between North African solar mega-complexes and Southern European industrial hubs are forging a new energy geography.",
    summary: "As trans-Mediterranean green hydrogen infrastructure takes shape, coastal nations from Morocco to Italy are renegotiating energy sovereignty and diplomatic leverage.",
    content: `
      <p class="drop-cap">Along the windswept Atlantic coast of southern Morocco, solar arrays and wind turbines stretch toward the desert horizon across four hundred square kilometers. Below ground, desalination stations convert seawater into pure distilled water before polymer-electrolyte membrane electrolyzers split the molecules into green hydrogen.</p>

      <p>This is the northern terminus of the proposed Maghreb-Europe Clean Hydrogen Corridor—a multi-billion-euro infrastructure network designed to transport three million metric tons of green fuel annually under the Strait of Gibraltar to the industrial heartlands of Germany, France, and northern Italy.</p>

      <h2>A New Diplomatic Currency</h2>
      <p>Energy transitions are never merely technological; they are fundamentally geopolitical. For seven decades, Mediterranean diplomatic relations were defined by hydrocarbon dependencies and fossil fuel transit fees. The emergence of green hydrogen corridors is rebalancing power dynamics across the southern Mediterranean rim.</p>

      <p>Nations that once occupied the economic periphery are suddenly positioning themselves as foundational energy guarantors for the continent. With year-round solar irradiance exceeding 2,500 kilowatt-hours per square meter, North Africa possesses a natural energy arbitrage advantage that European domestic renewables cannot match.</p>

      <h2>The Engineering Hurdles</h2>
      <p>Transporting compressed hydrogen through subsea steel pipelines presents formidable technical hurdles. Hydrogen molecules are tiny enough to penetrate metallic lattice structures, inducing embrittlement and micro-cracking under high pressures. Engineers are pioneering composite polymer liners and internal graphene barrier coatings to guarantee fifty-year structural integrity.</p>

      <p>If these corridors succeed, the Mediterranean will once again serve as the historical bridge uniting two continents in mutual economic and environmental prosperity.</p>
    `,
    categoryId: "cat-world",
    tags: ["Renewable Energy", "Geopolitics", "Mediterranean", "Climate", "Infrastructure"],
    authorName: "Marcus Thorne",
    authorRole: "Senior World Affairs Editor",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Large-scale photovoltaic solar and wind turbine installations powering trans-continental green energy.",
    imageCredit: "Photograph by Tariq Mansour / INK Press",
    imageAlt: "Expansive solar panels in desert landscape under golden twilight sky",
    status: "published",
    isFeatured: true,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-08-20T08:30:00Z",
    updatedAt: "2026-08-20T08:30:00Z",
    createdAt: "2026-08-18T16:00:00Z",
    seoTitle: "The Geopolitics of Clean Hydrogen Corridors | INK Newspaper",
    seoDescription: "How trans-Mediterranean green hydrogen infrastructure is redrawing global energy alliances and economic power balance.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-spirituality-retreats",
    slug: "silent-architecture-of-monastic-retreats",
    title: "The Silent Architecture of Monastic Retreats: Why High-Tech Founders Seek Ancient Solitude",
    deck: "Centuries-old stone cloisters across the Italian Apennines are experiencing an unprecedented influx of venture capitalists and software architects seeking digital detachment.",
    summary: "An exploration into why the creators of hyper-connected algorithms are paying thousands to surrender their smartphones and observe thirty-day vows of silence in Benedictine monasteries.",
    content: `
      <p class="drop-cap">High in the mist-shrouded limestone ridges of the Umbrian Apennines, the Abbey of San Girolamo has stood since the twelfth century. Its thick stone walls, Romanesque arches, and gravel courtyards were engineered with a single architectural intent: to isolate the human soul from the distractions of transient commerce.</p>

      <p>Today, the guest cells are fully booked through 2027. But the guests are not medieval pilgrims or theological scholars. They are machine learning researchers from Silicon Valley, hedge fund quantitative partners from Mayfair, and hardware architects from Shenzhen.</p>

      <h2>The Voluntary Great Disconnect</h2>
      <p>Upon arrival at the monastery gatehouse, every guest surrenders all electronic devices—smartphones, wearables, laptops, and tablets—into a heavy cedar chest that remains locked until departure. For the subsequent twenty-one days, they observe the <em>Silentium Magnum</em>: no speech, no written notes, no podcasts, no digital inputs.</p>

      <p>Brother Matteo, the abbey's guestmaster, observes: <em>"In the first seventy-two hours, we see physical withdrawal symptoms. Their hands instinctively tap their pockets for phantom vibrations. By day seven, their breathing slows, their eyes adjust to distant horizons, and their capacity for sustained observation returns."</em></p>

      <blockquote>
        "When you spend your professional life constructing algorithmic webs to capture human attention, you quickly learn that your own attention is the most endangered resource on Earth."
      </blockquote>

      <h2>The Reclaiming of Moral Sovereignty</h2>
      <p>Why are technology leaders gravitating toward ancient contemplative disciplines? Many describe an acute ethical exhaustion. Building systems designed to optimize click-through velocity leaves little psychological space for questions of long-term human flourishing.</p>

      <p>In the silence of the stone cloister, without notifications measuring engagement metrics, these thinkers are rediscovering the ancient art of moral discernment—re-emerging into the world with a renewed commitment to human-scale technology.</p>
    `,
    categoryId: "cat-spirituality",
    tags: ["Mindfulness", "Monasteries", "Philosophy", "Tech Culture", "Solitude"],
    authorName: "Helena Lindqvist",
    authorRole: "Culture & Philosophy Critic",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Sunlight pierces the stone arches of a 12th-century Benedictine cloister in central Italy.",
    imageCredit: "Photograph by Lorenzo Moretti / INK Archive",
    imageAlt: "Historic stone monastery cloister with morning sunlight casting long shadows",
    status: "published",
    isFeatured: true,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-08-20T09:00:00Z",
    updatedAt: "2026-08-20T09:00:00Z",
    createdAt: "2026-08-18T10:00:00Z",
    seoTitle: "The Silent Architecture of Monastic Retreats | INK Newspaper",
    seoDescription: "Why the architects of modern artificial intelligence are retreating to ancient stone cloisters for digital fasting and contemplation.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-politics-civic-trust",
    slug: "rebuilding-deliberative-assemblies-in-polarised-democracies",
    title: "Rebuilding Deliberative Assemblies: How Citizens' Juries Are Overcoming Algorithmic Polarization",
    deck: "By selecting representative citizens via sortition and providing them with verified expert testimony, municipal governments are solving intractable civic disputes.",
    summary: "How lottery-selected citizen assemblies in Ireland, France, and Canada are demonstrating that ordinary citizens can navigate complex policy trade-offs when removed from party politics.",
    content: `
      <p class="drop-cap">In a sunlit auditorium inside the City Hall of Brussels, ninety-six citizens selected entirely by statistical lottery gather around circular oak tables. Among them are a retired postal clerk, a twenty-one-year-old culinary student, a corporate tax attorney, and an immigrant dry-cleaner.</p>

      <p>For eight consecutive weekends, they are not debating thirty-second television soundbites or exchanging vitriolic comments on social networks. They are listening to climate hydrologists, urban economists, and transport engineers, cross-examining the witnesses, and collaboratively drafting binding municipal housing regulations.</p>

      <h2>The Power of Sortition</h2>
      <p>Sortition—the ancient Athenian practice of choosing public decision-makers by random lottery rather than partisan elections—is enjoying a remarkable modern renaissance. When ordinary citizens are placed in a room with reliable data, neutral facilitation, and ample time to deliberate, political polarization dissolves into pragmatism.</p>

      <p>Political theorist Dr. Ethan Ward notes: <em>"Elections inevitably reward performative conflict and sensationalism. Sortition rewards honest curiosity, empathy, and collective problem-solving."</em></p>
    `,
    categoryId: "cat-politics",
    tags: ["Democracy", "Sortition", "Governance", "Civic Policy", "Elections"],
    authorName: "Marcus Thorne",
    authorRole: "Senior World Affairs Editor",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Citizens participate in a municipal deliberative assembly in Brussels.",
    imageCredit: "Photo by European Civic Initiative",
    imageAlt: "Diverse group of people seated in circular conference discussion",
    status: "published",
    isFeatured: false,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 5,
    publishedAt: "2026-08-19T10:00:00Z",
    updatedAt: "2026-08-19T10:00:00Z",
    createdAt: "2026-08-17T12:00:00Z",
    seoTitle: "Rebuilding Deliberative Assemblies | INK Newspaper",
    seoDescription: "How lottery-selected citizen juries are bypassing political gridlock to solve complex civic challenges.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-culture-typography",
    slug: "the-materiality-of-ink-and-movable-type",
    title: "The Materiality of Ink and Movable Type in an Era of Transient Pixels",
    deck: "A new generation of independent letterpress printers and type foundries is proving that physical typography creates enduring neural retention.",
    summary: "Investigating the cognitive science behind physical printing, hot-metal typesetting, and why high-contrast serif typography commands deeper reader absorption.",
    content: `
      <p class="drop-cap">There is a distinct acoustic rhythm inside the workshop of the Saint-Germain Press in Paris: the deliberate clank of cast-iron Heidelberg platen presses, the scent of linseed oil and lampblack ink, and the tactile heft of handmade cotton rag paper.</p>

      <p>While mainstream publishing raced toward ephemeral digital formats, these master printers doubled down on the tactile physical presence of the printed word. Recent cognitive neuroimaging studies from Oxford University validate their conviction: readers retain complex philosophical arguments significantly better when reading physical ink on textured paper compared to uniform liquid-crystal displays.</p>
    `,
    categoryId: "cat-culture",
    tags: ["Typography", "Design", "Books", "Print", "Neuroscience"],
    authorName: "Helena Lindqvist",
    authorRole: "Culture & Philosophy Critic",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Lead movable type sorted in traditional wooden California cases.",
    imageCredit: "Photograph by Claire Dupont / INK Arts",
    imageAlt: "Vintage typography wooden cases with lead metal letters",
    status: "published",
    isFeatured: false,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 5,
    publishedAt: "2026-08-19T14:00:00Z",
    updatedAt: "2026-08-19T14:00:00Z",
    createdAt: "2026-08-17T15:00:00Z",
    seoTitle: "The Materiality of Ink and Movable Type | INK Newspaper",
    seoDescription: "Why tactile letterpress printing and high-contrast typography evoke deeper cognitive retention.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-sports-ultramodern",
    slug: "biomechanics-of-the-four-minute-threshold",
    title: "The Biomechanics of the Four-Minute Threshold: Inside High-Altitude Mountain Ascents Without Supplemental Oxygen",
    deck: "Alpinists pushing the biological limits of aerobic respiration are combining biometric data modeling with classical mountain austerity.",
    summary: "How modern high-altitude climbers are redefining extreme human endurance through metabolic efficiency, respiratory pacing, and radical minimalism.",
    content: `
      <p class="drop-cap">At 8,200 meters above sea level on the frozen northwest ridge of Dhaulagiri, atmospheric pressure drops to one-third of sea-level density. Each breath delivers only a fraction of the oxygen molecules required to sustain cellular metabolism.</p>

      <p>Yet a new generation of minimalist alpinists is abandoning heavy oxygen canisters, fixed ropes, and commercial logistics teams in favor of rapid, single-push alpine ascents. By optimizing mitochondrial density through hypoxic sleep protocols and cadence-locked diaphragm breathing, these athletes are testing the ultimate boundaries of human physiology.</p>
    `,
    categoryId: "cat-sports",
    tags: ["Alpinism", "Endurance", "Sports Science", "Mountains", "Physiology"],
    authorName: "Liam O'Connor",
    authorRole: "Endurance & Exploration Writer",
    authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "A solitary climber navigates an exposed ridge in the Swiss Alps at dawn.",
    imageCredit: "Photograph by Thomas Berg / Alpine Guild",
    imageAlt: "Snowy alpine mountain ridge under clear golden sunrise",
    status: "published",
    isFeatured: false,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 6,
    publishedAt: "2026-08-18T11:00:00Z",
    updatedAt: "2026-08-18T11:00:00Z",
    createdAt: "2026-08-16T14:00:00Z",
    seoTitle: "The Biomechanics of High-Altitude Ascents | INK Newspaper",
    seoDescription: "Exploring the physiological limits of oxygen-free alpine ascents and human endurance.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-business-sovereign-wealth",
    slug: "sovereign-wealth-funds-pivot-to-perpetual-infrastructure",
    title: "Sovereign Wealth Funds Pivot to Perpetual Infrastructure and Geothermal Grid Anchors",
    deck: "Trillion-dollar institutional funds are abandoning quarterly liquidity targets to finance hundred-year deep geothermal and baseload energy grids.",
    summary: "An analysis of how global sovereign wealth funds are taking generational bets on deep geothermal infrastructure to secure predictable yield and carbon-neutral sovereignty.",
    content: `
      <p class="drop-cap">In the boardrooms of sovereign funds in Oslo, Singapore, and Abu Dhabi, the investment horizon is no longer measured in quarters or fiscal years. Faced with prolonged macroeconomic volatility and systemic inflation risks, capital allocators are deploying hundreds of billions into perpetual infrastructure assets.</p>

      <p>Chief among these investments are deep supercritical geothermal wells drilled five kilometers into the Earth's crust, unlocking inexhaustible 400-degree thermal reservoirs capable of providing round-the-clock baseload electrical power for generations without fuel consumption.</p>
    `,
    categoryId: "cat-business",
    tags: ["Sovereign Wealth", "Finance", "Geothermal", "Energy", "Infrastructure"],
    authorName: "Eleanor Vance",
    authorRole: "Editor-in-Chief",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Financial district skyscraper reflecting modern infrastructure investments.",
    imageCredit: "Photograph by David Zhang / INK Financial",
    imageAlt: "Modern glass and steel architecture against evening sky",
    status: "published",
    isFeatured: false,
    isLead: false,
    isBreaking: false,
    readingTimeMinutes: 7,
    publishedAt: "2026-08-18T09:00:00Z",
    updatedAt: "2026-08-18T09:00:00Z",
    createdAt: "2026-08-16T08:00:00Z",
    seoTitle: "Sovereign Wealth Funds Pivot to Perpetual Infrastructure | INK Newspaper",
    seoDescription: "How trillion-dollar institutional investors are reallocating capital into hundred-year geothermal and energy projects.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
  {
    id: "art-current-events-treaty",
    slug: "geneva-concludes-historic-treaty-on-autonomous-orbital-debris-removal",
    title: "Geneva Concludes Historic Treaty on Autonomous Orbital Debris Removal and Space Traffic Norms",
    deck: "Thirty-eight spacefaring nations ratify binding protocols for laser-assisted de-orbiting of defunct satellite constellations.",
    summary: "World powers in Geneva establish the first binding international legal framework for autonomous space tugs and debris remediation in Low Earth Orbit.",
    content: `
      <p class="drop-cap">Following fourteen months of high-stakes diplomatic negotiations in the Palais des Nations, delegates from thirty-eight nations stood to applaud the unanimous adoption of the Geneva Orbital Commons Accord.</p>

      <p>The landmark treaty establishes mandatory registration, automated collision avoidance transponders, and authorized neutral laser de-orbiting corridors to mitigate the critical buildup of space debris in Low Earth Orbit before catastrophic cascade scenarios render orbital navigation impossible.</p>
    `,
    categoryId: "cat-current-events",
    tags: ["Space", "International Law", "Geneva", "Diplomacy", "Technology"],
    authorName: "Marcus Thorne",
    authorRole: "Senior World Affairs Editor",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80",
    imageCaption: "Earth's atmosphere and satellite constellations viewed from orbit.",
    imageCredit: "NASA / International Space Agency Archive",
    imageAlt: "Earth view from space showing atmospheric glow and stars",
    status: "published",
    isFeatured: false,
    isLead: false,
    isBreaking: true,
    readingTimeMinutes: 5,
    publishedAt: "2026-08-20T10:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-20T09:30:00Z",
    seoTitle: "Geneva Concludes Historic Treaty on Orbital Debris | INK Newspaper",
    seoDescription: "Thirty-eight spacefaring nations ratify binding treaty on orbital space traffic and autonomous debris removal.",
    aiGenerated: false,
    weeklyEditionId: "edition-vol14-iss33",
  },
];

export const initialSiteSettings: SiteSettings = {
  siteName: "INK Newspaper",
  tagline: "The Weekly Editorial of Distinction",
  currentEditionId: "edition-vol14-iss33",
  leadArticleId: "art-lead-manufacturing",
  topStoryIds: ["art-tech-surgical-ai", "art-world-hydrogen", "art-spirituality-retreats"],
  breakingNewsText: "BREAKING: Geneva treaty on autonomous orbital space debris signed by 38 nations.",
  breakingNewsActive: true,
  footerQuote: "Molded from truth, committed to clarity.",
};

export const initialImportedSources: ImportedSourceItem[] = [
  {
    id: "imp-1",
    title: "Global Central Banks Advance Interoperable Wholesale CBDC Settlement Grid",
    description: "Project Agorá announces successful pilot across seven jurisdictions, demonstrating real-time cross-border settlements with automated FX clearing.",
    url: "https://newsdata.io/sample/cbdc-settlement-grid",
    sourceName: "Financial Times Syndicate",
    publishedAt: "2026-08-20T04:15:00Z",
    categorySlug: "business",
    permission: "metadata_only",
    isProcessed: false,
    clusterId: "cluster-cbdc-2026",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "imp-2",
    title: "Deep-Sea Hydrothermal Vent Ecosystems Discover Unique Carbon-Fixing Microbes",
    description: "Oceanographic expedition in the Mariana Arc identifies chemosynthetic bacteria capable of converting sulfur and inorganic carbon into stable biomaterials.",
    url: "https://gdelt.org/sample/hydrothermal-microbes",
    sourceName: "Nature Geosciences Wire",
    publishedAt: "2026-08-19T22:30:00Z",
    categorySlug: "technology",
    permission: "licensed_republish",
    isProcessed: false,
    clusterId: "cluster-ocean-microbes",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "imp-3",
    title: "European Union Ratifies Standardized Architecture for Heritage Building Retrofits",
    description: "New directives mandate breathable lime-mortar insulations and solar roof tiles that preserve medieval and neoclassical facade aesthetics.",
    url: "https://newsdata.io/sample/heritage-retrofits",
    sourceName: "Reuters Architecture Wire",
    publishedAt: "2026-08-19T18:00:00Z",
    categorySlug: "culture",
    permission: "metadata_only",
    isProcessed: false,
    clusterId: "cluster-heritage-retrofit",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
  },
];

export const initialAiJobs: AiJob[] = [
  {
    id: "job-1",
    status: "completed",
    storyClusterTitle: "Renaissance of Independent Micro-Manufacturing",
    sourceUrls: [
      "https://example.org/reports/micro-foundry-renaissance",
      "https://example.org/council/logistics-report-2026",
    ],
    promptText: "Draft a comprehensive, highly rigorous journalistic article on the decentralization of precision micro-foundries across European industrial hubs.",
    resultArticleId: "art-lead-manufacturing",
    confidenceScore: 0.96,
    claimsFound: [
      "Five-axis milling centers achieve 48-hour turnarounds",
      "Decentralized logistics inverting centralized container savings",
    ],
    createdAt: "2026-08-19T14:00:00Z",
    completedAt: "2026-08-19T14:02:15Z",
  },
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    actorName: "Eleanor Vance",
    actorEmail: "editor-in-chief@inknewspaper.com",
    action: "PUBLISH_ARTICLE",
    targetType: "article",
    targetId: "art-lead-manufacturing",
    details: "Published lead article 'The Renaissance of Independent Micro-Manufacturing' for Weekly Edition Vol. 14 Issue 33.",
    createdAt: "2026-08-20T06:00:00Z",
  },
  {
    id: "log-2",
    actorName: "Dexter",
    actorEmail: "dexter@inknewspaper.com",
    action: "PUBLISH_COLUMN",
    targetType: "dexter_column",
    targetId: "col-dexter-1",
    details: "Published weekly column 'The Quiet Revolution of Analog Mindsets in an Accelerated Age'.",
    createdAt: "2026-08-20T08:00:00Z",
  },
];
