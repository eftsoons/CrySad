import { ungzip } from "pako";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { CSSProperties, useEffect, useState } from "react";

export function AnimationTGS({
  src,
  style,
}: {
  src: string;
  style?: CSSProperties;
}) {
  const [lottieJson, setLottieJson] = useState<object | null>(null);

  useEffect(() => {
    async function Data() {
      setLottieJson(await loadAndDecompress(src));
    }
    Data();
  }, []);

  return (
    lottieJson && (
      <Player autoplay loop src={lottieJson} style={style}>
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    )
  );
}

async function loadAndDecompress(url: string) {
  let response_data;
  if (!response_data) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const decompressed = ungzip(new Uint8Array(arrayBuffer));
    const data = new TextDecoder("utf-8").decode(decompressed);
    response_data = JSON.parse(data);
  }
  return response_data;
}
