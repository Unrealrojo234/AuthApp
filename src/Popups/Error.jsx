import "./styles.css";

export default function Error(props) {
  return (
    <div className="container-fluid ">
      <div
        className="error  card position-absolute top-50 start-50 translate-middle"
        style={{ maxWidth: "28rem", zIndex: "100" }}
      >
        <h3 className="text-danger position-relative">
          Error occured while {props.type}
          <i className="fa-regular fa-circle-xmark fa-l position-absolute top-0 start-100 translate-middle"></i>
        </h3>
      </div>
    </div>
  );
}
