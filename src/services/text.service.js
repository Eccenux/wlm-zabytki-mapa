const TextService = $location => {
  const texts = {
    pl: {
      INIT: "Wczytywanie mapy",
      SEARCH_PLACEHOLDER: "Wpisz miejscowość, np. Wrocław",
      HEADER_NATURE: "Przyroda",
      HEADER_MONUMENTS: "Zabytki",
      HEADER_ART: "Sztuka",
      SHOW_CURRENT_LOCATION: "Pokaż bieżącą lokalizację",
      SIDEBAR_ZOOM_IN: "Przybliż mapę, aby pobrać obiekty",
      SIDEBAR_DRAG_SEARCH: "Ładuj zabytki przy przesuwaniu mapy",
      SIDEBAR_CLICK_MAP_TO_GET: "Kliknij na mapę, aby pobrać obiekty",
      SIDEBAR_NO_OBJECTS: "Brak obiektów na tym obszarze",
      SIDEBAR_IMAGE_OUT_OF_LIST_LABEL: "Inny zabytek",
      SIDEBAR_IMAGE_OUT_OF_LIST_TITLE: "Prześlij zdjęcie zabytku spoza listy",
      CARD_NO_NAME: "brak nazwy",
      CARD_WAYSIDE_SHRINE: "kapliczka",
      CARD_MEMORIAL: "pomnik",
      CARD_MONUMENT: "pomnik",
      CARD_WAYSIDE_CROSS: "krzyż przydrożny",
      CARD_ARTWORK: "dzieło sztuki",
      CARD_NATURE_RESERVE: "rezerwat przyrody",
      CARD_LANDSCAPE_PARK: "park krajobrazowy",
      CARD_1: "obszar specjalnej ochrony ptaków",
      CARD_2: "specjalny obszar ochrony siedlisk",
      CARD_NATIONAL_PARK: "park narodowy",
      CARD_3: "zespół przyrodniczo-krajobrazowy",
      CARD_NATURE_MONUMENT: "pomnik przyrody",
      CARD_MORE_INFO: "Więcej",
      CARD_UPLOAD: "Prześlij",
      ADDRESS: "Adres",
      LOCATION: "Lokalizacja",
      SELECT_NAVIGATION_METHOD: "Wybierz metodę nawigacji:",
      USE_ADDRESS: "Użyj adresu",
      USE_LOCATION: "Użyj lokalizacji",
      EXTERNAL_LINKS: "Linki zewnętrzne:",
      WIKIDATA: "Wikidane",
      WIKIMEDIA_COMMONS: "Wikimedia Commons",
      CLOSE: "Zamknij",
      LOCATION_SEEMS_INVALID: "Lokalizacja tego obiektu wydaje się nieprawidłowa (do poprawy na WD?). Zgłoś ten problem, dzięki.",
    },
    en: {
      INIT: "Initializing map",
      SEARCH_PLACEHOLDER: "Type town or village name, e.g., Wrocław",
      HEADER_NATURE: "Nature",
      HEADER_MONUMENTS: "Monuments",
      HEADER_ART: "Public art",
      SHOW_CURRENT_LOCATION: "Show current location",
      SIDEBAR_ZOOM_IN: "Zoom in to load objects",
      SIDEBAR_DRAG_SEARCH: "Load monuments when dragging the map",
      SIDEBAR_CLICK_MAP_TO_GET: "Click on the map to load objects",
      SIDEBAR_NO_OBJECTS: "No objects in this area",
      SIDEBAR_IMAGE_OUT_OF_LIST_LABEL: "Other monument",
      SIDEBAR_IMAGE_OUT_OF_LIST_TITLE: "Send an image of a monument not listed",
      CARD_NO_NAME: "No name",
      CARD_WAYSIDE_SHRINE: "Wayside shrine",
      CARD_MEMORIAL: "Memorial",
      CARD_MONUMENT: "Monument",
      CARD_WAYSIDE_CROSS: "Wayside cross",
      CARD_ARTWORK: "Public artwork",
      CARD_NATURE_RESERVE: "Nature reserve",
      CARD_LANDSCAPE_PARK: "Landscape park",
      CARD_1: "Special Protection Area for birds",
      CARD_2: "Special Area of Conservation",
      CARD_NATIONAL_PARK: "National park",
      CARD_3: "Nature and landscape complex",
      CARD_NATURE_MONUMENT: "Natural monument",
      CARD_MORE_INFO: "More",
      CARD_UPLOAD: "Upload",
      ADDRESS: "Address",
      LOCATION: "Location",
      SELECT_NAVIGATION_METHOD: "Select a navigation method:",
      USE_ADDRESS: "Use address",
      USE_LOCATION: "Use location",
      EXTERNAL_LINKS: "External links:",
      WIKIDATA: "Wikidata",
      WIKIMEDIA_COMMONS: "Wikimedia Commons",
      CLOSE: "Close",
      LOCATION_SEEMS_INVALID: "Location of this object seems invalid.",
    }
  };

  const service = {
    getText,
    getTexts
  };
  return service;

  // functions

  function getText(lang, text) {
    return texts[lang] ? texts[lang][text] : texts.en[text];
  }

  function getTexts(code) {
    const lang = code || $location.search().lang || "pl";
    return texts[lang];
  }
};

export default () => {
  angular.module("app").factory("textService", TextService);
};
