import { AppContext } from 'next/app';

export const LOCAL_BASE_URL = 'http://127.0.0.1:3000';
export const SERVER_BASE_URL = 'http://127.0.0.1:1337';

export const isBrowser = () => {
    return typeof document !== 'undefined' && document.body?.offsetWidth;
};

export const isMobile = (context: AppContext) => {
    const { headers = {} } = context.ctx.req || {};
    return /mobile|android|iphone|ipad|phone/i.test((headers['user-agent'] || '').toLowerCase());
};

export const isSupportWebp = (context: AppContext) => {
    const { headers = {} } = context.ctx.req || {};
    return headers.accept?.includes('image/webp');
};
