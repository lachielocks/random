export interface TranslationPair {
  british: string;
  american: string;
  note?: string;
}

export const pairs: TranslationPair[] = [
  { british: "queue", american: "line", note: "We will wait in an orderly queue. You will wait in a line. Same misery." },
  { british: "lift", american: "elevator" },
  { british: "rubbish", american: "trash" },
  { british: "biscuit", american: "cookie", note: "NOT a scone. This matters." },
  { british: "crisps", american: "chips" },
  { british: "chips", american: "fries", note: "Yes, chips are fries. Crisps are chips. Good luck." },
  { british: "boot", american: "trunk" },
  { british: "bonnet", american: "hood" },
  { british: "flat", american: "apartment" },
  { british: "holiday", american: "vacation" },
  { british: "torch", american: "flashlight" },
  { british: "petrol", american: "gas" },
  { british: "chemist", american: "pharmacy" },
  { british: "loo", american: "bathroom", note: "Or restroom. Or 'the facilities' if you're in a meeting." },
  { british: "brilliant", american: "awesome", note: "Can also mean 'actually brilliant' in the UK. Context required." },
  { british: "quite good", american: "pretty good", note: "In British: mediocre. In American: genuinely good. Diplomatic incident." },
  { british: "I'll bear it in mind", american: "I will forget this immediately" },
  { british: "with the greatest respect", american: "you are completely wrong" },
  { british: "that's interesting", american: "that's terrible" },
  { british: "a bit of a situation", american: "an unmitigated disaster" },
  { british: "pop round", american: "come by unannounced and ruin my afternoon" },
];

export const nonsenseBritish = [
  "Bob's your uncle", "taking the mickey", "chuffed to bits", "gobsmacked",
  "knackered", "minging", "dodgy", "sorted", "cheers (means thanks OR goodbye OR hi)",
];

export const nonsenseAmerican = [
  "shoot the breeze", "Monday morning quarterback", "ballpark figure",
  "table stakes", "move the needle", "circle back", "reach out",
  "touch base", "deep dive", "ping me",
];
