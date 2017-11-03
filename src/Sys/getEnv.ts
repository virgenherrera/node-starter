import Directories		from './Directories';
import * as dotEnv		from 'dotenv';

/**
* Loads Environment Variables from /.env file
*/
export default function getEnv(): void {
	let { parsed } = dotEnv.config({
		path: Directories.getPathToFile('Base', '.env')
	});

	console.log("Environment variables were acquired");
	console.log(`Service ${process.env.SERVICE_NAME} running in: "${process.env.NODE_ENV}"`);

}
