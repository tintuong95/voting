import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { QRCode, Button } from 'antd';
import axios from 'axios';
import _ from 'lodash';
const downloadQRCode = (id) => {
    const canvas = document.getElementById('myqrcode' + id)?.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};
const Qrcode = ({ host, data }) => {
    const [size, setSize] = useState(260);
    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize > 300) {
                return 300;
            }
            return newSize;
        });
    };
    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize < 48) {
                return 48;
            }
            return newSize;
        });
    };
    const [pathList, setPathList] = useState([])

    useEffect(() => {

        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return (
        <div className='m-auto flex justify-center ' id={"myqrcode" + data?.id}>

            <div> <QRCode
                errorLevel="H"
                size={size}
                iconSize={size / 4}
                value={host}
                icon={pathList[2]}
            />
                <Button className='m-auto' type="" onClick={() => downloadQRCode(data?.id)}>
                    Download
                </Button></div>
        </div>
    );
};
export default Qrcode;