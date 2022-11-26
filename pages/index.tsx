import type { NextPage } from 'next';
import { useRef, useEffect, useContext, useState } from 'react';
import cn from 'classnames';
import { Pagination } from 'antd';
import axios from 'axios';
import { ThemeContext } from '@/stores/theme';
import { LOCAL_BASE_URL } from '@/utils';
import { IArticleIntro } from './api/articleIntro';
import { IComponentProps } from './_app';
import styles from './index.module.scss';

interface IProps {
    title: string;
    description: string;
    articles: {
        list: {
            label: string;
            info: string;
            link: string;
        }[];
        total: number;
    };
}

const Home: NextPage<IProps & IComponentProps> = ({
    title,
    description,
    articles,
    isSupportWebp,
}) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { theme } = useContext(ThemeContext);
    const [content, setContent] = useState(articles);

    useEffect(() => {
        mainRef.current?.classList.remove(styles.withAnimation);
        window.requestAnimationFrame(() => {
            mainRef.current?.classList.add(styles.withAnimation);
        });
    }, [theme]);

    return (
        <div className={styles.container}>
            <main className={cn([styles.main, styles.withAnimation])} ref={mainRef}>
                <div
                    className={cn({
                        [styles.header]: true,
                        [styles.headerWebp]: isSupportWebp,
                    })}
                ></div>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>

                <div className={styles.grid}>
                    {content?.list?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.card}
                                onClick={(): void => {
                                    window.open(item.link, 'blank', 'noopener=yes,noreferrer=yes');
                                }}
                            >
                                <h2>{item.label} &rarr;</h2>
                                <p>{item.info}</p>
                            </div>
                        );
                    })}
                    <div className={styles.paginationArea}>
                        <Pagination
                            total={content?.total}
                            pageSize={6}
                            onChange={(pageNo) => {
                                axios
                                    .post(`${LOCAL_BASE_URL}/api/articleIntro`, {
                                        pageNo,
                                        pageSize: 6,
                                    })
                                    .then(({ data }) => {
                                        setContent({
                                            list: data.list.map((item: IArticleIntro) => {
                                                return {
                                                    label: item.label,
                                                    info: item.info,
                                                    link: `${LOCAL_BASE_URL}/article/${item.articleId}`,
                                                };
                                            }),
                                            total: data.total,
                                        });
                                    });
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

Home.getInitialProps = async (context) => {
    const [{ data: homeData }, { data: articleData }] = await Promise.all([
        axios.get(`${LOCAL_BASE_URL}/api/home`),
        axios.post(`${LOCAL_BASE_URL}/api/articleIntro`, {
            pageNo: 1,
            pageSize: 6,
        }),
    ]);

    return {
        title: homeData.title,
        description: homeData.description,
        articles: {
            list: articleData.list.map((item: IArticleIntro) => {
                return {
                    label: item.label,
                    info: item.info,
                    link: `${LOCAL_BASE_URL}/article/${item.articleId}`,
                };
            }),
            total: articleData.total,
        },
    };
};

export default Home;
