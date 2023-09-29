import { useSelector } from 'react-redux';

function Wallet() {
  const globalState = useSelector((state) => state);
  console.log(globalState);

  return <div>TrybeWallet</div>;
}

export default Wallet;
