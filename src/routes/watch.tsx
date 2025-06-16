import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watch")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/watch"!</div>;
}
