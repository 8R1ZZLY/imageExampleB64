# imageExampleB64

## installation of this boilerplate:

    ionic state restore
    bower install ngCordova
    bower install ngImgCrop
    cordova plugin add https://github.com/wymsee/cordova-imagePicker.git

## first installation:
    bower install ngCordova
    bower install ngImgCrop
    cordova plugin add https://github.com/wymsee/cordova-imagePicker.git
    
### index.html
    ...
    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="lib/ngCordova/dist/ng-cordova.min.js"></script>
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/services.js"></script>
    <script src="lib/ng-img-crop/compile/minified/ng-img-crop.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/ng-img-crop/compile/minified/ng-img-crop.css">
    ...

### app.js
	var myAppModule = angular.module('MyApp', ['ngImgCrop',ngCordova]); //add dependencies
### controller.js (put this in your controller)
        $scope.getImage = function(){
              $scope.data= {image:""};
              $scope.data.image ='';
              $scope.myCroppedImage='';
        
              $ionicPlatform.ready(function() {
                var options = {
                 maximumImagesCount: 1,
                 width: 500,
                 height: 0,
                 quality: 80
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
### yourhtml.html
        <div class="cropArea" style="width:100%;height:400px;">
        <img-crop  style="width:100%;" image="data.image" result-image="myCroppedImage"></img-crop>
        <img ng-src="{{myCroppedImage}}" />
