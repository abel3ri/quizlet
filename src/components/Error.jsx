import "../styles/Error.css";
export default function Loader() {
  return (
    <div className="status-container">
      <div className="error">
        <h4>
          <span>❌</span> There was an error fetching questions <span>❌</span>
        </h4>
      </div>
    </div>
  );
}
