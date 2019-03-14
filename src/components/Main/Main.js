import React from 'react';
import './Main.css';
import { SRD } from '../../util/SRD';
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
    this.removeFromAvailable(spellId);
    this.removeFromSuggestions(spellId);
    SRD.fetchSpell(spellId)
    .then(newSelectedSpell => {
      const spellsSelected = this.state.spellsSelected;
      spellsSelected.push(newSelectedSpell);
      // spellsSelected.sort(this.ascending);
      this.setState({ spellsSelected: spellsSelected });
    });
  }

  // When user clicks to remove spell:
  // 1. Remove from spellsSelected
  // 2. Add back to spellsAvailable and spellsSuggested
  removeFromSelected = (spellId, spellName) => {
    const removedSpellArray = this.state.spellsSelected.filter(spell => spell.id !== spellId);
    this.setState({ spellsSelected: removedSpellArray });
    this.addToSpellsAvailable(spellId, spellName);
    this.addToSpellsSuggested(spellId, spellName);
  }

  /*----------------------------------------*/
  //    STATE SETTERS & HELPER FUNCTIONS    //
  /*----------------------------------------*/

  // Sort spell objects ascending by id
  ascending = (a, b) => a.id - b.id;

  removeFromAvailable = spellId => {
    const removedSpellArray = this.state.spellsAvailable.filter(spell => spell.id !== spellId);
    this.setState({ spellsAvailable: removedSpellArray });
  }

  removeFromSuggestions = spellId => {
    const removedSpellArray = this.state.spellsSuggested.filter(spell => spell.id !== spellId);
    this.setState({ spellsSuggested: removedSpellArray });
  }

  addToSpellsAvailable = (spellId, spellName) => {
    const spellsAvailable = this.state.spellsAvailable;
    const spell = {
      id: spellId,
      name: spellName
    }
    spellsAvailable.push(spell);
    spellsAvailable.sort(this.ascending);
    this.setState({ spellsAvailable: spellsAvailable });
  }

  addToSpellsSuggested = (spellId, spellName) => {
    const spellsSuggested = this.state.spellsSuggested;
    const spell = {
      id: spellId,
      name: spellName
    }
    spellsSuggested.push(spell);
    spellsSuggested.sort(this.ascending);
    this.setState({ spellsSuggested: spellsSuggested });
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