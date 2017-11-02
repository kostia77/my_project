const app = angular.module('app', ['ngRoute', 'ngDialog']);

//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

});

//Контроллер
app.controller("MyCtrl", function ($scope, $http, ngDialog) {



    //    $scope.check = function () {
    //        $scope.user ="";
    //        let loginObj = {
    //            login: $scope.login,
    //            pass: $scope.password
    //        };
    //        $http.post('http://localhost:8000/login', loginObj)
    //            .then(function successCallback(response) {
    //                if (response.data == "welcome") {
    //                    $scope.user = "Wellcome " + $scope.login + "!!!";
    //                } else {
    //                    $scope.user = response.data;
    //                };
    //            }, function errorCallback(response) {
    //                console.log("Error!!!" + response.err);
    //            });
    //
    //    };
    //    $scope.reg = function () {
    //        $scope.registration ="";
    //        let loginObj = {
    //            login: $scope.login2,
    //            pass: $scope.password2,
    //            mail: $scope.mail
    //        };
    //        $http.post('http://localhost:8000/users', loginObj)
    //            .then(function successCallback(response) {
    //                $scope.registration = "Registered!!!"
    //            }, function errorCallback(response) {
    //                console.log("Error!!!" + response.err);
    //            });
    //
    //    };
    //    $scope.logout = function () {
    //        $scope.loginOut ="";
    //        let loginObj = {
    //            login: $scope.login3
    //        };
    //        $http.post('http://localhost:8000/logout', loginObj)
    //            .then(function successCallback(response) {
    //                $scope.loginOut = "Loged out!!!"
    //            }, function errorCallback(response) {
    //                console.log("Error!!!" + response.err);
    //            });
    //    };
    //    $scope.removeUser = function () {
    //        $scope.removed ="";
    //        let loginObj = {
    //            login: $scope.login4
    //        };
    //        $http.post('http://localhost:8000/user-remove', loginObj)
    //            .then(function successCallback(response) {
    //                $scope.removed = "Removed!!!"
    //            }, function errorCallback(response) {
    //                console.log("Error!!!" + response.err);
    //            });
    //    };





});
////Директива Класи
//app.directive('classesBlock', function () {
//    return {
//        replace: true,
//        templateUrl: 'template/classes-dir.html',
//        controller: function ($scope, $http, ngDialog) {
//
//            $http.get('http://localhost:8000/classes')
//                .then(function successCallback(response) {
//                    $scope.classes = response.data;
//                }, function errorCallback(response) {
//                    console.log("Error!!!" + response.err);
//                });
//            }
//            
//        }
//    });
//Директива Учні
app.directive('pupilsBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pupils-dir.html',
        controller: function ($scope, $http, ngDialog) {
            $scope.pupilsStatus = false;
            $scope.pupilsStart=function(){
                $scope.pupilsStatus = true;
                $scope.classesStatus = false;
            }

            $http.get('http://localhost:8000/pupils')
                .then(function successCallback(response) {
                    $scope.pupils = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            }
            
        }
    });
//
//


//Директива Меню
app.directive('naviBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/navi-menu.html',
        controller: function ($scope, $http, ngDialog) {
        
            //Сторінки
            $scope.teachersStatus = false;
            $scope.classesStatus = false;
            $scope.pupilsStatus = false;
            //Показати вчителів
            $scope.teachersStart = function () {
                $scope.teachersStatus = true;
                $scope.classesStatus = false;
                $scope.pupilsStatus = false;
            }
            //Приховати вчителів
            $scope.closeTeachers = function () {
                $scope.teachersStatus = false;
            }
            //Показати класи
            $scope.classesStart = function () {
                $scope.classesStatus = true;
                $scope.teachersStatus = false;
                $scope.pupilsStatus = false;
            }
            //Приховати класи
            $scope.closeClasses = function () {
                $scope.classesStatus = false;
            }
        }
    }
});


