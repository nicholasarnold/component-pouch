import React from 'react';
import './SpellResults.css';
import removeButton from '../../images/minus-button.svg';

export class SpellResults extends React.Component {
  handleOnClick = event => {
    const spellId = event.target.getAttribute('spellid');
    const spellName = event.target.getAttribute('spellname');
    this.props.removeFromSelected(spellId, spellName);
  }

  render() {
    let ifEmpty = (!this.props.spells.length) ? <small>YOUR COMPONENT POUCH IS EMPTY</small> : '';
    // Future development: let removeAllButton = (this.props.spells.length) ? <a href="#" className="badge badge-light">Remove All</a> : '';

    const noComponents =
      <span className="no-components">
        This spell does not need any material components.
      </span>

    return (
      <div className="spell-results row">
        <div className="col">
          <h4 className="text-uppercase">Your Component Pouch</h4>
          {ifEmpty}
          {this.props.spells.map((spell, index) => {
            return (
              <div className="spell-components-result row" key={index}>
                <div className="col-3">
                  <img
                    className="remove-spell-icon"
                    src={removeButton}
                    width="16"
                    height="16"
                    alt="Remove Spell from Component Pouch"
                    spellid={spell.id.toString()}
                    spellname={spell.name}
                    onClick={this.handleOnClick}
                  /> {spell.name}
                </div>
                <div className="col-9">
                  <p>{spell.material ? spell.material : noComponents}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}