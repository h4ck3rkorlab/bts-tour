export interface Show {
  date: string;
  city: string;
  venue: string;
  address: string;
  day: string;
  standard: number;
  vip: number;
  soldOut: boolean;
  standardSeats: number;
  vipSeats: number;
}

export interface Country {
  name: string;
  flag: string;
  shows: Show[];
}

export interface Region {
  name: string;
  emoji: string;
  countries: Country[];
}

// Helper to generate random VIP seats between 30-40
function rv(): number {
  return Math.floor(Math.random() * 11) + 30;
}

export const tourData: Region[] = [
  {
    name: "ASIA-PACIFIC",
    emoji: "🌏",
    countries: [
      {
        name: "SOUTH KOREA",
        flag: "🇰🇷",
        shows: [
          { date: "04.09", city: "Goyang", venue: "Goyang Stadium", address: "1601 Jungang-ro, Goyang", day: "Thursday", standard: 650, vip: 1500, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.11", city: "Goyang", venue: "Goyang Stadium", address: "1601 Jungang-ro, Goyang", day: "Saturday", standard: 800, vip: 1800, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.12", city: "Goyang", venue: "Goyang Stadium", address: "1601 Jungang-ro, Goyang", day: "Sunday", standard: 850, vip: 1900, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "06.12", city: "Busan", venue: "Busan Asiad Stadium", address: "344 World Cup-daero, Busan", day: "Friday", standard: 600, vip: 1400, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "06.13", city: "Busan", venue: "Busan Asiad Stadium", address: "344 World Cup-daero, Busan", day: "Saturday", standard: 750, vip: 1700, soldOut: true, standardSeats: 0, vipSeats: 0 },
        ],
      },
      {
        name: "JAPAN",
        flag: "🇯🇵",
        shows: [
          { date: "04.17", city: "Tokyo", venue: "Tokyo Dome", address: "1-3-61 Koraku, Tokyo", day: "Friday", standard: 950, vip: 2400, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.18", city: "Tokyo", venue: "Tokyo Dome", address: "1-3-61 Koraku, Tokyo", day: "Saturday", standard: 1000, vip: 2500, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.19", city: "Tokyo", venue: "Tokyo Dome", address: "1-3-61 Koraku, Tokyo", day: "Sunday", standard: 1100, vip: 2700, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.21", city: "Osaka", venue: "Kyocera Dome", address: "3-2-1 Chiyozaki, Osaka", day: "Tuesday", standard: 750, vip: 1800, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.22", city: "Osaka", venue: "Kyocera Dome", address: "3-2-1 Chiyozaki, Osaka", day: "Wednesday", standard: 750, vip: 1800, soldOut: true, standardSeats: 0, vipSeats: 0 },
          { date: "04.24", city: "Nagoya", venue: "Vantelin Dome", address: "1-1-1 Nagoya", day: "Friday", standard: 700, vip: 1600, soldOut: true, standardSeats: 0, vipSeats: 0 },
        ],
      },
      {
        name: "THAILAND",
        flag: "🇹🇭",
        shows: [
          { date: "12.03", city: "Bangkok", venue: "Rajamangala Stadium", address: "Hua Mak, Bang Kapi, Bangkok", day: "Thursday", standard: 550, vip: 1600, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "12.04", city: "Bangkok", venue: "Rajamangala Stadium", address: "Hua Mak, Bang Kapi, Bangkok", day: "Friday", standard: 700, vip: 2000, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "12.06", city: "Bangkok", venue: "Rajamangala Stadium", address: "Hua Mak, Bang Kapi, Bangkok", day: "Sunday", standard: 750, vip: 2200, soldOut: false, standardSeats: 0, vipSeats: rv() },
        ],
      },
    ],
  },
  {
    name: "NORTH AMERICA",
    emoji: "🌎",
    countries: [
      {
        name: "UNITED STATES",
        flag: "🇺🇸",
        shows: [
          { date: "04.25", city: "Tampa", venue: "Raymond James Stadium", address: "4201 N Dale Mabry Hwy, Tampa", day: "Saturday", standard: 900, vip: 2800, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "04.26", city: "Tampa", venue: "Raymond James Stadium", address: "4201 N Dale Mabry Hwy, Tampa", day: "Sunday", standard: 950, vip: 3000, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "04.28", city: "Tampa", venue: "Raymond James Stadium", address: "4201 N Dale Mabry Hwy, Tampa", day: "Tuesday", standard: 800, vip: 2500, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "05.23", city: "Las Vegas", venue: "Allegiant Stadium", address: "3333 Al Davis Way, Las Vegas", day: "Saturday", standard: 1300, vip: 3800, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "05.25", city: "Las Vegas", venue: "Allegiant Stadium", address: "3333 Al Davis Way, Las Vegas", day: "Monday", standard: 1100, vip: 3200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "05.27", city: "Las Vegas", venue: "Allegiant Stadium", address: "3333 Al Davis Way, Las Vegas", day: "Wednesday", standard: 1100, vip: 3200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "05.28", city: "Las Vegas", venue: "Allegiant Stadium", address: "3333 Al Davis Way, Las Vegas", day: "Thursday", standard: 1150, vip: 3300, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "08.01", city: "New Jersey", venue: "MetLife Stadium", address: "1 MetLife Stadium Dr, NJ", day: "Saturday", standard: 1100, vip: 3200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "08.27", city: "Chicago", venue: "Soldier Field", address: "1410 S. Museum Campus Dr", day: "Thursday", standard: 900, vip: 2600, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "09.01", city: "Los Angeles", venue: "SoFi Stadium", address: "1001 Stadium Dr, Inglewood", day: "Tuesday", standard: 1200, vip: 3500, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "09.03", city: "Los Angeles", venue: "SoFi Stadium", address: "1001 Stadium Dr, Inglewood", day: "Thursday", standard: 1200, vip: 3500, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "09.05", city: "Los Angeles", venue: "SoFi Stadium", address: "1001 Stadium Dr, Inglewood", day: "Saturday", standard: 1500, vip: 4500, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "09.06", city: "Los Angeles", venue: "SoFi Stadium", address: "1001 Stadium Dr, Inglewood", day: "Sunday", standard: 1600, vip: 4800, soldOut: false, standardSeats: 0, vipSeats: rv() },
        ],
      },
      {
        name: "MEXICO & CANADA",
        flag: "🇲🇽 🇨🇦",
        shows: [
          { date: "05.07", city: "Mexico City", venue: "Estadio GNP Seguros", address: "Viad. Río de la Piedad S/N", day: "Thursday", standard: 650, vip: 1800, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "05.09", city: "Mexico City", venue: "Estadio GNP Seguros", address: "Viad. Río de la Piedad S/N", day: "Saturday", standard: 800, vip: 2200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "08.22", city: "Toronto", venue: "Rogers Centre", address: "1 Blue Jays Way, Toronto", day: "Saturday", standard: 750, vip: 2200, soldOut: false, standardSeats: 0, vipSeats: rv() },
        ],
      },
    ],
  },
  {
    name: "EUROPE",
    emoji: "🌍",
    countries: [
      {
        name: "UNITED KINGDOM & FRANCE",
        flag: "🇬🇧 🇫🇷",
        shows: [
          { date: "07.06", city: "London", venue: "Tottenham Stadium", address: "782 High Rd, London", day: "Monday", standard: 1300, vip: 4000, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "07.07", city: "London", venue: "Tottenham Stadium", address: "782 High Rd, London", day: "Tuesday", standard: 1350, vip: 4200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "07.17", city: "Paris", venue: "Stade de France", address: "93200 Saint-Denis, Paris", day: "Friday", standard: 1100, vip: 3200, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "07.18", city: "Paris", venue: "Stade de France", address: "93200 Saint-Denis, Paris", day: "Saturday", standard: 1300, vip: 3800, soldOut: false, standardSeats: 0, vipSeats: rv() },
        ],
      },
    ],
  },
  {
    name: "LATIN AMERICA",
    emoji: "🌎",
    countries: [
      {
        name: "BRAZIL & ARGENTINA",
        flag: "🇧🇷 🇦🇷",
        shows: [
          { date: "10.23", city: "Buenos Aires", venue: "Estadio Monumental", address: "Av. Pres. Figueroa Alcorta", day: "Friday", standard: 600, vip: 1800, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "10.28", city: "São Paulo", venue: "Allianz Parque", address: "Av. Francisco Matarazzo", day: "Wednesday", standard: 700, vip: 2000, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "10.30", city: "São Paulo", venue: "Allianz Parque", address: "Av. Francisco Matarazzo", day: "Friday", standard: 900, vip: 2400, soldOut: false, standardSeats: 0, vipSeats: rv() },
          { date: "10.31", city: "São Paulo", venue: "Allianz Parque", address: "Av. Francisco Matarazzo", day: "Saturday", standard: 950, vip: 2600, soldOut: false, standardSeats: 0, vipSeats: rv() },
        ],
      },
    ],
  },
];
