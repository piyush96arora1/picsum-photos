import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import CustomImage from "../Image";
import { useDispatch } from "react-redux";
import { setModal } from "../../modules/photos";
import {
  copyToClip,
  debounce,
  removeParam,
} from "../../utils/helper";
import ReactiveButton from "reactive-button";
import { BTN_STATE } from "../../utils/constants";
import CustomRange from "../Range";

Modal.setAppElement("#root");

const CustomModal = () => {
  const dispatch = useDispatch();
  const [blurValue, setBlur] = useState([0]);
  const [btnState, setBtnState] = useState(BTN_STATE.IDLE);
  const [imgUrl, setImgUrl] = useState(null);
  const [localGray, setLocalGray] = useState(null);
  const {
    modalOpen,
    currentPhoto: { id, download_url },
    globalGrayScale,
  } = useSelector((state) => state.photos);

  useEffect(() => {
    setBlur([0])
    setLocalGray(globalGrayScale);
    setImgUrl(
      globalGrayScale ? download_url : removeParam("grayscale",download_url)
    );
  }, [download_url, globalGrayScale]);

  const handleUrl = () => {
    setBtnState(BTN_STATE.LOADING);
    if (localGray) {
      setImgUrl(removeParam("grayscale",imgUrl));
      setLocalGray(false);
    } else {
      setImgUrl(
        imgUrl.includes("blur") ? imgUrl + "&grayscale" : imgUrl + "?grayscale"
      );
      setLocalGray(true);
    }
    setTimeout(() => {
      setBtnState(BTN_STATE.IDLE);
    }, 100);
  };

  const handleBlur = useCallback(
    debounce((e) => {
      let url = new URL(imgUrl);
      if (e[0] == 0){
        setImgUrl(removeParam("blur",imgUrl))
      }
      else {url.searchParams.set("blur", e[0]);
      let newUrl = url.origin + url.pathname + url.search;
      setImgUrl(newUrl);
    }
    setBlur([e]);
    
    }, 100),
    [imgUrl, localGray]
  );

  return (
    <Modal isOpen={modalOpen} className="modal-wrapper" overlayClassName="modal-wrapper">
      <CustomImage id={id} url={imgUrl} />
      <button
        className="btn"
        type="button"
        onClick={() => dispatch(setModal(false))}
      >
        Close
      </button>
      <ReactiveButton
        idleText={`Convert to ${localGray ? "Color" : "GrayScale"}`}
        buttonState={btnState}
        onClick={handleUrl}
        style={{ minWidth: "180px", marginTop: "10px" }}
      />
      <div className="range">
        <CustomRange values={blurValue} onChange={handleBlur} />
      </div>
      <div className="action">
        <a href={download_url} title="image" download>
          {" "}
          Download Image{" "}
        </a>

        <button
          className="btn"
          type="button"
          onClick={() => copyToClip(download_url)}
        >
          Share Image
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
