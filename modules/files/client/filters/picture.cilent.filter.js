/**
 * Created by jiangyun on 16/9/2.
 */
(function () {
    'use strict';

    angular.module('files')
        .filter('picture', picture);

    /* @ngInject */
    function picture() {
        return function (picture, height, width) {
            if (angular.isString(picture) && picture !== '') {
                if (picture.match('^http://')) {
                    return picture;
                } else if (picture.match('^data:')) {
                    return picture;
                } else {
                    var url = 'api/pic';
                    if (angular.isNumber(height) && angular.isUndefined(width)) {
                        url += '/zoomByHeight/' + height + '/' + picture;
                    } else if (angular.isNumber(width) && angular.isUndefined(height)) {
                        url += '/zoomByWidth/' + width + '/' + picture;
                    } else if (angular.isNumber(height) && angular.isNumber(width)) {
                        url += '/' + width + '/' + height + '/' + picture;
                    } else {
                        url += '/' + picture;
                    }
                    return url;
                }
            } else {
                return 'modules/users/client/img/profile/default.png';
            }
        };
    }
}());
