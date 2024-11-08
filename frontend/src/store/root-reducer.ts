import { reducer as authReducer } from './auth/auth';
import { reducer as listingsReducer } from './listings/listings';
import { reducer as imagesReducer } from './images/images';

const rootReducer = {
  auth: authReducer,
  listings: listingsReducer,
  images: imagesReducer,
};

export { rootReducer };
