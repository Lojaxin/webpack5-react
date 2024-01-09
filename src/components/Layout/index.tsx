import React, { ReactNode } from 'react';
import { Popover } from 'antd';
import './index.scss';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="jx-layout">
            <div className="jx-header-wapper">
                <div className="jx-header">
                    <div className="left">武汉鑫合商贸有限公司</div>
                    <div className="right">
                        <Popover content="13349832800" trigger="hover">
                            联系客服
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="jx-content">
                {children}
            </div>
            <div className="jx-footer">
                <a href="https://beian.miit.gov.cn/" style={{ color: '#fff' }} target="_blank">鄂ICP备19026413号</a>
            </div>
        </div>
    );
}
