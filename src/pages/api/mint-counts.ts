import type {NextApiRequest, NextApiResponse} from "next";
import {getTokensByCountries} from "@/database/token";

type Data = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      const result = await getTokensByCountries();


    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error', message: '' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}