import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name:      { type: String, required: true, unique: true },
  ticker:    { type: String, default: null },
  sector:    { type: String, enum: ['Fintech','SaaS','HealthTech','EdTech','E-Commerce','CleanTech','AI/ML','Logistics','Consumer','DeepTech'], required: true },
  founded:   { type: Number },
  valuation: { type: Number, default: 0 },
  stage:     { type: String, enum: ['Seed','Series A','Series B','Series C','Pre-IPO','Public'], default: 'Seed' },
  hq:        { type: String, default: 'India' },
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
