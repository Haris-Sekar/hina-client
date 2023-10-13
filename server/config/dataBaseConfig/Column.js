export class Column {
    name;
    dataType;
    length = 255;
    isNotNull = false;
    isPrimaryKey = false;
    isForeignKey = false;
    foreignKeyRefTable;
    foreignKeyRefColumn;
    isAutoIncrement = false;
    isUnique = false;
    onDelete;
    constructor(name, dataType, length, isNotNull, isPrimaryKey, isForeignKey, foreignKeyRefTable, foreignKeyRefColumn, isAutoIncrement, isUnique, onDelete){
        this.name = name;
        this.dataType = dataType;
        this.length = length ?? this.length;
        this.isPrimaryKey = isPrimaryKey ?? this.isPrimaryKey;
        this.isForeignKey = isForeignKey ?? this.isForeignKey;
        this.isNotNull = isNotNull ?? this.isNotNull;
        this.isAutoIncrement = isAutoIncrement ?? this.isAutoIncrement;
        this.isUnique = isUnique ?? this.isUnique;
        if(isForeignKey) {
            this.foreignKeyRefColumn = foreignKeyRefColumn;
            this.foreignKeyRefTable = foreignKeyRefTable;
            this.onDelete = onDelete;

        }

    } 
}