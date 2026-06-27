export const bases = [
  "password", "Password", "PASSWORD", "qwerty", "123456", "abc123",
  "letmein", "welcome", "monkey", "dragon", "master", "login",
  "admin", "root", "guest", "changeme", "default",
];

export const suffixes = [
  "", "1", "12", "123", "1234", "!", "!!", "1!", "2024", "2025", "2026",
  "@", "#", "!!", "!!!", "01", "99", "00",
];

export const personalBits = [
  "mydog", "mycat", "mybirthday", "myname", "favouriteband",
  "football", "summer", "winter", "january", "march",
  "iloveyou", "trustno1", "sunshine", "princess", "shadow",
];

export const terriblePatterns = [
  "{base}{suffix}",
  "{base}{year}",
  "{personal}{suffix}",
  "{personal}{year}",
  "{base}_{personal}",
  "{personal}!",
  "{base}{base}",
  "CompanyName{year}!",
  "Welcome{suffix}",
  "Temp{suffix}",
];

export const securityRatings = [
  "Cracked in 0.003 seconds",
  "Your cat could guess this",
  "Appears in 4.2 million breached databases",
  "NIST recommends against this with extreme prejudice",
  "Would not survive a sticky note attack",
  "Technically has a special character. Technically.",
];
