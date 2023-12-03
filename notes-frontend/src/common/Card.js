function Card({ data }) {
  const getClassName = () => {
    let base = "card";
    base += data.category === "todo" ? " todo" : " reminder";
    return base;
  };
  return (
    <div className={getClassName()}>
      <h2>{data.title.toUpperCase()}</h2>
      <h3>{data.date_created}</h3>
      <p>{data.content}</p>
    </div>
  );
}

export default Card;
