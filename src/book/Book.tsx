import "./book.css";
import PageFrame from "../components/PageFrame";
import SectionTitle from "../components/SectionTitle";
import { intro, appendix, party, allies, enemies } from "../data";
import HTMLFlipBook from "react-pageflip";

// ✅ anything inside /public is referenced from root like this:
const COVER_URL = "/textures/cover.png";

type Chapter = {
  title: string;
  sections: readonly { heading: string; text: string }[];
};

type Page =
  | { kind: "cover" }
  | { kind: "chapter"; data: Chapter }
  | { kind: "blank" };

function renderPage(page: Page) {
  if (page.kind === "cover") {
    return <img className="coverImg" src={COVER_URL} alt="Cover" draggable={false} />;
  }

  if (page.kind === "blank") return <div className="blankPage" />;

  return (
    <div className="pageContent">
      <SectionTitle>{page.data.title}</SectionTitle>

      {page.data.sections.map((s, i) => (
        <div key={i} className="sectionBlock">
          <h3>{s.heading}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function Book() {
  const innerPages: Page[] = [
    { kind: "chapter", data: intro as Chapter },
    { kind: "chapter", data: party as Chapter },
    { kind: "chapter", data: allies as Chapter },
    { kind: "chapter", data: enemies as Chapter },
    { kind: "chapter", data: appendix as Chapter },
  ];

  // With showCover=true, cover is single page, then spreads.
  // So inner pages should be EVEN so the last spread isn't half-empty.
  const needsBlank = innerPages.length % 2 !== 0;
  
    const coverPage = { kind: "cover" } satisfies Page;
    const blankPage = { kind: "blank" } satisfies Page;

    const pagesFixed: Page[] = [
      coverPage,
      blankPage,
      ...innerPages,
      ...(needsBlank ? [blankPage] : []),
    ];



  const FlipBook = HTMLFlipBook as any;

  return (
    <div className="bookStage">
      <div className="bookScale">
          <FlipBook
            width={620}
            height={820}
            size="fixed"

            showCover={true}
            usePortrait={false}

            startPage={0}
            disableFlipByClick={false}

            minWidth={620}
            maxWidth={1240}
            minHeight={820}
            maxHeight={820}

            useMouseEvents={true}
            mobileScrollSupport={false}
            drawShadow={true}
            maxShadowOpacity={0.35}
            showPageCorners={true}
            flippingTime={650}
            className="flipBook"
          >
          {pagesFixed.map((p, i) => {
            const isCover = p.kind === "cover";
            const isBlank = p.kind === "blank";

            // ✅ With showCover=true:
            // i=0 cover (single)
            // i=1 left page, i=2 right page, etc.
            const sideClass =
              i === 0 ? "coverPage" : i % 2 === 1 ? "leftPage" : "rightPage";

            return (
              <PageFrame
                key={i}
                className={`${sideClass} ${isBlank ? "blankFrame" : ""}`}
              >
                {renderPage(p)}
              </PageFrame>
            );
          })}
        </FlipBook>
      </div>
    </div>
  );
}
