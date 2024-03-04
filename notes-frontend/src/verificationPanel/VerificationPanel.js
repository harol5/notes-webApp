import { useParams, Link } from "react-router-dom";

const VerificationPanel = ({}) => {
  const { username } = useParams();
  return (
    <div>
      <h1 className="success">Hello {username},</h1>
      <p>
        your account have been <b className="success">confirmed</b>. you can
        <Link to="/" className="text-sky-400 hover:text-green-400">
          {" "}
          login
        </Link>{" "}
        now!!
      </p>
    </div>
  );
};

export default VerificationPanel;
