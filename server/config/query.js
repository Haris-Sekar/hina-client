import db from "./db.js";

export const createInsertQuery = (tableName, valueMap) => {
    let query = `INSERT INTO ${tableName} (`;

    const columnNames = Object.keys(valueMap);

    columnNames.forEach((column) => query += `${column},`);

    if(query.endsWith(',')) query = query.slice(0, -1);

    query += `) VALUES (`;

    const values = Object.values(valueMap);


    values.forEach((value) => {
        if([true, false].includes(value)) {
            query += `${value},`;
        } else {
            query += `"${value}",`;
        }
        
    });

    if(query.endsWith(',')) query = query.slice(0, -1);

    query += `);`

    return query;
}

export const createUpdateQuery = (tableName, valueMap, condition) => {
    let query = `UPDATE ${tableName} SET `;

    const columnNames = Object.keys(valueMap);

    columnNames.forEach((column) => {
        query += `${column} = `;
        const value = valueMap[column];
        if ([true, false].includes(value)) {
            query += `${value}, `;
        } else {
            query += `"${value}", `;
        }
    });

    if (query.endsWith(', ')) query = query.slice(0, -2); // Remove the trailing comma and space

    if (condition) {
        query += ` WHERE ${condition}`;
    }

    query += `;`;

    return query;
};

export const createDeleteQuery = (tableName, entityId, entityIdColumnName) => {
    return `DELETE FROM ${tableName} WHERE ${entityIdColumnName} = ${entityId}`;
}

export const createCountQuery = (tableName, condition) => {
    let query = `SELECT COUNT(*) as count FROM ${tableName}`;
    if (condition) {
        query += ` WHERE ${condition}`;
    }
    query += `;`;
    return query;
}


export const generateUniqueId = async (tableName, idColumnName) => {
    const existingIds = await getAllIds(tableName, idColumnName); // Implement this function to fetch existing company IDs from the database

    let id;
    do {
        id = Math.floor(1000000 + Math.random() * 9000000); // Generate a random 7-digit number
    } while (existingIds.includes(id)); // Check if the ID is unique

    return id;
}

async function getAllIds(tableName, idColumnName) {
    const query = `select ${idColumnName} from ${tableName}`;
    const [result] = await db.query(query);
    return result;
}
