import React from "react";
import Heart from "@/public/icon/heart.svg";

interface Props {
  width: string;
  height: string;
  viewBox: string;
  stroke: string;
  fill: string;
  isSelected: boolean;
}

const HeartIcon = ({ width, height, viewBox, stroke, fill, isSelected }: Props) => {
  const shadowW = Number(width) + 3;
  const shadowH = Number(height) + 2;

  return isSelected ? (
    <Heart width={width} height={height} viewBox={viewBox} stroke={stroke} fill={fill} />
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width={shadowW} height={shadowH} viewBox="0 0 32 29" fill="none">
      <g filter="url(#filter0_d_2021_18227)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.4249 7.54571C6.7612 8.33469 6.3002 9.49322 6.3002 11.0832C6.3002 14.2098 8.67588 17.2107 11.2817 19.5271C12.5589 20.6624 13.8399 21.5879 14.8033 22.2302C15.2843 22.5509 15.6841 22.7996 15.9622 22.9674C15.9751 22.9752 15.9878 22.9828 16.0002 22.9902C16.0126 22.9828 16.0252 22.9752 16.0382 22.9674C16.3163 22.7996 16.7161 22.5509 17.1971 22.2302C18.1605 21.5879 19.4414 20.6624 20.7187 19.5271C23.3245 17.2107 25.7002 14.2098 25.7002 11.0832C25.7002 9.49322 25.2392 8.33469 24.5755 7.54571C23.9095 6.754 22.9988 6.28524 22.0111 6.14292C20.0282 5.85718 17.7573 6.89344 16.7362 9.29022C16.6105 9.58521 16.3208 9.77666 16.0002 9.77666C15.6795 9.77666 15.3899 9.58521 15.2642 9.29022C14.2431 6.89344 11.9722 5.85718 9.9893 6.14292C9.00162 6.28524 8.09089 6.754 7.4249 7.54571ZM16.0002 23.9167L16.3887 24.6161C16.1471 24.7503 15.8533 24.7503 15.6117 24.6161L16.0002 23.9167ZM16.0002 7.33312C14.4933 5.1835 12.0224 4.23343 9.76109 4.55928C8.41544 4.75318 7.13867 5.40046 6.2005 6.51574C5.26002 7.63374 4.7002 9.17314 4.7002 11.0832C4.7002 14.9566 7.57451 18.3725 10.2187 20.7229C11.5664 21.9209 12.9105 22.8913 13.9158 23.5615C14.4192 23.8972 14.8397 24.1588 15.1358 24.3374C15.2839 24.4268 15.401 24.4954 15.482 24.5422C15.5225 24.5656 15.554 24.5836 15.5758 24.5959L15.6012 24.6102L15.6084 24.6142L15.6117 24.6161C15.6119 24.6162 15.6117 24.6161 16.0002 23.9167C16.3887 24.6161 16.3885 24.6162 16.3887 24.6161L16.392 24.6142L16.3991 24.6102L16.4245 24.5959C16.4464 24.5836 16.4778 24.5656 16.5183 24.5422C16.5993 24.4954 16.7165 24.4268 16.8646 24.3374C17.1607 24.1588 17.5811 23.8972 18.0846 23.5615C19.0899 22.8913 20.4339 21.9209 21.7817 20.7229C24.4259 18.3725 27.3002 14.9566 27.3002 11.0832C27.3002 9.17314 26.7404 7.63374 25.7999 6.51574C24.8617 5.40046 23.5849 4.75318 22.2393 4.55928C19.978 4.23343 17.5071 5.1835 16.0002 7.33312Z"
          fill="white"
        />
      </g>
      <defs>
        <filter id="filter0_d_2021_18227" x="0.700195" y="0.496704" width="30.6001" height="28.22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2021_18227" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2021_18227" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default HeartIcon;
