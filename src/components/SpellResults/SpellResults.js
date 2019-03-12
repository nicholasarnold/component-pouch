import React from 'react';
import './SpellResults.css';

export class SpellResults extends React.Component {
  render() {
    return (
      <div className="spell-results row">
        <div className="col">
          <h4 className="text-uppercase">Component Pouch</h4>
            {this.props.spells.map(spell => {
              return (
                <div className="spell-components-result row">
                  <div className="col-4">
                    <p>{spell.name}</p>
                  </div>
                  <div className="col-8">
                    <p>{spell.material ? spell.material : 'This spell does not need any material components.'}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}