import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/utils';

interface IHomeProps {
    title: string;
    description: string;
}

export default (req: NextApiRequest, res: NextApiResponse<IHomeProps>) => {
    axios.get(`${SERVER_BASE_URL}/api/homes`).then((result) => {
        const { title, description } = result.data || {};

        res.status(200).json({
            title,
            description,
        });
    });
};
