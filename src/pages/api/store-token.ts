import type { NextApiRequest, NextApiResponse } from 'next';
import {insertToken, Token} from "@/database/token";

type Data = {
  message: string;
  id?: number;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { hash, token_id, country, address }: Token = req.body;

    // Validate the input
    if (!hash || !token_id || !country || !address) {
      return res.status(400).json({ error: 'Missing required fields', message: '' });
    }

    try {
      const result = await insertToken({ hash, token_id, country, address });

      res.status(200).json({ message: 'Data stored successfully', id: (result as any).insertId });
    } catch (error) {
      console.error('Store token error:', error);
      res.status(500).json({ error: 'Store token error', message: '' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}