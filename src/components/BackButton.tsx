import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate(`/`)}>Back</button>;
};
