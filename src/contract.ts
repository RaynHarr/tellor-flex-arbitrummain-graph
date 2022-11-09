import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewGovernanceAddress,
  NewReport,
  NewReportingLock,
  NewStakeAmount,
  NewStaker,
  ReporterSlashed,
  StakeWithdrawRequested,
  StakeWithdrawn,
  ValueRemoved
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleNewGovernanceAddress(event: NewGovernanceAddress): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._newGovernanceAddress = event.params._newGovernanceAddress

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getBlockNumberByTimestamp(...)
  // - contract.getCurrentValue(...)
  // - contract.getGovernanceAddress(...)
  // - contract.getNewValueCountbyQueryId(...)
  // - contract.getReportDetails(...)
  // - contract.getReporterByTimestamp(...)
  // - contract.getReporterLastTimestamp(...)
  // - contract.getReportingLock(...)
  // - contract.getReportsSubmittedByAddress(...)
  // - contract.getReportsSubmittedByAddressAndQueryId(...)
  // - contract.getStakeAmount(...)
  // - contract.getStakerInfo(...)
  // - contract.getTimeOfLastNewValue(...)
  // - contract.getTimestampIndexByTimestamp(...)
  // - contract.getTimestampbyQueryIdandIndex(...)
  // - contract.getTokenAddress(...)
  // - contract.getTotalStakeAmount(...)
  // - contract.governance(...)
  // - contract.reportingLock(...)
  // - contract.retrieveData(...)
  // - contract.slashReporter(...)
  // - contract.stakeAmount(...)
  // - contract.timeOfLastNewValue(...)
  // - contract.token(...)
  // - contract.totalStakeAmount(...)
}

export function handleNewReport(event: NewReport): void {}

export function handleNewReportingLock(event: NewReportingLock): void {}

export function handleNewStakeAmount(event: NewStakeAmount): void {}

export function handleNewStaker(event: NewStaker): void {}

export function handleReporterSlashed(event: ReporterSlashed): void {}

export function handleStakeWithdrawRequested(
  event: StakeWithdrawRequested
): void {}

export function handleStakeWithdrawn(event: StakeWithdrawn): void {}

export function handleValueRemoved(event: ValueRemoved): void {}
