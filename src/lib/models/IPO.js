import mongoose from 'mongoose';

const IPOSchema = new mongoose.Schema({
  company:          { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  exchange:         { type: String, enum: ['NSE','BSE','NASDAQ','NYSE'], default: 'NSE' },
  priceRange:       { low: Number, high: Number },
  lotSize:          { type: Number, default: 1 },
  openDate:         { type: Date },
  closeDate:        { type: Date },
  listingDate:      { type: Date },
  status:           { type: String, enum: ['Upcoming','Open','Closed','Listed','Withdrawn'], default: 'Upcoming' },
  fundsRaised:      { type: Number, default: 0 },
  gmpPercent:       { type: Number, default: 0 },
  subscriptionRate: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.IPO || mongoose.model('IPO', IPOSchema);
