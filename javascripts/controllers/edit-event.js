var app = angular.module('edit_event', [ 'colorpicker.module', 'wysiwyg.module'])

app.controller('editEventCtrl', ['$scope', '$http', 'auth', '$window', '$firebaseArray', function($scope, $http, auth, $window, $firebaseArray){
    // $scope.event_list = [];
    $scope.event = {
        eventName: "",
        eventDate: "",
        shortInfo: "",
        eventInfo: "",
        eventClub: auth.profile.nickname
    };


    $scope.submit = function() {
        if ($scope.event.eventInfo && $scope.event.eventName && $scope.event.eventDate && $scope.event.shortInfo ) {
          // $scope.event_list.push($scope.event);
          var x = $scope.event.eventDate
          $scope.event.eventDate = Date.parse(x);
          var rootRef = firebase.database().ref().child('sac');
          var ref = rootRef.child('events')
          var list = $firebaseArray(ref);
          list.$add($scope.event).then(function(ref) {
            $scope.event = {};
            $scope.event.eventInfo = '';
            $scope.message = '';
            $window.location.href = '#/clubs/event/' + ref.key;
          });
          // $http.post('https://ecb-sac-back-end.rapidapi.io/post_event', $scope.event).success(function(data) {
          //   $scope.event = {};
          //   $scope.event.eventInfo = '';
          //   $scope.message = '';
          //   $window.location.href = '#/clubs/event/'+data._id;
          // });
        } else {
          $scope.message = 'Please Fill All Feilds';
        }
      };
}]);
