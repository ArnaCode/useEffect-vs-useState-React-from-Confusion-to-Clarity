import { useState, useEffect } from "react";
import { Moon, Sun, Loader2 } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  phone: string;
  website: string;
};

export default function UserProfile() {
  const [theme, setTheme] = useState("light");
  const [userData, setUserData] = useState<UserData | null>(null);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  const fetchUserData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    setUserData(data);
    console.log("fetch");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } `}
      >
        <header className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-semibold">User Profile</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-800"
            } transition-colors duration-300`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>
        <section className="p-6">
          {userData ? (
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium opacity-70">Name</dt>
                <dd className="text-lg">{userData.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium opacity-70">Email</dt>
                <dd className="text-lg">{userData.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium opacity-70">Phone</dt>
                <dd className="text-lg">{userData.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium opacity-70">Website</dt>
                <dd className="text-lg">{userData.website}</dd>
              </div>
            </dl>
          ) : (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
