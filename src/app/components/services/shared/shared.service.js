"use strict";
var Shared = (function () {
    function Shared() {
    }
    return Shared;
}());
// public static BASE_USER_ENDPOINT = 'http://clipper-api.mavericktechlabs.com.au';
//Base URL
Shared.BASE_URL_ENDPOINT = "http://localhost:60776";
//User Name
Shared.URL_EXTENSION_USERNAME_CHECK = '/api/useraccount/validate-username';
//Employee
Shared.URL_EXTENSION_EMP_POST = '/api/employees/authorize/post';
Shared.URL_EXTENSION_EMP_GET = '/api/employees/authorize/get';
Shared.URL_EXTENSION_EMP_GET_ID = '/api/employees/authorize/get/';
Shared.URL_EXTENSION_EMP_PUT_ID = '/api/employees/authorize/put/';
Shared.URL_EXTENSION_EMP_DELETE_ID = '/api/employees/authorize/delete/';
//Role
Shared.URL_EXTENSION_EMPROLE_GET = '/api/employeerole/authorize/get/';
//Sales
Shared.URL_EXTENSION_SALES_POST = '/api/sales/authorize/postsale';
Shared.URL_EXTENSION_SALES_GET = '/api/sales/authorize/get';
Shared.URL_EXTENSION_SALES_GET_ID = '/api/sales/authorize/get/';
Shared.URL_EXTENSION_SALES_PUT_ID = '/api/sals/authorize/put/';
Shared.URL_EXTENSION_SALES_DELETE_ID = '/api/sales/authorize/delete/';
exports.Shared = Shared;
//# sourceMappingURL=shared.service.js.map