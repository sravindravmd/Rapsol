// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','starter.services','youtube-embed'])
/*angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])*/
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

/*.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);*/
    .config(function($stateProvider, $urlRouterProvider) {

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

        .state('app.registration', {
            url: '/registration',
            views: {
                'menuContent': {
                    templateUrl: 'templates/registration.html',
                    controller: 'RegCtrl'
                }
            }
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
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

        .state('app.distributor_my_profile', {
            url: '/distributor_my_profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_my_profile.html',
                    controller: 'DistProfileCtrl'
                }
            }
        })

        .state('app.distributor_product_detail', {
            url: '/distributor_product_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_product_detail.html',
                    controller: 'DistProductDetailCtrl'
                }
            }
        })

        .state('app.distributor_order', {
            url: '/distributor_order',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_order.html',
                    controller: 'DistOrderCtrl'
                }
            }
        })

        .state('app.distributor_create_order', {
            url: '/distributor_create_order',
            views: {
                'menuContent': {
                    templateUrl: 'templates/distributor_create_order.html',
                    controller: 'CreateDistOrderCtrl'
                }
            }
        })

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
                    controller: 'ChannelPartnerCtrl'
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
                    controller: 'RetailerHomeCtrl'
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

        .state('app.retailer_product_detail', {
            url: '/retailer_product_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/retailer_product_detail.html',
                    controller: 'RetailerProductDetailCtrl'
                }
            }
        })

        .state('app.retailer_create_order', {
            url: '/retailer_product_detail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/retailer_create_order.html',
                    controller: 'RetailerCreatteCtrl'
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
      .state('app.otp', {
        url: '/otp',
        views: {
          'menuContent': {
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
      .state('app.create_password', {
        url: '/create_password',
        views: {
          'menuContent': {
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
            //controller: 'productKnowledgeCtrl'
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
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
