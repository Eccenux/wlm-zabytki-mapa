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
  mapService,
  textService,
  versionService
) {
  const vm = this;
  const uploadUrl =
    "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=";

  vm.highlight = null;
  vm.map = mapService.getMap();
  vm.text = textService.getTexts($location.search().lang || "pl");
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
    vm.topIndex = vm.cards.indexOf(item);
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
      vm.map.center = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
        zoom: 14
      };
      postionWaiting = false;
    }, (error) => {
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
