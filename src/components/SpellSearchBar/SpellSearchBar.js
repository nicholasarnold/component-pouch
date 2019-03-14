import React from 'react';
import './SpellSearchBar.css';

export class SpellSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' }
  }

  handleOnChange = event => {
    const searchTerm = event.target.value;
    this.setState({ search: searchTerm });
    this.props.filterSpellSuggestions(searchTerm);
  }

  render() {
    return (
      <div className="spell-searchbar row">
        <div className="col">
          <input
            className="spell-searchbar"
            type="text"
            value={this.state.search}
            onChange={this.handleOnChange}
            placeholder="Enter the name of a spell (e.g., Magic Missile)"
          />
        </div>
      </div>
    )
  }
}