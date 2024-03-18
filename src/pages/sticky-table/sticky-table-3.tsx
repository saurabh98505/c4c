import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
    SkipNextRounded,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkipPreviousIcon from '@mui/icons-material/SkipPreviousRounded';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    Grid,
    IconButton,
    Modal,
    NativeSelect,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
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
import { COLOR_CODES } from '../../utils/constants';
import { COLUMNS } from './columns';
import GlobalFilter from './global-filter';
import { IndeterminateCheckbox } from './table-checkboxes';
import { filterTypes } from './table-helper';
import { Styles } from './table-styles';

const IMAGE_COLUMN_NAMES = [
    'image',
    'dateiupload1',
    'dateiupload2',
    'dateiupload3',
];

export const StickyTable3 = () => {
    const [dataLogin, setDataLogin] = useState<any>();
    const columns = useMemo(() => COLUMNS, []);
    const csvColumn: any = COLUMNS.map((column) => {
        let columnObj: any = {};
        return {
            ...columnObj,
            key: column.accessor,
            label: column.Header,
        };
    });
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            try {
                setShowLoader(true);
                await axios.get(
                    'https://eu-api.jotform.com/user?apiKey=45c0e9b8e1a55bb227fb1b5510492565'
                );

                const data: any = await axios.get('/api_getAllNew');

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
                const isLoggedIn: any = JSON.parse(
                    localStorage.getItem('AUHT_USER') ?? ''
                );
                setDataLogin(isLoggedIn?.response?.[0]);
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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const imageClickHandler = (images) => {
        console.log(images, 'images');
        if (!images) return;
        let imageConst = images;
        if (!Array.isArray(imageConst)) {
            imageConst = images.split('\n');
        }
        if (Array.isArray(imageConst) && imageConst.length > 0) {
            setSliderImages(
                imageConst.map((img) => {
                    return {
                        original: img,
                        thumbnail: img,
                    };
                })
            );
            setIsOpenModal(true);
        }
    };

    function convertImageToBase64(imgUrl, callback) {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx: any = canvas.getContext('2d');
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0, 600, 600);
                const dataUrl = canvas.toDataURL();

                return resolve({
                    dataUrl: dataUrl,
                    height: image.height,
                    width: image.width,
                });
            };
            image.src = imgUrl;
        });
    }

    const exportPdf = async () => {
        setShowLoader(true);
        const doc = new jsPDF();
        let key: any = Object.keys(selectedRowIds);

        await doc.text(data[key]?.datum, 200, 10, { align: 'right' });
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('ARAL / BP SIGNAGE INSPECTION PROGRAM', 10, 20);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('ARAL WERBEELELEMENT TYP', 10, 30);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(data[key]?.approval_status, 10, 40);

        doc.text('Risiko-Abschätzung', 10, 50);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Installationshöhe', 10, 60);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(data[key]?.installationshohe, 10, 70);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Installations-Position', 10, 80);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(data[key]?.installations_position, 10, 90);

        doc.setFont('helvetica', 'bold');

        doc.setFontSize(16);
        doc.text('Bauart', 10, 110);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(data[key]?.bauart, 10, 120);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('wartungsempfehlungen', 10, 130);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data[key]?.wartungsempfehlungen, 10, 140);
        doc.setFont('helvetica', 'bold');

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Risiko-Faktor Höhe', 10, 150);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data[key]?.wind, 10, 160);
        doc.setFont('helvetica', 'bold');

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Gewichteter Risiko-Faktor', 10, 170);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data[key]?.windgeschwindigkeit, 10, 180);
        doc.setFont('helvetica', 'bold');

        doc.setFontSize(20);
        doc.text('Visuelle und Funktionale Inspektionen', 10, 190);

        doc.setFontSize(16);
        doc.text('Visueller Erhaltungszustand', 10, 200);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text(data[key]?.visueller, 10, 210);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Montage nach Hersteller-Richtlinie', 10, 220);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data[key]?.montage, 10, 230);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Befestigung an Tragstruktur', 10, 240);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data[key]?.befestigung, 10, 250);

        doc.addPage();
        doc.setFont('helvetica', 'bold');

        doc.text('Datei-Upload', 10, 10);
        doc.setTextColor('blue');
        const dateiupload1 = data[key]?.dateiupload1.split('\n');

        let j = 0;
        for (let i of dateiupload1) {
            const img: any = await convertImageToBase64(i, console.log);

            if (j * 100 >= 300) {
                doc.addPage();
                j = 0;
            }
            await doc.addImage(
                img.dataUrl,
                'jpeg',
                30,
                j * 100,
                300,
                img.height / 10
            );
            j++;
        }

        await doc.save('visual_signage_inspection.pdf');
        setShowLoader(false);
    };

    return (
        <Grid container rowSpacing={1}>
            {!showLoader && (
                <>
                    <Dialog
                        open={isOpenModal}
                        fullScreen={fullScreen}
                        onClose={() => setIsOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <Box>
                                <DialogActions>
                                    <IconButton
                                    // className={classes.customizedButton}
                                    >
                                        <CloseIcon
                                            onClick={() =>
                                                setIsOpenModal(false)
                                            }
                                        />
                                    </IconButton>
                                </DialogActions>
                                <ImageGallery items={sliderImages} />
                            </Box>
                        </>
                    </Dialog>

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
                        {dataLogin?.loginType === 'admin' && (
                            <Button
                                variant="contained"
                                sx={{
                                    padding: 1,
                                    marginLeft: 1,
                                    display: 'block',
                                }}
                            >
                                <CSVLink
                                    data={data}
                                    headers={csvColumn}
                                    filename={'exceldata.csv'}
                                    className="btn btn-primary"
                                    target="_blank"
                                >
                                    <Typography
                                        sx={{
                                            color: '#FFF',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Download Excel
                                    </Typography>
                                </CSVLink>
                            </Button>
                        )}
                        {selectedFlatRows.length === 1 && (
                            <Button
                                variant="contained"
                                sx={{ padding: 1, marginLeft: 1 }}
                                onClick={() => exportPdf()}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Download Pdf
                                </Typography>
                            </Button>
                        )}

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
