import "./CategoryItem.css";

const CategoryItem = ({ id, name, icon, fixedStatus }) => {
  return (
    <>
      <div className="category_list_item">
        <div className="category_item chk">
          <input type="checkbox" name="" id="" />
          <label htmlFor=""></label>
        </div>
        <div className="category_item id">{id}</div>
        <div className="category_item icon">
          <img src="https://via.placeholder.com/50.jpg" alt="" />
        </div>
        <div className="category_item name">{name}</div>
        <div className="category_item fixed">{fixedStatus}</div>
      </div>
    </>
  );
};

export default CategoryItem;
