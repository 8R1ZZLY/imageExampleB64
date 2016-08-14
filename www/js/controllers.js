angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope,$cordovaImagePicker,$ionicPlatform) {
  $scope.getImage = function(){
        $ionicPlatform.ready(function() {
          var options = {
           maximumImagesCount: 1,
           width: 400,
           height: 400,
           quality: 80
          };
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                $scope.image=results[i];
              }
            }, function(error) {
              // error getting photos
            });
        });
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
