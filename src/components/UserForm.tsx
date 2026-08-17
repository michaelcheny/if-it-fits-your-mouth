import { useState } from "react";
import type { ChangeAppProps } from "../interfaces/appstate.interface";
import type { User } from "../interfaces/user.interface";
import { calculateBmr, calculateTdee } from "../helpers/calculations";
type Gender = "male" | "female";

type FormInput = {
  activityLevel: number;
  age: number;
  feet: number;
  inches: number;
  weight: number;
};

type UserFormProps = ChangeAppProps & {
  setUser: (user: User | undefined) => void;
  user: User | undefined;
  gender: Gender;
  setGender: (gender: Gender) => void;
};

const ACTIVITY_OPTIONS = [
  { value: 1, label: "Sedentary", hint: "Little or no exercise" },
  { value: 2, label: "Light", hint: "Exercise 1–3 days/week" },
  { value: 3, label: "Moderate", hint: "Exercise 3–5 days/week" },
  { value: 4, label: "Active", hint: "Hard exercise 6–7 days/week" },
  { value: 5, label: "Very Active", hint: "Physical job or pro athlete" },
];
const UserForm = ({ user, setUser, setThing, gender, setGender }: UserFormProps) => {
  const [form, setForm] = useState<FormInput>({
    activityLevel: user?.activityLevel ?? 1,
    age: user?.age ?? 21,
    feet: user?.height.feet ?? 5,
    inches: user?.height.inches ?? 1,
    weight: user?.weight ?? 100,
  });

  const [errors, setErrors] = useState<Partial<Record<"age" | "weight", string>>>({});

  const update = <K extends keyof FormInput>(field: K, value: FormInput[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "age" || field === "weight") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<"age" | "weight", string>> = {};
    if (form.age < 18 || form.age > 75) next.age = "Age must be between 18 and 75.";
    if (form.weight < 50) next.weight = "Weight must be at least 50 lbs.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const results: User = {
      activityLevel: form.activityLevel,
      age: form.age,
      gender,
      weight: form.weight,
      height: { feet: form.feet, inches: form.inches },
      bmr: 0,
      tdee: 0,
      goal: user?.goal ?? 0,
      calGoal: 0,
    };
    results.bmr = calculateBmr(results);
    results.tdee = calculateTdee(form.activityLevel, results.bmr);
    results.calGoal = results.tdee;
    setThing("result");
    setUser(results);
  };

  return (
    <div className="page">
      <h1 className="section-title">Your stats</h1>
      <p className="section-sub">We use these to estimate your daily calorie burn.</p>

      <form className="card form-card" onSubmit={onSubmit}>
        {/* GENDER */}
        <div className="field">
          <span className="field-label">Sex</span>
          <div className="segmented" role="radiogroup" aria-label="Sex">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={gender === g}
                className={gender === g ? "selected" : ""}
                onClick={() => setGender(g)}
              >
                {g === "male" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>

        <div className="field-row">
          {/* AGE */}
          <div className="field">
            <label className="field-label" htmlFor="age-input">Age</label>
            <div className="input-wrap">
              <input
                id="age-input"
                className="text-input"
                type="number"
                min={18}
                max={75}
                value={form.age}
                onChange={(e) => update("age", Number(e.target.value))}
              />
              <span className="input-suffix">yrs</span>
            </div>
            {errors.age && <p className="field-error">{errors.age}</p>}
          </div>

          {/* WEIGHT */}
          <div className="field">
            <label className="field-label" htmlFor="weight-input">Weight</label>
            <div className="input-wrap">
              <input
                id="weight-input"
                className="text-input"
                type="number"
                min={50}
                value={form.weight}
                onChange={(e) => update("weight", Number(e.target.value))}
              />
              <span className="input-suffix">lbs</span>
            </div>
            {errors.weight && <p className="field-error">{errors.weight}</p>}
          </div>
        </div>

        {/* HEIGHT */}
        <div className="field">
          <span className="field-label">Height</span>
          <div className="field-row">
            <select
              className="select-input"
              aria-label="Height in feet"
              value={form.feet}
              onChange={(e) => update("feet", Number(e.target.value))}
            >
              {[4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>{n} ft</option>
              ))}
            </select>
            <select
              className="select-input"
              aria-label="Height in inches"
              value={form.inches}
              onChange={(e) => update("inches", Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>{n} in</option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="field">
          <span className="field-label">Activity level</span>
          <div className="segmented" role="radiogroup" aria-label="Activity level">
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={form.activityLevel === opt.value}
                className={form.activityLevel === opt.value ? "selected" : ""}
                title={opt.hint}
                onClick={() => update("activityLevel", opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary form-submit" type="submit">
          Calculate my macros
        </button>
      </form>
    </div>
  );
};

export default UserForm;
