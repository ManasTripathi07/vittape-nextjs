import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema({
  ticker:    { type: String, required: true },
  company:   { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  type:      { type: String, enum: ['BUY','SELL','SHORT','COVER'], required: true },
  quantity:  { type: Number, required: true },
  price:     { type: Number, required: true },
  total:     { type: Number },
  exchange:  { type: String, enum: ['NSE','BSE','NASDAQ','NYSE'], default: 'NSE' },
  status:    { type: String, enum: ['Pending','Executed','Cancelled','Partial'], default: 'Pending' },
  notes:     { type: String },
  executedAt:{ type: Date, default: Date.now },
}, { timestamps: true });

TradeSchema.pre('save', function(next) {
  this.total = this.quantity * this.price;
  next();
});

export default mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
