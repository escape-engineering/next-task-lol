import ImageSkeleton from "../common.tsx/ImageSkeleton";

const RotationSkeleton = () => {
    return (
        <div className="flex flex-col py-[20px] gap-[20px]">
            <section className="flex flex-col justify-center items-center gap-[10px]">
                <h1>챔피언 로테이션</h1>
                <div className="flex flex-row">
                    <ImageSkeleton />
                </div>
            </section>
            <section className="flex flex-col justify-center items-center gap-[10px]">
                <h1>신규유저를 위한 로테이션</h1>
                <div className="flex flex-row">
                    <ImageSkeleton />
                </div>
            </section>
        </div>
    );
};

export default RotationSkeleton;
