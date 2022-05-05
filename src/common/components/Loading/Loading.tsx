import React,{FC} from 'react';
import styled from 'styled-components';
import Loader from "react-loader";

type Props = {}

export const Loading:FC<Props> = (props: Props) => {
  return (
    <DarkBackground>
        <Loader
          loaded={false}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color='#FF5761'
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.0}
          loadedClassName="loadedContent"
        />
    </DarkBackground>
  )
}

const DarkBackground = styled.div`
  position: fixed; 
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;