import { CommanderClient } from "../CommanderClient";
import { GetReplicationSetCommand, GetReplicationSetCommandInput } from "../commands/GetReplicationSetCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, checkExceptions, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: CommanderClient, input: GetReplicationSetCommandInput): Promise<WaiterResult> => {
  let reason;
  try {
    let result: any = await client.send(new GetReplicationSetCommand(input));
    reason = result;
    try {
      let returnComparator = () => {
        return result.replicationSet.status;
      };
      if (returnComparator() === "DELETING") {
        return { state: WaiterState.RETRY, reason };
      }
    } catch (e) {}
    try {
      let returnComparator = () => {
        return result.replicationSet.status;
      };
      if (returnComparator() === "FAILED") {
        return { state: WaiterState.FAILURE, reason };
      }
    } catch (e) {}
  } catch (exception) {
    reason = exception;
    if (exception.name && exception.name == "ResourceNotFoundException") {
      return { state: WaiterState.SUCCESS, reason };
    }
  }
  return { state: WaiterState.RETRY, reason };
};
/**
 * Wait for a replication set to be deleted
 *  @deprecated Use waitUntilWaitForReplicationSetDeleted instead. waitForWaitForReplicationSetDeleted does not throw error in non-success cases.
 */
export const waitForWaitForReplicationSetDeleted = async (
  params: WaiterConfiguration<CommanderClient>,
  input: GetReplicationSetCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 30 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
/**
 * Wait for a replication set to be deleted
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetReplicationSetCommand for polling.
 */
export const waitUntilWaitForReplicationSetDeleted = async (
  params: WaiterConfiguration<CommanderClient>,
  input: GetReplicationSetCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 30, maxDelay: 30 };
  const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
  return checkExceptions(result);
};
