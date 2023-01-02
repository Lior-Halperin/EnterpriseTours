import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import Footer from "../Footer/Footer";
import HeaderLogin from "../HeaderLogin/HeaderLogin";
import LayoutLogin from "../LayoutLogin/LayoutLogin";
import Routing from "../Routing/Routing";
import "./Layout.css";


function Layout(): JSX.Element {

    return (
        <div className="Layout">

            <header>

                <HeaderLogin />

            </header>

            <main>

            <Routing />

            </main>

            <footer>

                <div className="av">av</div>

                <Footer />

            </footer>

        </div>
    );
}

export default Layout;