//Директива Вчителі
app.directive('teachersBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/teachers-dir.html',
        controller: function ($scope, $http, ngDialog) {
            //Отримати список вчителів
            $http.get('http://localhost:8000/teachers')
                .then(function successCallback(response) {
                    $scope.teachers = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            //Додати вчителя
            $scope.addTeachers = function () {
                //Відкриваєм модальне вікно з формою для додавання вчителя
                ngDialog.open({
                        template: '/template/addTeachers.html',
                        scope: $scope,
                        controller: function ($scope) {
                            $scope.addTeachersStatus = true;
                            $scope.nameTeacher = "";
                            $scope.snameTeacher = "";
                            //Відправляєм дані нового вчителя на сервер
                            $scope.addteach = function () {
                                let teacherObj = {
                                    name: $scope.nameTeacher,
                                    sname: $scope.snameTeacher
                                };
                                $http.post('http://localhost:8000/add-teach', teacherObj)
                                    .then(function successCallback(response) {
                                        $scope.addTeachersStatus = false;
                                        ngDialog.closeAll();
                                        $scope.nameTeacher = "";
                                        $scope.snameTeacher = "";
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });
                            };
                        },
                        className: 'ngdialog-theme-default'
                    })
                    //Оновлюєм список вчителів після закриття модального вікна
                    .closePromise.then(function (res) {
                        $http.get('http://localhost:8000/teachers')
                            .then(function successCallback(response) {
                                $scope.teachers = response.data;
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });
                    });
            };
            //Редагуємо дані вчителя
            //Вікриваєм модальне вікно для редагування
            $scope.editTeacher = function (index, name, sname) {
                ngDialog.open({
                        template: '/template/editTeachers.html',
                        scope: $scope,
                        controller: function ($scope) {
                            $scope.editTeachStatus = true;
                            $scope.editNameTeacher = name;
                            $scope.editSnameTeacher = sname;
                            $scope.indexOfTeacher = index;
                            //Надсилаєм відредаговані дані вчителя на сервер
                            $scope.editTeach = function () {
                                let teacherObj = {
                                    id: $scope.indexOfTeacher,
                                    name: $scope.editNameTeacher,
                                    sname: $scope.editSnameTeacher
                                };
                                $http.post('http://localhost:8000/edit-teach', teacherObj)
                                    .then(function successCallback(response) {
                                        ngDialog.closeAll();
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });


                            }
                        }
                    })
                    .closePromise.then(function (res) {
                        //Оновлюєм список вчителів після закриття модального вікна
                        $http.get('http://localhost:8000/teachers')
                            .then(function successCallback(response) {
                                $scope.teachers = response.data;
                                //Оновлюємо класи після закриття модального вікна
                                $http.get('http://localhost:8000/classroom')
                                    .then(function successCallback(response) {
                                        $scope.classroom = response.data;
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });

                    });
            };
             //Видалити вчителя
            $scope.deleteTeacher = function (index) {
                //Підтвердження видалення
                var r = confirm("Ви впевнені, що бажаєте видалити вчителя?");
                if (r == true) {
                    let teacherObj = {
                        id: index
                    };
                    //Надсилаєм дані на видалення вчителя
                    $http.post('http://localhost:8000/del-teach', teacherObj)
                        .then(function successCallback(response) {
                            //Повторно генеруєм список вчителів
                            $http.get('http://localhost:8000/teachers')
                                .then(function successCallback(response) {
                                    $scope.teachers = response.data;
                                    //Повторно генеруєм список класів
                                    $http.get('http://localhost:8000/classroom')
                                        .then(function successCallback(response) {
                                            $scope.classroom = response.data;
                                        }, function errorCallback(response) {
                                            console.log("Error!!!" + response.err);
                                        });
                                }, function errorCallback(response) {
                                    console.log("Error!!!" + response.err);
                                });

                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                }
            }
        }
    }
});


//Директива Класи
app.directive('classesBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/classes-dir.html',
        controller: function ($scope, $http, ngDialog) {
            //Загрузити класи
            $http.get('http://localhost:8000/classes')
                .then(function successCallback(response) {
                    $scope.classes = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            //Редагувати клас
            $scope.editClasses = function (index, className, name, sname, t_index) {
                $scope.editedClassIndex = index;
                $scope.editNameClass = className;
                $scope.editedClassTeacherName = name;
                $scope.editedClassTeacherSname = sname;
                $scope.editedClassTeacherIndex = t_index;
                //Відкриваєм модальне вікно
                ngDialog.open({
                        template: '/template/editclass.html',
                        scope: $scope,
                        controller: function ($scope) {
                            //Отримуєм список класів
                            $http.get('http://localhost:8000/classes')
                                .then(function successCallback(response) {
                                    //Виставляєм в селекті вчителя даного класу
                                    var sel = document.getElementById("teachersSelect");
                                    var testur = "" + $scope.editedClassTeacherName + " " + $scope.editedClassTeacherSname;
                                    for (i = 0; i < sel.options.length; i++) {
                                        if (sel.options[i].text == testur) {
                                            sel.selectedIndex = i;
                                        }
                                    }
                                }, function errorCallback(response) {
                                    console.log("Error!!!" + response.err);
                                });
                            //Надсилаєм дані зміненого класу
                            $scope.editClasses = function () {
                                var sel2 = document.getElementById("teachersSelect");
                                var val = sel2.options[sel2.selectedIndex].value;

                                let classObj = {
                                    id: $scope.editedClassIndex,
                                    class: $scope.editNameClass,
                                    ct_index: val
                                };
                                //Редагуємо клас
                                $http.post('http://localhost:8000/edit-class', classObj)
                                    .then(function successCallback(response) {
                                        ngDialog.closeAll();
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });

                            }
                        }
                    })
                    .closePromise.then(function (res) {
                        //Повторно отримуєм класи
                        $http.get('http://localhost:8000/classes')
                            .then(function successCallback(response) {
                                $scope.classes = response.data;
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });
                    });
            };
            //Перехід від списку класів до вибраного класу
            $scope.gotoClasses = function (index, name) {
                $scope.classPupilsName = name;
                $scope.classesStatus = false;
                $scope.pupilsStatus = true;
                let pupilsObj = {
                    id: index
                };
                //Загружаємо учнів
                $http.post('http://localhost:8000/pupils', pupilsObj)
                    .then(function successCallback(response) {
                        $scope.pupils = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });

            }
            //Видаляємо клас
            $scope.deleteClasses = function (index) {
                //Підтвердження видалення
                var r = confirm("Ви впевнені, що бажаєте видалити клас?");
                if (r == true) {
                    let classObj = {
                        id: index
                    };
                    //Надсилаєм дані на видалення вчителя
                    $http.post('http://localhost:8000/del-class', classObj)
                        .then(function successCallback(response) {
                            //Повторно генеруєм список класів
                            $http.get('http://localhost:8000/classes')
                                .then(function successCallback(response) {
                                    $scope.classes = response.data;
                                }, function errorCallback(response) {
                                    console.log("Error!!!" + response.err);
                                });
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                }
            }
        }

    }
});

//Директива Учнів
app.directive('pupilBlock', function () {
    return {
        replace: true,
        templateUrl: 'template/pupils-dir.html',
        controller: function ($scope, $http, ngDialog) {
            //Повернутись до списку класів
            $scope.gotoClassesBack = function () {
                $scope.classesStatus = true;
                $scope.pupilsStatus = false;
            }
            $scope.deletePupils = function (index) {
                let pupilsObj = {
                    id: index
                };
                            $http.post('http://localhost:8000/del-pup')
                            .then(function successCallback(response) {
                            $http.get('http://localhost:8000/pupils')
                                .then(function successCallback(response) {
                                    $scope.pupils = response.data;
                                }, function errorCallback(response) {
                                    console.log("Error!!!" + response.err);
                                });                       
                }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });   
        }
            //Редагуємо дані учнів
            //Вікриваєм модальне вікно для редагування
            $scope.editPupils = function (index, name, sname) {
                ngDialog.open({
                        template: '/template/editPupils.html',
                        scope: $scope,
                        controller: function ($scope) {
                            $scope.editPupilsStatus = true;
                            $scope.editNamePupils = name;
                            $scope.editSnamePupils = sname;
                            $scope.indexOfPupils = index;
                            //Надсилаєм відредаговані дані вчителя на сервер
                            $scope.editPupils = function () {
                                let pupiObj = {
                                    id: $scope.indexOfPupils,
                                    name: $scope.editNamePupils,
                                    sname: $scope.editSnamePupils
                                };
                                $http.post('http://localhost:8000/edit-pupi', pupiObj)
                                    .then(function successCallback(response) {
                                        ngDialog.closeAll();
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });


                            }
                        }
                    })
                    .closePromise.then(function (res) {
                        //Оновлюєм список вчителів після закриття модального вікна
                        $http.get('http://localhost:8000/pupils')
                            .then(function successCallback(response) {
                                $scope.pupils = response.data;
                                //Оновлюємо класи після закриття модального вікна
                                $http.get('http://localhost:8000/classroom')
                                    .then(function successCallback(response) {
                                        $scope.classroom = response.data;
                                    }, function errorCallback(response) {
                                        console.log("Error!!!" + response.err);
                                    });
                            }, function errorCallback(response) {
                                console.log("Error!!!" + response.err);
                            });

                    });
            };
        
        
        
        }
}
    });
        


