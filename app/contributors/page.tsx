"use client";

import { Navbar } from "@/components/Navbar";
import { ArrowUpRight } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <section className="container grid lg:grid-cols-2 place-items-start py-20 md:py-32 gap-10">
        <div className="text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">Contributors</h1>
          </main>

          <p className="text-lg text-muted-foreground">
            SEACrowd-Catalogue is a part of{" "}
            <a className="underline" href="https://github.com/SEACrowd">
              SEACrowd initiative
            </a>
            . SEACrowd-Catalogue functions as a front-end data catalogue listed
            in SEACrowd, so individuals can easily find Southeast Asia NLP data
            for their research and projects.
          </p>

          <p className="text-lg text-muted-foreground">
            This open-source project is initiated and maintained by amazing
            contributors:
          </p>

          <div className="text-lg">
            <ul id="list" className="list-disc list-inside">
              <li>
                <a
                  href="https://holylovenia.github.io/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Holy</b> Lovenia (AI Singapore){" "}
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://samuelcahyawijaya.github.io/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Samuel</b> Cahyawijaya (HKUST){" "}
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ruochenzhang.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Ruochen</b> Zhang (Brown University)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="http://fajrikoto.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Fajri</b> Koto (MBZUAI)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://yongzx.github.io/"
                  target="_blank"
                  className="hover:underline"
                >
                  Zheng-Xin <b>Yong</b> (Brown University)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://gentawinata.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Genta</b> Indra Winata (IndoNLP)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.blaisecruz.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  Jan Christian <b>Blaise</b> Cruz (Samsung R&amp;D Institute
                  Philippines)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ruder.io/"
                  target="_blank"
                  className="hover:underline"
                >
                  Sebastian <b>Ruder</b> (Google)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://afaji.github.io/"
                  target="_blank"
                  className="hover:underline"
                >
                  Alham Fikri <b>Aji</b> (MBZUAI)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ayu-purwarianti"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Ayu</b> Purwarianti (ITB, Prosa.ai)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="linkedin.com/in/william-tjhi-353a0840/"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>William</b> Tjhi (AI Singapore)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
              <li>
                <a
                  href="https://sonnylab.com"
                  target="_blank"
                  className="hover:underline"
                >
                  <b>Sonny</b> Lazuardi (UX Engineer)
                  <ArrowUpRight size={20} className="inline" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-50">
          <div className="w-full relative">
            <img src="/contributor.jpg" alt="contributor" />
          </div>
        </div>
      </section>
    </div>
  );
}
