/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function Calendar() {
	useEffect(() => {
		(async function () {
			const cal = await getCalApi({});
			cal("ui", { "styles": { "branding": { "brandColor": "#0027fa" } },"hideEventTypeDetails":false, "layout": "month_view" });
		})();
	}, [])
	return <Cal
		calLink="psycode-lab-s/30min "
		style={{ width: "100%", height: "100%", overflow: "scroll",padding:"0px" ,margin:"0px"}}
		config={{ layout: 'month_view' }}


	/>;
}
