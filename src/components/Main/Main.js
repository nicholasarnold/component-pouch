import React from 'react';
import './Main.css';
import { SRD } from '../../util/SRD';
import { ascending } from '../../helper';
import { SpellSearchBar } from '../SpellSearchBar/SpellSearchBar';
import { Disclaimer } from '../Disclaimer/Disclaimer';
import { SpellSuggestions } from '../SpellSuggestions/SpellSuggestions';
import { SpellResults } from '../SpellResults/SpellResults';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spellsAvailable: [],
      spellsSuggested: [],
      spellsSelected: [],
      status: 'loading'
    };
  }

  /*----------------------------------------*/
  //             EVENT FUNCTIONS            //
  /*----------------------------------------*/

  // When user first loads the page, retrieve a list of spells
  getAllSpells = () => {
    SRD.fetchAllSpells()
    .then(spells => {
      this.setState({ 
        spellsAvailable: spells,
        spellsSuggested: spells,
        status: 'done'
      });
    }).catch(error => {
      this.setState({ status: 'error' });
    })
  }

  // When user enters text in the search bar, filter spells
  filterSpellSuggestions = search => {
    const filteredSpellSuggestions = this.state.spellsAvailable.filter(spell => {
      const caseInsensitiveSearch = search.toUpperCase();
      const caseInsensitiveSpell = spell.name.toUpperCase();
      return caseInsensitiveSpell.includes(caseInsensitiveSearch);
    });
    this.setState({ spellsSuggested: filteredSpellSuggestions });
  }

  // When user clicks on a suggested spell:
  // 1. Remove from spellsAvailable and spellsSuggested
  // 2. Make API request, add to spellsSelected
  addToSelected = spellId => {
    this.removeFromState(spellId, 'spellsAvailable');
    this.removeFromState(spellId, 'spellsSuggested');
    SRD.fetchSpell(spellId)
    .then(newSelectedSpell => {
      this.addToState(newSelectedSpell, 'spellsSelected', 'nosort');
    });
  }

  // When user clicks to remove spell:
  // 1. Remove from spellsSelected
  // 2. Add back to spellsAvailable and spellsSuggested
  removeFromSelected = (spellId, spellName) => {
    this.removeFromState(spellId, 'spellsSelected');
    const spell = {
      id: spellId,
      name: spellName
    }
    this.addToState(spell, 'spellsAvailable');
    this.addToState(spell, 'spellsSuggested');
  }

  /*----------------------------------------*/
  //    STATE SETTERS & HELPER FUNCTIONS    //
  /*----------------------------------------*/

  removeFromState = (spellId, stateKey) => {
    const removedSpellArray = this.state[stateKey].filter(spell => spell.id !== spellId);
    this.setState({ [stateKey]: removedSpellArray });
  }

  addToState = (spell, stateKey, sort) => {
    const addedSpellArray = this.state[stateKey];
    addedSpellArray.push(spell);
    if (sort !== 'nosort') addedSpellArray.sort(ascending);
    this.setState({ [stateKey]: addedSpellArray });
  }

  /*----------------------------------------*/
  //           LIFECYCLE FUNCTIONS          //
  /*----------------------------------------*/

  componentDidMount() {
    this.getAllSpells();
  }

  render() {
    return (
      <main>
        <div className="main container">
          <SpellSearchBar filterSpellSuggestions={this.filterSpellSuggestions} />
          <Disclaimer />
          <SpellSuggestions
            spells={this.state.spellsSuggested}
            status={this.state.status}
            addToSelected={this.addToSelected}
          />
          <SpellResults
            spells={this.state.spellsSelected}
            removeFromSelected={this.removeFromSelected}
            addToFullList={this.addToFullList}
            addToSuggestions={this.addToSuggestions}
          />
        </div>
      </main>
    )
  }
}