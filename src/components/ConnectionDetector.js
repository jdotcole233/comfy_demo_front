import React from "react";

const ConnectionDetector = () => {
  const [online, setOnline] = React.useState(true);
  const [showbanner, setShowbanner] = React.useState(false);

  React.useEffect(() => {
    setOnline(navigator.onLine);
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
  }, []);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    console.log(condition);
    if (condition === "online") {
      const webPing = setInterval(() => {
        console.log("pinging...");
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            setOnline(true);
            clearInterval(webPing);
          })
          .catch(() => setOnline(false));
      }, 2000);
    } else {
      setOnline(false);
    }
  };

  React.useEffect(() => {
    if (!online) {
      setShowbanner(true);
    } else {
      setShowbanner(false);
    }
  }, [online]);

  return showbanner ? (
    <div className="internet-error">No Internet connection</div>
  ) : null;
};

export default ConnectionDetector;
