import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setCurrentSelectedPhoto,
  setError,
  setGLobalGrayScale,
  setLoading,
  setModal,
  setPhotos,
} from "../../modules/photos";
import { fetchData } from "../../utils/axios";
import CustomImage from "../Image";
import ReactiveButton from "reactive-button";
import { BTN_STATE } from "../../utils/constants";
import { debounce } from "../../utils/helper";

const StyledWrapper = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  @media only screen and (max-width: 767px) {
    .wrapper {
      grid-template-columns: repeat(2, auto);
    }
  }
`;

const PicWrapper = () => {
  const [btnState, setBtnState] = useState(BTN_STATE.IDLE);
  const { photos, pageNo, loading, globalGrayScale, hasError } = useSelector(
    (state) => state.photos
  );
  const dispatch = useDispatch();

  const fetchPhotos = async () => {
    fetchData(pageNo)
      .then((res) => {
        dispatch(setPhotos(res));
      })
      .catch(() => {
        setError(true);
      });
  };

  const selectPhoto = ({ id, download_url }) => {
    dispatch(setCurrentSelectedPhoto({ id, download_url }));
    dispatch(setModal(true));
  };

  const btnHandler = debounce(() => {
    setBtnState(BTN_STATE.LOADING);
    dispatch(setGLobalGrayScale(!globalGrayScale));
    setTimeout(() => {
      setBtnState(BTN_STATE.IDLE);
    }, 800);
  }, 100);

  useEffect(() => {
    if (photos.length === 0) {
      dispatch(setLoading(true));
      fetchPhotos();
    }
  }, []);
  if (hasError) return <div>Error in API</div>;
  return (
    <StyledWrapper>
      <ReactiveButton
        idleText={`Convert to ${globalGrayScale ? "Color" : "GrayScale"}`}
        buttonState={btnState}
        onClick={btnHandler}
        style={{ minWidth: "180px", marginBottom: "30px" }}
      />
      {loading ? (
        <div>Loading....</div>
      ) : (
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchPhotos}
          hasMore={true}
          loader={null}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="wrapper">
            {photos.map((item) => {
              return (
                <div className="pointer">
                  <CustomImage
                    onPhotoClick={selectPhoto}
                    id={item.id}
                    key={item.id + item.author}
                    url={item.download_url}
                    alt="img"
                  />
                  <div>{item.author}</div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </StyledWrapper>
  );
};

export default PicWrapper;
