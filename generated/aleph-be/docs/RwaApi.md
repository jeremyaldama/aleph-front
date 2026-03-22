# RwaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**rwaControllerAggregate**](#rwacontrolleraggregate) | **POST** /rwa/orders/aggregate | Aggregate pool commitments into one structured order|
|[**rwaControllerCommitOrder**](#rwacontrollercommitorder) | **POST** /rwa/commitments | Commit encrypted merchant order details into a pool|
|[**rwaControllerCreatePool**](#rwacontrollercreatepool) | **POST** /rwa/pools | Create a permissioned purchase pool on private L1|
|[**rwaControllerFinance**](#rwacontrollerfinance) | **POST** /rwa/orders/finance | Register financing terms for an aggregated order|
|[**rwaControllerGetOrder**](#rwacontrollergetorder) | **GET** /rwa/orders/{orderId} | Get one aggregated order by id|
|[**rwaControllerGetPool**](#rwacontrollergetpool) | **GET** /rwa/pools/{poolId} | Get one purchase pool by id|
|[**rwaControllerGetRetailerDashboardProducts**](#rwacontrollergetretailerdashboardproducts) | **GET** /rwa/retailer/products | Retailer dashboard first page: list products (mocked)|
|[**rwaControllerListOrders**](#rwacontrollerlistorders) | **GET** /rwa/orders | List all aggregated orders|
|[**rwaControllerLogs**](#rwacontrollerlogs) | **GET** /rwa/logs | Get recent RWA lifecycle logs|
|[**rwaControllerPrepareBridge**](#rwacontrollerpreparebridge) | **POST** /rwa/orders/bridge | Prepare order asset for bridge interoperability to public Avalanche|
|[**rwaControllerRecordRepayment**](#rwacontrollerrecordrepayment) | **POST** /rwa/orders/repayment | Record one repayment event for an order|
|[**rwaControllerSettle**](#rwacontrollersettle) | **POST** /rwa/orders/settle | Trigger settlement when contract conditions are met|
|[**rwaControllerStatus**](#rwacontrollerstatus) | **GET** /rwa/status | Get global lifecycle metrics|
|[**rwaControllerStreamLogs**](#rwacontrollerstreamlogs) | **GET** /rwa/logs/stream | Stream RWA logs with Server-Sent Events|
|[**rwaControllerTokenize**](#rwacontrollertokenize) | **POST** /rwa/orders/tokenize | Tokenize aggregated order into entitlement and repayment tokens|
|[**rwaControllerVerifyMerchant**](#rwacontrollerverifymerchant) | **POST** /rwa/merchants/verify | Verify merchant eligibility for permissioned pools|

# **rwaControllerAggregate**
> AggregatedOrderResponseDto rwaControllerAggregate(aggregateOrderDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    AggregateOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let aggregateOrderDto: AggregateOrderDto; //

const { status, data } = await apiInstance.rwaControllerAggregate(
    aggregateOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **aggregateOrderDto** | **AggregateOrderDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerCommitOrder**
> MerchantOrderCommitmentResponseDto rwaControllerCommitOrder(commitOrderDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    CommitOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let commitOrderDto: CommitOrderDto; //

const { status, data } = await apiInstance.rwaControllerCommitOrder(
    commitOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commitOrderDto** | **CommitOrderDto**|  | |


### Return type

**MerchantOrderCommitmentResponseDto**

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

# **rwaControllerCreatePool**
> PurchasePoolResponseDto rwaControllerCreatePool(createPoolDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    CreatePoolDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let createPoolDto: CreatePoolDto; //

const { status, data } = await apiInstance.rwaControllerCreatePool(
    createPoolDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPoolDto** | **CreatePoolDto**|  | |


### Return type

**PurchasePoolResponseDto**

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

# **rwaControllerFinance**
> AggregatedOrderResponseDto rwaControllerFinance(financeOrderDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    FinanceOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let financeOrderDto: FinanceOrderDto; //

const { status, data } = await apiInstance.rwaControllerFinance(
    financeOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **financeOrderDto** | **FinanceOrderDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerGetOrder**
> AggregatedOrderResponseDto rwaControllerGetOrder()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let orderId: string; // (default to undefined)

const { status, data } = await apiInstance.rwaControllerGetOrder(
    orderId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **orderId** | [**string**] |  | defaults to undefined|


### Return type

**AggregatedOrderResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerGetPool**
> PurchasePoolResponseDto rwaControllerGetPool()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let poolId: string; // (default to undefined)

const { status, data } = await apiInstance.rwaControllerGetPool(
    poolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **poolId** | [**string**] |  | defaults to undefined|


### Return type

**PurchasePoolResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerGetRetailerDashboardProducts**
> RetailerDashboardProductsResponseDto rwaControllerGetRetailerDashboardProducts()

Core userflow: after retailer login/signup, call this endpoint to render the first dashboard page with products available to the retailer. Data is mocked for now.

### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

const { status, data } = await apiInstance.rwaControllerGetRetailerDashboardProducts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**RetailerDashboardProductsResponseDto**

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

# **rwaControllerListOrders**
> Array<AggregatedOrderResponseDto> rwaControllerListOrders()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

const { status, data } = await apiInstance.rwaControllerListOrders();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AggregatedOrderResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerLogs**
> Array<RwaLogEntryResponseDto> rwaControllerLogs()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let limit: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.rwaControllerLogs(
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<RwaLogEntryResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerPrepareBridge**
> AggregatedOrderResponseDto rwaControllerPrepareBridge(prepareBridgeDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    PrepareBridgeDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let prepareBridgeDto: PrepareBridgeDto; //

const { status, data } = await apiInstance.rwaControllerPrepareBridge(
    prepareBridgeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **prepareBridgeDto** | **PrepareBridgeDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerRecordRepayment**
> AggregatedOrderResponseDto rwaControllerRecordRepayment(recordRepaymentDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    RecordRepaymentDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let recordRepaymentDto: RecordRepaymentDto; //

const { status, data } = await apiInstance.rwaControllerRecordRepayment(
    recordRepaymentDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recordRepaymentDto** | **RecordRepaymentDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerSettle**
> AggregatedOrderResponseDto rwaControllerSettle(triggerSettlementDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    TriggerSettlementDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let triggerSettlementDto: TriggerSettlementDto; //

const { status, data } = await apiInstance.rwaControllerSettle(
    triggerSettlementDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **triggerSettlementDto** | **TriggerSettlementDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerStatus**
> RwaLifecycleStatusResponseDto rwaControllerStatus()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

const { status, data } = await apiInstance.rwaControllerStatus();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**RwaLifecycleStatusResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerStreamLogs**
> rwaControllerStreamLogs()


### Example

```typescript
import {
    RwaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

const { status, data } = await apiInstance.rwaControllerStreamLogs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | SSE stream of RWA log entries |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rwaControllerTokenize**
> AggregatedOrderResponseDto rwaControllerTokenize(tokenizeOrderDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    TokenizeOrderDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let tokenizeOrderDto: TokenizeOrderDto; //

const { status, data } = await apiInstance.rwaControllerTokenize(
    tokenizeOrderDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tokenizeOrderDto** | **TokenizeOrderDto**|  | |


### Return type

**AggregatedOrderResponseDto**

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

# **rwaControllerVerifyMerchant**
> MerchantProfileResponseDto rwaControllerVerifyMerchant(verifyMerchantDto)


### Example

```typescript
import {
    RwaApi,
    Configuration,
    VerifyMerchantDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RwaApi(configuration);

let verifyMerchantDto: VerifyMerchantDto; //

const { status, data } = await apiInstance.rwaControllerVerifyMerchant(
    verifyMerchantDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyMerchantDto** | **VerifyMerchantDto**|  | |


### Return type

**MerchantProfileResponseDto**

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

