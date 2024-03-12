import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Get your current device location!
      </h1>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Click on the map
      </h4>
      <div className="w-3/4 h-1/2 rounded-md">
        <Map />
      </div>
      <p className="leading-7 text-center">
        <i>
          Location data does <b>NOT</b> get stored anywhere and its deleted when
          you close/refresh the tab or close the browser.
          <br />
          <a
            href="https://github.com/FedeMontanari/get-location-nextjs"
            className="text-blue-400 hover:border-b-2 hover:font-bold border-blue-400"
          >
            Source Code
          </a>
        </i>
      </p>
    </main>
  );
}
