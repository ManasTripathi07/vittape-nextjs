import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Company from '@/lib/models/Company';
import IPO from '@/lib/models/IPO';
import Investment from '@/lib/models/Investment';
import Investor from '@/lib/models/Investor';
import Trade from '@/lib/models/Trade';

export async function GET() {
  try {
    await dbConnect();

    const [totalCompanies, totalIPOs, totalInvestments, totalTrades] = await Promise.all([
      Company.countDocuments(),
      IPO.countDocuments(),
      Investment.countDocuments(),
      Trade.countDocuments(),
    ]);

    const [totalFundsRaised, totalTradeVolume] = await Promise.all([
      IPO.aggregate([{ $group: { _id: null, total: { $sum: '$fundsRaised' } } }]),
      Trade.aggregate([{ $match: { status: 'Executed' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
    ]);

    const sectorBreakdown = await Company.aggregate([
      { $group: { _id: '$sector', count: { $sum: 1 }, totalVal: { $sum: '$valuation' } } },
      { $sort: { totalVal: -1 } },
    ]);

    const monthlyIPOTrends = await IPO.aggregate([
      { $group: { _id: { $month: '$openDate' }, count: { $sum: 1 }, funds: { $sum: '$fundsRaised' } } },
      { $sort: { '_id': 1 } },
    ]);

    const topInvestors = await Investment.aggregate([
      { $group: { _id: '$leadInvestor', totalAmount: { $sum: '$amount' }, deals: { $sum: 1 } } },
      { $sort: { totalAmount: -1 } },
      { $limit: 5 },
    ]);

    const recentDeals = await Investment.find()
      .sort({ date: -1 }).limit(8).populate('company', 'name sector ticker').lean();

    const recentTrades = await Trade.find()
      .sort({ executedAt: -1 }).limit(10).populate('company', 'name ticker').lean();

    const investmentByRound = await Investment.aggregate([
      { $group: { _id: '$round', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);

    const tradesByType = await Trade.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 }, volume: { $sum: '$total' } } },
    ]);

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return NextResponse.json({
      cards: {
        totalCompanies,
        totalIPOs,
        totalFundsRaised: totalFundsRaised[0]?.total || 0,
        totalTradeVolume: totalTradeVolume[0]?.total || 0,
        totalInvestments,
        totalTrades,
      },
      sectorBreakdown: sectorBreakdown.map(s => ({ sector: s._id, count: s.count, valuation: s.totalVal })),
      monthlyIPOTrends: monthlyIPOTrends.map(m => ({ month: months[m._id - 1] || m._id, count: m.count, funds: m.funds })),
      topInvestors: topInvestors.map(i => ({ name: i._id, totalAmount: i.totalAmount, deals: i.deals })),
      recentDeals: recentDeals.map(d => ({
        company: d.company?.name, sector: d.company?.sector, ticker: d.company?.ticker,
        round: d.round, amount: d.amount, leadInvestor: d.leadInvestor, date: d.date,
      })),
      recentTrades: recentTrades.map(t => ({
        ticker: t.ticker, company: t.company?.name, type: t.type,
        quantity: t.quantity, price: t.price, total: t.total, status: t.status, executedAt: t.executedAt,
      })),
      investmentByRound,
      tradesByType,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
