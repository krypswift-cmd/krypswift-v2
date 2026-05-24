// User-populated atmospheric content. Strings render in the particle
// field at low opacity. Do not modify these values.
export type AmbientAct = 'act1' | 'act2' | 'act3' | 'act4' | 'act5';

export const ambientContent: Record<AmbientAct, string[]> = {
  act1: [],
  act2: [],
  act3: [],
  act4: [],
  act5: [],
};
