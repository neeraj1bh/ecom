import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const showNavbar = router.pathname !== "/coming-soon";

  return (
    <main className={`font-sans ${inter.variable}`}>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#141414",
            color: "#fff",
          },
          duration: 5000,
        }}
      />
    </main>
  );
};

export default api.withTRPC(MyApp);
