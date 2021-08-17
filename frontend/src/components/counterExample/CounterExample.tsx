import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../store/store';
import {
  counterExampleChangeName,
  counterExampleCount,
  CounterExampleActionPayload,
} from '../../actions';
import './counterExample.scss';

const CounterExampleComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const counterExample = useSelector((state: IStore) => state.counterExample);
  let counterOptions = [
    `Counting to infinity!`,
    `Professional Adding Machine`,
    `Subtraction is developed!`,
  ];
  const [state, setState] = React.useState<CounterExampleActionPayload>('add');
  React.useEffect(() => {
    let int = setInterval(() => dispatch(counterExampleCount(state)), 1000);
    return () => {
      clearInterval(int);
    };
  }, [state]);

  return (
    <div className="counterExample">
      <p>{counterExample.name}</p>
      <h1>{counterExample.count}</h1>
      <button
        className="counterExampleButton"
        onClick={() => {
          dispatch(
            counterExampleChangeName(
              counterOptions[Math.floor(counterOptions.length * Math.random())]
            )
          );
        }}
      >
        New name!
      </button>
      {state === 'add' ? (
        <button
          className="counterExampleButton"
          onClick={() => {
            setState('subtract');
          }}
        >
          Subtract!
        </button>
      ) : (
        <button
          className="counterExampleButton"
          onClick={() => {
            setState('add');
          }}
        >
          Add!
        </button>
      )}
    </div>
  );
};
export default CounterExampleComponent;
