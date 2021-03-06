// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','starter.services','youtube-embed','ngCordova'])
/*angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])*/
.run(function($ionicPlatform,$cordovaNetwork, $rootScope,$ionicPopup,userinfoService,$state) {
    $ionicPlatform.ready(function() {

      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: 'No Internet Connection',
            content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
          })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
        }
      }



      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    /*  if(userinfoService.getUserInfo().FKID==undefined || userinfoService.getUserInfo().FKID==null){
        $state.go('app.distributor_home');
      }*/
    });
})/*.config(['$ionicConfigProvider', function($ionicConfigProvider) {

  }])*/
  .config(function($stateProvider, $urlRouterProvider,$httpProvider) {

    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      })
        .state('main.registration', {
            url: '/registration',
            views: {
                'mainContent': {
                    templateUrl: 'templates/registration.html',
                    controller: 'RegCtrl'
                }
            }
        })
        .state('main.home', {
            url: '/home',
            views: {
                'mainContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })

    .state('main.login', {
        url: '/login',
        views: {
            'mainContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }

        }
    })

        .state('app.distributor_login', {
            url: '/distributor_login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_login.html',
                    controller: 'DistLoginCtrl'
                }
            }
        })

      .state('app.note', {
        url: '/note',
        views: {
          'menuContent': {
            templateUrl: 'templates/note.html',
            controller: 'notelistCtrl'
          }
        }
      })

       /* .state('app.distributor_Reg', {
            url: '/distributor_Reg',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_Reg.html',
                    controller: 'DistRegCtrl'
                }
            }
        })*/

        .state('app.retailer_Reg', {
            url: '/retailer_Reg',
            views: {
                'menuContent': {
                    templateUrl: 'templates/retailer_Reg.html',
                    controller: 'RetailRegCtrl'
                }
            }
        })

        /*.state('app.distributor_reset_pass', {
            url: '/distributor_reset_pass',
            views: {
                'menuContent': {
                    templateUrl: 'templates/reset_pass.html',
                    controller: 'DistResetPassCtrl'
                }
            }
        })*/

        .state('app.distributor_home', {
            url: '/distributor_home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_home.html',
                    controller: 'DistHomeCtrl'
                }
            }
        })
      .state('app.slm1_home', {
        url: '/slm1_home',
        views: {
          'menuContent': {
            templateUrl: 'templates/slm1_home.html',
            controller: 'DistHomeCtrl'
          }
        }
      })
      .state('app.slm2_home', {
        url: '/slm2_home',
        views: {
          'menuContent': {
            templateUrl: 'templates/slm2_home.html',
            controller: 'DistHomeCtrl'
          }
        }
      })
      .state('app.slm3_home', {
        url: '/slm3_home',
        views: {
          'menuContent': {
            templateUrl: 'templates/slm3_home.html',
            controller: 'DistHomeCtrl'
          }
        }
      })


        .state('app.distributor_my_profile', {
            url: '/distributor_my_profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_my_profile.html',
                    controller: 'DistProfileCtrl'
                }
            }
        })

        .state('app.product_detail', {
            url: '/product_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/product_detail.html',
                    controller: 'CreateCtrl'
                }
            }
        })


        .state('app.order', {
            url: '/order',
            views: {
                'menuContent': {
                    templateUrl: 'templates/order.html',
                    controller: 'OrderCtrl'
                }
            }
        })

        /*.state('app.distributor_create_order', {
            url: '/distributor_create_order',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_create_order.html',
                    controller: 'CreateDistOrderCtrl'
                }
            }
        })*/

        .state('app.distributor_order_detail', {
            url: '/distributor_order_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_order_detail.html',
                    controller: 'DistOrderDetailCtrl'
                }
            }
        })

        .state('app.target_os_p', {
            url: '/target_os_p',
            views: {
                'menuContent': {
                    templateUrl: 'templates/target_os_p.html',
                    controller: 'TargetOSCtrl'
                }
            }
        })

        .state('app.channel_partner', {
            url: '/channel_partner',
            views: {
                'menuContent': {
                    templateUrl: 'templates/channel_partner.html',
                    controller: 'DistHomeCtrl'
                }
            }
        })

        .state('app.notification', {
            url: '/notification',
            views: {
                'menuContent': {
                    templateUrl: 'templates/notification.html',
                    controller: 'notificationCtrl'
                }
            }
        })

        /*.state('app.change_password', {
            url: '/change_password',
            views: {
                'menuContent': {
                    templateUrl: 'templates/change_password.html',
                    controller: 'ChangePassCtrl'
                }
            }
        })*/

        .state('app.news', {
            url: '/news',
            views: {
                'menuContent': {
                    templateUrl: 'templates/news.html',
                    controller: 'NewsCtrl'
                }
            }
        })

        .state('app.customer_feedback', {
            url: '/customer_feedback',
            views: {
                'menuContent': {
                    templateUrl: 'templates/customer_feedback.html',
                    controller: 'CustomerFeedbackCtrl'
                }
            }
        })

        .state('app.retailer_home', {
            url: '/retailer_home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/retailer_home.html',
                    controller: 'DistHomeCtrl'
                }
            }
        })

        .state('app.retailer_my_profile', {
            url: '/retailer_my_profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/retailer_my_profile.html',
                    controller: 'RetailerProfileCtrl'
                }
            }
        })

        .state('app.forgot_password', {
            url: '/forgot_password',
            views: {
                'menuContent': {
                    templateUrl: 'templates/forgot_password.html',
                    controller: 'ForgotPasswordCtrl'
                }
            }
        })

        .state('app.brand_stories', {
            url: '/brand_stories',
            views: {
                'menuContent': {
                    templateUrl: 'templates/brand_stories.html',
                    controller: 'brandStoriesCtrl'
                }
            }
        })
      .state('app.brand_video', {
        url: '/brand_video',
        views: {
          'menuContent': {
            templateUrl: 'templates/brand_video.html',
            controller: 'brandvideoCtrl'
          }
        }
      })
      .state('app.brand_audio', {
        url: '/brand_audio',
        views: {
          'menuContent': {
            templateUrl: 'templates/brand_audio.html',
            controller: 'brandaudioCtrl'
          }
        }
      })
      .state('app.brand_image', {
        url: '/brand_image',
        views: {
          'menuContent': {
            templateUrl: 'templates/brand_image.html',
            //controller: 'brandimageCtrl'
          }
        }
      })
      .state('app.brand_pdf', {
        url: '/brand_pdf',
        views: {
          'menuContent': {
            templateUrl: 'templates/brand_pdf.html',
            //controller: 'brandpdfCtrl'
          }
        }
      })
        .state('app.feedback_query', {
            url: '/feedback_query',
            views: {
                'menuContent': {
                    templateUrl: 'templates/feedback_query.html',
                    controller: 'feedbackQueryCtrl'
                }
            }
        })

        /*.state('app.retailer_product_detail', {
            url: '/retailer_product_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/product_detail.html',
                    controller: 'RetailerProductDetailCtrl'
                }
            }
        })*/

        .state('app.create_order', {
            url: '/create_order',
            views: {
                'menuContent': {
                    templateUrl: 'templates/create_order.html',
                    controller: 'CreateCtrl'
                }
            }
        })
      .state('app.my_orders', {
            url: '/my_orders',
            views: {
                'menuContent': {
                    templateUrl: 'templates/my_orders.html',
                    controller: 'MyOrdersCtrl'
                }
            }
        })
      .state('app.myteam_order', {
            url: '/myteam_order/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myteam_order.html',
                    controller: 'MyTeamOrdersCtrl'
                }
            }
        })
      .state('app.retailerDetails', {
        url: '/retailerDetails/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailerDetails.html',
            controller: 'retailerDetailsCtrl'
          }
        }
      })
      .state('app.mydisteam_order', {
        url: '/mydisteam_order/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/mydisteam_order.html',
            controller: 'MyDisTeamOrdersCtrl'
          }
        }
      })
      .state('app.orderMyTeamDetail', {
        url: '/orderMyTeamDetail/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/orderMyTeamDetail.html',
            controller: 'MyTeamsOrderDtlCtrl'
          }
        }
      })
      .state('app.retailerDtls', {
        url: '/retailerDtls/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailerDtls.html',
            controller: 'retailerDetailsCtrl2'
          }
        }
      })

      .state('app.customer_login', {
        url: '/customer_login',
        views: {
          'menuContent': {
            templateUrl: 'templates/customer_login.html',
            controller: 'customerLoginCtrl'
          }
        }
      })
      .state('main.otp', {
        url: '/otp',
        views: {
          'mainContent': {
            templateUrl: 'templates/otp.html',
            controller: 'otpCtrl'
          }
        }
      })
      .state('app.otpforlogin', {
        url: '/otpforlogin',
        views: {
          'menuContent': {
            templateUrl: 'templates/otpforlogin.html',
            controller: 'otpforloginCtrl'
          }
        }
      })
      .state('main.create_password', {
        url: '/create_password',
        views: {
          'mainContent': {
            templateUrl: 'templates/create_password.html',
            controller: 'CreatePasswordCtrl'
          }
        }
      })
      .state('app.retailer_login', {
        url: '/retailer_login',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailer_login.html',
            controller: 'RetailerLoginCtrl'
          }
        }
      })

      .state('app.retailer_order', {
        url: '/retailer_order',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailer_order.html',
            controller: 'RetailerOrderCtrl'
          }
        }
      })

      /*.state('app.retailer_notification', {
        url: '/retailer_notification',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailer_notification.html',
            controller: 'retailerNotificationCtrl'
          }
        }
      })*/

      /*.state('app.brand_stories', {
        url: '/brand_stories',
        views: {
          'menuContent': {
            templateUrl: 'templates/brand_stories.html',
            controller: 'brandStoriesCtrl'
          }
        }
      })*/

      .state('app.retailer_feedback_query', {
        url: '/retailer_feedback_query',
        views: {
          'menuContent': {
            templateUrl: 'templates/retailer_feedback_query.html',
            controller: 'retailerFeedbackQueryCtrl'
          }
        }
      })

      .state('app.change_password', {
        url: '/change_password',
        views: {
          'menuContent': {
            templateUrl: 'templates/change_password.html',
            controller: 'ChangePasswordCtrl'
          }
        }
      })

      .state('app.product_knowledge', {
        url: '/product_knowledge',
        views: {
          'menuContent': {
            templateUrl: 'templates/product_knowledge.html',
            controller: 'productKnowledgeCtrl'
          }
        }
      })

      .state('app.choose_champion', {
        url: '/choose_champion',
        views: {
          'menuContent': {
            templateUrl: 'templates/choose_champion.html',
            controller: 'chooseChampionCtrl'
          }
        }
      })

      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'templates/dashboard.html'
            //controller: 'customerLoginCtrl'
          }
        }
      })

      .state('app.target_details', {
        url: '/target_details',
        views: {
          'menuContent': {
            templateUrl: 'templates/target_details.html'
            //controller: 'targetDetailsCtrl'
          }
        }
      })
      .state('app.logout', {
        url: '/logout',
        views: {
          'menuContent': {
            //templateUrl: 'templates/target_details.html'
            controller: 'LogoutCtrl'
          }
        }
      })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main/home');
});
