import { useState } from "react";
import "./PrimaryBody.css";
import PhishGif from "../../assets/Phishing-account.gif";
import { useNavigate } from "react-router-dom";
const axios = require("axios");


// Send post request and returns probability value
function get_Prediction(url, showProgress, navigate) {

  if (url.length <= 5) {
    console.log("URL provided is less than 5 characters !");
    return;
  }

  // Lowercase the string
  url = url.toLowerCase();

  // Make progressbar visible
  showProgress(true);

  const api_url = "http://localhost:8000/predict";

  // No need to convert to json string
  var data = { url: url };

  console.log("Sending post request !");

  axios
    .post(api_url, data)
    .then((response) => {

      // handle success
      const data = response.data;
      console.log("Request is Sucessful !");
      console.log(data);
      const output = data["prediction"];

      // Make progressbar invisible
      showProgress(false);
      // Navigate to /result
      navigate("/result", { state: { inputUrl: url, output: output } });
    })
    .catch((error) => {
      // handle error
      console.log("Request is NOT Sucessful !");
      console.log(error);
      // Make progressbar invisible
      showProgress(false);
      window.alert("Network Error Occured ! Try again.");
    });
}

//-------------------------------------------------------------------------

export function PrimaryBody(props) {
  const [input_Url, setUrl] = useState("");
  const showProgress = props.showProgress;
  const navigate = useNavigate();

  return (
    <>
      <p className="font-bold max-sm:mx-3 max-sm:text-2xl sm:text-4xl md:text-5xl mt-8 text-center">
  Welcome to Phish Sentinel
</p>

      <p className="font-normal mt-1 text-center text-gray-500 text-sm sm:text-lg mx-7">
      Your First Line of Defense Against Malicious Links.
      </p>

      <img src={PhishGif} alt="Phishing Gif"
        className="max-sm:w-[50%] sm:w-[40%] md:w-[27%] max-md:ml-[30%] md:ml-[40%] lg:w-[24%] mt-3"/>

      <div className="flex max-md:flex-col md:flex-row mt-5">

        <input type="text" placeholder="Enter website address or URL (eg- www.Tesla.com)" onChange={(event) => setUrl(event.target.value)}
        className="border-2 border-gray-600 rounded-sm text-xs min-[550px]:text-sm  md:text-lg  px-1 py-3 md:px-3 md:py-3 
       mx-10 md:mx-3 min-[550px]:mx-20 md:w-[60%] lg:w-[50%] md:ml-[12%] lg:ml-[20%]"/>

        <button
          onClick={() => get_Prediction(input_Url, showProgress, navigate)}
          className="px-4 py-3 text-center w-fit bg-blue-400 hover:bg-blue-500 active:bg-amber-300 max-md:mt-5 max-sm:ml-[38%] sm:max-md:ml-[40%]
          text-white font-extrabold text-roboto rounded">
          SCAN URL
        </button>

      </div>
    </>
  );
}
