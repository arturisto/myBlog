export default function ButtonLoader(props) {
  const buttonType = props.type;
  return (
    <button class={`btn ${buttonType}`} type="button" disabled>
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
}
