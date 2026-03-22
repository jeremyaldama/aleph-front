# SeedMockCommitmentsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**merchantIds** | **Array&lt;string&gt;** | Merchant IDs to generate one mock commitment each. Defaults to pool participants when omitted. | [optional] [default to undefined]
**quantity** | **number** | Quantity assigned to each generated commitment | [optional] [default to undefined]
**unitPrice** | **number** | Unit price assigned to each generated commitment | [optional] [default to undefined]

## Example

```typescript
import { SeedMockCommitmentsDto } from './api';

const instance: SeedMockCommitmentsDto = {
    merchantIds,
    quantity,
    unitPrice,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
