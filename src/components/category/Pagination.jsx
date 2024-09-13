import "./Pagination.css";

const Pagination = () => {
  return (
    <>
      <div className="pagination_wrap">
        <button className="pagination_btn">&lt;</button>
        <ul className="pagination_item_wrap">
          <li className="pagination_item">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
          </li>
        </ul>
        <button className="pagination_btn">&gt;</button>
      </div>
    </>
  );
};

export default Pagination;
