export enum CounterExampleActionsEnum {
  COUNTER_EXAMPLE_CHANGENAME = 'COUNTER_EXAMPLE_CHANGENAME',
  COUNTER_EXAMPLE_COUNT = 'COUNTER_EXAMPLE_COUNT',
  COUNTER_EXAMPLE_ADD = 'COUNTER_EXAMPLE_ADD',
  COUNTER_EXAMPLE_SUBTRACT = 'COUNTER_EXAMPLE_SUBTRACT',
}

export interface CounterExampleAction {
  type: CounterExampleActionsEnum;
  payload: any;
}

export interface CounterExampleCountAction extends CounterExampleAction {
  payload: CounterExampleActionPayload;
}
export type CounterExampleActionPayload = 'add' | 'subtract';

export function counterExampleChangeName(payload: string) {
  return {
    type: CounterExampleActionsEnum.COUNTER_EXAMPLE_CHANGENAME,
    payload,
  };
}

export function counterExampleCount(payload: CounterExampleActionPayload) {
  return {
    type: CounterExampleActionsEnum.COUNTER_EXAMPLE_COUNT,
    payload,
  };
}
