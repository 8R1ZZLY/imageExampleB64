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