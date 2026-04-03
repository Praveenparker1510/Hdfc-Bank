import React from 'react';
import './VirtualKeyboard.css';

const rows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export default function VirtualKeyboard({ onKeyPress, onBackspace, onClose, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="vk-container">
      <div className="vk-header">
        <span className="vk-title">Virtual Keyboard</span>
        <button type="button" className="vk-close" onClick={onClose}>✕</button>
      </div>
      <div className="vk-keys">
        {rows.map((row, i) => (
          <div key={i} className="vk-row">
            {row.map((char) => (
              <button
                type="button"
                key={char}
                className="vk-key"
                onClick={() => onKeyPress(char)}
              >
                {char}
              </button>
            ))}
          </div>
        ))}
        <div className="vk-row">
          <button type="button" className="vk-key vk-space" onClick={() => onKeyPress(' ')}>Space</button>
          <button type="button" className="vk-key vk-backspace" onClick={onBackspace}>⌫</button>
        </div>
      </div>
    </div>
  );
}
