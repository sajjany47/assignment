import { ProgressSpinner } from "primereact/progressspinner";

const Loader = () => {
  return (
    <div className="loader_spinner">
      <ProgressSpinner strokeWidth="3" style={{ width: 30 }} />
      <h3>Loading</h3>
    </div>
  );
};

export default Loader;
