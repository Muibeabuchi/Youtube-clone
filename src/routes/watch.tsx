import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/watch")({
  validateSearch: z.object({
    v: z.string(),
  }),
  loaderDeps: ({ search: { v } }) => ({ v }),
  beforeLoad: ({ search }) => {
    if (!search.v || search.v.length === 0) {
      throw redirect({
        to: "/",
      });
    }
  },
  async loader({ context, params, deps }) {
    const videoId = deps.v;
    // context.
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/watch"!</div>;
}
