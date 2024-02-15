import pencil from "../assets/pencil-14.svg";
import trash from "../assets/trash-can-filled.svg";

function Card({ data, onDelete }) {
  const getClassName = () => {
    let base = "card";
    base += data.category === "todo" ? " todo" : " reminder";
    return base;
  };
  return (
    <div className={getClassName()}>
      <div>
        <h2>{data.title.toUpperCase()}</h2>
        <h3>{data.date_created}</h3>
        <p>{data.content}</p>
      </div>
      <div className="overlay flex justify-evenly opacity-0 hover:opacity-100 absolute left-0 top-0 w-full h-full">
        <img
          alt="pencil to modify note"
          src={pencil}
          className="w-6 opacity-100 cursor-pointer"
        />
        <img
          alt="trash can to delete note"
          src={trash}
          className="w-6 opacity-100 cursor-pointer"
          onClick={() => onDelete(data.id)}
        />
      </div>
    </div>
  );
}

export default Card;
