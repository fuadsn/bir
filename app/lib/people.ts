export type Person = { name: string; photo: string };

/**
 * Photos live in /public/people, exported as 720×900 portraits. Bump PHOTO_REV
 * whenever they are re-cropped so browsers don't serve the old crop from cache.
 */
const PHOTO_REV = 2;
const photo = (slug: string) => `/people/${slug}.jpg?v=${PHOTO_REV}`;

export const mentors: Person[] = [
  { name: "Salman Faris", photo: photo("salman-faris") },
  { name: "Siddharth Shivkumar", photo: photo("siddharth-shivkumar") },
  { name: "Saheen Palayi", photo: photo("saheen-palayi") },
  { name: "Devadath S", photo: photo("devadath-s") },
  { name: "Kurian Jacob", photo: photo("kurian-jacob") },
  { name: "Akash", photo: photo("akash") },
];

export const builders: Person[] = [
  { name: "Adriel Jacob", photo: photo("adriel-jacob") },
  { name: "Alen Thomas K", photo: photo("alen-thomas-k") },
  { name: "Amrutha M", photo: photo("amrutha-m") },
  { name: "Aswin", photo: photo("aswin") },
  { name: "Jayasurya Jayakumar", photo: photo("jayasurya-jayakumar") },
  { name: "Jinu Rose Mathew", photo: photo("jinu-rose-mathew") },
  { name: "Lakshmi S Madhav", photo: photo("lakshmi-s-madhav") },
  { name: "Loyd Augustine", photo: photo("loyd-augustine") },
  { name: "Mishal Shanavas", photo: photo("mishal-shanavas") },
  { name: "Nihaal Yoosuf", photo: photo("nihaal-yoosuf") },
  { name: "Nikhil S", photo: photo("nikhil-s") },
  { name: "Niveditaa Sunu", photo: photo("niveditaa-sunu") },
  { name: "Riz Mariya Davis", photo: photo("riz-mariya-davis") },
  { name: "S Agnivesh", photo: photo("s-agnivesh") },
  { name: "Shamil Muneer", photo: photo("shamil-muneer") },
  { name: "Vaishnav Prabhath", photo: photo("vaishnav-prabhath") },
  { name: "Vishakh V", photo: photo("vishakh-v") },
];

export const media: Person[] = [
  { name: "Alina Pinheiro", photo: photo("alina-pinheiro") },
  { name: "Cyril Luke Anish", photo: photo("cyril-luke-anish") },
];
