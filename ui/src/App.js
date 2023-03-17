import './App.css';
import MLFeedbackWidget from 'ml-feedback-widget';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [results, setResults] = useState([]);

  // const widget_url="http://127.0.0.1:5000/webhook" // CHANGE THIS TO THE CUSTOM URL OF YOUR WEBHOOK
  const widget_url="https://interlocklabs.pythonanywhere.com"

  const results_url="http://127.0.0.1:5000/get_feedback" // just for demo
  const searchbar_img_url = "https://i.imgur.com/1L8rzON.png"; // reference: https://dribbble.com/shots/19813155-Shop-App-Best-Practices-for-Search-Results
  const search_results_img_url = "https://i.imgur.com/De5Q3ws.png"; // reference: https://dribbble.com/shots/19813155-Shop-App-Best-Practices-for-Search-Results

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
      <h1 class="title">Try the widget out below.</h1>
      <div class="demo-container">
        <img class="searchbar-image" src={searchbar_img_url} alt="sample searchbar"></img>
        <MLFeedbackWidget feedbackEndpointUrl={widget_url}/>
        <img class="search-results-image" src={search_results_img_url} alt="sample search result"></img>
      </div>
      <div class="results-container">
        <div>
          <h1 class="title">Results:</h1>
            <h2 class="subtitle">Refresh to see your inputs in the table.</h2>
            <table class="table">
              <thead>
                <tr class="row">
                  <th>Uid</th>
                  <th>Liked?</th>
                  <th>Feedback</th>
                </tr>
              </thead>
            {
              results.length === 0 ? 
              <p>Loading...</p> : 
                <tbody>
                  {console.log(results[0])}
                  {results.map((result) => (
                    <tr class="row">
                      <td>{result.uid}</td>
                      <td>{result.is_liked.toString()}</td>
                      <td>{result.feedback_text === "" ? "N/a" : result.feedback_text}</td>
                    </tr>
                  ))}
                </tbody>
            }
            </table>
        </div>
      </div>
    </div>
    
  );
}

export default App;