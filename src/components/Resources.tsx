import links from "../data/links.json";

const MACROS = [
  {
    name: "Fats",
    kcal: 9,
    color: "var(--macro-fats)",
    description:
      "Needed for energy, cell growth, and organ protection. Supports hormone production and nutrient absorption.",
    sources: ["Fatty meats", "Seeds & nuts", "Avocados", "Fish", "Oils"],
  },
  {
    name: "Protein",
    kcal: 4,
    color: "var(--macro-protein)",
    description:
      "Builds and repairs tissues — the foundation of bones, muscles, cartilage, skin, and blood.",
    sources: ["Meats", "Dairy", "Fish", "Protein powder", "Beans"],
  },
  {
    name: "Carbs",
    kcal: 4,
    color: "var(--macro-carbs)",
    description:
      "Your body's main fuel — powers your brain, heart, muscles, and nervous system. Fiber keeps things moving.",
    sources: ["Veggies & fruit", "Grains & pasta", "Legumes"],
  },
];

const Resources = () => {
  return (
    <div>
      <h1 className="section-title">Learn the basics</h1>
      <p className="section-sub">Everything you need to know about flexible dieting.</p>

      {/* Macronutrients */}
      <section className="resource-section">
        <h2>The three macros</h2>
        <div className="macro-cards">
          {MACROS.map((m) => (
            <div key={m.name} className="card macro-card">
              <span className="legend-dot" style={{ background: m.color, width: 14, height: 14 }} />
              <div className="macro-head">
                <h3>{m.name}</h3>
                <span className="kcal-chip">{m.kcal} kcal/g</span>
              </div>
              <p>{m.description}</p>
              <ul>
                {m.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Calorie explainer */}
      <section className="resource-section">
        <h2>What's a calorie?</h2>
        <div className="card prose-card">
          <p>
            A calorie (kcal) is a unit of energy. Every cell in your body needs energy to function.
            Weight change comes down to one simple equation: calories in vs. calories out. Eat less
            than you burn and you lose weight; eat more and you gain it.
          </p>
        </div>
      </section>

      {/* IIFYM */}
      <section className="resource-section">
        <h2>Why flexible dieting? (IIFYM)</h2>
        <div className="card prose-card">
          <p>
            You can eat donuts and ice cream — as long as they fit inside your daily macro and
            calorie targets. That's the whole idea: no forbidden foods, just honest accounting.
          </p>
          <p>
            That said, don't live on junk food alone. Whole foods still matter for long-term health.
            Yes, you can lose weight eating McDonald's all day — but it isn't good for you.
          </p>
        </div>
      </section>

      {/* Links */}
      <section className="resource-section">
        <h2>Go deeper</h2>
        <div className="link-list">
          {links.map((link) => (
            <a key={link.url} className="link-item" href={link.url} target="_blank" rel="noopener noreferrer">
              {link.text}
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
