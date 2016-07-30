angular.module('app.controllers', [])
  
.controller('searchCtrl', function($scope, GithubProvider) {

    $scope.users = [];
    $scope.searchStr = '';
    $scope.searchUser = function (name) {
        GithubProvider
            .fetchUser(name)
            .then(function (res) {
                $scope.users = res.data;
            });
    };

    // Initialize
    $scope.searchUser();

})
   
.controller('profileCtrl', function($scope, GithubProvider, $stateParams) {

    $scope.user = {};
    $scope.repos = [];
    // Fetch user
    GithubProvider
        .fetchUser($stateParams.user)
        .then(function (res) {
            $scope.user = res.data;

            // Fetch user's public repo
            GithubProvider
                .fetchRepo(res.data.repos_url)
                .then(function (res) {
                    $scope.repos = res.data;
                });
        });

})
 