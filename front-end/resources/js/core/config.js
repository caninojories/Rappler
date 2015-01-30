(function() {
    'use strict';

    var config = {
      appErrorPrefix: '[Rappler Error] ', //Configure the exceptionHandler decorator
      appTitle: 'RAPPLER: @by Jo-RIES P. CANINO',
      localLogin: 'http://localhost:3000/userApi/userLogIn',
      localSignup: 'http://localhost:3000/userApi/userRegister',
      localFacebookUrl: 'http://localhost:3000/userApi/logInUserFacebook',
      localGoogleUrl: 'http://localhost:3000/userApi/logInUserGoogle',
      remoteLogin: 'http://hau-rappler.herokuapp.com/userApi/userLogIn',
      remoteSignup: 'http://hau-rappler.herokuapp.com/userApi/userRegister',
      remoteFacebookUrl: 'http://hau-rappler.herokuapp.com/userApi/logInUserFacebook',
      remoteGoogleUrl: 'http://hau-rappler.herokuapp.com/userApi/logInUserGoogle',
      localFacebookID: '789445017793242',
      remoteFacebookID: '647781775334077',
      version: '0.0.1'
    };

    angular
      .module( 'app.core' )
      .value( 'config', config )
      .config( configure )
      .config( toastrConfig )
      .config( registerNsignInConfig );


    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    function registerNsignInConfig( $authProvider, cfpLoadingBarProvider ) {
      cfpLoadingBarProvider.latencyThreshold = 300;
      $authProvider.loginUrl    = config.remoteLogin;
      $authProvider.signupUrl   = config.remoteSignup;
      $authProvider.tokenPrefix = 'rappler';

      $authProvider.facebook({
        clientId: config.remoteFacebookID,
        url: config.remoteFacebookUrl
      });

      $authProvider.google({
        clientId: '514855305579-vmrkir3l76c0v2t6b5mtnphh38uf9irp.apps.googleusercontent.com',
        url: config.remoteGoogleUrl
      });
    }

    /* @ngInject */
    function configure ( $httpProvider, $locationProvider, $logProvider, $urlRouterProvider, $stateProvider,
      exceptionHandlerProvider, routehelperConfigProvider ) {

        $locationProvider.html5Mode(true);
        if ($logProvider.debugEnabled)  $logProvider.debugEnabled(true);

        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = 'Module: ';

        $httpProvider.interceptors.push('authInterceptor');
        /*Configure the common exception handler*/
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
