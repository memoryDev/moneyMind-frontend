import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [result, setResult] = useState("faild");
  useEffect(() => {
    axios
      .get("/api/test")
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>통신 성공 여부 = {result}</>;
}

export default App;
