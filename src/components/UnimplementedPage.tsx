import { useNavigate } from "react-router-dom";

export default function UnimplementedPage({ data, title }) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>{title} Map 2026 coming soon...</h1>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </>
  );
}
