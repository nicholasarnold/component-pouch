import React from 'react';
import './Main.css';
import { SpellInput } from '../SpellInput/SpellInput';
import { SpellSuggestions } from '../SpellSuggestions/SpellSuggestions';

const spells = [];

export class Main extends React.Component {
  render() {
    return (
      <div className="body container">
        <div className="spell-input row">
          <div className="col">
            <SpellInput />
          </div>
        </div>
        <div className="disclaimer row">
          <div className="col">
            <p>Can't find the spell you're looking for? Only spells from the <a href="http://dnd.wizards.com/articles/features/systems-reference-document-srd" target="_blank" rel="noopener noreferrer">System Reference Document</a> are listed above. <a href="#">Find out more</a>.</p>
          </div>
        </div>
        <div className="spell-suggestions row">
          <div className="col">
            <SpellSuggestions spells={spells} />
          </div>
        </div>
      </div>
    )
  }
}