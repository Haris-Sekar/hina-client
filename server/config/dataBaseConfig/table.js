 
export const createTableQuery = (tableName, columns) => {
    let tableQuery = `CREATE TABLE ${tableName} (`;

    const primaryKeyColumns = [];
    const foreignKeyColumns = [];
    const uniqueKeyColumns = [];

    columns.forEach((column, index) => {
        let columnDefinition = `${column.name} ${column.dataType}`;

        if (['INT', 'BOOLEAN', 'BIGINT'].includes(column.dataType)) {
            columnDefinition += ` ${column.isNotNull ? 'NOT NULL' : ''} ${column.isAutoIncrement ? 'AUTO_INCREMENT' : ''}`;
        } else {
            columnDefinition += `(${column.length}) ${column.isNotNull ? 'NOT NULL' : ''} ${column.isAutoIncrement ? 'AUTO_INCREMENT' : ''}`;
        }

        tableQuery += `${columnDefinition}`;

        if (column.isUnique) {
            uniqueKeyColumns.push(`UNIQUE (${column.name})`);
        }

        if (column.isPrimaryKey) {
            primaryKeyColumns.push(`${column.name}`);
        }

        if (column.isForeignKey) {
            foreignKeyColumns.push(`FOREIGN KEY (${column.name}) REFERENCES ${column.foreignKeyRefTable}(${column.foreignKeyRefColumn})`);
        }

        if (index < columns.length - 1) {
            tableQuery += ', ';
        }
    });

    if (uniqueKeyColumns.length > 0) {
        tableQuery += `, ${uniqueKeyColumns.join(', ')}`;
    }

    if (primaryKeyColumns.length > 0) {
        tableQuery += `, PRIMARY KEY (${primaryKeyColumns.join(', ')})`;
    }

    if (foreignKeyColumns.length > 0) {
        tableQuery += `, ${foreignKeyColumns.join(', ')}`;
    }

    tableQuery += ');';

    return tableQuery;
};