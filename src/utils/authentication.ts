export default function authenticated() {
  let isAuthenticated = false;

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const { isLoggedIn } = JSON.parse(storedUser);
      isAuthenticated = isLoggedIn;
    }
    console.log(
      "User authentication status:",
      isAuthenticated ? "Authenticated" : "Not authenticated",
    );
  } else {
    console.error(
      "Unable to determine authentication status: Window object is not available.",
    );
  }

  return isAuthenticated;
}
