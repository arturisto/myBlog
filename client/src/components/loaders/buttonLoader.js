export default function ButtonLoader(props) {
  const buttonType = props.type;
  return (
    <button className={`btn ${buttonType}`} type="button" disabled>
      <span
        className="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
}
