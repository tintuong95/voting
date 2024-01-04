import _ from "lodash";
import { useState } from "react";
import { Badge } from "antd";
import { useSelector } from "react-redux"

export default function BaseTable({ data }) {
    const [more, setMore] = useState(4)
    const { show } = useSelector(state => state?.auth)
    return (
        <>
            <div className='relative overflow-x-auto border rounded'>
                <div className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>

                    {_(data).slice(0, more).map((item, index) => (
                        <div key={index} className='bg-white border-b   flex'>
                            <div className='px-6 py-4 w-2/12  font-medium text-gray-900 whitespace-nowrap '>
                                <Badge count={index + 1} showZero color="#faad14" />
                            </div>
                            <div className='px-6 py-4 w-8/12'>{item?.name}</div>
                            <div className='px-6 py-4 w-8/12'>Author 1</div>
                            <div className={`px-6 py-4 w-2/12 text-center ${show ? "" : "blur-sm "}`}>{item?.point}</div>
                        </div>
                    )).value()}
                </div>
            </div>
            <div className='flex items-center justify-end mt-2'><button className="text-gray-400" onClick={
                () => {
                    if (more == 4) {
                        setMore(1000)
                    } else {
                        setMore(4)
                    }
                }
            }>{more == 4 ? "more" : "hide"}</button></div></>
    );
}
