import { useEffect, useState } from "react";
import Qrcode from "./Qrcode";
import { Image, FloatButton } from 'antd';

import axios from 'axios';
import { HomeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";


export default function QrcodeList() {
    const [albums, setAlbums] = useState([]);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate()
    const fetchAllData = () => {
        Promise.all([axios.get('/album'), axios.get('/author'), axios.get('/rating'), axios.get('/account')])
            .then((r) => {
                setAlbums(r[0].data);
                setAuthors(r[1].data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => { });
    };
    useEffect(() => {

        fetchAllData();
    }, []);
    return <>
        <div className="my-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center">

            {albums?.map(item => <div className="col-span-1"> <Qrcode className="m-auto" data={item} host={`${window.location.origin}?id=${item?.id}`} /> </div>)}


        </div> <FloatButton icon={<HomeOutlined />} onClick={() => navigate("/")} /></>
}