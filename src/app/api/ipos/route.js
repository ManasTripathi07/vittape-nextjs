import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import IPO from '@/lib/models/IPO';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit = Math.min(50, parseInt(searchParams.get('limit')) || 20);

    const filter = {};
    if (status) filter.status = status;

    const [data, total] = await Promise.all([
      IPO.find(filter).sort({ openDate: -1 }).skip((page - 1) * limit).limit(limit).populate('company', 'name sector ticker').lean(),
      IPO.countDocuments(filter),
    ]);

    return NextResponse.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
