import React from 'react';

const TableComponent = ({ 
    data = [], 
    columns = [], 
    className = '',
    showSearch = false,
    searchPlaceholder = 'Search...',
    onRowClick = null,
    emptyMessage = 'No data available'
    }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredData = React.useMemo(() => {
        if (!showSearch || !searchTerm) return data;
        
        return data.filter(row =>
        Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [data, searchTerm, showSearch]);

    return (
        <div className={`w-full ${className}`}>
        {showSearch && (
            <div className="mb-4">
            <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            </div>
        )}
        
        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                {columns.map((column, index) => (
                    <th
                    key={index}
                    className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    {column.header || column.key}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                <tr>
                    <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                    {emptyMessage}
                    </td>
                </tr>
                ) : (
                filteredData.map((row, rowIndex) => (
                    <tr
                    key={rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className={`${
                        onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''
                    } transition-colors`}
                    >
                    {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </td>
                    ))}
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

export default TableComponent;