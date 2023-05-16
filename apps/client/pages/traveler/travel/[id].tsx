import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { TravelService } from "@travel-tailor/services";
import { Travel } from "@travel-tailor/types";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { AuthChecker } from "@/components/auth/authChecker";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: false })
import { DayNavbar } from "@/components/traveler/travels/dayNavbar";
import { ActivityList } from "@/components/traveler/travels/activity/activityList";
import { Layout } from "@/components/layout";

const TravelerTravelPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Travel>({
        id: '',
        departureCity: '',
        destinationCity: '',
        departureDate: new Date(),
        returnDate: new Date(),
        days: [],
    });
    const [day, setDay] = useState<Date>(new Date());

    const params = usePathname();

    const handleFetch = async () => {
        const response = await TravelService.findTravelById(`${process.env.NEXT_PUBLIC_API_URL}`, params.substring(17, 100), setApiError);
        if (response) {
            setData(response);
            return response;
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">{data.destinationCity} from {new Date(data.departureDate).toLocaleDateString('fr')} to {new Date(data.returnDate).toLocaleDateString('fr')}</h1>
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <DayNavbar days={data.days} dayCurrent={day} setDay={setDay} />
                                <ActivityList days={data.days} dayCurrent={day} />
                            </div>
                            <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                                <Mapbox
                                    mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                                    addresse={`Bordeaux, Gironde, France`}
                                />
                            </div>
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TravelerTravelPage;