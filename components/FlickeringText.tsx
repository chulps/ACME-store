import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// set initial keyframes that will be randomized later
const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    opacity: 1;
  }
  20%, 24%, 55% {
    opacity: 0;
  }
`;

const Text = styled.span<{ duration: string }>`
  font-size: var(--font-size-h3);
  font-weight: bold;
  display: flex;
  color: var(--white);
  animation: ${flicker} ${({ duration }) => duration} infinite alternate;
`;

const FlickeringText: React.FC = () => {
  const [duration, setDuration] = useState('1.5s');

  useEffect(() => {
    function addRandomFlicker() {
      const randomKeyframes = Array.from({ length: 5 }, () => ({
        percentage: Math.random() * 100,
        opacity: Math.random()
      }))
        .sort((a, b) => a.percentage - b.percentage)
        .map(({ percentage, opacity }) => `${percentage}% { opacity: ${opacity}; }`)
        .join(' ');

      const styleSheet = document.styleSheets[0];

      const flickerKeyframes = `
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          ${randomKeyframes}
        }
      `;

      // Remove any existing flicker keyframes
      for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
        const rule = styleSheet.cssRules[i];
        if (rule.type === CSSRule.KEYFRAMES_RULE && (rule as CSSKeyframesRule).name === 'flicker') {
          styleSheet.deleteRule(i);
        }
      }

      // Insert the new flicker keyframes
      styleSheet.insertRule(flickerKeyframes, styleSheet.cssRules.length);

      // Update the flicker duration
      const flickerDuration = `${(Math.random() * 1.5 + 0.5).toFixed(2)}s`;
      setDuration(flickerDuration);
    }

    // Call the function initially and at random intervals to change the flicker effect
    addRandomFlicker();
    const intervalId = setInterval(addRandomFlicker, 5000); // Change the flicker effect every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return <Text duration={duration}>ACME&nbsp;<small>™</small></Text>;
};

export default FlickeringText;
