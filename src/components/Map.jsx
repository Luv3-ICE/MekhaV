import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Map from "../assets/map/map.png";
import zoomReset from "../assets/map/zoomReset.png";

const Map2 = ({ flowers }) => {
  return (
    <div className="h-full w-full overflow-hidden relative">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        limitToBounds={false}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <div className="absolute bottom-25 right-5 z-10">
              <div className="w-10 h-10" onClick={() => resetTransform()}>
                <img src={zoomReset} alt="Reset zoom" />
              </div>
            </div>

            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              contentStyle={{ width: "100%", height: "max-content" }}
            >
              <div className="relative h-max w-max">
                <img
                  src={Map}
                  alt="Map"
                  className="select-none"
                  draggable={false}
                />
                {flowers.map((flower) => (
                  <div
                    key={flower.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${flower.x}`,
                      top: `${flower.y}`,
                      display: flower.feeling === "sad" ? "none" : "inline",
                    }}
                  >
                    <img
                      src={
                        flower.status === "thirsty"
                          ? flower.thirsty
                          : flower.watered
                      }
                      alt="flower"
                      className="w-10 h-10 transTL"
                    />
                  </div>
                ))}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Map2;
