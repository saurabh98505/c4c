import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Modal,
    NativeSelect,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useMemo, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import {
    useBlockLayout,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import { COLUMNS } from './columns';
import { IndeterminateCheckbox } from './table-checkboxes';
import { Styles } from './table-styles';

import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
    SkipNextRounded,
} from '@mui/icons-material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkipPreviousIcon from '@mui/icons-material/SkipPreviousRounded';
import axios from 'axios';
import { COLOR_CODES } from '../../utils/constants';
import GlobalFilter from './global-filter';
import { filterTypes } from './table-helper';

const IMAGE_COLUMN_NAMES = ['image'];

export const StickyTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            try {
                setShowLoader(true);
                const data: any = await axios.get('/api_getAll');
                const { response, image_base_url } = data;
                if (response && Array.isArray(response)) {
                    const sanitizedArray = response.map((r) => {
                        const images = r?.image?.split(',')?.map((img) => {
                            return `${image_base_url}uploads_${
                                r?.submission_id
                            }/${img?.trim()}`;
                        });
                        return { ...r, image: images };
                    });
                    setData(sanitizedArray);
                    setShowLoader(false);
                } else {
                    setShowLoader(false);
                }
            } catch (e) {
                alert('can not fetch table data...!');
                console.log('can not fetch table data = ', e);
            }
        })();
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        page,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
        setRowState,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            filterTypes,
        },
        useGlobalFilter,
        useSortBy,
        useBlockLayout,
        useSticky,
        usePagination,
        useRowSelect,
        (hooks: any) => {
            hooks.visibleColumns.push((columns: any) => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    sticky: 'left',
                    width: 60,
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }: any) => (
                        <Box
                            display={'flex'}
                            justifyContent="center"
                            alignItems={'center'}
                        >
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </Box>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [sliderImages, setSliderImages] = useState<any[]>([]);
    const imageClickHandler = (images) => {
        if (!images) return;
        if (Array.isArray(images) && images.length > 0) {
            setSliderImages(
                images.map((img) => {
                    return {
                        original: img,
                        thumbnail: img,
                    };
                })
            );
            setIsOpenModal(true);
        }
    };

    return (
        <Grid container rowSpacing={1}>
            {!showLoader && (
                <>
                    <Modal
                        open={isOpenModal}
                        onClose={() => setIsOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box>
                            <ImageGallery items={sliderImages} />
                        </Box>
                    </Modal>

                    <Box display={'flex'} alignItems="center" my={2}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        {selectedFlatRows.length !== 0 && (
                            <Button
                                variant="contained"
                                color="info"
                                sx={{ mx: 2 }}
                                onClick={() => {
                                    setRowState(
                                        rows.map((row: any) => ({
                                            ...row,
                                            isSelected: false,
                                        }))
                                    );
                                }}
                            >
                                {selectedFlatRows.length} entry selected
                            </Button>
                        )}
                        {/* {selectedFlatRows.length === 1 && (
                    <Button variant="contained" color="info" sx={{ mx: 1 }}>
                        View
                    </Button>
                )} */}

                        {selectedFlatRows.length !== 0 && false && (
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ mx: 2 }}
                                onClick={() => setIsOpenDeleteModal(true)}
                            >
                                <DeleteRoundedIcon color="error" /> Delete
                            </Button>
                        )}
                    </Box>

                    <Grid xs={12} item>
                        <Styles>
                            <div
                                {...getTableProps()}
                                className="table sticky"
                                // style={{ height: 450 }}
                            >
                                <div className="header">
                                    {headerGroups.map((headerGroup: any) => (
                                        <div
                                            {...headerGroup.getHeaderGroupProps()}
                                            className="tr"
                                        >
                                            {headerGroup.headers.map(
                                                (column: any) => {
                                                    return (
                                                        <div
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                            className="th"
                                                        >
                                                            <Box
                                                                display="flex"
                                                                alignItems={
                                                                    'center'
                                                                }
                                                            >
                                                                {
                                                                    column?.headerIcon
                                                                }
                                                                <Typography
                                                                    variant="button"
                                                                    paddingLeft={
                                                                        1
                                                                    }
                                                                >
                                                                    {' '}
                                                                    {column.render(
                                                                        'Header'
                                                                    )}
                                                                </Typography>
                                                                <span>
                                                                    {column.isSorted ? (
                                                                        column.isSortedDesc ? (
                                                                            <ExpandMoreIcon
                                                                                fontSize="medium"
                                                                                sx={{
                                                                                    color: COLOR_CODES.darkGrey,
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <ExpandLessIcon
                                                                                fontSize="medium"
                                                                                sx={{
                                                                                    color: COLOR_CODES.darkGrey,
                                                                                }}
                                                                            />
                                                                        )
                                                                    ) : (
                                                                        // <UnfoldMoreIcon
                                                                        //     fontSize="medium"
                                                                        // sx={{
                                                                        //     color: COLOR_CODES.darkGrey,
                                                                        // }}
                                                                        // />
                                                                        ''
                                                                    )}
                                                                </span>
                                                            </Box>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div {...getTableBodyProps()} className="body">
                                    {page?.map((row: any) => {
                                        prepareRow(row);
                                        return (
                                            <div
                                                {...row.getRowProps()}
                                                className="tr"
                                            >
                                                {row.cells.map((cell: any) => {
                                                    if (
                                                        IMAGE_COLUMN_NAMES.includes(
                                                            cell.column.id
                                                        )
                                                    ) {
                                                        return (
                                                            <div
                                                                {...cell.getCellProps()}
                                                                className="td"
                                                                onClick={() => {
                                                                    imageClickHandler(
                                                                        cell?.value
                                                                    );
                                                                }}
                                                            >
                                                                {cell.render(
                                                                    'Cell'
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div
                                                            {...cell.getCellProps()}
                                                            className="td"
                                                        >
                                                            <Typography variant="body2">
                                                                {cell.render(
                                                                    'Cell'
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <NativeSelect
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                    }}
                                    // size="small"
                                    sx={{
                                        height: '30px',
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            Rows {pageSize}
                                        </option>
                                    ))}
                                </NativeSelect>
                                <IconButton
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                    aria-label="Go TO Previous Page"
                                    color="primary"
                                >
                                    <SkipPreviousIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                    aria-label="Previous Page"
                                    color="primary"
                                >
                                    <ArrowBackIosRounded fontSize="small" />
                                </IconButton>
                                <span>
                                    {pageIndex + 1} of {pageOptions?.length}
                                </span>
                                <IconButton
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                    aria-label="Next Page"
                                    color="primary"
                                >
                                    <ArrowForwardIosRounded fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                    aria-label="Go To Next Page"
                                    color="primary"
                                >
                                    <SkipNextRounded fontSize="large" />
                                </IconButton>
                                {/* <span>
                                | Go to page:{' '}
                                <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: '100px' }}
                                />
                            </span>{' '} */}
                            </Box>
                        </Styles>
                    </Grid>

                    <Modal
                        open={isOpenDeleteModal}
                        onClose={() => setIsOpenDeleteModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                background: COLOR_CODES.white,
                                height: 170,
                                width: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                            }}
                        >
                            <DeleteRoundedIcon fontSize="large" color="error" />
                            <Typography variant="body1" pt={1}>
                                Are you sure, you want to Delete{' '}
                                {selectedFlatRows.length} rows?
                            </Typography>
                            <Box
                                mt={2}
                                display={'flex'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => setIsOpenDeleteModal(false)}
                                    sx={{ mx: 1 }}
                                >
                                    No
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setIsOpenDeleteModal(false);
                                    }}
                                    sx={{ mx: 1 }}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </>
            )}

            {showLoader && (
                <Box
                    my={2}
                    display={'flex'}
                    justifyContent="center"
                    alignItems={'center'}
                    sx={{
                        background: COLOR_CODES.tableBgColor,
                        width: '100%',
                        height: '430px',
                    }}
                >
                    <CircularProgress
                        size={50}
                        sx={{
                            color: COLOR_CODES.tabBtnColor,
                        }}
                    />
                </Box>
            )}
        </Grid>
    );
};
