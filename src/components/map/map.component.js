/* global L */
import "./map.scss";
import template from "./map.html";

const MapComponent = {
  bindings: {
    loading: "=",
    cards: "="
  },
  controller,
  template
};

function controller(
  $scope,
  $http,
  $location,
  $q,
  $rootScope,
  $timeout,
  dataService,
  leafletData,
  mapService,
  versionService
) {
  const vm = this;
  let canceler = $q.defer();
  let version = "monuments";

  vm.dragSearch = true;
  vm.events = {};
  vm.map = mapService.getMap();
  vm.mapBounds = null;

  vm.changeVersion = changeVersion;

  // init

  vm.$onInit = () => {
    vm.loading.active += 1;

    $timeout(() => {
      vm.loading.active -= 1;
      leafletData.getMap().then(map => {
        map.invalidateSize();
        map.on("moveend", () => {
          if (vm.loading.dragSearch) {
            $timeout(() => {
              getObjects();
            }, 100);
          }
        });
        map.on("dragstart zoomstart", () => {
          canceler.resolve();
        });
        map.on("click", event => {
          if (version === "nature") {
            const coords = event.latlng;
            $timeout(() => {
              getNature(coords);
            });
          }
        });

        // replace invalid boundaries
        // (vm.mapBounds is too small onload... sometimes)
        const b = map.getBounds();
        const ne = b.getNorthEast();
        const sw = b.getSouthWest();
        // debugger;
        vm.mapBounds.northEast.lat = ne.lat;
        vm.mapBounds.northEast.lng = ne.lng;
        vm.mapBounds.southWest.lat = sw.lat;
        vm.mapBounds.southWest.lng = sw.lng;
        getObjects();
      });
    }, 100);

    $scope.$on("leafletDirectiveMarker.click", (event, args) => {
      const element = args.model.data;
      vm.map.highlight = element; // allow watching and using selected monument in other components
    
      // dot under current marker
      mapService.selectMarker(element.lat, element.lon);
    });
    
    $scope.$on("centerUrlHash", (event, centerHash) => {
      const old = $location.search();
      $location.search(angular.extend(old, { c: centerHash }));
    });

    const changeVersionListener = $rootScope.$on("changeVersion", () => {
      version = versionService.getVersion();
      changeVersion();
    });
    $scope.$on("$destroy", () => changeVersionListener());
  };

  // functions

  function changeVersion() {
    vm.cards = [];
    const isNature = version === "nature";
    mapService.clearMarkers();
    mapService.showNature(isNature);
    getObjects();
  }

  function getObjects() {
    if (vm.map.center.zoom < 12 || !vm.map.center) {
      vm.cards = [];
      mapService.clearMarkers();
      vm.map.highlight = "";
      return;
    }

    if (version === "monuments") {
      getMonuments();
    } else if (version === "art") {
      getArt();
    }
  }

  function getNature(coords) {
    vm.loading.active += 1;
    dataService.getNature(coords).then(data => {
      const cards = data.data.map(element => ({
        name: element.info.name || element.info.obiekt,
        id: element.info.kodinspire,
        type: element.layer
      }));

      vm.cards = cards;
      vm.loading.active -= 1;
      vm.map.highlight = "";
    });
  }

  function getArt() {
    if (vm.map.forceMapState) {
      vm.map.forceMapState = false;
      return;
    }

    vm.loading.active += 1;
    canceler.resolve();
    canceler = $q.defer();

    dataService
      .getArt(vm.mapBounds, {
        //  timeout: canceler.promise,
      })
      .then(
        data => {
          vm.loading.active -= 1;
          vm.cards = data.data.elements;
          mapService.clearMarkers();
          vm.map.highlight = "";

          data.data.elements.forEach(element => {
            vm.map.markers[element.id] = getMarker(element);
          });
        },
        () => {
          vm.loading.active -= 1;
          vm.cards = [];
        }
      );
  }

  function getMonuments() {
    if (vm.map.forceMapState) {
      vm.map.forceMapState = false;
      return;
    }

    vm.loading.active += 1;
    canceler.resolve();
    canceler = $q.defer();

    dataService
      .getMonuments(vm.mapBounds, {
        //  timeout: canceler.promise,
      })
      .then(
        data => {
          vm.loading.active -= 1;
          const cards = transformMonuments(data.data.results, vm.mapBounds);
          vm.cards = cards || [];
          mapService.clearMarkers();
          vm.map.highlight = "";

          if (!data) {
            return;
          }
          cards.forEach(element => {
            vm.map.markers[element.id] = getMarker(element);
          });
        },
        () => {
          vm.loading.active -= 1;
          vm.cards = [];
        }
      )
    ;
  }

  /**
   * Transforms API data for the card component.
   * @param {Object} results Successful results of API call.
   * @param {Object} bounds Map rectangle corners.
   * @returns Data for src\components\card\card.html
   */
  function transformMonuments(results, bounds) {
    // console.log(results.bindings.map(o=>JSON.stringify(o.image)));
    // console.log(results);
    const llBounds = L.latLngBounds(bounds.southWest, bounds.northEast);
    const cards = results.bindings
            .map(object => {
              const coord = object.coord.value
                .replace("Point(", "")
                .replace(")", "")
                .split(" ")
              ;

              return {
                id: object.item.value.substring(32),
                name: object.itemLabel ? object.itemLabel.value : undefined,
                lat: +coord[1],
                lon: +coord[0],
                image: object.image
                  ? object.image.value.substring(51)
                  : undefined,
                // icon (marker) type
                type: object.image ? 'done' : 'missing',
                town: object.townLabel ? object.townLabel.value : undefined,
                address: object.address ? object.address.value : undefined,
                inspireId: object.inspireId ? object.inspireId.value : undefined,
                // monumnet's category in Commons (P373 on Q)
                category: object.category ? object.category.value : undefined,
                // P373 of a town
                category2: object.townCategory
                  ? object.townCategory.value
                  : undefined,
                // P373 of an administrative region
                category3: object.adminCategory
                  ? object.adminCategory.value
                  : undefined
              };
            })
            // filter out duplicates (same Q)
            .filter(
              (element, index, array) =>
                array.findIndex(t => t.id === element.id) === index
            )
            // filter out elements outside of current viewport
            .filter(
              (element) =>
                llBounds.contains({lat:element.lat, lon:element.lon})
            )
            .sort(sortMonuments)
    ;
    return cards;
  }

  /**
   * Sort function for transformed monuments.
   * @returns 1/-1/0
   */
  function sortMonuments(a, b) {
    const aHasImage = typeof a.image === 'string';
    const bHasImage = typeof b.image === 'string';
    if ((aHasImage && bHasImage) || (!aHasImage && !bHasImage)) {
        const name = (o) => `${o.town ? o.town : 'żż'}, ${o.name ? o.name : ''}`;
        const aName = name(a);
        const bName = name(b);
        return aName.localeCompare(bName);
    }
    if (aHasImage) {
      return 1;
    }
    return bHasImage ? -1 : 0;
  }

  /**
   * Create data for an angular map marker.
   * 
   * Note that although this creates `L.marker` the object is different.
   * 
   * @param {Object} element Monument data.
   * @returns Angular marker object.
   */
  function getMarker(element) {
    const iconOptions = {type:0};
    if (element.type === 'missing') {
      iconOptions.type = 1;
    }
    const marker = {
      data: element,
      lat: element.lat,
      lng: element.lon,
      layer: element.type === 'missing' ? "pinsMissing" : "pins",
      icon: mapService.getMapIcon(iconOptions),
    };
    return marker;
  }
}

export default () => {
  angular.module("app").component("wwMap", MapComponent);
};
