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