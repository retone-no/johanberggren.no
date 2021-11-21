import Image from "next/image";
import Container from "../components/Container";
import { BiLinkExternal } from "react-icons/bi";
import { CMS_URL } from "consts";
import { Concert } from "types/concert";
import { InferGetStaticPropsType } from "next";
import dayjs from "dayjs";
import classNames from "classnames";

const ALBUMS = [
  {
    name: "Ei Hytte Foran Loven",
    image: "/img/ehfl.png",
    externalLink: "https://songwhip.com/johanberggren/eihytteforanloven",
  },
  {
    name: "Liliyhamericana",
    image: "/img/lilyhamericana.jpg",
    externalLink: "https://songwhip.com/johanberggren/lilyhamericana",
  },
  {
    name: "For Now I'm Good Right Here",
    image: "/img/fnigrh.png",
    externalLink:
      "https://songwhip.com/johanberggren/for-now-im-good-right-here",
  },
];

export default function Home({
  concerts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div className="h-screen w-screen relative flex max-w-full ">
        <div className="m-auto z-30 flex flex-col lg:flex-row gap-10 p-8 max-h-[600px]">
          <Image
            src="/img/ehfl.png"
            layout="intrinsic"
            objectFit="contain"
            height={450}
            width={450}
          />

          <div className="flex flex-col max-w-3xl lg:mt-0">
            <span className="text-[#c99b1e] uppercase mx-auto lg:mx-0 text-sm mb-2">
              Nytt album
            </span>
            <h2 className="text-white text-3xl text-center lg:text-left lg:text-5xl xl:text-6xl font-black">
              Ei Hytte Foran Loven
            </h2>
            <p className="text-white leading-tight mt-2 lg:mt-8 text-center lg:text-left ">
              <q className="leading-relaxed font-light text-gray-300 italic">
                Johan Berggren fra Lillehammer følger opp fjorårets album på
                morsmålet med en ny fulltreffer,{" "}
                <span className="whitespace-nowrap">
                  &#171;Ei hytte foran loven&#187;.
                </span>
              </q>
              <span className="block mt-2 font-medium text-lg">
                - Dagbladet
              </span>
            </p>
            <a
              className="z-50 bg-white w-max mt-12 py-4 px-10 rounded-sm uppercase text-gray-900 transition-colors hover:bg-gray-200 mx-auto lg:mx-0 text-sm"
              href="https://songwhip.com/johanberggren/eihytteforanloven"
              target="_blank"
              rel="noreferrer noopener"
            >
              Lytt nå
            </a>
          </div>
        </div>
        <div className="absolute h-screen w-screen max-w-full bg-black z-10 opacity-30" />
        <video
          muted
          autoPlay
          loop
          className="h-full w-full object-cover absolute"
        >
          <source type="video/mp4" src="/video/valgt-det-sjol.mp4" />
        </video>
      </div>

      <Container>
        <h2 className="font-bold text-2xl leading-relaxed mb-6">Konserter</h2>
        {concerts.length > 0 ? (
          <ul className="divide-y">
            {concerts.map((concert, index) => (
              <li
                className={classNames(
                  "flex items-center gap-x-4",
                  index !== concerts.length - 1 && "pb-6",
                  index !== 0 && "pt-6"
                )}
              >
                <div className="flex flex-col flex-1">
                  <span className="font-medium">
                    {dayjs(concert.date).format("DD MMM, YYYY")}
                  </span>
                  <span className="text-gray-500 font-light">
                    {concert.venue}
                  </span>
                </div>
                <span className="font-medium flex-1 text-center">
                  {concert.city}, {concert.country}
                </span>
                <a
                  href={concert.ticketLink}
                  className="items-center gap-1 underline font-medium transition-opacity hover:opacity-50 flex-1 ml-auto text-right"
                >
                  Billetter <BiLinkExternal className="inline" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500">Ingen kommende konserte</span>
        )}

        <h2 className="font-bold text-2xl leading-relaxed mb-6 mt-10 lg:mt-20">
          Musikk
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {ALBUMS.map((album) => (
            <a
              key={album.name}
              className="group cursor-pointer"
              href={album.externalLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src={album.image}
                layout="intrinsic"
                height={300}
                width={300}
              />

              <span className="uppercase  text-sm text-gray-900 group-hover:underline block">
                {album.name} <BiLinkExternal className="inline" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(CMS_URL + "/concerts");

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const concerts: Concert[] = await response.json();
  return {
    props: { concerts },
  };
}