angular.module('app.services', [])

.factory('GithubProvider', ['$http', '$q', function($http, $q){

    return {
        fetchUser: fetchUser,
        fetchRepo: fetchRepo
    };

    /**
     * Fetch users
     */
    function fetchUser(username) {

        var d = $q.defer();

        if ( ! username) {
            username = '';
        } else {
            username = '/' + username;
        }
        
        $http({
            url: 'https://api.github.com/users' + username,
            method: 'GET'
        }).then(function (res) {
            d.resolve(res);
        }).catch(function (err) {
            d.reject(err);
        });

        return d.promise;

    }

    /**
     * Fetch user public repo
     */
    function fetchRepo(repo) {

        var d = $q.defer();

        $http({
            url: repo,
            method: 'GET'
        }).then(function (res) {
            d.resolve(res);
        }).catch(function (err) {
            d.reject(err);
        });

        return d.promise;

    }

}]);

