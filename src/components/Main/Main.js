import React from 'react';
import './Main.css';
import { SpellInput } from '../SpellInput/SpellInput';
import { Disclaimer } from '../Disclaimer/Disclaimer';
import { SpellSuggestions } from '../SpellSuggestions/SpellSuggestions';
import { SpellResults } from '../SpellResults/SpellResults';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spellsSuggested: ['Magic Missile', 'Magic Mouth', 'Magic Weapon', 'Magnificent Mansion', 'Major Image'],
      spellsSelected: [
        {
          name: 'Insect Plague',
          material: 'A few grains of sugar, some kernels of grain, and a smear of fat.'
        },
        {
          name: 'Inflict Wounds',
        },
        {
          name: 'Identify',
          material: 'A pearl worth at least 100gp and an owl feather.'
        },
      ]
    };
  }

  render() {
    let suggestions = '';
    if (this.state.spellsSuggested) {
      suggestions = <SpellSuggestions spells={this.state.spellsSuggested} />;
    }

    let results = '';
    if (this.state.spellsSelected) {
      results = <SpellResults spells={this.state.spellsSelected} />;
    }

    return (
      <div className="main container">
        <SpellInput />
        <Disclaimer />
        {suggestions}
        {results}
      </div>
    )
  }
}