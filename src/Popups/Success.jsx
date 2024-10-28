import "./styles.css";

export default function Success(props) {
  return (
    <div className="container-fluid ">
      <div
        className="success  card position-absolute top-50 start-50 translate-middle"
        style={{ maxWidth: "28rem", zIndex: "100" }}
      >
        <h3 className="text-success position-relative">
          {props.type} Successfully
          <i className="fa-regular fa-circle-check fa-l position-absolute top-0 start-100 translate-middle"></i>
        </h3>
      </div>
    </div>
  );
}
