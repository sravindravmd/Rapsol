angular.module('starter.services', []).constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url:'http://labs.govasool.com/repsol_v1/webservices'
    //url:'http://10.10.10.78/gulf_v1/webservices'
    //  For a simulator use: url: 'http://127.0.0.1:8080/api'
  })
  .factory('userinfoService',function(){
    var role={};
    var user={};
    return{
      insertdumy: function () {
        user.dummy=0;
        window.localStorage.setItem('username',JSON.stringify(user));
        window.localStorage.setItem('userFKID',JSON.stringify(user));
      },
      setUsername: function (username) {
        user.Username=username;
        window.localStorage.setItem('username',JSON.stringify(user));
      /* console.log('setting and get Username',window.localStorage.getItem('username'))
        console.log('getting Username', JSON.parse(window.localStorage.getItem('username')))*/
      },
      getUsername: function () {
        //return user
        return JSON.parse(window.localStorage.getItem('username'));
        console.log('getting Username', JSON.parse(window.localStorage.getItem('username')))
      },
      setUserFKID: function (fkid) {
        user.FKID=fkid;
        window.localStorage.setItem('userFKID',JSON.stringify(user));
        console.log('setting FKID',fkid)

      },
      getUserFKID: function () {
        //return user
        return JSON.parse(window.localStorage.getItem('userFKID'));
        console.log('getting FKID',window.localStorage.getItem('userFKID'))
      },
      setRoleInfo:function(roleid){
        //  role.roleid=roleid;
        role.roleid=roleid;

        window.localStorage.setItem('role',JSON.stringify(role));
        console.log('setting roleid',role)

      },

      getRoleInfo: function () {

        //return role;

        return JSON.parse(window.localStorage.getItem('role'));

      },

      setUsermobile: function (mobile) {

        user.mobile=mobile;
        console.log('setting mobile',mobile)
        window.localStorage.setItem('mobile',JSON.stringify(mobile));


      },
      getUsermobile: function () {

       // return user.mobile;

        return JSON.parse(window.localStorage.getItem('mobile'));
      },
      setUserinfo:function(data){
        user.otp=data.users.otp;
        user.userId=data.users.userId;


        console.log('setting userinfo',user)
        window.localStorage.setItem('user',JSON.stringify(user));
      },

      getUserInfo: function () {
        return JSON.parse(window.localStorage.getItem('user'));
        //return user;

      },

      removeUserInfo: function () {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('mobile');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('userFKID');

        return window.localStorage.removeItem('username');
      }
    }
  })


.factory('brandstoryService', function ($http,$q) {
 return null
})
  .filter('commasrm', function () {

    return function (input) {

      var ReplacedNumber = input.replace(/\,/g,'');
      console.log('removing number',ReplacedNumber);

      return ReplacedNumber;
    }
  })

  .factory('OrderHistoryService', function ($http,API_ENDPOINT,userinfoService) {
    var OrderHis=[];
   var roldeId= userinfoService.getRoleInfo().roleid;
    var userId=userinfoService.getUserFKID().FKID;

    console.log('OrderHistoryService role',roldeId)
    console.log('OrderHistoryService UserId',userId)


    return {
      getOrderHistory: function () {

        return  $http.get(API_ENDPOINT.url+'/services.php/myteamorders/'+userId+'/'+roldeId+'/'+0+'/'+0).success(function (data) {
          console.log('order history service',data.orderdetails);

          OrderHis=data.orderdetails;
          console.log('order history service length',OrderHis.length);
          return data.orderdetails;

        })
      },
      getOrderDtl: function (OrderId) {
        for(i=0;i<OrderHis.length;i++){
          if(OrderHis[i].ORD_PK_ID==OrderId){
            return OrderHis[i];
          }
        }

      }
    }

  })
  .factory('notesService', function ($http,API_ENDPOINT,userinfoService) {

    var userId=0;

    return{

      getNotes: function () {
        var userId=userinfoService.getUserFKID().FKID;
        console.log('>>>',userId)


          return $http.get(API_ENDPOINT.url+'/services.php/pushnotifications/'+userId).success(function (data) {
            console.log('notefication data',data);
            return data;
          })







      }
    }
  })

/*.factory('networkService', function ($rootScope) {

    return{
      getNetwork: function () {

        var isOnline = $cordovaNetwork.isOnline()

        var isOffline = $cordovaNetwork.isOffline()


        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          var onlineState = networkState;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          var offlineState = networkState;
        })
      }
    }

  })*/;


/*.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})*/

/*
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
*/

