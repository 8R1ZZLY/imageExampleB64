# imageExampleB64

## instalation:

    ionic state restore
    bower install ngCordova
    bower install ngImgCrop
    cordova plugin add https://github.com/wymsee/cordova-imagePicker.git

## link:
    
### index.html

    <script src="angular.js"></script>
	<script src="ng-img-crop.js"></script>
	<link rel="stylesheet" type="text/css" href="ng-img-crop.css">

### app.js
	var myAppModule = angular.module('MyApp', ['ngImgCrop']);
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
