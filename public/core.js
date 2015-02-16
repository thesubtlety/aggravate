var aggravation = angular.module('aggravation', []);

function mainController($scope, $http) {
  $scope.formData = {};

  //when landing, get all and show
  $http.get('/api/components')
    .success(function(data) {
        $scope.components = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

  //when submitting, send text to node API
  $scope.createComponent = function() {
    $http.post('/api/components', $scope.formData)
      .success(function(data) {
          $scope.formData = {}; //clear form
          $scope.components = data;
          })
      .error(function(data) {
          console.log('Error: ' + data);
          });
  };

  //delete after checking
  $scope.deleteComponent = function(id) {
    $http.delete('/api/components/' +id)
      .success(function(data) {
          $scope.components = data;
          })
      .error(function(data) {
          console.log('Error: ' + data);
          });
  };
}
