import { useState, useEffect } from "react";
import Link from "next/link";

const ComingSoon = () => {
  const [countdown, setCountdown] = useState(() => {
    const countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      if (distance < 0) {
        clearInterval(interval);
        setCountdown("EXPIRED");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Coming Soon</h1>
      <p className="mb-8 text-lg text-gray-600">
        We are working hard to bring something amazing for you!
      </p>
      <div className="mb-12 text-xl font-bold">{countdown}</div>

      <div className="flex space-x-4">
        <a
          href="https://nb9t7.com"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          Facebook
        </a>
        <a
          href="https://nb9t7.com"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          Twitter
        </a>
        <a
          href="https://nb9t7.com"
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          Instagram
        </a>
      </div>
      <Link
        href="/"
        className="my-6 text-3xl  text-blue-500 hover:text-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
