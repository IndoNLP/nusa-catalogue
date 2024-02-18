import Link from "next/link";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { Database, Github, MapPin } from "lucide-react";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./helper/useIntersectionObserver";
import { cn } from "@/lib/utils";

const markers: any = [
  { location: [4.5353, 114.7277], size: 0.08, country: "Brunei" },
  { location: [12.5657, 104.991], size: 0.08, country: "Cambodia" },
  { location: [-8.8742, 125.7275], size: 0.08, country: "Timor-Leste" },
  { location: [-0.7893, 113.9213], size: 0.08, country: "Indonesia" },
  { location: [19.8563, 102.4955], size: 0.08, country: "Laos" },
  { location: [4.2105, 101.9758], size: 0.08, country: "Malaysia" },
  { location: [21.9162, 95.956], size: 0.08, country: "Myanmar" },
  { location: [12.8797, 121.774], size: 0.08, country: "Philippines" },
  { location: [1.3521, 103.8198], size: 0.08, country: "Singapore" },
  { location: [15.87, 100.9925], size: 0.08, country: "Thailand" },
  { location: [14.0583, 108.2772], size: 0.08, country: "Vietnam" },
];

let currentPhi = Math.PI * -0.16 + Math.PI;
let currentTheta = -0.06 * Math.PI;

export const Hero = () => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const canvasRef = useRef();
  const locationToAngles = (lat: number, long: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  const focusRef = useRef([currentPhi, currentTheta]);
  const [country, setCountry] = useState(null);
  useEffect(() => {
    let globe: any;
    let width = 0;
    const doublePi = Math.PI * 2;
    const onResize = () =>
      canvasRef.current && (width = (canvasRef.current as any).offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 1,
        width: 600,
        height: 600,
        phi: Math.PI * -0.16 + Math.PI,
        theta: -2.06 * Math.PI,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 20000,
        mapBrightness: 1.5,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [0.9, 0.9, 0.9],
        markers,
        onRender: (state) => {
          state.phi = currentPhi;
          state.theta = currentTheta;
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
          const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
          // Control the speed
          if (distPositive < distNegative) {
            currentPhi += distPositive * 0.08;
          } else {
            currentPhi -= distNegative * 0.08;
          }
          currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
          state.width = width;
          state.height = width;
        },
      });
    }

    let rotate = setInterval(() => {
      const currentMarker = markers[Math.floor(Math.random() * markers.length)];
      const [lat, long] = currentMarker.location;
      focusRef.current = locationToAngles(lat, long);
      setCountry(currentMarker.country);
    }, 2500);

    return () => {
      clearInterval(rotate);
      window.removeEventListener("resize", onResize);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">SEA Crowd Data Catalogue</h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          This catalog is the result of the{" "}
          <a
            target="_blank"
            href="https://github.com/SEACrowd"
            className="underline"
          >
            SEACrowd
          </a>{" "}
          initiative. Consider{" "}
          <Link href="/contributors" className="underline">
            citing us
          </Link>{" "}
          alongside the dataset you used for your scientific work.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a href="#dataset">
            <Button className="w-full md:w-1/3">
              Browse Dataset <Database className="ml-2 w-5 h-5" />
            </Button>
          </a>

          <a
            href="https://github.com/SEACrowd/seacrowd-catalogue"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <Github className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-3xl w-full relative md:mt-20 lg:mt-0">
        <div className="h-[300px] w-full bg-yellow-50 rounded-3xl md:hidden"></div>
        <div
          className="h-[500px] w-full overflow-hidden absolute left-0 top-0 md:relative -mt-[200px] pointer-events-none"
          ref={ref}
        >
          <div
            className={cn(
              "md:mt-[70px] h-[800px] w-full max-w-[600px] overflow-hidden absolute right-0 top-0",
              !isIntersecting && "invisible"
            )}
          >
            <canvas
              // @ts-ignore
              ref={canvasRef}
              style={{
                width: 600,
                height: 600,
                maxWidth: "100%",
                aspectRatio: 1,
              }}
            />
          </div>
        </div>
        <div className="absolute left-0 bottom-0 p-4 flex flex-row items-center">
          <MapPin size={20} className="mr-2" /> {country}
        </div>
      </div>
    </section>
  );
};
