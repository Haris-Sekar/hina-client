import db from "../db.js"; 
import { readFile } from 'fs/promises';
import { Column } from "./Column.js";
import {createTableQuery} from "./table.js";

const tables = JSON.parse(
    await readFile(new URL('./tables.json', import.meta.url))
); 
export const createTable = async () => { 
    const [data] = await db.query("SHOW TABLES;");
    const dbTables = data.map(element => Object.values(element)[0]);
    const tableNames = tables.map(element => element.tableName); 
    for (const table of tableNames) {
        if(!dbTables.includes(table)){
            const tableObject = tables.filter(element => element.tableName === table);
            const listOfColumns = parseColumns(tableObject[0].columns);
            const tableQuery = createTableQuery(table, listOfColumns);
            await db.query(tableQuery.toString());
        }
    }
}

const parseColumns = (columns) => { 
    let listOfColumns = [];
    columns.forEach((column) => {
        const columnObj = new Column(column.name, column.dataType, column.length, column.isNotNull, column.isPrimaryKey, column.isForeignKey, column.foreignKeyRefTable, column.foreignKeyRefColumn, column.isAutoIncrement, column.isUnique);
        listOfColumns.push(columnObj);
    });
    return listOfColumns;
}