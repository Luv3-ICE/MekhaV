import { useEffect, useState } from "react";

const ARViewer = () => {
    // const [model, setModel] = useState("https://model1.glb");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://iceice.8thwall.app/mekha-v/";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <iframe
                src={`https://iceice.8thwall.app/mekha-v/`}
                width="100%"
                height="600px"
                style={{ border: "none" }}
            ></iframe>
            <button onClick={() => setModel("https://model2.glb")}>
                เปลี่ยนโมเดล
            </button>
        </div>
    );
};

export default ARViewer;
