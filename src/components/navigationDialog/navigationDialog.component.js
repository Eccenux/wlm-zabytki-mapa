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
  textService,
  $mdDialog
) {
  const vm = this;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  vm.text = textService.getTexts();

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
    vm.commonsUrl = data.commonsCategory && `https://commons.wikimedia.org/wiki/Category:${encodeURIComponent(data.commonsCategory)}`;
  }

  vm.getFormattedAddress = function() {
    prepareData();
    return vm.address;
  };
  vm.getFormattedLocation = function() {
    prepareData();
    return vm.location;
  };
  vm.getCommonsUrl = function() {
    prepareData();
    return vm.commonsUrl;
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
      alert(vm.text.LOCATION_SEEMS_INVALID);
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
    // $mdDialog.hide();
  }
}

export default () => {
  angular.module("app").component("navigationDialog", NavigationDialogComponent);
};
