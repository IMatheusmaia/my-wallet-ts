import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h2>Página não encontrada</h2>
      <Link to="/">retornar</Link>
    </>
  );
}

export default NotFound;
