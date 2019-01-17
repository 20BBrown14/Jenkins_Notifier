import failed from '../assets/failed.png';
import successful from '../assets/successful.png';
import failedAnime from '../assets/failed_anime.gif';
import neverBuiltAnime from '../assets/never_built_anime.gif';
import neverBuilt from '../assets/never_built.png';
import successfulAnime from '../assets/successful_anime.gif';
import unstableAnime from '../assets/unstable_anime.gif';
import unstable from '../assets/unstable.png';

/** consts for the color statuses returned from Jenkin's APIs */
const BLUE = 'blue';
const BLUE_ANIME = 'blue_anime';
const RED = 'red';
const RED_ANIME = 'red_anime';
const NOT_BUILT = 'notbuilt';
const NOT_BUILT_ANIME = 'notbuilt_anime';
const YELLOW = 'yellow';
const YELLOW_ANIME = 'yellow_anime';
export const UNKNOWN_STATUS = 'unknown_status';

const determineJobStatusImage = (color) => {
  switch (color) {
    case BLUE:
      return successful;
    case BLUE_ANIME:
      return successfulAnime;
    case RED:
      return failed;
    case RED_ANIME:
      return failedAnime;
    case NOT_BUILT:
      return neverBuilt;
    case NOT_BUILT_ANIME:
      return neverBuiltAnime;
    case YELLOW:
      return unstable;
    case YELLOW_ANIME:
      return unstableAnime;
    default:
      return UNKNOWN_STATUS;
  }
};

export default determineJobStatusImage;
