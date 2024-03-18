import { matchSorter } from 'match-sorter';

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
    return matchSorter(rows, filterValue, {
        keys: [(row: any) => row.values[id]],
    });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

export const filterTypes = () => ({
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    // Or, override the default text filter to use
    // "startWith"
    text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
                ? String(rowValue)
                      .toLowerCase()
                      .startsWith(String(filterValue).toLowerCase())
                : true;
        });
    },
});
