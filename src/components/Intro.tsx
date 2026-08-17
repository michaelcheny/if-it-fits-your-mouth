import type { ChangeAppProps } from "../interfaces/appstate.interface";

const FACTS = [
  {
    label: "BMR",
    text: "Calories your body burns at complete rest, estimated with the Mifflin-St Jeor equation.",
  },
  {
    label: "TDEE",
    text: "Your daily burn including activity — the baseline for holding your weight steady.",
  },
  {
    label: "IIFYM",
    text: "If it fits your macros, you can eat it. Donuts included, as long as they count.",
  },
];

const Intro = ({ setThing }: ChangeAppProps) => {
  return (
    <div className="intro">
      <div className="intro-donut" onClick={() => setThing("user-form")} role="button" aria-label="Get started">
        🍩
      </div>
      <h1>
        Eat what you want.
        <br />
        <em>If it fits your mouth.</em>
      </h1>
      <p className="lede">
        A macronutrient calculator for flexible dieting. Tell us about yourself, pick a goal, and
        get daily calorie and macro targets in seconds.
      </p>
      <div className="cta">
        <button className="btn-primary" onClick={() => setThing("user-form")}>
          Get my macros
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="intro-facts">
        {FACTS.map((fact) => (
          <div key={fact.label} className="card fact">
            <div className="fact-label">{fact.label}</div>
            <p>{fact.text}</p>
          </div>
        ))}
      </div>

      <p className="intro-disclaimer">
        Calorie intake should not fall below 1,200 a day for women or 1,500 a day for men, except
        under the supervision of a health professional. It is recommended to exercise more instead
        of eating less.
      </p>
    </div>
  );
};

export default Intro;
