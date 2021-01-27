export default function WindowChecker() {
  if (!window.location.href.includes("newpost") || !window.location.href.includes("register")) {
    localStorage.removeItem("image")
  }
}