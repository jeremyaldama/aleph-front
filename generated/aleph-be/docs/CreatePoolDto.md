# CreatePoolDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**thresholdQuantity** | **number** | Minimum aggregated quantity required before the pool can be aggregated into an order | [optional] [default to undefined]
**allowedMerchants** | **Array&lt;string&gt;** | Permissioned merchant IDs allowed to participate in the pool | [default to undefined]

## Example

```typescript
import { CreatePoolDto } from './api';

const instance: CreatePoolDto = {
    name,
    thresholdQuantity,
    allowedMerchants,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
