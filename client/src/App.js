import './App.css';
import axios from "axios";

function App() {

  axios.get("http://localhost:5000/api", (response) => {
    console.log(response);
  })

  return (
    <div className="App">
      Hi from client
    </div>
  );
}

export default App;
