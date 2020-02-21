import React, {Component} from "react";

import right from "../textures/bluecloud/rt.jpg";
import left from "../textures/bluecloud/lf.jpg";
import top from "../textures/bluecloud/up.jpg";
import bottom from "../textures/bluecloud/dn.jpg";
import front from "../textures/bluecloud/ft.jpg";
import back from "../textures/bluecloud/bk.jpg";

// import right from "./textures/browncloud/rt.jpg";
// import left from "./textures/browncloud/lf.jpg";
// import bottom from "./textures/browncloud/up.jpg";
// import top from "./textures/browncloud/dn.jpg";
// import front from "./textures/browncloud/ft.jpg";
// import back from "./textures/browncloud/bk.jpg";

// import right from "./textures/cubemap/px.png";
// import left from "./textures/cubemap/nx.png";
// import top from "./textures/cubemap/ny.png";
// import bottom from "./textures/cubemap/nz.png";
// import front from "./textures/cubemap/py.png";
// import back from "./textures/cubemap/pz.png";

// import right from "./textures/garage-cubemap/px.png"
// import left from "./textures/garage-cubemap/nx.png"
// import top from "./textures/garage-cubemap/py.png"
// import bottom from "./textures/garage-cubemap/ny.png"
// import front from "./textures/garage-cubemap/nz.png"
// import back from "./textures/garage-cubemap/pz.png"

// import right from "./textures/garage2-cm/right.png"
// import left from "./textures/garage2-cm/left.png"
// import top from "./textures/garage2-cm/top.png"
// import bottom from "./textures/garage2-cm/bottom.png"
// import front from "./textures/garage2-cm/front.png"
// import back from "./textures/garage2-cm/back.png"

/**
 * Loads Skybox textures from files
 */
class SkyboxLoader extends Component {
    getSkybox = () => {
        return [right, left, bottom, top, front, back]
    }

}

export default SkyboxLoader;