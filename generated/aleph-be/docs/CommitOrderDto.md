# CommitOrderDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**poolId** | **string** |  | [default to undefined]
**merchantId** | **string** | Optional merchant ID override. If omitted, backend uses authenticated user id. | [optional] [default to undefined]
**sku** | **string** |  | [default to undefined]
**quantity** | **number** |  | [default to undefined]
**unitPrice** | **number** |  | [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CommitOrderDto } from './api';

const instance: CommitOrderDto = {
    poolId,
    merchantId,
    sku,
    quantity,
    unitPrice,
    notes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
