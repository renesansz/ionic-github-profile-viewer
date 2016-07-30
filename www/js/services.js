angular.module('app.services', [])

.factory('GithubProvider', ['$http', '$q', function($http, $q){

    var requestId = null;

    return {
        fetchUser: fetchUser,
        fetchRepo: fetchRepo
    };

    /**
     * Fetch users
     */
    function fetchUser(username) {

        if (requestId) {
            requestId.resolve();
            requestId = null;
        }

        requestId = $q.defer();

        if ( ! username) {
            username = '';
        } else {
            username = '/' + username;
        }

        $http({
            url: 'https://api.github.com/users' + username,
            method: 'GET'
        }).then(function (res) {
            requestId.resolve(res);
        }).catch(function (err) {
            requestId.reject(err);
        });

        return requestId.promise;

    }

    /**
     * Fetch user public repo
     */
    function fetchRepo(repo) {

        requestId = $q.defer();

        $http({
            url: repo,
            method: 'GET'
        }).then(function (res) {
            requestId.resolve(res);
        }).catch(function (err) {
            requestId.reject(err);
        });

        return requestId.promise;

    }

}]);

