(() => {
    "use strict";
    var deferred, __webpack_modules__ = {
        604: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            var node_modules_angular = __webpack_require__(789), angular_default = __webpack_require__.n(node_modules_angular), leaflet_src = (__webpack_require__(993), 
            __webpack_require__(541)), leaflet_src_default = __webpack_require__.n(leaflet_src), injectStylesIntoStyleTag = (__webpack_require__(625), 
            __webpack_require__(536), __webpack_require__(589), __webpack_require__(696), __webpack_require__(325), 
            __webpack_require__(556), __webpack_require__(292)), injectStylesIntoStyleTag_default = __webpack_require__.n(injectStylesIntoStyleTag), styleDomAPI = __webpack_require__(893), styleDomAPI_default = __webpack_require__.n(styleDomAPI), insertBySelector = __webpack_require__(383), insertBySelector_default = __webpack_require__.n(insertBySelector), setAttributesWithoutAttributes = __webpack_require__(884), setAttributesWithoutAttributes_default = __webpack_require__.n(setAttributesWithoutAttributes), insertStyleElement = __webpack_require__(88), insertStyleElement_default = __webpack_require__.n(insertStyleElement), styleTagTransform = __webpack_require__(997), styleTagTransform_default = __webpack_require__.n(styleTagTransform), style = __webpack_require__(363), options = {};
            options.styleTagTransform = styleTagTransform_default(), options.setAttributes = setAttributesWithoutAttributes_default(), 
            options.insert = insertBySelector_default().bind(null, "head"), options.domAPI = styleDomAPI_default(), 
            options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(style.A, options);
            style.A && style.A.locals && style.A.locals;
            var card = __webpack_require__(209), card_options = {};
            card_options.styleTagTransform = styleTagTransform_default(), card_options.setAttributes = setAttributesWithoutAttributes_default(), 
            card_options.insert = insertBySelector_default().bind(null, "head"), card_options.domAPI = styleDomAPI_default(), 
            card_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(card.A, card_options);
            card.A && card.A.locals && card.A.locals;
            const CardComponent = {
                bindings: {
                    data: "=",
                    text: "="
                },
                controller: function($timeout, $window, $mdDialog, mapService, versionService, dataService) {
                    const vm = this, uploadUrl = "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=";
                    function getArtUploadUrl() {
                        const description = vm.data.tags.name || "", category = {
                            CARD_WAYSIDE_SHRINE: "Wayside shrines in Poland",
                            CARD_MEMORIAL: "Monuments and memorials in Poland",
                            CARD_MONUMENT: "Monuments and memorials in Poland",
                            CARD_WAYSIDE_CROSS: "Wayside crosses in Poland",
                            CARD_ARTWORK: "Sculptures in Poland"
                        }[vm.artType()] || "";
                        let url = uploadUrl;
                        return url += "wikiwakacje-s&descriptionlang=pl", url += `&description=${description}&categories=${category}&id=${vm.data.id}`, 
                        url += `&lat=${vm.data.lat}&lon=${vm.data.lon}`, url;
                    }
                    function getNatureUploadUrl() {
                        const type = vm.text[vm.natureTypes[vm.data.type]], description = `${type[0].toUpperCase()}${type.substring(1)}: ${vm.data.name}`, category = {
                            Rezerwaty: `Nature reserve ${vm.data.name}`,
                            ParkiKrajobrazowe: vm.data.name,
                            ObszarySpecjalnejOchrony: vm.data.name,
                            SpecjalneObszaryOchrony: vm.data.name,
                            ParkiNarodowe: vm.data.name,
                            ZespolyPrzyrodniczoKrajobrazowe: vm.data.name,
                            PomnikiPrzyrody: "Natural monuments in Poland"
                        }[vm.data.type];
                        let url = uploadUrl;
                        return url += "wikiwakacje-n&descriptionlang=pl", url += `&description=${description}&categories=${category}&id=${vm.data.id}`, 
                        url += `&lat=${dataService.getLastCoord().lat}&lon=${dataService.getLastCoord().lng}`, 
                        url;
                    }
                    vm.map = mapService.getMap(), vm.showNatureDetails = function(data) {
                        $window.open(`http://crfop.gdos.gov.pl/CRFOP/widok/viewfop.jsf?fop=${data.id}`, "_blank");
                    }, vm.showOnMap = function() {
                        vm.map.highlight = angular.extend({}, vm.data, {
                            stopScroll: !0
                        }), vm.map.forceMapState = !0, $timeout((() => {
                            vm.map.center = {
                                lat: vm.data.lat,
                                lng: vm.data.lon,
                                zoom: vm.map.center.zoom < 17 ? 17 : vm.map.center.zoom
                            };
                            const element = vm.data;
                            mapService.selectMarker(element.lat, element.lon);
                        }));
                    }, vm.upload = function() {
                        let url = null;
                        "monuments" === vm.version() ? url = function() {
                            const description = [ vm.data.town, vm.data.name ].join(", ");
                            let categories = vm.data.category;
                            categories || (categories = `${vm.data.category2 || vm.data.category3 || ""}`, categories.length ? categories += "|Cultural heritage monuments in Poland" : categories = "Cultural heritage monuments in Poland");
                            let url = uploadUrl;
                            return url += "wlm-pl&descriptionlang=pl", url += `&description=${encodeURIComponent(description)}&categories=${encodeURIComponent(categories)}&id=Q${vm.data.id}`, 
                            url += `&lat=${encodeURIComponent(vm.data.lat)}&lon=${encodeURIComponent(vm.data.lon)}`, 
                            url;
                        }() : "nature" === vm.version() ? url = getNatureUploadUrl() : "art" === vm.version() && (url = getArtUploadUrl()), 
                        $window.open(url, "_blank");
                    }, vm.openNavigationDialog = function(monumentData) {
                        $mdDialog.show({
                            template: '<navigation-dialog monument-data="$ctrl.monumentData"></navigation-dialog>',
                            locals: {
                                monumentData
                            },
                            controller: function() {
                                this.monumentData = monumentData;
                            },
                            controllerAs: "$ctrl",
                            bindToController: !0,
                            clickOutsideToClose: !0
                        });
                    }, vm.version = () => versionService.getVersion(), vm.artTypes = {
                        wayside_shrine: "CARD_WAYSIDE_SHRINE",
                        memorial: "CARD_MEMORIAL",
                        monument: "CARD_MONUMENT",
                        cross: "CARD_WAYSIDE_CROSS",
                        artwork: "CARD_ARTWORK"
                    }, vm.natureTypes = {
                        Rezerwaty: "CARD_NATURE_RESERVE",
                        ParkiKrajobrazowe: "CARD_LANDSCAPE_PARK",
                        ObszarySpecjalnejOchrony: "CARD_1",
                        SpecjalneObszaryOchrony: "CARD_2",
                        ParkiNarodowe: "CARD_NATIONAL_PARK",
                        ZespolyPrzyrodniczoKrajobrazowe: "CARD_3",
                        PomnikiPrzyrody: "CARD_NATURE_MONUMENT"
                    }, vm.artType = () => {
                        if (vm.data.tags) {
                            const tag = vm.data.tags.historic || vm.data.tags.man_made || vm.data.tags.tourism;
                            return tag ? vm.artTypes[tag] : "?";
                        }
                        return "";
                    };
                },
                template: '<md-card\r\n  class="ww-card"\r\n  ng-class="{ \'ww-card--link\' : $ctrl.version() === \'monuments\' || $ctrl.version() === \'art\' }"\r\n  ng-click="($ctrl.version() === \'monuments\' || $ctrl.version() === \'art\') ? $ctrl.showOnMap() : false"\r\n>\r\n  <md-card-title-media\r\n    class="ww-card__image"\r\n    layout="column"\r\n    layout-align="center center"\r\n    flex="none"\r\n  >\r\n    <a\r\n      class="md-media-sm"\r\n      layout="row"\r\n      layout-align="center center"\r\n      ng-if="$ctrl.data.image"\r\n      ng-click="$event.stopPropagation()"\r\n      ng-href="https://commons.wikimedia.org/wiki/File:{{ $ctrl.data.image }}"\r\n      target="_blank" rel="noopener"\r\n    >\r\n      <img\r\n        class="card-photo"\r\n        ng-src="https://commons.wikimedia.org/w/thumb.php?f={{$ctrl.data.image}}&w=200"\r\n      />\r\n    </a>\r\n    <div class="md-media-sm" ng-if="!$ctrl.data.image"></div>\r\n  </md-card-title-media>\r\n  <md-card-title-text\r\n    flex\r\n    layout="column"\r\n    layout-align="start start"\r\n    ng-if="$ctrl.version() === \'art\'"\r\n  >\r\n    <span class="ww-card__title">\r\n      {{ $ctrl.data.tags.name || $ctrl.text.CARD_NO_NAME }}\r\n    </span>\r\n    <span class="md-subhead"> {{ $ctrl.text[$ctrl.artType()] }} </span>\r\n  </md-card-title-text>\r\n\r\n  <md-card-title-text\r\n    flex\r\n    layout="column"\r\n    layout-align="start start"\r\n    ng-if="$ctrl.version() === \'monuments\'"\r\n  >\r\n    <span class="ww-card__title"> {{ $ctrl.data.name }} </span>\r\n    <span class="md-subhead"\r\n      ng-click="$ctrl.openNavigationDialog($ctrl.data)"\r\n    >\r\n      {{ $ctrl.data.town }}<span ng-if="$ctrl.data.address">{{ \', \' + $ctrl.data.address }}</span>\r\n    </span>\r\n    \x3c!-- <md-icon>navigation</md-icon> --\x3e\r\n  </md-card-title-text>\r\n\r\n  <md-card-title-text\r\n    flex\r\n    layout="column"\r\n    layout-align="start start"\r\n    ng-if="$ctrl.version() === \'nature\'"\r\n  >\r\n    <span class="ww-card__title"> {{ $ctrl.data.name }} </span>\r\n    <span class="md-subhead">\r\n      {{ $ctrl.text[$ctrl.natureTypes[$ctrl.data.type]] }}\r\n    </span>\r\n    <small>(ID: {{ $ctrl.data.id || "?" }})</small>\r\n  </md-card-title-text>\r\n\r\n  <div class="buttons-group">\r\n    <md-button\r\n      ng-click="$ctrl.openNavigationDialog($ctrl.data)"\r\n      ng-if="$ctrl.version() === \'monuments\' && $ctrl.data.id"\r\n    >\r\n      <md-icon>info</md-icon>\r\n      <md-icon>navigation</md-icon>\r\n      {{ ::$ctrl.text.CARD_MORE_INFO }}\r\n    </md-button>\r\n\r\n    <md-button\r\n      ng-click="$ctrl.showNatureDetails($ctrl.data); $event.stopPropagation()"\r\n      ng-if="$ctrl.version() === \'nature\' && $ctrl.data.id"\r\n    >\r\n      <md-icon>info</md-icon>\r\n      {{ ::$ctrl.text.CARD_MORE_INFO }}\r\n    </md-button>\r\n\r\n    <md-button\r\n      class="ww-card__upload"\r\n      ng-click="$ctrl.upload(); $event.stopPropagation()"\r\n    >\r\n      <md-icon>file_upload</md-icon>\r\n      {{ ::$ctrl.text.CARD_UPLOAD }}\r\n    </md-button>\r\n  </div>\r\n</md-card>\r\n'
            };
            var navigationDialog = __webpack_require__(457), navigationDialog_options = {};
            navigationDialog_options.styleTagTransform = styleTagTransform_default(), navigationDialog_options.setAttributes = setAttributesWithoutAttributes_default(), 
            navigationDialog_options.insert = insertBySelector_default().bind(null, "head"), 
            navigationDialog_options.domAPI = styleDomAPI_default(), navigationDialog_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(navigationDialog.A, navigationDialog_options);
            navigationDialog.A && navigationDialog.A.locals && navigationDialog.A.locals;
            const NavigationDialogComponent = {
                bindings: {
                    monumentData: "="
                },
                controller: function($window, textService, $mdDialog) {
                    const vm = this, isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    vm.text = textService.getTexts();
                    let prepareDone = !1;
                    function prepareData() {
                        if (prepareDone) return;
                        prepareDone = !0;
                        const data = vm.monumentData;
                        vm.address = data.town + (data.address ? `, ${data.address}` : ""), vm.location = `${data.lat}, ${data.lon}`, 
                        vm.commonsUrl = data.commonsCategory && `https://commons.wikimedia.org/wiki/Category:${encodeURIComponent(data.commonsCategory)}`;
                    }
                    function openUrl(url) {
                        $window.open(url, "_blank");
                    }
                    vm.getFormattedAddress = function() {
                        return prepareData(), vm.address;
                    }, vm.getFormattedLocation = function() {
                        return prepareData(), vm.location;
                    }, vm.getCommonsUrl = function() {
                        return prepareData(), vm.commonsUrl;
                    }, vm.navigateToAddress = function() {
                        openUrl(`https://www.google.com/maps/search/?api=1&query=${vm.address.replace(/\s+/, "")}`);
                    }, vm.navigateToLocation = function() {
                        const location = vm.location.replace(/\s+/, "");
                        if (!location || !/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(location)) return console.error("Invalid location format:", location), 
                        void alert(vm.text.LOCATION_SEEMS_INVALID);
                        let url;
                        url = isMobile ? `geo:${location}` : `https://www.google.com/maps/search/?api=1&query=${location}`, 
                        openUrl(url);
                    }, vm.closeDialog = function() {
                        $mdDialog.hide();
                    };
                },
                template: '\x3c!--\r\n  Dialog template for details and navigation.\r\n\r\n  Navigation meaning open external map (map apps or services).\r\n--\x3e\r\n<md-dialog class="navigation-dialog">\r\n  <md-dialog-content>\r\n    <md-card-title-text>\r\n      <h2>{{ $ctrl.monumentData.name }}</h2>\r\n    </md-card-title-text>\r\n\r\n    <p>{{ ::$ctrl.text.ADDRESS }}: {{ $ctrl.getFormattedAddress() }}<br>\r\n      {{ ::$ctrl.text.LOCATION }}: {{ $ctrl.getFormattedLocation() }}</p>\r\n\r\n      \x3c!--\r\n        Wincyj info!!!\r\n\r\n        getWikidataDetails()\r\n        - plwikiArticle -> link: <a href=url>title</a>\r\n        - wikis -> liczba artykułów w wipediach (odfitrować nie-wikipedie e.g. commonswiki)\r\n        - wikis -> linki: enwiki, dewiki, frwiki?\r\n        - inspireId -> zabytek.pl\r\n        - show: polishHeritageNumber, buildDate\r\n        - commonsCategory -> link do commons\r\n        - commonsCategory -> mini galeria?\r\n      --\x3e\r\n\r\n    <div class="buttons-group">\r\n      <div class="group-label">{{ ::$ctrl.text.SELECT_NAVIGATION_METHOD }}</div>\r\n      <md-button class="md-primary" ng-click="$ctrl.navigateToAddress()" title="{{ $ctrl.getFormattedAddress() }}">\r\n        <md-icon>contact_mail</md-icon>\r\n        {{ ::$ctrl.text.USE_ADDRESS }}\r\n      </md-button>\r\n      <md-button class="md-primary" ng-click="$ctrl.navigateToLocation()" title="{{ $ctrl.getFormattedLocation() }}">\r\n        <md-icon>pin_drop</md-icon>\r\n        {{ ::$ctrl.text.USE_LOCATION }}\r\n      </md-button>\r\n    </div>\r\n\r\n    <div class="buttons-group">\r\n      <div class="group-label">{{ ::$ctrl.text.EXTERNAL_LINKS }}</div>\r\n      <md-button \r\n        ng-href="https://www.wikidata.org/wiki/Q{{ $ctrl.monumentData.id }}?uselang=pl"\r\n        target="_blank" rel="noopener"\r\n      >\r\n        <md-icon>open_in_new</md-icon>\r\n        {{ ::$ctrl.text.WIKIDATA }}\r\n      </md-button>\r\n      <md-button \r\n        ng-href="https://zabytek.pl/pl/szukaj?szukaj={{ $ctrl.monumentData.inspireId }}"\r\n        ng-if="$ctrl.monumentData.inspireId"\r\n        target="_blank" rel="noopener"\r\n      >\r\n        <md-icon>open_in_new</md-icon>\r\n        zabytek.pl\r\n      </md-button>\r\n      <md-button \r\n        ng-href="{{ $ctrl.getCommonsUrl() }}"\r\n        ng-if="$ctrl.monumentData.commonsCategory"\r\n        target="_blank" rel="noopener"\r\n      >\r\n        <md-icon>open_in_new</md-icon>\r\n        {{ ::$ctrl.text.WIKIMEDIA_COMMONS }}\r\n      </md-button>\r\n    </div>\r\n\r\n  </md-dialog-content>\r\n\r\n  <md-dialog-actions class="actions">\r\n    <md-button ng-click="$ctrl.closeDialog()">{{ ::$ctrl.text.CLOSE }}</md-button>\r\n  </md-dialog-actions>\r\n</md-dialog>\r\n'
            };
            var header = __webpack_require__(911), header_options = {};
            header_options.styleTagTransform = styleTagTransform_default(), header_options.setAttributes = setAttributesWithoutAttributes_default(), 
            header_options.insert = insertBySelector_default().bind(null, "head"), header_options.domAPI = styleDomAPI_default(), 
            header_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(header.A, header_options);
            header.A && header.A.locals && header.A.locals;
            const HeaderComponent = {
                bindings: {},
                controller: function($rootScope, $timeout, dataService, mapService, textService, versionService) {
                    const vm = this, map = mapService.getMap();
                    vm.searchInput = null, vm.searchResults = null, vm.text = textService.getTexts(), 
                    vm.changeVersion = function(version) {
                        versionService.setVersion(version), $rootScope.$emit("changeVersion");
                    }, vm.clearSearch = function() {
                        vm.searchInput = null, vm.searchResults = null;
                    }, vm.activateSearch = function() {
                        document.body.classList.add("search-wasactive");
                    }, vm.deactivateSearch = function() {}, vm.search = function() {
                        vm.searchInput ? dataService.getCity(vm.searchInput).then((data => {
                            vm.searchResults = data.data.map((result => {
                                const name = result.display_name.split(", ")[0];
                                return {
                                    name,
                                    details: result.display_name.substring(name.length + 1),
                                    lat: result.lat,
                                    lon: result.lon
                                };
                            }));
                        })) : vm.searchResults = null;
                    }, vm.showOnMap = function(place) {
                        map.center = {
                            lat: parseFloat(place.lat),
                            lng: parseFloat(place.lon),
                            zoom: 14
                        }, vm.searchResults = null;
                    };
                },
                template: '<md-toolbar class="md-hue-2 ww-header__main">\r\n  <div class="md-toolbar-tools" layout="row" layout-align="center center">\r\n    <a href="https://wikimedia.pl" class="wikimedia logo-link" target="_blank" rel="noopener">\r\n      <img\r\n        class="ww-header__logo img-long" crossorigin="anonymous"\r\n        src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Wikimedia_Polska_logo_white_horizontal.svg"\r\n        alt="Wikimedia Polska"\r\n      />\r\n      <img\r\n        class="ww-header__logo img-short" crossorigin="anonymous"\r\n        src="https://upload.wikimedia.org/wikipedia/commons/3/37/Wikimedia_logo_white.svg"\r\n        alt="Wikimedia Polska"\r\n      />\r\n    </a>\r\n    <a href="https://pl.wikipedia.org/wiki/Wikipedia:Wiki_Lubi_Zabytki" class="app-link logo-link" target="_blank" rel="noopener">\r\n      <img\r\n        class="ww-header__logo app-img-long" crossorigin="anonymous"\r\n        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Lusitana_WLM_WLZ_horizontal.svg"\r\n        alt="Wiki Lubi Zabytki"\r\n      />\r\n      <img\r\n        class="ww-header__logo app-img-short" crossorigin="anonymous"\r\n        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Wiki_Loves_Monuments_Logo_notext.svg"\r\n        alt="Wiki Lubi Zabytki"\r\n      />\r\n    </a>\r\n    <span flex></span>\r\n    <input\r\n      class="ww-header__search"\r\n      flex="66"\r\n      flex-xs="100"\r\n      type="text"\r\n      placeholder="{{ ::$ctrl.text.SEARCH_PLACEHOLDER }}"\r\n      ng-model="$ctrl.searchInput"\r\n      ng-change="$ctrl.search()"\r\n      ng-focus="$ctrl.search(); $ctrl.activateSearch()"\r\n      ng-blur="$ctrl.deactivateSearch()"\r\n      ng-model-options="{ debounce: 200 }"\r\n    />\r\n    <md-button\r\n      class="md-icon-button ww-header__search-clear"\r\n      ng-if="$ctrl.searchInput"\r\n      ng-click="$ctrl.clearSearch()"\r\n    >\r\n      <md-icon>close</md-icon>\r\n    </md-button>\r\n    <div class="ww-header__search-results">\r\n      <div\r\n        class="ww-header__search-result"\r\n        layout="column"\r\n        layout-align="start stretch"\r\n        ng-repeat="result in $ctrl.searchResults"\r\n        ng-click="$ctrl.showOnMap(result)"\r\n      >\r\n        <strong>{{ result.name }}</strong>\r\n        <small>{{ result.details }}</small>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</md-toolbar>\r\n<md-toolbar\r\n  class="md-hue-2 ww-header__buttons-toolbar"\r\n  layout="row"\r\n  layout-align="center center"\r\n  ng-if="false"\r\n>\r\n  <md-button\r\n    class="ww-header__button ww-header__button--nature"\r\n    flex="33"\r\n    ng-click="$ctrl.changeVersion(\'nature\')"\r\n  >\r\n    <md-icon hide-xs>cloud</md-icon>\r\n    <span>{{ ::$ctrl.text.HEADER_NATURE }}</span>\r\n  </md-button>\r\n  <md-button\r\n    class="ww-header__button ww-header__button--monuments"\r\n    flex="33"\r\n    ng-click="$ctrl.changeVersion(\'monuments\')"\r\n  >\r\n    <md-icon hide-xs>account_balance</md-icon>\r\n    <span>{{ ::$ctrl.text.HEADER_MONUMENTS }}</span>\r\n  </md-button>\r\n  <md-button\r\n    class="ww-header__button ww-header__button--art"\r\n    flex="33"\r\n    ng-click="$ctrl.changeVersion(\'art\')"\r\n  >\r\n    <md-icon hide-xs>extension</md-icon>\r\n    <span>{{ ::$ctrl.text.HEADER_ART }}</span>\r\n  </md-button>\r\n</md-toolbar>\r\n'
            };
            var main = __webpack_require__(183), main_options = {};
            main_options.styleTagTransform = styleTagTransform_default(), main_options.setAttributes = setAttributesWithoutAttributes_default(), 
            main_options.insert = insertBySelector_default().bind(null, "head"), main_options.domAPI = styleDomAPI_default(), 
            main_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(main.A, main_options);
            main.A && main.A.locals && main.A.locals;
            const MainComponent = {
                bindings: {},
                controller: function($location, $rootScope, $scope, $timeout, textService, versionService) {
                    const vm = this;
                    vm.cards = null, vm.loading = {}, vm.text = textService.getTexts(), vm.$onInit = () => {
                        vm.loading = {
                            active: 0,
                            map: !0,
                            dragSearch: !0
                        }, versionService.setVersion("monuments"), $timeout((() => {
                            vm.loading.map = !1;
                        }), 2e3);
                        const changeVersionListener = $rootScope.$on("changeVersion", (() => {
                            vm.cards = null;
                        }));
                        $scope.$on("$destroy", (() => changeVersionListener()));
                    };
                },
                template: '<ww-header></ww-header>\r\n\r\n<div\r\n  class="ww-container"\r\n  ng-if="!$ctrl.loading.map"\r\n>\r\n  <ww-sidebar\r\n    cards="$ctrl.cards"\r\n    loading="$ctrl.loading"\r\n  ></ww-sidebar>\r\n  <ww-map\r\n    ng-if="!$ctrl.loading.map"\r\n    cards="$ctrl.cards"\r\n    loading="$ctrl.loading"\r\n  ></ww-map>\r\n</div>\r\n\r\n<div class="ww-map--loading" ng-if="$ctrl.loading.map">\r\n  <div>\r\n    <div class="cssload-container">\r\n      <div class="cssload-speeding-wheel"></div>\r\n    </div>\r\n    <span class="md-headline">{{ ::$ctrl.text.INIT }}</span>\r\n  </div>\r\n</div>\r\n'
            };
            var map = __webpack_require__(67), map_options = {};
            map_options.styleTagTransform = styleTagTransform_default(), map_options.setAttributes = setAttributesWithoutAttributes_default(), 
            map_options.insert = insertBySelector_default().bind(null, "head"), map_options.domAPI = styleDomAPI_default(), 
            map_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(map.A, map_options);
            map.A && map.A.locals && map.A.locals;
            const MapComponent = {
                bindings: {
                    loading: "=",
                    cards: "="
                },
                controller: function($scope, $http, $location, $q, $rootScope, $timeout, dataService, leafletData, mapService, versionService) {
                    const vm = this;
                    let canceler = $q.defer(), version = "monuments";
                    function changeVersion() {
                        vm.cards = [];
                        const isNature = "nature" === version;
                        mapService.clearMarkers(), mapService.showNature(isNature), getObjects();
                    }
                    function getObjects() {
                        if (vm.map.center.zoom < 12 || !vm.map.center) return vm.cards = [], mapService.clearMarkers(), 
                        void (vm.map.highlight = "");
                        "monuments" === version ? function() {
                            if (vm.map.forceMapState) return void (vm.map.forceMapState = !1);
                            vm.loading.active += 1, canceler.resolve(), canceler = $q.defer(), dataService.getMonuments(vm.mapBounds, {}).then((data => {
                                vm.loading.active -= 1;
                                const cards = function(results, bounds) {
                                    const llBounds = L.latLngBounds(bounds.southWest, bounds.northEast), cards = results.bindings.map((object => {
                                        const coord = object.coord.value.replace("Point(", "").replace(")", "").split(" ");
                                        return {
                                            id: object.item.value.substring(32),
                                            name: object.itemLabel ? object.itemLabel.value : void 0,
                                            lat: +coord[1],
                                            lon: +coord[0],
                                            image: object.image ? object.image.value.substring(51) : void 0,
                                            type: object.image ? "done" : "missing",
                                            town: object.townLabel ? object.townLabel.value : void 0,
                                            address: object.address ? object.address.value : void 0,
                                            inspireId: object.inspireId ? object.inspireId.value : void 0,
                                            commonsCategory: object.commonsCategory ? object.commonsCategory.value : void 0,
                                            category: object.category ? object.category.value : void 0,
                                            category2: object.townCategory ? object.townCategory.value : void 0,
                                            category3: object.adminCategory ? object.adminCategory.value : void 0
                                        };
                                    })).filter(((element, index, array) => array.findIndex((t => t.id === element.id)) === index)).filter((element => llBounds.contains({
                                        lat: element.lat,
                                        lon: element.lon
                                    }))).sort(sortMonuments);
                                    return cards;
                                }(data.data.results, vm.mapBounds);
                                vm.cards = cards || [], mapService.clearMarkers(), vm.map.highlight = "", data && cards.forEach((element => {
                                    vm.map.markers[element.id] = getMarker(element);
                                }));
                            }), (() => {
                                vm.loading.active -= 1, vm.cards = [];
                            }));
                        }() : "art" === version && function() {
                            if (vm.map.forceMapState) return void (vm.map.forceMapState = !1);
                            vm.loading.active += 1, canceler.resolve(), canceler = $q.defer(), dataService.getArt(vm.mapBounds, {}).then((data => {
                                vm.loading.active -= 1, vm.cards = data.data.elements, mapService.clearMarkers(), 
                                vm.map.highlight = "", data.data.elements.forEach((element => {
                                    vm.map.markers[element.id] = getMarker(element);
                                }));
                            }), (() => {
                                vm.loading.active -= 1, vm.cards = [];
                            }));
                        }();
                    }
                    function sortMonuments(a, b) {
                        const aHasImage = "string" == typeof a.image, bHasImage = "string" == typeof b.image;
                        if (aHasImage && bHasImage || !aHasImage && !bHasImage) {
                            const name = o => `${o.town ? o.town : "żż"}, ${o.name ? o.name : ""}`, aName = name(a), bName = name(b);
                            return aName.localeCompare(bName);
                        }
                        return aHasImage ? 1 : bHasImage ? -1 : 0;
                    }
                    function getMarker(element) {
                        const iconOptions = {
                            type: 0
                        };
                        "missing" === element.type && (iconOptions.type = 1);
                        return {
                            data: element,
                            lat: element.lat,
                            lng: element.lon,
                            layer: "missing" === element.type ? "pinsMissing" : "pins",
                            icon: mapService.getMapIcon(iconOptions)
                        };
                    }
                    vm.dragSearch = !0, vm.events = {}, vm.map = mapService.getMap(), vm.mapBounds = null, 
                    vm.changeVersion = changeVersion, vm.$onInit = () => {
                        vm.loading.active += 1, $timeout((() => {
                            vm.loading.active -= 1, leafletData.getMap().then((map => {
                                map.invalidateSize(), map.on("moveend", (() => {
                                    vm.loading.dragSearch && $timeout((() => {
                                        getObjects();
                                    }), 100);
                                })), map.on("dragstart zoomstart", (() => {
                                    canceler.resolve();
                                })), map.on("click", (event => {
                                    if ("nature" === version) {
                                        const coords = event.latlng;
                                        $timeout((() => {
                                            !function(coords) {
                                                vm.loading.active += 1, dataService.getNature(coords).then((data => {
                                                    const cards = data.data.map((element => ({
                                                        name: element.info.name || element.info.obiekt,
                                                        id: element.info.kodinspire,
                                                        type: element.layer
                                                    })));
                                                    vm.cards = cards, vm.loading.active -= 1, vm.map.highlight = "";
                                                }));
                                            }(coords);
                                        }));
                                    }
                                }));
                                const b = map.getBounds(), ne = b.getNorthEast(), sw = b.getSouthWest();
                                vm.mapBounds.northEast.lat = ne.lat, vm.mapBounds.northEast.lng = ne.lng, vm.mapBounds.southWest.lat = sw.lat, 
                                vm.mapBounds.southWest.lng = sw.lng, getObjects();
                            }));
                        }), 100), $scope.$on("leafletDirectiveMarker.click", ((event, args) => {
                            const element = args.model.data;
                            vm.map.highlight = element, mapService.selectMarker(element.lat, element.lon);
                        })), $scope.$on("centerUrlHash", ((event, centerHash) => {
                            const old = $location.search();
                            $location.search(angular.extend(old, {
                                c: centerHash
                            }));
                        }));
                        const changeVersionListener = $rootScope.$on("changeVersion", (() => {
                            version = versionService.getVersion(), changeVersion();
                        }));
                        $scope.$on("$destroy", (() => changeVersionListener()));
                    };
                },
                template: '<leaflet\r\n  flex\r\n  markers="$ctrl.map.markers"\r\n  markers-watch-options="$ctrl.map.markersWatchOptions"\r\n  layers="$ctrl.map.layers"\r\n  center="$ctrl.map.center"\r\n  url-hash-center="yes"\r\n  event-broadcast="$ctrl.map.events"\r\n  bounds="$ctrl.mapBounds"\r\n>\r\n</leaflet>\r\n'
            };
            var sidebar = __webpack_require__(643), sidebar_options = {};
            sidebar_options.styleTagTransform = styleTagTransform_default(), sidebar_options.setAttributes = setAttributesWithoutAttributes_default(), 
            sidebar_options.insert = insertBySelector_default().bind(null, "head"), sidebar_options.domAPI = styleDomAPI_default(), 
            sidebar_options.insertStyleElement = insertStyleElement_default();
            injectStylesIntoStyleTag_default()(sidebar.A, sidebar_options);
            sidebar.A && sidebar.A.locals && sidebar.A.locals;
            const SidebarComponent = {
                bindings: {
                    cards: "=",
                    loading: "="
                },
                controller: function($location, $rootScope, $scope, $window, $timeout, mapService, textService, versionService) {
                    const vm = this;
                    vm.highlight = null, vm.map = mapService.getMap(), vm.text = textService.getTexts(), 
                    vm.version = versionService.getVersion(), vm.uploadExtra = function() {
                        const url = `https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=${{
                            monuments: "wlm-pl"
                        }[vm.version]}`;
                        $window.open(url, "_blank");
                    }, vm.currentPosition = function() {
                        postionWaiting = !0, navigator.geolocation.getCurrentPosition((position => {
                            let zoom = 14;
                            vm.map.center.zoom > 14 && (zoom = vm.map.center.zoom), vm.map.center = {
                                lat: parseFloat(position.coords.latitude),
                                lng: parseFloat(position.coords.longitude),
                                zoom
                            }, mapService.userPositionMarker(vm.map.center.lat, vm.map.center.lng), postionWaiting = !1, 
                            $scope.$apply();
                        }), (error => {
                            console.error(error), postionWaiting = !1;
                        }));
                    }, vm.loadingPosition = function() {
                        return postionWaiting;
                    }, vm.$onInit = () => {
                        $scope.$watch((() => vm.map.highlight), (item => {
                            if (!item) return;
                            const selectedItem = vm.cards.filter((card => card.id === item.id))[0];
                            vm.highlight = selectedItem.id, item.stopScroll || function(item) {
                                vm.topIndex = vm.cards.indexOf(item), $timeout((() => {
                                    const active = $window.document.querySelector(".ww-card-active");
                                    active && active.scrollIntoView(!0);
                                }), 50);
                            }(selectedItem);
                        }));
                        const changeVersionListener = $rootScope.$on("changeVersion", (() => {
                            vm.version = versionService.getVersion();
                        }));
                        $scope.$on("$destroy", (() => changeVersionListener()));
                    };
                    let postionWaiting = !1;
                },
                template: '<div\r\n  class="ww-cards--loading"\r\n  layout="column"\r\n  layout-align="center center"\r\n  ng-show="$ctrl.loading.active"\r\n>\r\n  <div class="cssload-container">\r\n    <div class="cssload-speeding-wheel"></div>\r\n  </div>\r\n</div>\r\n<div class="ww-cards" layout="column" layout-align="start stretch">\r\n  <div\r\n    class="ww-sidebar-info"\r\n    layout="column"\r\n    layout-align="center center"\r\n    ng-show="$ctrl.map.center.zoom < 12"\r\n  >\r\n    <md-icon>info_outline</md-icon>\r\n    <span class="md-headline">{{ ::$ctrl.text.SIDEBAR_ZOOM_IN }}</span>\r\n  </div>\r\n  <div\r\n    class="ww-sidebar-info"\r\n    layout="column"\r\n    layout-align="center center"\r\n    ng-show="$ctrl.version === \'nature\' && $ctrl.map.center.zoom >= 12"\r\n  >\r\n    <md-icon>warning</md-icon>\r\n    <span class="md-headline"\r\n      >{{ ::$ctrl.text.SIDEBAR_CLICK_MAP_TO_GET }}</span\r\n    >\r\n  </div>\r\n  <div\r\n    class="ww-sidebar-info"\r\n    layout="column"\r\n    layout-align="center center"\r\n    ng-show="($ctrl.cards && !$ctrl.cards.length) && $ctrl.map.center.zoom >= 12 && !$ctrl.loading.active"\r\n  >\r\n    <md-icon>warning</md-icon>\r\n    <span class="md-headline">{{ ::$ctrl.text.SIDEBAR_NO_OBJECTS }}</span>\r\n  </div>\r\n  <div\r\n    ng-show="$ctrl.map.center.zoom >= 12"\r\n    flex\r\n    layout="column"\r\n    layout-align="start stretch"\r\n  >\r\n    <md-virtual-repeat-container md-top-index="$ctrl.topIndex" flex>\r\n      <div md-virtual-repeat="card in $ctrl.cards">\r\n        <ww-card\r\n          class="ww-card-container"\r\n          ng-class="$ctrl.highlight == card.id ? \'ww-card-active\' : \'ww-card-inactive\'"\r\n          data-id="{{card.id}}"\r\n          data="card"\r\n          text="$ctrl.text"\r\n        ></ww-card>\r\n      </div>\r\n    </md-virtual-repeat-container>\r\n  </div>\r\n</div>\r\n\x3c!-- options before items are ready --\x3e\r\n<div class="ww-sidebar-options"\r\n    ng-show="!($ctrl.cards && $ctrl.cards.length)"\r\n>\r\n  <md-switch \r\n    ng-if="$ctrl.version !== \'nature\'"\r\n    ng-model="$ctrl.loading.dragSearch"\r\n    aria-label="{{ ::$ctrl.text.SIDEBAR_DRAG_SEARCH }}"\r\n  >{{ ::$ctrl.text.SIDEBAR_DRAG_SEARCH }}</md-switch>\r\n  <md-button\r\n    ng-click="$ctrl.currentPosition()"\r\n    ng-disabled="$ctrl.loadingPosition()"\r\n  >\r\n    <md-icon>my_location</md-icon>\r\n    {{ ::$ctrl.text.SHOW_CURRENT_LOCATION }}\r\n  </md-button>\r\n</div>\r\n\x3c!-- options after items  --\x3e\r\n<div class="ww-sidebar-options"\r\n    ng-show="($ctrl.cards && $ctrl.cards.length)"\r\n>\r\n  <md-switch \r\n    ng-if="$ctrl.version !== \'nature\'"\r\n    ng-model="$ctrl.loading.dragSearch"\r\n    aria-label="{{ ::$ctrl.text.SIDEBAR_DRAG_SEARCH }}"\r\n  >{{ ::$ctrl.text.SIDEBAR_DRAG_SEARCH }}</md-switch>\r\n  <div class="ww-button-group">\r\n    <md-button\r\n      ng-click="$ctrl.uploadExtra()"\r\n      title="{{ ::$ctrl.text.SIDEBAR_IMAGE_OUT_OF_LIST_TITLE }}">\r\n      <md-icon>file_upload</md-icon>\r\n      {{ ::$ctrl.text.SIDEBAR_IMAGE_OUT_OF_LIST_LABEL }}\r\n    </md-button>\r\n    <md-button\r\n      ng-click="$ctrl.currentPosition()"\r\n      ng-disabled="$ctrl.loadingPosition()"\r\n      title="{{ ::$ctrl.text.SHOW_CURRENT_LOCATION }}"\r\n    >\r\n      <md-icon>my_location</md-icon>\r\n    </md-button>\r\n  </div>\r\n</div>\r\n'
            };
            var lib = __webpack_require__(301);
            const insertRight = (str, fromEnd, ins) => {
                const index = str.length - fromEnd;
                return str.substring(0, index) + ins + str.substring(index, str.length);
            }, downAccuracy = function(d) {
                let digits = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
                return insertRight(Math.floor(d * Math.pow(10, digits)).toString(10), digits, ".");
            }, ceilAccuracy = function(d) {
                let digits = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
                return insertRight(Math.ceil(d * Math.pow(10, digits)).toString(10), digits, ".");
            }, DataService = $http => {
                let lastCoord = {};
                const service = {
                    getArt: function(bounds, options) {
                        const b = bounds, bbox = [ b.southWest.lat, b.southWest.lng, b.northEast.lat, b.northEast.lng ].join(",");
                        return $http(angular.extend({}, {
                            method: "POST",
                            url: "http://overpass-api.de/api/interpreter",
                            data: `[out:json][timeout:25];\n        (\n          node["historic"="wayside_shrine"](${bbox});\n          node["historic"="memorial"](${bbox});\n          node["historic"="monument"](${bbox});\n          node["man_made"="cross"](${bbox});\n          node["tourism"="artwork"](${bbox});\n        );\n      out body; >; out skel qt;`
                        }, options));
                    },
                    getCity: function(name) {
                        return $http({
                            method: "GET",
                            url: "https://nominatim.openstreetmap.org/search",
                            params: {
                                format: "json",
                                countrycodes: "pl",
                                city: name,
                                dedupe: 1
                            }
                        });
                    },
                    getMonuments: function(bounds, options) {
                        const b = bounds, cornerWest = `Point(${downAccuracy(b.southWest.lng, 2)} ${downAccuracy(b.southWest.lat, 2)})`, cornerEast = `Point(${ceilAccuracy(b.northEast.lng, 2)} ${ceilAccuracy(b.northEast.lat, 2)})`;
                        console.log(`Full(${b.southWest.lng} ${b.southWest.lat})`), console.log(`Full(${b.northEast.lng} ${b.northEast.lat})`), 
                        console.log(cornerWest), console.log(cornerEast);
                        const query = `SELECT ?item ?itemLabel ?townLabel ?image \n      ?coord ?category ?townCategory ?adminCategory\n      ?address ?inspireId ?commonsCategory\n    WHERE {\n      SERVICE wikibase:box {\n      ?item wdt:P625 ?coord .\n        bd:serviceParam wikibase:cornerWest "${cornerWest}"^^geo:wktLiteral .\n        bd:serviceParam wikibase:cornerEast "${cornerEast}"^^geo:wktLiteral .\n      }\n      OPTIONAL { ?item wdt:P131 ?town . }\n      OPTIONAL { ?item wdt:P131 ?town . ?town wdt:P373 ?townCategory }\n      OPTIONAL { ?item wdt:P131 ?town . ?town wdt:P131 ?admin . ?admin wdt:P373 ?adminCategory }\n      OPTIONAL { ?item wdt:P18 ?image . }\n      ?item wdt:P1435 wd:Q29940414 .\n      FILTER NOT EXISTS { ?item wdt:P31 wd:Q19860854 }\n      OPTIONAL { ?item wdt:P31 ?type }\n      OPTIONAL { ?item wdt:P373 ?category }\n      OPTIONAL { ?item wdt:P6375 ?address. }\n      OPTIONAL { ?item wdt:P4115 ?inspireId. }\n      OPTIONAL { ?item wdt:P373 ?commonsCategory. }\n      SERVICE wikibase:label { bd:serviceParam wikibase:language "pl,en" }\n    }\n    LIMIT 2000`.replace(/ {2,}/g, " ");
                        if (previousMonuments.query === query) return console.log("getMonuments: resolve from cache"), 
                        Promise.resolve(previousMonuments.data);
                        return $http(angular.extend({}, {
                            method: "GET",
                            url: "https://query.wikidata.org/sparql",
                            params: {
                                query
                            }
                        }, options)).then((data => (previousMonuments.query = query, previousMonuments.data = data, 
                        data)));
                    },
                    getWikidataDetails: function(wikidataId) {
                        const url = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;
                        return new Promise(((resolve, reject) => {
                            fetch(url).then((response => response.json())).then((data => {
                                const entity = data.entities[wikidataId], claims = entity.claims, result = {
                                    plwikiArticle: entity.sitelinks.plwiki && entity.sitelinks.plwiki,
                                    wikis: entity.sitelinks,
                                    inspireId: claims.P4115 && claims.P4115[0].mainsnak.datavalue.value,
                                    polishHeritageNumber: claims.P3424 && claims.P3424[0].mainsnak.datavalue.value,
                                    buildDate: claims.P571 && claims.P571[0].mainsnak.datavalue.value.time,
                                    commonsCategory: claims.P373 && claims.P373[0].mainsnak.datavalue.value
                                };
                                resolve(result);
                            })).catch((error => {
                                console.error("Error fetching Wikidata:", error), reject(error);
                            }));
                        }));
                    },
                    getNature: function(coords) {
                        lastCoord = coords;
                        const coor = (0, lib.A)("WGS84", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs", [ coords.lng, coords.lat ]);
                        return $http({
                            method: "GET",
                            url: "gdos.php",
                            params: {
                                x: coor[0],
                                y: coor[1]
                            }
                        });
                    },
                    getLastCoord: function() {
                        return lastCoord;
                    }
                }, previousMonuments = {
                    query: "",
                    data: ""
                };
                return service;
            };
            __webpack_require__.p, __webpack_require__.p, __webpack_require__.p;
            let leafletMap = {};
            leaflet_src_default().Map.addInitHook((function() {
                leafletMap = this;
            }));
            let lastSelectedMarker = !1;
            function selectMarker(lat, lon) {
                lastSelectedMarker && leafletMap.removeLayer(lastSelectedMarker), lastSelectedMarker = leaflet_src_default().circleMarker([ lat, lon ], {
                    radius: 10,
                    color: "#FFD700",
                    fillColor: "#000000",
                    fillOpacity: .5
                }).addTo(leafletMap);
            }
            let lastUserMarker = !1;
            function userPositionMarker(lat, lon) {
                lastUserMarker && leafletMap.removeLayer(lastUserMarker), lastUserMarker = leaflet_src_default().circleMarker([ lat, lon ], {
                    radius: 7,
                    color: "#000000",
                    fillColor: "#FFD700",
                    fillOpacity: .5
                }).addTo(leafletMap);
            }
            const MapService = versionService => {
                const map = function(options) {
                    return angular.extend({
                        markersWatchOptions: {
                            doWatch: !0,
                            isDeep: !1,
                            individual: {
                                doWatch: !1,
                                isDeep: !1
                            }
                        },
                        center: {
                            lat: 52.093,
                            lng: 19.468,
                            zoom: 6
                        },
                        markers: {},
                        highlight: null,
                        events: {
                            map: {
                                enable: [ "dragend", "zoomend", "click" ],
                                logic: "emit"
                            },
                            markers: {
                                enable: [ "click", "mouseover", "mouseout" ]
                            }
                        },
                        layers: {
                            baselayers: {
                                wiki: {
                                    name: "Wikimedia Maps",
                                    type: "xyz",
                                    url: "//maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
                                    layerOptions: {
                                        subdomains: [ "a", "b", "c" ],
                                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
                                        continuousWorld: !0,
                                        maxNativeZoom: 18,
                                        maxZoom: 21
                                    }
                                },
                                osm: {
                                    name: "OpenStreetMap",
                                    type: "xyz",
                                    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                                    layerOptions: {
                                        subdomains: [ "a", "b", "c" ],
                                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
                                        continuousWorld: !1,
                                        maxNativeZoom: 19,
                                        maxZoom: 21
                                    }
                                }
                            },
                            overlays: {
                                pins: {
                                    name: "Markers",
                                    type: "markercluster",
                                    visible: !0,
                                    layerOptions: {
                                        showCoverageOnHover: !1,
                                        zoomToBoundsOnClick: !0,
                                        maxClusterRadius: zoom => 130 - 5 * zoom,
                                        animate: !1,
                                        iconCreateFunction: cluster => {
                                            const version = versionService.getVersion();
                                            return new (leaflet_src_default().DivIcon)({
                                                html: `<div><span>${cluster.getChildCount()}</span></div>`,
                                                className: `marker-cluster marker-cluster-small marker-cluster--${version}`,
                                                iconSize: new (leaflet_src_default().Point)(40, 40)
                                            });
                                        }
                                    }
                                },
                                pinsMissing: {
                                    name: "MissingMarkers",
                                    type: "markercluster",
                                    visible: !0,
                                    layerOptions: {
                                        showCoverageOnHover: !1,
                                        zoomToBoundsOnClick: !0,
                                        maxClusterRadius: zoom => 130 - 5 * zoom,
                                        animate: !1,
                                        iconCreateFunction: cluster => {
                                            const version = versionService.getVersion();
                                            return new (leaflet_src_default().DivIcon)({
                                                html: `<div><span>${cluster.getChildCount()}</span></div>`,
                                                className: `marker-cluster marker-cluster-small marker-cluster--${version} marker-missing`,
                                                iconSize: new (leaflet_src_default().Point)(40, 40)
                                            });
                                        }
                                    }
                                },
                                gdos: {
                                    name: "GDOŚ",
                                    type: "wms",
                                    url: "http://sdi.gdos.gov.pl/wms",
                                    visible: !1,
                                    layerOptions: {
                                        layers: [ "ObszarySpecjalnejOchrony", "ParkiKrajobrazowe", "ParkiNarodowe", "PomnikiPrzyrody", "Rezerwaty", "SpecjalneObszaryOchrony", "ZespolyPrzyrodniczoKrajobrazowe" ].join(","),
                                        format: "image/png",
                                        styles: "soo$1$3,oso$1$3,zespoly$1$3,pn$1$3,pk$1$3,rez$1$3,pp$1$3",
                                        transparent: !0,
                                        attribution: "Generalna Dyrekcja Ochrony Środowiska"
                                    }
                                }
                            }
                        }
                    }, options);
                }({
                    forceMapState: !1
                }), service = {
                    clearMarkers: function() {
                        return map.markers = {}, map.highlight = null, !0;
                    },
                    getMap: () => map,
                    getMapIcon: function(options) {
                        const iconUrl = `assets/images/marker-${options && options.type ? "red" : "blue"}.png`;
                        return {
                            iconUrl,
                            shadowUrl: "assets/images/marker-shadow.png",
                            iconSize: [ 29, 41 ],
                            shadowSize: [ 41, 41 ],
                            iconAnchor: [ 15, 41 ],
                            shadowAnchor: [ 12, 41 ],
                            popupAnchor: [ 0, -43 ]
                        };
                    },
                    selectMarker,
                    userPositionMarker,
                    showNature: function(flag) {
                        map.layers.overlays.gdos.visible = flag;
                    }
                };
                return service;
            }, TextService = $location => {
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
                        LOCATION_SEEMS_INVALID: "Lokalizacja tego obiektu wydaje się nieprawidłowa (do poprawy na WD?). Zgłoś ten problem, dzięki."
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
                        LOCATION_SEEMS_INVALID: "Location of this object seems invalid."
                    },
                    de: {
                        INIT: "Karte wird geladen",
                        SEARCH_PLACEHOLDER: "Geben Sie den Ortsnamen ein, z.B. Wrocław",
                        HEADER_NATURE: "Natur",
                        HEADER_MONUMENTS: "Denkmäler",
                        HEADER_ART: "Kunst",
                        SHOW_CURRENT_LOCATION: "Aktuellen Standort anzeigen",
                        SIDEBAR_ZOOM_IN: "Zoomen Sie, um Objekte zu laden",
                        SIDEBAR_DRAG_SEARCH: "Denkmäler beim Verschieben der Karte laden",
                        SIDEBAR_CLICK_MAP_TO_GET: "Klicken Sie auf die Karte, um Objekte zu laden",
                        SIDEBAR_NO_OBJECTS: "Keine Objekte in diesem Bereich",
                        SIDEBAR_IMAGE_OUT_OF_LIST_LABEL: "Anderes Denkmal",
                        SIDEBAR_IMAGE_OUT_OF_LIST_TITLE: "Bild eines nicht gelisteten Denkmals senden",
                        CARD_NO_NAME: "Kein Name",
                        CARD_WAYSIDE_SHRINE: "Wegkapelle",
                        CARD_MEMORIAL: "Denkmal",
                        CARD_MONUMENT: "Monument",
                        CARD_WAYSIDE_CROSS: "Wegkreuz",
                        CARD_ARTWORK: "Kunstwerk",
                        CARD_NATURE_RESERVE: "Naturschutzgebiet",
                        CARD_LANDSCAPE_PARK: "Landschaftspark",
                        CARD_1: "Vogelschutzgebiet",
                        CARD_2: "Besonderes Schutzgebiet",
                        CARD_NATIONAL_PARK: "Nationalpark",
                        CARD_3: "Natur- und Landschaftskomplex",
                        CARD_NATURE_MONUMENT: "Naturdenkmal",
                        CARD_MORE_INFO: "Mehr",
                        CARD_UPLOAD: "Hochladen",
                        ADDRESS: "Adresse",
                        LOCATION: "Standort",
                        SELECT_NAVIGATION_METHOD: "Wählen Sie eine Navigationsmethode:",
                        USE_ADDRESS: "Adresse verwenden",
                        USE_LOCATION: "Standort verwenden",
                        EXTERNAL_LINKS: "Externe Links:",
                        WIKIDATA: "Wikidata",
                        WIKIMEDIA_COMMONS: "Wikimedia Commons",
                        CLOSE: "Schließen",
                        LOCATION_SEEMS_INVALID: "Der Standort dieses Objekts scheint ungültig zu sein."
                    }
                };
                return {
                    getText: function(lang, text) {
                        return texts[lang] ? texts[lang][text] : texts.en[text];
                    },
                    getTexts: function() {
                        const search = $location.search();
                        let lang = search.userlang || search.lang || navigator.language;
                        lang in texts || (lang = "en");
                        return texts[lang];
                    }
                };
            }, VersionService = () => {
                let version = "monuments";
                return {
                    getVersion: function() {
                        return version;
                    },
                    setVersion: function(newVersion) {
                        version = newVersion;
                    }
                };
            };
            angular_default().module("app", [ "ngMaterial", "leaflet-directive" ]).config((function($mdThemingProvider, $provide) {
                const tp = $mdThemingProvider;
                tp.theme("default").primaryPalette("blue-grey").accentPalette("red"), $provide.value("themeProvider", tp);
            })), angular.module("app").component("wwMain", MainComponent), angular.module("app").component("wwCard", CardComponent), 
            angular.module("app").component("wwHeader", HeaderComponent), angular.module("app").component("wwMap", MapComponent), 
            angular.module("app").component("wwSidebar", SidebarComponent), angular.module("app").component("navigationDialog", NavigationDialogComponent), 
            angular.module("app").factory("dataService", DataService), angular.module("app").factory("mapService", MapService), 
            angular.module("app").factory("textService", TextService), angular.module("app").factory("versionService", VersionService);
        },
        209: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__), _node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(796), ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_card_css__WEBPACK_IMPORTED_MODULE_2__.A), 
            ___CSS_LOADER_EXPORT___.push([ module.id, "ww-card{width:100%}ww-card .md-button{text-overflow:ellipsis;padding-bottom:0;margin-bottom:0}ww-card md-card{display:block}ww-card .ww-card__image{float:left}ww-card .buttons-group{display:flex;justify-content:right;margin-top:.5em;gap:.5em}ww-card .buttons-group .md-button{margin:0}ww-card .ww-card{margin:10px;padding:10px;border-radius:0;box-shadow:none}ww-card .ww-card .ww-card__image{background:#ededed;width:120px;height:120px;margin-right:10px}ww-card .ww-card .ww-card__image .md-media-sm,ww-card .ww-card .ww-card__image .md-media-sm>img{width:auto;height:auto;max-width:120px;max-height:120px}@media (max-width: 699px){ww-card .ww-card .ww-card__image{width:80px;height:80px}ww-card .ww-card .ww-card__image .md-media-sm,ww-card .ww-card .ww-card__image .md-media-sm>img{max-width:80px;max-height:80px}}ww-card .ww-card .ww-card__title{padding-bottom:5px;font-weight:600;font-size:18px}@media (max-width: 699px){ww-card .ww-card .ww-card__title{font-size:16px}}ww-card .ww-card:focus{outline:0;border:4px solid #bbb;padding:6px}ww-card .ww-card.ww-card--link{cursor:pointer}ww-card .ww-card__upload{font-weight:600}ww-card.ww-card-active .ww-card{border:4px solid #bbb;padding:6px}\n", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        911: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, 'ww-header .ww-header__main{min-height:60px;background:white !important}ww-header .ww-header__main .md-toolbar-tools{height:60px;min-height:60px;padding:0;background:black;color:white}ww-header .ww-header__logo{height:35px;margin-left:10px;margin-right:10px}@media (min-width: 890px){ww-header .ww-header__logo.img-short{display:none}}@media (max-width: 891px){ww-header .ww-header__logo.img-long{display:none}}@media (max-width: 700px){ww-header a.wikimedia{display:none}}ww-header .app-img-short{display:none}@media (max-width: 500px){.search-wasactive ww-header .app-img-long{display:none}.search-wasactive ww-header .app-img-short{display:inline-block}ww-header .logo-link{display:flex;justify-content:center}ww-header .logo-link img{height:auto;max-height:50px;width:90%;box-sizing:border-box;margin:0;padding:0}}ww-header .ww-header__title{color:#1d1d1d;font-size:17px;font-weight:bold;line-height:50px}ww-header .ww-header__buttons-toolbar{z-index:1;min-height:60px}ww-header .ww-header__search{height:100%;border:0;padding:10px 15px;background:white;color:gray;font-family:"Open Sans", sans-serif}ww-header .ww-header__search:focus{outline:0;background:white;color:black}@media (max-width: 699px){ww-header .ww-header__search{font-size:18px}}ww-header .ww-header__search-clear{position:absolute;right:5px}ww-header .ww-header__search:focus+.ww-header__search-clear .material-icons{color:black}ww-header .ww-header__search-results{position:fixed;z-index:10;top:60px;right:0;width:600px;background:#eee;color:#1d1d1d}@media (max-width: 699px){ww-header .ww-header__search-results{max-width:100%}}ww-header .ww-header__search-result{padding:5px 10px;font-size:18px;cursor:pointer}ww-header .ww-header__search-result:hover{background:#efefef}ww-header .ww-header__search-result small{opacity:0.7}ww-header .ww-header__button{margin:0;padding:12px;border-radius:0;font-weight:600;font-size:18px}@media (max-width: 699px){ww-header .ww-header__button{font-size:14px}}ww-header .ww-header__button--monuments{background:#3498db}ww-header .ww-header__button--nature{background:#2ecc71}ww-header .ww-header__button--art{background:#9b59b6}\n', "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        183: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, 'ww-main{display:flex;flex-direction:column;height:100%}ww-main .ww-container{flex:1}.ww-container{display:grid;grid-template-columns:minmax(370px, 1fr) 2fr}.ww-container ww-map .angular-leaflet-map{width:100%;height:100%}@media (max-width: 699px){.ww-container{grid-template-columns:1fr;grid-template-rows:1fr 16em;grid-template-areas:"map"\n "sidebar"}.ww-container ww-map{grid-area:map}.ww-container ww-sidebar{grid-area:sidebar}}.ww-map--loading{height:100%;display:flex;justify-content:center;align-items:center;padding:25px 10px;color:#757575;opacity:0.5;text-align:center}.ww-map--loading .cssload-container{height:50px}\n', "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        67: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "ww-map{z-index:1}ww-map .ww-map-switcher{position:absolute;z-index:1000;right:0}ww-map .ww-map-switcher .md-button{width:70px;height:70px;font-size:12px;padding:0;min-width:70px;margin-left:0;margin-top:10px;margin-right:10px}ww-map .ww-map-switcher .md-button .material-icons{display:block;margin-top:10px}ww-map .leaflet-top,ww-map .leaflet-bottom{z-index:500}ww-map .leaflet-top .leaflet-control-zoom.leaflet-bar,ww-map .leaflet-bottom .leaflet-control-zoom.leaflet-bar{border-radius:0;border:4px solid #bbb}ww-map .leaflet-top.leaflet-right{display:none}ww-map .marker-cluster{--marker-color: #799;background-color:var(--marker-color)}ww-map .marker-cluster.marker-cluster--art{--marker-color: rgba(155, 89, 182, 0.6)}ww-map .marker-cluster.marker-cluster--monuments{--marker-color: rgba(52, 152, 219, 0.6)}ww-map .marker-cluster.marker-cluster--monuments.marker-missing{--marker-color:rgba(219, 40, 40, 0.6)}ww-map .marker-cluster>div{background-color:var(--marker-color)}\n", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        457: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, ".navigation-dialog{width:450px;max-width:100%}.navigation-dialog md-dialog-content{padding:1em 1em 0 1em}.navigation-dialog h2{font-size:120%;margin:0;margin-bottom:.5em}.navigation-dialog .group-label{font-size:90%}\n", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        643: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "ww-sidebar{position:relative;background:white;display:flex;flex-direction:column}ww-sidebar .ww-cards{flex:1}ww-sidebar .ww-sidebar-info{padding:25px 10px;color:#757575;opacity:0.5;text-align:center}ww-sidebar .ww-sidebar-info .material-icons{font-size:50px;height:auto;width:auto;display:block}ww-sidebar .ww-cards{overflow:auto;width:100%;background:#ededed}ww-sidebar .ww-cards--loading{z-index:5;position:absolute;width:100%;background:#ededed}ww-sidebar .ww-sidebar-options{border-top:4px solid #ddd;width:100%;box-sizing:border-box;display:flex;gap:.5em;flex-direction:column;font-weight:bold}@media (max-width: 699px){ww-sidebar .ww-sidebar-options{gap:0}}ww-sidebar .ww-sidebar-options md-switch{margin-left:1em;margin-block:0;padding-block:.4em;white-space:normal;display:flex;gap:.7em}@media (min-width: 24em){ww-sidebar .ww-sidebar-options md-switch{width:max-content;margin-inline:auto}}ww-sidebar .ww-sidebar-options md-switch .md-container{width:35px;flex-shrink:0;padding:0;margin:0;box-sizing:border-box}ww-sidebar .ww-button-group{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}ww-sidebar .ww-button-group .md-button{min-width:0;text-align:left}\n", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        363: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, "@import url(https://tools-static.wmflabs.org/fontcdn/css?family=Open+Sans:400,600&subset=latin-ext);" ]), 
            ___CSS_LOADER_EXPORT___.push([ module.id, "@import url(https://tools-static.wmflabs.org/fontcdn/css?family=Material+Icons);" ]), 
            ___CSS_LOADER_EXPORT___.push([ module.id, '::-webkit-scrollbar-thumb{-webkit-border-radius:0;border-radius:0;background:#bbb}::-webkit-scrollbar-track{-webkit-border-radius:0;border-radius:0}::-webkit-scrollbar{width:10px;height:4px}::-webkit-scrollbar-track{-webkit-border-radius:0;border-radius:0}.cssload-container{width:100%;height:35px;text-align:center}.cssload-speeding-wheel{width:35px;height:35px;margin:0 auto;border:4px solid #757575;border-radius:50%;border-left-color:transparent;border-right-color:transparent;animation:cssload-spin 875ms infinite linear;-o-animation:cssload-spin 875ms infinite linear;-ms-animation:cssload-spin 875ms infinite linear;-webkit-animation:cssload-spin 875ms infinite linear;-moz-animation:cssload-spin 875ms infinite linear}@keyframes cssload-spin{100%{transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes cssload-spin{100%{-o-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes cssload-spin{100%{-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes cssload-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes cssload-spin{100%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}html,body{font-family:"Open Sans", sans-serif}\n', "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        796: (module, __webpack_exports__, __webpack_require__) => {
            __webpack_require__.d(__webpack_exports__, {
                A: () => __WEBPACK_DEFAULT_EXPORT__
            });
            var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645), _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__), _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(278), ___CSS_LOADER_EXPORT___ = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
            ___CSS_LOADER_EXPORT___.push([ module.id, ".ww-card__upload {\n  min-width: min-content;\n  box-sizing: border-box;\n}\n.ww-card {\n  container-type: inline-size;\n}\n@container (max-width: 360px) {\n  .ww-card .buttons-group {\n    clear: both;\n  }\n  .ww-card__upload {\n    min-width: 30px;\n  }\n}\n", "" ]);
            const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
        },
        617: module => {
            module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMjA4IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyIAkJIiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4gPHJlY3QgZmlsbD0ibm9uZSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+IDwvZz4gPC9nPiA8ZyBpZD0iR3JpZCIgZGlzcGxheT0ibm9uZSI+IDxnIGRpc3BsYXk9ImlubGluZSI+IDwvZz4gPC9nPiA8L3N2Zz4NCg==";
        },
        167: module => {
            module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMzM2IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTAsNiA4LjYsNy40IDEzLjIsMTIgOC42LDE2LjYgMTAsMTggMTYsMTIgCQkiIHN0eWxlPSJmaWxsOndoaXRlOyIvPiA8cmVjdCBmaWxsPSJub25lIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz4gPC9nPiA8L2c+IDxnIGlkPSJHcmlkIiBkaXNwbGF5PSJub25lIj4gPGcgZGlzcGxheT0iaW5saW5lIj4gPC9nPiA8L2c+IDwvc3ZnPg0K";
        }
    }, __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            exports: {}
        };
        return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.exports;
    }
    __webpack_require__.m = __webpack_modules__, deferred = [], __webpack_require__.O = (result, chunkIds, fn, priority) => {
        if (!chunkIds) {
            var notFulfilled = 1 / 0;
            for (i = 0; i < deferred.length; i++) {
                for (var [chunkIds, fn, priority] = deferred[i], fulfilled = !0, j = 0; j < chunkIds.length; j++) (!1 & priority || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key => __webpack_require__.O[key](chunkIds[j]))) ? chunkIds.splice(j--, 1) : (fulfilled = !1, 
                priority < notFulfilled && (notFulfilled = priority));
                if (fulfilled) {
                    deferred.splice(i--, 1);
                    var r = fn();
                    void 0 !== r && (result = r);
                }
            }
            return result;
        }
        priority = priority || 0;
        for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
        deferred[i] = [ chunkIds, fn, priority ];
    }, __webpack_require__.n = module => {
        var getter = module && module.__esModule ? () => module.default : () => module;
        return __webpack_require__.d(getter, {
            a: getter
        }), getter;
    }, __webpack_require__.d = (exports, definition) => {
        for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key]
        });
    }, __webpack_require__.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
    (() => {
        var scriptUrl;
        __webpack_require__.g.importScripts && (scriptUrl = __webpack_require__.g.location + "");
        var document = __webpack_require__.g.document;
        if (!scriptUrl && document && (document.currentScript && (scriptUrl = document.currentScript.src), 
        !scriptUrl)) {
            var scripts = document.getElementsByTagName("script");
            if (scripts.length) for (var i = scripts.length - 1; i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl)); ) scriptUrl = scripts[i--].src;
        }
        if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
        scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), 
        __webpack_require__.p = scriptUrl;
    })(), (() => {
        __webpack_require__.b = document.baseURI || self.location.href;
        var installedChunks = {
            792: 0
        };
        __webpack_require__.O.j = chunkId => 0 === installedChunks[chunkId];
        var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            var moduleId, chunkId, [chunkIds, moreModules, runtime] = data, i = 0;
            if (chunkIds.some((id => 0 !== installedChunks[id]))) {
                for (moduleId in moreModules) __webpack_require__.o(moreModules, moduleId) && (__webpack_require__.m[moduleId] = moreModules[moduleId]);
                if (runtime) var result = runtime(__webpack_require__);
            }
            for (parentChunkLoadingFunction && parentChunkLoadingFunction(data); i < chunkIds.length; i++) chunkId = chunkIds[i], 
            __webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] && installedChunks[chunkId][0](), 
            installedChunks[chunkId] = 0;
            return __webpack_require__.O(result);
        }, chunkLoadingGlobal = self.webpackChunk = self.webpackChunk || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0)), chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    })(), __webpack_require__.nc = void 0;
    var __webpack_exports__ = __webpack_require__.O(void 0, [ 166 ], (() => __webpack_require__(604)));
    __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})();