import { Button, Spinner } from "grommet";

const PickWinner = ({ onClick, loading }) => {
  return (
    <div>
      {loading ? <Spinner /> : <Button label="Pick Winner" onClick={onClick} />}
    </div>
  );
};

export default PickWinner;
