import { NextPage } from "next";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="">
        <Header />
        <Searchbar />
      </main>
    </div>
  );
};

export default HomePage;
