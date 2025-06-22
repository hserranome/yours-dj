import { createFileRoute } from "@tanstack/react-router";
import { DJTable } from "~/components/DJTable";
export const Route = createFileRoute("/session/$sessionId")({
	component: Session,
});

function Session() {
	return (
		<div>
			<DJTable />
		</div>
	)
}
