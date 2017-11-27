var miModulo = angular.module("angular1", []);
miModulo.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);
miModulo.controller('MiControlador', ['$scope', '$http',
    function ($scope, $http) {
        $scope.mostrarUsuario = false;
        $scope.mostrarTabla = false;
        $scope.idusuario;
        $scope.pagina = 1;
        $scope.vacio = false;
        $scope.vacio2 = false;
        $scope.valueNumber;
        $scope.disabled = true;
        $scope.required = true;

        $scope.rellenarBD = function () {
            if ($scope.valueNumber > 0) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/carrito-server/json?ob=paciente&op=rellena&num=' + $scope.valueNumber
                }).then(function successCallback(response) {
                    if (response.data.status == 200) {
                        if (response.data.json == null) {
                            $scope.vacio = true;
                            $scope.mostrarUsuario = false;
                        } else {
                            $scope.vacio = false;
                            $scope.oPaciente = response.data.json;
                            $scope.boton1 = {
                                "visibility": "visible",
                                "display": "inline"
                            }
                        }
                    } else {
                        $scope.error_angular = "Error en la recepción de datos";
                    }
                }, function errorCallback(response) {
                    $scope.error_angular = "Error en la recepción de datos";
                });
            }
        }
        $scope.contar = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/carrito-server/json?ob=paciente&op=cuenta'
            }).then(function successCallback(response) {
                if (response.data.status == 200) {
                    if (response.data.json == null) {
                        $scope.vacio = true;
                        $scope.mostrarUsuario = false;
                    } else {
                        $scope.vacio = false;
                        $scope.oPaciente = response.data.json;
                        $scope.rpp = response.data.json;
                        $scope.boton1 = {
                            "visibility": "visible",
                            "display": "inline"
                        }
                    }
                } else {
                    $scope.error_angular = "Error en la recepción de datos";
                }
            }, function errorCallback(response) {
                $scope.error_angular = "Error en la recepción de datos";
            });

        }
        $scope.vaciar = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/carrito-server/json?ob=paciente&op=vacia'
            }).then(function successCallback(response) {
                if (response.data.status == 200) {
                    if (response.data.json == null) {
                        $scope.vacio = true;
                        $scope.mostrarUsuario = false;
                    } else {
                        $scope.vacio = false;
                        $scope.oPaciente = response.data.json;
                        $scope.boton1 = {
                            "visibility": "visible",
                            "display": "inline"
                        }
                    }
                } else {
                    $scope.error_angular = "Error en la recepción de datos";
                }
            }, function errorCallback(response) {
                $scope.error_angular = "Error en la recepción de datos";
            });

        }
        $scope.mostrar = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/carrito-server/json?ob=paciente&op=dump&np=1&rpp=5000'
            }).then(function successCallback(response) {
                if (response.data.status == 200) {
                    if (response.data.json.length == 0) {
                        $scope.vacio2 = true;
                        $scope.mostrarTabla = false;
                    } else {
                        $scope.vacio2 = false;
                        $scope.arrPacientes = response.data.json;
                        $scope.ordename = function (x) {
                            $scope.ordenameje = x;
                        }
                    }
                } else {
                    $scope.error_angular = "Error en la recepción de datos";
                }
            }, function errorCallback(response) {
                $scope.error_angular = "Error en la recepción de datos";
            });

        }
        $scope.comprobarNum = function () {
            if ($scope.valueNumber <= 5000 && $scope.valueNumber >= 1) {
                $scope.disabled = false;
            } else {
                $scope.disabled = true;
            }
            function errorCallback(response) {
                $scope.error_angular = "Error en la recepción de datos";
            }


        }
    }])