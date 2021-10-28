import { removeParam } from "../utils/helper";

export const SET_PHOTOS = "photos/SET_PHOTOS";
export const SET_LOADING = "photos/SET_LOADING";
export const SET_CURRENT_SELECTED_PHOTO = "photos/SET_CURRENT_SELECTED_PHOTO";
export const CONVERT_TO_GRAYSCALE_GLOBAL = "photos/CONVERT_TO_GRAYSCALE_GLOBAL";
export const SET_MODAL_DATA = "photos/SET_MODAL_DATA";
export const SET_ERROR = "photos/SET_ERROR";

const initialState = {
  photos: [],
  currentPhoto: {},
  globalGrayScale: false,
  modalOpen: false,
  pageNo: 0,
  hasMore: true,
  loading: true,
  hasError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        photos: !state.globalGrayScale
          ? [...state.photos, ...action.payload]
          : [
              ...state.photos,
              ...action.payload.map((item) => ({
                ...item,
                download_url: item.download_url + "?grayscale",
              })),
            ],
        loading: false,
        hasMore: action.payload.length ? true : false,
        pageNo: state.pageNo + 1,
        hasError: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_CURRENT_SELECTED_PHOTO:
      const newState = { ...state };
      return {
        ...newState,
        currentPhoto: { ...action.payload },
      };

    case CONVERT_TO_GRAYSCALE_GLOBAL:
      return {
        ...state,
        globalGrayScale: action.payload,
        photos: state.photos.map((item) => ({
          ...item,
          download_url: action.payload
            ? item.download_url + "?grayscale"
            : removeParam("grayscale",item.download_url),
        })),
      };

    case SET_MODAL_DATA:
      return {
        ...state,
        modalOpen: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };

    default:
      return state;
  }
};

export const setPhotos = (payload) => {
  return {
    type: SET_PHOTOS,
    payload,
  };
};

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setCurrentSelectedPhoto = (payload) => ({
  type: SET_CURRENT_SELECTED_PHOTO,
  payload,
});

export const setGLobalGrayScale = (payload) => ({
  type: CONVERT_TO_GRAYSCALE_GLOBAL,
  payload,
});
export const setModal = (payload) => ({
  type: SET_MODAL_DATA,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export default reducer;
