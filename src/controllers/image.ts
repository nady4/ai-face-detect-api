import { Request, Response } from "express";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import path from "path";

const { Canvas, Image, ImageData } = canvas;
// @ts-ignore: Type compatibility issues between canvas and face-api.js browser types in Node.js
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = async () => {
  const modelsPath = path.join(__dirname, "..", "models");
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
    console.log("🤖 Loaded face-api.js models successfully");
  } catch (err) {
    console.error("❌ Error loading face-api.js models: ", err);
    process.exit(1);
  }
};

loadModels();

export const image = async (req: Request, res: Response) => {
  if (req.body.input) {
    try {
      const input = await canvas.loadImage(req.body.input);
      const detections = await faceapi
        // @ts-ignore: Type compatibility issues between canvas and face-api.js browser types in Node.js
        .detectAllFaces(input);
      //.withFaceLandmarks()
      //.withFaceDescriptors();

      res.json(detections);
    } catch (err) {
      console.error("❌ Error processing image:", err);
      res.status(400).json("Unable to process image with face-api.js");
    }
  } else {
    res.status(400).json("❌ No image input provided");
  }
};

export default image;
