
import right from "../textures/bluecloud/rt.jpg";
import left from "../textures/bluecloud/lf.jpg";
import top from "../textures/bluecloud/up.jpg";
import bottom from "../textures/bluecloud/dn.jpg";
import front from "../textures/bluecloud/ft.jpg";
import back from "../textures/bluecloud/bk.jpg";

/**
 * Loads Skybox textures from files
 */
const LoadSkybox = () => {
    return [right, left, bottom, top, front, back]
};

export default LoadSkybox;