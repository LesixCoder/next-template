import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/utils';
import { IArticleProps } from '../article/[articleId]';

export default (req: NextApiRequest, res: NextApiResponse<IArticleProps>) => {
    const { articleId } = req.query;
    axios.get(`${SERVER_BASE_URL}/api/article-infos/${articleId}`).then((result) => {
        const data = result.data || {};
        res.status(200).json(data);
    });
};
