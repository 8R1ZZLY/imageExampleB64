angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope,$cordovaImagePicker,$ionicPlatform) {
  
  $scope.getImage = function(){
        $scope.data= {image:""};
        $ionicPlatform.ready(function() {
          var options = {
           maximumImagesCount: 1,
           width: 200,
           height: 0,
           quality: 50
          };
          $cordovaImagePicker.getPictures(options)
            .then(function (results) {
              for (var i = 0; i < results.length; i++) {
                $scope.toDataUrl(results[i],function(base64img){
                  //console.log(base64img);
                  $scope.data.image = base64img;
                  $scope.$digest();
                },'png');
                //console.log(results[i]);
                //$scope.image=results[i];
              }
            }, function(error) {
              // error getting photos
            });
        });
  }
  $scope.toDataUrl = function(src, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
      };
      img.src = src;
      if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
      }
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
