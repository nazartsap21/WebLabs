import React, {FC} from 'react';
import "./Hero.scss";
import HeroImage from "./hero_image.svg";

const Hero: FC = () => {
    return (
        <section className={"hero"}>
            <img src={HeroImage} alt={"hero image"} />
            <div className={"hero-content"}>
                <h2 className={"hero-title"}>Relationz</h2>
                <h3 className={"hero-description"}>Helps you create reminders for your tasks, meetings or other important events so you don't forget anything and are not late!</h3>
            </div>
        </section>
    );
};

export default Hero;