export type AppState = "intro" | "user-form" | "result" | "resources";

export type ChangeAppProps = {
  setThing: (state: AppState) => void;
};
