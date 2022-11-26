import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/utils';

export interface IArticleIntro {
    label: string;
    info: string;
    articleId: number;
}

interface IArticleIntroProps {
    list: Array<{ label: string; info: string; articleId: number }>;
    total: number;
}

export default (req: NextApiRequest, res: NextApiResponse<IArticleIntroProps>) => {
    const { pageNo, pageSize } = req.body;
    axios
        .get(`${SERVER_BASE_URL}/api/article-introductions`, {
            params: {
                pageNo,
                pageSize,
            },
        })
        .then((result) => {
            const { data, meta } = result.data || {};

            res.status(200).json({
                list: Object.values(data),
                total: meta.pagination.total,
            });
        });
};
