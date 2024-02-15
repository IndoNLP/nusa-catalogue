import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">SEA Crowd Data Catalogue</h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          There are currently 362 datasets. This catalog is the result of the
          SEACrowd initiative. Consider citing us alongside the dataset you used
          for your scientific work.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a href="#dataset">
            <Button className="w-full md:w-1/3">Browse Dataset</Button>
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

      {/* Hero cards sections */}
      <div className="z-10">{/* <HeroCards /> */}</div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
