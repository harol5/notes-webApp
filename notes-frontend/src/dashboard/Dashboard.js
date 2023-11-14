import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const { auth } = useAuth();
  const state = useLocation();
  console.log(auth);
  console.log(state);

  return (
    <section>
      <header>
        <h1>dashboard</h1>
        <ul className="pg-black">
          <li>opction 1</li>
          <li>opction 2</li>
          <li>opction 3</li>
          <li>opction 4</li>
        </ul>
      </header>
      <section>
        <ul>
          <li> post 1 </li>
          <li> post 2 </li>
          <li> post 3 </li>
          <li> post 4 </li>
          <li> post 5 </li>
          <li> post 6 </li>
          <li> post 7 </li>
          <li> post 8 </li>
        </ul>
      </section>
    </section>
  );
}

export default Dashboard;
