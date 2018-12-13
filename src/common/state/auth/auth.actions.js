import createAsyncAction from '../../../utils/createAsyncAction';
import HttpService from '../../services/http.service';
import ApiService from '../../services/api.service';

export const FETCH_LOGGED_IN_USER = 'FETCH_LOGGED_IN_USER';

export const FetchLoggedInUserAction = createAsyncAction(FETCH_LOGGED_IN_USER, () => {
  const options = ApiService.getOptions('fetchLoggedInUser');
  return HttpService.fetch(options);
});
