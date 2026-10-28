import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    full_name,
    phone,
    email,
    service,
    purpose,
    arrival_timeline,
    current_location,
    budget_ready,
    notes,
  } = req.body || {};

  if (!full_name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    await pool.query(
      `insert into submissions
         (full_name, phone, email, service, purpose,
          arrival_timeline, current_location, budget_ready, notes)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        full_name,
        phone,
        email             || null,
        service           || null,
        purpose           || null,
        arrival_timeline  || null,
        current_location  || null,
        budget_ready      || null,
        notes             || null,
      ]
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('submit.js insert failed:', err);
    return res.status(500).json({ error: 'Could not save submission' });
  }
}
