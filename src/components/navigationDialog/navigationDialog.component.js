/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable no-alert */

/* global alert, navigator */

import "./navigationDialog.scss";
import template from "./navigationDialog.html";

const NavigationDialogComponent = {
  bindings: {
    monumentData: "=",
  },
  controller,
  template
};

function controller(
  $window,
  $mdDialog
) {
  const vm = this;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // console.log('[nav.con]', vm.monumentData);
  // // React to changes in bindings
  // vm.$onChanges = function (changes) {
  //   console.log('[nav.con]', 'onchanged:', {monumentData:vm.monumentData, changes});
  // };
  let prepareDone = false;
  function prepareData() {
    if (prepareDone) {
      return;
    }
    prepareDone = true;
    const data = vm.monumentData;
    vm.address = data.town + (data.address ? `, ${data.address}` : '');
    vm.location = `${data.lat}, ${data.lon}`;
  }

  vm.getFormattedAddress = function() {
    prepareData();
    return vm.address;
  };
  vm.getFormattedLocation = function() {
    prepareData();
    return vm.location;
  };

  vm.navigateToAddress = function () {
    const address = vm.address.replace(/\s+/, '');
    let url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    openUrl(url);
  };

  vm.navigateToLocation = function () {
    // Location should be in the format "latitude,longitude"
    const location = vm.location.replace(/\s+/, '');
  
    // Check if location is properly formatted
    if (!location || !/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(location)) {
      // eslint-disable-next-line angular/log, no-console
      console.error('Invalid location format:', location);
      // TODO: i18n
      alert("Location seems invalid.");
      return;
    }
  
    // Use lat,lon link for mobile
    // Use Google Maps for desktop
    let url;
    if (isMobile) {
      url = `geo:${location}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${location}`;
    }
    openUrl(url)
  };

  vm.closeDialog = function () {
    $mdDialog.hide();
  };

  function openUrl(url) {
    // Open the URL in a new tab/window
    $window.open(url, '_blank');
  
    // Close the dialog
    $mdDialog.hide();
  }
}

export default () => {
  angular.module("app").component("navigationDialog", NavigationDialogComponent);
};
