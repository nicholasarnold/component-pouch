import React from 'react';
import './SpellSuggestions.css';
import addButton from '../../images/add-button.svg';

export class SpellSuggestions extends React.Component {  
  handleClick = event => this.props.addToSelected(event.target.value);

  render() {
    let notification = '';
    if (this.props.status === 'loading') {
      notification =
        <div className="alert alert-light" role="alert">
          Summoning spellbook ...
        </div>;
    } else if (this.props.status === 'error') {
      notification = 
        <div className="alert alert-danger" role="alert">
            The internet demons have counterspelled your summons!<br />
            <small>(Something went wrong with the API request.)</small>
        </div>;
    } else if (!this.props.spells.length) {
      notification =
        <div className="alert alert-dark" role="alert">
            No spells matched your query; broaden your mind!<br />
            <small>(Or check your spelling.)</small>
        </div>;
    }

    return (
      <div className="spell-suggestions row">
        <div className="col btn-toolbar">
          {notification}
          {this.props.spells.map((spell, index) => {
            return ( 
              <button className="btn btn-light btn-sm" key={index + 1} value={spell.id} onClick={this.handleClick}>
                <img
                  className="add-spell-icon"
                  src={addButton}
                  width="16"
                  height="16"
                  alt="Add Spell to Component Pouch"
                /> {spell.name}
              </button>
            );
          })}
        </div>
      </div>
    )
  }
}