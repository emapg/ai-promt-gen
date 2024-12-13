// Import required libraries
import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle real-time updates for responses
  const handleGenerate = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("https://bolt.new/api/enhancer", {
        headers: {
          "accept": "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "text/plain;charset=UTF-8",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "_gcl_au=1.1.925405317.1734089680; _ga=GA1.1.179021037.1734089680; _ga_SLJ4P1NJFR=GS1.1.1734089679.1.1.1734089700.0.0.0; __session=eyJkIjoiN0xrdDhBcEVwTUFCYXZXS1pHQ0xhNDZQTnM3SC81RFl5S0Y3dFVCT2J3NGJzN3lUN3g2dWIyNHEzNjVCS2c0RzIyTjlaNC9GYmVMaE4vblNhQzBzQ1hKZEtYaWl2MHRJSUpUL21GRmpra2QvTi9NZjJsODR5ckRzNnRzc2FHY2xuQmFxTkRUdEpEdzhKWmQ5aWJQY3Bxd3p6WllzTUxPK2g5dnozcmJ3L09ZZ1Fxd0tLTUtaSDV1emJ2ME5TeTVpVWdrRmpPR0lPcWlWNTlsOVNlZXZ3eHBDUVhCaUN1bWZ1K0RBZG5WRGxiUzlCYm1nRk9oanZpY3Y1NG1FVDVaS24rRGp1dGxSTDlkeFhJcnFGcitTdDAzYnVhVDRoUzJXMFZ1MWRBZW5jV3VaWkU5N3FZUk5ISHg3Tm9xbUJMTG5Jc3FvN2tVNnBZVmM1UXlINnoyNU13bG04OWd2VDlJUW9kbVJ6dU9XdTAvbzgrQ01ka2wzNzJIMEhiRVBsWlhSZkQxNUI3SjhpWm03UlZadExPa1NCVURQbGZmdjdvVkI1RElEVGZlQXZPNGRyY2lyT2Y4R0V2aVhXYU1jcHovVCJ9.hClXKGP17ILRDkm0CTG0vJQD0NnK7YbzHBqeq9FTcwE",
          "Referer": "https://bolt.new/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify({ message: prompt }),
        method: "POST",
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaRocket className="text-yellow-400" /> AI Prompt Generator
        </h1>
        <textarea
          rows="5"
          className="w-full border border-gray-600 bg-gray-900 text-white rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 text-black hover:bg-yellow-500"}`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg mt-6"
      >
        <h2 className="text-xl font-bold mb-2">Response:</h2>
        <div className="text-gray-300 whitespace-pre-wrap overflow-y-auto max-h-64">
          {response ? <p>{response}</p> : <p>No response yet.</p>}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
