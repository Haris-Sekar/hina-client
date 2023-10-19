class Pagination {
    constructor(index, range, count, totalCount) {
        this.index = index;
        this.range = range;
        this.count = count;
        this.totalCount = totalCount;
    }

    getPageData() {
        return {
            index: this.index,
            range: this.range,
            count: this.count - 1,
            hasNextPage: this.totalCount > this.range * (this.index + 1),
            hasPrevPage: this.index > 0,
        };
    }
}