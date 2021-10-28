import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useIntersection } from '../../hooks/observer';

const StyledImage = styled.div`
    background-color: #ccc;
    overflow: hidden;
    position: relative;
    height: 250px;
    width: 250px;
    .image {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 1;
      left: 0;
    }

    @media only screen and (max-width: 767px) {
      height: 170px;
      width: 170px;
      .image {
        height: 170px;
        width: 170px;
      }
    }
  
`;

const CustomImage = ({id, url, thumb, width, height ,alt, onPhotoClick}) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  return (
    <StyledImage
      className="image-container"
      ref={imgRef}
      onClick={()=>onPhotoClick({id,download_url:url})}
    >
      {isInView && (

          <img
            className='image'
            src={url}
            alt={alt}
          />

      )}
      
    </StyledImage>
  );
};

export default CustomImage;