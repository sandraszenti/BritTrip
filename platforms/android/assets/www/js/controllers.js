angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

.controller('counterPage', function($scope) {
    $scope.timexx = function() {
        console.log(this.time_left);
        $scope.count_down = this.time_left;
    };
    $scope.time_left = "HH:MM";
    $scope.final_dest = "Heathrow Airport";

    $scope.timex = function() {
        stopped = $timeout(function() {
            console.log($scope.counter);
            $scope.counter--;
            $scope.countdown();
        }, 1000);
    };

})

.controller('placesCtrl', function($scope, $http) {
    console.log('huh');
    hello = $http.get('http://api.visitbritain.com/items?type=location&near=-3.393402,57.009337&limit=24&t=A9NsGgd9UmxR');

    //console.log(hello);
    pos = '-3.393402,57.009337';
    pos = '-0.155602,51.504034';
    limit = 'limit=24';
    token = 't=A9NsGgd9UmxR';
    me = '';
    uurl = 'http://api.visitbritain.com/items?type=location&near=' + pos + '&' + limit + '&' + token;
    cat = 'http://api.visitbritain.com/items?type=category&' + limit + '&' + token;
    $scope.test = function(lat, lng, lmt) {

        pos = parseFloat(lat);
        pos = parseFloat(lng);
        limit = 'limit=' + lmt;
        token = 't=A9NsGgd9UmxR';
        me = '';
        uurl = 'http://api.visitbritain.com/items?type=location&near=' + pos + '&' + limit + '&' + token;
        $http({
            method: 'GET',
            url: uurl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(r) {
            locs = [];
            for (var i = 0; i < r.data.length; i++) {
                if (r.data[i].location != null) {
                    locs[i] = [r.data[i].location.lat, r.data[i].location.lng];
                }

            }
            console.log(r);
            $scope.me = r;
            $scope.Places = r;
        });
    };


})

.controller('CatsCtrl', function($scope, $stateParams, $http) {

    $scope.cat = function(lat, lng, lmt) {

        pos = parseFloat(lat);
        pos = parseFloat(lng);
        limit = 'limit=' + lmt;
        token = 't=A9NsGgd9UmxR';
        me = '';
        uurl = 'http://api.visitbritain.com/items?type=category&' + token;
        if(window.localStorage['cats'] == undefined){
          $http({
            method: 'GET',
            url: uurl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(r) {
          catz = []
          for(var i = 0; i < r.data.length; i++){
            if(r.data[i].title.length > 1 ){
              catz[i] = { "id": r.data[i].id,
                          "rank": r.data[i].rank,
                          "loves": r.data[i].loves,
                          "images": r.data[i].images,
                          "title": r.data[i].title,
                          "ckecked": false
                        };
            }
          }
            window.localStorage['cats'] = JSON.stringify(catz);
            console.log(r);
            console.log(catz);
            
            $scope.cats = JSON.parse(window.localStorage['cats'] || '{}');
        });
        }
        
    };

    $scope.cat();
    $scope.cats = JSON.parse(window.localStorage['cats'] || '{}');
    $scope.clicked = function(id){
      console.log(id);
      data = JSON.parse(window.localStorage['cats'] || '{}');
      for(var i = 0; i < data.length; i++){
        if(parseInt(data[i].id) == parseInt(id)){ 
          if(data[i].checked == false){ 
            data[i].checked = true;
          }else{
            data[i].checked = false;
          } 

        }
        console.log(data[i]);
      }
      window.localStorage['cats'] = JSON.stringify(data);
      console.log(data);

    }

})

.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
    };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            $scope.my_lat = lat;
            $scope.my_long = long;
        }, function(err) {
            // error
        });


    var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
        null,
        function(err) {
            // error
        },
        function(position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude
        });


    watch.clearWatch();
    // OR
    // $cordovaGeolocation.clearWatch(watch)
    //   .then(function(result) {
    //     // success
    //     }, function (error) {
    //     // error
    //   });
})