import pencil from "../assets/pencil-14.svg";
import trash from "../assets/trash-can-filled.svg";

function Card({ data, onDelete, onEdit }) {
  const getClassName = () => {
    let base = "card";
    base += data.category === "todo" ? " todo" : " reminder";
    return base;
  };

  console.log(data);

  return (
    <div className={getClassName()}>
      <div className="note-container">
        <h2>{data.title.toUpperCase()}</h2>
        <h3>{data.dateCreated}</h3>
        <p>{data.content}</p>
      </div>
      <div className="overlay flex justify-evenly opacity-0 hover:opacity-100 absolute left-0 top-0 w-full h-full">
        <svg
          className="pencil-icon w-6 opacity-100 cursor-pointer"
          onClick={() => onEdit(data)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
        </svg>
        <svg
          className="trash-icon w-6 opacity-100 cursor-pointer"
          onClick={() => onDelete(data.id)}
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
