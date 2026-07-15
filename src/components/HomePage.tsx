import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <button onClick={() => navigate("/senate")}>Senate</button>
        <button onClick={() => navigate("/governor")}>Governor</button>
        <button onClick={() => navigate("/house")}>House</button>
      </div>
    </>
  );
}
