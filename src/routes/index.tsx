import { createFileRoute } from "@tanstack/react-router";
import { DJTable } from "~/components/DJTable";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return <DJTable />;
}
