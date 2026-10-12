export const PRODUCTS_DATA = [
  {
    id: "industrial-machinery-automation",
    category: "automation",
    title: "Industrial machinery & automation",
    subtitle: "Custom machinery, machine controls and production systems.",
    image: "/products/automation.jpg",
    badge: "Automation & Robotics",
    videoStatus: "Coming Soon",
    duration: "02:45",
    description: "Sanota develops and integrates machinery and automation solutions intended to improve productivity, consistency, safety and operational control. Solutions may involve new machinery, special-purpose equipment, automated stations or the modernization of existing machines.",
    highlights: [
      "Custom industrial machinery & special-purpose machines",
      "Siemens & Allen-Bradley PLC architectures",
      "Intuitive HMI and operator-control interfaces",
      "Robotic assembly cells & precision handling",
      "Comprehensive machine safety & CE conformity"
    ],
    applications: "Manufacturing plants, assembly lines, automated packaging, precision fabrication",
    specs: [
      { label: "Control System", value: "PLC (Siemens S7-1500 / Allen-Bradley)" },
      { label: "Cycle Time", value: "Tailored to high-throughput industrial specs" },
      { label: "Safety Standard", value: "ISO 13849-1 (Cat 3/4, PL d/e)" },
      { label: "Integration", value: "Profinet, EtherNet/IP, Modbus TCP" }
    ]
  },
  {
    id: "food-tea-processing",
    category: "processing",
    title: "Food & tea processing",
    subtitle: "Processing equipment and integrated production solutions.",
    image: "/products/food_tea.jpg",
    badge: "Thermal & Hygienic Processing",
    videoStatus: "Coming Soon",
    duration: "03:10",
    description: "Specialized processing machinery engineered for food, tea, and botanical processing. Solutions include continuous fluidized bed driers, precise thermal controls, automated sorting, and sanitary transport systems.",
    highlights: [
      "Continuous fluidized bed drying with automated thermal regulation",
      "Hygienic stainless steel (AISI 304 / 316) food-contact surfaces",
      "High-accuracy optical sorting & multi-tier grading",
      "Reduced fuel & energy consumption through heat recovery",
      "Compliant with international food hygiene and HACCP guidelines"
    ],
    applications: "Orthodox & CTC tea processing, spice dehydration, grain sorting, botanical processing",
    specs: [
      { label: "Material Grade", value: "AISI 304 / 316L Stainless Steel" },
      { label: "Thermal Control", value: "PID Closed-loop ±1.5°C tolerance" },
      { label: "Throughput", value: "250 kg/h to 2,000 kg/h scalable" },
      { label: "Sanitary Rating", value: "HACCP & CIP-cleanable" }
    ]
  },
  {
    id: "smart-agriculture-systems",
    category: "agri",
    title: "Smart agriculture systems",
    subtitle: "Cultivation, irrigation and environmental monitoring.",
    image: "/products/agriculture.jpg",
    badge: "AgriTech & Climate Control",
    videoStatus: "Coming Soon",
    duration: "02:15",
    description: "Commercial greenhouse climate automation and outdoor agricultural telemetry. Transforming farm management into precise, data-driven cultivation through automated multi-zone fertigation, wireless sensor nodes, and microclimate loops.",
    highlights: [
      "Automated multi-zone fertigation & nutrient dosing systems",
      "LoRaWAN long-range wireless soil and climate sensor nodes",
      "Automated curtain, ventilation & fogging climate loops",
      "Mobile telemetry alerts with pump protection logic",
      "Reliable solar-hybrid off-grid power architecture"
    ],
    applications: "Commercial greenhouses, hydroponics, tea & rubber plantations, precision nurseries",
    specs: [
      { label: "Wireless Protocol", value: "LoRaWAN 868/915 MHz & NB-IoT" },
      { label: "Dosing Accuracy", value: "EC ±0.05 mS/cm, pH ±0.1" },
      { label: "Sensors Monitored", value: "Soil Moisture, Temperature, Humidity, PAR Light" },
      { label: "Power System", value: "Solar-backed 24/7 battery operation" }
    ]
  },
  {
    id: "iot-digital-platforms",
    category: "digital",
    title: "IoT & digital platforms",
    subtitle: "Connected monitoring, dashboards and alerts.",
    image: "/products/iot.jpg",
    badge: "Industry 4.0 Telemetry",
    videoStatus: "Coming Soon",
    duration: "02:50",
    description: "Connecting factory machines with modern cloud software. The Sanota IoT suite monitors shop-floor machine telemetry in real-time and converts raw operational data into clear, actionable dashboards and automated alerts.",
    highlights: [
      "Real-time Overall Equipment Effectiveness (OEE) tracking",
      "Thermal, vibration, and motor current draw anomaly alerts",
      "Instant WhatsApp, SMS, and email incident escalation",
      "Secure industrial edge gateways with local buffering",
      "Open RESTful APIs for ERP & MES system integration"
    ],
    applications: "Multi-site manufacturing plants, utility facilities, cold chain logistics, remote stations",
    specs: [
      { label: "Edge Hardware", value: "Industrial ARM Cortex-A53 Linux Gateway" },
      { label: "Security", value: "TLS 1.3, Encrypted MQTT, Hardware TPM" },
      { label: "Refresh Rate", value: "Sub-second live streaming telemetry" },
      { label: "Data History", value: "Cloud historical analytics up to 5 years" }
    ]
  },
  {
    id: "material-handling-systems",
    category: "automation",
    title: "Material-handling systems",
    subtitle: "Conveyors and customized internal logistics solutions.",
    image: "/products/handling.jpg",
    badge: "Logistics & Transport",
    videoStatus: "Coming Soon",
    duration: "02:20",
    description: "Tailored industrial conveyors, powered roller lines, and automated transfer systems designed to streamline internal logistics and prevent material bottlenecks across production floors.",
    highlights: [
      "Heavy-duty modular plastic & stainless steel belt conveyors",
      "Smart accumulation roller conveyors with zero-pressure sensing",
      "Automated pneumatic divert gates and 90° transfer units",
      "Variable frequency drive (VFD) speed synchronization",
      "Compact footprint engineered for clean factory circulation"
    ],
    applications: "Carton packaging, warehouse sortation, food handling lines, production dispatch",
    specs: [
      { label: "Payload Capacity", value: "Up to 1,500 kg per meter" },
      { label: "Speed Range", value: "Variable 0.1 to 1.8 m/s" },
      { label: "Drive Units", value: "SEW-Eurodrive high-efficiency gearmotors" },
      { label: "Construction", value: "Structural anodized aluminum or stainless steel" }
    ]
  },
  {
    id: "energy-environmental-systems",
    category: "energy",
    title: "Energy & environmental systems",
    subtitle: "Engineering for energy and environmental applications.",
    image: "/products/retrofit.jpg",
    badge: "Energy & Sustainability",
    videoStatus: "Coming Soon",
    duration: "03:00",
    description: "Integrated engineering systems developed for energy efficiency, waste heat recovery, industrial water treatment, and environmental monitoring to help facilities meet sustainability goals and lower operating costs.",
    highlights: [
      "Industrial waste heat recovery and economizer systems",
      "Energy telemetry and power factor optimization",
      "Wastewater treatment automation and effluent monitoring",
      "Solar thermal integration for industrial pre-heating",
      "Compliance with European and global industrial green standards"
    ],
    applications: "Industrial boiler plants, textile mills, processing factories, commercial complexes",
    specs: [
      { label: "Efficiency Gain", value: "Typically 15% – 30% thermal/electrical saving" },
      { label: "Monitoring", value: "Continuous emissions & energy logging" },
      { label: "Certification", value: "ISO 50001 energy management compatible" },
      { label: "Lifecycle Support", value: "Annual maintenance & performance auditing" }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Solutions" },
  { id: "automation", name: "Industrial Automation" },
  { id: "processing", name: "Food & Tea Processing" },
  { id: "agri", name: "Smart Agriculture" },
  { id: "digital", name: "IoT & Digital" },
  { id: "energy", name: "Energy & Environmental" }
];
