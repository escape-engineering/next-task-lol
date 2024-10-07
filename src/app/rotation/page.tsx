"use client";

import RotationCarousel from "../_components/rotation/RotationCarousel";
import { useRotationQuery } from "@/query/queries";
import RotationSkeleton from "../_components/rotation/RotationSkeleton";
import RotationErrorPage from "../_components/rotation/RotationErrorPage";

const RotationPage = () => {
    const { data: rotationObj, isError: rotationError, isPending: rotationPending, refetch } = useRotationQuery();

    if (rotationError) return <RotationErrorPage refetch={refetch} />;
    if (rotationPending) return <RotationSkeleton />;

    return (
        <div className="py-[20px]">
            <section className="flex flex-col justify-center items-center">
                <h1>챔피언 로테이션</h1>
                <div className="flex flex-row gap-[10px]">
                    {!!rotationObj && <RotationCarousel key={1} rotationChampLists={rotationObj.freeChamps} />}
                </div>
            </section>
            <section className="flex flex-col justify-center items-center">
                <h1>신규유저를 위한 로테이션</h1>
                <div className="flex flex-row gap-[10px]">
                    {!!rotationObj && <RotationCarousel key={2} rotationChampLists={rotationObj.freeChampsForNewbs} />}
                </div>
            </section>
        </div>
    );
};

export default RotationPage;
