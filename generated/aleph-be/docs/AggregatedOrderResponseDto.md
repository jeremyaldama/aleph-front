# AggregatedOrderResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**orderId** | **string** |  | [default to undefined]
**poolId** | **string** |  | [default to undefined]
**totalQuantity** | **number** |  | [default to undefined]
**weightedUnitPrice** | **number** |  | [default to undefined]
**totalNotional** | **number** |  | [default to undefined]
**participatingMerchants** | **number** |  | [default to undefined]
**commitmentIds** | **Array&lt;string&gt;** |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**tokenization** | [**TokenizationRecordDto**](TokenizationRecordDto.md) |  | [optional] [default to undefined]
**financing** | [**FinancingRecordDto**](FinancingRecordDto.md) |  | [optional] [default to undefined]
**settlement** | [**SettlementRecordDto**](SettlementRecordDto.md) |  | [optional] [default to undefined]
**repayments** | [**Array&lt;RepaymentRecordDto&gt;**](RepaymentRecordDto.md) |  | [default to undefined]
**bridgePreparation** | [**BridgePreparationDto**](BridgePreparationDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AggregatedOrderResponseDto } from './api';

const instance: AggregatedOrderResponseDto = {
    orderId,
    poolId,
    totalQuantity,
    weightedUnitPrice,
    totalNotional,
    participatingMerchants,
    commitmentIds,
    status,
    createdAt,
    tokenization,
    financing,
    settlement,
    repayments,
    bridgePreparation,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
