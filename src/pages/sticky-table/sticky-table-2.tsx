import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
    SkipNextRounded,
} from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CSVLink } from 'react-csv';
import SkipPreviousIcon from '@mui/icons-material/SkipPreviousRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    NativeSelect,
    SwipeableDrawer,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { COLUMNS } from './columns-2';
import GlobalFilter from './global-filter';
import { IndeterminateCheckbox } from './table-checkboxes';
import { filterTypes } from './table-helper';
import { Styles } from './table-styles';
import ImageComponent from './image-component';

const IMAGE_COLUMN_NAMES = ['image', 'dateiupload1'];
const NAME_COLUMN = ['current_status'];
const csvColumn: any = COLUMNS.map((column) => {
    let columnObj: any = {};
    return {
        ...columnObj,
        key: column.accessor,
        label: column.Header,
    };
});
export const StickyTable2 = (props) => {
    const columns = useMemo(() => COLUMNS, []);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [dataLogin, setDataLogin] = useState<any>();
    const [data, setData] = useState<any[]>([]);
    const [columnId, setColumnId] = useState<any>('');

    type Anchor = 'right';
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = useCallback(
        (anchor: Anchor, open: boolean, cell_id: any = '') =>
            (event: any) => {
                setState({ ...state, [anchor]: open });
                setColumnId(cell_id);
            },
        [columnId, setState]
    );
    useEffect(() => {
        (async () => {
            try {
                setShowLoader(true);
                let response = [];
                if (props?.station_id && props.station_id) {
                    const mainData = { station_id: props.station_id };
                    var formdata = new FormData();
                    formdata.append('station_id', props.station_id);
                    const data: any = await axios.post(
                        '/api_getAllNew/',
                        formdata,
                        {
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                            },
                        }
                    );

                    response = data.response;

                    // const data: any = await axios.post(`/api_getAllNew/station_id=${station}`);
                } else {
                    const data: any = await axios.get(`/api_getAllNew`);
                    response = data?.response;
                }

                const image_base_url = 'https://www.c4c-cen.com/api/uploads/';
                if (response && Array.isArray(response)) {
                    const sanitizedArray = response?.map((r: any) => {
                        const images = r?.image?.split(',')?.map((img) => {
                            return `${image_base_url}${img?.trim()}`;
                        });
                        return {
                            ...r,
                            image: images,
                            'datum/time': `${r?.date}/${r?.time}`,
                        };
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
            if (!props?.station_id) {
                const isLoggedIn: any = JSON.parse(
                    localStorage.getItem('AUHT_USER') ?? ''
                );
                setDataLogin(isLoggedIn?.response?.[0]);
            }
        })();
    }, []);

    const api_status_submit = async (id, status) => {
        var formdata = new FormData();
        formdata.append('form_id', id);
        formdata.append('status', status);
        const data: any = await axios.post('/api_status_submit/', formdata, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        setState({ ...state, ['right']: false });
        location.reload();
    };

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
                                    filename={'visual_signage.csv'}
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
                                    {page?.map((row: any, index) => {
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
                                                    if (
                                                        NAME_COLUMN.includes(
                                                            cell.column.id
                                                        )
                                                    ) {
                                                        let className = '';
                                                        switch (cell?.value) {
                                                            case 'not-approved':
                                                                className =
                                                                    'warning';
                                                                break;
                                                            case 'deny':
                                                                className =
                                                                    'error';
                                                                break;

                                                            case 'approved':
                                                                className =
                                                                    'success';
                                                                break;

                                                            default:
                                                                className =
                                                                    'primary';
                                                                break;
                                                        }
                                                        return (
                                                            <Button
                                                                {...cell.getCellProps()}
                                                                
                                                                sx={{
                                                                    height: '30px',
                                                                    width: '130px',
                                                                    maxWidth:'130px',
                                                                    padding: 0,
                                                                    margin: '10px',
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'space-around',
                                                                }}
                                                                variant="contained"
                                                                color={`${className}`}
                                                                onClick={toggleDrawer(
                                                                    'right',
                                                                    true,
                                                                    index
                                                                )}
                                                            >
                                                                {cell.render(
                                                                    'Cell'
                                                                )}
                                                            </Button>
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

                    <Drawer anchor={'right'} open={state['right']}>
                        <Box
                            sx={{
                                width: 750,
                                p: 2,
                            }}
                            role="presentation"
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    m: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ArrowCircleLeftIcon
                                        fontSize="large"
                                        onClick={toggleDrawer(
                                            'right',
                                            true,

                                            parseInt(columnId) - 1
                                        )}
                                    />
                                    <ArrowCircleRightIcon
                                        fontSize="large"
                                        onClick={toggleDrawer(
                                            'right',
                                            true,

                                            parseInt(columnId) + 1
                                        )}
                                    />
                                </Box>
                                <Box>
                                    {parseInt(columnId) + 1} of {data.length}
                                </Box>
                                <Box>
                                    <HighlightOffIcon
                                        fontSize="large"
                                        onClick={toggleDrawer('right', false)}
                                    />
                                </Box>
                            </Box>
                            <List>
                                {[
                                    { name: 'Submission Date', value: 'date' },
                                    {
                                        name: 'ARAL WERBEELEMENT TYP',
                                        value: 'title',
                                    },
                                    { name: 'Datum', value: 'datesubmit' },
                                    { name: 'Timer', value: 'datesubmit' },
                                    {
                                        name: 'Installationshöhe',
                                        value: 'height',
                                    },
                                    {
                                        name: 'Installations-Position',
                                        value: 'position',
                                    },
                                    {
                                        name: 'Bitte geben Sie die Tankstellennummer ein',
                                        value: '',
                                    },
                                    { name: 'Ort', value: '' },
                                    { name: 'Strasse', value: '' },
                                    { name: 'Windgeschwindigkeit', value: '' },
                                    { name: 'Layout', value: 'layoutColumn' },
                                    {
                                        name: 'Weitere Erklärungen notwendig?',
                                        value: '',
                                    },
                                    {
                                        name: 'Zeichnung der UK (Omega Profil)',
                                        value: '',
                                    },
                                    {
                                        name: 'ErkennungsmerkmaleATS 88',
                                        value: '',
                                    },
                                    {
                                        name: 'Erkennungsmerkmale ATS96',
                                        value: '',
                                    },
                                    {
                                        name: 'Merkmale Kontur UK',
                                        value: 'markmaleKonturUkList',
                                    },
                                    {
                                        name: 'Merkmale Kontur',
                                        value: 'markmaleKonturList',
                                    },
                                    {
                                        name: 'Merkmale Kontur Beleuchtung',
                                        value: 'merkmaleTankdachColumn',
                                    },
                                    {
                                        name: 'RTG Werbung weiß oder grün',
                                        value: 'rtgWarbungColumn',
                                    },
                                    {
                                        name: 'Automatische Abfrage der Geo-Location',
                                        value: '',
                                    },
                                    { name: 'Bauart', value: 'bauart' },
                                    {
                                        name: 'Montage nach Hersteller-Richtlinie',
                                        value: 'assemblyAccording',
                                    },
                                    { name: 'Risiko-Faktor Wind', value: '' },
                                    {
                                        name: 'Risk Priorization Tool Factor',
                                        value: '',
                                    },
                                    {
                                        name: 'Visueller Erhaltungszustand',
                                        value: 'visualState',
                                    },
                                    {
                                        name: 'Wartungsempfehlungen',
                                        value: 'maintenance',
                                    },
                                    {
                                        name: 'Befestigung an Tragstruktur',
                                        value: 'attachmentTo',
                                    },
                                    {
                                        name: 'Austausch des Werbeelementes empfohlen ?',
                                        value: 'austauschDesColumn',
                                    },
                                    {
                                        name: 'Überprüfung der Schrauben mittels Drehmomentschlüssel',
                                        value: '',
                                    },
                                    {
                                        name: 'Wenn folgende 3 Punkte erfüllt sind ist kein Handlungsbedarf für die Verbindungen gegeben:',
                                        value: 'connections',
                                    },
                                    {
                                        name: 'Bewegungs- und Anregungstest',
                                        value: 'stimulationTest',
                                    },
                                    {
                                        name: 'Auszutauschende Befestigungselemente',
                                        value: 'fasteners',
                                    },
                                    {
                                        name: 'Befestigungslösung als Ersatz',
                                        value: 'fasteningSolution',
                                    },
                                    {
                                        name: 'Technische Integrität und Unversehrtheit in Ordnung?',
                                        value: 'technicalIntegrity',
                                    },
                                    {
                                        name: 'Sind bereits Hilfskonstruktionen zur Sicherung angebracht worden?',
                                        value: 'auxiliaryConstructions',
                                    },
                                    {
                                        name: 'Optischer Eindruck in Ordnung?',
                                        value: 'opticalImpression',
                                    },
                                    {
                                        name: 'Technischer Stand der Befestigungen in Ordnung?',
                                        value: 'fastenings',
                                    },
                                    {
                                        name: 'Angemessenheit der Gesamt-Installation in Ordnung?',
                                        value: 'appropriateness',
                                    },
                                    {
                                        name: 'Sonstige Bemerkungen',
                                        value: 'otherRemarks',
                                    },
                                    { name: 'Datei-Upload', value: 'image' },
                                    { name: 'Name', value: 'surname' },
                                    { name: 'Datum', value: 'datesubmit' },
                                    { name: 'Unterschrift', value: '' },
                                    {
                                        name: 'Laufende Nr. des Werbeelementes',
                                        value: '',
                                    },
                                    { name: 'Eindeutige ID', value: '' },
                                    { name: 'Submission IP', value: '' },
                                    {
                                        name: 'Prüfung ob Montagerichtlinie befolgt wurde',
                                        value: 'checkWhether',
                                    },
                                    {
                                        name: 'Last Update Date',
                                        value: 'datesubmit',
                                    },
                                    {
                                        name: 'vermutetes Alter des Elementes',
                                        value: 'assumedAge',
                                    },
                                    { name: 'Submission ID', value: '' },
                                    {
                                        name: 'Laufende Inspektions-Nummer:',
                                        value: '',
                                    },
                                ].map(
                                    (text, index) =>
                                        columnId !== '' && (
                                            <Container sx={{ m: 2 }}>
                                                {index > 0 && (
                                                    <Divider sx={{ mb: 1 }} />
                                                )}
                                                <ListItem
                                                    key={text.name}
                                                    disablePadding
                                                >
                                                    <ListItemText
                                                        primary={text.name}
                                                        sx={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    />
                                                </ListItem>
                                                <ListItem
                                                    key={index}
                                                    disablePadding
                                                >
                                                    {IMAGE_COLUMN_NAMES.includes(
                                                        text.value
                                                    ) ? (
                                                        <ImageComponent
                                                            key={text.name}
                                                            image={
                                                                data?.[
                                                                    columnId
                                                                ][text?.value]
                                                            }
                                                        ></ImageComponent>
                                                    ) : (
                                                        <ListItemText
                                                            secondary={
                                                                data?.[
                                                                    columnId
                                                                ][
                                                                    text?.value
                                                                ] ??
                                                                'Not Available'
                                                            }
                                                        />
                                                    )}
                                                </ListItem>
                                            </Container>
                                        )
                                )}
                            </List>

                            <Box>
                                <ButtonGroup
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    {data?.[columnId]?.current_status ===
                                        'in-progress' && (
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                api_status_submit(
                                                    data?.[columnId]?.form_id,
                                                    2
                                                )
                                            }
                                        >
                                            Genehmigen
                                        </Button>
                                    )}
                                    {data?.[columnId]?.current_status ===
                                        'in-progress' && (
                                        <Button
                                            color="error"
                                            onClick={() =>
                                                api_status_submit(
                                                    data?.[columnId]?.form_id,
                                                    3
                                                )
                                            }
                                        >
                                            Ablehnen
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Drawer>
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
