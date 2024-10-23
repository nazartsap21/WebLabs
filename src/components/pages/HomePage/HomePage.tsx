import React, {FC} from 'react';
import Hero from "../../features/Hero/Hero";
import RemindersPreview from "../../features/RemindersPreview/RemindersPreview";

const HomePage: FC = () => {
    return (
        <>
            <Hero />
            <RemindersPreview />
        </>
    );
};

export default HomePage;