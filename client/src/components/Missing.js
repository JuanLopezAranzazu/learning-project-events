import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <div>
        <button type="button" className="btn-primary" onClick={goBack}>
          Volver
        </button>
      </div>
    </section>
  );
};

export default Missing;
