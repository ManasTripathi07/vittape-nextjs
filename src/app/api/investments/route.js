import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Investment from '@/lib/models/Investment';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const round = searchParams.get('round');
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit = Math.min(50, parseInt(searchParams.get('limit')) || 20);

    const filter = {};
    if (round) filter.round = round;

    const [data, total] = await Promise.all([
      Investment.find(filter).sort({ date: -1 }).skip((page - 1) * limit).limit(limit).populate('company', 'name sector ticker').lean(),
      Investment.countDocuments(filter),
    ]);

    return NextResponse.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { company, round, amount, valuation, leadInvestor, equity, date } = body;
    if (!company || !round || !amount) {
      return NextResponse.json({ error: 'company, round, and amount are required' }, { status: 400 });
    }
    const investment = await Investment.create({ company, round, amount, valuation, leadInvestor, equity, date });
    return NextResponse.json(investment, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
