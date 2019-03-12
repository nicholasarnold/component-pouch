import React from 'react';
import './SpellSuggestions.css';

export class SpellSuggestions extends React.Component {
  render() {
    return (
      <div className="spell-suggestions row">
        <div className="col">
          <h4 className="text-uppercase">Suggestions</h4>
          {this.props.spells.map(spell => {
            return ( 
              <div>
                {spell} <a className="add-spell"><small>+Add</small></a>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}