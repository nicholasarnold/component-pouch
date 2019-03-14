export const SRD = {
  endpoint: 'https://cors-anywhere.herokuapp.com/http://dnd5eapi.co/api/spells/',
  
  // Return all spells in the SRD with name and id
  fetchAllSpells() {
    return fetch(this.endpoint)
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse.results.map(spell => {
        const spellId = this.getSpellId(spell.url);
        const spellName = spell.name;
        return {
          id: spellId,
          name: spellName
        }
      })
    })
  },

  // Return one spell with name, id, and material components
  fetchSpell(spellId) {
    return fetch(`${this.endpoint}${spellId}`)
    .then(response => response.json())
    .then(response => {
      return {
        id: response.index.toString(),
        name: response.name,
        material: response.material
      }
    })
  },

  // Return spellId from URL
  getSpellId(url) {
    const urlArr = url.split('/');
    return urlArr.pop();
  }
}