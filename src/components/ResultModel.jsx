import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModel = forwardRef(
  ({ targetTime, reaminingTime, onReset }, ref) => {
    const userLost = reaminingTime <= 0;
    const formattedRemainingTime = (reaminingTime / 1000).toFixed(2);
    const score=Math.round((1-reaminingTime/(targetTime*1000))*100);
    const dialog = useRef();
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });
    return (
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>YOU LOST</h2>}
        {!userLost && <h2>YOUR SCORE IS {score}</h2>}
        <p>
          The Target Time Was <strong>{targetTime} Second.</strong>
        </p>
        <p>
          You Stopped Timer With <strong>{formattedRemainingTime} second left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

export default ResultModel;
