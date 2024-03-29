import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

import HeroSlider from "../components/HeroSilder";
import ScrollBtnToTop from "../components/ScrollComp/ScrollBtnToTop";
import ScrollToTop from "../components/ScrollComp/ScrollToTopWithChange";

interface LayoutProps {
  children: React.ReactNode;
  img: string;
  pera: string;
  heading: string;
  isHomePage: boolean;
  showSearchBar: boolean;
}

const Layout = ({
  children,
  isHomePage,
  img,
  pera,
  heading,
  showSearchBar,
}: LayoutProps) => {
  return (
    <div className={`${isHomePage ? "h-full" : "flex flex-col min-h-screen"}`}>
      <Header />
      <ScrollBtnToTop />
      <ScrollToTop />
      {isHomePage ? (
        <HeroSlider />
      ) : (
        <Hero img={img} pera={pera} heading={heading} />
      )}
      {showSearchBar && (
        <div className="search-container mx-auto absolute top-[54%] left-0 right-0 md:top-[48%] lg:top-[38%] xl:top-[58%] z-20">
          <SearchBar />
        </div>
      )}
      <div
        className={`${
          isHomePage
            ? "pt-16 lg:pt-10 flex-1 mx-auto"
            : "container py-16 lg:py-10 flex-1 mx-auto"
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
