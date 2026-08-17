import { useState } from "react";
import type { ChangeAppProps } from "../interfaces/appstate.interface";
import type { User } from "../interfaces/user.interface";
import { calculateRecommendedCals, calculateMacros } from "../helpers/calculations";
import { saveUser } from "../helpers/userStorage";

type ResultProps = ChangeAppProps & {
  user: User;
  setUser: (user: User | undefined) => void;
};

const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const Results = ({ user, setUser }: ResultProps) => {
  const [goal, setGoal] = useState<number>(user.goal ?? 0);

  const tdee = user.tdee ?? 0;
  const calGoal = user.calGoal ?? calculateRecommendedCals(tdee, goal);
  const macros = calculateMacros(calGoal, user.weight, goal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = Number(e.target.value);
    setGoal(newGoal);
    const updated: User = {
      ...user,
      goal: newGoal,
      calGoal: calculateRecommendedCals(tdee, newGoal),
    };
    setUser(updated);
    saveUser(updated);
  };

  // Donut segments (calorie share)
  const proteinKcal = macros.protein * 4;
  const carbsKcal = macros.carbs * 4;
  const fatsKcal = macros.fats * 9;
  const totalKcal = Math.max(proteinKcal + carbsKcal + fatsKcal, 1);

  const segments = [
    { key: "protein", value: proteinKcal, color: "var(--macro-protein)" },
    { key: "carbs", value: carbsKcal, color: "var(--macro-carbs)" },
    { key: "fats", value: fatsKcal, color: "var(--macro-fats)" },
  ];

  let offset = 0;
  const arcs = segments.map((seg) => {
    const length = (seg.value / totalKcal) * RING_CIRCUMFERENCE;
    const arc = { ...seg, dash: `${length} ${RING_CIRCUMFERENCE - length}`, offset: -offset };
    offset += length;
    return arc;
  });

  const goalLabel =
    goal === 0 ? "Maintain weight" : goal < 0 ? `Lose ${Math.abs(goal)} lb / week` : `Gain ${goal} lb / week`;

  return (
    <div>
      <h1 className="section-title">Your daily targets</h1>
      <p className="section-sub">
        {user.gender === "male" ? "Male" : "Female"} · {user.age} yrs ·{" "}
        {user.height.feet}'{user.height.inches}" · {user.weight} lbs
      </p>

      <div className="results-grid">
        {/* Goal + calories */}
        <div className="card goal-card">
          <span className="card-label">Goal</span>
          <div className="goal-value-row">
            <span className="big-num">{calGoal.toLocaleString()}</span>
            <span className="goal-unit">kcal / day</span>
          </div>
          <input
            type="range"
            className="slider"
            min={-2}
            max={2}
            step={0.5}
            value={goal}
            onChange={handleChange}
            aria-label="Weekly weight change goal in pounds"
          />
          <div className="slider-scale">
            <span className="lose">−2 lb</span>
            <span>{goalLabel}</span>
            <span className="gain">+2 lb</span>
          </div>
        </div>

        {/* Macro donut */}
        <div className="card macro-card">
          <span className="card-label">Macros per day</span>
          <div className="donut-wrap">
            <div className="donut-center">
              <svg className="donut" viewBox="0 0 132 132">
                {arcs.map((arc) => (
                  <circle
                    key={arc.key}
                    className="donut-seg"
                    cx="66"
                    cy="66"
                    r={RING_RADIUS}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="15"
                    strokeDasharray={arc.dash}
                    strokeDashoffset={arc.offset}
                  />
                ))}
              </svg>
              <div className="donut-center-label">
                <div>
                  <strong>{calGoal.toLocaleString()}</strong>
                  kcal
                </div>
              </div>
            </div>
            <div className="macro-legend">
              {[
                { name: "Protein", grams: macros.protein, kcal: proteinKcal, color: "var(--macro-protein)" },
                { name: "Carbs", grams: macros.carbs, kcal: carbsKcal, color: "var(--macro-carbs)" },
                { name: "Fats", grams: macros.fats, kcal: fatsKcal, color: "var(--macro-fats)" },
              ].map((m) => (
                <div key={m.name} className="legend-row">
                  <span className="legend-dot" style={{ background: m.color }} />
                  <span>{m.name}</span>
                  <span>
                    <span className="grams">{m.grams} g</span>{" "}
                    <span className="kcal">· {Math.round(m.kcal)} kcal</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BMR / TDEE stats */}
      <div className="stats-row">
        <div className="card stat-card">
          <span className="card-label">BMR</span>
          <div className="stat-value">{(user.bmr ?? 0).toLocaleString()}</div>
          <div className="stat-unit">kcal at rest (Mifflin-St Jeor)</div>
        </div>
        <div className="card stat-card">
          <span className="card-label">TDEE</span>
          <div className="stat-value">{tdee.toLocaleString()}</div>
          <div className="stat-unit">kcal burned daily at your activity</div>
        </div>
        <div className="card stat-card">
          <span className="card-label">Adjustment</span>
          <div className="stat-value">
            {goal === 0 ? "±0" : goal > 0 ? `+${Math.round((calGoal - tdee) / 100) / 10}k` : `${Math.round((calGoal - tdee) / 100) / 10}k`}
          </div>
          <div className="stat-unit">vs. maintenance</div>
        </div>
      </div>

      <p className="results-note">
        Formula: protein 0.8–1.2 g per lb of body weight, fat 0.3–0.6 g per lb, carbs fill the
        remaining calories. On aggressive cuts we drop protein slightly to keep carbs above 35 g.
      </p>
    </div>
  );
};

export default Results;
