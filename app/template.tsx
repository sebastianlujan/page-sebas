// A template re-mounts on every navigation (unlike a layout), so the CSS
// entrance animation on this wrapper replays each time the route changes.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
