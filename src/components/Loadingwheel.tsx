// LoadingWheel.tsx

import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-left-color: #0366d6;
    animation: ${rotate} 1s linear infinite;
`;

const LoadingWheel: React.FC = () => <Spinner />;

export default LoadingWheel;
