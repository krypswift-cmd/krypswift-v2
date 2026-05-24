// Atmospheric content. Strings render in the particle field at low opacity.
// Do not modify these values.
export const ambientContent = {
  act1: ["ҨϞ𐓂ѪӜԘϞ"],
  act2: ["ᛚϞϞ𐓂ϿӜҨ"],
  act3: ["𐓂ѮѪӁϞҨ"],
  act4: ["Ԙ𐓂ѪϞѪӁ"],
  act5: ["ϿꝊӁ𐓂Ѫ𐓂"],
} as const;

export type AmbientAct = keyof typeof ambientContent;