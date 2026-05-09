import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
  company:      { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  round:        { type: String, enum: ['Seed','Series A','Series B','Series C','Series D','Pre-IPO','Bridge'], required: true },
  amount:       { type: Number, required: true },
  valuation:    { type: Number },
  leadInvestor: { type: String },
  equity:       { type: Number },
  date:         { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);
