import React, { useEffect } from "react";
import { AddUrlInput } from "./AddUrlInput";
import { VideoList } from "./VideoList";

import ComfyJS from "comfy.js";
import { useLibraryAdd } from "./useLibrary";

export const Library: React.FC = () => {
	const addUrl = useLibraryAdd({});

	useEffect(() => {
		ComfyJS.onCommand = (_user, command, message) => {
			if (command === "sugerir") {
				addUrl(message);
			}
		};
		ComfyJS.Init("clumsybollito");
		return () => {
			ComfyJS.Disconnect();
		};
	}, [addUrl]);

	return (
		<div className="flex bg-gray-800 rounded-lg overflow-hidden h-96 mt-8">
			{/* Library sidebar */}
			<aside className="w-72 p-4 border-r border-gray-700 flex flex-col">
				<h2 className="text-lg font-semibold mb-4">Library</h2>
				<AddUrlInput className="mb-4" />
				<VideoList />
			</aside>

			{/* Search sidebar */}
			{/* <aside className="w-72 p-4 border-r border-gray-700 flex flex-col">
				<h2 className="text-lg font-semibold mb-4">Search</h2>
				<Search />
			</aside> */}

			{/* Placeholder main area */}
			<section className="flex-1" />
		</div>
	);
};
