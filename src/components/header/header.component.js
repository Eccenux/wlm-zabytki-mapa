import "./header.scss";
import template from "./header.html";

const HeaderComponent = {
  bindings: {},
  controller,
  template
};

function controller(
  $rootScope,
  $timeout,
  dataService,
  mapService,
  textService,
  versionService
) {
  const vm = this;
  const map = mapService.getMap();

  vm.searchInput = null;
  vm.searchResults = null;
  vm.text = textService.getTexts();

  vm.changeVersion = changeVersion;
  vm.clearSearch = clearSearch;
  vm.activateSearch = activateSearch;
  vm.deactivateSearch = deactivateSearch;
  vm.search = search;
  vm.showOnMap = showOnMap;

  // functions

  function changeVersion(version) {
    versionService.setVersion(version);
    $rootScope.$emit("changeVersion");
  }

  function clearSearch() {
    vm.searchInput = null;
    vm.searchResults = null;
  }
  function activateSearch() {
    document.body.classList.add('search-wasactive');
  }
  function deactivateSearch() {
    // document.body.classList.remove('search-active');
  }

  function search() {
    if (!vm.searchInput) {
      vm.searchResults = null;
      return;
    }
    dataService.getCity(vm.searchInput).then(data => {
      vm.searchResults = data.data.map(result => {
        const name = result.display_name.split(", ")[0];
        return {
          name,
          details: result.display_name.substring(name.length + 1),
          lat: result.lat,
          lon: result.lon
        };
      });
    });
  }

  function showOnMap(place) {
    map.center = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      zoom: 14
    };
    vm.searchResults = null;
  }
}

export default () => {
  angular.module("app").component("wwHeader", HeaderComponent);
};
