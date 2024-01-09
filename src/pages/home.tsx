import React from 'react';
import { Carousel } from 'antd';
import banner from '../../public/banner.jpg';
import trendsUser from './config';
import './index.scss';

type Trends = {
    name: string;
    value: string;
}

const Home = () => {
    return (
        <div className="home-content">
            <img src={banner} className="banner-img" />
            <div className="text-content">
                <div className="text-content-wapper">
                    {/* <p style={{ marginLeft: '36%' }}>专业的团队</p> */}
                    <p style={{ textAlign: 'center', margin: '8px 0' }}>为您提供更便捷的服务</p>
                    <div className="carousel-body">
                        <div className="carousel-body-wapper">

                            <Carousel dotPosition={'right'} autoplay infinite autoplaySpeed={1600}>
                                {
                                    trendsUser.map((item, index) => (
                                        <div className="carousel-page" key={index}>
                                            {
                                                item.map((child: Trends) => (
                                                    <div key={child.name} className="carousel-row">
                                                        <div>{child.name}</div>
                                                        <div> {child.value}</div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;