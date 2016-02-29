var app = angular.module("myapp", [
    'mobile-angular-ui',

    // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
    // it is at a very beginning stage, so please be careful if you like to use
    // in production. This is intended to provide a flexible, integrated and and
    // easy to use alternative to other 3rd party libs like hammer.js, with the
    // final pourpose to integrate gestures into default ui interactions like
    // opening sidebars, turning switches on/off ..
    'mobile-angular-ui.gestures',
    'uiGmapgoogle-maps'
])

app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

app.controller("mycontroller", function ($scope, uiGmapGoogleMapApi) {
    angular.extend($scope, {
        init: function () {
            uiGmapGoogleMapApi.then($scope.mapsReady);
            document.addEventListener('deviceready', $scope.deviceReady, false);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.positionReady);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }

        },
        deviceReady: function(){
        },
        mapsReady: function (maps) {
        },
        map: { center: { latitude: 45, longitude: -73 }, zoom: 12 },
        positionReady: function(position){
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
            $scope.$apply();
        },
        refresh:function(){
        navigator.geolocation.getCurrentPosition($scope.positionReady);
    }
    }).init();


});
