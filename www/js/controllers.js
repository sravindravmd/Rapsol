/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,notesService, $interval,userinfoService,$state) {
    userinfoService.insertdumy();
    $scope.note=0;
    $scope.goto= function () {
      $state.go('app.note');
    }

     var intervalnotes=function(){

       if(userinfoService.getUserFKID().FKID!==undefined){
       notesService.getNotes().success(function (data) {

         $scope.note=data.count
         console.log("notes Ctrl",data.count);
       });}
     }


    $interval(intervalnotes,300000);




}).controller('noteCtrl', function () {

  })

.controller('HomeCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state,$rootScope, $cordovaNetwork,$ionicPopup,$location) {

  $scope.homeLogin= function () {
    //$location.url('#/main/login');
   $state.go('main.login',null, {reload:true});
  };
  $scope.homeRegistration= function () {
    $state.go('main.registration',null, {reload:true});
  };

})
  .controller('LoginCtrl', function($scope, $stateParams, $timeout, $http,ionicMaterialMotion, ionicMaterialInk,$state,API_ENDPOINT,
                                    userinfoService,$ionicLoading,$ionicPopup,$ionicHistory,$window) {

    //window.location.reload();
        ionicMaterialInk.displayEffect();



      $scope.firsttime=true;
      $scope.mobile="";


    $ionicHistory.nextViewOptions({
      disableBack:true
    });


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



      $scope.userlogin= function (mobile,password) {
        console.log(mobile,password)
        $scope.show($ionicLoading);
        $http.get(API_ENDPOINT.url+'/services.php/userlogin/'+mobile+'/'+password).success(function (data) {

          console.log('user info message',data.Message);
          switch (data.Message){

            case 'Invliad credentials':

              var alertPopup = $ionicPopup.alert({
                title: 'Invalid credentials'
              });
                  break;
          }

          console.log('data.data.user',data.data.user)

          switch(data.data.message){
            case 'Succesfully logined In.': var FKID=data.data.user.MEMBER_FK_ID;
              var username=data.data.user.FULL_NAME;
              userinfoService.setUserFKID(FKID)
              userinfoService.setUsername(username)
              var role=data.data.user.ROLE_FK_ID;
              userinfoService.setRoleInfo(role);
              console.log(data.data.message.Message);
              console.log('user info media ',data.data.message);

              $timeout(function () {

                if(role==5){
                  $state.go('app.channel_partner');
                } else if(role==4){
                  $state.go('app.retailer_home');
                } else if(role==3){
                  $state.go('app.distributor_home')
                } else if(role==2){
                  //alert('No state craeted for L1')
                  $state.go('app.slm1_home');
                }
                else if(role==6){
                  //alert('No state craeted L2')
                  $state.go('app.slm2_home');
                }else if(role==7){
                  //alert('No state craeted L3')
                  $state.go('app.slm1_home');
                }

              },300)
              break;

          }


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

          if(data.data.Message.isfrstLogin==undefined){
            var alertPopup = $ionicPopup.alert({
              title: 'Invalid number'
            });
          }
        /*  $scope.messagechck=data.data.Message;
*/
          // Do something on success for example if you are doing a login
         /* var alertPopup = $ionicPopup.alert({
            title: 'Number verified successfully !'
          });*/
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

   /* onloadLogin();
    console.log('on change call',onloadLogin)*/


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
        $http.get(API_ENDPOINT.url+'/services.php/distributerlist/'+city).then(function(results){
          $scope.hide($ionicLoading);
          $scope.distributers=results.data.Distributers;
          console.log('distributers', $scope.distributers);
        })
      }

      $scope.retailerRegistration= function (retailer,retailerRegForm,choose) {

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
          data:'city='+retailer.city+'&distributor='+retailer.distributor+'&dob='+retailer.dob+'&email='+retailer.email+'&fname='+retailer.fname+'&mobile='+retailer.mobile+'&region='+retailer.region+'&roleid='+choose+'&state='+retailer.state+'&firmname='+retailer.firmname

          /*'city='+'12'+'&distributor='+'16'+'&dob='+'12/12/1091'+'&email='+'g@rg.com'+
          '&fname='+'13'+'&mobile='+'4213432499'+'&region='+'3'+'&roleid='+'4'+
          '&state='+'13'+'&firmname='+'abc'*/
        }).success(function (data, status, headers, config) {

          userinfoService.setRoleInfo(choose);
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
          $state.go('main.otp');
        }


        // $state.go('app.login');
        }

      $scope.customerRegistration= function (customer,customerRegForm,choose) {

        if(customerRegForm.$valid){
          console.log("eneted in customer registration",customer);
          userinfoService.setRoleInfo(choose)
          $scope.show($ionicLoading);
          $http({
            method:'POST',
            url:API_ENDPOINT.url+'/services.php/registration',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:'fname='+customer.fname+'&mobile='+customer.mobile+'&roleid='+choose
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
        $state.go('main.otp');
      }

    })
  .controller('DistResetPassCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('DistHomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,$ionicHistory,API_ENDPOINT,userinfoService,$http) {
      $ionicHistory.clearHistory();
     // console.log('<<<<<<<<>>>>>>',userinfoService.getUsername())
      //$scope.Username=userinfoService.getUsername().Username;
    ionicMaterialInk.displayEffect();

    var userId;
    var roleId=$scope.rlid=userinfoService.getRoleInfo().roleid;
    // $scope.rlid=3;

    userId=userinfoService.getUserFKID().FKID;


    $http.get(API_ENDPOINT.url+'/services.php/viewprofile/'+userId+'/'+roleId).then(function(results){
      $scope.profiles=results.data.userDetails;

      //alert("thhhhhh",$scope.profiles)
      console.log('User Profile Details',results.data.userDetails);
    }).catch(function (error) {
      alert('Something went wrong!!!!')
    })


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

    $scope.MyTeamOrders= function () {
      $state.go('app.myteam_order');
    };
    $scope.MyDisTeamOrders= function () {
      $state.go('app.mydisteam_order');
    };

    })

    .controller('DistProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http, API_ENDPOINT,userinfoService) {
        // Set Ink
        ionicMaterialInk.displayEffect();
      var userId;
    var roleId=$scope.rlid=userinfoService.getRoleInfo().roleid;
   // $scope.rlid=3;

      userId=userinfoService.getUserFKID().FKID;


      $http.get(API_ENDPOINT.url+'/services.php/viewprofile/'+userId+'/'+roleId).then(function(results){
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
    .controller('OrderCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,userinfoService) {

      $scope.relid=userinfoService.getRoleInfo().roleid;

    $scope.dismyorder;
        if( $scope.relid==2 || $scope.relid==6 || $scope.relid==7){
          $scope.dismyorder=true;
        }
        // Set Ink
        ionicMaterialInk.displayEffect();

      $scope.distributorOrder= function () {
        $state.go('app.create_order');
      };
    $scope.MyOrders= function () {
        $state.go('app.my_orders');
      };
    $scope.MyTeamOrders= function () {
        $state.go('app.myteam_order');
      };
    $scope.MyDisTeamOrders= function () {
      $state.go('app.mydisteam_order');
    };


    })

  .controller('MyOrdersCtrl', function ($scope,API_ENDPOINT,userinfoService,$ionicLoading,$http,$ionicPopup) {

    $scope.show = function() {
      $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   });
    };
    $scope.hide = function(){
      $ionicLoading.hide(); };

    $scope.show($ionicLoading);
    var userId=userinfoService.getUserFKID().FKID;

    /*if(userinfoService.getUserInfo().userId==undefined){
      userId=userinfoService.getUserFKID().FKID;
    } else{
      userId=userinfoService.getRoleInfo().userId;
    }*/

    //$http.get(API_ENDPOINT.url+'/services.php/myorders/'+userid+'/'+fromdate+'/'+fromdate+'').then(function (result) {
    $http.get(API_ENDPOINT.url+'/services.php/myorders/'+userId+'/0/0').then(function (result) {
      $scope.hide($ionicLoading);


      $scope.myOrders=result.data.orderdetails;
      console.log( $scope.myOrders);
    }).catch(function (error) {

      alert("Error on MyOrder request")
    }).finally(function($ionicLoading) {
      $scope.hide($ionicLoading); });


  })

  .controller('MyTeamOrdersCtrl', function ($scope,OrderHistoryService,$ionicLoading,userinfoService) {

    var roldeId= userinfoService.getRoleInfo().roleid;
    var userId=userinfoService.getUserFKID().FKID;
    $scope.userId=userId;
    $scope.show = function() {   $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'
    }); };
    $scope.hide = function(){
      $ionicLoading.hide();
    };
    function intialdata(){
      $scope.show($ionicLoading);
      OrderHistoryService.getOrderHistory().success(function (orders) {
        $scope.orderdetails=orders.orderdetails;
        console.log('ctrl data',orders.orderdetails)
        $scope.hide($ionicLoading);

      })


    }
    intialdata();
  })

  .controller('MyDisTeamOrdersCtrl', function ($scope,OrderHistoryService,$ionicLoading,userinfoService) {

    var roldeId= userinfoService.getRoleInfo().roleid;
    var userId=userinfoService.getUserFKID().FKID;
    $scope.userId=userId;
    $scope.show = function() {   $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'
    }); };
    $scope.hide = function(){
      $ionicLoading.hide();
    };
    function intialdata(){
      $scope.show($ionicLoading);
      OrderHistoryService.getOrderHistory().success(function (orders) {
        $scope.orderdetails=orders.orderdetails;
        console.log('ctrl data',orders.orderdetails)
        $scope.hide($ionicLoading);

      })


    }
    intialdata();
  })

  .controller('MyTeamsOrderDtlCtrl', function ($stateParams,OrderHistoryService,$scope,userinfoService,$ionicLoading,$http,$ionicPopup,API_ENDPOINT) {
    var orderId= $stateParams.id;

    $scope.show = function() {   $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>' 
    }); };
          $scope.hide = function(){ 
            $ionicLoading.hide(); 
          };
    var userId=userinfoService.getUserFKID().FKID;
    $scope.userId=userId;
    var roldeId= userinfoService.getRoleInfo().roleid;

    $scope.roleId=roldeId;
    /*if(userinfoService.getUserInfo().userId==undefined){
      userId=userinfoService.getUserFKID().FKID;
    } else{
      userId=userinfoService.getRoleInfo().userId;
    }*/

    $scope.OrderDtl=OrderHistoryService.getOrderDtl(orderId);

    console.log('Details',$scope.OrderDtl)


    $scope.Approve= function () {
      var userId=userinfoService.getUserFKID().FKID;

      console.log('userId in App',userId);
      console.log('orderid in App',orderId);
      var remark=prompt('Please provide Remark');
      if(remark){
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/orderStatusApprove',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'userid='+userId+'&orderid='+orderId+'&status='+'Approve'+'&remark='+remark

        }).success(function (data) {
          $scope.hide($ionicLoading);
          console.log('Approved successfully')

          console.log('data',data);

          if(data.status==1){
            $scope.approvestatus=true;
            var alertPopup = $ionicPopup.alert({
              title: 'Order Approved successfully'
            });
            OrderHistoryService.getOrderHistory();
          }
        }).error(function(){
          console.log('Something wrong')
          var alertPopup = $ionicPopup.alert({
            title: 'Something wrong'
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      } else{
        alert('remark required');
      }
    }
    $scope.DisApprove= function () {

      var remark=prompt('Please provide Remark');
      if(remark){
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/orderStatusApprove',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'userid='+userId+'&orderid='+orderId+'&status='+'Reject'+'&remark='+remark

        }).success(function (data) {
          $scope.hide($ionicLoading);
          console.log('Rejected successfully')

          console.log('data',data);

          if(data.status==1){
            $scope.approvestatus=true;
            var alertPopup = $ionicPopup.alert({
              title: 'Order Rejected successfully'
            });
            OrderHistoryService.getOrderHistory();
          }
        }).error(function(){
          console.log('Something wrong')
          var alertPopup = $ionicPopup.alert({
            title: 'Something wrong'
          });

        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      } else{
        alert('remark required');
      }
    }



  })
    .controller('DistOrderDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();

    })

    .controller('TargetOSCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

        // Set Ink
        ionicMaterialInk.displayEffect();



    })

    .controller('notificationCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$http,API_ENDPOINT,$ionicLoading,userinfoService) {

        // Set Ink
        ionicMaterialInk.displayEffect();

    $scope.show = function() {
      $ionicLoading.show({     template: '<p>Loading...</p><ion-spinner class="spinner-energized" icon="spiral"></ion-spinner>'   });
    };
    $scope.hide = function(){
      $ionicLoading.hide(); };

    $scope.show($ionicLoading);

    var roleId=userinfoService.getRoleInfo().roleid;

    $http.get(API_ENDPOINT.url+'/services.php/notilimit/'+roleId+'/0/0').then(function (result) {
      $scope.hide($ionicLoading);


          $scope.notifications1=result.data.NotificationList;
        console.log( $scope.notifications1);
    }).catch(function (error) {

        alert("Error on notifocation request")
      }).finally(function($ionicLoading) { 
               $scope.hide($ionicLoading); });


    $scope.doRefresh= function () {
      $http.get(API_ENDPOINT.url+'/services.php/notilimit/'+roleId+'/0/0').then(function (result) {
        $scope.hide($ionicLoading);


        $scope.notifications1=result.data.NotificationList;
        console.log( $scope.notifications1);
      }).catch(function (error) {

        alert("Error on notifocation request")
      }).finally(function($ionicLoading) {
        $scope.hide($ionicLoading);
        $scope.$broadcast('scroll.refreshComplete');});

    }

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

    $scope.doRefresh= function () {
      $scope.show($ionicLoading);

      $http.get(API_ENDPOINT.url+'/services.php/newslimit/0/5').then(function (result) {
        $scope.hide($ionicLoading);
        $scope.newlist=result.data.NewsList;
        console.log( $scope.newlist);
      }).catch(function (error) {

        alert("Error on news request")
      }).finally(function($ionicLoading) {
        $scope.hide($ionicLoading);
        $scope.$broadcast('scroll.refreshComplete');
      });

    };

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
            $state.go('main.otp');
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


    $scope.show($ionicLoading);

    function lodeprevquery(){
      $http.get(API_ENDPOINT.url+'/services.php/viewqueryReply/0/'+userId).then(function (result) {


        $scope.queryfeedbackmsg=result.data.queries

        console.log(result.data.queries);
        console.log($scope.queryfeedbackmsg);

      }).catch(function (error) {

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });
    }
    lodeprevquery();


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
    $scope.query={};

    $scope.submitQuery= function (query) {


      $scope.show($ionicLoading);

      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/postQuery',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data:'userId='+userId+'&subject='+$scope.query.subject+'&question='+$scope.query.question

      }).success(function (data) {
        $scope.meesagefeed=data.status.message;
        $scope.hide($ionicLoading);

        console.log('query info',userId,query)
        console.log('calling lodeprevquery');

        console.log(data);
        if(data.status==1){
          var alertPopup = $ionicPopup.alert({
            title: "Query Successfully submitted"

          })
          $scope.query.subject="";
          $scope.query.question="";
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
        lodeprevquery();
      });
    }


    })

    .controller('CreateCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $http,API_ENDPOINT,$ionicLoading,$ionicPopup,userinfoService,$ionicHistory) {

        // Set Ink
        ionicMaterialInk.displayEffect();
    $scope.disproduct=true;
    $scope.disqty=true;
    $scope.oqin=0;
    var roleId=userinfoService.getRoleInfo().roleid;
    $scope.rlid=userinfoService.getRoleInfo().roleid;
    //$scope.rlid=4;
    //var userId= userinfoService.getUserInfo().userId;
      var userId=userinfoService.getUserFKID().FKID;


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

        $http.get(API_ENDPOINT.url+'/services.php/product/'+product+'/'+roleId).then(function(results){
          $scope.products=results.data.Product;

          $scope.lppl=$scope.products.PROD_BILLING_PRICE_PER_LITER-$scope.products.proDis;

          $scope.productID=product;
          console.log('Product List', JSON.stringify($scope.products));
        }).catch(function (error) {
          alert('Something went wrong!!!!')
        }).finally(function($ionicLoading) {
          // On both cases hide the loading
          $scope.hide($ionicLoading);
        });

      }


      $scope.confirmorderForRetailer= function (qty) {


        console.log('user fkid',userId);
        console.log('user Userid',userId);


        $scope.show($ionicLoading);
        $http({
          method:'POST',
          url:API_ENDPOINT.url+'/services.php/orderplace',
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          },
          data:'userId='+userId+'&productId='+$scope.productID+'&qty='+qty+'&roleid='+roleId

        }).success(function (data) {
          console.log(data);
          var alertPopup = $ionicPopup.alert({
            title: 'Order created successfully'
          });
          $ionicHistory.goBack();
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

    $scope.confirmorderForDistributor= function (qty) {


      console.log('user fkid',userId);
      console.log('user Userid',userId);


      $scope.show($ionicLoading);
      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/orderplace',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data:'userId='+userId+'&productId='+$scope.productID+'&qty='+qty+'&roleid='+roleId

      }).success(function (data) {
        console.log(data);
        var alertPopup = $ionicPopup.alert({
          title: 'Order successfully created'
        });
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

  .controller('ChangePasswordCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,API_ENDPOINT,userinfoService,$http,$ionicHistory) {
    // Set Ink
    ionicMaterialInk.displayEffect();
    var userId=userinfoService.getUserFKID().FKID;

    $scope.changePassword= function (changepass,changePassForm) {
      var oldpassword=changepass.currentpassword;

      console.log('curpass',oldpassword)
      var newpassword=changepass.password;
      console.log('newpass',newpassword)

      var confirmpassword=changepass.conpassword;
      console.log('confirm',confirmpassword)


      $http({
        method:'POST',
        url:API_ENDPOINT.url+'/services.php/changepassword',
        data:'userId='+userId+'&oldpassword='+oldpassword+'&newpassword='+newpassword+'&confirmpassword='+confirmpassword,
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        }
      }).success(function (data) {
        console.log('change password ',data.Message);
        //{Message: "Old Password is Mismatch"}

        if(data.Message=='Old Password is Mismatch'){
        alert('Old Password is Mismatch');} else{
          alert('Password Changed Successfully');
          $ionicHistory.goBack();
        }
        console.log('Successfully changed passed',data);
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
    $scope.userOtp;

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
          $state.go('main.create_password')
        } else if(data.data.otpStatus.status==0){
          //alert(data.data.otpStatus.message+" "+"Please regenerate");
          var alertPopup = $ionicPopup.alert({
            title: data.data.otpStatus.message+"  Please Check "
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
      $scope.show($ionicLoading);
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
        $scope.hide($ionicLoading);
        console.log(data)
          //userinfoService.setUserinfo(data)

        $scope.userOtp="Use OTP: "+userinfoService.getUserInfo().otp;

        // 'new_password='+createpass.password+'&confirm_password='+createpass.conPassword

      }).catch(function (error) {
        var alertPopup = $ionicPopup.alert({
          title: "Something went Wrong....!!!"
        });

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

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
          console.log('new user info',data.data.user);


          var role=data.data.user.ROLE_FK_ID;
          var username=data.data.user.ROLE_FK_ID.FIRST_NAME;
          var FKID=data.data.user.MEMBER_FK_ID
          userinfoService.setRoleInfo(role);
          userinfoService.setUsername(username);
          userinfoService.setUserFKID(FKID);
          console.log('user info',data.data.message);

          var message=data.data.message;
            if(role==5){
              $state.go('app.channel_partner');
            } else if(role==4){
              $state.go('app.retailer_home');
            } else if(role==3){
              $state.go('app.distributor_home')
          } else if(role==2){
             //alert('No state craeted for L1')
              $state.go('app.slm1_home');
            }
            else if(role==6){
              //alert('No state craeted L2')
              $state.go('app.slm2_home');
            }else if(role==7){
              //alert('No state craeted L3')
              $state.go('app.slm3_home');
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

      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

    }


  })
  /*.controller('otpforloginCtrl`', function ($scope,$http,$state,userinfoService,API_ENDPOINT) {

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
        /!*  if("OTP Expired"==data.otpStatus.status){
         alert(data.otpStatus.status);
         }
         alert('failed');
         *!/

      }).catch(function (error) {

      })

    }

  })*/.controller('chooseChampionCtrl', function ($scope, $http,API_ENDPOINT,$ionicLoading,$ionicPopup) {

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading please wait...</p><ion-spinner class="spinner-energized"></ion-spinner>'
      }); };

    $scope.hide = function(){   $ionicLoading.hide(); };
    $scope.show($ionicLoading);

    $scope.showrecommendation=false;
    $http.get(API_ENDPOINT.url+'/services.php/recommendation').then(function(results){


    $scope.bikeBrands=results.data.recommedList;
    console.log('BRANDS', $scope.bikeBrands);
  }).catch(function (error) {
      var alertPopup = $ionicPopup.alert({   title: "Error on request" });
  }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

    $scope.selectBikeBrand= function (brandname) {
      $scope.show($ionicLoading);
      $http.get(API_ENDPOINT.url+'/services.php/recommendations/'+brandname).then(function(results){
        $scope.showrecommendation=false;


        $scope.models=results.data.models;
        console.log('models',$scope.models);
      }).catch(function (error) {
        var alertPopup = $ionicPopup.alert({   title: "Error on request" });
      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

    }

    $scope.selectBikeModel= function (mds) {
      console.log('<<<<<<',mds)
      $scope.show($ionicLoading);
      $http.get(API_ENDPOINT.url+'/services.php/recommendationbikesrecom/'+mds).then(function(results){
        $scope.showrecommendation=true;


        $scope.recmds=results.data.recomded;
        console.log('recmds',$scope.recmds);
        console.log('recmds',$scope.recmds[0].REC_RECOMMENDATION);
      }).catch(function (error) {
        var alertPopup = $ionicPopup.alert({   title: "Error on request" });
      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
      });

    }
    //$scope.choosebike= function () {}
/*    $scope.choosebike= function (bike) {
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
    }*/
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

    $scope.doRefresh= function () {
      $http.get(API_ENDPOINT.url+'/services.php/productknowledge/0/0').then(function (result) {

        $scope.productKnowledges=result.data.productknowledge;
        console.log( $scope.productKnowledges);
      }).catch(function (error) {

        var alertPopup = $ionicPopup.alert({   title: "Error on Product Knowledge request" });
      }).finally(function($ionicLoading) {
        // On both cases hide the loading
        $scope.hide($ionicLoading);
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  })

  .controller('LogoutCtrl', function ($state,$ionicHistory,userinfoService) {

    $ionicHistory.clearHistory();
    console.log('logout removing data');
    userinfoService.removeUserInfo();
    userinfoService.insertdumy();
    $state.go('main.home');



  })
  .controller('MainCtrl', function ($scope) {

  })
  .controller('notelistCtrl', function ($scope) {

  })

;
