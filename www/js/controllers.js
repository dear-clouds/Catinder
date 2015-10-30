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

.controller('CardsCtrl', function($scope, $http, TDCardDelegate, $timeout, $localstorage) {
  console.log('CARDS CTRL');
  var cardTypes = [];

  console.log('localstorage content', $localstorage.getObject('cats'));

  if (!$localstorage.getObject('cats').favorite) {
    console.log('no localstorage yet');
    $localstorage.setObject('cats', {
      favorite: [],
      blacklist: []
    });
  }

  var profilCheck = function(newCats) {

    var fav = $localstorage.getObject('cats').favorite;
    var blk = $localstorage.getObject('cats').blacklist;

    Array.prototype.push.apply(fav, blk);

    console.log('fav',fav);
    console.log('newCats.length',newCats.length);
    
    var i;
    var j;

    for(i = 0; i < newCats.length; i++) {

      for (j = 0; j < fav.length; j++) {

        console.log('newCats[i].id', newCats[i].id);
        console.log('fav[j].id', fav[j].id);

        if (newCats[i].id === fav[j].id) {
          newCats.splice(i,1);
        }
      }

    }
    console.log('newCats', newCats);
    return newCats;
  };

  var sortCards = function() {
    console.log('SORTCARDS');
    existingCards = document.body.querySelectorAll('td-card');

    for(i = 0; i < existingCards.length; i++) {
      card = existingCards[i];
      if(!card) continue;
      if(i > 0) {
        card.style.transform = card.style.webkitTransform = '';
      }
      card.style.zIndex = (existingCards.length - i);
    }
  };

  $http({
    method: 'GET',
    url: 'js/cats.json'
  }).then(function successCallback(response) {
    console.log('success', response.data.cats);
    var temp = profilCheck(response.data.cats);
    console.log('success after profilCheck', temp);

    Array.prototype.push.apply(cardTypes, temp);
    $timeout(function() {
      sortCards();
    });


    console.log('cards : ', cardTypes)
  }, function errorCallback(response) {
    console.log('error', response);
  });

  $scope.cards = cardTypes;
  console.log('scope.cards', $scope.cards);

  // $scope.cardDestroyed = function(index) {
  //   console.log('index cardDestroyed', index);
  //   localCard = $scope.cards.splice(index, 1);
  // };

  $scope.addCard = function() {

    $http({
      method: 'GET',
      url: 'js/cats.json'
    }).then(function successCallback(response) {
      console.log('success', response.data.cats);
      var temp = profilCheck(response.data.cats);

      Array.prototype.push.apply($scope.cards, temp);
      $timeout(function() {
        sortCards();
      });

      console.log('cards : ', $scope.cards)
    }, function errorCallback(response) {
      console.log('error', response);
    });

    // var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    // newCard.id = Math.random();
    // $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.cardSwipedLeft = function(index) {
    console.log('index', index);
    console.log('LEFT SWIPE $scope.cards', $scope.cards);
    console.log('LEFT SWIPE $scope.card', $scope.card);
    console.log('LEFT SWIPE $scope.cards[index]', $scope.cards[index]);

    var localCard = $scope.cards.splice(index, 1);

    console.log('LEFT SWIPE localCard', localCard);
    var catObject = $localstorage.getObject('cats');
    catObject.blacklist.push(localCard[0]);

    $localstorage.setObject('cats', catObject);


    if (cardTypes.length < 3)
      $scope.addCard();
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    console.log($scope.cards);

    var localCard = $scope.cards.splice(index, 1);

    console.log('RIGHT SWIPE localCard', localCard);
    var catObject = $localstorage.getObject('cats');
    catObject.favorite.push(localCard[0]);

    $localstorage.setObject('cats', catObject);

    if (cardTypes.length < 3)
      $scope.addCard();
  };
})


.controller('FavCtrl', function($scope, $stateParams, $localstorage) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  if (!$localstorage.getObject('cats').favorite) {
    console.log('no localstorage yet');
    $localstorage.setObject('cats', {
      favorite: [],
      blacklist: []
    });
  }

  $scope.itemsBlk = $localstorage.getObject('cats').blacklist;
  $scope.itemsFav = $localstorage.getObject('cats').favorite;

  console.log('$scope.itemsBlk', $scope.itemsBlk);
  console.log('$scope.itemsFav', $scope.itemsFav);

  $scope.delFav = function(index) {
    var catObject = $localstorage.getObject('cats');
    catObject.favorite.splice(index,1);

    $localstorage.setObject('cats', catObject);
  };

  $scope.delBlacklist = function(index) {
    var catObject = $localstorage.getObject('cats');
    catObject.blacklist.splice(index,1);

    $localstorage.setObject('cats', catObject);
  };

  $scope.ReinitFav = function(index) {
    var catObject = $localstorage.getObject('cats');
    catObject.favorite.splice(index, catObject.favorite.length);
    $localstorage.setObject('cats', catObject);
    window.location.reload();
  };

  $scope.ReinitBlacklist = function(index) {
    var catObject = $localstorage.getObject('cats');
    catObject.blacklist.splice(index, catObject.blacklist.length);
    $localstorage.setObject('cats', catObject);
    window.location.reload();
  };

});
