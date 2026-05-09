import 'dotenv/config';
import mongoose from 'mongoose';
import Company from './models/Company.js';
import IPO from './models/IPO.js';
import Investment from './models/Investment.js';
import Investor from './models/Investor.js';
import Trade from './models/Trade.js';

const companies = [
  { name: 'PayNova', ticker: 'PNOV', sector: 'Fintech', founded: 2019, valuation: 4200000000, stage: 'Pre-IPO', hq: 'Mumbai' },
  { name: 'MediSync', ticker: 'MSYN', sector: 'HealthTech', founded: 2020, valuation: 800000000, stage: 'Series B', hq: 'Bangalore' },
  { name: 'LearnLoop', ticker: 'LLOP', sector: 'EdTech', founded: 2018, valuation: 1500000000, stage: 'Series C', hq: 'Delhi' },
  { name: 'CloudVault', ticker: 'CVLT', sector: 'SaaS', founded: 2017, valuation: 6000000000, stage: 'Pre-IPO', hq: 'Hyderabad' },
  { name: 'GreenGrid', ticker: 'GRGD', sector: 'CleanTech', founded: 2021, valuation: 350000000, stage: 'Series A', hq: 'Pune' },
  { name: 'ShipFast', ticker: 'SHPF', sector: 'Logistics', founded: 2019, valuation: 2100000000, stage: 'Series C', hq: 'Gurgaon' },
  { name: 'NeuralEdge', ticker: 'NEDG', sector: 'AI/ML', founded: 2022, valuation: 500000000, stage: 'Series A', hq: 'Bangalore' },
  { name: 'QuickCart', ticker: 'QCRT', sector: 'E-Commerce', founded: 2016, valuation: 8500000000, stage: 'Public', hq: 'Mumbai' },
  { name: 'PixelForge', ticker: 'PXFG', sector: 'DeepTech', founded: 2021, valuation: 200000000, stage: 'Seed', hq: 'Chennai' },
  { name: 'FinStack', ticker: 'FSTK', sector: 'Fintech', founded: 2020, valuation: 1200000000, stage: 'Series B', hq: 'Bangalore' },
  { name: 'AgroSense', ticker: 'AGRS', sector: 'CleanTech', founded: 2020, valuation: 600000000, stage: 'Series A', hq: 'Indore' },
  { name: 'DataWeave', ticker: 'DTWV', sector: 'AI/ML', founded: 2018, valuation: 2800000000, stage: 'Series C', hq: 'Bangalore' },
  { name: 'RapidDoc', ticker: 'RDOC', sector: 'HealthTech', founded: 2019, valuation: 950000000, stage: 'Series B', hq: 'Mumbai' },
  { name: 'CodeCraft', ticker: 'CCFT', sector: 'SaaS', founded: 2021, valuation: 400000000, stage: 'Series A', hq: 'Pune' },
  { name: 'StyleSync', ticker: 'SSYN', sector: 'E-Commerce', founded: 2020, valuation: 1800000000, stage: 'Pre-IPO', hq: 'Delhi' },
  { name: 'VoltCharge', ticker: 'VCHG', sector: 'CleanTech', founded: 2022, valuation: 250000000, stage: 'Seed', hq: 'Chennai' },
  { name: 'TutorPrime', ticker: 'TPRM', sector: 'EdTech', founded: 2019, valuation: 700000000, stage: 'Series B', hq: 'Kota' },
  { name: 'CryptoNest', ticker: 'CNST', sector: 'Fintech', founded: 2021, valuation: 900000000, stage: 'Series A', hq: 'Mumbai' },
  { name: 'FleetEdge', ticker: 'FLED', sector: 'Logistics', founded: 2020, valuation: 1100000000, stage: 'Series B', hq: 'Gurgaon' },
  { name: 'BioGenix', ticker: 'BGNX', sector: 'DeepTech', founded: 2019, valuation: 3200000000, stage: 'Pre-IPO', hq: 'Hyderabad' },
];

