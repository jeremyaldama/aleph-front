# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerLoginEmail**](#authcontrollerloginemail) | **POST** /auth/login-email | Login with email/password|
|[**authControllerLoginGoogle**](#authcontrollerlogingoogle) | **POST** /auth/login-google | Login with Google ID token|
|[**authControllerMe**](#authcontrollerme) | **GET** /auth/me | Get current authenticated user profile|
|[**authControllerSignupEmail**](#authcontrollersignupemail) | **POST** /auth/signup-email | Create retailer or supplier account with email/password and create Fuji wallet|
|[**authControllerSignupGoogle**](#authcontrollersignupgoogle) | **POST** /auth/signup-google | Create retailer or supplier account with Google login and create Fuji wallet|

# **authControllerLoginEmail**
> AuthResponseDto authControllerLoginEmail(loginEmailDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginEmailDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginEmailDto: LoginEmailDto; //

const { status, data } = await apiInstance.authControllerLoginEmail(
    loginEmailDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginEmailDto** | **LoginEmailDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerLoginGoogle**
> AuthResponseDto authControllerLoginGoogle(loginGoogleDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginGoogleDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginGoogleDto: LoginGoogleDto; //

const { status, data } = await apiInstance.authControllerLoginGoogle(
    loginGoogleDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginGoogleDto** | **LoginGoogleDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerMe**
> UserResponseDto authControllerMe()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerMe();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignupEmail**
> AuthResponseDto authControllerSignupEmail(signupEmailDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignupEmailDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signupEmailDto: SignupEmailDto; //

const { status, data } = await apiInstance.authControllerSignupEmail(
    signupEmailDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signupEmailDto** | **SignupEmailDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignupGoogle**
> AuthResponseDto authControllerSignupGoogle(signupGoogleDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    SignupGoogleDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let signupGoogleDto: SignupGoogleDto; //

const { status, data } = await apiInstance.authControllerSignupGoogle(
    signupGoogleDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signupGoogleDto** | **SignupGoogleDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

