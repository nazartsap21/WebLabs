import React, {FC} from 'react';
import "./Footer.scss"
import facebook from './facebook.svg';
import instagram from './instagram.webp';
import twitter from './twitter.svg'


const Footer: FC = () => {
    return (
        <footer>
            <div>
                <h1>Reminderz</h1>
                <div className={"links"}>
                    <a href={"/"}><img src={facebook} alt={"facebook"} width={"25px"}/></a>
                    <a href={"/"}><img src={instagram} alt={"instagram"} width={"25px"}/></a>
                    <a href={"/"}><img src={twitter} alt={"twitter"} width={"25px"}/></a>
                </div>
            </div>
            <hr/>
            <h3>Copyright © 2010 - 2024 Relationz Ltd. All rights reserved.</h3>
        </footer>
    );
};

export default Footer;