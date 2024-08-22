import "./sidebar.scss";
import template from "./sidebar.html";

const SidebarComponent = {
  bindings: {
    cards: "=",
    loading: "="
  },
  controller,
  template
};

function controller(
  $location,
  $rootScope,
  $scope,
  $window,
  $timeout,
  mapService,
  textService,
  versionService
) {
  const vm = this;
  const uploadUrl =
    "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=";

  vm.highlight = null;
  vm.map = mapService.getMap();
  vm.text = textService.getTexts();
  vm.version = versionService.getVersion();

  vm.uploadExtra = uploadExtra;
  vm.currentPosition = currentPosition;
  vm.loadingPosition = loadingPosition;

  // init

  vm.$onInit = () => {
    $scope.$watch(
      () => vm.map.highlight,
      item => {
        if (!item) {
          return;
        }
        const selectedItem = vm.cards.filter(card => card.id === item.id)[0];
        vm.highlight = selectedItem.id;
        if (!item.stopScroll) {
          scrollToId(selectedItem);
        }
      }
    );
    const changeVersionListener = $rootScope.$on("changeVersion", () => {
      vm.version = versionService.getVersion();
    });
    $scope.$on("$destroy", () => changeVersionListener());
  };

  // functions

  function scrollToId(item) {
    // scroll around the card
    vm.topIndex = vm.cards.indexOf(item);
    // scroll top of the card to view
    $timeout(() => {
      const active = $window.document.querySelector('.ww-card-active');
      if (active) {
        active.scrollIntoView(true);
      }
    }, 50);
  }

  function uploadExtra() {
    const campaigns = {
      monuments: "wlm-pl"
    };
    const url = `${uploadUrl}${campaigns[vm.version]}`;
    $window.open(url, "_blank");
  }

  function currentPosition() {
    postionWaiting = true;
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition((position) => {
      // map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
      // console.log('pos:', position.coords);

      // zoom in, but only if zoomed out a lot
      const minZoom = 14;
      let zoom = minZoom;
      if (vm.map.center.zoom > minZoom) {
        zoom = vm.map.center.zoom;
      }
      // set center on the map scope
      vm.map.center = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
        zoom
      };
      // marker
      mapService.userPositionMarker(vm.map.center.lat, vm.map.center.lng);

      postionWaiting = false;
      $scope.$apply();
    }, (error) => {
      // eslint-disable-next-line no-console, angular/log
      console.error(error);
      postionWaiting = false;
    });
  }

  let postionWaiting = false;
  function loadingPosition() {
    return postionWaiting;
  }

}

export default () => {
  angular.module("app").component("wwSidebar", SidebarComponent);
};
