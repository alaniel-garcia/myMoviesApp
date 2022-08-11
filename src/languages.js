
let language = navigator.language;

let lang;

function switchLanguage(lan = 'en'){
  language = lan;
  console.log(language)
}

if(language === 'es'){
  lang = {
    trending: 'Tendencias',
    discover: 'Descubrir',
    movie: 'Pelicula',
    search: 'Búsqueda',
    searchPath: 'Busqueda', 
    categories: 'Categorías',
    categoriesPath: 'Categorias',
    all: 'Todas',
    viewAll: 'Ver todas',
    completeView: 'Vista completa',
    noCoincidence: 'No hay coincidencias',
    home: 'Inicio',
    overview: 'Sinopsis',
    details: 'Detalles',
    similar: 'Similar',
    language: 'Idioma',
  };
}


export {
  language,
  lang,
  switchLanguage,
};
