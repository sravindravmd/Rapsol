/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])
  .factory('userinfoService',function(){
    var role={};
    var user={};
    return{
      setUserFKID: function (fkid) {
        user.FKID=fkid;
        console.log('setting FKID',fkid)
      },
      getUserFKID: function () {
        return user
        console.log('getting FKID',fkid)
      },
      setRoleInfo:function(roleid){
      //  role.roleid=roleid;
        role.roleid=roleid;
        console.log('setting roleid',role)
      },

      getRoleInfo: function () {

        return role;

      },

      setUsermobile: function (mobile) {

        user.mobile=mobile;
        console.log('setting mobile',mobile)
      },
      getUsermobile: function () {

        return user.mobile;
      },
      setUserinfo:function(data){
      user.otp=data.users.otp;
        user.userId=data.users.userId;

        console.log('setting userinfo',user)
      },

      getUserInfo: function () {

        return user;

      }
    }
  })

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
})

.controller('HomeCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state,$rootScope, $cordovaNetwork,$ionicPopup) {

  $scope.homeLogin= function () {
    $state.go('main.login');
  };
  $scope.homeRegistration= function () {
    $state.go('main.registration');
  };

}).controller('LoginCtrl', function($scope, $stateParams, $timeout, $http,ionicMaterialMotion, ionicMaterialInk,$state,API_ENDPOINT,userinfoService,$ionicLoading,$ionicPopup,$ionicHistory) {


        ionicMaterialInk.displayEffect();

    $scope.forgotPassword= function () {
      $state.go('app.forgot_password');
    };

      //loading functions

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'
      });
    };

    $scope.hide = function(){
      $ionicLoading.hide();
    };


    $scope.firsttime=true;
      $scope.userlogin= function (mobile,password) {
        console.log(mobile,password)
        $scope.show($ionicLoading);
        $http.get(API_ENDPOINT.url+'/services.php/userlogin/'+mobile+'/'+password).success(function (data) {

          console.log('user info message',data);

          var FKID=data.data.user.MEMBER_FK_ID;
          userinfoService.setUserFKID(FKID)
          var role=data.data.user.ROLE_FK_ID;
          console.log(data.data.message.Message);
          console.log('user info media ',data.data.message);

          $scope.message=data.Message;
          if(data.Message!==undefined){
          var alertPopup = $ionicPopup.alert({
            title: $scope.message
          });
          } else if(data.data.message!==undefined){
            var alertPopup = $ionicPopup.alert({
              title: data.data.message
            });
          }

          $timeout(function () {

            if(role==5){
              $state.go('app.channel_partner');
            } else if(role==4){
              $state.go('app.retailer_home');
            } else if(role==3){
              $state.go('app.distributor_home')
            } else if(role==2){
              alert('No state craeted for L1')
            }
            else if(role==6){
              alert('No state craeted L2')
            }else if(role==7){
              alert('No state craeted L3')
            }

          },300)
          /*
           if(data.data.user.ROLE_FK_ID==5){
           $state.go('app.channel_partner');
           } else if(data.data.user.ROLE_FK_ID==5){
           $state.go('app.channel_partner');
           }*/

        }).error(function (error) {

          var alertPopup = $ionicPopup.alert({
            title: $scope.message
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      }

      $scope.checkuser= function (mobile) {

        // Start showing the progress
        $scope.show($ionicLoading);

        userinfoService.setUsermobile(mobile)
        $http.get(API_ENDPOINT.url+'/services.php/firstuserlogin/'+mobile).then(function (data) {

          console.log('First login',data.data.Message.isfrstLogin);
          $scope.messagechck=data.data.Message;

          // Do something on success for example if you are doing a login
          var alertPopup = $ionicPopup.alert({
            title: 'Number verified successfully !'
          });
/*
          // On both cases hide the loading
          $scope.hide($ionicLoading);*/

          if(data.data.Message.isfrstLogin==0){
            $scope.firsttime=true;

            $http({
              method:'POST',
              url:API_ENDPOINT.url+'/services.php/forgotpassword/'+mobile,
              headers: {
                'Content-Type': "application/x-www-form-urlencoded"
              }

            }).success(function (data) {
              console.log(data);
              userinfoService.setUserinfo(data);
              userinfoService.setUsermobile(mobile);

              $state.go('app.otp');

              //alert(data);
              // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

            })


          }

          else if(data.data.Message.isfrstLogin==1){
            $scope.firsttime=false;
          }

        }).catch(function (error) {
          console.log(error);

          // Do something on error
          var alertPopup = $ionicPopup.alert({
            title: 'verification failed!',
            template: 'Please check your number!'
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });


      }


    })

    .controller('RegCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$http,userinfoService,API_ENDPOINT,$ionicPopup,$ionicLoading) {
        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
      };

      $scope.hide = function(){
        $ionicLoading.hide();
      };

      $scope.customer={};
      $scope.retailer={};
      $scope.regsuccess=false;


      $scope.toggle= function (roleid) {

        if(roleid=='4'){
          $scope.retailershow=true;
          $scope.customershow=false;
        }
        else{
          $scope.customershow=true;
          $scope.retailershow=false;
        }

      }
    $scope.show($ionicLoading);
      $http.get(API_ENDPOINT.url+'/services.php/regionlist').then(function(results){
        $scope.hide($ionicLoading);
       $scope.regions=results.data.regionList;
     console.log('regions', $scope.regions);
      }).catch(function (error) {
        alert('Something went wrong!!!!')

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

      $scope.changedresion= function (reregion) {
        $scope.show($ionicLoading);
/*
        console.log($scope.retailer,$scope.retailer.STATE_PK_ID);
*/
        $http.get(API_ENDPOINT.url+'/services.php/statelist/'+reregion).then(function(results){
          $scope.hide($ionicLoading);
          $scope.states=results.data.States;
          console.log('sates for region',  $scope.states);
        })
      }

      $scope.changedstate= function (state) {
        $scope.show($ionicLoading);
        console.log('sates for cites',state)
        $http.get(API_ENDPOINT.url+'/services.php/citylist/'+state).then(function(results){
          $scope.hide($ionicLoading);
          $scope.cities=results.data.cities;
          console.log('cities',  $scope.cities);
        })
      }

      $scope.changedcity= function (city) {
        $scope.show($ionicLoading);
        console.log('city for distributor',city)
        $http.get(API_ENDPOINT.url+'/services.php/distributerlist/'+0).then(function(results){
          $scope.hide($ionicLoading);
          $scope.distributers=results.data.Distributers;
          console.log('distributers', $scope.distributers);
        })
      }

      $scope.retailerRegistration= function (retailer,retailerRegForm) {

        if(retailerRegForm.$valid)
          console.log('retailer',retailer);
        console.log('reatiler form',retailer);

        // Start showing the progress
        $scope.show($ionicLoading);
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/registration',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'city='+retailer.city+'&distributor='+retailer.distributor+'&dob='+retailer.dob+'&email='+retailer.email+'&fname='+retailer.fname+'&mobile='+retailer.mobile+'&region='+retailer.region+'&roleid='+retailer.roleid+'&state='+retailer.state+'&firmname='+retailer.firmname

          /*'city='+'12'+'&distributor='+'16'+'&dob='+'12/12/1091'+'&email='+'g@rg.com'+
          '&fname='+'13'+'&mobile='+'4213432499'+'&region='+'3'+'&roleid='+'4'+
          '&state='+'13'+'&firmname='+'abc'*/
        }).success(function (data, status, headers, config) {

          userinfoService.setRoleInfo(retailer.roleid);
          userinfoService.setUsermobile(retailer.mobile)
          userinfoService.setUserinfo(data);
          $scope.regsuccess=true;
          console.log('registration data for retailer',data)

            $timeout(callAtTimeout, 3000);
          //console.log(success.users)
        })
          .error(function(data, status, headers, config){
            var alertPopup = $ionicPopup.alert({
              title: 'Registration  failed!',
              template: 'Please check your mobile number'
            });
          console.log(data, status, headers, config)
        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

        function callAtTimeout() {
          console.log("Timeout occurred");
          $state.go('app.otp');
        }


        // $state.go('app.login');
        }

      $scope.customerRegistration= function (customer,customerRegForm) {

        if(customerRegForm.$valid){
          console.log("eneted in customer registration",customer);
          userinfoService.setRoleInfo(customer.roleid)
          $scope.show($ionicLoading);
          $http({
            method:'POST',
            url:API_ENDPOINT.url+'/services.php/registration',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:'fname='+customer.fname+'&mobile='+customer.mobile+'&roleid='+customer.roleid
          }).success(function (data, status, headers, config) {
            userinfoService.setUserinfo(data);
            userinfoService.setUsermobile(customer.mobile)
              var alertPopup = $ionicPopup.alert({
                title: 'Registration successful!'
              });
            //$scope.regsuccess=true;
           $timeout(callAtTimeout, 3000);
            console.log(data, status, headers, config)  })
            .error(function(data, status, headers, config){

              var alertPopup = $ionicPopup.alert({
                title: 'Registration  failed!',
                template: 'Please check your mobile number'
              });
            console.log(data, status, headers, config)
          }).finally(function($ionicLoading) {
            // On both cases hide the loading
            $scope.hide($ionicLoading);
          });


        }
      }
      function callAtTimeout() {
        console.log("Timeout occurred");
        $state.go('app.otp');
      }

    })
  .controller('DistResetPassCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistHomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$ionicHistory) {
      $ionicHistory.clearHistory();


        // Set Ink
        ionicMaterialInk.displayEffect();
      $scope.news= function () {
        $state.go('app.news');
      };
      $scope.productKnowledge= function () {
        $state.go('app.product_knowledge');
      };
      $scope.chooseChampion= function () {
        $state.go('app.choose_champion');
      };

      $scope.profile= function () {
        $state.go('app.distributor_my_profile');
      };
      $scope.productDetail= function () {
        $state.go('app.product_detail');
      };
      $scope.distTarget= function () {
        $state.go('app.target_os_p');
      };
      $scope.notification= function () {
        $state.go('app.notification');
      };
      $scope.brandStories= function () {
        $state.go('app.brand_stories');
      };
      $scope.feedbackQuery= function () {
        $state.go('app.feedback_query');
      };
      $scope.changePassword= function () {
        $state.go('app.change_password');
      };
      $scope.createOrder= function () {
        $state.go('app.order');
      };

    })

    .controller('DistProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, API_ENDPOINT,userinfoService) {
        // Set Ink
        ionicMaterialInk.displayEffect();
      var userId;
      if(userinfoService.getUserFKID().FKID==undefined){
        userId=userinfoService.getUserInfo().userId;
      } else{
        userId=userinfoService.getUserFKID().FKID;
      }
      $http.get(API_ENDPOINT.url+'/services.php/viewprofile/'+userId).then(function(results){
        $scope.profile=results.data.userDetails;
        //alert("thhhhhh",$scope.profiles)
        console.log('User Profile Details',results.data.userDetails);
      }).catch(function (error) {
        alert('Something went wrong!!!!')
      })

    })

  .controller('ProductDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http,API_ENDPOINT,$ionicLoading) {
    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.show = function() { 
      $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   });
           };
                $scope.hide = function(){ 
                  $ionicLoading.hide(); };
    $scope.show($ionicLoading);

    $http.get(API_ENDPOINT.url+'/services.php/segmentlist/0/0').then(function(results){
      $scope.productsegments=results.data.segmentlist;
      $scope.hide($ionicLoading);
      console.log('Product Segmet Details', $scope.productsegments);
    }).catch(function (error) {
      alert('Something went wrong!!!!')
    }).finally(function($ionicLoading) { 
      $scope.hide($ionicLoading); });


      $scope.productsegmentDetail= function (productsegment) {
        $scope.show($ionicLoading);

        console.log('product segment',productsegment)
      $http.get(API_ENDPOINT.url+'/services.php/productlist/'+productsegment+'/0/0').then(function(results){
        $scope.products=results.data.productlist;
        $scope.hide($ionicLoading)
        console.log('Product List',  $scope.products);
      }).catch(function (error) {
        alert('Something went wrong!!!!')
      }).finally(function($ionicLoading) {
        $scope.hide($ionicLoading); });
    }
    $scope.productDetail= function (product) {
      $scope.checked=true
      $scope.selectedproduct=product;
      console.log('selectedproduct',$scope.selectedproduct);

    }
  })
    .controller('OrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {

        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distributorOrder= function () {
        $state.go('app.create_order');
      };
    })
    .controller('DistOrderDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();


    })

    .controller('TargetOSCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();



    })

    .controller('notificationCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$http,API_ENDPOINT,$ionicLoading ) {

        // Set Ink
        ionicMaterialInk.displayEffect();

    $scope.show = function() {
      $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   });
    };
    $scope.hide = function(){
      $ionicLoading.hide(); };

    $scope.show($ionicLoading);


    $http.get(API_ENDPOINT.url+'/services.php/notilimit/0/5').then(function (result) {
      $scope.hide($ionicLoading);


          $scope.notifications1=result.data.NotificationList;
        console.log( $scope.notifications1);
    }).catch(function (error) {

        alert("Error on notifocation request")
      }).finally(function($ionicLoading) { 
               $scope.hide($ionicLoading); });

      })

    .controller('ChangePassCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Ink
        ionicMaterialInk.displayEffect();
    })
  .controller('NewsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, API_ENDPOINT,$ionicLoading) {
    $scope.imageurl=API_ENDPOINT.url;
    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.show = function() {
      $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   });
    };
    $scope.hide = function(){
      $ionicLoading.hide(); };

    $scope.show($ionicLoading);

    $http.get(API_ENDPOINT.url+'/services.php/newslimit/0/5').then(function (result) {
      $scope.hide($ionicLoading);
      $scope.newlist=result.data.NewsList;
      console.log( $scope.newlist);
    }).catch(function (error) {

      alert("Error on news request")
    }).finally(function($ionicLoading) {
      $scope.hide($ionicLoading); });

  })
    .controller('CustomerFeedbackCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Ink
        ionicMaterialInk.displayEffect();
    })

  .controller('RetailerProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ForgotPasswordCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$http,userinfoService,$state,API_ENDPOINT) {
        // Set Ink
        ionicMaterialInk.displayEffect();

     $scope.mobile=userinfoService.getUsermobile();
      $scope.forgotpass=function(mobile){
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/forgotpassword/'+mobile,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          }

        }).then(function (data) {
          userinfoService.setUserinfo(data.data);

          $timeout(function () {
            $state.go('app.otp');
          },300)
         // $scope.userinfo=data.data.users;
          console.log(data);
          $scope.message="Otp generated successfully";

          // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

        })


      }
    })

    .controller('brandStoriesCtrl', function($http,$scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,API_ENDPOINT,$ionicLoading,$cordovaSocialSharing) {

    $scope.shareAnywhere = function(brnd) {
      $cordovaSocialSharing.share("Nice brand here", brnd.BRDS_NAME,null, "https://youtu.be/o8G7Nm-zqc4");
    }
        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner class="spinner-energized"></ion-spinner>'
        });
      };

      $scope.hide = function(){
        $ionicLoading.hide();
      };
      $scope.show($ionicLoading);
      $http.get(API_ENDPOINT.url+'/services.php/brandstory/0/5').then(function (result) {

        console.log(result.data);
        $scope.brandstory=result.data.brandstory;
      }).catch(function (error) {

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

      $scope.playerVars = {
        rel: 0,
        showinfo: 0,
        modestbranding: 0
      }
      $scope.anotherGoodOne = 'https://youtu.be/o8G7Nm-zqc4';

    })

    .controller('feedbackQueryCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,userinfoService,$http,$ionicPopup,API_ENDPOINT,$ionicLoading,$rootScope) {
       // Set Ink
        ionicMaterialInk.displayEffect();
    var userId;
   if(userinfoService.getUserFKID().FKID==undefined){
     userId=userinfoService.getUserInfo().userId;
   } else{
     userId=userinfoService.getUserFKID().FKID;
   }

    $scope.show = function() {   $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   }); };

    $scope.hide = function(){   $ionicLoading.hide(); };

    $scope.feedback={};

    $scope.submitFeedback= function (feedback) {
      $scope.show($ionicLoading);
      console.log('feedback info',userId,feedback)



      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/postFeedback',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data:'userId='+userId+'&subject='+$scope.feedback.subject+'&feedback='+$scope.feedback.message

      }).success(function (data) {
        $scope.meesagefeed=data.status.message;
        $scope.hide($ionicLoading);
        console.log('feedback info',userId,feedback)

        console.log(data);
       if(data.status==1){
         var alertPopup = $ionicPopup.alert({
           title: "Feedback Successfully submitted"
         })
         $scope.feedback.subject="";
         $scope.feedback.message="";
       }

        console.log('data',data);
      }).error(function(){
        console.log('Something wrong')
        var alertPopup = $ionicPopup.alert({
          title: 'Something wrong'
        });

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });


    }

    $scope.submitQuery= function (query) {

      $scope.query={};
      $scope.show($ionicLoading);

      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/postQuery',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data:'userId='+userId+'&subject='+$scope.query.subject+'&feedback='+$scope.query.question

      }).success(function (data) {
        $scope.meesagefeed=data.status.message;
        $scope.hide($ionicLoading);
        console.log('query info',userId,query)

        console.log(data);
        if(data.status==1){
          var alertPopup = $ionicPopup.alert({
            title: "query Successfully submitted"
          })
          $scope.query.subject="";
          $scope.query.message="";
        }

        console.log('data',data);
      }).error(function(){
        console.log('Something wrong')
        var alertPopup = $ionicPopup.alert({
          title: 'Something wrong'
        });

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
    }


    })

    .controller('CreateCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http,API_ENDPOINT,$ionicLoading,$ionicPopup,userinfoService) {

        // Set Ink
        ionicMaterialInk.displayEffect();
    $scope.disproduct=true;
    $scope.disqty=true;

      var userId= userinfoService.getUserInfo().userId;
      var FKuserId=userinfoService.getUserFKID().FKID;


      $scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner class="spinner-energized"></ion-spinner>'
        });
      };

      $scope.hide = function(){
        $ionicLoading.hide();
      };
      $scope.show($ionicLoading);

      $http.get(API_ENDPOINT.url+'/services.php/segmentlist/0/0').then(function(results){
        $scope.retailCreateOrderSegments=results.data.segmentlist;
        console.log('Create Product Segmet Details', $scope.retailCreateOrderSegments);
      }).catch(function (error) {
        alert('Something went wrong!!!!')
      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
      $scope.canbook=true;
      $scope.retailsegmentDetail= function (retailCreateProduct) {
        $scope.show($ionicLoading);
        $scope.disproduct=false;
        $http.get(API_ENDPOINT.url+'/services.php/productlist/'+retailCreateProduct+'/0/0').then(function(results){
          $scope.retailCreateproducts=results.data.productlist;
          console.log('Product List', $scope.retailCreateproducts);
        }).catch(function (error) {
          alert('Something went wrong!!!!')
        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });
      }
      $scope.retailcreateproductDetail = function (product) {
        $scope.disqty=false;

        console.log('product id ',product)
        $scope.show($ionicLoading);

        $http.get(API_ENDPOINT.url+'/services.php/product/'+product).then(function(results){
          $scope.product=results.data.Product;

          $scope.productID=product;
          console.log('Product List', JSON.stringify($scope.product));
        }).catch(function (error) {
          alert('Something went wrong!!!!')
        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      }

      $scope.qty= function (qty) {
        $scope.qtyltr=($scope.product.PROD_UNIT_PACK) * qty;
        $scope.canbook=false;

      }

      $scope.confirmorder= function () {

        var productId=$scope.product.PROD_PK_ID;
        var qty=$scope.qtyltr;
        if(userId!==undefined){
          FKuserId=userId;
        }

        console.log('user fkid',FKuserId);

        $scope.show($ionicLoading);
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/orderplace',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'userId='+FKuserId+'&productId='+productId+'&qty='+$scope.qtyltr

        }).success(function (data) {
          console.log(data);
          alert('order succssfull');
          console.log('data',data);
        }).error(function(){
          console.log('Something wrong')
          var alertPopup = $ionicPopup.alert({
            title: 'Something wrong'
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      }
    })
  .controller('customerLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.customerLogin1= function (customer,customerLoginForm) {
      if(customerLoginForm.$valid){
        console.log(customerLoginForm,customer);
        $state.go('app.channel_partner');
      }
    }
  })

  .controller('RetailerLoginCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.retailLogin= function (retailer,retailerLoginForm) {

      if(retailerLoginForm.$valid){
        console.log(retailerLoginForm,retailer);
        $state.go('app.retailer_home');
      }
    }
  })

  .controller('RetailerOrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.retailerCreateOrder= function () {
      $state.go('app.create_order');
    };
    /*$scope.distributorProfile= function () {
      $state.go('app.retailer_order');
    };*/
  })

  .controller('ChangePasswordCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,API_ENDPOINT,userinfoService,$http) {
    // Set Ink
    ionicMaterialInk.displayEffect();


    $scope.changePassword= function (changepass,changePassForm) {
      console.log('FKID ! ',userinfoService.getUserFKID().FKID);
      var oldpassword=changepass.currentpassword;

      console.log('curpass',oldpassword)
      var newpassword=changepass.password;
      console.log('newpass',newpassword)

      var confirmpassword=changepass.conpassword;
      console.log('confirm',confirmpassword)


      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/changepassword',
        data:'userId='+userinfoService.getUserFKID().FKID+'&oldpassword='+oldpassword+'&newpassword='+newpassword+'&confirmpassword='+confirmpassword,
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        }
      }).success(function (data) {
        alert('succefully changed passed');
        console.log('succefully changed passed',data);
      }).error(function (error) {
        alert('failed to  change the passed',error);
      })

    }




  })

    .controller('ExampleController', ['$scope', function($scope) {
        $scope.data = {
            singleSelect: null,
            multipleSelect: [],
            option1: 'option-1'
        };
    }])
  .controller('brandvideoCtrl', function ($scope,$http) {

 /*    $scope.videos = [
     {
     title: "My first video",
     date: "1-1-2015",
     thumbnails: "http://i.ytimg.com/vi/bJp1ptX4F3M/maxresdefault.jpg",
     },
     {
     title: "My second video",
     date: "5-7-2015",
     thumbnails: "http://i.ytimg.com/vi/NA2VerbOyt0/maxresdefault.jpg",
     }
     ]*/

    $scope.playerVars = {
      rel: 0,
      showinfo: 0,
      modestbranding: 0
    }
    $scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
   /* $scope.videos = [];
    $scope.youtubeParams = {
      key: 'AIzaSyAnAi9xKNqI_xNGDKHtFZrInz5l_QkMqNs',
      type: 'video',
      maxResults: '5',
      part: 'id,snippet',
      q: 'creatorup',
      order: 'date',
      channelId: 'UCeEqIv7lVwOOLnwxuuhQFuQ',
    }*/
   /* $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      angular.forEach(response.items, function(child){
        console.log (child);

        $scope.videos.push(child);
      });
    });*/
  })

  .controller('brandaudioCtrl', function ($scope,$http) {


  })
  .controller('otpCtrl', function ($scope,$http,$state,userinfoService,API_ENDPOINT,$ionicLoading,$ionicPopup,$ionicHistory) {
    $ionicHistory.clearHistory();

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Verifying...</p><ion-spinner class="spinner-energized"></ion-spinner>'
      });
    };

    $scope.hide = function(){
      $ionicLoading.hide();
    };

    $scope.userOtp="Use OTP: "+userinfoService.getUserInfo().otp;

    console.log("getting otp:",userinfoService.getUserInfo());

    $scope.verifyotp= function (otp) {
     var userId= userinfoService.getUserInfo().userId;
     console.log('userId',userinfoService.getUserInfo().userId);
      // Start showing the progress
      $scope.show($ionicLoading);

      $http.get(API_ENDPOINT.url+'/services.php/verifyOTP/'+userId+'/'+otp).then(function (data) {



        console.log(data.data.otpStatus);

        if(data.data.otpStatus.status==2){

          var alertPopup = $ionicPopup.alert({
            title: data.data.otpStatus.message+"Please regenerate"
          });
         // alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==1){
          var alertPopup = $ionicPopup.alert({
            title: data.data.otpStatus.message+"Please regenerate"
          });
          //alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==3){
          $state.go('app.create_password')
        } else if(data.data.otpStatus.status==0){
          //alert(data.data.otpStatus.message+" "+"Please regenerate");
          var alertPopup = $ionicPopup.alert({
            title: data.data.otpStatus.message+"Please regenerate"
          });
        }
      /*  if("OTP Expired"==data.otpStatus.status){
          alert(data.otpStatus.status);
        }
        alert('failed');
*/

      }).catch(function (error) {
        var alertPopup = $ionicPopup.alert({
          title: "Something went Wrong....!!!"
        });

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

    }
    $scope.regenrate= function () {
    var  mobile=userinfoService.getUsermobile()

      var userId=userinfoService.getUserInfo().userId;
      console.log('userId',userinfoService.getUserInfo().userId)
      console.log('userMobile',userinfoService.getUsermobile());
      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/getOTP',
        data:'userId='+userId,

        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        }

      }).success(function (data) {
        console.log(data)
          //userinfoService.setUserinfo(data)

        $scope.userOtp="Use OTP: "+userinfoService.getUserInfo().otp

        alert(data);
        // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

      })

    }

  })
  .controller('CreatePasswordCtrl', function ($scope,$http,userinfoService,$state,API_ENDPOINT,$ionicPopup,$ionicLoading,$ionicHistory) {

    $ionicHistory.clearHistory();
    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    };

    $scope.hide = function(){
      $ionicLoading.hide();
    };


$scope.createNewPassword= function (createpass ,createPassForm) {
      var userId= userinfoService.getUserInfo().userId;
      var mobile=userinfoService.getUsermobile();

     $scope.show($ionicLoading);
      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/firstusercredential',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"

        },
        data:'new_password='+createpass.password+'&confirm_password='+createpass.conPassword+'&userId='+userId

      }).then(function (data) {
        //alert(data);

        $http.get(API_ENDPOINT.url+'/services.php/userlogin/'+mobile+'/'+createpass.password).success(function (data) {

          console.log('user info',data.data.user.ROLE_FK_ID);

          var role=data.data.user.ROLE_FK_ID;
          console.log('user info',data.data.message);

          var message=data.data.message;
            if(role==5){
              $state.go('app.channel_partner');
            } else if(role==4){
              $state.go('app.retailer_home');
            } else if(role==3){
              $state.go('app.distributor_home')
          } else if(role==2){
             alert('No state craeted for L1')
            }
            else if(role==6){
              alert('No state craeted L2')
            }else if(role==7){
              alert('No state craeted L3')
            }
/*
          if(data.data.user.ROLE_FK_ID==5){
            $state.go('app.channel_partner');
          } else if(data.data.user.ROLE_FK_ID==5){
            $state.go('app.channel_partner');
          }*/

        }).error(function (error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Something went wrong...!'
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });
        /*  var roleId=userinfoService.getRoleInfo().roleid;
          if(roleId==5){
            $state.go('app.channel_partner');
          } else if(roleId==4){
            $state.go('app.retailer_home');
          }*/

        // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

      })

    }


  })
  .controller('otpforloginCtrl`', function ($scope,$http,$state,userinfoService,API_ENDPOINT) {

    $scope.verifyotp= function (otp) {
      var mobile= userinfoService.getUserInfo().mobile;
      console.log('Mobile',userinfoService.getUserInfo().mobile);


      $http.get(API_ENDPOINT.url+'/services.php/verifyOTP/'+userId+'/'+otp).then(function (data) {

        console.log(data.data.otpStatus);

        if(data.data.otpStatus.status==2){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==1){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        } else if(data.data.otpStatus.status==3){
          $state.go('app.create_password')
        } else if(data.data.otpStatus.status==0){
          alert(data.data.otpStatus.message+" "+"Please regenerate");
        }
        /*  if("OTP Expired"==data.otpStatus.status){
         alert(data.otpStatus.status);
         }
         alert('failed');
         */

      }).catch(function (error) {

      })

    }

  }).controller('chooseChampionCtrl', function ($scope, $http,API_ENDPOINT,$ionicLoading,$ionicPopup) {

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading please wait...</p><ion-spinner class="spinner-energized"></ion-spinner>'
      }); };

    $scope.hide = function(){   $ionicLoading.hide(); };
    $scope.show($ionicLoading);


    $http.get(API_ENDPOINT.url+'/services.php/recommendationbikes').then(function(results){
      $scope.show($ionicLoading);
    /*$scope.bikes=results.data.Bikes;
    console.log('bikes', $scope.bikes);
  }).catch(function (error) {
    alert('Something went wrong!!!!')
  })*/
    $scope.bikes=results.data.Bikes;
    console.log('bikes', $scope.bikes);
  }).catch(function (error) {
      var alertPopup = $ionicPopup.alert({   title: "Error on request" });
  }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
    //$scope.choosebike= function () {}
    $scope.choosebike= function (bike) {
      $scope.show($ionicLoading);
      console.log('choosed bike',bike)
      $http.get(API_ENDPOINT.url+'/services.php/recommendationbikesrecom/'+bike).then(function(results){
        $scope.show($ionicLoading);
        $scope.bikeDetails=results.data[0];
        console.log('bikeDetails',results);
        console.log('indoi',results.data[0]);
      }).catch(function (error) {
        var alertPopup = $ionicPopup.alert({   title: "Error on request" });
      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
    }
})

  .controller('productKnowledgeCtrl', function ($scope, $http,API_ENDPOINT, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicLoading,$ionicPopup) {

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.show = function() { 
      $ionicLoading.show({ 
        template: '<p>Loading please wait...</p><ion-spinner class="spinner-energized"></ion-spinner>' 
      }); };

    $scope.hide = function(){   $ionicLoading.hide(); };
    $scope.show($ionicLoading);


    $http.get(API_ENDPOINT.url+'/services.php/productknowledge/0/0').then(function (result) {

      $scope.productKnowledges=result.data.productknowledge;
      console.log( $scope.productKnowledges);
    }).catch(function (error) {

      var alertPopup = $ionicPopup.alert({   title: "Error on Product Knowledge request" });
    }).finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });
  })

  .controller('LogoutCtrl', function ($state,$ionicHistory) {

    $ionicHistory.clearHistory();

      $state.go('main.home');



  })
  .controller('MainCtrl', function ($scope) {

  })

;
