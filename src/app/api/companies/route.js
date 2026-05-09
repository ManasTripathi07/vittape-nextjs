import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Company from '@/lib/models/Company';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit = Math.min(50, parseInt(searchParams.get('limit')) || 20);
    const sector = searchParams.get('sector');
    const stage = searchParams.get('stage');

    const filter = {};
    if (sector) filter.sector = sector;
    if (stage) filter.stage = stage;

    const [data, total] = await Promise.all([
      Company.find(filter).sort({ valuation: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Company.countDocuments(filter),
    ]);

    return NextResponse.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
