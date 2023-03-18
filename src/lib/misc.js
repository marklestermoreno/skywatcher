import AliceCarousel from 'react-alice-carousel';
import moment from 'moment';
import { isChrome, isFirefox, isSafari, isOpera, isIE, isEdge, isYandex, browserVersion, browserName} from "react-device-detect";
import axios from "axios";

const misc = {
    AliceCarousel, 
    moment,
    axios, isChrome, isFirefox, isSafari, isOpera, isIE, isEdge, isYandex, browserVersion, browserName
}

export default misc