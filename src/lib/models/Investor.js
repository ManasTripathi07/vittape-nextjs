import mongoose from 'mongoose';

const InvestorSchema = new mongoose.Schema({
  name:          { type: String, required: true, unique: true },
  type:          { type: String, enum: ['VC','PE','Angel','CVC','Hedge Fund','Sovereign'], required: true },
  aum:           { type: Number, default: 0 },
  focusSectors:  [String],
  notableExits:  [String],
  totalInvested: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Investor || mongoose.model('Investor', InvestorSchema);
