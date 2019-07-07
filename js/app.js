const searchInput= document.getElementById('search');
const macthingList= document.getElementById('matching-list');

// SEARCH in test.json and faire un filtre dessus
// function async
const searchPlaces = async searchField => {
  // renseigne toi sur le fetch en JS
  // et sur Async Await
  // mettre l'url sdans le fetch
  const result = await fetch("../data/test.json");
  // result retourne une promise
  const places = await result.json();
  console.log(places);
  // creattions d'un systeme de matching des mots (filtre)
  let matches = places.filter(place => {
    // création d'une regex selon le champ input field
    // 1 parametre de l'objet c'est ton champ
    // 2 paramètre c'est (g) global, et le (i)case and sensitive
    const regex = new RegExp(`^${searchField}`, `gi`);
    return place.name.match(regex) || place.abbr.match(regex);
  });

  // Condition si je n'ai plus de champ dans mon input alors je ne garde pas les resultats
  // Mais je vide mon tableau de list (matches)
  if (searchField.length === 0) {
    matches = [];
    macthingList.innerHTML = '';
  }

  outputHtml(matches);
};

// J'ai utilisé bootstap
// à toi de voir les class en material design pour afficher le contenu
// le symbole `` c'est du templating il te permet d'éviter de faire de la concatenation old school avec le +
// du coup tu ecris ton text et pour mettre ta vartiable il te suffit de faire ${mavariable}
const outputHtml = matches => {
   if (matches.length > 0) {
     const html = matches.map(match =>`
      <div class="card card-body mb1">
        <h4>${match.name} <span class="text-primary">${match.capital}</span></h4>
        <small>abbr: ${match.abbr}</small>
      </div>
      `);
   }
}

searchInput.addEventListener('input', () => searchPlaces(searchInput.value));
