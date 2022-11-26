import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import axios from 'axios';
import { ILayoutProps } from '../../components/layout';
import { SERVER_BASE_URL } from '@/utils';
import { isEmpty } from 'lodash';

export default nextConnect().get((req: NextApiRequest, res: NextApiResponse<ILayoutProps>) => {
    axios.get(`${SERVER_BASE_URL}/api/layouts`).then((result) => {
        const {
            copy_right,
            link_lists,
            public_number,
            qr_code,
            qr_code_image,
            site_number,
            title,
        } = result.data || {};

        res.status(200).json({
            navbarData: {},
            footerData: {
                title,
                linkList: link_lists?.data?.map((item: any) => {
                    return {
                        title: item.title,
                        list: item?.links?.data?.map((_item: any) => {
                            return {
                                label: _item.label,
                                link: isEmpty(_item.link) ? '' : _item.link,
                            };
                        }),
                    };
                }),
                qrCode: {
                    // image: `${SERVER_BASE_URL}${qr_code_image?.data?.url}`,
                    image: ``,
                    text: qr_code,
                },
                copyRight: copy_right,
                siteNumber: site_number,
                publicNumber: public_number,
            },
        });
    });
});
