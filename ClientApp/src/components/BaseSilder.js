import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {

    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',

};
const BaseSilder = ({ data, auto = false }) => (
    // <Carousel autoplay={auto} className='rounded-lg ' >
    //     {data?.map(item => <div>
    //         <h3 style={contentStyle}>
    //             <img alt="d" src={item} className='w-full h-52  shadow-md object-center object-cover overflow-hidden ' />
    //         </h3>
    //     </div>)}


    // </Carousel>
    <div>
        <h3 style={contentStyle}>
            <img alt="d" src={data[0]} className='w-full h-full  shadow-md object-center object-cover overflow-hidden ' />
        </h3>
    </div>
);
export default BaseSilder;