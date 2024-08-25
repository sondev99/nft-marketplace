"use client";

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="nft-chatbot"
      agent-id="4c09791c-5744-466f-8529-9b434562a185"
      language-code="en"
    ></df-messenger>
  );
};

export default Chatbot;
