import { useGetWatches, type Category } from "../services/watches";

import { useState } from "react";

import Slider from '@mui/material/Slider';
import WatchComponent from "../components/WatchComponent";
import Header from "../components/Header";

const minDistance = 10;

function Index() {
    const [value, setValue] = useState<number[]>([500, 5000]);
    const [watchTypeFilter, setWatchTypeFilter] = useState<string[]>([]);

    const handleChange = (_event: Event, newValue: number[], activeThumb: number) => {
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    const handleAddFilter = (name: Category) => {
        if (watchTypeFilter.includes(name)) {
            setWatchTypeFilter(watchTypeFilter.filter((item) => item !== name));
        } else {
            setWatchTypeFilter([...watchTypeFilter, name]);
        }
    }

    const hasFilter = (filter: Category): boolean => {
        return watchTypeFilter.includes(filter);
    };

    let { data: watches } = useGetWatches();

    return (
        <div className="h-full w-full overflow-y-scroll bg-[#eeeeee] sm:p-5">

            {/* Headers */}

            <Header />

            {/* Title */}

            <div className="sm:mt-4 flex justify-center items-center">
                <span className="font-primary sm:text-[18px]">قائمة الساعات</span>
            </div>

            {/* Watch Type Filters */}

            <div dir="rtl" className="w-full sm:mt-2">
                <div>
                    <span className="font-primary text-[16px]">انواع الساعات</span>
                </div>
                <div className="grid grid-cols-2 sm:mt-2 sm:gap-x-10">
                    <div onClick={() => {handleAddFilter("Omega")}} className="relative left-5 flex flex-row items-center justify-end sm:gap-2">
                        <span className="sm:text-[14px] font-primary">Omega</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Omega") ? "bg-black" : ""}`}></div>
                    </div>
                    <div onClick={() => handleAddFilter("Audemars Piguet")} className="relative left-5 flex flex-row items-center justify-end sm:gap-2">
                        <span className="text-[14px] font-primary">Audemars Piguet</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Audemars Piguet") ? "bg-black" : ""}`}></div>
                    </div>
                    <div onClick={() => handleAddFilter("Cartier")} className="relative left-5 flex flex-row items-center justify-end sm:gap-2">
                        <span className="text-[14px] font-primary">Cartier</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Cartier") ? "bg-black" : "" }` }></div>
                    </div>
                    <div onClick={() => handleAddFilter("Patek Philippe")} className={`relative left-5 flex flex-row items-center justify-end sm:gap-2`}>
                        <span className="text-[14px] font-primary">Patek Philippe</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Patek Philippe") ? "bg-black" : "" } `}></div>
                    </div>
                    <div onClick={() => handleAddFilter("Citizen")} className={`relative left-5 flex flex-row items-center justify-end sm:gap-2`}>
                        <span className="text-[14px] font-primary">Citizen</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Citizen") ? "bg-black" : "" } `}></div>
                    </div>
                    <div onClick={() => handleAddFilter("Rolex")} className={`relative left-5 flex flex-row items-center justify-end sm:gap-2`}>
                        <span className="text-[14px] font-primary">Rolex</span>
                        <div className={`sm:w-4 sm:h-4 border-[#666666] border-[1px] ${hasFilter("Rolex") ? "bg-black" : "" } `}></div>
                    </div>
                </div>
            </div>

            {/* Price Filters */}

            <div dir="rtl" className="w-full sm:mt-2">
                <div>
                    <span className="font-primary sm:text-[16px]">فئة السعر</span>
                </div>
                <div dir='ltr' className="flex w-[100%] flex-col justify-center items-center sm:mt-2 sm:px-10 sm:gap-y-2">
                    <Slider 
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(val) => `$${val.toLocaleString()}`} 
                        min={10}
                        max={10000}
                        sx={{
                            color: "black",
                            height: "4px",
                        }}
                    />
                </div>
            </div>

            {/* The Watches */}

            <div className="grid sm:grid-cols-2 sm:mt-4 w-full gap-y-1">
                {watches?.map((watch) => (
                    <WatchComponent 
                        key={watch._id}
                        range_filter={value}
                        watch_type_filter={watchTypeFilter}
                        type={watch.category}
                        title={watch.title} 
                        price={watch.price}
                        image={watch?.images?.[0]}
                    />
                ))}
            </div>
        </div>
    )
}

export default Index;