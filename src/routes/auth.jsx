import React, { useMemo, useEffect } from 'react';
import { useMatches, useOutlet, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default function AuthRoute() {
    /**
     * 1.获取路由匹配信息
     * 2.获取子路由元素
     * 3.获取 store 中的登录信息
     */
    const matches = useMatches(); //这个钩子只有 data Router 下能用
    const outlet = useOutlet();
    // const isLogined = useAppSelector((state) => state.auth.isLogined);
    const isLogined = true;
    /**
     * 当前路径是否在白名单？
     * 当前是否已登录？
     * 都不是则重向定到 PageLogin
     */
    const whiteList = ['/', '/detail', '/outlet'];
    const page = useMemo(() => {
        if (isEmpty(matches)) { return; }
        const { pathname } = matches[matches.length - 1];

        console.log('%c [ pathname ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', pathname);
        const isInWL = whiteList.includes(pathname);
        if (isInWL || isLogined) { return outlet; }
        return <Navigate to="login" replace />;
    }, [isLogined, matches, outlet]);
    /**
     * 模仿 vue-router 后置钩子修改网页标题
     */
    useEffect(() => {
        const title = matches[matches.length - 1]?.handle?.title;
        const isHasTitle = typeof title === 'string';
        if (isHasTitle) {
            document.title = title;
        }
    }, [matches]);

    return page;
}