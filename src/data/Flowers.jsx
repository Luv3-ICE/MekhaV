import Lavender from "../assets/map/Lavender.png";
import Agapanthus from "../assets/map/Agpanthus.png";
import BirdOfParadise from "../assets/map/BirdOfParadise.png";
import BlueIce from "../assets/map/BlueIce.png";
import RedGinger from "../assets/map/RedGinger.png";
import Tulip from "../assets/map/Tulip.png";
import Artichoke from "../assets/map/Artichoke.png";
import LavenderNope from "../assets/map/LavenderNope.png";
import AgapanthusNope from "../assets/map/AgpanthusNope.png";
import BirdOfParadiseNope from "../assets/map/BirdOfParadiseNope.png";
import BlueIceNope from "../assets/map/BlueIceNope.png";
import RedGingerNope from "../assets/map/RedGingerNope.png";
import TulipNope from "../assets/map/TulipNope.png";
import ArtichokeNope from "../assets/map/ArtichokeNope.png";

export const flowers = [
  {
    id: 1,
    name: "Lavender",
    x: "30%",
    y: "69%",
    watered: Lavender,
    thirsty: LavenderNope,
    status: "thirsty",
    feeling: "happy",
  },
  {
    id: 2,
    name: "RedGinger",
    x: "68%",
    y: "42%",
    watered: RedGinger,
    thirsty: RedGingerNope,
    status: "thirsty",
    feeling: "happy",
  },
  {
    id: 3,
    name: "Tulip",
    x: "60%",
    y: "55%",
    watered: Tulip,
    thirsty: TulipNope,
    status: "thirsty",
    feeling: "happy",
  },
  {
    id: 4,
    name: "BlueIce",
    x: "46%",
    y: "62%",
    watered: BlueIce,
    thirsty: BlueIceNope,
    status: "thirsty",
    feeling: "happy",
  },
  {
    id: 5,
    name: "BirdOfParadise",
    x: "69%",
    y: "31%",
    watered: BirdOfParadise,
    thirsty: BirdOfParadiseNope,
    status: "thirsty",
    feeling: "happy",
  },
  {
    id: 6,
    name: "Artichoke",
    x: "15%",
    y: "77%",
    watered: Artichoke,
    thirsty: ArtichokeNope,
    status: "thirsty",
    feeling: "happy",
  },
];
