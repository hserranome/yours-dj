import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div>
			<h2>hello</h2>
			<Link to="/session/$sessionId" params={{ sessionId: "123" }}>
				Join Session
			</Link>
		</div>
	);
}
