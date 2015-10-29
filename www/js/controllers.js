angular.module('starter.controllers', ['ionic.contrib.ui.tinderCards'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  
})

.controller('CardsCtrl', function($scope, $http, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [];

  $http({
      method: 'GET',
      url: '/js/cats.json'
    }).then(function successCallback(response) {
      console.log('success', response.data.cats);

      Array.prototype.push.apply(cardTypes, response.data.cats);

      console.log('cards : ', cardTypes)
    }, function errorCallback(response) {
      console.log('error', response);
    });

  $scope.cards = cardTypes;
  console.log($scope.cards);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {

    $http({
      method: 'GET',
      url: '/js/cats.json'
    }).then(function successCallback(response) {
      console.log('success', response.data.cats);

      Array.prototype.push.apply($scope.cards, response.data.cats);

      console.log('cards : ', $scope.cards)
    }, function errorCallback(response) {
      console.log('error', response);
    });

    // var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    // newCard.id = Math.random();
    // $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    console.log($scope.cards);
    if (cardTypes.length < 3)
      $scope.addCard();
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    console.log($scope.cards);
    if (cardTypes.length < 3)
      $scope.addCard();
  };
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
