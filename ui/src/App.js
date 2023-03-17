import './App.css';
import MLFeedbackWidget from 'ml-feedback-widget';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [results, setResults] = useState([]);

  const widget_url="http://127.0.0.1:5000/webhook" // CHANGE THIS TO THE CUSTOM URL OF YOUR WEBHOOK
  
  const results_url="http://127.0.0.1:5000/get_feedback" // just for demo
  const searchbar_img_url = "https://i.imgur.com/1L8rzON.png"; // reference: https://dribbble.com/shots/19813155-Shop-App-Best-Practices-for-Search-Results
  const search_results_img_url = "https://i.imgur.com/LyzBbts.png"; // reference: https://dribbble.com/shots/3206792-Search-Results-Wireframe-Interaction-Prototype

  useEffect (() => {
    axios.get(results_url)
      .then((response) => {
          setResults(response.data.feedback);
          console.log(response);
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

  return (
    <div>
      <div class="demo-container">
        <img class="searchbar-image" src={searchbar_img_url} alt="sample searchbar"></img>
        <MLFeedbackWidget url={widget_url}/>
        <img src={search_results_img_url} alt="sample search result"></img>
      </div>
      <div class="container">
        <h1 class="title">Results:</h1>
        <h2 class="subtitle">Refresh to see your inputs in the table.</h2>
        <table class="table">
          <thead>
            <tr>
              <th><abbr title="Uid">Uid</abbr></th>
              <th><abbr title="Liked?">Liked?</abbr></th>
              <th><abbr title="Feedback">Feedback</abbr></th>
            </tr>
          </thead>
          <tbody>
            {console.log(results[0])}
            {results.map((result) => (
              <tr>
                <th>{result.uid}</th>
                <td>{result.is_liked.toString()}</td>
                <td>{result.feedback_text === "" ? "N/a" : result.feedback_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default App;