const investors = [
  { name: 'Sequoia Capital India', type: 'VC', aum: 85000000000, focusSectors: ['Fintech','SaaS','AI/ML'], notableExits: ['Zomato','BYJUs'], totalInvested: 12000000000 },
  { name: 'a16z', type: 'VC', aum: 350000000000, focusSectors: ['AI/ML','SaaS','DeepTech'], notableExits: ['Coinbase','Airbnb'], totalInvested: 8500000000 },
  { name: 'Tiger Global', type: 'Hedge Fund', aum: 95000000000, focusSectors: ['E-Commerce','Fintech','SaaS'], notableExits: ['Flipkart','Ola'], totalInvested: 15000000000 },
  { name: 'SoftBank Vision', type: 'VC', aum: 1000000000000, focusSectors: ['Logistics','E-Commerce','AI/ML'], notableExits: ['Paytm','PolicyBazaar'], totalInvested: 25000000000 },
  { name: 'Accel', type: 'VC', aum: 30000000000, focusSectors: ['SaaS','Fintech','HealthTech'], notableExits: ['Swiggy','Freshworks'], totalInvested: 6000000000 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');

  await Promise.all([Company.deleteMany({}), IPO.deleteMany({}), Investment.deleteMany({}), Investor.deleteMany({}), Trade.deleteMany({})]);

  const savedCos = await Company.insertMany(companies);
  const savedInv = await Investor.insertMany(investors);
  console.log(`${savedCos.length} companies, ${savedInv.length} investors`);

  // IPOs
  const ipoCompanies = savedCos.filter(c => ['Pre-IPO','Public'].includes(c.stage));
  const ipoData = ipoCompanies.map((c, i) => ({
    company: c._id, exchange: i % 2 === 0 ? 'NSE' : 'BSE',
    priceRange: { low: 200 + i * 80, high: 320 + i * 80 }, lotSize: 50,
    openDate: new Date(2026, i, 10), closeDate: new Date(2026, i, 13), listingDate: new Date(2026, i, 18),
    status: c.stage === 'Public' ? 'Listed' : i < 2 ? 'Upcoming' : 'Open',
    fundsRaised: c.stage === 'Public' ? c.valuation * 0.1 : c.valuation * 0.05,
    gmpPercent: 8 + i * 5, subscriptionRate: 3 + i * 4.5,
  }));
  await IPO.insertMany(ipoData);
  console.log(`${ipoData.length} IPOs`);

  // Investments
  const rounds = ['Seed','Series A','Series B','Series C','Pre-IPO'];
  const invNames = savedInv.map(i => i.name);
  const investmentData = savedCos.flatMap((c, ci) =>
    rounds.slice(0, Math.min(rounds.length, (ci % 5) + 1)).map((round, ri) => ({
      company: c._id, round,
      amount: (ri + 1) * 20000000 + ci * 8000000,
      valuation: c.valuation * (0.15 + ri * 0.2),
      leadInvestor: invNames[(ci + ri) % invNames.length],
      equity: Math.round((5 + ri * 3) * 10) / 10,
      date: new Date(2023 + Math.floor(ri / 2), (ci + ri * 2) % 12, 10 + ri),
    }))
  );
  await Investment.insertMany(investmentData);
  console.log(`${investmentData.length} investments`);

  // Trades
  const types = ['BUY','SELL','BUY','BUY','SELL','SHORT','BUY','COVER'];
  const statuses = ['Executed','Executed','Executed','Pending','Executed','Executed','Partial','Executed'];
  const publicCos = savedCos.filter(c => c.ticker);
  const tradeData = [];
  for (let i = 0; i < 40; i++) {
    const co = publicCos[i % publicCos.length];
    tradeData.push({
      ticker: co.ticker, company: co._id,
      type: types[i % types.length],
      quantity: (Math.floor(Math.random() * 50) + 1) * 10,
      price: Math.round((100 + Math.random() * 900) * 100) / 100,
      exchange: i % 3 === 0 ? 'BSE' : 'NSE',
      status: statuses[i % statuses.length],
      notes: i % 5 === 0 ? 'Momentum play' : i % 3 === 0 ? 'Value pick' : null,
      executedAt: new Date(2026, Math.floor(i / 8), 1 + (i % 28)),
    });
  }
  await Trade.insertMany(tradeData);
  console.log(`${tradeData.length} trades`);

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
