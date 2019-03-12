import React from 'react';
import './SpellInput.css';

export class SpellInput extends React.Component {
  render() {
    return (
      <div className="spell-input row">
        <div className="col">
          <input className="spell-input" type="text" placeholder="Enter the name of a spell (e.g., Magic Missile)" />
        </div>
      </div>
    )
  }
}