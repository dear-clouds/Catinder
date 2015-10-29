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

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'http://lorempixel.com/300/300/cats/1/' },
    { image: 'http://lorempixel.com/300/300/cats/2/' },
    { image: 'http://lorempixel.com/300/300/cats/3/' },
    { image: 'http://lorempixel.com/300/300/cats/4/' },
    { image: 'http://lorempixel.com/300/300/cats/5/' }
  ];

  $scope.cards = cardTypes;
  console.log($scope.cards);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
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
