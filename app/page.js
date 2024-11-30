import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <footer className="bg-blue-100 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Made by Kris</p>
        </div>
      </footer>
    </div>
  );
}
