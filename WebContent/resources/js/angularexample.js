/**
 * 
 */

// / *** MODULES *** / //

var angularExampleModule = angular.module('angularExampleModule', [ 'ngRoute' ]);

/// *** DATA *** / //

var id = 1;
var names = ['LG G3', 'Sony Xperia Z3 Compact', 'LG G2', 'HTC One (M8)'];
var memoryRAMs = ['2GB RAM', '1GB RAM', '1.5GB RAM', '1.8GB RAM'];
var processors = ['Samsung Exynos 5 Octa', 'Qualcomm Snapdragon 800',
                 'Qualcomm Snapdragon 600' , 'NVidia Tegra 4' , 
                 'NVidia Tegra 4i', 'Intel Atom Z2580 Clover Trail', 
                 'Intel Atom Z2460']
var internMemories = ['16GB RAM', '32GB RAM', '4GB RAM', '2GB RAM']
var years = [2011, 2010, 2014, 2013]
var prices = [1578793.04, 1150310.59, 1812810.38, 1697449.72, 754788.32]

/// *** CONFIGURATIONS *** / //

angularExampleModule.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : './pages/devicelist.html',
        controller : 'deviceListController'
    });
} ]); 

/// *** RUNNERS *** / //
angularExampleModule.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function() {
            $location.url('/');
    });
});



/// *** CONTROLLERS *** / //

angularExampleModule.controller('deviceListController',
                                                         function($scope) {
     /* storesWebService.findAllStores().success( 
                 function(data) {
                        $scope.rowCollection = data.store;
                 });*/
        
    // / ** CREATE RANDOM DEVICE FUNCTION**/ //
    
      function generateRandomDevice(id) {
            var name = names[Math.floor(Math.random() * 3)];
            var memoryRAM = memoryRAMs[Math.floor(Math.random() * 3)];
            var processor = processors[Math.floor(Math.random() * 6)];
            var internMemory = internMemories[Math.floor(Math.random() * 3)];
            var year = years[Math.floor(Math.random() * 3)];
            var price = prices[Math.floor(Math.random() * 4)];
            return {
                id: id,
                name: name,
                memoryRAM: memoryRAM,
                processor: processor,
                internMemory: internMemory,
                year: year,
                price: price
            }
        }
      
    // / ** CREATE NEW DEVICE FUNCTION **/ //
      
      function generateNewDevice(id, name, memoryRAM, processor, 
              internMemory, year, price) {
          if((name==null || name=='')
                  ||(memoryRAM==null || memoryRAM=='')
                  ||(processor==null || processor=='')
                  ||(internMemory==null || internMemory=='')
                  ||(year==0)||(price==0)){
              return null
          }else{
            return {
                id: id,
                name: name,
                memoryRAM: memoryRAM,
                processor: processor,
                internMemory: internMemory,
                year: year,
                price: price
            }
          }
        }
      
     // / ** CLEAR DATA FUNCTION**/ //
      
      function clearData(){
          $scope.name='';
          $scope.memoryRAM=''; 
          $scope.processor=''; 
          $scope.internMemory=''; 
          $scope.year=0; 
          $scope.price=0;
      }
      
     // / ** ADD NEW DEVICE FUNCTION **/ //
      
      $scope.addNewDevice = function addNewDevice() {
            var newDevice = generateNewDevice(id, $scope.name, 
                    $scope.memoryRAM, $scope.processor, $scope.internMemory, 
                    $scope.year, $scope.price);
            if(newDevice!=null){
                $scope.rowCollection.push(newDevice);
                id++;
                clearData()
            }
        };

      // / ** REMOVE DEVICE FUNCTION **/ //
        
        $scope.removeDevice = function removeDevice(device) {
            var index = $scope.rowCollection.indexOf(device);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        }
        
      // / ** LOAD DATA FUNCTION **/ //
        
        $scope.rowCollection = [];
         for (id; id < 5; id++) {
            $scope.rowCollection.push(generateRandomDevice(id));
         }
        
});

/// *** WEB SERVICES *** ///

angularExampleModule.service('storesWebService', function($http) {

    this.findAllStores = function() {

            return ($http({
                    method : 'GET',
                    url : STORES_WEB_SERVICE
            }));
    };
});