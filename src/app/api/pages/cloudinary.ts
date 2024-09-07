
// pages/api/cloudinary.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const handlercloud = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { file, upload_preset } = req.body;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', upload_preset);

            const response = await fetch('https://api.cloudinary.com/v1_1/dcozis1lq/image/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                res.status(200).json({ url: data.secure_url });
            } else {
                res.status(response.status).json({ error: data });
            }
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handlercloud;
